function getPercentage(elapseTime, loopTime) {
    while (elapseTime > loopTime) {
	elapseTime -= loopTime;
    }
    return elapseTime / loopTime;
}