var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    jade = require('gulp-jade');
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    spritesmith = require('gulp.spritesmith'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    cache = require('gulp-cache'),
    sourcemaps = require('gulp-sourcemaps'),
    rimraf = require('rimraf'),
    plumber = require('gulp-plumber');

var postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    short = require('postcss-short'),
    stylefmt = require('stylefmt'),
    assets = require('postcss-assets'),
    sorting = require('postcss-sorting'),
    fontmagic = require('postcss-font-magician'),
    fixes = require('postcss-fixes');

/*css-libs*/
gulp.task('css-libs', function () {
    var processors = [
        cssnano
    ]
    return gulp.src([
        'app/libs/**/*.css'
    ])
        .pipe(postcss(processors))
        .pipe(concat('libs.min.css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream({}));
});

/*sass*/
gulp.task('sass', function () {
    var processors = [
        assets,
        short,
        fontmagic,
        fixes,
        autoprefixer(['last 5 versions', '> 5%', 'ie 8', 'ie 7', 'ie 9', 'safari 5', 'opera 12.1', 'ios 6', 'android 4'], {
            cascade: true
        }),
        sorting(),
        stylefmt(),
        cssnano
    ];
    return gulp.src('app/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(sourcemaps.write('.', {sourceRoot: 'css-source'}))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream({}));
});

/*browser-sync*/
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './public'
        },
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        },
        notify: false
    });
});

/*compress*/
gulp.task('compress', ['clean'], function () {
    return gulp.src('app/js/*.js')
        .pipe(plumber())
        .pipe(concat('script.js'))
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.stream({}));

});

/*fonts*/
gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('./public/fonts'))
        .pipe(browserSync.stream({}));
});

/*clean*/
gulp.task("clean", function (cb) {
    rimraf('./js/script.min.js', cb);
});

/*jade */
gulp.task('jade', function () {
    gulp.src('app/template/pages/*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream({}));
});

gulp.task('watch', ['compress', 'jade', 'css-libs', 'img', 'sass', 'fonts'], function () {
    gulp.watch('app/libs/**/*', ['css-libs']);
    gulp.watch('app/img/**/*', ['img']);
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch(['app/template/**/*.jade'], ['jade']);
    gulp.watch('app/js/**/*.js', ['compress']);
    gulp.watch('app/fonts/**/*', ['fonts']);
});

/*img */
gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('./public/img'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('clear', function (callback) {
    return cache.clearAll();
});

gulp.task('default', ['watch', 'browser-sync']);