
function createImage(src) {
    var img = new Image();
    img.src = src;
    return img;
}

var imageInstances = [
    createImage('assets/1.png'),
    createImage('assets/2.png'),
    createImage('assets/3.png'),
    createImage('assets/4.png'),
    ];

function Shape(px, py, size, type) {

    this.hide = 0;
    this.selected = 0;

    this.px = px;
    this.py = py;
    this.size = size;
    this.type = type;
}

Shape.prototype.draw = function(ctx) {
    currentSize = this.hide ? this.size : this.size - 2;

    halfSize = currentSize / 2;
    x = this.px - halfSize;
    y = this.py - halfSize;

    if (this.hide) {
	old = ctx.fillStyle;
	ctx.fillStyle = 'blue'
	ctx.fillRect(x, y, currentSize, currentSize);
	ctx.fillStyle = old;
    } else {
	
	index = this.type % imageInstances.length;
	img = imageInstances[index]
	ctx.drawImage(img, x, y, currentSize, currentSize);

	if (this.selected) {

	    radius = 4;
	    margin = 4;

	    x0 = x + currentSize - radius - margin;
	    y0 = y + currentSize - radius - margin;
	    ctx.beginPath();
	    ctx.arc(x0, y0, radius, 0, Math.PI * 2, true);
	    ctx.closePath();
	    old = ctx.fillStyle;
	    ctx.fillStyle = 'red'
	    ctx.fill();
	    ctx.fillStyle = old
	}
    }
};