

function Board(n, chessSize = 40) {
    // n x n chessboard
    this.n = n;
    this.chessSize = chessSize;


    this.STATE_NONE = 0;
    this.STATE_SELECTING = 1;
    this.state = this.STATE_NONE;


    this.mainQueue = new Queue();


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

    this.mainQueue.run();

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

Board.prototype.swap = function(row1, col1, row2, col2) {
    var shape1 = this.getShape(row1, col1);
    var shape2 = this.getShape(row2, col2);
    if (shape1.isMoving() || shape2.isMoving()) {
	return 0;
    }

    console.log('swaping', row1, col1, 'to', row2, col2);
    shape1.setMoving(1);
    shape2.setMoving(1);
    this.mainQueue.enque(new Swap(shape1, shape2));
    return 1;
};


// speed is pixel per 0.1s
function Swap(shape1, shape2, speed=10) {
    this.shape1 = shape1;
    this.shape2 = shape2;
    this.speed = speed;

    this.x1 = shape1.px;
    this.y1 = shape1.py;
    this.x2 = shape2.px;
    this.y2 = shape2.py;

    this.begin = 0;
}

Swap.prototype.run = function() {
    var currentTime = new Date().getTime();
    if (!this.begin) {
	this.begin = currentTime;
    }

    var elapsing = currentTime - this.begin;
    console.log('elapsing', elapsing);
    var moving = elapsing / 100 * this.speed; // per 0.1s

    var _x, _y;
    console.log(this.x1, this.y1, this.x2, this.y2);
    var xGap = Math.abs(this.x1 - this.x2);
    var yGap = Math.abs(this.y1 - this.y2);
    var x1Tox2 = this.x1 > this.x2 ? -1 : 1;
    var y1Toy2 = this.y1 > this.y2 ? -1 : 1;
    // for shape1
    _x = moving < xGap ? this.x1 + moving * x1Tox2 : this.x2;
    _y = moving < yGap ? this.y1 + moving * y1Toy2 : this.y2;
    this.shape1.px = _x;
    this.shape1.py = _y;

    // for shape2
    _x = moving < xGap ? this.x2 + moving * -x1Tox2 : this.x1;
    _y = moving < yGap ? this.y2 + moving * -y1Toy2 : this.y1;
    this.shape2.px = _x;
    this.shape2.py = _y;


    if (this.shape2.px == this.x1 && this.shape2.py == this.y1 &&
	this.shape1.px == this.x2 && this.shape1.py == this.y2) {
	this.shape1.setMoving(0);
	this.shape2.setMoving(0);
    }
};

Swap.prototype.isFinished = function() {
    return !this.shape1.isMoving() && !this.shape2.isMoving();
};


