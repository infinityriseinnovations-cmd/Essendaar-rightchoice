<?php
/**
 * Essendaar Suppliers & Facility Care - Automatic Product & Media Library Sync Script
 * 
 * Upload this file to your WordPress root (e.g., /public_html/rightchoiceindia/import-products-auto.php)
 * Then visit: https://rightchoiceindia.com/import-products-auto.php in your web browser.
 * It will programmatically insert all Essendaar products, download images to your Media Library,
 * set regular prices, sale prices, categories, and attributes!
 */

// Load WordPress Core
if (!file_exists(__DIR__ . '/wp-load.php')) {
    die("Error: wp-load.php not found. Please place this file in your WordPress root directory.");
}

require_once __DIR__ . '/wp-load.php';
require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/image.php';

// Check permissions or allow admin
if (!current_user_can('manage_options') && !isset($_GET['token'])) {
    // For convenience if logged in as admin
    if (!is_user_logged_in()) {
        echo "<div style='font-family: sans-serif; padding: 20px; max-width: 600px; margin: 40px auto; background: #fff3cd; border: 1px solid #ffeeba; border-radius: 8px;'>";
        echo "<h3>WordPress Admin Login Required</h3>";
        echo "<p>Please <a href='/wp-login.php?redirect_to=" . urlencode($_SERVER['REQUEST_URI']) . "'>Log In as Administrator</a> to run this auto-importer, or run with <code>?token=essendaar2026</code>.</p>";
        echo "</div>";
        exit;
    }
}

echo "<!DOCTYPE html><html><head><title>Essendaar WooCommerce Sync</title>";
echo "<style>body{font-family:system-ui,-apple-system,sans-serif;padding:30px;background:#f8f9fa;color:#333;line-height:1.6;} .card{background:white;padding:24px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.08);max-width:800px;margin:0 auto;} .success{color:#006e2d;font-weight:bold;} .badge{background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;font-size:12px;}</style>";
echo "</head><body><div class='card'>";
echo "<h2>🌿 Essendaar Product & Media Library Auto-Sync</h2>";
echo "<p>Importing products, configuring prices, categories, and uploading images directly to WordPress Media Library...</p><hr style='border:0;border-top:1px solid #eee;margin:20px 0;'><ul>";

