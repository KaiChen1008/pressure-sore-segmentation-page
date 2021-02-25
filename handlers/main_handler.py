import tornado
import tornado.web
import tornado.ioloop


class MainHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin",  "*")
        self.set_header("Access-Control-Allow-Headers", "*")
        self.set_header("Content-Type",                 "*")
        self.set_header("Access-Control-Allow-Methods", "*")

    def get(self):
        # self.write("Hello, world")
        print('render html')
        self.render("../build/index.html")
    

