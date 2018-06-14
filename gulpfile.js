var path = require('path')
var gulp = require('gulp')
var plumber = require('gulp-plumber')
var babel = require('gulp-babel')
var del = require('del')
var uglify = require('gulp-uglify')
var pump = require('pump')

var dest = 'publish'

gulp.task('copy', ['clean:publish'], () => {
    return gulp
        .src([
            './!(node_modules|!(index).js)/*',
            './src/lib'
        ])
        .pipe(plumber())
        .pipe(gulp.dest(dest))
})

gulp.task('handleJS', ['copy'], (cb) => {
    pump([
        gulp.src([
            'publish/*.js',
            'publish/**/*.js'
        ]),
        babel(),
        gulp.dest(dest)
    ], cb)
})

gulp.task('compress', ['handleJS'], (cb) => {
    pump([
        gulp.src([
            'publish/*.js',
            'publish/**/*.js'
        ]),
        uglify({
            compress: {
                drop_console: true
            }
        }),
        gulp.dest(dest)
    ], cb)
})

gulp.task('clean:publish', () => {
    return del([
        'publish'
    ])
})

gulp.task('default', ['compress'])
