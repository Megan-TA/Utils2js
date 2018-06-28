var path = require('path')
var gulp = require('gulp')
var del = require('del')
const pump = require('pump')
const $ = require('gulp-load-plugins')()

var dest = 'publish'
var source = 'es6'

gulp.task('copy', ['compress'], () => {
    return gulp
        .src([
            'package.json',
            'README.md',
            'LICENSE'
        ])
        .pipe($.plumber())
        .pipe(gulp.dest(dest))
})

gulp.task('handleJS', ['clean:publish'], (cb) => {
    pump([
        gulp.src([
            `${source}/*`,
            `${source}/**/*`
        ]),
        $.babel(),
        gulp.dest(dest)
    ], cb)
})

gulp.task('compress', ['handleJS'], (cb) => {
    pump([
        gulp.src([
            'publish/*.js',
            'publish/**/*.js'
        ]),
        $.uglify({
            compress: {
                drop_console: true
            }
        }),
        gulp.dest(dest)
    ], cb)
})

gulp.task('clean:publish', () => {
    return del([
        dest
    ])
})

gulp.task('default', ['copy'])
