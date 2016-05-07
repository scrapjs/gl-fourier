Experiments on various types of Fourier Transforms.

* [DFT]() — due to high paralellism, it is possible to decrease complexity to O(N*N/p), where p can be equal N. And indeed webgl calculates dft faster than fft. Tests show faster perf, but rendered result is still takes a time to render.
* [FFT]() — cooley tukey parallel implementation. Falls back to DFT on the small scale.
* [Stochastic Fourier Transform]() — stochastic spectrum estimation (unique method), based on formants.
* [DWT]() — wavelet transform.