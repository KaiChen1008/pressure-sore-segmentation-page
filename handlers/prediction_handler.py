import tornado
import tornado.web
import tornado.ioloop
import json
import base64
from pathlib import Path
from pprint  import pprint
from modules.model import model
from config        import models_config

from PIL           import Image
from io            import StringIO, BytesIO

def get_test_img():
    img = None
    with open(Path('images/test.jpg'), 'rb') as f:
       img = f.read()
    return  img


class PreditionHandler(tornado.web.RequestHandler):
    def initialize(self):
        self.models = []
        for m in models_config:
            self.models.append( model(  model_name= m['model_name'],
                                        model_path= m['model_path'])
            )
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin",  "*")
        self.set_header("Access-Control-Allow-Headers", "*")
        self.set_header("Content-Type",                 "*")
        self.set_header("Access-Control-Allow-Methods", "*")

    def options(self):
        pass


    def post(self):
        filedata = self.request.files['img'][0]
        model_id = self.get_argument('model_id')
        img      = Image.open(BytesIO(filedata['body']))
        ori_size = img.size 

        img.save('images/input.jpg')
        print('start prediction')


        result   = self.models[int(model_id)].predict(img) # PIL.image
        result   = result.resize(ori_size)
        result.putalpha(128)
        
        result.save('images/out.png')

        with open(Path('images/out.png'), 'rb') as f:
            img = f.read()
        img = base64.b64encode(img).decode('utf-8')
        
        print('end prediction')
        self.write(img)
        self.finish()

    def get(self):
        img = get_test_img()
        self.write(img)
        self.finish()
        del img
