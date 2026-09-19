<?php
/**
 * WooCommerce Global Layout Wrapper
 */
get_header(); ?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 py-10">
    <div class="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xs">
        <?php woocommerce_content(); ?>
    </div>
</div>

<?php get_footer(); ?>
