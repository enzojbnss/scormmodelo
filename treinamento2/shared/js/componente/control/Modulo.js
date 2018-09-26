/**
 * 
 */
var Modulo = function(url, id) {
	this.id = id;
	this.url = url;
	this.pages = [];
	this.pageAtual = 0;
	this.finalizado = false;
	this.inicial = false;

	this.getUrlAtual = function() {
		return this.pages[this.pageAtual].getUrl();
	};

	this.nextPage = function() {
		if(typeof this.pageAtual == "undefined"){
			this.pageAtual = 0;
		}
		this.pageAtual++;
		if (this.pageAtual == (this.pages.length - 1)) {
			this.finalizado = true;
		} else {
			this.finalizado = false;
		}
	};

	this.isUltimaPagina = function() {
		return this.finalizado;
	};

	this.isPrimeiraPagina = function() {
		return this.inicial;
	};

	this.prevPage = function() {
		this.pageAtual--;
		if (this.pageAtual > 0) {
			this.inicial = false;
		} else {
			this.inicial = true;
		}
	};

	this.getQuantidadePaginas = function() {
		return this.pages.length;
	};

	this.addPage = function(url, objective, visited) {
		this.pages.push(new Page(url, objective, visited));
	};

	this.getPage = function(index) {
		return this.pages[index];
	};

	this.getID = function() {
		return this.id;
	};

	this.getName = function() {
		return this.name;
	};

	this.getPageAtual = function() {
		return this.pageAtual;
	};

	this.setPageAtual = function(pageAtual) {
		this.pageAtual = pageAtual;
	};
	
    
};