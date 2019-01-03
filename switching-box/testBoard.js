
var N = 8;
var board = new Board(N);

canvas = document.getElementById('canvas');
reloadBtn = document.getElementById('reload');
ctx = canvas.getContext('2d');

var raf;

function main() {

    reloadBtn.onclick = onReload;

    raf = requestAnimationFrame(draw);
}

function onReload() {
    board.flip(random(N), random(N));
}


function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(20, 20);
    board.draw(ctx);
    ctx.restore();

    raf = requestAnimationFrame(draw);
}

main();