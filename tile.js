var tile_width = 16
var tile_height = 16

function Tile(level, x, y) {
	this.level = level
	this.x = x
	this.y = y
}

Tile.prototype.pointIn = function(x, y) {
	return pointInRect(this.x, this.y, tile_width, tile_height, x, y)
}

Tile.prototype.clips = function(x, y, tile_width, tile_height) {
	return rectanglesClip(this.x, this.y, tile_width, tile_height, x, y, tile_width, tile_height)
}

Tile.prototype.drawShadow = function(drawctx) {
	drawctx.fillStyle = "rgba(10, 10, 10, 0.4)"
	if (this.bottom() == null && this.bottomleft() != null)
		drawctx.fillRect(this.x - 4, this.y - 4, tile_width, tile_width + 4)
	else
		drawctx.fillRect(this.x - 4, this.y - 4, tile_width, tile_width)
}

Tile.prototype.draw = function(drawctx, basex, basey, screenwidth, screenheight) {
	if (this.x > basex + screenwidth || this.x + tile_width < 0 || basex || this.y > basey + screenheight || this.y + tile_height < basey)
		return
	this.drawShadow(drawctx)
	drawctx.fillStyle = "rgb(0, 0, 0)"
	drawctx.fillRect(this.x, this.y, tile_width, tile_height)
}

var generateTileOffsetFunc = function(xOffset, yOffset) {
	if (typeof(xOffset) !== 'number' || typeof(yOffset) !== 'number')
		throw new TypeError("generateTileOffsetFunc called with non-number(s) " + xOffset + ", " + yOffset)
	return function() {
		return this.level.getTileAt(this.x + xOffset, this.y + yOffset)
	}
}

Tile.prototype.left        = generateTileOffsetFunc(-tile_width,            0)
Tile.prototype.right       = generateTileOffsetFunc( tile_width,            0)
Tile.prototype.right       = generateTileOffsetFunc(          0, -tile_height)
Tile.prototype.bottom      = generateTileOffsetFunc(          0,  tile_height)
Tile.prototype.topleft     = generateTileOffsetFunc(-tile_width, -tile_height)
Tile.prototype.topright    = generateTileOffsetFunc( tile_width, -tile_height)
Tile.prototype.bottomleft  = generateTileOffsetFunc(-tile_width,  tile_height)
Tile.prototype.bottomright = generateTileOffsetFunc( tile_width,  tile_height)