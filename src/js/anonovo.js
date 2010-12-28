var counterNewYear = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    
    initialize: function(){
        $.getJSON("hora.json", function(time){
            
            if(time.date.split('/')[1] < 12) {
                $("#full").hide();
                $("#short").text("2011");
            }
            counterNewYear.days = 31 - time.date.split('/')[0];
            counterNewYear.hours = 23 - time.hour;
            counterNewYear.minutes = 59 - time.minute;
            counterNewYear.seconds = time.update;
            counterNewYear.update();
        });
    },
    
    show: function(){
        if (counterNewYear.minutes == 0 && counterNewYear.hours == 0 && counterNewYear.days == 0) {
            $("#full").hide();
            $("#short").text(counterNewYear.seconds);
        }
        else {
            $("#day").text(counterNewYear.days);
            $("#hour").text(counterNewYear.hours);
            $("#minute").text(counterNewYear.minutes);
            $("#sec").text(counterNewYear.seconds);
        }
    },
    
    update: function(){
        counterNewYear.show();
        counterNewYear.seconds -= 1;
        if (counterNewYear.seconds < 0) {
            counterNewYear.seconds = 59;
            counterNewYear.minutes -= 1;
            if (counterNewYear.minutes < 0) {
                counterNewYear.minutes = 59;
                counterNewYear.hours -= 1;
                if (counterNewYear.hours < 0) {
                    counterNewYear.hours = 23;
                    counterNewYear.days -= 1;
                    if (counterNewYear.days < 0) {
                        startFw();
                        _gaq.push(['_trackEvent', 'AnoNovo', '2011']);
                        return;
                    }
                }
            }
        }
        window.setTimeout("counterNewYear.update()", 1000);
    }
}

$(document).ready(function(){
    counterNewYear.initialize();
});

/**
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
