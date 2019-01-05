
var resetHelpTag = 0;
var resetHelp = function() {
    resetHelpTag = 1;
};
var items = document.getElementsByClassName('help');
for (var i = 0; i < items.length; i++) {
    items[i].onchange = resetHelp;
}

function Help(board, frequence=10000) {
    this.board = board;
    this.frequence = frequence;

    this.helpInterval = 0;
}

Help.prototype.start = function() {
    this.reset();
};

Help.prototype.pause = function() {
    if (this.helpInterval) {
	clearInterval(this.helpInterval);
    }
};

Help.prototype.reset = function() {
    if (this.helpInterval) {
	clearInterval(this.helpInterval);
    }
    var that = this;
    var func = function() {
	that.serveOnce();
    };
    var helpRatio = getHelpFreqRatio();
    this.helpInterval = setInterval(func, this.frequence * helpRatio);
};

function getHelpFreqRatio() {
    var checkboxes = document.getElementsByClassName('help');
    var checkedCount = 0;
    for (var i = 0; i < checkboxes.length; i++) {
	if (checkboxes[i].checked) {
	    checkedCount ++;
	}
    }
    switch (checkedCount) {
    case 1:
	return 0.8;
    case 2:
	return 0.5;
    case 3:
	return 0.1;
    default:
	return 1.0;
    }
}

Help.prototype.serveOnce = function() {
    var count = 0;
    while (count++ < 100) {
	var row = random(N);
	var col = random(N);
	var shape = this.board.getShape(row, col);
	if (shape && shape.hide) { // TODO leak the item detail
	    var seq = new Sequence();
	    var showUp = function() {
		shape.hide = 0;
	    };
	    var hideIt = function() {
		shape.hide = 1;
	    };
	    seq.enque(new AtOnce(showUp));
	    seq.enque(new Delay(2000, hideIt));
	    this.board.addAnimation(seq, inExtraTunnel=1);

	    break;
	}
    }
    if (resetHelpTag) {
	resetHelpTag = 0;
	this.reset();
    }
};
