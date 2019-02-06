
function getFrameManager() {
    return sFrameManager;
}

function FrameManager() {
    this.frameList = new Array();
    this.currentFrame = 0;
    this.lastTime = -1;
}
var sFrameManager = new FrameManager();

FrameManager.prototype.addFrame = function(key, frame) {
    this.frameList[key] = frame;
};

FrameManager.prototype.getFrame = function(key) {
    return this.frameList[key]
};

FrameManager.prototype.switchFrame = function(key) {
    var frame = this.getFrame(key);
    if (!frame) {
	debugger;
    }
    this.lastTime = new Date().getTime();
    this.currentFrame = frame;
};

FrameManager.prototype.onCanvas = function(canvas) {
    if (!this.currentFrame) {
	return;
    }
    if (!this.lastTime) {
	this.lastTime = new Date().getTime();
    }
    var elapseTime = new Date().getTime() - this.lastTime;
    this.currentFrame.onCanvas(canvas, elapseTime);
};
