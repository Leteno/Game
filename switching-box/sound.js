
function Sound() {
    this.coinAudio = 0;
    this.shineAppearsAudio = 0;
    this.onReady = function() {};
}

Sound.prototype.load = function() {
    this.coinAudio = new Audio();
    this.shineAppearsAudio = new Audio();
    var sayYes = 0;
    var that = this;
    var areYouReady = function() {
	sayYes ++;
	if (sayYes >= 2) {
	    that.onReady();
	}
    };
    this.coinAudio.onloadeddata = areYouReady;
    this.shineAppearsAudio.onloadeddata = areYouReady;
    this.coinAudio.src = 'assets/coin.wav';
    this.shineAppearsAudio.src = 'assets/shine_appears.wav';
    this.coinAudio.load();
    this.shineAppearsAudio.load();
};

Sound.prototype.playCoin = function() {
    this.coinAudio.currentTime = 0;
    this.coinAudio.play();
};

Sound.prototype.playShineAppears = function() {
    this.shineAppearsAudio.currentTime = 0;
    this.shineAppearsAudio.play();
};