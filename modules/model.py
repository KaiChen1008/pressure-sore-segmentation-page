import numpy        as np
import tensorflow   as tf

from pathlib import Path


class model():
    def __init__(self, model_name, model_path):
        self.model      = tf.keras.models.load_model(model_path)
        self.model_name = model_name

    def preprocessing(self, img):
        return img
    
    def postprocessing(self, img):
        return img 
    
    def get_model_name(self):
        return self.model_name
    
    def predict(self, img):
        result  = None
        img     = self.preprocessing(img)
        result  = self.model.predict(img)
        result  = self.postprocessing(img)

        return result