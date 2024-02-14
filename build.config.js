/**
 * @package WP Gulp Config
 * @author Gui Domingues <hello@guidomingues.com>
 * @link https://github.com/guidominguesnk/wp-gulp-config
 */

const config = {
  proxy: 'gulp.local',
  port: 3333 /* Default port. */,
  imagemin: {
    png: 3 /* Select an optimization level between 0 and 7. */,
    jpeg: 85 /* % of compression for jpg, jpeg images (default is 75) */,
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

const paths = {
  root: './',
}

basePaths.forEach((base) => {
  paths[base] = {
    base: `./${base}`,
  }

  folders.forEach((folderName) => {
    const toCamelCase = folderName.replace(/\b-([a-z])/g, (_, c) =>
      c.toUpperCase(),
    )

    paths[base][toCamelCase] = `./${base}/${folderName}`
  })
})

module.exports = {
  config,
  paths,
}
