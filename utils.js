function addShims() {
	//http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	window.requestAnimationFrame = window.requestAnimationFrame || 
	                         window.webkitRequestAnimationFrame || 
	                         window.mozRequestAnimationFrame    || 
	                         window.oRequestAnimationFrame      || 
	                         window.msRequestAnimationFrame     || 
	                         function(callback, time){
	                         	if (typeof(time) == 'undefined') time = 1000 / 60
	                         	window.setTimeout(callback, time);
	                         };
}