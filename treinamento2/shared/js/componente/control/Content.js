/**
 * 
 */
var Content = function() {
	this.modulos = [];
	this.moduloAtual = 0;

	this.isUltimaPagina = function() {
		retorno = false;
		if (this.moduloAtual == (this.modulos.length - 1)) {
			retorno = this.modulos[this.moduloAtual].isUltimaPagina();
		}
		return retorno;
	};

	this.isPrimeiraPagina = function() {
		retorno = false;
		if (this.moduloAtual == 0) {
			retorno = this.modulos[this.moduloAtual].isPrimeiraPagina();
		}
		return retorno;
	};

	this.getUrlAtual = function() {
		return this.modulos[this.moduloAtual].getUrlAtual();
	};

	this.nextPage = function() {
		this.modulos[this.moduloAtual].nextPage();
	};

	this.prevPage = function() {
		this.modulos[this.moduloAtual].prevPage();
	};

	this.addModulo = function(nome) {
		qtdModulos = this.modulos.length;
		qtdModulos++;
		this.modulos.push(new Modulo(nome, qtdModulos));
	};

	this.addPage = function(url, visited) {
		this.modulos[this.moduloAtual].addPage(url, visited);
	};

	this.getPageAtual = function() {
		return this.modulos[this.moduloAtual].getPageAtual();
	};
    
	this.setPageAtual = function(pageAtual) {
		return this.modulos[this.moduloAtual].setPageAtual(pageAtual);
	};
	
};