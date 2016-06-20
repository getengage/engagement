import fs from 'fs';
import del from 'del';
import gulp from 'gulp';
import gIf from 'gulp-if';
import watch from 'gulp-watch';
import sequence from 'gulp-sequence';
import plumber from 'gulp-plumber';
import packageJSON from './package.json';

// webpack
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.js';

// Configurations.
const sourceDirectory = packageJSON.directories.src;
const destinationDirectory = packageJSON.directories.compiled;
const glob = `${sourceDirectory}/**/*.js`;

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
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(destinationDirectory))
});

// Watches for changes.
gulp.task('watch', () => {
  watch(glob, () => { gulp.start('compile'); });
});
