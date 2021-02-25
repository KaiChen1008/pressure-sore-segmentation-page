import tornado
import tornado.web
import tornado.ioloop
import json
import base64
from pathlib import Path
from pprint  import pprint
from modules.model import model
from modules.utils import area_count
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
                                        model_path= m['model_path'],
                                        model_id  = m['model_id'])
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
        x        = int(self.get_argument('x'))

        img      = Image.open(BytesIO(filedata['body']))
        ori_size = img.size 

        img.save('images/input.jpg')
        print('------------------------start prediction------------------------')


        results = []
        for m in self.models:
            result = m.predict(img)             # PIL.Image
            results.append(result)


        # result   = self.models[int(model_id)].predict(img) # PIL.Image
        # result   = result.resize(ori_size)
        # result.putalpha(128)
        # result.save('images/out.png')
        # with open(Path('images/out.png'), 'rb') as f:
            # img = f.read()
        # img = base64.b64encode(img).decode('utf-8')
        response = {}
        response['count'] = f'{area_count(results[0], results[1], x):.2f}'


        for i in range(len(results)):
            results[i] = results[i].resize(ori_size)
            results[i].putalpha(128)

            file_name = f'images/out_{i}.png'
            results[i].save(file_name)
            with open(file_name, 'rb') as f:
                img = f.read()
            img = base64.b64encode(img).decode('utf-8')
            response[str(i)] = img
        
        print('------------------------end prediction------------------------')
        self.write(response)
        self.finish()

    def get(self):
        self.write('hi')