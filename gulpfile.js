const gulp = require('gulp')
const clean = require('gulp-clean') /* Used to clean the assets folder for a fresh export. */
const options = require('./build.config') /* Import paths and other options from config.js. */
const logSymbols = require('log-symbols') /* Display symbolic console logs. */
const rename = require('gulp-rename') /* Rename files. */
const sourcemaps = require('gulp-sourcemaps') /* Generate sourcemaps for CSS and JS. */
const sass = require('gulp-sass')(require('sass')) /* Compile SASS files. */
const postcss = require('gulp-postcss') /* Process CSS using PostCSS plugins. */
const concat = require('gulp-concat') /* Concatenate JS and CSS files. */
const imagemin = require('gulp-imagemin') /* Used to optimize images. */
const browserSync =
  require('browser-sync').create() /* Create a BrowserSync instance for live reloading. */

/**
 * Initialize live preview using BrowserSync.
 *
 * 1: Initialize BrowserSync with specified proxy and port.
 * 2: Callback function to signal completion.
 */
function livePreview(done) {
  browserSync.init({
    proxy: options.config.proxy /* 1 */,
    port: options.config.port /* 1 */,
  })
  done() /* 2 */
}

/**
 * Reload the browser preview.
 *
 * 1: Log an information message indicating browser reload.
 * 2: Trigger browser reload using BrowserSync.
 * 3: Callback function to signal completion.
 */
function previewReload(done) {
  console.log(`\n\t${logSymbols.info}`, 'Reloading browser preview.\n') /* 1 */
  browserSync.reload() /* 2 */
  done() /* 3 */
}

/**
 * Process and compile SCSS files.
 *
 * 1: Integrating Tailwind CSS for styling.
 * 2: Adding vendor prefixes to CSS with Autoprefixer.
 * 3: Minifying CSS with CSSnano.
 * 4: Removing comments from CSS using PostCSS.
 * 5: Source SCSS files.
 * 6: Initialize sourcemaps for better debugging.
 * 7: Compile SCSS to CSS and handle errors.
 * 8: Integrate Tailwind CSS based on config.
 * 9: Add vendor prefixes to CSS for better browser compatibility.
 * 10: Minify CSS to reduce file size.
 * 11: Remove comments from CSS for production
 * 12: Concatenate all CSS files into one.
 * 13: Add ".min" suffix to the filename for minified version.
 * 14: Write sourcemaps to a separate file.
 * 15: Output the processed CSS files to the destination directory.
 */
function devStyles() {
  const autoprefixer = require('autoprefixer') /* 2 */
  const cssnano = require('cssnano') /* 3 */
  const comments = require('postcss-discard-comments') /* 4 */

  return gulp
    .src(`${options.paths.src.styles}/*.scss`) /* 5 */
    .pipe(sourcemaps.init()) /* 6 */
    .pipe(sass().on('error', sass.logError)) /* 7 */
    .pipe(
      postcss([
        autoprefixer() /* 9 */,
        cssnano() /* 10 */,
        comments({ removeAll: true }) /* 11 */,
      ]),
    )
    .pipe(concat({ path: 'styles.css' })) /* 12 */
    .pipe(rename({ suffix: '.min' })) /* 13 */
    .pipe(sourcemaps.write('.')) /* 14 */
    .pipe(gulp.dest(options.paths.assets.css)) /* 15 */
}

/**
 * Process and compile TypeScript files.
 *
 * 1: Create TypeScript project based on tsconfig.json.
 * 2: Initialize sourcemaps for better debugging.
 * 3: Compile TypeScript to JavaScript and handle errors.
 * 4: Minify JavaScript with Terser.
 * 5: Concatenate all JavaScript files into one.
 * 6: Add ".min" suffix to the filename for minified version.
 * 7: Write sourcemaps to a separate file.
 * 8: Output the processed JavaScript files to the destination directory.
 */
function devScripts() {
  const ts = require('gulp-typescript') /* 1 */
  const terser = require('gulp-terser') /* 4 */

  const tsProject = ts.createProject(/* 1 */ 'tsconfig.json', {
    removeComments: true,
  })

  return gulp
    .src([`${options.paths.src.scripts}/**/*`])
    .pipe(sourcemaps.init()) /* 2 */
    .pipe(tsProject()) /* 3 */
    .pipe(terser()) /* 4 */
    .pipe(concat({ path: 'scripts.js' })) /* 5 */
    .pipe(rename({ suffix: '.min' })) /* 6 */
    .pipe(sourcemaps.write('.')) /* 7 */
    .pipe(gulp.dest(options.paths.assets.js)) /* 8 */
}

/**
 * Optimize and compress image files.
 *
 * 1: Determine PNG and JPEG quality based on configuration.
 * 2: Set up plugins for image optimization.
 * 3: Source image files.
 * 4: Optimize images with configured plugins.
 * 5: Output the optimized images to the destination directory.
 */
