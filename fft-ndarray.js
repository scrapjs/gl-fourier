var fft = require('ndarray-fft');
var ndarray = require('ndarray');

module.exports = function (N,data) {
	var arr = ndarray(data, [N, 1]);

	return function () {
		fft(1, arr, arr);
	}
};