function Engine(context) {
	this.drawContext = context;
}

Engine.prototype.draw = function() {
	this.drawContext.fillStyle = "rgb(255, 0, 0)"
	this.drawContext.fillRect(0, 0, 680, 340)
}

function load() {
	var canvas = document.getElementById('c')
	var ctx = canvas.getContext('2d')
	ctx.fillStyle = "rgb(255, 0, 0)";
	ctx.fillRect(0, 0, 680, 340)
}