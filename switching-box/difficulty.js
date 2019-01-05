
function Difficulty(value=0) {
    this.value = value;
}

Difficulty.prototype.raiseUp = function() {
    this.value ++;
};

Difficulty.prototype.getMovingSpeed = function() {
    switch (this.value) {
    case 0:
    return 10;
    case 1:
    return 15;
    case 2:
    return 20;
    }
    return this.value * 2 + 20;
};

Difficulty.prototype.getSwapingTime = function() {
    return 1 + Math.floor(this.value * 3 / 2);
};

Difficulty.prototype.getSwapingItemCountAtSameTime = function() {
    return 3 + this.value * 2;
};

Difficulty.prototype.getTaskItemCount = function() {
    return 1 + Math.floor(this.value / 2);
};