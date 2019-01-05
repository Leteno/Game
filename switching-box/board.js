

function Board(n, chessSize = 40, pickingChoiceCount = 2) {
    // n x n chessboard
    this.n = n;
    this.chessSize = chessSize;
    this.pickingChoiceCount = pickingChoiceCount;


    this.STATE_NONE = 0;
    this.STATE_SELECTING = 1;
    this.STATE_GAMING = 2;
    this.state = this.STATE_NONE;


    this.mainMessageQueue = new Sequence();
    this.extraMessageQueue = new Sequence();
    this.mainJobs = [];
    this.extraJobs = [];

    this.onPickItem = 0;
    this.onRightItemPick = 0;
    this.onWrongItemPick = 0;

    this.gap = Math.floor(chessSize / 2);
    this.x0 = 0;
    this.y0 = 0;
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

Board.prototype.getIndexOfShape = function(shape) {
    for (var i = 0; i < this.matrix.length; i++) {
	if (this.matrix[i] == shape) {
	    return i;
	}
    }
    return -1;
};

Board.prototype.draw = function(ctx) {

    while (this.mainJobs.length > 0) {
	var anim = this.mainJobs.shift();
	this.mainMessageQueue.enque(anim);
    }
    while (this.extraJobs.length > 0) {
	var anim = this.extraJobs.shift();
	this.extraMessageQueue.enque(anim);
    }

    this.mainMessageQueue.run();
    this.extraMessageQueue.run();

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
	if (shape.selected) {
	    shape.selected = 0;
	} else if (!this.hasFinishPickingItem()) {
	    shape.selected = 1;
	}
	if (isFunction(this.onPickItem)) this.onPickItem();
    } else if (this.state == this.STATE_GAMING) {
	if (shape.selected) {
	    if (shape.hide) {
		if (isFunction(this.onRightItemPick)) {
		    this.onRightItemPick(shape);
		}
	    }
	} else {
	    if (isFunction(this.onWrongItemPick)) {
		this.onWrongItemPick(shape);
	    }
	}
    }
    return 1;
};

Board.prototype.register = function(onPickItem=0, onRightItemPick=0, onWrongItemPick=0) {
    this.onPickItem = onPickItem;
    this.onRightItemPick = onRightItemPick;
    this.onWrongItemPick = onWrongItemPick;
};

Board.prototype.hasFinishPickingItem = function() {
    var picked = 0;
    for (var i = 0; i < this.matrix.length; i++) {
        var item = this.matrix[i];
        if (item.selected) {
	    picked ++;
        }
    }
    return picked >= this.pickingChoiceCount;
};

Board.prototype.isAllFoundOut = function() {
    for (var i = 0; i < this.matrix.length; i++) {
        var item = this.matrix[i];
        if (item.selected && item.hide) {
	    return 0;
        }
    }
    return 1;
};

Board.prototype.switchToNoneState = function() {
    this.state = this.STATE_NONE;
};
Board.prototype.switchToSelectingState = function() {
    this.state = this.STATE_SELECTING;
};
Board.prototype.switchToGamingState = function() {
    this.state = this.STATE_GAMING;
};

Board.prototype.createSwapAnimation = function(row1, col1, row2, col2) {
    var shape1 = this.getShape(row1, col1);
    var shape2 = this.getShape(row2, col2);
    if (shape1.isMoving() || shape2.isMoving()) {
	return 0;
    }

    console.log('swaping', row1, col1, 'to', row2, col2);
    shape1.setMoving(1);
    shape2.setMoving(1);
    var that = this;
    var onSuccess = function() {
	var index1 = that.getIndexOfShape(shape1);
	var index2 = that.getIndexOfShape(shape2);
	that.matrix[index1] = shape2;
	that.matrix[index2] = shape1;
    };
    return new Swap(shape1, shape2, onSuccess);
};

Board.prototype.isAvaliable = function(row, col) {
    var shape = this.getShape(row, col);
    if (shape) {
	return !shape.isMoving();
    }
    return 0;
};

Board.prototype.addAnimation = function(animation, inExtraTunnel=0) {
    if (inExtraTunnel) {
	this.mainJobs.push(animation);
    } else {
	this.extraJobs.push(animation);
    }
};

Board.prototype.clearAnimations = function() {
    this.mainJobs = [];
    this.extraJobs = [];
    this.mainMessageQueue.clear();
    this.extraMessageQueue.clear();
};

// speed is pixel per 0.1s
function Swap(shape1, shape2, onSuccess, speed=10) {
    this.shape1 = shape1;
    this.shape2 = shape2;

    this.x1 = shape1.px;
    this.y1 = shape1.py;
    this.x2 = shape2.px;
    this.y2 = shape2.py;

    this.begin = 0;
    this.onSuccess = onSuccess;;

    var deltaX = Math.abs(this.x1 - this.x2);
    var deltaY = Math.abs(this.y1 - this.y2);
    var sinA = deltaY / Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    var cosA = deltaX / Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    this.xSpeed = speed * cosA;
    this.ySpeed = speed * sinA;
    this.deltaX = deltaX;
    this.deltaY = deltaY;

    this.x1Tox2 = this.x1 > this.x2 ? -1 : 1;
    this.y1Toy2 = this.y1 > this.y2 ? -1 : 1;
}

Swap.prototype.run = function() {
    var currentTime = new Date().getTime();
    if (!this.begin) {
	this.begin = currentTime;
    }

    var elapsing = currentTime - this.begin;
    var timeUnit = elapsing / 100; // per 0.1s
    var acceleration = timeUnit * 1.5;
    var xMoving = (this.xSpeed + acceleration) * timeUnit;
    var yMoving = (this.ySpeed + acceleration) * timeUnit;

    var _x, _y;
    // for shape1
    _x = xMoving < this.deltaX ? this.x1 + xMoving * this.x1Tox2 : this.x2;
    _y = yMoving < this.deltaY ? this.y1 + yMoving * this.y1Toy2 : this.y2;
    this.shape1.px = _x;
    this.shape1.py = _y;

    // for shape2
    _x = xMoving < this.deltaX ? this.x2 + xMoving * -this.x1Tox2 : this.x1;
    _y = yMoving < this.deltaY ? this.y2 + yMoving * -this.y1Toy2 : this.y1;
    this.shape2.px = _x;
    this.shape2.py = _y;


    if (this.shape2.px == this.x1 && this.shape2.py == this.y1 &&
	this.shape1.px == this.x2 && this.shape1.py == this.y2) {

	this.onSuccess();
	this.shape1.setMoving(0);
	this.shape2.setMoving(0);
    }
};

Swap.prototype.isFinished = function() {
    return !this.shape1.isMoving() && !this.shape2.isMoving();
};
