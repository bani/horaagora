function atualizaConteudo(){
	try{
	$.ajax({
		url:"http://bani.appspot.com/hora.callback?callback=?",
		cache:false,
		type:"GET",
		dataType:"jsonp",
		timeout:5000,
		crossDomain:true,
		jsonpCallback:"updateTime",
		error: function(request,error) {localTime();}
		})
	} catch (err) {
		localTime();
	}
}

function updateTime(data) {
    $("#data").text(data.date);
    $("#hour").text(data.hour);
    $("#minute").text(data.minute);
    _gaq.push(['_trackEvent', 'Time', 'Update']);
    window.setTimeout("atualizaConteudo()", data.update * 1000);
}

function localTime() {
	var currentTime = new Date();
	$("#data").text(currentTime.getDate() + "/" + currentTime.getMonth() + "/" + currentTime.getYear());
    $("#hour").text(currentTime.getHours());
    $("#minute").text(currentTime.getMinutes());
}

$(document).ready(function(){
	localTime();
    atualizaConteudo();
});