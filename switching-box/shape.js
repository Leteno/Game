
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

    this.moving = 0;
}

Shape.prototype.draw = function(ctx) {
    currentSize = this.hide ? this.size : this.size - 2;

    x = this.px;
    y = this.py;

    if (this.hide) {
	ctx.save();
	ctx.fillStyle = 'blue'
	ctx.fillRect(x, y, currentSize, currentSize);
	ctx.restore();
    } else {
	
	index = this.type % imageInstances.length;
	img = imageInstances[index]
	ctx.drawImage(img, x, y, currentSize, currentSize);

	if (this.selected) {

	    radius = 10;
	    margin = 4;

	    x0 = x + currentSize - radius - margin;
	    y0 = y + currentSize - radius - margin;
	    ctx.save();
	    ctx.fillStyle = 'red';
	    drawHeart(ctx, x0, y0, radius);
	    ctx.restore();
	}
    }
};

Shape.prototype.isMoving = function() {
    return this.moving;
};

Shape.prototype.setMoving = function(moving) {
    this.moving = moving;
};

function drawHeart(ctx, x, y, size) {
    ctx.save();

    ratioX = size / 110; ratioY = size / 100;

    ctx.translate(x - 20 * ratioX, y - 20 * ratioY);
    ctx.beginPath();
    ctx.moveTo(75* ratioX, 40 * ratioY);
    ctx.bezierCurveTo(75 * ratioX, 37 * ratioY, 70 * ratioX, 25 * ratioY, 50 * ratioX, 25 * ratioY);
    ctx.bezierCurveTo(20 * ratioX, 25 * ratioY, 20 * ratioX, 62.5 * ratioY, 20 * ratioX, 62.5 * ratioY);
    ctx.bezierCurveTo(20 * ratioX, 80 * ratioY, 40 * ratioX, 102 * ratioY, 75 * ratioX, 120 * ratioY);
    ctx.bezierCurveTo(110 * ratioX, 102 * ratioY, 130 * ratioX, 80 * ratioY, 130 * ratioX, 62.5 * ratioY);
    ctx.bezierCurveTo(130 * ratioX, 62.5 * ratioY, 130 * ratioX, 25 * ratioY, 100 * ratioX, 25 * ratioY);
    ctx.bezierCurveTo(85 * ratioX, 25 * ratioY, 75 * ratioX, 37 * ratioY, 75 * ratioX, 40 * ratioY);
    ctx.fill();

    ctx.restore();
}