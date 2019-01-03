

function Board(n, chessSize = 40) {
    // n x n chessboard
    this.n = n;

    gap = 20;
    x0 = 0; y0 = 0;

    this.matrix = [];
    for (var r = 0; r < n; r++) {
	for (var c = 0; c < n; c++) {
	    x = x0 + c * (chessSize + gap);
	    y = y0 + r * (chessSize + gap);
	    type = random(n);
	    this.matrix.push(new Shape(x, y, chessSize, type));
	}
    }
}

Board.prototype.draw = function(ctx) {
    ctx.save();

    for (var i = 0; i < this.matrix.length; i++) {
	obj = this.matrix[i];
	obj.draw(ctx);
    }

    ctx.restore();
};

Board.prototype.flip = function(row, col) {
    index = row * this.n + col;
    if (index >= this.matrix.length) {
	debugger;
    }

    shape = this.matrix[index];
    shape.hide = !shape.hide;
};

Board.prototype.maskAll = function() {
    for (var i = 0; i < this.matrix.length; i++) {
	shape = this.matrix[i];
	shape.hide = 1;
    }
};