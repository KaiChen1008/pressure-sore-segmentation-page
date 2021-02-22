import numpy as np

def mask2rgb(mask):
    mask = np.argmax(mask, axis=-1)
    #print(mask.shape)
    output = np.zeros((512,512,3), dtype=np.uint8)
    for i in range(512):
        for j in range(512):
            if mask[i,j] == 0:
                output[i,j] = [0,0,0]
            elif mask[i,j] == 1:
                output[i,j] = [128,0,0]
            else :
                output[i,j] = [0,0,128]
    return output