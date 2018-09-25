/**
 * 
 */
var TimeLine = function() {
	this.currentTime = "";
	this.totaltime = "";
	this.actions = [];
	this.currentAction = 0;
	this.add = function(action) {
		this.actions.push(action);
	};

	this.onTrackedVideoFrame = function(currentTime, duration) {
		this.currentTime = currentTime;
		if (this.currentAction < this.actions.length) {
			if (parseFloat(this.currentTime) >= this.actions[this.currentAction].executionPoint) {
				var action = this.actions[this.currentAction].action;
				eval(action + "()");
				this.currentAction++;
			}
		}
	};

	this.finalizaVideo = function(sources, sourceAtual) {
		var posicao = sourceAtual;
		if (typeof sources[posicao].acao != "undefined") {
			if (typeof sources[posicao].param == "undefined") {
				eval(sources[posicao].acao + "()");
			} else {
				eval(sources[posicao].acao + "(param)");
			}
		}
	};
};