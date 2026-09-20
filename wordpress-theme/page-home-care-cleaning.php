<?php
/**
 * Template Name: Home Care Cleaning Products (Right Choice)
 * Description: Consumer household hygiene formulations manufactured under the Right Choice entity.
 */
get_header(); ?>

<div class="w-full bg-[#f8f9ff] min-h-screen py-8 sm:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        
        <!-- Breadcrumb -->
        <div class="flex items-center space-x-2 text-xs text-slate-500 mb-6">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-[#00355f]">Home</a>
            <span>/</span>
            <span class="text-slate-500">Consumer Brands</span>
            <span>/</span>
            <span class="text-[#00355f] font-bold">Right Choice™ Home Care Cleaning Products</span>
        </div>

        <!-- Hero Section with Right Choice Logo Card -->
        <div class="bg-[#0A2540] rounded-3xl text-white p-6 sm:p-10 lg:p-12 mb-12 relative overflow-hidden shadow-lg border border-sky-950">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
                
                <div class="lg:col-span-8">
                    <div class="flex flex-wrap items-center gap-2 mb-4">
                        <span class="inline-flex items-center gap-1.5 bg-[#006e2d] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Right Choice™ Entity
                        </span>
                        <span class="inline-flex items-center gap-1.5 bg-white/10 text-sky-200 border border-white/15 px-3 py-1 rounded-full text-xs font-semibold">
                            Consumer Brand of Essendaar Suppliers
                        </span>
                    </div>

                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black font-headline tracking-tight leading-tight mb-4 text-white">
                        Home Care Cleaning Products
                    </h1>
                    
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl font-medium">
                        "Clean Homes. Healthy Lives." All household cleaning and hygiene formulations come under the official <strong>Right Choice</strong> entity. Formulated with skin-friendly actives, hospital-grade germ kill rates, and certified by Tamilnadu Test House for safe domestic use.
                    </p>

                    <div class="flex flex-wrap gap-3.5 mb-6">
                        <a href="<?php echo esc_url(home_url('/shop')); ?>" class="px-6 py-3 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md">
                            Shop Right Choice Products
                        </a>
                        <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm flex items-center gap-2 border border-white/20 transition-all">
                            Inquire for Dealership / Retail
                        </a>
                    </div>
                </div>

                <!-- Resized Right Choice Logo Card -->
                <div class="lg:col-span-4 flex justify-center">
                    <div class="w-full max-w-xs sm:max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-white/40 text-slate-900 flex flex-col items-center text-center relative">
                        <div class="w-full h-36 sm:h-40 flex items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-100 mb-4">
                            <img 
                                src="<?php echo esc_url(home_url('/right-choice-logo.png')); ?>" 
                                alt="Right Choice Official Logo" 
                                class="max-h-32 sm:max-h-36 w-auto object-contain"
                            />
                        </div>
                        <h2 class="font-black text-lg text-[#0A2540]">Right Choice™</h2>
                        <p class="text-xs text-emerald-700 font-bold">Consumer Hygiene &amp; Domestic Formulations</p>
                        <p class="text-[11px] text-slate-500 pt-1">The consumer packaged goods division of Essendaar Suppliers &amp; Facility Care.</p>
                    </div>
                </div>

            </div>
        </div>

        <!-- 4 Flagship Lines -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-[#00355f] uppercase tracking-wider">Fabric Care</span>
                <h3 class="text-lg font-bold text-[#0A2540] mt-1 mb-2">BOZZ Laundry Range</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Enzymatic liquid detergent and fabric conditioner ensuring pristine fabric fibers and long-lasting freshness.</p>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-amber-700 uppercase tracking-wider">Kitchen Care</span>
                <h3 class="text-lg font-bold text-[#0A2540] mt-1 mb-2">MORNING SHINE</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Concentrated lemon &amp; lime dishwash liquid and anti-sog grease bars for sparkling, residue-free cookware.</p>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-700 uppercase tracking-wider">Floor &amp; Surfaces</span>
                <h3 class="text-lg font-bold text-[#0A2540] mt-1 mb-2">SKY FRESH Surface</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Natural pine floor cleaners and crystal streak-free glass spray for 99.9% germ-free living spaces.</p>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-rose-700 uppercase tracking-wider">Sanitation</span>
                <h3 class="text-lg font-bold text-[#0A2540] mt-1 mb-2">POWER RIDE Hygiene</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Thick clinging disinfectant gel removing stubborn mineral limescale and eliminating bathroom pathogens.</p>
            </div>
        </div>

    </div>
</div>

<?php get_footer(); ?>
