import numpy        as np
import tensorflow   as tf
from config     import label_config


def mask2rgb(mask):
    mask   = np.argmax(mask, axis=-1)
    mask   = np.squeeze(mask, axis=0)
    output = np.zeros((512,512,3), dtype=np.uint8)

    for i in range(512):
        for j in range(512):
            output[i,j] = label_config[ str(mask[i,j]) ]

    return output



    