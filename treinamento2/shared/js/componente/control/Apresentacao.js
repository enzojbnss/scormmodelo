var Apresentacao = function() {
	this.slides = [];
	this.tipos = []
	this.slideAtual = 0;

	this.add = function(slide,tipo) {
		this.slides.push(slide);
		this.tipos.push(tipo);
	}

	this.getIndiceAtual = function(){
		return this.slideAtual;
	}
	
	
	this.getSlideAtual = function(posicao) {
		return this.slides[this.slideAtual];
	}

	this.getSlide = function(posicao) {
		return this.slides[posicao];
	}

	this.setSlideAtual = function(posicao) {
		this.slideAtual = posicao;
	}
	
	this.getTipoAtual = function(posicao) {
		return this.tipos[this.slideAtual];
	}

	this.getTipo = function(posicao) {
		return this.tipos[posicao];
	}

	this.prev = function() {
		this.slideAtual--;
	}

	this.next = function() {
		this.slideAtual++;
	}

	this.isFirst = function() {
		return (this.slideAtual == 0);
	}

	this.isLast = function() {
		return (this.slideAtual == (this.slides.length -1));
	}
	
	this.count = function(){
        return this.slides.length;		
	}

};