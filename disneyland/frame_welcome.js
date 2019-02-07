function FrameWelcome() {
    this.blinkingLabel = new BlinkingLabel('Press Button', 1200);
};

FrameWelcome.prototype.onCanvas = function(canvas, elapseTime) {

    this.drawBackground(canvas);
    this.drawBlinkingWord(canvas, elapseTime);
    this.drawJumpingRect(canvas, elapseTime);
};

FrameWelcome.prototype.drawBackground = function(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.save();
    ctx.fillStyle = '#000';
    ctx.lineWidth = 10;
    ctx.beginPath();

    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(0, 0);
    ctx.stroke();

    ctx.closePath();
    ctx.restore();
};

FrameWelcome.prototype.drawBlinkingWord = function(canvas, elapseTime) {
    var ctx = canvas.getContext('2d');
    ctx.save();
    ctx.fillStyle = '#000';
    ctx.font = '20px serif';
    ctx.translate(canvas.width / 2, canvas.height / 2);
    this.blinkingLabel.draw(ctx, elapseTime);
    ctx.restore();
};

FrameWelcome.prototype.drawJumpingRect = function(canvas, elapseTime) {
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    ctx.save();
    ctx.beginPath();
    ctx.fillRect(width / 2,
		 height / 4 * (1 + Math.abs(getPercentage(elapseTime, 2000) - 0.5)),
		 20, 20);
    ctx.closePath();
    ctx.restore();
};