function devImages() {
  const pngQuality = Number.isInteger(options.config.imagemin.png)
    ? options.config.imagemin.png
    : 3 /* 1 */

  const jpgQuality = Number.isInteger(options.config.imagemin.jpeg)
    ? options.config.imagemin.jpeg
    : 75 /* 1 */

  const plugins = [
    imagemin.optipng({ quality: pngQuality }) /* 2 */,
    imagemin.mozjpeg({ quality: jpgQuality }) /* 2 */,
    imagemin.svgo({
      plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
    }) /* 2 */,
  ]

  return gulp
    .src(`${options.paths.src.img}/**/*`) /* 3 */
    .pipe(imagemin([...plugins])) /* 4 */
    .pipe(gulp.dest(options.paths.assets.img)) /* 5 */
}

/* Copy fonts to the ASSETS folder. */
function devFonts() {
  return gulp
    .src(`${options.paths.src.fonts}/**/*`)
    .pipe(gulp.dest(options.paths.assets.fonts))
}

/* Copy third-party assets to the ASSETS folder. */
function devThirdParty() {
  return gulp
    .src(`${options.paths.src.vendor}/**/*`)
    .pipe(gulp.dest(options.paths.assets.vendor))
}

/**
 * Watch for file changes and trigger corresponding tasks.
 *
 * 1: Watch PHP files and trigger devStyles and previewReload tasks.
 * 2: Watch Tailwind CSS configuration and SCSS files, trigger devStyles and previewReload tasks.
 * 3: Watch TypeScript files, trigger devScripts, devStyles, and previewReload tasks.
 * 4: Watch image files, trigger devImages and previewReload tasks.
 * 5: Watch font files, trigger devFonts and previewReload tasks.
 * 6: Watch vendor files, trigger devThirdParty and previewReload tasks.
 * 7: Log an information message indicating watching for changes.
 */
function watchFiles() {
  gulp.watch(['**/*.php'], gulp.series(devStyles, previewReload)) /* 1 */

  gulp.watch(
    `${options.paths.src.styles}/**/*.scss`,
    gulp.series(devStyles, previewReload),
  ) /* 2 */

  gulp.watch(
    `${options.paths.src.scripts}/**/*`,
    gulp.series(devScripts, devStyles, previewReload),
  ) /* 3 */

  gulp.watch(
    `${options.paths.src.img}/**/*`,
    gulp.series(devImages, previewReload),
  ) /* 4 */

  gulp.watch(
    `${options.paths.src.fonts}/**/*`,
    gulp.series(devFonts, previewReload),
  ) /* 5 */

  gulp.watch(
    `${options.paths.src.vendor}/**/*`,
    gulp.series(devThirdParty, previewReload),
  ) /* 6 */

  console.log(`\n\t${logSymbols.info}`, 'Watching for changes...\n') /* 7 */
}

/**
 * Clean the ASSETS folder for a fresh start.
 *
 * 1: Log an information message indicating the cleaning process.
 * 2: Source the ASSETS folder for cleaning.
 *    - The `read: false` option indicates that the content of the files doesn't need to be read.
 *    - The `allowEmpty: true` option ensures that the task doesn't fail if there are no matching files.
 * 3: Clean the ASSETS folder.
 *
 */
function devClean() {
  console.log(
    `\n\t${logSymbols.info}`,
    'Cleaning ASSETS folder for a fresh start.\n',
  ) /* 1 */

  return gulp
    .src(options.paths.assets.base, {
      read: false /* 2 */,
      allowEmpty: true /* 3 */,
    })
    .pipe(clean()) /* 3 */
}

/**
 * Gulp configuration for the default task.
 *
 * 1: Clean the assets folder.
 * 2: Run all tasks in parallel.
 * 3: Live preview build.
 * 4: Watch for live changes.
 */
exports.default = gulp.series(
  devClean /* 1 */,
  gulp.parallel(
    devStyles,
    devScripts,
    devImages,
    devFonts,
    devThirdParty,
  ) /* 2 */,
  livePreview /* 3 */,
  watchFiles /* 4 */,
)

/**
 * Gulp task to create a production bundle by zipping specific files and folders.
 *
 * 1: Requires the 'gulp-zip' plugin for creating ZIP archives.
 * 2: Selects files and folders to include in the production bundle.
 * 3: Pipes the selected files through the 'gulp-zip' plugin.
 * 4: Specifies the name of the ZIP archive as 'build.zip'.
 * 5: Sets the destination folder for the ZIP archive.
 * 6: Defines the 'prod' task, which runs the 'prodBundle' function.
 */
function prodBundle() {
  const zip = require('gulp-zip') /* 1 */

  return gulp
    .src(['**/assets/**', '**/inc/**', './style.css', './*.php']) /* 2 */
    .pipe(zip('build.zip')) /* 3, 4 */
    .pipe(gulp.dest('./')) /* 5 */
}
exports.prod = gulp.series(prodBundle) /* 6 */
