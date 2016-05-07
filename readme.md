Experiments on various types of Fourier Transforms.

* [DFT]() — due to high paralellism, it is possible to decrease complexity to O(N*N/p), where p can be equal to N. And indeed webgl calculates dft faster than fft. Tests show faster perf, but rendered result still takes time to render.
* [FFT]() — cooley tukey parallel implementation. Falls back to DFT on the small scale. The principle is avoiding overcalculation of already calculated values of sin/cos. That requires shader to run multiple times, which is worse than parallel overcalculation. So just omitted for now.
* [Stochastic Fourier Transform]() — stochastic spectrum estimation (unique method), based on formants. Requires implementing formant function, similar to phasor. (wip)