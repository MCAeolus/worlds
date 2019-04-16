const com = new BroadcastChannel("displays");
const time = 20 * 1000;

const pages = ["./graphs.html", "./robot-drivetrain.html", "./DRIVETRAINVID.html", "./INTAKEVID.html", "./LIFTVID.html", "./LINEARSLIDESVID.html", "./OUTTAKEVID.html"];

var thisPage = Math.round(pages.length / 2);
var nextPage = 0;

var winControlPanel = null;
var winDisplay2 = null;

function next() {
	document.getElementById("frame").src = pages[thisPage];
}


function getNext() {
	if(++thisPage == pages.length) thisPage = 0;
	if(++nextPage == pages.length) nextPage = 0;
}

function doUpdate() {
	console.log("do update");
	getNext();
	com.postMessage(pages[nextPage]);
	next();
}

function pressCreate() {
	
	document.getElementById("btn").style.display = "none";
	document.getElementById("frame").style.display =  "block";
	winDisplay2 = window.open('./display2.html','_blank', 'location=yes,height=1080,width=1920');
	winControlPanel = window.open('./control_panel.html', '_blank', 'location=yes,height=1080,width=1920');
	postPress();
	
}

function onLoad() {
	document.getElementById("btn").style.display = "block";
	document.getElementById("frame").style.display =  "none";
	showAwayMessage(false);
}

function postPress() {
	next();
	setInterval(doUpdate, time);
}

function showAwayMessage(bool) {
	document.getElementById("away").style.display = bool ? "block" : "none";
}

function onClose() {
	winControlPanel.close();
	winDisplay2.close();
}

com.onmessage = function(e) {
	const msg = e.data
	var spl = msg.split(" ");
	if(spl.length == 2) {
		var bool = spl[1] === 'true';
		console.log(spl, );
		showAwayMessage(bool)
	}
}

window.onload = onLoad;


window.onclose = onClose;