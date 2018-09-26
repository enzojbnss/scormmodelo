/**
 * 
 */
var Tela = function(id) {
	this.id = id;

	this.setSRC = function(src) {
		$("#" + this.id).attr("src", "../" + src)
	};
};
