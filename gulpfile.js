"use strict";
const gulp = require("gulp");
// const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();

const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");
const fileinclude = require("gulp-file-include");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require("del");
// const uglify = require('gulp-uglify-es').default;
const htmlmin = require("gulp-htmlmin");
// const purgecss = require('gulp-purgecss')
const px2rem = require("gulp-px-to-rem");

gulp.task("css", () => {
  return (
    gulp
      .src("source/sass/style.scss")
      // .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      .pipe(csso())
      .pipe(gulp.dest("build/public/css"))
      .pipe(rename("style.min.css"))
      .pipe(sourcemap.write("."))

      // .pipe(px2rem({accuracy:0}))
      .pipe(gulp.dest("build/public/css"))
      .pipe(server.stream())
  );
});

gulp.task("js", () => {
  return (
    gulp
      .src("source/js/**/*.js")
      // .pipe(plumber())
      // .pipe(sourcemap.init())
      // .pipe(uglify())
      .pipe(gulp.dest("build/public/js"))
      // .pipe(
      //   rename(function (path) {
      //     path.extname = ".min.js";
      //   })
      // )
      // .pipe(sourcemap.write("."))
      .pipe(gulp.dest("build/public/js"))
  );
});

gulp.task("server", () => {
  server.init({
    server: "build/public/",
    notify: false,
    open: true,
    cors: false,
    ui: false,
    // callbacks: {
    //   ready: function(err, bs) {
    //     console.log(bs);

    //     bs.addMiddleware("*", function (req, res) {
    //       res.writeHead(302, {
    //           location: "/404.html"
    //       });
    //       res.end("Redirecting!");
    //   });
    //   }
    // }
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/js/**/*.js", gulp.series("js", "refresh"));
  gulp.watch("source/img/*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", (done) => {
  server.reload();
  done();
});

// gulp.task("favicon", () => {
//   return gulp.src("source/favicon.svg").pipe(gulp.dest("build/public"));
// });

gulp.task("raster images", () => {
  return gulp
    .src("build/public/img/*.{png,jpg,jpeg}")
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 2 }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
      ])
    )
    .pipe(gulp.dest("build/public/img"));
});

gulp.task("webp", () => {
  return gulp
    .src("build/**/*.{png,jpg,jpeg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/public"));
});

gulp.task("vector images", () => {
  return gulp
    .src("build/img/**/*.svg")
    .pipe(imagemin([imagemin.svgo()]))
    .pipe(gulp.dest("build/public/img"));
});

gulp.task("sprite", () => {
  return gulp
    .src("source/img/sprite/*.svg")
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/public/img/sprite"));
});

// gulp.task("html", () => {
//   return gulp.src("source/*.html")
//     .pipe(posthtml([
//       include()
//     ]))
//     // .pipe(htmlmin({ collapseWhitespace: true }))
//     .pipe(gulp.dest("build"));
// });

gulp.task("html", () => {
  return gulp
    .src(["source/index.html", "source/bot.html", "source/tester.html"])
    .pipe(fileinclude())
    .pipe(posthtml([include()]))
    // .pipe(htmlmin({
    //   collapseWhitespace: false
    // }))
    .pipe(gulp.dest("build/public"));
});

gulp.task("copy", () => {
  return gulp
    .src(
      [
        "source/font/**/*.{woff,woff2}",
        "source/img/**/*.{png,jpg,jpeg,svg,gif}",
        "source/*.ico",
      ],
      {
        base: "source",
      }
    )
    .pipe(gulp.dest("build/public"));
});

gulp.task("clean", () => del("build"));

gulp.task(
  "build",
  gulp.series(
    "clean",
    "copy",
    "css",
    "js",
    "vector images",
    "sprite",
    "webp",
    "html",
    "raster images",
    // "favicon"
  )
);

gulp.task("start", gulp.series("server"));
