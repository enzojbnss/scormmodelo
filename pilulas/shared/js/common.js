/**
 * 
 */
function RecordTest(score) {
	scorm.processSetValue("cmi.core.score.raw", score);
	scorm.processSetValue("cmi.core.score.min", "0");
	scorm.processSetValue("cmi.core.score.max", "100");
	if (score >= 70) { // if we get a test result, set the lesson status to
		// passed/failed instead // of completed // consider 70%
		// to be passing
		scorm.processSetValue("cmi.core.lesson_status", "passed");
	} else {
		scorm.processSetValue("cmi.core.lesson_status", "failed");
	}
}



function getWindowHeight() {
	var height = 0;
	if (window.innerHeight) {
		height = window.innerHeight;
	} else if (document.documentElement
			&& document.documentElement.clientHeight) {
		height = document.documentElement.clientHeight;
	} else if (document.body && document.body.clientHeight) {
		height = document.body.clientHeight;
	}
	return height;
}

function getBookmark() {
	retorno = 0;
	try {
		var retorno = scorm.processGetValue("cmi.core.lesson_location");
		if (retorno == "") {
			retorno = 0;
		} else { // if there is a stored bookmark, prompt the user to resume
			// // from the // previous locati on
			retorno = conteudo.getPageAtual();
		}
	} catch (e) {
		alert(e);
		retorno = 0;
	}
	return retorno;
}


function SetupIFrame(name) { // set our iFrame for the content to take up the
	// full screen except for our navigation
	var navWidth = 0;
	setIframeHeight(name, navWidth); // need this in a setTimeout to
	// avoid a timing error in IE6
	parent.setTimeout(
			'window.onresize = function() { setIframeHeight("contentFrame", '
					+ navWidth + '); }', 1000);
}

function testaBookmark(bookmark) {
	var	vLocal = scorm.processGetValue("cmi.core.lesson_location");
	var	vStatusLesson = scorm.processGetValue("cmi.core.lesson_status");	
	if(typeof vLocal == "undefined"){
		vLocal = 0;
	}
	if(typeof vStatusLesson == "undefined"){
		vStatusLesson = 0;
	}
	if ( vLocal != "") {
		if ( vStatusLesson != "not attempted") {
			scorm.processSetValue("cmi.core.lesson_status", "incomplete");
			bookmark = parseInt(vLocal, 10);
			conteudo.setPageAtual(vLocal);
			var url = conteudo.getUrlAtual();
			tela.setSRC(url);			
		} else {
			bookmark = 0;
		}
	}
	return bookmark;
}

function verificaStatus() {
	var completionStatus = scorm.processGetValue("cmi.core.lesson_status");
	if (completionStatus == "not attempted") {
		scorm.processSetValue("cmi.core.lesson_status", "incomplete");
		scormIsRegistred = false;
		scormIsFinalized = false;
	} else {//
		if (completionStatus == "completed") {
			scormIsFinalized = true;
		} else {
			scormIsFinalized = false;
		}
		scormIsRegistred = true;
	}
}

function findAPI(win) {
	var findAPITries = 0;
	while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
		findAPITries++;
		if (findAPITries > 7) {
			//alert("Error finding API -- too deeply nested.");
			return null;
		}
		win = win.parent;
	}
	return win.API;
}

function getAPI() {
	var theAPI = findAPI(window);
	if ((theAPI == null) && (window.opener != null)
			&& (typeof (window.opener) != "undefined")) {
		theAPI = findAPI(window.opener);
	}
	if (theAPI == null) {
		//alert("Unable to find an API adapter");
	}
	return theAPI;
}



// SCORM requires time to be formatted in a specific way
function ConvertMilliSecondsToSCORMTime(intTotalMilliseconds,
		blnIncludeFraction) {
	var intHours;
	// var intintMinutes;
	var intSeconds;
	var intMilliseconds;
	var intHundredths;
	var strCMITimeSpan;
	if (blnIncludeFraction == null || blnIncludeFraction == undefined) {
		blnIncludeFraction = true;
	}
	// extract time parts
	intMilliseconds = intTotalMilliseconds % 1000;
	intSeconds = ((intTotalMilliseconds - intMilliseconds) / 1000) % 60;
	intMinutes = ((intTotalMilliseconds - intMilliseconds - (intSeconds * 1000)) / 60000) % 60;
	intHours = (intTotalMilliseconds - intMilliseconds - (intSeconds * 1000) - (intMinutes * 60000)) / 3600000;
	/*
	 * deal with exceptional case when content used a huge amount of time and
	 * interpreted CMITimstamp to allow a number of intMinutes and seconds
	 * greater than 60 i.e. 9999:99:99.99 instead of 9999:60:60:99 note - this
	 * case is permissable under SCORM, but will be exceptionally rare
	 */
	if (intHours == 10000) {
		intHours = 9999;
		intMinutes = (intTotalMilliseconds - (intHours * 3600000)) / 60000;
		if (intMinutes == 100) {
			intMinutes = 99;
		}
		intMinutes = Math.floor(intMinutes);
		intSeconds = (intTotalMilliseconds - (intHours * 3600000) - (intMinutes * 60000)) / 1000;
		if (intSeconds == 100) {
			intSeconds = 99;
		}
		intSeconds = Math.floor(intSeconds);
		intMilliseconds = (intTotalMilliseconds - (intHours * 3600000)
				- (intMinutes * 60000) - (intSeconds * 1000));
	} // drop the extra precision from the milliseconds
	intHundredths = Math.floor(intMilliseconds / 10); // put in padding 0's
	// and concatinate to
	// get the proper format
	strCMITimeSpan = ZeroPad(intHours, 4) + ":" + ZeroPad(intMinutes, 2) + ":"
			+ ZeroPad(intSeconds, 2);
	if (blnIncludeFraction) {
		strCMITimeSpan += "." + intHundredths;
	}// check for case where total milliseconds is greater than max supported
	// by // strCMITimeSpan
	if (intHours > 9999) {
		strCMITimeSpan = "9999:99:99";
		if (blnIncludeFraction) {
			strCMITimeSpan += ".99";
		}
	}
	return strCMITimeSpan;
}

function ZeroPad(intNum, intNumDigits) {
	var strTemp;
	var intLen;
	var i;
	strTemp = new String(intNum);
	intLen = strTemp.length;
	if (intLen > intNumDigits) {
		strTemp = strTemp.substr(0, intNumDigits);
	} else {
		for (i = intLen; i < intNumDigits; i++) {
			strTemp = "0" + strTemp;
		}
	}
}

function setIframeHeight(id, navWidth) {
	if (document.getElementById) {
		var theIframe = $("#" + id);
		if (theIframe) {
			var height = getWindowHeight();
			var heightValue = Math.round(height);
			// var heightText = heightValue + "px";
			var marginTop =  "0px";
			$("#" + id).height(heightValue);
			$("#" + id).css("margin-top", marginTop);
		}
	}
}