const com = new BroadcastChannel("displays");
const time = 20 * 1000;

const pages = ["./graphs.html", "./testpage1.html", "./testpage2.html", "./videopage.html"];

var thisPage = pages.length / 2;
var nextPage = 0;

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
	window.open('./display2.html','_blank');
	postPress();
	
}

function onLoad() {
	document.getElementById("btn").style.display = "block";
	document.getElementById("frame").style.display =  "none";
}

function postPress() {
	next();
	setInterval(doUpdate, time);
}

window.onload = onLoad;
