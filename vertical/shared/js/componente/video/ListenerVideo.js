/**
 * 
 */
var ListenerVideo = function(controle) {
	this.controle = controle;

	this.addAcao = function(acao,param) {
		var controle = this.controle;
		$('#' + controle).click(function(e) {
			if(typeof param == "undefined"){
				eval(acao + "()");			
			}else{
				eval(acao + "(param)");
			}
		}).trigger('change');
	};
};