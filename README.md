# WP Gulp Config

This WP Gulp boilerplate offers a solid and feature-rich foundation for developing modern and optimized [WordPress](https://br.wordpress.org/) themes. With support for SCSS, TypeScript, image optimization, live preview, and much more, it streamlines the development process and ensures high-quality results.

## Features

- **Gulp Configuration:** The `build.config.js` file allows you to customize options such as proxy, port, image optimization level, and base paths for folders.
- **SCSS Support:** Compile SCSS files using Sass and automatically adding vendor prefixes with [Autoprefixer](https://github.com/postcss/autoprefixer).
- **CSS Minification:** Minify CSS files with [CSSnano](https://github.com/cssnano/cssnano) to reduce the final file size.
- **CSS Comment Removal:** Remove unnecessary comments from CSS files for a cleaner production version.
- **TypeScript Support:** Compile TypeScript files using the `tsconfig.json` project and minify the resulting JavaScript with [gulp-terser](https://github.com/duan602728596/gulp-terser).
- **Image Optimization:** Optimize PNG, JPEG, and SVG images using the [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) plugin based on the settings defined in `build.config.js`.
- **Font and Third-Party Assets Copying:** Automatically copy fonts and third-party assets from SRC to the ASSETS folder.
- **Live Preview:** Launch a live preview with [BrowserSync](https://github.com/BrowserSync/browser-sync) using the proxy and port specified in `build.config.js`.
- **Automatic Reloading:** Automatically reload the browser preview whenever changes are made to files.
- **File Watching:** Watch for changes in PHP, SCSS, TypeScript, images, fonts, and third-party assets and trigger corresponding tasks to recompile and update files.
- **Folder Cleaning:** Clean the ASSETS folder before a new build for a clean process.
- **Production Bundle:** Create a production bundle by zipping specific files and folders for distribution.

## Boilerplate Structure:

The boilerplate has an organized structure that separates files and folders by functionality. The main folders include:

- `src`: Theme source code, including SCSS, TypeScript, image files, etc.
- `assets`: Compiled output of the build process, containing CSS, JavaScript, optimized images, fonts, and third-party assets.
- `build`: Configurations and scripts related to the Gulp build process.
- `inc`: Theme PHP files.
- `admin`: Files specific to the WordPress admin area.
- `template-parts`: Reusable template parts for the theme.

## Boilerplate Usage:

1. **Install the required dependencies:**
```sh
npm install
```
2. **Customize configuration:** Adjust the options in `build.config.js` according to your needs.
3. **Run the build:** Start the build process, live preview, and file watching for development:
```sh
npm run dev
```
4. **Production Bundle:** Generate build files for production server:
```sh
npm run prod
```

## Configuration
All configurations are found in `build.config.js` file in the root directory.

```js
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
```

## Contributing
This repository is currently under development. If you want to contribute please fork the repository and get your hands dirty, and make the changes as you'd like and submit the Pull request.
