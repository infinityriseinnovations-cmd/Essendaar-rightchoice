<?php
/**
 * Template Name: Institutional Supplies (Essendaar Suppliers)
 * Description: Bulk janitorial accessories, dispensers, PPE, and tools.
 */
get_header(); ?>

<div class="w-full bg-[#f8f9ff] min-h-screen py-8 sm:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div class="flex items-center space-x-2 text-xs text-slate-500 mb-6">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-[#00355f]">Home</a>
            <span>/</span>
            <span class="text-[#00355f] font-bold">Institutional Supplies</span>
        </div>

        <div class="bg-[#0A2540] rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl border border-slate-700/60">
            <span class="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                Single-Invoice Procurement
            </span>
            <h1 class="text-3xl sm:text-5xl font-black font-headline tracking-tight leading-tight mb-4">
                Institutional &amp; Facility Supplies
            </h1>
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
                Direct wholesale supply of heavy-duty janitorial trolleys, automatic dispensers, microfiber mops, safety signage, and facility consumables.
            </p>
            <div class="flex flex-wrap gap-3">
                <a href="<?php echo esc_url(home_url('/contact')); ?>" class="px-6 py-3 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md">
                    Request Institutional Rate Card
                </a>
                <a href="tel:+919787979757" class="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider border border-white/20 transition-all">
                    📞 Call +91 97879 79757
                </a>
            </div>
        </div>

    </div>
</div>

<?php get_footer(); ?>
