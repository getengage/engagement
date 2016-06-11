import fs from 'fs';
import del from 'del';
import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import gIf from 'gulp-if';
import watch from 'gulp-watch';
import sequence from 'gulp-sequence';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import packageJSON from './package.json';

// Configurations.
const sourceDirectory = packageJSON.directories.src;
const destinationDirectory = packageJSON.directories.compiled;
const glob = `${sourceDirectory}/**/*.js`;
const useMinification = (packageJSON.config.minify === 'true');
const babelConfig = JSON.parse(fs.readFileSync(`${__dirname}/.babelrc`, 'utf8'));

// Cleans the distribution directory,
// watches for file changes and compiles the scripts.
gulp.task('default', (callback) => {
  sequence('clean', 'compile', 'watch', callback);
});

// Cleans the dist directory.
gulp.task('clean', (callback) => {
  del([destinationDirectory]).then(() => { callback(); });
});

// Compiles, minifies scripts and generates sourcemaps.
gulp.task('compile', () => {
  gulp.src(glob)
    .pipe(plumber())
    .pipe(gIf(useMinification, sourcemaps.init()))
    .pipe(babel(babelConfig))
    .pipe(gulp.dest(destinationDirectory))
    .pipe(gIf(useMinification, rename({ suffix: '.min' })))
    .pipe(gIf(useMinification, uglify({ drop_debugger: true })))
    .pipe(gIf(useMinification, sourcemaps.write('.')))
    .pipe(gIf(useMinification, gulp.dest(destinationDirectory)));
});

// Watches for changes.
gulp.task('watch', () => {
  watch(glob, () => { gulp.start('compile'); });
});
