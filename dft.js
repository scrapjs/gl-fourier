/**
 * DFT in webgl
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
		uniform vec2 viewport;

		const float N = ${N}.;
		const float rate = 44100.;
		const float pi2 = ${Math.PI*2};
		const float pi = ${Math.PI};

		vec2 phasor (float ratio, float f, float a) {
			return a * vec2(
				cos(pi2 * ratio * f),
				sin(pi2 * ratio * f)
			);
		}

		void main () {
			vec2 energy = vec2(0);
			float ratio;
			float x;
			float frequency = N * 0.5 * gl_FragCoord.x / viewport.x;

			// sum all input values masked by frequency values
			for (float i = 0.; i < N; i++) {
				ratio = i/N;
				x = texture2D(waveform, vec2(ratio, 0)).w;
				energy += phasor(ratio, frequency, x);
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
			viewport: function (a,b,stats) {
				return [stats.width,stats.height];
			}
		},

		count: 3
	});
};
