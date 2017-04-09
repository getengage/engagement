import fs from 'fs';
import del from 'del';
import gulp from 'gulp';
import gIf from 'gulp-if';
import watch from 'gulp-watch';
import sequence from 'gulp-sequence';
import plumber from 'gulp-plumber';
import gutil from 'gulp-util';
import packageJSON from './package.json';
import ncu from 'npm-check-updates';

// rollup
import rollup from 'gulp-better-rollup';
import sourcemaps from 'gulp-sourcemaps';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

// webpack
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.js';

// Configurations.
const sourceDirectory = packageJSON.directories.src;
const destinationDirectory = packageJSON.directories.compiled;
const glob = `${sourceDirectory}/**/*.js`;

// sequence for outdated packages, cleans the distribution directory,
// watches for file changes and compiles the scripts.
gulp.task('default', (callback) => {
  sequence('outdated', 'clean', 'compile', 'watch', callback);
});

// check on outdated npm packages
gulp.task('outdated', (callback) => {
  ncu.run({
    packageFile: './package.json',
    silent: true,
    jsonUpgraded: true,
  }).then((upgraded) => {
    if (upgraded.length) {
      gutil.log('Hold On. Dependencies need update', upgraded);
    }
    callback();
  });
});

// Cleans the dist directory.
gulp.task('clean', (callback) => {
  del([destinationDirectory]).then(() => { callback(); });
});

// Compiles, minifies scripts and generates sourcemaps.
gulp.task('compile', (callback) => {
  gulp.src(`${sourceDirectory}/index.js`)
    .pipe(sourcemaps.init())
    .pipe(
      rollup({
        plugins: [
          resolve({
            jsnext: true,
            main: true,
          }),
          babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: [
              ['es2015', {"modules": false}]
            ],
            plugins: ['external-helpers', 'transform-object-assign'],
          })
        ]
      }, {
      dest: `${destinationDirectory}/engage.js`,
      moduleName: `engage`,
      format: 'iife',
    }))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(destinationDirectory))
});

// Watches for changes.
gulp.task('watch', () => {
  watch(glob, () => { gulp.start('compile'); });
});
