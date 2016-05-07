var test = require('tst');


var N = 2048;
var waveform = new Float32Array(N);

for (var i = 0; i < N; i++) {
	waveform[i] = Math.sin(Math.PI * 2 * 108 * i / N)/3 + Math.sin(Math.PI * 2 * 432 * i / N)/3  + Math.sin(Math.PI * 2 * 880 * i / N)/3;
	// waveform[i] = Math.random();
}

var max = 10e2;
var run = require('./idle')(N);
test('Idle run', function () {
	for (var i = 0; i < max; i++) {
		run();
	}
})


var dft = require('./dft')(N, waveform);
test('Fragment dft', function () {
	for (var i = 0; i < max; i++) {
		dft();
	}
});

test('Vertex dft');

var fftnd = require('./fft-ndarray')(N, waveform);
test('Ndarray fft', function () {
	for (var i = 0; i < max; i++) {
		fftnd();
	}
});

var fft = require('./fft')(N, waveform);
test.skip('fft', function () {
	//to 10 times slower than ndarray-fft
	for (var i = 0; i < max; i++) {
		fft();
	}
});
