
function Sound() {
    this.coinAudio = 0;
    this.shineAppearsAudio = 0;
    this.mamaMiaAudio = 0;
    this.ready = 0;
    this.onReady = function() {};
}

Sound.prototype.load = function() {
    this.coinAudio = new Audio();
    this.shineAppearsAudio = new Audio();
    this.mamaMiaAudio = new Audio();
    var sayYes = 0;
    var audioCount = 3;
    var that = this;
    var areYouReady = function() {
	sayYes ++;
	if (sayYes >= audioCount) {
	    that.ready = 1;
	    that.onReady();
	}
    };
    this.coinAudio.onloadeddata = areYouReady;
    this.shineAppearsAudio.onloadeddata = areYouReady;
    this.mamaMiaAudio.onloadeddata = areYouReady;
    this.coinAudio.src = 'assets/coin.wav';
    this.shineAppearsAudio.src = 'assets/shine_appears.wav';
    this.mamaMiaAudio.src = 'assets/mamamia.wav';
    this.coinAudio.load();
    this.shineAppearsAudio.load();
    this.mamaMiaAudio.load();
};

Sound.prototype.playCoin = function() {
    this.coinAudio.currentTime = 0;
    this.coinAudio.play();
};

Sound.prototype.playShineAppears = function() {
    this.shineAppearsAudio.currentTime = 0;
    this.shineAppearsAudio.play();
};

Sound.prototype.playMamaMia = function() {
    this.mamaMiaAudio.currentTime = 0;
    this.mamaMiaAudio.play();
};