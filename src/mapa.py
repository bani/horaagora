from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
import datetime
import br
import timezones

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


class Mapa(webapp.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        
        json = []
        #TODO: colocar no datastore e substituir classes da pytz
        d = datetime.datetime.now(br.BR_tzinfo());
        json.append({"lat": "-23.31", "lng": "-46.31", "location": "S&atilde;o Paulo", "time": d.strftime("%H:%M")})
        d = datetime.datetime.now(timezones.London());
        json.append({"lat": "51.32", "lng": "0.05", "location": "London", "time": d.strftime("%H:%M")})
        d = datetime.datetime.now(timezones.New_York());
        json.append({"lat": "41.36", "lng": "-74.77", "location": "New York", "time": d.strftime("%H:%M")})
        d = datetime.datetime.now(timezones.Los_Angeles());
        json.append({"lat": "34.05", "lng": "-118.19", "location": "Los Angeles", "time": d.strftime("%H:%M")})
        d = datetime.datetime.now(timezones.Johannesburg());
        json.append({"lat": "-26.12", "lng": "24.04", "location": "Johannesburg", "time": d.strftime("%H:%M")})
        d = datetime.datetime.now(timezones.Tokyo());
        json.append({"lat": "35.40", "lng": "139.45", "location": "Tokyo", "time": d.strftime("%H:%M")})

        self.response.out.write(simplejson.dumps(json));

application = webapp.WSGIApplication([('/mapa.json', Mapa)], debug=True)


def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()

