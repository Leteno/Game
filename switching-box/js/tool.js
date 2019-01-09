

function random(n) {
    // [0, n)
    return Math.floor(Math.random() * n);
}

function collision(fromX, fromY, toX, toY, x, y, threshold=5) {
    // true if inside, otherwise false

    return fromX-threshold <= x && x <= toX+threshold &&
	fromY-threshold <= y && y <= toY+threshold;
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function isArray(arrayToCheck) {
    return arrayToCheck && arrayToCheck.constructor === Array;
}