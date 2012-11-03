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
	return pointInRect(x1, y1, width1, height1, x2,          y2) ||
	       pointInRect(x1, y1, width1, height1, x2 + width2, y2) ||
	       pointInRect(x1, y1, width1, height1, x2,          y2 + height2) ||
	       pointInRect(x1, y2, width1. height1, x2 + width2, y2 + height2)
}