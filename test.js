var test = require('tst');
var createFormant = require('audio-formant');

var N = 2048;
var waveform = new Float32Array(N);

for (var i = 0; i < N; i++) {
	waveform[i] = Math.sin(Math.PI * 2 * 108 * i / N)/3 + Math.sin(Math.PI * 2 * 432 * i / N)/3  + Math.sin(Math.PI * 2 * 880 * i / N)/3;
	// waveform[i] = Math.random();
}

var formant = createFormant({
	blockSize: N,
	formants: [1/10000,0.1,0.8,0.5],
	channels: 1
});
formant.populate(waveform);

var max = 10e2;
var run = require('./idle')(N);
test('Idle run', function () {
	for (var i = 0; i < max; i++) {
		run();
	}
})


var dft = require('./dft')(N, waveform);
test.skip('Fragment dft', function () {
	// for (var i = 0; i < max; i++) {
		dft();
	// }
});


var sft = require('./sft')(N, waveform);
test.only('Stochastic FT', function () {
	// for (var i = 0; i < max; i++) {
		sft();
	// }
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
