const { src, dest, parallel, series, task, watch, gulp } = require('gulp'); 
// const gulp = require('gulp');

const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');

/**
 * source directories of row data
 */
const scriptDir = 'build/js/';
const vendorScriptDir = 'build/vendor/js/';
const cssDir = 'build/css/';
const vendorCssDir = 'build/vendor/css/';
const sassDir = 'build/sass/';

const distDir = 'dist/';
const buildDir = 'build';

/**
 * output filename
 */
const jsFile = 'script.';
const cssFile = 'style.';

function script(){
    return src(`${scriptDir}module/*.js`)
        .pipe(sourcemaps.init())
        .pipe(babel( {presets: ['@babel/preset-env'] }))
        .pipe(concat(`${jsFile}js`))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(`${distDir}js/`));
}

function scriptMinied() {
    return src(`${distDir}js/${jsFile}js`)
        .pipe(rename(`${jsFile}min.js`))
        .pipe(uglify()) 
        .pipe(dest(`${distDir}js/`));
}

function styles() {
    return src(`${sassDir}*.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .on('error', notify.onError({
            message: function(file) {
                hasError = true;
                return file.file.split("/").pop() + ' has failed SASS compilation';
            }
        }))
        .pipe(postcss([autoprefixer({
            browsers: ['last 2 versions']
        })]))
        .pipe(gcmq()) // mediaquerys
        .pipe(sourcemaps.write('.'))
        .pipe(dest(`${distDir}css/`));
}

function styleBuild() {
    return src(`${distDir}css/style.css`)
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest(`${distDir}css/`)); // `${distDir}css/`
}

function watches(){
    watch(`${sassDir}*.scss`, series('styles'));
    watch(`${distDir}css/style.css`, series('styleBuild'));
    watch(`${scriptDir}module/*.js`, series('script'));
    watch(`${scriptDir}module/*.js`, series('script'));
    watch(`${distDir}js/${jsFile}js`, series('scriptMinied'));
}

/**
* Export
*/
exports.script = script;
exports.scriptMinied = scriptMinied;
exports.styles = styles;
exports.styleBuild = styleBuild;
exports.watches = watches;


exports.default = series(series(styles, styleBuild), series(script, scriptMinied), watches);


