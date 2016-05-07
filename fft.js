var FFT = require('fft');

module.exports = function (N,data) {
	var fft = new FFT.complex(N, false);

	var out = new Float32Array(data.length);

	return function () {
		fft.simple(out, data);
	}
};