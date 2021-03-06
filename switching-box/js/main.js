
var N = 6;
var help;
var board;
var sound = new Sound();
var scoreAndLevelLabel = new ScoreAndLevelLabel(level=0);
var taskLabel = new Label();
var hintLabel = new Label();
var cheatButton = new Button('cheat');
var difficulty = new Difficulty();;

var canvas = document.getElementById('canvas');
var reloadBtn = document.getElementById('reload');
var ctx = canvas.getContext('2d');

var openingUp = new OpeningUp(canvas);

var boardOffsetX;
var boardOffsetY;
var chessSize;

var raf;

var STATE_START_PICKING = 0;
var STATE_ABOUT_TO_GAME = 1;
var STATE_SWAPING_ITEMS = 2;
var STATE_WAITING_SWAP_FINISH = 3;
var STATE_GAMING = 4;

var gameState = STATE_START_PICKING;

var wrongAnswer = 0;
var watchingQueue = new Queue();


function main() {

    init();

    reloadBtn.onclick = onReload;
    canvas.onclick = onCanvasClick;
    canvas.onmousedown = onCanvasMouseDown;
    canvas.onmouseup = onCanvasMouseUp;

    onStartPicking();

    openingUp.stop();

    raf = requestAnimationFrame(draw);
}

function init() {
    var margin = 20;
    var chessCount = (N + N / 2 - 0.5);
    chessSize = (Math.min(canvas.width, canvas.height) - 2 * margin) / chessCount;
    var boardWidth = chessSize * chessCount;
    var boardHeight = chessSize * chessCount;
    boardOffsetX = (canvas.width - boardWidth) / 2;
    boardOffsetY = (canvas.height - boardHeight) / 2;
}

function logic() {
    switch (gameState) {
    case STATE_START_PICKING:
	if (board.hasFinishPickingItem()) {
	    gameState = STATE_ABOUT_TO_GAME;
	    var func = function() {
		gameState = STATE_SWAPING_ITEMS;
		showMessage("Swaping items");
	    };
	    showMessage("Game is about to start...");
	    setTimeout(func, 2000);
	}
	break;
    case STATE_ABOUT_TO_GAME:
	showMessage("About to game");
	break;
    case STATE_SWAPING_ITEMS:
	gameState = STATE_WAITING_SWAP_FINISH;
	board.maskAll();
	var onSwapFinish = function() {
	    gameState = STATE_GAMING;
	    onStartGaming();
	    showMessage("Game is started!");
	};
	itemEachTime = difficulty.getSwapingItemCountAtSameTime();
	times = difficulty.getSwapingTime();
	makeSwap(itemEachTime, times, onSwapFinish);
	break;
    case STATE_WAITING_SWAP_FINISH:
	break;
    case STATE_GAMING:
	break;
    }
}

function draw() {

    logic();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw Frame
    ctx.save();
    ctx.strokeStyle = '#CCC';
    ctx.fillStyle = '#1E8AE8';
    ctx.lineWidth = 10;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    ctx.save();
    ctx.translate(boardOffsetX, boardOffsetY);
    board.draw(ctx);
    ctx.restore();

    ctx.save();
    ctx.translate(20, 40);
    scoreAndLevelLabel.draw(ctx);
    ctx.translate(0, 100);
    taskLabel.draw(ctx);
    ctx.restore();

    ctx.save();
    ctx.translate(20, canvas.height - 100);
    hintLabel.draw(ctx);
    ctx.restore();

    ctx.save();
    ctx.translate(cheatButton.x, cheatButton.y);
    cheatButton.draw(ctx);
    ctx.restore();

    raf = requestAnimationFrame(draw);
}


function onStartPicking() {

    var count = difficulty.getTaskItemCount();
    board = new Board(N, chessSize, pickingChoiceCount=count);
    gameState = STATE_START_PICKING;
    board.register(onPickItem, onRightItemPick, onWrongItemPick);
    board.switchToSelectingState();
    board.addAnimation(watchingQueue);

    if (help) {
	help.pause();
    }
    help = new Help(board);

    showMessage('Please pick ' + count + ' items');

    taskLabel.setText('task: ' + count + (count > 0 ? ' items' : ' item'));
    hintLabel.setText('pick ' + count + (count > 0 ? ' items' : ' item'));
    cheatButton.setXY(canvas.width - 100, 100);
    cheatButton.onclickRun = function() {
	console.log('button onclick');
    };
    cheatButton.onPressRun = function() {
	board.cheat(1);
	scoreAndLevelLabel.score -= Math.max(10, scoreAndLevelLabel.score / 2);
	scoreAndLevelLabel.updateLabel();
    };
    cheatButton.onPressUpRun = function() {
	board.cheat(0);
    };
}

function onStartGaming() {
    board.switchToGamingState();
    help.start();

    wrongAnser = 0;
}

function onGameSucceed() {
    showMessage('we succeed one');
    hintLabel.setText('Good. =v=');
    help.pause();
    board.clearAnimations();
    difficulty.raiseUp();
    scoreAndLevelLabel.upgrade();

    sound.playShineAppears();
    showMessage('we are going to make a new map...');
    setTimeout(onStartPicking, 4000);
}

function onReload() {
    difficulty = new Difficulty();
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
		    rowCol1[0], rowCol1[1], rowCol2[0], rowCol2[1],
		    difficulty.getMovingSpeed());
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
    var realX = event.clientX - canvas.offsetLeft;
    var realY = event.clientY - canvas.offsetTop;
    if (board.onclick(realX - boardOffsetX, realY - boardOffsetY)) {
	// resolve by board
	return true;
    }
    if (cheatButton.onclick(realX - cheatButton.x, realY - cheatButton.y)) {
	return true;
    }
}

function onCanvasMouseDown(event) {
    var realX = event.clientX - canvas.offsetLeft;
    var realY = event.clientY - canvas.offsetTop;
    cheatButton.onMouseDown(realX - cheatButton.x, realY - cheatButton.y);
}

function onCanvasMouseUp(event) {
    var realX = event.clientX - canvas.offsetLeft;
    var realY = event.clientY - canvas.offsetTop;
    cheatButton.onMouseUp(realX - cheatButton.x, realY - cheatButton.y);
}

function onPickItem() {
    console.log('onPickItem');
}

function onRightItemPick(item) {
    showMessage('pick up the right item');
    hintLabel.setText('Bingo');

    item.hide = 0;

    sound.playCoin();
    if (board.isAllFoundOut()) {
	onGameSucceed();
    }
}

function onWrongItemPick(item) {
    showMessage('pick the wrong one');
    hintLabel.setText('WA =-=');

    var seq = new Sequence();
    var showUp = function() {
	item.hide = 0;
    };
    var hideIt = function() {
	item.hide = 1;
    };
    seq.enque(new AtOnce(showUp));
    seq.enque(new Delay(2000, hideIt));

    watchingQueue.enque(seq);

    wrongAnswer++;
    if (wrongAnswer % 5 == 2) {
	help.serveOnce();
    }
    sound.playMamaMia();
}

var backup = function() {
    sound.onReady = 0;
    showMessage('We are not waiting for sound ready now.');
    main();
};

var backupTimeout = setTimeout(backup, 3000);

showMessage('loading sound');
sound.load();

openingUp.kickStart();