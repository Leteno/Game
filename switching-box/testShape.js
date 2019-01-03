
var objs = [];

canvas = document.getElementById('canvas');
reloadBtn = document.getElementById('reload');
ctx = canvas.getContext('2d');

var raf;

function main() {

    size = 30; gap = 20;

    for (var i = 0; i < 9; i++) {
	objs.push(new Shape(size * i + gap * i, 100, size, i));
    }

    objs[2].selected = true;

    reloadBtn.onclick = onReload;

    raf = requestAnimationFrame(draw);
}

function onReload() {
    for (var i = 0; i < objs.length; i++) {
	objs[i].hide = !objs[i].hide;
    }
}


function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < objs.length; i++) {
	objs[i].draw(ctx);
    }

    raf = requestAnimationFrame(draw);
}

main();