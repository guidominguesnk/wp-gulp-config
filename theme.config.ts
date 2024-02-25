/**
 * @package WP Gulp Config
 * @author Gui Domingues <hello@guidomingues.com>
 * @link https://github.com/guidominguesnk/wp-gulp-config
 */

interface IConfig {
  proxy: string
  port: number
  imagemin: {
    png: number
    jpeg: number
  }
}

/**
 * 1. Local development server URL.
 * 2. Default port.
 * 3. Select an optimization level between 0 and 7.
 * 4. % of compression for jpg, jpeg images (default is 75).
 */
const config: IConfig = {
  proxy: 'gulp.local' /* 1 */,
  port: 3333 /* 2 */,
  imagemin: {
    png: 3 /* 3 */,
    jpeg: 85 /* 4 */,
  },
}

/* Base folder paths. */
const basePaths: string[] = [
  'src',
  'assets',
  'build',
  'inc',
  'admin',
  'template-parts',
]

/* Folder assets paths. */
const folders: string[] = [
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

interface IPaths {
  root: string
  [key: string]: string | Record<string, string | undefined>
}

const paths: IPaths = {
  root: './',
}

basePaths.forEach((base) => {
  if (!paths[base]) {
    paths[base as keyof IPaths] = {
      base: `./${base}`,
    }
  }

  const currentBase = paths[base]

  if (typeof currentBase !== 'object') {
    console.error(`Error: base '${base}' is not an object!`)
    return
  }

  folders.forEach((folderName) => {
    const toCamelCase = folderName.replace(/\b-([a-z])/g, (_, c) =>
      c.toUpperCase(),
    )
    currentBase[toCamelCase] = `./${base}/${folderName}`
  })
})

export { config, paths }
