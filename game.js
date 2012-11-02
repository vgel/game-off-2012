version = '0.1.0'
var engine = null

function draw() {
	engine.draw()
	window.requestAnimationFrame(draw)
}

level_data = {
	spawn: {x:  0, y:16},
	exit:  {x:128, y:16},
	tiles: [
		{x: 1*16, y:340-1*16},
		{x: 2*16, y:340-1*16},
		{x: 2*16, y:340-2*16},
		{x: 3*16, y:340-1*16},
		{x: 3*16, y:340-2*16},
		{x: 3*16, y:340-3*16},
		{x: 4*16, y:340-2*16},
		{x: 4*16, y:340-1*16},
		{x: 5*16, y:340-1*16},
		{x: 6*16, y:340-1*16},
		{x: 7*16, y:340-1*16},
		{x: 8*16, y:340-1*16},
		{x: 9*16, y:340-1*16},
		{x:10*16, y:340-3*16},
		{x:11*16, y:340-3*16},
		{x:12*16, y:340-4*16},
		{x:15*16, y:340-8*16},
	]
}

function load() {
	var canvas = document.getElementById('c')
	var ctx = canvas.getContext('2d')
	console.log(ctx)
	engine = new Engine(ctx, 680, 340)
	window.requestAnimationFrame(draw)
}