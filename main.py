import webapp2
from boilerplate import BaseHandler


class MainHandler(BaseHandler):
    def get(self):
        self.render("index.html", {})


app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)
