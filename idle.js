/**
 * Webgl idle run
 */
var regl = require('regl')();


module.exports = function (N) {
	return regl({
		vert: `
		precision highp float;
		attribute vec2 position;
		void main() {
			gl_Position = vec4(position, 0, 1);
		}
		`,

		frag: `
		void main () {
			gl_FragColor = vec4(0);
		}
		`,

		attributes: {
			position: regl.buffer(
				[-1,-1, -1,3, 3,-1]
			)
		},

		count: 3
	});
};
