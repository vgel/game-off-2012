//rAF/cAF polyfill, from https://gist.github.com/1579671, improvements / style tweaks by me
(function() {
	var lastTime = 0
	var vendors = ['ms', 'moz', 'webkit', 'o']
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame']
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame']
	}
 
	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime()
			var timeToCall = Math.max(0, 16 - (currTime - lastTime))
			var id = window.setTimeout(function() { callback(currTime + timeToCall) }, 
			  timeToCall)
			lastTime = currTime + timeToCall
			return id
		}
 
	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id)
		}
}());

//From http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation, improvements / style tweaks by me
Object.keys = Object.keys || (function () {
	//older IE DOM-elements don't have hasOwnProperty.
	var hasOwnProperty = Object.prototype.hasOwnProperty,
		hasDontEnumBug = !{toString:null}.propertyIsEnumerable("toString"),
		dontEnums = [
			'toString',
			'toLocaleString',
			'valueOf',
			'hasOwnProperty',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'constructor'
		],
		dontEnumsLength = dontEnums.length;
 
	return function (o) {
		if (typeof o !== "object" && typeof o !== "function" || o === null)
			throw new TypeError("Object.keys called on a non-object");
 
		var result = [];
		for (var name in o) {
			if (hasOwnProperty.call(o, name))
				result.push(name);
		}
 
		if (hasDontEnumBug) {
			for (var i = 0; i < dontEnumsLength; i++) {
				if (hasOwnProperty.call(o, dontEnums[i]))
					result.push(dontEnums[i]);
			}
		}
 
		return result;
	};
})();

function pointInRect(x, y, width, height, px, py) {
	return px >= x && px <= x + width &&
		   py >= y && py <= y + height
}

function rectanglesClip(x1, y1, width1, height1, x2, y2, width2, height2) {
	uy = y1 + height1
	rx = x1 + width1
	return pointInRect(x1, y1, width1, height1, x2, y2) ||
	       pointInRect(x1, y1, width1, height1, x2 + width2, y2) ||
	       pointInRect(x1, y1, width1, height1, x2, y2 + height2) ||
	       pointInRect(x1, y2, width1. height1, x2 + width2, y2 + height2)
}

function defaultarg(arg, default_) {
	if (typeof(arg) === 'undefined')
		return default_
	return arg
}

function intersectLine(a1, a2, b1, b2) {
	var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x)
	var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x)
	var u_b  = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y)

	if (u_b != 0) {
		var ua = ua_t / u_b
		var ub = ub_t / u_b

		if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1)
			return new Point(a1.x + ua * (a2.x - a1.x), a1.y + ua * (a2.y - a1.y))
		else
			return null
	} else {
		if (ua_t == 0 || ub_t == 0)
			return new Point(x, y) //coincident
		else
			return null //paralell
	}
}

function drawLine(drawctx, start, end) {
	drawctx.beginPath()
	drawctx.moveTo(start.x, start.y)
	drawctx.lineTo(end.x, end.y)
	drawctx.stroke()
}