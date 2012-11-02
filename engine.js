function Level(engine, sizex, sizey, background, levelinfo) {
	this.engine = engine
	this.sizex = sizex //in coords, not tiles
	this.sizey = sizey
	this.bg = background
	this.spawn = levelinfo["spawn"]
	this.tiles = []
	for (var i = 0; i < levelinfo["tiles"].length; i++) {
		obj = levelinfo["tiles"][i]
		this.tiles.push(new Tile(this, obj.x, obj.y, obj.width, obj.height))
	}
	this.exit = levelinfo["exit"]
}

Level.prototype.draw = function(drawctx, basex, basey, screenwidth, screenheight) {
	//TODO: Draw background
	for (var i = 0; i < this.tiles.length; i++) {
		this.tiles[i].draw(drawctx, basex, basey, screenwidth, screenheight)
	}
}

Level.prototype.getTileAt = function(x, y) {
	for (var i = 0; i < this.tiles.length; i++) {
		if (this.tiles[i].x == x && this.tiles[i].y == y)
			return this.tiles[i]
	}
	return null
}

function Engine(context, width, height) {
	this.drawContext = context
	this.width = width
	this.height = height
	this.entityList = []
	this.level = new Level(this, this.width, this.height, null, level_data)
}

Engine.prototype.draw = function() {
	this.drawContext.fillStyle = "rgb(255, 200, 255)"
	this.drawContext.fillRect(0, 0, this.width, this.height)
	this.level.draw(this.drawContext, 0, 0, this.width, this.height)
	this.drawContext.fillStyle = "rgb(255, 230, 255)"
	this.drawContext.font = "12px monospace"
	this.drawContext.strokeText("Version " + version, 5, 15)
	this.drawContext.strokeText("Tiles " + this.level.tiles.length, 5, 27)
}