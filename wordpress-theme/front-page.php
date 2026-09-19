<?php
/**
 * Template Name: Front Page (Essendaar Suppliers & Facility Care)
 * Description: Homepage template featuring hero section, service pillars, product categories, WooCommerce featured products, and certifications.
 */
get_header(); 
$theme_uri = get_template_directory_uri();
$photo_url = file_exists(get_template_directory() . '/images/siva-krishnan.jpg') ? $theme_uri . '/images/siva-krishnan.jpg' : home_url('/assets/siva-krishnan.jpg');
?>

<div class="w-full bg-[#f8f9ff] min-h-screen">
    
    <!-- Hero Section -->
    <section class="bg-[#0A2540] text-white py-12 lg:py-16 relative overflow-hidden border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div class="lg:col-span-7">
                    <div class="flex items-center gap-2 mb-4">
                        <span class="bg-[#006e2d] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                            ISO 9001:2015 Certified
                        </span>
                        <span class="bg-white/10 text-slate-300 px-3 py-1 rounded-full text-xs font-semibold border border-white/10">
                            Est. June 2021 • Chennai
                        </span>
                    </div>

                    <h1 class="text-3xl sm:text-5xl font-black font-headline tracking-tight leading-tight mb-3">
                        Clean Solutions. <br/>
                        <span class="text-emerald-400">Reliable Services.</span>
                    </h1>

                    <p class="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                        Chennai's trusted single-source partner for direct factory cleaning chemicals, turnkey facility management, and background-verified manpower.
                    </p>

                    <div class="flex flex-wrap gap-3 mb-8">
                        <a href="<?php echo esc_url(function_exists('wc_get_page_id') && wc_get_page_id('shop') > 0 ? get_permalink(wc_get_page_id('shop')) : home_url('/shop')); ?>" class="px-6 py-3.5 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2">
                            <span>Browse Products</span>
                            <span>→</span>
                        </a>
                        <a href="<?php echo esc_url(home_url('/facility-management')); ?>" class="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider border border-white/20 transition-all flex items-center gap-2">
                            <span>Facility Audit RFP</span>
                        </a>
                    </div>

                    <!-- Key Trust Factors -->
                    <div class="grid grid-cols-3 gap-3 border-t border-slate-700/80 pt-6 max-w-lg">
                        <div>
                            <div class="text-base font-black font-headline text-emerald-400">ISO 9001</div>
                            <div class="text-[11px] text-slate-300">Certified Quality</div>
                        </div>
                        <div>
                            <div class="text-base font-black font-headline text-sky-400">Lab Tested</div>
                            <div class="text-[11px] text-slate-300">Biocompatible Safe</div>
                        </div>
                        <div>
                            <div class="text-base font-black font-headline text-amber-400">100% Vetted</div>
                            <div class="text-[11px] text-slate-300">Trained Manpower</div>
                        </div>
                    </div>
                </div>

                <!-- Hero Right Card (Brand Banner) -->
                <div class="lg:col-span-5 flex justify-center">
                    <div class="bg-gradient-to-br from-[#00355f] to-[#0A2540] rounded-3xl p-6 border-2 border-emerald-500/40 shadow-2xl text-white w-full max-w-md">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-[11px] font-mono uppercase tracking-widest text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">Direct Factory Fulfillment</span>
                            <span class="text-xs font-bold text-slate-300">Chennai, TN</span>
                        </div>

                        <div class="bg-white text-slate-900 rounded-2xl p-4 shadow-sm mb-4">
                            <h3 class="font-headline font-black text-sm text-[#0A2540] mb-1">Morning Shine &amp; Care &amp; Clean</h3>
                            <p class="text-xs text-slate-600 leading-snug">Formulated for schools, hospitals, commercial complexes, and domestic deep cleaning.</p>
                            <div class="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs">
                                <span class="font-bold text-[#006e2d]">Wholesale Tier Available</span>
                                <span class="bg-emerald-50 text-[#006e2d] font-bold px-2 py-0.5 rounded text-[10px]">18% GST Credit</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-2 text-xs">
                            <a href="tel:+919787979757" class="py-2.5 px-3 bg-[#006e2d] hover:bg-[#14532D] rounded-xl text-center font-bold text-white transition-colors">
                                📞 Call Factory
                            </a>
                            <a href="<?php echo esc_url(home_url('/contact')); ?>" class="py-2.5 px-3 bg-white/10 hover:bg-white/20 rounded-xl text-center font-bold text-white transition-colors border border-white/20">
                                📋 Get Quote
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 4 Core Verticals Grid -->
    <section class="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-xs font-bold uppercase tracking-widest text-[#006e2d]">What We Do</span>
            <h2 class="text-2xl sm:text-3xl font-black font-headline text-[#0A2540] mt-1 mb-2">Complete Facility &amp; Supply Solutions</h2>
            <p class="text-xs sm:text-sm text-slate-600">Explore our four specialized service divisions</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <!-- Pillar 1 -->
            <a href="<?php echo esc_url(function_exists('wc_get_page_id') && wc_get_page_id('shop') > 0 ? get_permalink(wc_get_page_id('shop')) : home_url('/shop')); ?>" class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all group">
                <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-[#006e2d] text-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">🧪</div>
                <h3 class="font-bold text-[#0A2540] text-base font-headline mb-2">Chemical Manufacturing</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-4">Certified floor cleaners, dishwash concentrates, restroom sanitizers, and bio-enzymes.</p>
                <span class="text-xs font-bold text-[#006e2d] flex items-center gap-1">Shop Products →</span>
            </a>

            <!-- Pillar 2 -->
            <a href="<?php echo esc_url(home_url('/facility-management')); ?>" class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all group">
                <div class="w-12 h-12 rounded-2xl bg-sky-50 text-[#00355f] text-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">🏢</div>
                <h3 class="font-bold text-[#0A2540] text-base font-headline mb-2">Facility Management</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-4">Turnkey mechanized deep cleaning, floor crystallization, and hygiene audits.</p>
                <span class="text-xs font-bold text-[#00355f] flex items-center gap-1">Facility Services →</span>
            </a>

            <!-- Pillar 3 -->
            <a href="<?php echo esc_url(home_url('/manpower-support')); ?>" class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all group">
                <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 text-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">👥</div>
                <h3 class="font-bold text-[#0A2540] text-base font-headline mb-2">Manpower Support</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-4">100% background-verified housekeeping staff, supervisors, and school marshals.</p>
                <span class="text-xs font-bold text-amber-700 flex items-center gap-1">Hire Staff →</span>
            </a>

            <!-- Pillar 4 -->
            <a href="<?php echo esc_url(home_url('/institutional-supplies')); ?>" class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all group">
                <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 text-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">📦</div>
                <h3 class="font-bold text-[#0A2540] text-base font-headline mb-2">Institutional Supplies</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-4">Heavy-duty janitorial carts, dispensers, microfiber mops, PPE, and consumables.</p>
                <span class="text-xs font-bold text-indigo-700 flex items-center gap-1">View Supplies →</span>
            </a>
        </div>
    </section>

    <!-- Featured WooCommerce Products -->
    <?php if (class_exists('WooCommerce')) : ?>
        <section class="py-12 bg-white border-y border-slate-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <span class="text-xs font-bold uppercase tracking-widest text-[#006e2d]">Direct Catalog</span>
                        <h2 class="text-2xl sm:text-3xl font-black font-headline text-[#0A2540]">Featured Cleaning Formulations</h2>
                    </div>
                    <a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop'))); ?>" class="text-xs font-bold text-[#00355f] hover:underline">
                        View All Products (<?php echo esc_html(wp_count_posts('product')->publish); ?>) →
                    </a>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <?php
                    $args = array(
                        'post_type'      => 'product',
                        'posts_per_page' => 8,
                        'orderby'        => 'date',
                        'order'          => 'DESC',
                    );
                    $loop = new WP_Query($args);
                    if ($loop->have_posts()) :
                        while ($loop->have_posts()) : $loop->the_post();
                            global $product;
                            ?>
                            <div class="bg-[#f8f9ff] rounded-2xl p-4 border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <div class="aspect-square bg-white rounded-xl overflow-hidden mb-3 flex items-center justify-center p-2">
                                        <?php if (has_post_thumbnail()) : ?>
                                            <?php the_post_thumbnail('medium', array('class' => 'w-full h-full object-contain')); ?>
                                        <?php else : ?>
                                            <div class="text-slate-400 text-3xl">🧴</div>
                                        <?php endif; ?>
                                    </div>
                                    <h4 class="font-headline font-bold text-sm text-[#0A2540] mb-1">
                                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h4>
                                    <div class="text-xs text-slate-500 mb-2">
                                        <?php echo wc_get_product_category_list($product->get_id(), ', '); ?>
                                    </div>
                                </div>
                                <div class="pt-3 border-t border-slate-200 flex items-center justify-between">
                                    <div class="font-headline font-black text-sm text-[#006e2d]">
                                        <?php echo $product->get_price_html(); ?>
                                    </div>
                                    <a href="<?php the_permalink(); ?>" class="px-3 py-1.5 bg-[#00355f] hover:bg-[#0A2540] text-white text-xs font-bold rounded-lg transition-colors">
                                        View Details
                                    </a>
                                </div>
                            </div>
                            <?php
                        endwhile;
                        wp_reset_postdata();
                    else :
                        echo '<p class="text-slate-500 text-xs">No products found. Please run import-products-auto.php in cPanel to seed products.</p>';
                    endif;
                    ?>
                </div>
            </div>
        </section>
    <?php endif; ?>

    <!-- Wholesale & GSTIN Bar -->
    <section class="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div class="bg-gradient-to-r from-[#0A2540] via-[#00355f] to-[#0A2540] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div>
                <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">B2B Wholesale Program</span>
                <h3 class="text-xl sm:text-2xl font-black font-headline mt-1 mb-2">Direct Bulk Procurement with 18% GST Input Credit</h3>
                <p class="text-xs sm:text-sm text-slate-300 max-w-xl">
                    Exclusive wholesale volume tiers for schools, hostels, hospitals, facility managers, and commercial cleaning contractors across Tamil Nadu.
                </p>
            </div>
            <div class="flex flex-wrap gap-3">
                <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-5 py-3 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md">
                    Request B2B Quote
                </a>
                <a href="tel:+919787979757" class="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider border border-white/20 transition-all">
                    📞 +91 97879 79757
                </a>
            </div>
        </div>
    </section>

</div>

<?php get_footer(); ?>
