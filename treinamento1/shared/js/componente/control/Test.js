/**
 * 
 */
var Test = function(){
	this.questions = [];
	
	this.getQuestions = function(){
		return this.questions;
	};
	
	this.getQuestion = function(posicao){
		return this.questions[posicao];
	}
	
	this.setQuestion = function(posicao,value){
		this.questions[posicao] = value;
	}
	
	this.add = function( id,text, type, answers, correctAnswer, objectiveId){
		this.questions.push(new Question(id,text, type, answers, correctAnswer, objectiveId));
	};
	
	this.questionCount = function(){
		return this.questions.length;
	};
};