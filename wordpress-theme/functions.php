<?php
/**
 * Essendaar Suppliers & Facility Care - WordPress Theme Functions
 * Package: Essendaar
 * Version: 1.2.0
 * 
 * Fully compatible with WordPress 5.8 to 6.7+, WooCommerce, Elementor, and Contact Form 7.
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Theme Setup & Feature Registrations
 */
function essendaar_theme_setup() {
    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable Featured Images on Pages and Posts
    add_theme_support('post-thumbnails');

    // Custom Logo Support
    add_theme_support('custom-logo', array(
        'height'      => 60,
        'width'       => 240,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // Full WooCommerce Compatibility
    add_theme_support('woocommerce', array(
        'thumbnail_image_width' => 400,
        'single_image_width'    => 800,
        'product_grid'          => array(
            'default_rows'    => 4,
            'min_rows'        => 2,
            'max_rows'        => 12,
            'default_columns' => 4,
            'min_columns'     => 1,
            'max_columns'     => 6,
        ),
    ));
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');

    // Elementor & Block Editor Full-Width & Wide Alignments
    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');

    // Register Dynamic Navigation Menus for Appearance > Menus
    register_nav_menus(array(
        'primary-menu'   => esc_html__('Primary Navigation Bar (Header)', 'essendaar'),
        'top-bar-menu'   => esc_html__('Top Compliance Bar Menu', 'essendaar'),
        'footer-company' => esc_html__('Footer Company & About Menu', 'essendaar'),
        'footer-brands'  => esc_html__('Footer Product Lines Menu', 'essendaar'),
        'footer-services'=> esc_html__('Footer Facility Care Menu', 'essendaar'),
    ));

    // HTML5 standard markup
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));
}
add_action('after_setup_theme', 'essendaar_theme_setup');

/**
 * Enqueue Theme Scripts and Styles safely
 */
function essendaar_enqueue_assets() {
    // Google Fonts: Plus Jakarta Sans & Inter
    wp_enqueue_style('essendaar-fonts', 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap', array(), null);

    // Tailwind CSS Engine for modern responsive styling
    wp_enqueue_script('tailwindcss-cdn', 'https://cdn.tailwindcss.com', array(), '3.4.1', false);

    // Theme Main Stylesheet
    wp_enqueue_style('essendaar-main-style', get_stylesheet_uri(), array(), '1.2.0');
}
add_action('wp_enqueue_scripts', 'essendaar_enqueue_assets');

/**
 * Elementor Compatibility: Register Header and Footer Theme Locations
 */
function essendaar_register_elementor_locations($elementor_theme_manager) {
    $elementor_theme_manager->register_all_core_location();
}
add_action('elementor/theme/register_locations', 'essendaar_register_elementor_locations');

/**
 * WooCommerce Customization: Currency symbol to INR ₹
 */
add_filter('woocommerce_currency_symbol', function($currency_symbol, $currency) {
    if ($currency === 'INR') {
        return '₹';
    }
    return $currency_symbol;
}, 10, 2);

/**
 * WooCommerce B2B GSTIN Checkout Field (18% Input Credit)
 */
function essendaar_add_b2b_gstin_field($fields) {
    $fields['billing']['billing_company']['label'] = esc_html__('Institution / Business Name (Optional)', 'essendaar');
    $fields['billing']['billing_company']['placeholder'] = esc_html__('e.g. SVS Matriculation School / Tech Park', 'essendaar');

    $fields['billing']['billing_gstin'] = array(
        'type'        => 'text',
        'label'       => esc_html__('GSTIN (For 18% GST Input Credit Invoice)', 'essendaar'),
        'placeholder' => esc_html__('e.g. 33ABCDE1234F1Z5', 'essendaar'),
        'required'    => false,
        'class'       => array('form-row-wide'),
        'priority'    => 35,
    );
    return $fields;
}
add_filter('woocommerce_checkout_fields', 'essendaar_add_b2b_gstin_field');

/**
 * Save GSTIN to Order Meta
 */
function essendaar_save_gstin_order_meta($order_id) {
    if (!empty($_POST['billing_gstin'])) {
        update_post_meta($order_id, '_billing_gstin', sanitize_text_field($_POST['billing_gstin']));
    }
}
add_action('woocommerce_checkout_update_order_meta', 'essendaar_save_gstin_order_meta');

/**
 * Display GSTIN in Admin Order View
 */
function essendaar_show_gstin_admin_order($order) {
    $gstin = get_post_meta($order->get_id(), '_billing_gstin', true);
    if (!empty($gstin)) {
        echo '<p><strong>' . esc_html__('GSTIN / Tax ID:', 'essendaar') . '</strong> <span style="font-family:monospace; background:#eff4ff; color:#00355f; padding:2px 8px; border-radius:4px; font-weight:bold;">' . esc_html($gstin) . '</span></p>';
    }
}
add_action('woocommerce_admin_order_data_after_billing_address', 'essendaar_show_gstin_admin_order', 10, 1);

/**
 * Clean Fallback Menu when no menu is assigned yet in Appearance > Menus
 */
function essendaar_default_navigation_menu() {
    $home_url = esc_url(home_url('/'));
    $shop_url = function_exists('wc_get_page_id') && wc_get_page_id('shop') > 0 ? esc_url(get_permalink(wc_get_page_id('shop'))) : esc_url(home_url('/shop'));
    
    echo '<ul class="flex flex-wrap items-center space-x-6 text-xs font-bold text-slate-700 font-headline">';
    echo '<li><a href="' . $home_url . '" class="hover:text-[#00355f] transition-colors">' . esc_html__('Home', 'essendaar') . '</a></li>';
    echo '<li><a href="' . $shop_url . '" class="hover:text-[#00355f] transition-colors">' . esc_html__('Shop / Products', 'essendaar') . '</a></li>';
    echo '<li><a href="' . esc_url(home_url('/facility-management')) . '" class="hover:text-[#00355f] transition-colors">' . esc_html__('Facility Management', 'essendaar') . '</a></li>';
    echo '<li><a href="' . esc_url(home_url('/manpower-support')) . '" class="hover:text-[#00355f] transition-colors">' . esc_html__('Manpower Support', 'essendaar') . '</a></li>';
    echo '<li><a href="' . esc_url(home_url('/institutional-supplies')) . '" class="hover:text-[#00355f] transition-colors">' . esc_html__('Institutional Supplies', 'essendaar') . '</a></li>';
    echo '<li><a href="' . esc_url(home_url('/about-us')) . '" class="hover:text-[#00355f] transition-colors">' . esc_html__('About Us', 'essendaar') . '</a></li>';
    echo '<li><a href="' . esc_url(home_url('/contact')) . '" class="hover:text-[#00355f] transition-colors">' . esc_html__('Contact / B2B Quote', 'essendaar') . '</a></li>';
    echo '</ul>';
}
