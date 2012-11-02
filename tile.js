function Tile(level, x, y) {
	this.level = level
	this.x = x
	this.y = y
	this.width = 16
	this.height = 16
}

Tile.prototype.pointIn = function(x, y) {
	return pointInRect(this.x, this.y, this.width, this.height, x, y)
}

Tile.prototype.clips = function(x, y, width, height) {
	return rectanglesClip(this.x, this.y, this.width, this.height, x, y, width, height)
}

Tile.prototype.drawShadow = function(drawctx) {
	drawctx.fillStyle = "rgba(10, 10, 10, 0.4)"
	if (this.bottom() == null && this.bottomleft() != null)
		drawctx.fillRect(this.x - 4, this.y - 4, this.width, this.width + 4)
	else
		drawctx.fillRect(this.x - 4, this.y - 4, this.width, this.width)
}

Tile.prototype.draw = function(drawctx, basex, basey, screenwidth, screenheight) {
	if (this.x > basex + screenwidth || this.x + this.width < 0 || basex || this.y > basey + screenheight || this.y + this.height < basey)
		return
	this.drawShadow(drawctx)
	drawctx.fillStyle = "rgb(0, 0, 0)"
	drawctx.fillRect(this.x, this.y, this.width, this.height)
}

Tile.prototype.left = function() {
	return this.level.getTileAt(this.x - this.width, this.y)
}

Tile.prototype.right = function() {
	return this.level.getTileAt(this.x + this.width, this.y)
}

Tile.prototype.top = function() {
	return this.level.getTileAt(this.x, this.y - this.height)
}

Tile.prototype.bottom = function() {
	return this.level.getTileAt(this.x, this.y + this.height)
}

Tile.prototype.topleft = function() {
	return this.level.getTileAt(this.x - this.width, this.y - this.height)
}

Tile.prototype.topright = function() {
	return this.level.getTileAt(this.x + this.width, this.y - this.height)
}

Tile.prototype.bottomleft = function() {
	return this.level.getTileAt(this.x - this.width, this.y + this.height)
}

Tile.prototype.bottomright = function() {
	return this.level.getTileAt(this.x + this.width, this.x + this.height)
}