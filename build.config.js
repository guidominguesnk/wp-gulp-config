/**
 * @package WP Gulp Config
 * @author Gui Domingues <hello@guidomingues.com>
 * @link https://github.com/guidominguesnk/wp-gulp-config
 */

/**
 * General Gulp configuration settings.
 *
 * 1: Default port.
 * 2: Choose an optimization level between 0 and 7 for PNG images.
 * 3: % of compression for jpg, jpeg images (default is 75).
 */
const config = {
  proxy: 'gulp.local',
  port: 3333 /* 1 */,
  imagemin: {
    png: 3 /* 2 */,
    jpeg: 85 /* 3 */,
  },
}

/* Base folder paths. */
const basePaths = ['src', 'assets', 'build', 'inc', 'admin', 'template-parts']

/* Folder assets paths. */
const folders = [
  'css',
  'scss',
  'styles',
  'fonts',
  'api',
  'img',
  'js',
  'scripts',
  'vendor',
]

/* Object to store all project paths. */
const paths = {
  root: './',
}

/* Iterate over base paths. */
basePaths.forEach((base) => {
  paths[base] = {
    base: `./${base}`,
  }

  /* Iterate over folders and convert the name to camelCase. */
  folders.forEach((folderName) => {
    const toCamelCase = folderName.replace(/\b-([a-z])/g, (_, c) =>
      c.toUpperCase(),
    )

    paths[base][toCamelCase] = `./${base}/${folderName}`
  })
})

/* Export configurations for use in the gulpfile.js. */
module.exports = {
  config,
  paths,
}
