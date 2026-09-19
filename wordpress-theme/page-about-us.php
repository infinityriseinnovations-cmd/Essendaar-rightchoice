<?php
/**
 * Template Name: About Us (Essendaar Suppliers & Leadership)
 * Description: Dedicated rich About Us page for Essendaar Suppliers featuring D Siva Krishnan, B.E leadership card, ISO certifications, and 4 core verticals.
 */
get_header(); 

$theme_uri = get_template_directory_uri();
$photo_url = 'https://rightchoiceindia.com/wp-content/uploads/2026/09/siva-krishnan.jpg';
if (!file_exists(ABSPATH . 'wp-content/uploads/2026/09/siva-krishnan.jpg') && file_exists(get_template_directory() . '/images/siva-krishnan.jpg')) {
    $photo_url = $theme_uri . '/images/siva-krishnan.jpg';
}
?>

<div class="w-full bg-[#f8f9ff] min-h-screen py-8 sm:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        
        <!-- Breadcrumbs -->
        <div class="flex items-center space-x-2 text-xs text-slate-500 mb-6">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-[#00355f]">Home</a>
            <span>/</span>
            <span class="text-[#00355f] font-bold">About Us</span>
        </div>

        <!-- Hero Section with D Siva Krishnan, B.E Executive Card -->
        <div class="bg-[#0A2540] rounded-3xl text-white p-6 sm:p-10 lg:p-12 mb-12 relative overflow-hidden shadow-xl border border-slate-700/60">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
                
                <!-- Left Column (Company Overview & Contacts) -->
                <div class="lg:col-span-7 flex flex-col justify-between">
                    <div>
                        <div class="flex flex-wrap items-center gap-2 mb-4">
                            <span class="bg-[#006e2d] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                                <svg class="w-3.5 h-3.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                                <span>Est. June 2021 • Mangadu, Chennai</span>
                            </span>
                            <span class="bg-white/10 text-slate-300 px-3 py-1 rounded-full text-xs font-semibold border border-white/10">
                                ISO 9001:2015 Certified
                            </span>
                        </div>
                        
                        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black font-headline tracking-tight leading-tight mb-2">
                            ESSENDAAR SUPPLIERS
                        </h1>
                        <p class="text-emerald-400 font-headline font-bold text-base sm:text-xl tracking-wide mb-4">
                            Clean Solutions. Reliable Services.
                        </p>
                        
                        <p class="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                            ESSENDAAR SUPPLIERS is a premier manufacturer and integrated service partner founded in Mangadu, Chennai. We deliver certified Home Care Cleaning Formulations, Turnkey Facility Management, Vetted Manpower Support, and Institutional Supplies to homes, schools, hospitals, IT parks, and commercial complexes across Tamil Nadu.
                        </p>

                        <!-- Key Metrics -->
                        <div class="grid grid-cols-3 gap-3 mb-6 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                            <div>
                                <div class="text-base sm:text-lg font-black font-headline text-white">100%</div>
                                <div class="text-[10px] sm:text-[11px] text-slate-300">Lab Tested Formulations</div>
                            </div>
                            <div class="border-x border-white/10">
                                <div class="text-base sm:text-lg font-black font-headline text-emerald-400">4 Core</div>
                                <div class="text-[10px] sm:text-[11px] text-slate-300">Business Verticals</div>
                            </div>
                            <div>
                                <div class="text-base sm:text-lg font-black font-headline text-amber-400">1000+</div>
                                <div class="text-[10px] sm:text-[11px] text-slate-300">Trusted Clients</div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Contact Bar -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-slate-700/80 text-xs">
                        <a href="tel:+919787979757" class="flex items-center gap-2 text-slate-300 hover:text-white transition-colors bg-white/5 p-2 rounded-xl border border-white/5">
                            <span class="text-emerald-400">📞</span>
                            <span class="font-semibold">+91 97879 79757</span>
                        </a>
                        <a href="mailto:essendaargroup@gmail.com" class="flex items-center gap-2 text-slate-300 hover:text-white transition-colors bg-white/5 p-2 rounded-xl border border-white/5">
                            <span class="text-sky-400">✉️</span>
                            <span class="truncate">essendaargroup@gmail.com</span>
                        </a>
                        <div class="flex items-center gap-2 text-slate-300 bg-white/5 p-2 rounded-xl border border-white/5">
                            <span class="text-amber-400">📍</span>
                            <span class="truncate">Mangadu, Chennai, TN</span>
                        </div>
                        <div class="flex items-center gap-2 text-slate-300 bg-white/5 p-2 rounded-xl border border-white/5">
                            <span class="text-indigo-400">🌐</span>
                            <span class="truncate">www.rightchoiceindia.com</span>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Founder & Leadership Card (D Siva Krishnan, B.E) -->
                <div class="lg:col-span-5 flex justify-center lg:justify-end">
                    <div class="bg-white text-slate-900 rounded-2xl p-3.5 sm:p-4 shadow-xl border-2 border-amber-400/90 max-w-xs sm:max-w-sm w-full relative">
                        
                        <!-- Gold Rimmed Portrait Container -->
                        <div class="p-1 rounded-xl bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 shadow-xs">
                            <div class="relative overflow-hidden rounded-lg bg-slate-900 aspect-square w-full flex items-center justify-center">
                                <img
                                    src="<?php echo esc_url($photo_url); ?>"
                                    alt="D Siva Krishnan, B.E - Founder & Managing Director, Essendaar Suppliers"
                                    class="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                                />

                                <div class="absolute top-2 right-2 z-10">
                                    <span class="bg-[#006e2d] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 border border-white/20">
                                        ⭐ Founder &amp; MD
                                    </span>
                                </div>

                                <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent px-2.5 py-1.5 flex items-end justify-between">
                                    <span class="text-[9px] font-bold text-amber-300 tracking-wider uppercase font-mono">
                                        Essendaar Group
                                    </span>
                                    <span class="text-[9px] text-white/90 font-medium">
                                        Chennai, India
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Name Badge -->
                        <div class="bg-[#00355f] text-white py-1.5 px-2.5 rounded-lg text-center shadow-xs mt-2.5 flex items-center justify-center gap-1.5">
                            <span class="text-amber-400">🎓</span>
                            <h2 class="text-xs sm:text-sm font-black font-headline tracking-wide">
                                D Siva Krishnan, B.E
                            </h2>
                        </div>

                        <!-- Core Domains -->
                        <p class="text-[11px] font-bold text-center text-slate-700 mt-1.5 px-1 leading-snug">
                            Facility Management, Manufacturer and Distributor of Home Care Products.
                        </p>

                        <!-- Styled Graphical Accent Line with Orange Nodes -->
                        <div class="flex items-center justify-center my-2 px-3">
                            <span class="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 shadow-xs"></span>
                            <span class="h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 flex-1 mx-1.5"></span>
                            <span class="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 shadow-xs"></span>
                        </div>

                        <!-- Guiding Philosophy Motto -->
                        <div class="text-center px-1">
                            <p class="text-[11px] font-black text-slate-900 leading-snug font-headline">
                                Driving <span class="text-[#006e2d]">Clean</span> &amp; <span class="text-orange-600">Reliable Solutions</span>
                            </p>
                            <p class="text-[10px] font-semibold text-slate-600 mt-0.5 leading-tight">
                                for a Safer, Healthier &amp; Better Tomorrow.
                            </p>
                        </div>

                        <!-- Action Buttons -->
                        <div class="mt-2.5 pt-2 border-t border-slate-100 grid grid-cols-2 gap-1.5">
                            <a
                                href="tel:+919787979757"
                                class="py-1.5 px-2 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-lg text-[10px] font-bold text-center transition-colors flex items-center justify-center gap-1 shadow-xs"
                            >
                                <span>📞 Direct Call</span>
                            </a>
                            <a
                                href="https://wa.me/919787979757?text=Hello%20D%20Siva%20Krishnan,%20I%20would%20like%20to%20inquire%20about%20Essendaar%20Suppliers"
                                target="_blank"
                                rel="noreferrer"
                                class="py-1.5 px-2 bg-[#00355f] hover:bg-[#0A2540] text-white rounded-lg text-[10px] font-bold text-center transition-colors flex items-center justify-center gap-1 shadow-xs"
                            >
                                <span class="text-emerald-400">💬 WhatsApp</span>
                            </a>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <!-- Quality & Certification Badges -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs flex items-start gap-5">
                <div class="p-4 bg-emerald-50 text-[#006e2d] rounded-2xl shrink-0 text-3xl">
                    🏆
                </div>
                <div>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-[#006e2d] bg-emerald-50 px-2 py-0.5 rounded">
                        International Standard
                    </span>
                    <h3 class="text-lg font-black font-headline text-[#0A2540] mt-1.5 mb-2">
                        ISO 9001:2015 Certified Company
                    </h3>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Demonstrating strict commitment to structured quality management, consistent formulation safety, standardized operating procedures, and customer satisfaction benchmarks across manufacturing and facility care.
                    </p>
                </div>
            </div>

            <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs flex items-start gap-5">
                <div class="p-4 bg-sky-50 text-[#00355f] rounded-2xl shrink-0 text-3xl">
                    🧪
                </div>
                <div>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-[#00355f] bg-sky-50 px-2 py-0.5 rounded">
                        Laboratory Verified
                    </span>
                    <h3 class="text-lg font-black font-headline text-[#0A2540] mt-1.5 mb-2">
                        Tamilnadu Test House Certified
                    </h3>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        All cleaning formulations are rigorously tested and certified through Tamilnadu Test House Pvt. Ltd., verifying active-matter safety, high bactericidal efficacy, and skin-friendly biocompatibility.
                    </p>
                </div>
            </div>
        </div>

        <!-- 4 Core Business Verticals -->
        <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-xs font-bold uppercase tracking-widest text-[#006e2d]">Integrated Capabilities</span>
            <h2 class="text-2xl sm:text-3xl font-black font-headline text-[#0A2540] mt-1 mb-2">Four Pillars of Essendaar</h2>
            <p class="text-xs sm:text-sm text-slate-600">Complete institutional and domestic sanitation under one single trusted umbrella</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 text-[#006e2d] font-black flex items-center justify-center mb-4">1</div>
                <h3 class="font-bold text-[#0A2540] mb-2 text-base font-headline">Chemical Manufacturing</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Direct factory manufacturing of Morning Shine, Care & Clean, and Essendaar commercial hygiene lines.</p>
            </div>
            <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div class="w-10 h-10 rounded-xl bg-sky-50 text-[#00355f] font-black flex items-center justify-center mb-4">2</div>
                <h3 class="font-bold text-[#0A2540] mb-2 text-base font-headline">Facility Management</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Turnkey mechanized deep cleaning, floor crystallization, and hygiene maintenance for campuses.</p>
            </div>
            <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 font-black flex items-center justify-center mb-4">3</div>
                <h3 class="font-bold text-[#0A2540] mb-2 text-base font-headline">Manpower Support</h3>
                <p class="text-xs text-slate-600 leading-relaxed">100% background-verified housekeeping crews, supervisors, and school bus safety marshals.</p>
            </div>
            <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-black flex items-center justify-center mb-4">4</div>
                <h3 class="font-bold text-[#0A2540] mb-2 text-base font-headline">Institutional Supplies</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Single invoice procurement for heavy-duty tools, dispensers, PPE, and sports equipment.</p>
            </div>
        </div>

        <!-- Founder & Managing Director's Message -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-16 relative overflow-hidden">
            <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                <div class="shrink-0 flex flex-col items-center text-center">
                    <div class="p-1 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 shadow-sm w-28 sm:w-36">
                        <div class="rounded-xl overflow-hidden aspect-square bg-slate-900">
                            <img
                                src="<?php echo esc_url($photo_url); ?>"
                                alt="D Siva Krishnan, B.E - Founder & Managing Director"
                                class="w-full h-full object-cover object-center"
                            />
                        </div>
                    </div>
                    <h4 class="font-headline font-black text-xs sm:text-sm text-[#0A2540] mt-2.5">D Siva Krishnan, B.E</h4>
                    <p class="text-[10px] sm:text-[11px] font-bold text-[#006e2d]">Founder &amp; Managing Director</p>
                </div>

                <div class="flex-1">
                    <div class="flex items-center gap-2 text-amber-600 mb-2">
                        <span class="text-xl">“</span>
                        <span class="text-[11px] font-bold uppercase tracking-widest text-slate-500">Founder's Message &amp; Vision</span>
                    </div>
                    <h3 class="text-lg sm:text-xl font-black font-headline text-[#0A2540] mb-2.5">
                        "Driving Clean &amp; Reliable Solutions for a Safer, Healthier &amp; Better Tomorrow."
                    </h3>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3.5">
                        Since our inception in June 2021, Essendaar Suppliers has operated with a single guiding mission: to bring engineering precision, chemical reliability, and disciplined human execution to facility management and home care manufacturing. Whether delivering laboratory-tested cleaning formulations or deploying verified housekeeping personnel, we stand by uncompromising quality and customer trust across Chennai and Tamil Nadu.
                    </p>
                    <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold text-slate-700">
                        <span class="flex items-center gap-1.5 text-[#006e2d] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 text-[11px]">
                            <span>✓ ISO 9001:2015 Process Standards</span>
                        </span>
                        <span class="flex items-center gap-1.5 text-[#00355f] bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200 text-[11px]">
                            <span>✓ Tamilnadu Test House Certified</span>
                        </span>
                        <span class="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 text-[11px]">
                            <span>✓ 100% Vetted Manpower</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Direct Contact Banner -->
        <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#006e2d]">Direct Factory &amp; Operations Desk</span>
                <h3 class="text-xl font-black font-headline text-[#0A2540] mt-1">Ready to partner with ESSENDAAR SUPPLIERS?</h3>
                <p class="text-xs text-slate-600 mt-1">Connect with our team for wholesale chemical pricing, facility audits, or manpower staffing.</p>
            </div>
            <div class="flex flex-wrap gap-3">
                <a 
                    href="tel:+919787979757"
                    class="px-5 py-3 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                    <span>📞 Call +91 97879 79757</span>
                </a>
                <a 
                    href="https://wa.me/919787979757"
                    target="_blank"
                    class="px-5 py-3 bg-[#0A2540] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
                >
                    💬 WhatsApp Chat
                </a>
            </div>
        </div>

    </div>
</div>

<?php get_footer(); ?>
