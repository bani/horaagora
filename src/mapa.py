from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
import datetime
import br
import timezones
import cgi
import math

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
        json.append({"lat": "-23.422298", "lng": "-46.765709", "location": "S&atilde;o Paulo", "time": d.strftime("%H:%M")})
        d = datetime.datetime.now(timezones.London());
        json.append({"lat": "51.500152", "lng": "-0.126236", "location": "London", "time": d.strftime("%H:%M")})
        d = datetime.datetime.now(timezones.New_York());
        json.append({"lat": "40.927521", "lng": "-74.266205", "location": "New York", "time": d.strftime("%H:%M")})
        d = datetime.datetime.now(timezones.Los_Angeles());
        json.append({"lat": "34.321889", "lng": "-117.953339", "location": "Los Angeles", "time": d.strftime("%H:%M")})
        d = datetime.datetime.now(timezones.Chicago());
        json.append({"lat": "41.971233", "lng": "-87.780075", "location": "Chicago", "time": d.strftime("%H:%M")})
        d = datetime.datetime.now(timezones.Johannesburg());
        json.append({"lat": "-25.948784", "lng": "27.78511", "location": "Johannesburg", "time": d.strftime("%H:%M")})
        d = datetime.datetime.now(timezones.Tokyo());
        json.append({"lat": "35.970227", "lng": "139.980927", "location": "Tokyo", "time": d.strftime("%H:%M")})
        d = datetime.datetime.now(timezones.India());
        json.append({"lat": "28.635308", "lng": "77.22496", "location": "New Delhi", "time": d.strftime("%H:%M")})

        self.response.out.write(simplejson.dumps(json));
        
class New(webapp.RequestHandler):
    def get(self):
        lng = float(cgi.escape(self.request.get('lng')))
        offset = math.floor(lng / 15) if lng > 0 else math.ceil(lng / 15)
        d = datetime.datetime.now() + datetime.timedelta(hours=offset)
        
        self.response.headers['Content-Type'] = 'application/json'
        

        json = {
                "time" : d.strftime("%H:%M")
                }
        self.response.out.write(simplejson.dumps(json));

application = webapp.WSGIApplication([('/mapa.json', Mapa), ('/mapa.json/new', New)], debug=True)


def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()

