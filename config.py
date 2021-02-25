from pathlib import Path

models_config = [
    {
        "model_name": 'model1',
        "model_path": Path('models/model_2.h5')
    },
]

label_config = {
    "0": [  0,   0,   0],
    "1": [128,   0,   0],
    "2": [  0,   0, 128],
}

image_config = (512, 512)


