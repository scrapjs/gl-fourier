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

		void main () {
			float real = 0.;
			float im = 0.;
			float ratio;
			float x;
			float frequency = N * 0.5 * gl_FragCoord.x / viewport.x;

			// sum all input values masked by frequency values
			for (float i = 0.; i < N; i++) {
				ratio = i/N;
				x = texture2D(waveform, vec2(ratio, 0)).w;
				real += cos( pi2 * ratio * frequency) * x;
				im += sin( pi2 * ratio * frequency) * x;
			}

			// gl_FragColor = vec4(vec3(texture2D(waveform, vec2(frequency/N,0)).w), 1);
			gl_FragColor = vec4(vec3(sqrt(real*real + im*im) / N) * 255., 1);
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
