
function Label() {
    this.text = '';
}

Label.prototype.setText = function(text) {
    this.text = text;
};

Label.prototype.draw = function() {
    ctx.save();
    ctx.fillColor = '#CCC';
    ctx.font = '20px serif';
    ctx.fillText(this.text, 0, 0);
    ctx.restore();
};

function ScoreAndLevelLabel(level) {

    this.level = level;
    this.score = 0;

    this.scoreLabel = new Label();
    this.levelLabel = new Label();
    this.updateLabel();
}

ScoreAndLevelLabel.prototype.updateLabel = function() {
    this.levelLabel.setText('Level: ' + this.level);
    this.scoreLabel.setText('Score: ' + this.score);
};

ScoreAndLevelLabel.prototype.upgrade = function() {
    this.score += 5 * (1 + this.level);
    this.level ++;
    this.updateLabel();
};

ScoreAndLevelLabel.prototype.draw = function(ctx) {
    ctx.save();
    this.levelLabel.draw(ctx);
    ctx.translate(0, 24);
    this.scoreLabel.draw(ctx);
    ctx.restore();
};
