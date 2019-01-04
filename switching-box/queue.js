
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