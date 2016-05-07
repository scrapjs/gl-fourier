## Q: what is the principle of cooley-tukey?
* ✔ Frequency points × x's are calculated repeatedly for each X, so just collapse already known data. Do not recalculate already known things.

## Q: can we do straight DFT in shader? looks promising O(N)
- Overcalculation happens, but happens per-fragment.

## Q: can we use cooley-tuckey in parallel? How?

## Q: what if to use formants to estimate spectrum?
* Each formant randomly moves by unit circle, and takes value from the initial signal by that.
* I guess that I can do soundprint by approximating initial noise by formants. By that I get spectrum approximation and