<?php
/**
 * Main Template File
 */
get_header(); ?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white p-8 rounded-3xl border border-slate-200 shadow-xs prose max-w-none'); ?>>
            <h1 class="text-3xl font-headline font-bold text-[#0A2540] mb-4"><?php the_title(); ?></h1>
            <div class="text-slate-700 leading-relaxed">
                <?php the_content(); ?>
            </div>
        </article>
    <?php endwhile; endif; ?>
</div>

<?php get_footer(); ?>
