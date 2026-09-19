<?php
/**
 * Template Name: Facility Management (Essendaar Suppliers)
 * Description: Specialized page for Turnkey Facility Management & Mechanized Sanitization.
 */
get_header(); ?>

<div class="w-full bg-[#f8f9ff] min-h-screen py-8 sm:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div class="flex items-center space-x-2 text-xs text-slate-500 mb-6">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-[#00355f]">Home</a>
            <span>/</span>
            <span class="text-[#00355f] font-bold">Facility Management</span>
        </div>

        <div class="bg-[#0A2540] rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl border border-slate-700/60">
            <span class="bg-[#00355f] text-sky-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                Turnkey Operations &amp; Mechanized Hygiene
            </span>
            <h1 class="text-3xl sm:text-5xl font-black font-headline tracking-tight leading-tight mb-4">
                Facility Care &amp; Maintenance
            </h1>
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
                End-to-end mechanized deep cleaning, floor scrubbing, hygiene protocol enforcement, and waste management for schools, hospitals, IT parks, and residential complexes across Chennai.
            </p>
            <div class="flex flex-wrap gap-3">
                <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-6 py-3 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md">
                    Schedule Facility Audit
                </a>
                <a href="tel:+919787979757" class="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider border border-white/20 transition-all">
                    📞 Direct Hotline: +91 97879 79757
                </a>
            </div>
        </div>

        <!-- Scope & Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
                <div class="text-3xl mb-3">🧼</div>
                <h3 class="text-lg font-black font-headline text-[#0A2540] mb-2">Daily Routine Housekeeping</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Continuous sanitization of high-touch surfaces, restrooms, cafeterias, and lobbies with certified bio-degradable formulations.</p>
            </div>
            <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
                <div class="text-3xl mb-3">⚙️</div>
                <h3 class="text-lg font-black font-headline text-[#0A2540] mb-2">Mechanized Floor Scrubbing</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Single-disc scrubbing, wet vacuuming, and epoxy/granite floor crystallization for high-footfall corridors.</p>
            </div>
            <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
                <div class="text-3xl mb-3">🧪</div>
                <h3 class="text-lg font-black font-headline text-[#0A2540] mb-2">Restroom Deep Descaling</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Heavy-duty limescale removal, uratic salt elimination, bio-enzymatic drain maintenance, and fragrance diffusion.</p>
            </div>
        </div>

    </div>
</div>

<?php get_footer(); ?>
