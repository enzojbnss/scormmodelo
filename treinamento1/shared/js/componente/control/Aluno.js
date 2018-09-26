var Aluno = function(id,name,score){
	
	this.id = validar(id,1);
	this.name = validar(name,"");
	this.score = validar(score,0);
	this.answers = [];
    
	this.getID = function(){
		return this.id;
	}

	this.getName = function(){
		return this.name;
	}
	
	this.getScore = function(){
		return this.score;
	}
	
	this.setScore = function(score){
		this.score = score;
	}
	
	this.add = function(answer){
		this.answers.push(answer);
	}
	
	this.getAnswer = function(posicao){
		return this.answers[posicao];
	}
	
	this.setAnswer = function(posicao,value){
		this.answers[posicao] = value;
	}
	
	
	function validar(valor,valorDefault){
		if(typeof valor == "undefined"){
			return valorDefault;
		}else{
			return valor;
		}
	}
}