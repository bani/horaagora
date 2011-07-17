function down(pontos) {
    $("#" + pontos).text(parseInt($("#" + pontos).text()) - 1);
}

function up(pontos) {
    $("#" + pontos).text(parseInt($("#" + pontos).text()) + 1);
}
