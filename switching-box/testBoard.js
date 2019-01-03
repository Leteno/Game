
var N = 8;
var board = new Board(N);

canvas = document.getElementById('canvas');
reloadBtn = document.getElementById('reload');
ctx = canvas.getContext('2d');

boardOffsetX = 20; boardOffsetY = 20;

var raf;

function main() {

    reloadBtn.onclick = onReload;
    canvas.onclick = onCanvasClick;

    raf = requestAnimationFrame(draw);
}

function onReload() {
    board.switchState();
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