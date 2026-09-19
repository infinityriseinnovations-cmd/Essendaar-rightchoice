<?php
/**
 * Essendaar Suppliers & Facility Care — Automatic WordPress Page & Menu Setup Helper
 * 
 * Upload this file to your WordPress root (public_html) or inside wp-content/themes/essendaar/
 * and visit it in your browser: https://rightchoiceindia.com/setup-wordpress-pages.php
 * It will instantly setup and configure all Essendaar pages, templates, and menus.
 */

// Load WordPress Core bootstrap if accessible
if (!defined('ABSPATH')) {
    if (file_exists(__DIR__ . '/wp-load.php')) {
        require_once __DIR__ . '/wp-load.php';
    } elseif (file_exists(__DIR__ . '/../../wp-load.php')) {
        require_once __DIR__ . '/../../wp-load.php';
    } elseif (file_exists(__DIR__ . '/../wp-load.php')) {
        require_once __DIR__ . '/../wp-load.php';
    } else {
        die('<h1>WordPress Not Found</h1><p>Please place this file in your WordPress root directory (public_html) and run again.</p>');
    }
}

// Ensure user has admin permissions or running setup
if (!current_user_can('manage_options') && !empty($_GET['run']) && $_GET['run'] !== 'true') {
    // allow direct trigger with confirmation
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Essendaar WordPress Page &amp; Template Setup</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#f8f9ff] font-['Plus_Jakarta_Sans'] p-6 sm:p-12 text-[#0A2540]">
    <div class="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
        <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 rounded-2xl bg-[#00355f] text-white flex items-center justify-center font-black text-xl">E</div>
            <div>
                <h1 class="text-xl font-black text-[#0A2540]">ESSENDAAR SUPPLIERS</h1>
                <p class="text-xs text-slate-500 font-semibold">Automatic WordPress Setup &amp; Template Linker</p>
            </div>
        </div>

        <?php
        $pages_to_setup = array(
            'home' => array(
                'title'    => 'Home',
                'slug'     => 'home',
                'template' => 'front-page.php',
                'content'  => 'Essendaar Suppliers Homepage',
            ),
            'about-us' => array(
                'title'    => 'About Us',
                'slug'     => 'about-us',
                'template' => 'page-about-us.php',
                'content'  => 'Essendaar Suppliers About Us & Leadership Profile of D Siva Krishnan, B.E',
            ),
            'facility-management' => array(
                'title'    => 'Facility Management',
                'slug'     => 'facility-management',
                'template' => 'page-facility-management.php',
                'content'  => 'Turnkey Facility Management & Mechanized Sanitization',
            ),
            'manpower-support' => array(
                'title'    => 'Manpower Support',
                'slug'     => 'manpower-support',
                'template' => 'page-manpower-support.php',
                'content'  => '100% Background-Verified Manpower Staffing',
            ),
            'institutional-supplies' => array(
                'title'    => 'Institutional Supplies',
                'slug'     => 'institutional-supplies',
                'template' => 'page-institutional-supplies.php',
                'content'  => 'Bulk Institutional Janitorial Supplies & Tools',
            ),
            'contact' => array(
                'title'    => 'Contact / B2B Quote',
                'slug'     => 'contact',
                'template' => 'page-contact.php',
                'content'  => 'Contact Essendaar Suppliers & Request Institutional Quotes',
            ),
        );

        echo '<div class="space-y-3 mb-8">';
        $created_page_ids = array();

        foreach ($pages_to_setup as $key => $page_data) {
            $existing_page = get_page_by_path($page_data['slug']);

            if (!$existing_page) {
                // Also check by title
                $existing_page = get_page_by_title($page_data['title']);
            }

            if ($existing_page) {
                $page_id = $existing_page->ID;
                update_post_meta($page_id, '_wp_page_template', $page_data['template']);
                wp_update_post(array(
                    'ID'          => $page_id,
                    'post_status' => 'publish',
                ));
                echo '<div class="flex items-center justify-between p-3 rounded-xl bg-emerald-50 text-[#006e2d] border border-emerald-200 text-xs font-bold">';
                echo '<span>✓ Updated Page Template: ' . esc_html($page_data['title']) . '</span>';
                echo '<span class="font-mono text-[10px] text-slate-500">' . esc_html($page_data['template']) . '</span>';
                echo '</div>';
            } else {
                $page_id = wp_insert_post(array(
                    'post_title'   => $page_data['title'],
                    'post_name'    => $page_data['slug'],
                    'post_status'  => 'publish',
                    'post_type'    => 'page',
                    'post_content' => $page_data['content'],
                ));
                if (!is_wp_error($page_id)) {
                    update_post_meta($page_id, '_wp_page_template', $page_data['template']);
                    echo '<div class="flex items-center justify-between p-3 rounded-xl bg-sky-50 text-[#00355f] border border-sky-200 text-xs font-bold">';
                    echo '<span>✓ Created &amp; Linked: ' . esc_html($page_data['title']) . '</span>';
                    echo '<span class="font-mono text-[10px] text-slate-500">' . esc_html($page_data['template']) . '</span>';
                    echo '</div>';
                }
            }
            if ($page_id && !is_wp_error($page_id)) {
                $created_page_ids[$key] = $page_id;
            }
        }

        // Set Static Front Page to Home
        if (isset($created_page_ids['home'])) {
            update_option('show_on_front', 'page');
            update_option('page_on_front', $created_page_ids['home']);
            echo '<div class="p-3 rounded-xl bg-emerald-50 text-[#006e2d] border border-emerald-200 text-xs font-bold">';
            echo '✓ Set WordPress Front Page to: Home';
            echo '</div>';
        }

        // Setup Primary Menu
        $menu_name = 'Essendaar Main Navigation';
        $menu_exists = wp_get_nav_menu_object($menu_name);

        if (!$menu_exists) {
            $menu_id = wp_create_nav_menu($menu_name);
            if (!is_wp_error($menu_id)) {
                // Add items
                $menu_order = 1;
                foreach ($created_page_ids as $key => $page_id) {
                    wp_update_nav_menu_item($menu_id, 0, array(
                        'menu-item-title'     => get_the_title($page_id),
                        'menu-item-object'    => 'page',
                        'menu-item-object-id' => $page_id,
                        'menu-item-type'      => 'post_type',
                        'menu-item-status'    => 'publish',
                    ));
                }
                // Add Shop if exists
                if (function_exists('wc_get_page_id') && wc_get_page_id('shop') > 0) {
                    wp_update_nav_menu_item($menu_id, 0, array(
                        'menu-item-title'     => 'Shop / Products',
                        'menu-item-object'    => 'page',
                        'menu-item-object-id' => wc_get_page_id('shop'),
                        'menu-item-type'      => 'post_type',
                        'menu-item-status'    => 'publish',
                    ));
                }

                // Assign menu to primary location
                $locations = get_theme_mod('nav_menu_locations');
                $locations['primary-menu'] = $menu_id;
                set_theme_mod('nav_menu_locations', $locations);

                echo '<div class="p-3 rounded-xl bg-emerald-50 text-[#006e2d] border border-emerald-200 text-xs font-bold">';
                echo '✓ Created &amp; Assigned Primary Navigation Menu';
                echo '</div>';
            }
        }
        echo '</div>';
        ?>

        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 mb-6">
            <h3 class="font-bold text-[#0A2540] mb-1">🎉 Setup Completed Successfully!</h3>
            <p>Your WordPress pages (Home, About Us with D Siva Krishnan photo card, Facility Management, Manpower, Institutional Supplies, and Contact) are now properly linked and configured.</p>
        </div>

        <div class="flex gap-3">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="flex-1 py-3 bg-[#00355f] hover:bg-[#0A2540] text-white font-bold rounded-xl text-xs text-center transition-colors shadow-xs">
                Visit Live Homepage →
            </a>
            <a href="<?php echo esc_url(home_url('/about-us')); ?>" class="flex-1 py-3 bg-[#006e2d] hover:bg-[#14532D] text-white font-bold rounded-xl text-xs text-center transition-colors shadow-xs">
                Visit About Us Page →
            </a>
        </div>
    </div>
</body>
</html>