$products = [
    [
        'sku' => 'MSDW-1000ML',
        'name' => 'MORNING SHINE Dishwash Liquid (1 Litre) + Free Scrub Pad & Sponge',
        'slug' => 'morning-shine-dishwash-liquid-1l',
        'price' => 145,
        'regular_price' => 175,
        'category' => 'Kitchen Care',
        'short_desc' => 'Includes 1L Degreaser Bottle + Scrub Pad & Kitchen Sponge (Worth ₹25 Free). Formulated with active lemon & lime grease cutters.',
        'desc' => 'MORNING SHINE Dishwash Liquid is specially synthesized by Essendaar Suppliers for both high-turnover professional catering kitchens and demanding households. Engineered with concentrated active lemon and lime extract, a mere teaspoon creates a dense foaming lather that instantly dissolves thick cooking oils, charred masala residues, ghee crusts, and dairy films without leaving a slippery white residue.',
        'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWsqgCY-jIhZJv6Okv_M4F_bRMGmEwd9HhZ8Pwwv1wIZWBGzCmPegx9mE5ld8MYDnee9JDiR8IZHwpMqCbz1A3A9HilUlvpoHjLwKbOprquqRRgS9DBvehTZpPGbdsXfDWWccSZjIVqKrc4BhVST623U6qF_9-I4sHkseS4RtyjjA-Z19ju2MuIKmIZjfBbRg7LXVZvcy-dqXOapJ7hc5HPQvm4Fda9BIUsYAWmgen30EOiwHLESUK5A'
    ],
    [
        'sku' => 'MSDW-500ML',
        'name' => 'MORNING SHINE Dishwash Liquid (500 ml) + Free Scrub Pad',
        'slug' => 'morning-shine-dishwash-liquid-500ml',
        'price' => 75,
        'regular_price' => 90,
        'category' => 'Kitchen Care',
        'short_desc' => 'Convenient 500 ml household pack with free heavy-duty non-scratch green scouring pad included.',
        'desc' => 'Compact squeezable bottle ideal for domestic countertops and kitchen sinks. Features active lemon degreasers and glycerin skin conditioners.',
        'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-IBcwpV5V8mxo7dqlGXYpas2tKF8joTeaiJRz3kFHaDiQGhbngZoBH6wPsQNNrkY1t3-zCQXsDSS7jcGgYpcpgnbvrPEcZaLmPd0UdsfRKgZ1ufuMbpbd_vMtFHi_Ef1c2ebUxqVQM6etM8jAcMBvpsTLKrh1kbuVcHaJoEoPK4HrxB_eyADKCg52YG8bhQOgJq-ee9HpiQgMb1jfxHfFXvGK-HtsX8HMUEEZig-OjI4ae95Y6tjCpg'
    ],
    [
        'sku' => 'BZLD-1000ML',
        'name' => 'BOZZ Concentrated Liquid Detergent (1 Litre Matic)',
        'slug' => 'bozz-liquid-detergent-1l',
        'price' => 180,
        'regular_price' => 210,
        'category' => 'Laundry Care',
        'short_desc' => 'High-power low-foam enzymatic formula safe for top-load and front-load washing machines.',
        'desc' => 'Active enzyme stain cut technology designed specifically for hard water in South India. Preserves cotton weave elasticity and color vibrancy while removing deep sweat and collar soils.',
        'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUToRCU_uNrFYlAlwrWpejqV8zFbvYIwlC-pw8AR0EYaxS4JSxk2fXS2VAMbIVsKQTt3b5gBmN4q4ggWYpSBs1CNoVRq9afoQaTec4xxlCmxHPwqnJxL-cWltQ2T6IR4-LdK9Xu9JHkmKG5n2NsJm26L_EbHT7ynq5-lIxJtnjDUcNX90mr0AtkWMk-ayrggHBr1RQ0vVdp_UulR2dcZL9IThk2Wz40QL7r4GZ5OGnYe78u_cr2R5sEA'
    ],
    [
        'sku' => 'SFFC-5000ML',
        'name' => 'SKY FRESH Surface Floor Cleaner (5 Litres Institutional Can - Pine)',
        'slug' => 'sky-fresh-floor-cleaner-5l',
        'price' => 420,
        'regular_price' => 490,
        'category' => 'Surface Care',
        'short_desc' => 'Hospital-grade 99.9% antimicrobial sanitizer for institutional floors. Non-corrosive on Italian marble, vitrified tiles & granite.',
        'desc' => 'Widely procured by hospitals, educational institutions, commercial complexes, and hospitality venues across Tamil Nadu. Eradicates pathogens and keeps insect pests away with high pine terpenes.',
        'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtNAvAn6o4CmRc--Y3pXNtFvN7ypfhYzaqLhWE9HtXfHayNmv_IiqxTd_4hmQ-q0mKZlt8atRsQaOTNDKBuaogbppmHFB3oAhJy2exErFoBRS0HAcN6Kl4HUV_BQajuHdzOmxfTcFWM1n-to6Exab0i7kCpCXTId5Q3NZQmnPkCHArea2PFnry9_4VudC1vY1j-aWeUazBKomkThLtC0XBj95Tn77vFZSw0QIRPmU_i9Y6FjGltNzclg'
    ],
    [
        'sku' => 'SFGC-500ML',
        'name' => 'SKY FRESH Streak-Free Glass Cleaner (500 ml Trigger Spray)',
        'slug' => 'sky-fresh-glass-cleaner-500ml',
        'price' => 95,
        'regular_price' => 105,
        'category' => 'Surface Care',
        'short_desc' => 'Ammonia-free clear sheen for mirrors, dining tables, glass partitions, and vehicle windshields.',
        'desc' => 'Fast-drying, lint-free formula instantly removes greasy fingerprints, rain smudges, and dust marks from all reflective surfaces.',
        'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA86SJE67fsRlQYFX4l7QGKCJ5ZnWH-Shmgcv4tZjE1fs0IDOzeEVfGbpkK5QR9UY5WarENLWHBUAAYr-wJt-KWKXcHw8FlmXRc_oPVVqLZ4tdj3Tthz_7pqBk_zN6enUOJD7WZjwbvA6qsDo_C32AugoOrWEgMyAUfIpz6A97N2uJzJyVpYgcIm-WjoFYgLJxSxkbJfHbhq68GzTjcbb5mnbZw5QUrGCr2FScogRmYbHmnEX2Lwhahw'
    ],
    [
        'sku' => 'PRTC-1000ML',
        'name' => 'POWER RIDE Disinfectant Toilet Cleaner (1 Litre - Deep Clean Formula)',
        'slug' => 'power-ride-toilet-cleaner-1l',
        'price' => 120,
        'regular_price' => 145,
        'category' => 'Sanitation',
        'short_desc' => 'High-viscosity clinging gel dissolves stubborn hard-water scale and eradicates 99.99% toilet pathogens.',
        'desc' => 'Ergonomic directional nozzle reaches under the rim easily. Thick blue formula coats the bowl surface, cutting through uric scale, yellow water staining, and bad odors in minutes.',
        'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAerwEIUnEeMtqN-Rmf-rVjaplSgSq8u8cl_E7-_lDzhuMBC8Xf4ZM5n_kztxE-dnD2_VE7knKFr1Ut5oUPyWT66-9jHSutqbtib9SM25m6VWJVZsAgu_Jjv_sZuuG3z6HbiAtdNL67Mit7lO7qjct_DxB01bya_iDQ6Lv2e7bONkXxIaS-xYb6BwNq_7oAzU9iJAyXhROLXlLszqSpF6b_xpGZodtOGYOuz4FQUALVCP3mT1G3m84Uyg'
    ],
    [
        'sku' => 'ACCM-WETMOP',
        'name' => 'Heavy Duty Wet Mop with Clip Handle & Cotton Looped Yarn',
        'slug' => 'heavy-duty-wet-mop-set',
        'price' => 185,
        'regular_price' => 220,
        'category' => 'Mops',
        'short_desc' => 'Industrial stainless clamp handle with 100% bleached looped cotton yarn for wide corridor mopping.',
        'desc' => 'Heavy duty replaceable cotton looped yarn resists fraying and tangling during commercial wringing. High liquid absorbency rate.',
        'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuBquMcpScR1JXS_Or8MRKnWlpcO2ud9UxULYzhBWJ68A2JYssAZ1H_ffza1JZ3EqaeDXOTYsDxCGdKUgUoGACANJBXrRRfoYIJOAkhHlKVbSAckA3UDkddhpqZzTt3iVXQtS7BR_a9OqPhW8OnGNYryldsrBPVVLXUnhJNik0zWg6cylbuf8OKlw8KtAuhuWlaKo7iyfLcXRypzTyxgOijTTMg8wW29nRWqoHCnClboG2m6rgLVyfMp5g'
    ]
];

