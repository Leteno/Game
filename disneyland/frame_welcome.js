function FrameWelcome() {
    this.size = 20;
};

FrameWelcome.prototype.onCanvas = function(canvas, elapseTime) {

    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    ctx.save();
    ctx.beginPath();
    ctx.fillRect(width / 2,
		 height / 4 * (1 + Math.abs(getPercentage(elapseTime, 2000) - 0.5)),
		 this.size,
		 this.size);
    ctx.closePath();
    ctx.restore();
};

