import numpy                as np
import tensorflow           as tf
import modules.segmentation_models  as sm
from PIL            import Image
from pathlib        import Path
from config         import label_config, image_config
from modules.utils  import mask2rgb

class model():
    def __init__(self, model_name, model_path):
        sm.set_framework('tf.keras')

        self.model      = tf.keras.models.load_model(model_path, custom_objects={
            'dice_loss' :sm.losses.DiceLoss(), 
            'iou_score' :sm.metrics.IOUScore(threshold=0.5),
            'f1-score'  :sm.metrics.FScore(threshold=0.5),
            'recall'    :sm.metrics.Recall(threshold=0.5), 
            'precision' :sm.metrics.Precision(threshold=0.5),
            'accuracy'  :sm.metrics.Accuracy(threshold=0.5)
        })
        self.model_name = model_name
        self.label      = label_config
        self.image_size = image_config

    def preprocessing(self, img):
        img = img.resize(self.image_size)
        img = np.array(img)
        img = np.expand_dims(img, axis=0)
        img = img / 255. 
        return img
    
    def postprocessing(self, result):
        result = mask2rgb(result) # np.array
        result = Image.fromarray(result)
        return result
    
    def get_model_name(self):
        return self.model_name
    
    def predict(self, img):
        """
        img : an PIL.Image
        mask: an PIL.Image
        """
        result  = None
        img     = self.preprocessing(img)
        result  = self.model.predict(img)
        result  = self.postprocessing(img)

        return result
