/**
 * 
 */
var Page = function(url,visited){
	this.url = url;
	this.visited = visited;
	
	this.getUrl = function(){
		return this.url;
	};
	
	this.isVisited = function(){
		return this.visited;
	};
	
	this.setVisited = function(visited){
		this.visited = visited;
	};
};