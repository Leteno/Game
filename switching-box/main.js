
var N = 6;
var board = new Board(N);
var difficulty = 3;

canvas = document.getElementById('canvas');
reloadBtn = document.getElementById('reload');
ctx = canvas.getContext('2d');

boardOffsetX = 20; boardOffsetY = 20;

var raf;

var STATE_START_PICKING = 0;
var STATE_ABOUT_TO_GAME = 1;
var STATE_SWAPING_ITEMS = 2;
var STATE_WAITING_SWAP_FINISH = 3;
var STATE_GAMING = 4;

var gameState = STATE_START_PICKING;

var wrongAnswer = 0;

function main() {

    reloadBtn.onclick = onReload;
    canvas.onclick = onCanvasClick;

    onStartPicking();

    raf = requestAnimationFrame(draw);
}

function logic() {
    switch (gameState) {
    case STATE_START_PICKING:
	if (board.hasFinishPickingItem()) {
	    gameState = STATE_ABOUT_TO_GAME;
	    var func = function() {
		gameState = STATE_SWAPING_ITEMS;
		console.log("swaping items");
	    };
	    console.log("game is about to start...");
	    setTimeout(func, 2000);
	}
	break;
    case STATE_ABOUT_TO_GAME:
	console.log("lalala, I am not alone...");
	break;
    case STATE_SWAPING_ITEMS:
	gameState = STATE_WAITING_SWAP_FINISH;
	board.maskAll();
	itemEachTime = difficulty;
	times = difficulty * 3;
	var onSwapFinish = function() {
	    gameState = STATE_GAMING;
	    onStartGaming();
	    console.log("game is started!");
	};
	makeSwap(itemEachTime, times, onSwapFinish);
	break;
    case STATE_WAITING_SWAP_FINISH:
	break;
    case STATE_GAMING:
	console.log("lalala, we are gaming~");
	break;
    }
}

function draw() {

    logic();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(boardOffsetX, boardOffsetY);
    board.draw(ctx);
    ctx.restore();

    raf = requestAnimationFrame(draw);
}


function onStartPicking() {
    gameState = STATE_START_PICKING;
    board.register(onPickItem, onRightItemPick, onWrongItemPick);
    board.switchToSelectingState();
}

var helpServiceIntervalID = 0;
function onStartGaming() {
    board.switchToGamingState();

    wrongAnser = 0;

    if (helpServiceIntervalID) {
	clearInterval(helpServiceIntervalID);
    }
    helpServiceIntervalID = setInterval(help, 3000);
}

function onGameSucceed() {
    console.log('we succeed one');
}

function onReload() {
    board = new Board(N);
    onStartPicking();
}

function makeSwap(itemEachTime, times, onFinished=0) {
    for (var t = 0; t < times; t++) {
	var queue = new Queue();
	for (var i = 0; i < itemEachTime; i++) {
	    var rowCol1 = getRandomAvaliableItem();
	    var rowCol2 = getRandomAvaliableItem();
	    if (rowCol1 && rowCol2) {
		var swap = board.createSwapAnimation(
		    rowCol1[0], rowCol1[1], rowCol2[0], rowCol2[1]);
		queue.enque(swap);
	    }
	}
	board.addAnimation(queue);
    }
    if (isFunction(onFinished)) {
	var runnable = new Runnable();
	runnable._isDone = 0;
	runnable.run = function() {
	    onFinished();
	    this._isDone = 1;
	};
	runnable.isFinished = function() {
	    return this._isDone;
	};
	board.addAnimation(runnable);
    }
}

function getRandomAvaliableItem() {
    var counter = 0;
    while (counter++ < 1000) {
	var row = random(N);
	var col = random(N);
	if (board.isAvaliable(row, col)) {
	    return [row, col]
	}
    }
    return 0;
}

function onCanvasClick(event) {
    if (board.onclick(event.clientX - boardOffsetX, event.clientY - boardOffsetY)) {
	// resolve by board
	return true;
    }
}

function onPickItem() {
    console.log('onPickItem');
}

function onRightItemPick(item) {
    console.log('pick up the right item');

    item.hide = 0;

    if (board.isAllFoundOut()) {
	onGameSucceed();
    }
}

function onWrongItemPick(item) {
    console.log('pick the wrong one');

    var seq = new Sequence();
    var showUp = function() {
	item.hide = 0;
    };
    var hideIt = function() {
	item.hide = 1;
    };
    seq.enque(new AtOnce(showUp));
    seq.enque(new Delay(2000, hideIt));
    board.addAnimation(seq);

    wrongAnswer++;
    if (wrongAnswer % 5 == 0) {
	help();
    }
}

function help() {
    if (gameState == STATE_GAMING) {
	var count = 0;
	while (count++ < 100) {
	    var row = random(N);
	    var col = random(N);
	    var shape = board.getShape(row, col);
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
		board.addAnimation(seq);

		break;
	    }
	}
    }
}

main();