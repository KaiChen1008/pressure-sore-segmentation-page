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

from modules.dataset            import Dataset
from modules.utils              import *


sm.set_framework('tf.keras')
BACKBONE    = 'resnet50'
BATCH_SIZE  = 6
CLASSES     = ['Burn']
LR          = 0.0001
EPOCHS      = 400
#label = {"_background_": 0, "Ulceration": 1, "slough tissue": 2, "Re-ep": 3, "Granulation": 4, "Eschar": 5}

def predict(img):
    metrics = [
        sm.metrics.IOUScore(threshold=0.5), 
        sm.metrics.FScore(threshold=0.5), 
        sm.metrics.Recall(threshold=0.5), 
        sm.metrics.Precision(threshold=0.5),
        sm.metrics.Accuracy(threshold=0.5),
    ]   
    mask = None

    return mask



def main():
    dataset = Dataset('./config/', batch_size=BATCH_SIZE)

    metrics = [
        sm.metrics.IOUScore(threshold=0.5), 
        sm.metrics.FScore(threshold=0.5), 
        sm.metrics.Recall(threshold=0.5), 
        sm.metrics.Precision(threshold=0.5),
        sm.metrics.Accuracy(threshold=0.5),
    ]

    dataset.load_data()
    split_ratio = 0.1
    training_dataset, validation_dataset = dataset.spilt_set(split_ratio)     

    unet_model = tf.keras.models.load_model("Unet_Ulceration_20210218-223943.h5", custom_objects={
        'dice_loss' :sm.losses.DiceLoss(), 
        'iou_score' :sm.metrics.IOUScore(threshold=0.5),
        'f1-score'  :sm.metrics.FScore(threshold=0.5),
        'recall'    :sm.metrics.Recall(threshold=0.5), 
        'precision' :sm.metrics.Precision(threshold=0.5),
        'accuracy'  :sm.metrics.Accuracy(threshold=0.5)
        })
        
    #result = unet_model.evaluate(validation_dataset)
    #print(dict(zip(unet_model.metrics_names, result)))

    for batch_idx, element in enumerate(validation_dataset):
        idx         = batch_idx * BATCH_SIZE
        image_batch = element[0].numpy()
        mask_batch  = element[1].numpy()
        size        = image_batch.shape[0]


        os.mkdir('val/val{}'.format(idx))

        for i in range(size):
            image = (image_batch[i] * 255.0).astype(np.uint8)
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            cv2.imwrite('val/val{}/{}_Input.png'.format(idx, i), image)
            mask = mask_batch[i]
            mask = mask2rgb(mask)
            mask = cv2.cvtColor(mask, cv2.COLOR_RGB2BGR)
            cv2.imwrite('val/val{}/{}_Label.png'.format(idx,i), mask)
            #print(element[0])
        prediction = unet_model.predict(element[0])
        prediction = np.argmax(prediction, axis=-1)


        print(prediction.shape)
        for n in range(size):
            output = np.zeros((512,512,3), dtype=np.uint8)
            for i in range(512):
                for j in range(512):
                    if prediction[n,i,j] == 0:
                        output[i,j] = [0,0,0]
                    elif prediction[n,i,j] == 1:
                        output[i,j] = [128,0,0]
                    else :
                        output[i,j] = [0,0,128]
            output = cv2.cvtColor(output, cv2.COLOR_RGB2BGR)
            cv2.imwrite('val/val{}/{}_Output.png'.format(idx, n), output)            

    # # np.savetxt('prediction.txt', prediction)
    return unet_model

if __name__ == '__main__':
    main()

