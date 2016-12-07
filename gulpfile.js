var gulp = require('gulp'),
    gulp_clean_css = require('gulp-clean-css'),
    gulp_concat = require('gulp-concat'),
    gulp_connect = require('gulp-connect'),
    gulp_if = require('gulp-if'),
    gulp_imagemin = require('gulp-imagemin'),
    gulp_minify_html = require('gulp-minify-html-2'),
    gulp_uglify = require('gulp-uglify'),
    gulp_util = require('gulp-util');

var env,
    jsSources,
    cssSources,
    htmlSources,
    fontSources,
    imageSources;


env = gulp_util.env.production;
console.log(env);

if (env) 
{
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
} else 
{
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
}

htmlSources = [
    'builds/development/index.html',
    'builds/development/partials/**/*'
];
jsSources = [
    'js/lib/jquery-3.1.1.min.js',
    'js/lib/jquery.cycle2.js',
    'js/lib/angular.min.js',
    'js/lib/angular-ui-router.min.js',
    'js/controllers.js',
    'js/main.js'
];
// jsSources = 'js/**/*';
cssSources = 'css/style.css';
fontSources = 'builds/development/assets/fonts/*';
imageSources = 'builds/development/assets/images/**/*';

gulp.task('html', function()
{
    gulp.src(htmlSources)
        .pipe(gulp_if(env, gulp_minify_html({empty : true})))
        .pipe(gulp_if(env, gulp.dest(outputDir)))
        .pipe(gulp_connect.reload());
});

gulp.task('js', function()
{
    gulp.src(jsSources)
        // .pipe(gulp_if(env, gulp_concat('script.js')))
        .pipe(gulp_concat('script.js'))
        .pipe(gulp_if(env, gulp_uglify()))
        .pipe(gulp.dest(outputDir + 'assets/js'))
        .pipe(gulp_connect.reload());
});

gulp.task('css', function()
{
    gulp.src(cssSources)
        .pipe(gulp_if(env, gulp_clean_css()))
        .pipe(gulp.dest(outputDir + 'assets/css'))
        .pipe(gulp_connect.reload());
});

gulp.task('fonts', function()
{
    gulp.src(fontSources)
        .pipe(gulp_if(env, gulp.dest(outputDir + 'assets/fonts')))
        .pipe(gulp_connect.reload());
});

gulp.task('images', function()
{
    gulp.src(imageSources)
        .pipe(gulp_if(env, gulp_imagemin()))
        .pipe(gulp_if(env, gulp.dest(outputDir + 'assets/images')))
        .pipe(gulp_connect.reload());
});

gulp.task('watch', function()
{
    gulp.watch(htmlSources, ['html']);
    gulp.watch(jsSources, ['js']);
    gulp.watch(cssSources, ['css']);
    gulp.watch(fontSources, ['fonts']);
    gulp.watch(imageSources, ['images']);
});

gulp.task('connect', function()
{
    gulp_connect.server
    ({
        root: outputDir,
        livereload: true
    })
});

gulp.task('default', ['html','js', 'css', 'fonts', 'images','connect', 'watch']);