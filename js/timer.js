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
                callback: callback.start,
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
            callback: callback.stop,
            buttons: {
                Ok: 'Ok'
            }
        });
        html5stuff.audioPlay();
        html5stuff.notificationShow();
        timer.timeIsUp = true;
        this.toggleTitle();
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
    },
    
    titleFrame: 0,
    timeIsUp: false,
    toggleTitle: function() {
        this.titleFrame++;
        var frame = this.titleFrame % 4;
        switch(frame) {
            case 0:
                document.title = '| Tempo! |';
                break;
            case 1:
                document.title = '/ Tempo! \\';
                break;
            case 2:
                document.title = '-- Tempo! --';
                break;
            case 3:
                document.title = '\\ Tempo! /';
                break;
        }

        if (timer.timeIsUp) {
            setTimeout("timer.toggleTitle()", 200);
        } else {
            document.title = 'Hora Agora';
        }
        
    }
};

var html5stuff = {
    audioElement: undefined,
    audioInit: function(){
        try {
            this.audioElement = document.createElement('audio');
            this.audioElement.setAttribute('src', 'http://baniverso.com/horaagora/style/timer.ogg');
            this.audioElement.addEventListener('ended', function(){
                this.currentTime = 0; // loop
            }, false);
        } 
        catch (err) {}
    },
    audioPlay: function(){
        try {
            this.audioElement.play();
        } 
        catch (err) {}
    },
    audioPause: function(){
        try {
            this.audioElement.pause();
        } 
        catch (err) {}
    },
    notificationPermission: function(){
        try {
            if (window.webkitNotifications && window.webkitNotifications.checkPermission() > 0) {
                window.webkitNotifications.requestPermission();
            }
        } catch (err) {}
    },
    notificationElement: undefined,
    notificationShow: function(){
        try {
            if (window.webkitNotifications && window.webkitNotifications.checkPermission() == 0) {
                this.notificationElement = window.webkitNotifications.createNotification("http://baniverso.com/horaagora/style/cronometro.png", "Timer", "Tempo Esgotado!");
                this.notificationElement.onclose = function(){
                    html5stuff.audioPause();
                };
                this.notificationElement.show();
            }
        } catch (err) {}
    }
};


var callback = {
    stop: function(v, m, f){
        html5stuff.audioPause();
        timer.timeIsUp = false;
        $('.timer').show();
        $('#bookmark').attr("href", document.location.href.split("?", 2)[0] + "?t=" + timer.time);
        $("#tempo").text(timer.time);
    },
    
    start: function(v, m, f){
        if (v != undefined) {
            timer.initializeTimer(f.alertName);
        }
    }
};


$(document).ready(function(){
    var tempo = $.url.param("t");
    html5stuff.audioInit();
    if (tempo == undefined || tempo == '') {
        $.prompt('<br />Digite o tempo para contagem regressiva:<br /><br /><input type="text" id="alertName" name="alertName" value="02:00" />', {
            callback: callback.start,
            buttons: {
                Iniciar: 'Ok'
            }
        });
    }
    else {
        timer.initializeTimer(tempo);
    }
});
