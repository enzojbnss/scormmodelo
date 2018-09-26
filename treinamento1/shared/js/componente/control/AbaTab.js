var AbaTab = function(id) {
	this.id = id;
	this.elementos = new Array();
	this.elementoDefult = "";
	this.elementoAtivo = "";
	this.elementoTemp ="";

	this.add = function(elemento, defult) {
		var txtID = "#" + this.id;
		this.elementos.push(elemento);
		if (defult == true) {
			this.elementoDefult = elemento;
		}
		var txtID = "#" + this.id + (this.elementos.length - 1);
		var aba = this;
		$(document).on('click', txtID, function() {
			aba.setActive(elemento);
		});
	};

	this.load = function() {
		if (this.elementoAtivo == "" && this.elementoDefult != "") {
			this.elementoAtivo = this.elementoDefult;
		}else if(this.elementoTemp == "" ){
			this.elementoDefult = this.elementoTemp;
		}
		var ativo = this.elementoAtivo;
		var aba = this;
		$.each(this.elementos, function(index, elemento) {
			var txtID = "#" + aba.id + index;
			if (elemento == ativo) {
				$(txtID).removeClass('inativo');
				$(txtID).addClass('ativo');
				$("#" + elemento).show();
			} else {
				$(txtID).removeClass('ativo');
				$(txtID).addClass('inativo');
				$("#" + elemento).hide();
			}
		});
	};

	this.setActive = function(elemento) {
		if(this.elementoAtivo == elemento){
			this.elementoAtivo = "";
			this.elementoTemp = this.elementoDefult;
			this.elementoDefult = "";
		}else{
			this.elementoAtivo = elemento;	
		}
		this.load();
	};
};