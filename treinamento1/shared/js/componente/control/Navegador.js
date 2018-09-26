var Navegador = function(idPrev, idNext, strFuncaoPrev, strFuncaoNext) {
	this.idPrev = testeValor(idPrev, "btnPrev");
	this.idNext = testeValor(idNext, "btnNext");
	this.strFuncaoNext = testeValor(strFuncaoNext, "funcaoNext");
	this.strFuncaoPrev = testeValor(strFuncaoPrev, "funcaoPrev");
	this.btnPrevAtivo = true;
	this.btnNextAtivo = true;
	this.valorPrevInativo = 0;
	this.valorNextInativo = 0;

	this.setValorInativo = function(valuePrev,valueNext){
		this.valorPrevInativo = valuePrev;
		this.valorNextInativo = valueNext;
	};
	
	this.ativaBtnPrev = function(value) {
		this.btnPrevAtivo = value;
		if (value == true) {
			this.exibirPrev();
		} else {
			this.escondePrev();
		}
	};
	this.ativaBtnNext = function(value) {
		this.btnNextAtivo = value;
		if (value == true) {
			this.exibirNext();
		} else {
			this.escondeNext();
		}
	};
	
	this.exibirPrev = function() {
		$("#btnPrev").css("opacity", 1);
		$("#btnPrev").css("cursor", "pointer");
	};
	this.escondePrev = function() {
		$("#btnPrev").css("opacity", this.valorPrevInativo);
		$("#btnPrev").css("cursor", "default");
	};
	this.exibirNext = function() {
		$("#btnNext").css("opacity", 1);
		$("#btnNext").css("cursor", "pointer");
	};
	this.escondeNext = function() {
		$("#btnNext").css("opacity", this.valorNextInativo);
		$("#btnNext").css("cursor", "default");
	};
	var varStrFuncaoNext = this.strFuncaoNext;
	var varStrFuncaoPrev = this.strFuncaoPrev;
	var self = this;
	$('#' + this.idNext).click(function(e) {
		exec(varStrFuncaoNext, self);
	}).trigger('change');
	$('#' + this.idPrev).click(function(e) {
		exec(varStrFuncaoPrev, self);
	}).trigger('change');
};

function testeValor(valor, valorPadrao) {
	var retorno = valor;
	if (valor == "" || typeof valor == "undefined") {
		return valorPadrao;
	}
	return retorno;
}

function exec(funcao, self) {
	if (funcao == "funcaoNext") {
		if (self.btnNextAtivo == true) {
			try {
				if (typeof funcaoNext == "function") {
					funcaoNext();
				} else {
					parent.funcaoNext();
				}
			} catch (e) {
				parent.funcaoNext();
			}
		}
	} else {
		if (self.btnPrevAtivo == true) {
			try {
				if (typeof funcaoPrev == "function") {
					funcaoPrev();
				} else {
					parent.funcaoPrev();
				}
			} catch (e) {
				parent.funcaoPrev();
			}
		}
	}
}


