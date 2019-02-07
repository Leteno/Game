
function Label() {
    this.text = '';
}

Label.prototype.setText = function(text) {
    this.text = text;
};

Label.prototype.draw = function(ctx) {
    ctx.save();
    var textMetrics = ctx.measureText(this.text);
    ctx.fillText(this.text, -textMetrics.width / 2, 0);
    ctx.restore();
};

function BlinkingLabel(text, loopTime) {
    this.text = text;
    this.loopTime = loopTime;
}

BlinkingLabel.prototype.draw = function(ctx, elapseTime) {
    var percent = getPercentage(elapseTime, this.loopTime);
    ctx.save();
    if (percent > 0.5) {
	var textMetrics = ctx.measureText(this.text);
	ctx.fillText(this.text, -textMetrics.width / 2, 0);
    }
    ctx.restore();
};