/**
 * 
 */
var ActionMove = function(executionPoint,action) {
	if (typeof executionPoint == "undefined") {
		this.executionPoint = "";
		this.action = "";
	}else{
		this.executionPoint = executionPoint;
		this.action = action ;
	}

};