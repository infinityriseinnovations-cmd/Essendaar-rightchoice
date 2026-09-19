<?php
/**
 * Template Name: Contact & B2B Quote (Essendaar Suppliers)
 * Description: Direct contact details, Google Map plant location, GSTIN verification, and instant inquiry form.
 */
get_header(); ?>

<div class="w-full bg-[#f8f9ff] min-h-screen py-8 sm:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div class="flex items-center space-x-2 text-xs text-slate-500 mb-6">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-[#00355f]">Home</a>
            <span>/</span>
            <span class="text-[#00355f] font-bold">Contact &amp; B2B Quote</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <!-- Left Contact Info -->
            <div class="lg:col-span-5">
                <div class="bg-[#0A2540] rounded-3xl text-white p-8 sm:p-10 shadow-xl border border-slate-700/60 h-full flex flex-col justify-between">
                    <div>
                        <span class="bg-[#006e2d] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                            Direct Operations &amp; Manufacturing
                        </span>
                        <h1 class="text-2xl sm:text-3xl font-black font-headline mb-3">
                            Connect with Essendaar
                        </h1>
                        <p class="text-slate-300 text-xs sm:text-sm leading-relaxed mb-8">
                            Reach out directly to our plant leadership, request bulk price lists, or schedule a physical facility inspection in Chennai.
                        </p>

                        <div class="space-y-4 text-xs sm:text-sm">
                            <div class="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                                <span class="text-emerald-400 text-lg">📞</span>
                                <div>
                                    <div class="text-[10px] text-slate-400 uppercase font-bold">Direct Phone Hotline</div>
                                    <a href="tel:+919787979757" class="text-white font-bold hover:text-emerald-400 transition-colors">+91 97879 79757</a>
                                </div>
                            </div>

                            <div class="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                                <span class="text-sky-400 text-lg">✉️</span>
                                <div>
                                    <div class="text-[10px] text-slate-400 uppercase font-bold">Email Inquiries</div>
                                    <a href="mailto:essendaargroup@gmail.com" class="text-white font-bold hover:text-sky-300 transition-colors">essendaargroup@gmail.com</a>
                                </div>
                            </div>

                            <div class="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                                <span class="text-amber-400 text-lg">📍</span>
                                <div>
                                    <div class="text-[10px] text-slate-400 uppercase font-bold">Factory &amp; Registered Office</div>
                                    <div class="text-slate-200">Mangadu, Chennai, Tamil Nadu - 600122, India</div>
                                </div>
                            </div>

                            <div class="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                                <span class="text-indigo-400 text-lg">🌐</span>
                                <div>
                                    <div class="text-[10px] text-slate-400 uppercase font-bold">Official Web Portal</div>
                                    <div class="text-slate-200">www.rightchoiceindia.com</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8 pt-6 border-t border-slate-700/80">
                        <a 
                            href="https://wa.me/919787979757?text=Hello%20Essendaar%20Suppliers,%20I%20would%20like%20to%20request%20a%20B2B%20quote" 
                            target="_blank"
                            class="w-full py-3 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-2 shadow-xs"
                        >
                            <span>💬 Instant WhatsApp Chat</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Right Inquiry Form -->
            <div class="lg:col-span-7">
                <div class="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs">
                    <h2 class="text-xl sm:text-2xl font-black font-headline text-[#0A2540] mb-1">
                        Request Institutional Quote / Callback
                    </h2>
                    <p class="text-xs text-slate-600 mb-6">Fill in your requirements below and our commercial sales desk will respond within 2 business hours.</p>

                    <form action="mailto:essendaargroup@gmail.com" method="post" enctype="text/plain" class="space-y-4 text-xs">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block font-bold text-slate-700 mb-1">Contact Name *</label>
                                <input type="text" name="name" required placeholder="e.g. Siva Kumar" class="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#00355f]" />
                            </div>
                            <div>
                                <label class="block font-bold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                                <input type="tel" name="phone" required placeholder="e.g. +91 98765 43210" class="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#00355f]" />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block font-bold text-slate-700 mb-1">Company / Institution Name</label>
                                <input type="text" name="company" placeholder="e.g. SVS Matriculation School" class="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#00355f]" />
                            </div>
                            <div>
                                <label class="block font-bold text-slate-700 mb-1">Email Address</label>
                                <input type="email" name="email" placeholder="e.g. contact@domain.com" class="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#00355f]" />
                            </div>
                        </div>

                        <div>
                            <label class="block font-bold text-slate-700 mb-1">Service or Products Required *</label>
                            <select name="service" class="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#00355f]">
                                <option value="wholesale-cleaning-chemicals">Wholesale Cleaning Formulations (Bulk 5L / 50L)</option>
                                <option value="turnkey-facility-management">Turnkey Facility Management Contract</option>
                                <option value="manpower-staffing">Vetted Manpower & Housekeeping Staffing</option>
                                <option value="institutional-supplies">Institutional Supplies & Tools</option>
                                <option value="other">Other Inquiries</option>
                            </select>
                        </div>

                        <div>
                            <label class="block font-bold text-slate-700 mb-1">Requirement Details / Monthly Quantity</label>
                            <textarea name="message" rows="4" placeholder="Mention specific products (Morning Shine, Floor Cleaner) or facility square footage..." class="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#00355f]"></textarea>
                        </div>

                        <button type="submit" class="w-full py-3.5 bg-[#00355f] hover:bg-[#0A2540] text-white rounded-xl font-bold uppercase tracking-wider transition-colors shadow-sm">
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>

        </div>

    </div>
</div>

<?php get_footer(); ?>
