'''Subset of the classes found on pytz - http://pytz.sf.net'''
from tzinfo import DstTzInfo
from tzinfo import memorized_datetime as d
from tzinfo import memorized_ttinfo as i

class London(DstTzInfo):
    '''Europe/London timezone definition. See datetime.tzinfo for details'''

    zone = 'Europe/London'

    _utc_transition_times = [
d(2010,3,28,1,0,0),
d(2010,10,31,1,0,0),
d(2011,3,27,1,0,0),
d(2011,10,30,1,0,0),
d(2012,3,25,1,0,0),
d(2012,10,28,1,0,0),
d(2013,3,31,1,0,0),
d(2013,10,27,1,0,0),
d(2014,3,30,1,0,0),
d(2014,10,26,1,0,0),
        ]

    _transition_info = [
i(3600,3600,'BST'),
i(0,0,'GMT'),
i(3600,3600,'BST'),
i(0,0,'GMT'),
i(3600,3600,'BST'),
i(0,0,'GMT'),
i(3600,3600,'BST'),
i(0,0,'GMT'),
i(3600,3600,'BST'),
i(0,0,'GMT'),
        ]

class New_York(DstTzInfo):
    '''America/New_York timezone definition. See datetime.tzinfo for details'''

    zone = 'America/New_York'

    _utc_transition_times = [
d(2010,3,14,7,0,0),
d(2010,11,7,6,0,0),
d(2011,3,13,7,0,0),
d(2011,11,6,6,0,0),
d(2012,3,11,7,0,0),
d(2012,11,4,6,0,0),
d(2013,3,10,7,0,0),
d(2013,11,3,6,0,0),
d(2014,3,9,7,0,0),
d(2014,11,2,6,0,0),
        ]

    _transition_info = [
i(-14400,3600,'EDT'),
i(-18000,0,'EST'),
i(-14400,3600,'EDT'),
i(-18000,0,'EST'),
i(-14400,3600,'EDT'),
i(-18000,0,'EST'),
i(-14400,3600,'EDT'),
i(-18000,0,'EST'),
i(-14400,3600,'EDT'),
i(-18000,0,'EST'),
        ]

class Los_Angeles(DstTzInfo):
    '''America/Los_Angeles timezone definition. See datetime.tzinfo for details'''

    zone = 'America/Los_Angeles'

    _utc_transition_times = [
d(2010,3,14,10,0,0),
d(2010,11,7,9,0,0),
d(2011,3,13,10,0,0),
d(2011,11,6,9,0,0),
d(2012,3,11,10,0,0),
d(2012,11,4,9,0,0),
d(2013,3,10,10,0,0),
d(2013,11,3,9,0,0),
d(2014,3,9,10,0,0),
d(2014,11,2,9,0,0),
        ]

    _transition_info = [
i(-25200,3600,'PDT'),
i(-28800,0,'PST'),
i(-25200,3600,'PDT'),
i(-28800,0,'PST'),
i(-25200,3600,'PDT'),
i(-28800,0,'PST'),
i(-25200,3600,'PDT'),
i(-28800,0,'PST'),
i(-25200,3600,'PDT'),
i(-28800,0,'PST'),
        ]

class Chicago(DstTzInfo):
    '''America/Chicago timezone definition. See datetime.tzinfo for details'''

    zone = 'America/Chicago'

    _utc_transition_times = [
d(2010,3,14,8,0,0),
d(2010,11,7,7,0,0),
d(2011,3,13,8,0,0),
d(2011,11,6,7,0,0),
d(2012,3,11,8,0,0),
d(2012,11,4,7,0,0),
d(2013,3,10,8,0,0),
d(2013,11,3,7,0,0),
d(2014,3,9,8,0,0),
d(2014,11,2,7,0,0),
        ]
    _transition_info = [
i(-18000,3600,'CDT'),
i(-21600,0,'CST'),
i(-18000,3600,'CDT'),
i(-21600,0,'CST'),
i(-18000,3600,'CDT'),
i(-21600,0,'CST'),
i(-18000,3600,'CDT'),
i(-21600,0,'CST'),
i(-18000,3600,'CDT'),
i(-21600,0,'CST'),
        ]

class Johannesburg(DstTzInfo):
    '''Africa/Johannesburg timezone definition. See datetime.tzinfo for details'''

    zone = 'Africa/Johannesburg'

    _utc_transition_times = [
d(1944,3,18,23,0,0),
        ]

    _transition_info = [
i(7200,0,'SAST'),
        ]

class Tokyo(DstTzInfo):
    '''Asia/Tokyo timezone definition. See datetime.tzinfo for details'''

    zone = 'Asia/Tokyo'

    _utc_transition_times = [
d(1951,9,7,16,0,0),
        ]

    _transition_info = [
i(32400,0,'JST'),
        ]
    
class India(DstTzInfo):
    '''Asia/India timezone definition. See datetime.tzinfo for details'''

    zone = 'Asia/India'

    _utc_transition_times = [
d(1,1,1,0,0,0),
        ]

    _transition_info = [
i(19800,0,'IST'),
        ]
    

