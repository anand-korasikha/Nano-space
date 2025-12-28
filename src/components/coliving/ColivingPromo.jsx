import React from 'react';

const ColivingPromo = () => {
    return (
        <section className="relative py-8 md:py-10 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Promotional Banner */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                            alt="Modern Coliving Space"
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 py-10 md:py-12 lg:py-14 px-6 md:px-10 lg:px-12">
                        <div className="max-w-2xl">
                            {/* Brand Logo/Name */}
                            <div className="mb-4 md:mb-5">
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                                    NanoSpace
                                </h3>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <div className="h-0.5 w-12 bg-blue-600"></div>
                                    <p className="text-xs md:text-sm text-gray-600 italic">just move in</p>
                                </div>
                            </div>

                            {/* Main Message */}
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 md:mb-5">
                                Everyone Deserves to Live Better
                            </h2>

                            {/* CTA Button */}
                            <button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-full font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
                                Explore Our Spaces
                                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </button>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-6 right-6 w-16 h-16 bg-yellow-400 rounded-full opacity-20 blur-2xl"></div>
                    <div className="absolute bottom-6 right-12 w-24 h-24 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
                </div>
            </div>
        </section>
    );
};

export default ColivingPromo;
