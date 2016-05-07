/**
 * Stochastic fourier transform
 */
var regl = require('regl')();


module.exports = function (N, data) {
	var text = regl.texture({
		width: N,
		height: 1,
		format: 'alpha',
		type: 'float',
		data: data
	});

	var noiseSize = 512;
	var noise = [];
	for (var i = 0; i < noiseSize*noiseSize; i++) {
		noise.push(Math.random());
	}
	var noiseText = regl.texture({
		width: noiseSize,
		height: noiseSize,
		format: 'alpha',
		type: 'float',
		data: noise
	});

	return regl({
		vert: `
		precision highp float;
		attribute vec2 position;
		void main() {
			gl_Position = vec4(position, 0, 1);
		}
		`,

		frag: `
		precision highp float;

		uniform sampler2D waveform;
		uniform sampler2D noise;
		uniform vec2 viewport;
		uniform float seed;

		const float N = ${N}.;
		const float rate = 44100.;
		const float pi2 = ${Math.PI*2};
		const float pi = ${Math.PI};

		//phasor/source run state
		float distance;
		float step;

		//accumulated resonance energy for a source
		vec2 energy;

		//formant behaviour
		float frequency;
		float range;

		//get energy state of a phasor
		vec2 phasor () {
			return vec2(
				cos(pi2 * distance * frequency),
				sin(pi2 * distance * frequency)
			);
		}

		//get energy state of a source
		vec2 source () {
			return vec2(
				texture2D(waveform, vec2(distance, 0)).w
			);
		}

		//get noise sample
		float random () {
			return texture2D(noise, vec2(distance, gl_FragCoord.y / viewport.y)).w;
		}

		void main () {
			energy = vec2(0);
			distance = 0.;
			step = 1./N;
			frequency = N * 0.5 * gl_FragCoord.x / viewport.x;
			range = step * 0.5;

			// sum all input values masked by frequency values
			for (float i = 0.; i < N; i++) {
				energy += dot(phasor(), source());
				distance += (step + random() * range - range*0.5);
			}

			gl_FragColor = vec4(vec3(length(energy / N) * 255.), 1);
		}
		`,

		attributes: {
			position: regl.buffer(
				[-1,-1, -1,3, 3,-1]
			)
		},

		uniforms: {
			waveform: text,
			noise: noiseText,
			viewport: function (a,b,stats) {
				return [stats.width,stats.height];
			}
		},

		count: 3
	});
};
