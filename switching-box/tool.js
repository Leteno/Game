

function random(n) {
    // [0, n)
    return Math.floor(Math.random() * n);
}

function collision(fromX, fromY, toX, toY, x, y) {
    // true if inside, otherwise false

    return fromX <= x && x <= toX &&
	fromY <= y && y <= toY;
}