const com = new BroadcastChannel("displays");


function showAwayMessage(bool) {
	document.getElementById("away").style.display = bool ? "block" : "none";
}

com.onmessage = function(e) {
	console.log("on message");
	const msg = e.data;
	
	var spl = msg.split(" ");
	if(spl.length == 2) {
		var bool = spl[1] === 'true';
		console.log("is showing:" + bool);
		showAwayMessage(bool)
	} else 
		document.getElementById("frame").src = msg;
}

function onLoad() {
	document.getElementById("away").style.display = "none";
}

window.onload = onLoad;

