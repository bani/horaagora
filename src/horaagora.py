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
        d = datetime.datetime.now(BR_tzinfo());

        json = {
                "date" : d.strftime("%d/%m/%Y"),
                "hour" : d.hour,
                "minute" : d.strftime("%M"),
                "update" : 60 - d.second
                }
        self.response.out.write(simplejson.dumps(json));

application = webapp.WSGIApplication([('/hora.json', HoraPage)], debug=True)

class BR_tzinfo(datetime.tzinfo):
    """Implementation of the Brazilian timezone."""
    def utcoffset(self, dt):
        return datetime.timedelta(hours= -3) + self.dst(dt)

    def _FirstSunday(self, dt):
        """First Sunday on or after dt."""
        return dt + datetime.timedelta(days=(6 - dt.weekday()))

    def dst(self, dt):
        # terceiro domingo de outubro
        dst_start = self._FirstSunday(datetime.datetime(dt.year, 10, 15, 0))
        # terceiro domingo de fevereiro
        dst_end = self._FirstSunday(datetime.datetime(dt.year, 2, 15, 0))

        if dst_start <= dt.replace(tzinfo=None) < dst_end:
            return datetime.timedelta(hours=1)
        else:
            return datetime.timedelta(hours=0)
    def tzname(self, dt):
        if self.dst(dt) == datetime.timedelta(hours=0):
            return "BRT"
        else:
            return "BRST"


def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()

