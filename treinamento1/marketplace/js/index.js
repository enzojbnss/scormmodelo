// declaração de constantes
var QUESTION_TYPE_CHOICE = "choice";
var QUESTION_TYPE_TF = "true-false";
var QUESTION_TYPE_NUMERIC = "numeric";
var SLIDE_TYPE_CONTEUDO = "conteudo";
var SLIDE_TYPE_CONTEUDOINICIAL = "conteudoInicial";
var SLIDE_TYPE_CONTEUDOFINAL = "conteudoFinal";
var SLIDE_TYPE_PERGUNTA = "pergunta";
// declaração de constantes

// declaração de variaveis de objeto
var conteudo = "";
var navegador = "";
var scorm = "";
var apresentacao = "";
var test = "";
var aluno = "";
// declaração de variaveis de objeto

// declaração de variaveis
var scormIsFinalized = false;
var scormIsRegistred = false;
var apresentacaoCount = 0;
var questaoAtual = 0;
var estilo = "teste";
var indicePosition = [];
var indice = 0;
var bookmarkAtual = 0;
var idquestao = 0;
var estilo = "";
var indiceAtual = -1;
var videoAtual = 0;
var intervalo = "";
var ultimoVideo = 0;
// declaração de variaveis
// inicializacao do player
var player = new Video("video");
player.addSource(new SourceVideo("marketplace/video/video.mp4"));
player.addSource(new SourceVideo("marketplace/video/video1.mp4"));
player.addSource(new SourceVideo("marketplace/video/video2.mp4"));
player.addSource(new SourceVideo("marketplace/video/video3.mp4"));
player.addSource(new SourceVideo("marketplace/video/video4.mp4"));
player.addSource(new SourceVideo("marketplace/video/video5.mp4"));
player.addSource(new SourceVideo("marketplace/video/video6.mp4"));
player.addSource(new SourceVideo("marketplace/video/video7.mp4"));
// inicializacao do player
// SetupIFrame("contentFrame");

$(function() {
	$(window).on('beforeunload', doUnload(false));
	$(window).on('unload', doUnload());
	$(document).on('click', "#btnAction", function() {
		responder()
	});
	$("#btnPrev").mouseover(function() {
		if (testeExibePrev()) {
			exibiPrev(true);
		} else {
			exibiPrev(false);
		}
	}).mouseout(function() {
		exibiPrev(false);
	});
	$("#btnNext").mouseover(function() {
		if (testeExibeNext()) {
			exibiNext(true);
		} else {
			exibiNext(false);
		}
	}).mouseout(function() {
		exibiNext(false);
	});
	init();
});

function init() {
	setContent();
	navegador = new Navegador();
	navegador.setValorInativo(0, 0);
	initApresentacao()
	defineEstiloBody();
	selectDiv();
	try {
		scorm = new Scorm();
		scorm.setStartTime(new Date());
		scorm.processInitialize(getAPI());
		verificaStatus();
		var bookmark = getBookmark();
		bookmark = testaBookmark(bookmark);
		bookmarkAtual = bookmarkAtual;
		idAluno = scorm.processGetValue("cmi.core.student_id");
		nomeAluno = scorm.processGetValue("cmi.core.student_name");
		scoreAluno = 0;
		aluno = new Aluno(idAluno, nomeAluno, scoreAluno);
		scorm.processSetValue("cmi.core.lesson_location", bookmark);
	} catch (e) {
		aluno = new Aluno(1, "teste", 0);
		alert(e);
	}
}

function setContent() {
	conteudo = new Content();
	conteudo.addModulo("MiniHub");
	conteudo.addPage("");
}

// #########################################################################################################################################################
// manipula navegação
function funcaoNext() {
	videoAtual = videoAtual + 2;
	initVideo();
};

function funcaoPrev() {
	videoAtual = videoAtual - 2;
	initVideo();
};
// manipula navegação
// #########################################################################################################################################################
// manipula botão de navegação
function exibiPrev(value) {
	navegador.ativaBtnPrev(value);
}

function exibiNext(value) {
	navegador.ativaBtnNext(value);
}

// manipula botão de navegação
// #########################################################################################################################################################
// manipula apresentação

function initApresentacao() {
	apresentacao = new Apresentacao();
	apresentacao.add("conteudo", SLIDE_TYPE_CONTEUDOFINAL);
}

function getSlideRetorno() {
	var retorno = 0;
	$.each(indicePosition, function(index, valor) {
		if (getBookmark() == indice) {
			retorno = valor;
		}
	});
	return retorno
}

function getBookmarckVigente() {
	return 1;
}

function isNewBookmarck() {
	return true;
}

// manipula apresentação
// #########################################################################################################################################################
// manipula seção da pagina
function selectDiv() {
	exibiNext(false);
	exibiPrev(false);
	$("#dvconteudo").show();
	initVideo();
}
// manipula seção da pagina
// #########################################################################################################################################################
// manipula estilo
function defineEstiloBody() {
	try {
		estilo = apresentacao.getSlideAtual();
	} catch (e) {
		estilo == "conteudo";
	}
	$("#corpo").attr("class", estilo);
}
// manipula estilo
// #########################################################################################################################################################
// manipuçla de video
function initVideo() {
	player.intiVideo(videoAtual);
}

function acopanhaVideo(currentTime, duration) {
	player.onTrackedVideoFrame(currentTime, duration);
	$('#duracao').val(duration);
	$('#time').val(currentTime);
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

function encerraVideo() {
	if (videoAtual < player.getQtdSource()) {
		videoAtual++;
		if (ultimoVideo < videoAtual) {
			ultimoVideo = videoAtual;
		}
		scorm.processSetValue("cmi.core.lesson_location",
				(videoAtual * (100 / player.getQtdSource())));
		if (videoAtual == player.getQtdSource()) {
			scorm.processSetValue("cmi.core.lesson_status", "completed");
		}
		initVideo();
	}
}
// manipuçla de video
// #########################################################################################################################################################
// evento de saida de tela
function doUnload(pressedExit) {
	try {
		if (processedUnload == true) {
			return;
		}
		processedUnload = true;
		var endTimeStamp = new Date();
		var totalMilliseconds = (endTimeStamp.getTime() - startTimeStamp
				.getTime());
		var scormTime = ConvertMilliSecondsToSCORMTime(totalMilliseconds, false);
		scorm.setStartTime = (scormTime);
		scorm.processSetValue("cmi.core.session_time", scormTime);
		if (pressedExit == false && reachedEnd == false) {
			scorm.processSetValue("cmi.core.exit", "suspend");
		}
		scorm.processFinish();
	} catch (e) {
		// TODO: handle exception
	}
}

function doExit() {
	try {
		if (reachedEnd == false
				&& confirm("Would you like to save your progress  to resume later?")) {
			scorm.processSetValue("cmi.core.exit", "suspend");
		} else {
			scorm.processSetValue("cmi.core.exit", "");
		}
		doUnload(true);
	} catch (e) {
		// TODO: handle exception
	}
}

function testeExibePrev() {
	var valorExibePrev = false;
	if (videoAtual > 1 && videoAtual < (player.getQtdSource() - 1)) {
		if (videoAtual % 2 > 0) {
			valorExibePrev = true;
		}
	}
	return valorExibePrev;
}

function testeExibeNext() {
	var valorExibeNext = false;
	if (videoAtual >= 1 && videoAtual < ultimoVideo
			&& videoAtual < (player.getQtdSource() - 1)) {
		if (videoAtual % 2 > 0) {
			valorExibeNext = true;
		}
	}
	return valorExibeNext;
}
