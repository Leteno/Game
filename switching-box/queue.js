
function Runnable() {
}
Runnable.prototype.run = function() {
};
Runnable.prototype.isFinished = function() {
    return 1;
};

function Queue() {
    this.list = [];
}
Queue.prototype.run = function() {
    for (var i = 0; i < this.list.length; i++) {
	if (!this.list[i].isFinished()) {
	    this.list[i].run();
	}
    }
};
Queue.prototype.isFinished = function() {
    for (var i = 0; i < this.list.length; i++) {
	if (!this.list[i].isFinished()) {
	    return 0;
	}
    }
    return 1;
};
Queue.prototype.enque = function(runnable) {
    this.list.push(runnable);
};
Queue.prototype.clear = function() {
    this.list = [];
};

function Sequence() {
    this.list = [];
}
Sequence.prototype.run = function() {
    for (var i = 0; i < this.list.length; i++) {
	if (!this.list[i].isFinished()) {
	    this.list[i].run();
	    return;
	}
    }
};
Sequence.prototype.isFinished = function() {
    for (var i = 0; i < this.list.length; i++) {
	if (!this.list[i].isFinished()) {
	    return 0;
	}
    }
    return 1;
};
Sequence.prototype.enque = function(runnable) {
    this.list.push(runnable);
};
Sequence.prototype.clear = function() {
    this.list = [];
};

function Delay(timeInMs, func) {
    this.timeInMs = timeInMs;
    if (!isFunction(func)) {
	console.log(func, "is not a function type");
	debugger;
    }
    this.func = func;

    this.begin = 0;
    this.executed = 0;
}
Delay.prototype.run = function() {
    if (!this.executed) {
	var current = new Date().getTime();
	if (!this.begin) {
	    this.begin = current;
	}
	if (current > this.begin + this.timeInMs) {
	    this.executed = 1;
	    this.func();
	}
    }
};
Delay.prototype.isFinished = function() {
    return this.executed;
};

function AtOnce(func) {
    this.executed = 0;

    if (!isFunction(func)) {
	console.log(func, "is not a function type");
	debugger;
    }
    this.func = func;
}
AtOnce.prototype.run = function() {
    if (!this.executed) {
	this.executed = 1;
	this.func();
    }
};
AtOnce.prototype.isFinished = function() {
    return this.executed;
};
