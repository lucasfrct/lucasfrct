"use strict"
 
const gulp          = require("gulp");
const sass          = require("gulp-sass");
const rename        = require("gulp-rename");
const concat        = require("gulp-concat");
const minifyImg     = require("gulp-imagemin");
const compressImg   = require("gulp-image");
const stipComments  = require("gulp-strip-comments");
const minify        = require("gulp-minify");
const minifyJS      = require("gulp-uglify");
const minifyCSS     = require("gulp-clean-css");

sass.compiler = require("node-sass");

gulp.task("sasscompiler", SassCompiler);
gulp.task("jscompiler", JsCompiler);
gulp.task("imgMinify", ImgCompiler);

gulp.task('init', function() {
    gulp.watch("project/vendor/scss/**/*.scss", gulp.series('sasscompiler'));
    gulp.watch("project/vendor/js/**/*.js", gulp.series('jscompiler'));
});

function SassCompiler( ){
    return gulp
        .src("project/vendor/scss/**/*.scss")
        .pipe(stipComments())                           // retira comentários
        .pipe(sass())                                   // converte sass para css
        .pipe(minify())                                 // minifica
        .pipe(rename({ suffix: ".min" }))               // renomeia
        .pipe(minifyCSS())                                  // minifica
        .pipe(gulp.dest("public/vendor/css"))
}

function JsCompiler(){
    return gulp
        .src("project/vendor/js/**/*.js")                       
        .pipe(concat("main.js"))                            // concatena todos os arquivos
        .pipe(stipComments())                               // retira comentátios
        .pipe(minify({ ext: { min: ".min.js"} }))           // minifica
        .pipe(minifyJS())                                   // minifica
        .pipe(gulp.dest("public/vendor/js"))
}

function ImgCompiler (){
    return gulp 
        .src("project/vendor/images/**/*")
        .pipe(compressImg())
        .pipe(minifyImg())
        .pipe(compressImg())
        .pipe(minifyImg())
        .pipe(gulp.dest("public/vendor/images/"))
}

