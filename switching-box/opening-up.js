
function OpeningUp(canvas) {
    this.canvas = canvas;
    this.raf = 0;

    this.ctx = this.canvas.getContext('2d');
    this.marqueue = new Marqueue(['loading .', 'loading ..', 'loading ...'], 1000);
}

OpeningUp.prototype.kickStart = function() {
    this.stop();
    var that = this;
    var draw = function() {

	that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);

	// draw Frame
	that.ctx.save();
	that.ctx.strokeStyle = '#CCC';
	that.ctx.fillStyle = '#1E8AE8';
	that.ctx.lineWidth = 10;
	that.ctx.fillRect(0, 0, that.canvas.width, that.canvas.height);
	that.ctx.strokeRect(0, 0, that.canvas.width, that.canvas.height);
	that.ctx.restore();

	that.ctx.save();
	that.ctx.translate(that.canvas.width/2 - 100,
			   that.canvas.height/2);
	that.marqueue.draw(that.ctx);
	that.ctx.restore();
	that.raf = requestAnimationFrame(draw);
    };
    this.raf = requestAnimationFrame(draw);
};

OpeningUp.prototype.stop = function() {
    if (this.raf) {
	cancelAnimationFrame(this.raf);
    }
    this.marqueue.begin = 0;
};

function Marqueue(textArray, gapTime) {
    if (!isArray(textArray) || textArray.length == 0) {
	debugger;
    }
    this.textArray = textArray;
    this.gapTime = gapTime;

    this.label = new Label();

    this.begin = 0;
}

Marqueue.prototype.pickupProperText = function() {
    var currentTime = new Date().getTime();
    if (!this.begin) {
	this.begin = currentTime;
    }

    var elapsing = currentTime - this.begin;
    var index = Math.floor((elapsing / this.gapTime) % this.textArray.length);
    var text = this.textArray[index];
    this.label.setText(text);
};

Marqueue.prototype.draw = function(ctx) {
    this.pickupProperText();
    this.label.draw(ctx);
};