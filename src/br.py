import datetime

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
        dst_end = self._FirstSunday(datetime.datetime(dt.year+1, 2, 15, 0))
        #TODO: Considerar Carnaval

        if dst_start <= dt.replace(tzinfo=None) < dst_end:
            return datetime.timedelta(hours=1)
        else:
            return datetime.timedelta(hours=0)
    def tzname(self, dt):
        if self.dst(dt) == datetime.timedelta(hours=0):
            return "BRT"
        else:
            return "BRST"
