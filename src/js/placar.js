function down(pontos) {
    $("#" + pontos).text(parseInt($("#" + pontos).text()) - 1);
    sound.playDown();
}

function up(pontos) {
    $("#" + pontos).text(parseInt($("#" + pontos).text()) + 1);
    sound.playUp();
}

function excluir(jogador) {
    $("#" + jogador).hide();
}

var sound = {
    up: undefined,
    down: undefined,
    audioInit: function(){
        try {
            this.up = document.createElement('audio');
            this.up.setAttribute('src', 'style/up.wav');
            this.down = document.createElement('audio');
            this.down.setAttribute('src', 'style/down.wav');
        } 
        catch (err) {}
    },
    playUp: function(){
        try {
            this.up.play();
        } 
        catch (err) {}
    },
    playDown: function(){
        try {
            this.down.play();
        } 
        catch (err) {}
    },
};

$(document).ready(function(){
    sound.audioInit();
});
