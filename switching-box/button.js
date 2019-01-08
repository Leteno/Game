
function Button(text) {
    this.x = 0;
    this.y = 0;
    this.text = text;

    this.pressing = 0;
    this.bgOnNormal = '#EEE';
    this.bgOnPress = '#CCC';
    this.margin = 10;
    this.currentWidth = 0;
    this.currentHeight = 0;

    this.onClickRun = 0;
    this.onPressRun = 0;
    this.onPressUpRun = 0;
}

Button.prototype.setXY = function(x, y) {
    this.x = x;
    this.y = y;
};

Button.prototype.draw = function(ctx) {
    ctx.save();
    ctx.font = '20px Arial';
    var margicHeight = 18;

    ctx.save();
    ctx.fillStyle = this.pressing ? this.bgOnPress : this.bgOnNormal;
    this.currentWidth = ctx.measureText(this.text).width + this.margin * 2;
    this.currentHeight = margicHeight + this.margin * 2;
    ctx.fillRect(0, 0, this.currentWidth, this.currentHeight);
    ctx.restore();

    
    ctx.fillColor = 'black';
    ctx.fillText(this.text, this.margin, this.currentHeight - this.margin);

    ctx.restore();
};

Button.prototype.onMouseDown = function(x, y) {
    if (this.inside(x, y)) {
	this.pressing = 1;
	if (this.onPressRun) {
	    this.onPressRun();
	}
	return 1;
    }
    this.pressing = 0;
    return 0;
};

Button.prototype.onMouseUp = function(x, y) {
    this.pressing = 0;
    if (this.onPressUpRun) {
	this.onPressUpRun();
    }
};

Button.prototype.onclick = function(x, y) {
    this.pressing = 0;
    if (this.inside(x, y) && this.onClickRun) {
	this.onClickRun();
    }
};

Button.prototype.inside = function(x, y) {
    return x >= 0 && x <= this.currentWidth &&
           y >= 0 && y <= this.currentHeight;
};