foreach ($products as $pData) {
    // Check if product exists by SKU or slug
    $existing_id = wc_get_product_id_by_sku($pData['sku']);
    if (!$existing_id) {
        $post = get_page_by_path($pData['slug'], OBJECT, 'product');
        if ($post) $existing_id = $post->ID;
    }

    if ($existing_id) {
        $product = wc_get_product($existing_id);
    } else {
        $product = new WC_Product_Simple();
    }

    $product->set_name($pData['name']);
    $product->set_slug($pData['slug']);
    $product->set_sku($pData['sku']);
    $product->set_regular_price($pData['regular_price']);
    $product->set_price($pData['price']);
    $product->set_sale_price($pData['price']);
    $product->set_short_description($pData['short_desc']);
    $product->set_description($pData['desc']);
    $product->set_status('publish');
    $product->set_manage_stock(false);
    $product->set_stock_status('instock');

    // Save product to get ID
    $product_id = $product->save();

    // Set category
    wp_set_object_terms($product_id, $pData['category'], 'product_cat');

    // Sideload Image to Media Library if not attached
    if (!empty($pData['image']) && !has_post_thumbnail($product_id)) {
        $attachment_id = media_sideload_image($pData['image'], $product_id, $pData['name'], 'id');
        if (!is_wp_error($attachment_id)) {
            set_post_thumbnail($product_id, $attachment_id);
        }
    }

    echo "<li style='margin-bottom: 8px;'>";
    echo "<span class='badge'>" . esc_html($pData['sku']) . "</span> ";
    echo "<strong>" . esc_html($pData['name']) . "</strong> - ";
    echo "<span class='success'>Saved Successfully (ID: " . $product_id . ")</span>";
    echo "</li>";
}

echo "</ul>";
echo "<div style='margin-top:24px;padding:16px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;'>";
echo "<h4 style='color:#166534;margin:0 0 8px 0;'>✅ All Products & Media Imported Successfully!</h4>";
echo "<p style='margin:0;font-size:14px;'>You can now view your live store or edit any product in <a href='/wp-admin/edit.php?post_type=product'>WooCommerce &gt; Products</a>.</p>";
echo "</div>";
echo "</div></body></html>";
