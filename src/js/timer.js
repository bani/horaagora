var secs;
var timerID = null;
var timerRunning = false;
var delay = 1000;
var time;

var audioElement = document.createElement('audio');
audioElement.setAttribute('src', 'style/timer.ogg');
audioElement.addEventListener('ended', function(){
    this.currentTime = 0;
}, false);


function initializeTimer(tempo){
    stopTimer();
    if (validateTime(tempo)) {
        _gaq.push(['_trackEvent', 'Cronometro', 'Start', 'Tempo', secs]);
        countdown();
    }
}

function validateTime(tempo){
    t = tempo.split(':');
    if (t.length > 1) {
        secs = parseInt(t[0], 10) * 60 + parseInt(t[1], 10);
    }
    else {
        secs = parseInt(tempo, 10);
    }
    if (isNaN(secs) || tempo.indexOf(':') != tempo.lastIndexOf(':')) {
        $.prompt('Digite o tempo no formato<br/>MM:SS<br/><br/><input type="text" id="alertName" name="alertName" value="02:00" />', {
            callback: callbackStart,
            buttons: {
                Iniciar: 'Ok'
            }
        });
        
        return false;
    }
    time = tempo;
    return true;
}

function stopTimer(){
    if (timerRunning) 
        clearTimeout(timerID);
    timerRunning = false;
}

function countdown(){
    printTime(secs);
    if (secs == 0) {
        stopTimer()
        $.prompt('Tempo Esgotado!', {
            callback: callbackStop,
            buttons: {
                Ok: 'Ok'
            }
        });
        audioElement.play();
        _gaq.push(['_trackEvent', 'Cronometro', 'Stop', 'Tempo', secs]);
    }
    else {
        secs = secs - 1;
        timerRunning = true;
        timerID = self.setTimeout("countdown()", delay);
    }
}

function callbackStop(v, m, f){
    audioElement.pause();
    $('.timer').show();
    $('#bookmark').attr("href", document.location.href.split("?", 2)[0] + "?t=" + time);
    $("#tempo").text(time);
}

function printTime(secs){
    var minute = Math.floor(secs / 60);
    if (minute < 10) 
        minute = '0' + minute;
    $("#minute").text(minute);
    var second = secs % 60;
    if (second < 10) 
        second = '0' + second;
    $("#second").text(second);
}

function callbackStart(v, m, f){
    if (v != undefined) {
        initializeTimer(f.alertName);
    }
}

$(document).ready(function(){
    var tempo = $.url.param("t");
    if (tempo == undefined || tempo == '') {
        $.prompt('<br />Digite o tempo para contagem regressiva:<br /><br /><input type="text" id="alertName" name="alertName" value="02:00" />', {
            callback: callbackStart,
            buttons: {
                Iniciar: 'Ok'
            }
        });
    }
    else {
        initializeTimer(tempo);
    }
});
