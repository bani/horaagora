from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
import cgi
import datetime
import br

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

def getTime():
    d = datetime.datetime.now(br.BR_tzinfo());

    json = {
            "date" : d.strftime("%d/%m/%Y"),
            "hour" : d.hour,
            "minute" : d.strftime("%M"),
            "update" : 60 - d.second
            }
    return json

class HoraJson(webapp.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(simplejson.dumps(getTime()));

class HoraJsonp(webapp.RequestHandler):
    def get(self):
        function = cgi.escape(self.request.get('callback'))
        self.response.headers['Content-Type'] = 'application/javascript'
        self.response.out.write("%s(%s)" % (function, simplejson.dumps(getTime())));

application = webapp.WSGIApplication([('/hora.json', HoraJson), ('/hora.callback', HoraJsonp)], debug=True)


def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()

