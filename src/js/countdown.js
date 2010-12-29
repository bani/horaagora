var countdown = {
    year: 2010,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    
    sync: function(){
        $.getJSON("hora.json", function(time){
            countdown.year = time.date.split('/')[2];
            countdown.days = 31 - time.date.split('/')[0];
            countdown.hours = 23 - time.hour;
            countdown.minutes = 59 - time.minute;
            countdown.seconds = time.update;
            countdown.update();
        });
    },
    
    show: function(){
        if (countdown.minutes == 0 && countdown.hours == 0 && countdown.days == 0) {
            $("#full").hide();
            $("#short").text(countdown.seconds);
        }
        else {
            $("#day").text(countdown.days);
            $("#hour").text(countdown.hours);
            $("#minute").text(countdown.minutes);
            $("#sec").text(countdown.seconds);
        }
    },
    
    update: function(){
        countdown.show();
        countdown.seconds -= 1;
        if (countdown.seconds < 0) {
            countdown.seconds = 59;
            countdown.minutes -= 1;
            if(countdown.minutes % 20 == 0)
                countdown.sync();
            if (countdown.minutes < 0) {
                countdown.minutes = 59;
                countdown.hours -= 1;
                if (countdown.hours < 0) {
                    countdown.hours = 23;
                    countdown.days -= 1;
                    if (countdown.days < 0) {
                        startFw();
                        _gaq.push(['_trackEvent', 'AnoNovo', '2011']);
                        return;
                    }
                }
            }
        }
        window.setTimeout("countdown.update()", 1000);
    }
}

$(document).ready(function(){
    countdown.sync();
    if (countdown.year > 2010) {
        $("#full").hide();
        $("#short").text(countdown.year);
    }
    else {
        $("#full").show();
    }
});

/**
 * FIREWORKS
 * You may use this code for free on any web page provided that
 * these comment lines and the following credit remain in the code.
 * Cross Browser Fireworks from http://www.javascript-fx.com
 */
var theObj = '<font size="4" color="#ffffff" class="fireworks"><b>.</b></font>';
var numObj = 40, _dl = document.layers, sparks = new Array();
mx = function(){
    return window.pageXOffset ? window.pageXOffset : document.body.scrollLeft;
};
my = function(){
    return window.pageYOffset ? window.pageYOffset : document.body.scrollTop;
};
cx = window.innerWidth ? window.innerWidth : document.body.clientWidth;
cy = window.innerHeight ? window.innerHeight : document.body.clientHeight;


for (var i = 0; i < numObj; i++) 
    document.write(_dl ? "<layer name='sf" + i + "'>" + theObj + "</layer>" : "<div id='sf" + i + "' style='position:absolute'>" + theObj + "</div>");
$(".fireworks").hide();

function ani(){
    for (var i = 0; i < numObj; i++) {
        var el = sparks[i];
        el.style.left = (el.x += el.dx);
        el.style.top = (el.y += (el.dy += .09));
    }
}

function reset(){
    var fwX = mx() + 100 + Math.random() * (cx - 200), fwY = my() + 100 + Math.random() * (cy - 200);
    for (var i = 0; i < numObj; i++) {
        var el = sparks[i] = _dl ? document.layers["sf" + i] : document.getElementById("sf" + i);
        var a = Math.random() * 6.294, s = (Math.random() > .6) ? 2 : Math.random() * 2;
        el.dx = s * Math.sin(a);
        el.dy = s * Math.cos(a) - 2;
        el.x = fwX;
        el.y = fwY;
        _dl ? el.style = el : null;
    }
};
function startFw(){
    $(".fireworks").show();
    reset();
    t1 = setInterval("ani()", 40);
    t2 = setInterval("reset()", 2000);
}

function stopFw(){
    clearInterval(t1);
    clearInterval(t2);
    for (var i = 0; i < numObj; i++) {
        var el = sparks[i];
        el.style.left = -10;
        el.style.top = -10;
    }
}
