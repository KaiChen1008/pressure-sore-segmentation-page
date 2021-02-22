import os
import warnings
import tornado.web
import tornado.ioloop

import numpy as np

from PIL import Image

from modules.evaluate import predict、

warnings.filterwarnings('ignore')
os.environ["CUDA_DEVICE_ORDER"]    = "PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"] = "0"
os.environ['TF_CPP_MIN_LOG_LEVEL'] = "3" # tensorflow only


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

    def post(self):
        self.write("post")

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(3005)
    tornado.ioloop.IOLoop.current().start()
