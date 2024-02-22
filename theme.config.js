"use strict";
/**
 * @package WP Gulp Config
 * @author Gui Domingues <hello@guidomingues.com>
 * @link https://github.com/guidominguesnk/wp-gulp-config
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.paths = exports.config = void 0;
/**
 * 1. Local development server URL.
 * 2. Default port.
 * 3. Select an optimization level between 0 and 7.
 * 4. % of compression for jpg, jpeg images (default is 75).
 */
var config = {
    proxy: 'gullp.local' /* 1 */,
    port: 3333 /* 2 */,
    imagemin: {
        png: 3 /* 3 */,
        jpeg: 85 /* 4 */,
    },
};
exports.config = config;
/* Base folder paths. */
var basePaths = [
    'src',
    'assets',
    'build',
    'inc',
    'admin',
    'template-parts',
];
/* Folder assets paths. */
var folders = [
    'css',
    'scss',
    'styles',
    'fonts',
    'api',
    'img',
    'js',
    'scripts',
    'vendor',
];
var paths = {
    root: './',
};
exports.paths = paths;
basePaths.forEach(function (base) {
    if (!paths[base]) {
        paths[base] = {
            base: "./".concat(base),
        };
    }
    var currentBase = paths[base];
    if (typeof currentBase !== 'object') {
        console.error("Error: base '".concat(base, "' is not an object!"));
        return;
    }
    folders.forEach(function (folderName) {
        var toCamelCase = folderName.replace(/\b-([a-z])/g, function (_, c) {
            return c.toUpperCase();
        });
        currentBase[toCamelCase] = "./".concat(base, "/").concat(folderName);
    });
});
