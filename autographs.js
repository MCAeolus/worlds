function updateGraphs() {
	
	var parentLoc = document.getElementById("graphs");
		
	var files = [
	{"x":0, "y":1}, {"x":3, "y":2}, {"x":1, "y":5}
	]
	
	files.forEach(function(item, index) {
		var canvas = document.createElement("canvas");
		canvas.id = "graph" + index
		canvas.setAttribute('width', 500);
		canvas.setAttribute('height', 500);
		
		
		
		var context = canvas.getContext('2d');
		
		var im = new Image();
		im.src = 'field.jpg';
		
		im.onload = function() {
			context.drawImage(im, 0, 0);	
		}
		
		/**
		inIm.setAttribute('width', 100);
		inIm.setAttribute('height', 100);
		
		canvas.appendChild(inIm);**/
		
		parentLoc.appendChild(canvas);
		parentLoc.appendChild(document.createElement("br"));
		
	});
	
	//can use JSON#parse(file)
	
}
window.onload = updateGraphs