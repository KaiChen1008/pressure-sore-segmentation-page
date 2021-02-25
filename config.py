from pathlib import Path

models_config = [
    {
        "model_id"  : 0,
        "model_name": 'model1',
        "model_path": Path('models/model_1.h5')
    },
    {
        "model_id"  : 1,
        "model_name": 'model2',
        "model_path": Path('models/model_2.h5')
    },
]


label_config = [
    {
        "0": [  0,   0,   0], # bachground
        "1": [  0, 128,   0], # ulceration
        "2": [128,   0, 128], # re-ep
    },
    {
        "0": [  0,   0,   0], # background
        "1": [128, 128,   0], # slough tissue
        "2": [128,   0,   0], # granuation
        "3": [  0,   0, 128]  # eschar
    },
]

image_config = (512, 512)


