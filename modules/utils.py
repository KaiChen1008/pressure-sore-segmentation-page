import numpy        as np
import tensorflow   as tf
from config     import label_config
from PIL        import Image


def mask2rgb(mask, model_id=0):
    mask   = np.argmax(mask, axis=-1)
    mask   = np.squeeze(mask, axis=0)
    output = np.zeros((512,512,3), dtype=np.uint8)

    for i in range(512):
        for j in range(512):
            output[i,j] = label_config[model_id][ str(mask[i,j]) ]

    return output

def area_count(slough_prediction, ul_prediction, x=38): 
    """
    slough_prediction: PIL.Image
    ul_prediction: PIL.Image
    x : int
    """
    slough_prediction   = np.array(slough_prediction)
    ul_prediction       = np.array(ul_prediction)
    Area = [0. for i in range(6)]
    for i in range(512):
        for j in range(512):
            if np.all(slough_prediction[i,j] == np.array(label_config[0]['0']) ):
                Area[0] += 1
            elif np.all(slough_prediction[i,j] == np.array(label_config[0]['1'])):
                Area[2] += 1
            elif np.all(slough_prediction[i,j] == np.array(label_config[0]['2'])):
                Area[4] += 1
            elif np.all(slough_prediction[i,j] == np.array(label_config[0]['3'])):
                Area[5] += 1

    for i in range(512):
        for j in range(512):
            if np.all(ul_prediction[i,j] == np.array(label_config[1]['0'])):
                Area[0] += 1
            elif np.all(ul_prediction[i,j] == np.array(label_config[1]['1'])):
                Area[1] += 1
            elif np.all(ul_prediction[i,j] == np.array(label_config[1]['2'])):
                Area[3] += 1
    percentage = Area[2] / (512*512)
    granulation_area = int(Area[4] / Area[1] * 100)
    is_reep = False
    if Area[3] != 0:
        is_reep = True

    area = f'{percentage * 6400 * pow(x/76, 2):.2f}'
    
    return area, granulation_area, is_reep