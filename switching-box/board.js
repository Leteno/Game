

function Board(n, chessSize = 40) {
    // n x n chessboard
    this.n = n;
    this.chessSize = chessSize;


    this.STATE_NONE = 0;
    this.STATE_SELECTING = 1;
    this.state = this.STATE_NONE;


    this.gap = 20;
    this.x0 = 20;
    this.y0 = 20;
    this.matrix = [];
    for (var r = 0; r < n; r++) {
	for (var c = 0; c < n; c++) {
	    var xy = this.getXY(r, c);
	    var x = xy[0], y = xy[1];
	    var type = random(n);
	    this.matrix.push(new Shape(x, y, chessSize, type));
	}
    }
}

Board.prototype.getXY = function(row, col) {
    var x = this.x0 + col * (this.chessSize + this.gap);
    var y = this.y0 + row * (this.chessSize + this.gap);
    return [x, y];
};

Board.prototype.getShapeFromXY = function(x, y) {
    var col = Math.floor((x - this.x0) / (this.chessSize + this.gap));
    var row = Math.floor((y - this.y0) / (this.chessSize + this.gap));
    var fromX = this.x0 + col * (this.chessSize + this.gap);
    var fromY = this.y0 + row * (this.chessSize + this.gap);
    var toX = fromX + this.chessSize, toY = fromY + this.chessSize;
    console.log(fromX, fromY, toX, toY, x, y, col, row);
    if (collision(fromX, fromY, toX, toY, x, y)) {
	return this.getShape(row, col);
    }
    return null;
};

Board.prototype.getShape = function(row, col) {
    var index = row * this.n + col;
    if (index >= this.matrix.length) {
	debugger;
    }

    return this.matrix[index];
};

Board.prototype.draw = function(ctx) {
    ctx.save();

    for (var i = 0; i < this.matrix.length; i++) {
	var obj = this.matrix[i];
	obj.draw(ctx);
    }

    ctx.restore();
};

Board.prototype.flip = function(row, col) {

    var shape = this.getShape(row, col);
    shape.hide = !shape.hide;
};

Board.prototype.maskAll = function() {
    for (var i = 0; i < this.matrix.length; i++) {
	var shape = this.matrix[i];
	shape.hide = 1;
    }
};

Board.prototype.onclick = function(x, y) {
    var shape = this.getShapeFromXY(x, y);
    if (shape === null) {
	return;
    }
    if (this.state == this.STATE_SELECTING) {
	shape.selected = !shape.selected;
    } else {
	shape.hide = !shape.hide;
    }
};

Board.prototype.switchState = function() {
    if (this.state == this.STATE_SELECTING) {
	this.state = this.STATE_NONE;
    } else {
	this.state = this.STATE_SELECTING;
    }
};