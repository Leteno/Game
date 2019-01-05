
var hint;
function showMessage(msg) {
    if (!hint) {
	hint = new Hint();
    }
    hint.put(msg);
}

function Hint() {
    this.maxSize = 3;
    this.messageBox = [];
}

Hint.prototype.put = function(msg) {
    this.messageBox.push(msg);
    if (this.messageBox.length > this.maxSize) {
	this.messageBox = this.messageBox.slice(
	    this.messageBox.length - this.maxSize, this.messageBox.length);
    }
    this.updateLabel();
};

Hint.prototype.updateLabel = function() {
    words = '';
    for (var i = 0; i < this.messageBox.length; i++) {
	words += this.messageBox[i] + '<br/>';
    }
    document.getElementById('message').innerHTML = words;
};