
var N = 6;
var board = new Board(N);

canvas = document.getElementById('canvas');
reloadBtn = document.getElementById('reload');
swapBtn = document.getElementById('swap');
ctx = canvas.getContext('2d');

boardOffsetX = 20; boardOffsetY = 20;

var raf;

function main() {

    reloadBtn.onclick = onReload;
    swapBtn.onclick = onSwap;
    canvas.onclick = onCanvasClick;

    raf = requestAnimationFrame(draw);
}

function onReload() {
    board.switchState();
}

function onSwap() {
    var counter = 0;
    while (counter++ < 1000) {
	var row1 = random(N);
	var col1 = random(N);
	var row2 = random(N);
	var col2 = random(N);
	console.log(row1, col1, row2, col2);
	if (row1 == row2 && col1 == col2) {
	    continue;
	}
	if (board.isAvaliable(row1, col1) && board.isAvaliable(row2, col2)) {
	    var swap = board.createSwapAnimation(row1, col1, row2, col2);
	    if (!swap) {
		continue;
	    }
	    board.addAnimation(swap);
	    break;
	}
    }
}

function onCanvasClick(event) {
    if (board.onclick(event.clientX - boardOffsetX, event.clientY - boardOffsetY)) {
	// resolve by board
	return true;
    }
}


function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(boardOffsetX, boardOffsetY);
    board.draw(ctx);
    ctx.restore();

    raf = requestAnimationFrame(draw);
}

main();