import os
import warnings
import tornado
import tornado.web
import tornado.ioloop

from .prediction_handler import PreditionHandler


warnings.filterwarnings('ignore')
os.environ["CUDA_DEVICE_ORDER"]    = "PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"] = "6"
os.environ['TF_CPP_MIN_LOG_LEVEL'] = "3" # tensorflow only


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")
        # self.render("index.html")


def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/predict", PreditionHandler)
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(3005)
    tornado.ioloop.IOLoop.current().start()
