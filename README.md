# less-husl
Less.js plugin that lets you specify colors in HUSL color space. 

See http://www.husl-colors.org/ for details.

## Installation

With `npm`:
```bash
npm --save-dev install less-husl
```
...or clone the repo, then run `npm install`.

## Example

```less
// stylesheet.less
@hue        : 180; // 0..360
@saturation :  75; // 0..100
@lightness  :  66; // 0..100
//
@my_color   : husl( @hue, @saturation, @lightness );
```

## Usage 

### With lessc

```bash
lessc --plugin=[path-to-cloned-repo]\lib\husl.js <stylesheet.less>
```

### With gulp

```javascript
// gulpfile.js
var less = require( 'gulp-less' );
var husl = require( 'less-husl' );
//
var lessOpts =
{
	paths   : ['./src/less'],
	plugins : [husl] 
};

gulp.task( 'css', function()
{
	gulp
		.src ( ['./src/less/index.less'] )
		.pipe( less( lessOpts ) )
		.pipe( gulp.dest(' ./dist' ) );
});
// ...
```

