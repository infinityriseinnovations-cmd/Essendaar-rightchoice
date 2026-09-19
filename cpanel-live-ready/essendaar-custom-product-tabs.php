<?php
/**
 * Plugin Name: Essendaar Product Custom Meta Boxes (Directions & Safety)
 * Plugin URI: https://rightchoiceindia.com
 * Description: Adds "Directions & Dilution" and "Safety Data & Ingredients" rich text boxes to the WooCommerce Edit Product page, directly beneath the Short Description.
 * Version: 1.0.0
 * Author: Essendaar Suppliers & Facility Care
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * 1. Register custom meta fields for REST API and Block Editor
 */
add_action('init', 'essendaar_register_product_meta_fields');
function essendaar_register_product_meta_fields() {
    register_post_meta('product', 'directions_and_dilution', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ));

    register_post_meta('product', 'safety_data_ingredients', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ));
}

/**
 * 2. Add the Meta Boxes to the Edit Product screen
 */
add_action('add_meta_boxes', 'essendaar_add_product_tabs_meta_boxes', 40);
function essendaar_add_product_tabs_meta_boxes() {
    add_meta_box(
        'essendaar_directions_meta_box',
        '💧 Directions & Dilution Instructions',
        'essendaar_render_directions_meta_box',
        'product',
        'normal',
        'default'
    );

    add_meta_box(
        'essendaar_safety_meta_box',
        '🛡️ Material Safety Data & Active Ingredients',
        'essendaar_render_safety_meta_box',
        'product',
        'normal',
        'default'
    );
}

/**
 * 3. Render "Directions & Dilution" WYSIWYG Editor
 */
function essendaar_render_directions_meta_box($post) {
    wp_nonce_field('essendaar_save_meta_data', 'essendaar_meta_nonce');
    $content = get_post_meta($post->ID, 'directions_and_dilution', true);
    if (empty($content)) {
        // Fallback check underscore version
        $content = get_post_meta($post->ID, '_directions_and_dilution', true);
    }

    echo '<p style="color:#64748b; font-size:13px; margin-bottom:8px;">Enter dosage, dilution ratios (e.g. 20ml per half bucket), and step-by-step cleaning instructions for this product.</p>';

    wp_editor($content, 'directions_and_dilution', array(
        'textarea_name' => 'directions_and_dilution',
        'textarea_rows' => 6,
        'media_buttons' => false,
        'teeny'         => false,
        'quicktags'     => true
    ));
}

/**
 * 4. Render "Safety Data & Ingredients" WYSIWYG Editor
 */
function essendaar_render_safety_meta_box($post) {
    $content = get_post_meta($post->ID, 'safety_data_ingredients', true);
    if (empty($content)) {
        // Fallback check underscore version
        $content = get_post_meta($post->ID, '_safety_data_ingredients', true);
    }

    echo '<p style="color:#64748b; font-size:13px; margin-bottom:8px;">Enter active chemical composition, plant surfactants, pH data, storage guidelines, and precautionary first-aid warnings.</p>';

    wp_editor($content, 'safety_data_ingredients', array(
        'textarea_name' => 'safety_data_ingredients',
        'textarea_rows' => 6,
        'media_buttons' => false,
        'teeny'         => false,
        'quicktags'     => true
    ));
}

/**
 * 5. Save the Meta Box Data when Product is Saved
 */
add_action('save_post_product', 'essendaar_save_product_custom_meta');
function essendaar_save_product_custom_meta($post_id) {
    if (!isset($_POST['essendaar_meta_nonce']) || !wp_verify_nonce($_POST['essendaar_meta_nonce'], 'essendaar_save_meta_data')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // Save Directions & Dilution
    if (isset($_POST['directions_and_dilution'])) {
        $clean_directions = wp_kses_post($_POST['directions_and_dilution']);
        update_post_meta($post_id, 'directions_and_dilution', $clean_directions);
        update_post_meta($post_id, '_directions_and_dilution', $clean_directions);
    }

    // Save Safety Data & Ingredients
    if (isset($_POST['safety_data_ingredients'])) {
        $clean_safety = wp_kses_post($_POST['safety_data_ingredients']);
        update_post_meta($post_id, 'safety_data_ingredients', $clean_safety);
        update_post_meta($post_id, '_safety_data_ingredients', $clean_safety);
    }
}

/**
 * 6. Expose in WooCommerce REST API Responses automatically
 */
add_filter('woocommerce_rest_prepare_product_object', 'essendaar_expose_meta_in_wc_rest', 10, 3);
add_filter('rest_prepare_product', 'essendaar_expose_meta_in_wc_rest', 10, 3);
function essendaar_expose_meta_in_wc_rest($response, $object, $request) {
    $product_id = is_object($object) && method_exists($object, 'get_id') ? $object->get_id() : (isset($object->ID) ? $object->ID : 0);
    
    if ($product_id) {
        $directions = get_post_meta($product_id, 'directions_and_dilution', true);
        $safety = get_post_meta($product_id, 'safety_data_ingredients', true);

        $response->data['directions_and_dilution'] = $directions;
        $response->data['safety_data_ingredients'] = $safety;
    }
    return $response;
}
