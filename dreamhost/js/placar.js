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

function resetPlacar() {
	for (i = 1; i<=8; i++) {
		$("#pontos" + i).text("1");
	}
}

var sound = {
    up: undefined,
    down: undefined,
    audioInit: function(){
        try {
            this.up = document.createElement('audio');
            this.up.setAttribute('src', 'http://baniverso.com/horaagora/style/up.wav');
            this.down = document.createElement('audio');
            this.down.setAttribute('src', 'http://baniverso.com/horaagora/style/down.wav');
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
