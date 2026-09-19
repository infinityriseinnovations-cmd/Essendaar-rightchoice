<?php
/**
 * Standard Page Template (Supports Elementor & Gutenberg)
 */
get_header(); ?>

<div class="w-full">
    <?php while (have_posts()) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <div class="entry-content">
                <?php the_content(); ?>
            </div>
        </article>
    <?php endwhile; ?>
</div>

<?php get_footer(); ?>
