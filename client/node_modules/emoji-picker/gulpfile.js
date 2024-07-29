'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const chalk = require('chalk');
const merge = require('merge2');

let typescript;
let tsProject;
let sourcemaps;
gulp.task('build:typescript', () => {
    if (!typescript) {
        typescript = require('gulp-typescript');
        tsProject = typescript.createProject('tsconfig.json');
        sourcemaps = require('gulp-sourcemaps');
    }
    let tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([
            tsResult.js
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('build')),
            tsResult.dts
                .pipe(gulp.dest('build'))
        ]);
});

var tsProjectTests;
gulp.task('build:typescript:tests', () => {
    if (!typescript) {
        typescript = require('gulp-typescript');
        sourcemaps = require('gulp-sourcemaps');
    }
    if (!tsProjectTests) {
        tsProjectTests = typescript.createProject('tsconfig-tests.json');
    }
    var tsResult = tsProjectTests.src()
        .pipe(sourcemaps.init())
        .pipe(tsProjectTests());

    return tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('build'));
});

gulp.task('build:tests', ['build:typescript:tests']);

gulp.task('build:dev', ['build:typescript', 'build:tests']);

let del;
gulp.task('clean', () => {
    if (!del) {
        del = require('del');
    }
    return del(['build']);
});

gulp.task('watch:dev', () => {
    gulp.watch(['src/**/*.ts'], ['typescript']);
    gulp.watch(['build/**/**'], ['run']);
});

gulp.task('watch', () => {
    gulp.watch(['src/**/*.ts'], ['typescript']);
});

var mocha;
gulp.task('test', () => {
    if (!mocha) {
        mocha = require('gulp-mocha');
    }
    return gulp.src(['build/**/tests/*.test.js'], {read: false})
            .pipe(mocha());
});

gulp.task('set-dev', () => {
    process.env.DEVELOPMENT = true;
    return;
});

gulp.task('build', (callback) => {
    runSequence('clean', ['build:typescript'], callback);
});

gulp.task('dev', (callback) => {
    runSequence('set-dev', 'build:dev', 'watch:dev', callback);
});

gulp.task('default', ['build']);
