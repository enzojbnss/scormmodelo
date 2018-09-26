/**
 * 
 */
var Scorm = function() {
	this.nFindAPITries = 0;
	this.API = null;
	this.maxTries = 500;
	this.SCORM_TRUE = "true";
	this.SCORM_FALSE = "false";
	this.SCORM_NO_ERROR = "0";
	this.terminateCalled = false;
	this.initialized = false;
	this.startTime = "";

	this.setStartTime = function(startTime) {
		this.startTime = startTime;
	};

	this.getStartTime = function(startTime) {
		return this.startTime;
	};

	this.processInitialize = function(API) {
		var result;
		this.API = API;
		if (this.API == null) {
			// alert("ERROR - Could not establish a connection with the
			// LMS.\n\nYour results may not be recorded.");
			return;
		}
		result = this.API.LMSInitialize("");
		if (result == this.SCORM_FALSE) {
			var errorNumber = this.API.GetLastError();
			var errorString = this.API.GetErrorString(errorNumber);
			var diagnostic = this.API.GetDiagnostic(errorNumber);
			var errorDescription = "Number: " + errorNumber + "\nDescription: "
					+ errorString + "\nDiagnostic: " + diagnostic;
			// alert("Error - Could not initialize communication with the
			// LMS.\n\nYour results may not be recorded.\n\n"
			//		+ errorDescription);
			return;
		}
		this.initialized = true;
	};
	this.processTerminate = function() {
		var result;
		// Don't terminate if we haven't initialized or if we've already
		// terminated
		if (this.initialized == false || this.terminateCalled == true) {
			return;
		}
		result = API.LMSFinish("");
		this.terminateCalled = true;
		if (result == this.SCORM_FALSE) {
			var errorNumber = this.API.GetLastError();
			var errorString = this.API.GetErrorString(errorNumber);
			var diagnostic = this.API.GetDiagnostic(errorNumber);
			var errorDescription = "Number: " + errorNumber + "\nDescription: "
					+ errorString + "\nDiagnostic: " + diagnostic;
			// alert("Error - Could not terminate communication with the
			// LMS.\n\nYour results may not be recorded.\n\n"
			//		+ errorDescription);
			return;
		}
	};
	this.processGetValue = function(element, checkError) {
		var result;
		if (this.initialized == false || this.terminateCalled == true) {
			return;
		}
		result = this.API.LMSGetValue(element);
		if (checkError == true && result == "") {
			var errorNumber = this.API.GetLastError();
			if (errorNumber != this.SCORM_NO_ERROR) {
				var errorString = API.LMSGetErrorString(errorNumber);
				var diagnostic = API.LMSGetDiagnostic(errorNumber);
				var errorDescription = "Number: " + errorNumber
						+ "\nDescription: " + errorString + "\nDiagnostic: "
						+ diagnostic;
				// alert("Error - Could not retrieve a value from the LMS.\n\n"
				//		+ errorDescription);
				return "";
			}
		}
		return result;
	};
	this.processSetValue = function(element, value) {
		var result;
		if (this.initialized == false || this.terminateCalled == true) {
			return;
		}
		result = this.API.LMSSetValue(element, value);
		result = this.API.LMSCommit(""); 
		if (result == this.SCORM_FALSE) {
			var errorNumber = API.LMSGetLastError();
	        var errorString = API.LMSGetErrorString(errorNumber);
	        var diagnostic = API.LMSGetDiagnostic(errorNumber);
			var errorDescription = "Number: " + errorNumber + "\nDescription: "
					+ errorString + "\nDiagnostic: " + diagnostic;
			// alert("Error - Could not store a value in the LMS.\n\nYour
			// results may not be recorded.\n\n" + errorDescription);
			return;
		}
	};

	thissetPageAtual = function(bookmark) {
		this.processSetValue("cmi.core.lesson_location", bookmark);
	};

};
