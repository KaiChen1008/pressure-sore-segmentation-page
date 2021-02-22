import gc
import re
import cv2
import glob
import yaml
import keras
import colorsys
import matplotlib
import datetime
import multiprocessing
import os, sys, time, random, math
import numpy as np
import tensorflow as tf

from PIL import Image
from tensorflow.python.ops.gen_math_ops import IsInf
from tensorflow.keras.models            import load_model

import segmentation_models as sm
from   segmentation_models import Unet

import skimage.io
import skimage.transform    as trans

import matplotlib.pyplot    as plt
import albumentations       as A

from keras.optimizers           import *
from keras.models               import save_model
from keras.preprocessing.image  import ImageDataGenerator
from keras.callbacks            import ModelCheckpoint
from keras.callbacks            import CSVLogger


class Dataset():
    CLASSES_Ul      = ['background, Ulceration', 'Re-ep']
    CLASSES_Other   = ['background', 'slough-tissue', 'Granulation', 'Eschar']
    def __init__(self, config_path = './config/', only_Ul=True, augmentation=None, preprocessing=None, batch_size=6):
        self.config_path = config_path
        self.batch_size  = batch_size
        if only_Ul:
            self.classes = 3
            self.color2index = {
                (0, 0, 0) : 0,   # _background_
                (128, 0, 0) : 1, # Ul
                (0, 128, 0) : 1, # slogh 
                (0, 0, 128) : 2, # Re-ep
                (128,128,0) : 1, # Granulation
                (128,0,128) : 1  # Eschar
            }
        else:
            self.classes = 4
            self.color2index = {
                (0, 0, 0) : 0,   # _background_
                (128, 0, 0) : 0, # Ul
                (0, 128, 0) : 1, # slogh 
                (0, 0, 128) : 0, # Re-ep
                (128,128,0) : 2, # Granulation
                (128,0,128) : 3  # Eschar
            }

    def rgb2mask(self, img, classes):
        assert len(img.shape) == 3
        height, width, ch = img.shape
        assert ch == 3
        W = np.power(256, [[0],[1],[2]])
        img_id = img.dot(W).squeeze(-1) 
        values = np.unique(img_id)
        mask = np.zeros((height,width,classes))
        for i, c in enumerate(values):
            one_hot = [0. for j in range(classes)]
            one_hot[self.color2index[tuple(img[img_id==c][0])]] = 1.0
            mask[img_id==c] = one_hot
        return mask

    def load_data(self, data=None):
        raw_dataset = tf.data.TFRecordDataset(
            filenames='train.tfrecords')
        # Parse the input tf.train.Example proto using the dictionary above.
        image_feature_description = {
            'image' : tf.io.FixedLenFeature([], tf.string),
            'mask'  : tf.io.FixedLenFeature([], tf.string),
            'height': tf.io.FixedLenFeature([], tf.int64),
            'width' : tf.io.FixedLenFeature([], tf.int64)
        }

        def _parse_image_function(example_proto):
            # Parse the input tf.train.Example proto using the dictionary above.
            return tf.io.parse_single_example(example_proto, image_feature_description)

        n_map_threads = multiprocessing.cpu_count()
        parsed_dataset = raw_dataset.map(
            _parse_image_function, num_parallel_calls=tf.data.experimental.AUTOTUNE)
        self.total_data = []
        self.total_mask = []
        self.colored_masks = []
        for parsed_record in parsed_dataset:
            height = int(parsed_record['height'])
            width = int(parsed_record['width'])
            image_str = parsed_record['image'].numpy()
            mask_str = parsed_record['mask'].numpy()
            image = np.frombuffer(image_str, dtype=np.uint8)
            image = image.reshape((height, width, 3))
            mask = np.frombuffer(mask_str, dtype=np.uint8)
            mask = mask.reshape((height, width, 3))
            self.colored_masks.append(mask)
            # cv2.imwrite('output_mask.png', mask)
            mask = self.rgb2mask(mask, self.classes)
            # cv2.imwrite('output_img.jpg', image)
            self.total_data.append(image)
            self.total_mask.append(mask)
    
    def preprocessing(self, image, label):
        image = tf.cast(image, tf.float64) / 255.0
        return image, label

    def spilt_set(self, split):
        
        training_data = np.squeeze(np.array(self.total_data))
        training_mask = np.squeeze(np.array(self.total_mask))
        

        data_size = training_data.shape[0]
        split_size = int(data_size * split)
        self.split_size = split_size

        # data split
        training_dataset = tf.data.Dataset.from_tensor_slices(
            (training_data[:-split_size], training_mask[:-split_size]))
        validation_dataset = tf.data.Dataset.from_tensor_slices(
            (training_data[-split_size:], training_mask[-split_size:]))
        # data preprocessing and augmentation
        training_dataset = training_dataset.map(
            self.preprocessing, num_parallel_calls=tf.data.experimental.AUTOTUNE
            )
        training_dataset = training_dataset.shuffle(100)
        training_dataset = training_dataset.batch(self.batch_size)
        training_dataset = training_dataset.prefetch(
            tf.data.experimental.AUTOTUNE
            )
        validation_dataset = validation_dataset.map(
            self.preprocessing, num_parallel_calls=tf.data.experimental.AUTOTUNE
            )
        validation_dataset = validation_dataset.batch(self.batch_size)
        validation_dataset = validation_dataset.prefetch(
            tf.data.experimental.AUTOTUNE
            )
        return training_dataset, validation_dataset

