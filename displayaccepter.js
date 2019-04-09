const com = new BroadcastChannel("displays");



com.onmessage = function(e) {
	console.log("on message");
	const msg = e.data;
	
	document.getElementById("frame").src = msg;
}

