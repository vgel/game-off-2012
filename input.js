var keysDown = []

function keyPress(event) {
	keysDown.push(event.charCode)
}

function keyRelease(event) {
	keysDown.splice(keysDown.indexOf(event.charCode))
}

function keyIsDown(charCode) {
	return charCode in keysDown
}