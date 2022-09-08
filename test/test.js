const Spline = require('cubic-spline');
 
const xs = [0, 1, 2, 3, 4, 5];
const ys = [9, 3, 6, 2, 4, 8];

// new a Spline object
const spline = new Spline(xs, ys);
 
// get Y at arbitrary X
console.log(spline.at(4.5));
 
// interpolate a line at a higher resolution
for (let i = 0; i < 70; i++) {
  console.log(i+":"+spline.at(i * 0.1));
}