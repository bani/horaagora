from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
import datetime

try:
    import simplejson
except ImportError:
    try:
        import json as simplejson
    except ImportError:
        try:
            from django.utils import simplejson
        except:
            raise Exception("SimpleJson nao encontrado")


class HoraPage(webapp.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        d = datetime.datetime.now() - datetime.timedelta(hours=3);

        json = {
                "date" : d.strftime("%d/%m/%Y"),
                "hour" : d.hour,
                "minute" : d.strftime("%M"),
                "update" : 60 - d.second
                }
        self.response.out.write(simplejson.dumps(json));

application = webapp.WSGIApplication([('/hora.json', HoraPage)], debug=True)


def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
