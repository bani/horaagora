var timer = {
    secs: undefined,
    timerID: undefined,
    timerRunning: false,
    delay: 1000,
    time: undefined,
    
    initializeTimer: function(tempo){
        if (this.validateTime(tempo)) {
            _gaq.push(['_trackEvent', 'Cronometro', 'Start', 'Tempo', this.secs]);
            this.time = tempo;
            this.timerRunning = true;
            this.countdown();
        }
    },
    
    validateTime: function(tempo){
        var t = tempo.split(':');
        if (t.length > 1) {
            this.secs = parseInt(t[0], 10) * 60 + parseInt(t[1], 10);
        }
        else {
            this.secs = parseInt(tempo, 10);
        }
        if (isNaN(this.secs) || tempo.indexOf(':') != tempo.lastIndexOf(':')) {
            $.prompt('Digite o tempo no formato<br/>MM:SS<br/><br/><input type="text" id="alertName" name="alertName" value="02:00" />', {
                callback: callbackStart,
                buttons: {
                    Iniciar: 'Ok'
                }
            });
            return false;
        }
        return true;
    },
    
    stopTimer: function(){
        if (this.timerRunning) 
            clearTimeout(this.timerID);
        this.timerRunning = false;
        $.prompt('Tempo Esgotado!', {
            callback: callbackStop,
            buttons: {
                Ok: 'Ok'
            }
        });
        audioElement.play();
        _gaq.push(['_trackEvent', 'Cronometro', 'Stop', 'Tempo', this.secs]);
    },
    
    countdown: function(){
        this.displayTime();
        if (this.secs == 0) {
            this.stopTimer();
        }
        else {
            this.secs = this.secs - 1;
            this.timerID = self.setTimeout("timer.countdown()", this.delay);
        }
    },
    
    displayTime: function(){
        var minute = Math.floor(this.secs / 60);
        if (minute < 10) 
            minute = '0' + minute;
        $("#minute").text(minute);
        var second = this.secs % 60;
        if (second < 10) 
            second = '0' + second;
        $("#second").text(second);
    }
};

var audioElement = document.createElement('audio');
audioElement.setAttribute('src', 'style/timer.ogg');
audioElement.addEventListener('ended', function(){
    this.currentTime = 0;
}, false);

function callbackStop(v, m, f){
    audioElement.pause();
    $('.timer').show();
    $('#bookmark').attr("href", document.location.href.split("?", 2)[0] + "?t=" + timer.time);
    $("#tempo").text(timer.time);
}

function callbackStart(v, m, f){
    if (v != undefined) {
        timer.initializeTimer(f.alertName);
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
        timer.initializeTimer(tempo);
    }
});
