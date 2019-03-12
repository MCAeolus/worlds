
const moveSpeed = 5 * 1000;
var index = 0;
var graphsDrawn = false;

async function updateGraphs() {

	var parentLoc = document.getElementById("graphs");

	var lGraph = document.getElementById("left graph");
	var mGraph = document.getElementById("center graph");
	var rGraph = document.getElementById("right graph");

	getNextThreeJSON().then(array => {
		doGraph(lGraph, array[0]);
		doGraph(mGraph, array[1]);
		doGraph(rGraph, array[2]);
	}).then(() => {
		if(!graphsDrawn) graphsDrawn = true;
	});

}

async function getNextThreeJSON() {
	var files = [];
	for(let i = 0; i < 3; i++) {
		await getJSON(index).then(function (ret) {
				files.push(ret);
		});
	}
	return files;
}

async function fileExists(path) {
	return new Promise(function(resolve, reject) {
		var http = new XMLHttpRequest();
		http.overrideMimeType("application/json");
		http.open('HEAD', path, true);

		http.onload = function() {
			resolve(http.status == 200);
		}
		http.onerror = function() {
			resolve(false);
		}
		http.send();
	});
}

async function getJSON(pathNum) {
	var failRequest = {"name":"failed to handle JSON request."};
	return new Promise(async function(resolve, reject) {
		var attemptPath = 'graphData/replay' + pathNum + '.json';
		await fileExists(attemptPath).then(response => {
			if(response == false) {
				if(pathNum != 0) {
					pathNum = 0;
					attemptPath = 'graphData/replay' + pathNum + '.json';
				}else resolve(failRequest);
			}
			var grabJSONRequest = new XMLHttpRequest();
			grabJSONRequest.overrideMimeType("application/json");
			grabJSONRequest.open('GET', attemptPath, true);
			grabJSONRequest.onload   = function() {
				if(grabJSONRequest.readyState == 4 && grabJSONRequest.status == "200") {
					var jsonReturn = JSON.parse(grabJSONRequest.responseText);
					index = pathNum + 1;
					resolve(jsonReturn);
				}else resolve(failRequest);
			}
			grabJSONRequest.send();
		});
	});
}

function doGraph(figure, json) { //TODO stop refreshing images every update.
	var canvas = figure.getElementsByTagName('canvas')[0];
	var captions = figure.getElementsByTagName('figcaption');
	var context = canvas.getContext('2d');
	var image = new Image();
	image.src = 'field.jpg';

	canvas.height = 500;
	canvas.width = 500;

	const inchesToPixels = 500 / 144; //(500 inch width or height / 12ft * 12 inches)
	var lastCoord = null;

	image.onload = function() {
		context.drawImage(image, 0, 0, 500, 500);
		captions[0].innerHTML = json.start + ": " + json.name;
		captions[1].innerHTML = json.description;

		for(coord in json.data) {
			var realCoord = json.data[coord];
			var pixelX = -(inchesToPixels * realCoord.x) + 500/2; //convert to canvas coords
			var pixelY = -(inchesToPixels * realCoord.y) + 500/2;


			if(lastCoord != null) {
				context.beginPath();
				context.moveTo(pixelX, pixelY);
				context.lineTo(lastCoord.x, lastCoord.y);
				context.strokeStyle = "lime";
				context.lineWidth = 10;
				context.stroke();
			}
			lastCoord = {"x":pixelX, "y":pixelY};

		}
	}
		/**
		switch (finalJson.start) {
			case "crater":

				break;
			case "depot":

				break;

		}**/
}

function onLoad() {
	updateGraphs();
	setInterval(updateGraphs, moveSpeed);
}

window.onload = onLoad;
