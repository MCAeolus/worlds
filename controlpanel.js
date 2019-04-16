const com = new BroadcastChannel("displays");
var awayMessageEnabled = false

function toggleAway() {
	awayMessageEnabled = !awayMessageEnabled
	console.log(awayMessageEnabled);
	com.postMessage("toggle " + awayMessageEnabled)
}


/**
com.onmessage = function(e) {
	console.log("on message");
	const msg = e.data;
	
	document.getElementById("frame").src = msg;

}
**/

