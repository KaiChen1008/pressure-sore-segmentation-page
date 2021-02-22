import tornado
import tornado.web
import tornado.ioloop

from pathlib import Path

from modules.model import model
from config        import models_config

class PreditionHandler(tornado.web.RequestHandler):
    def initialize(self):
        self.models = []
        for model in models_config:
            self.models.append( model(  model_name= model['model_name'],
                                        model_path= model['model_path'])
            )

    def post(self):
        model_id = self.get_argument("model_id")
        img      = self.get_argument("img")

        result   = self.model[model_id].predict(img)

        self.write(result)

    def get(self):
        self.write('hi from /predict')