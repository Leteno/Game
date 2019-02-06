
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var frameManager = getFrameManager();
var raf;

function main() {
    frameManager.addFrame('welcome', new FrameWelcome());
    frameManager.switchFrame('welcome');
    // kick
    raf = requestAnimationFrame(draw);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frameManager.onCanvas(canvas);
    raf = requestAnimationFrame(draw);
}

main();