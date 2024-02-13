<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WP Gulp Config
 * @author Gui Domingues <hello@guidomingues.com>
 * @link https://github.com/guidominguesnk/wp-gulp-config
 */

if (!defined('ABSPATH')) {
  exit(); /* Exit if accessed directly */
} ?>

<?php get_header(); ?>

<?php if (have_posts()):
  while (have_posts()):
    the_post(); ?>

<main>
  <h1>Hello World</h1>
</main>

<?php
  endwhile;
else:
endif; ?>

<?php get_footer(); ?>
