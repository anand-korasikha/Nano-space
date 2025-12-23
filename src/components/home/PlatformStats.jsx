import React from 'react';
import { Link } from 'react-router-dom';

const PlatformStats = () => {
    // Duplicating logos for infinite scroll effect
    const logos = [
        { name: "DABLE", color: "text-gray-800" },
        { name: "HECTOR", color: "text-gray-800" },
        { name: "purple", color: "text-purple-700" },
        { name: "Fyp", color: "text-red-500" },
        { name: "DABLE", color: "text-gray-800" },
        { name: "HECTOR", color: "text-gray-800" },
        { name: "purple", color: "text-purple-700" },
        { name: "Fyp", color: "text-red-500" },
        { name: "DABLE", color: "text-gray-800" },
        { name: "HECTOR", color: "text-gray-800" },
        { name: "purple", color: "text-purple-700" },
        { name: "Fyp", color: "text-red-500" },
    ];

    return (
        <section className="bg-[#007bff] relative overflow-hidden">
            <div className="max-w-[90%] mx-auto px-4 md:px-8 lg:px-16 pt-12 md:pt-16 lg:pt-24 flex flex-col md:flex-row gap-8 lg:gap-12">

                {/* Left Column: Floating Cards & Stats */}
                <div className="w-full md:w-1/2 flex flex-col justify-between relative z-10">
                    {/* Floating Cards Area */}
                    <div className="relative min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] w-full mb-8 md:mb-12">
                        {/* Card 1: Coworking (Back/Left) */}
                        <div className="absolute top-0 left-0 w-56 sm:w-60 md:w-64 lg:w-72 bg-white p-2.5 sm:p-3 rounded-2xl shadow-xl transform -rotate-3 z-10 hover:z-30 transition-all duration-300 hover:scale-105">
                            <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-sm px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm z-10 border border-gray-100">Coworking</span>
                            <div className="h-32 sm:h-36 md:h-40 rounded-xl overflow-hidden mb-2 sm:mb-3">
                                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80" alt="WeWork Forum" className="w-full h-full object-cover" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-base sm:text-lg">WeWork Forum</h4>
                            <p className="text-gray-500 text-xs">DLF Cyber City, Gurugram</p>
                            <p className="text-sm font-bold text-gray-900 mt-1">₹ 28,000/ <span className="text-xs font-normal text-gray-500">month</span></p>
                        </div>

                        {/* Card 2: Coliving (Front/Right) */}
                        <div className="absolute top-24 sm:top-28 md:top-32 left-24 sm:left-28 md:left-32 lg:left-40 w-56 sm:w-60 md:w-64 lg:w-72 bg-white p-2.5 sm:p-3 rounded-2xl shadow-2xl transform rotate-3 z-20 hover:z-30 transition-all duration-300 hover:scale-105">
                            <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-sm px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm z-10 border border-gray-100">Coliving</span>
                            <div className="h-32 sm:h-36 md:h-40 rounded-xl overflow-hidden mb-2 sm:mb-3">
                                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80" alt="Stanza Living" className="w-full h-full object-cover" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-base sm:text-lg">Stanza Living Dunkirk House</h4>
                            <p className="text-gray-500 text-xs">Sector 48, Gurgaon</p>
                            <p className="text-sm font-bold text-gray-900 mt-1">₹ 11,799/ <span className="text-xs font-normal text-gray-500">month</span></p>
                        </div>
                    </div>

                    {/* Stats Section (Bottom Left) */}
                    <div className="pb-12 md:pb-16 pt-4 pl-0 md:pl-4">
                        <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-16 text-white">
                            <div>
                                <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">100,000+</p>
                                <p className="text-blue-100 text-xs sm:text-sm font-medium">Live Spaces</p>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">1,000+</p>
                                <p className="text-blue-100 text-xs sm:text-sm font-medium">Locations</p>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">25+</p>
                                <p className="text-blue-100 text-xs sm:text-sm font-medium">Cities</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Text & Curved White Section */}
                <div className="w-full md:w-1/2 flex flex-col min-h-full">
                    {/* Top Content */}
                    <div className="text-white mb-8 md:mb-12 md:pl-8 pt-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4 md:mb-6">
                            Boost your <span className="font-bold">Revenue, Visibility & Leads</span> with NanoSpace Plans
                        </h2>
                        <h3 className="text-lg sm:text-xl md:text-2xl text-blue-50 mb-6 md:mb-8 font-light leading-relaxed">
                            India's <span className="font-bold">#1 online platform</span> for Coworking & Coliving Spaces
                        </h3>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                            <Link to="/list-property" className="px-5 md:px-6 py-2.5 md:py-3 border border-white rounded-lg font-medium hover:bg-white hover:text-[#007bff] transition-all text-sm text-center">
                                List Your Space
                            </Link>
                            <Link to="/business-plans" className="px-5 md:px-6 py-2.5 md:py-3 border border-white rounded-lg font-medium hover:bg-white hover:text-[#007bff] transition-all text-sm text-center">
                                Business Plans
                            </Link>
                        </div>
                    </div>

                    {/* Trusted By Section (White Curved Box) */}
                    <div className="bg-white rounded-tl-[60px] md:rounded-tl-[80px] flex-grow flex flex-col justify-center relative -mr-4 md:-mr-8 lg:-mr-16 -mb-0 mt-auto overflow-visible">
                        {/* Background Extension to cover right side */}
                        <div className="absolute top-0 bottom-0 left-full w-screen bg-white"></div>

                        {/* Content Container */}
                        <div className="p-8 md:p-12 md:pl-16 pb-0 md:pb-0">
                            <div className="mb-6 relative z-10 bg-white">
                                <div className="flex items-center gap-1 mb-2 text-yellow-400">
                                    {[...Array(4)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                    <div className="relative overflow-hidden w-2.5 h-5">
                                        <svg className="w-5 h-5 fill-gray-300 absolute left-0 top-0" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        <svg className="w-5 h-5 fill-yellow-400 absolute left-0 top-0 overflow-hidden" style={{ clipPath: 'inset(0 20% 0 0)' }} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    </div>
                                </div>
                                <p className="text-gray-800 font-bold text-lg">Trusted by more than 500+ Companies</p>
                            </div>
                        </div>

                        {/* Carousel Container */}
                        <div className="overflow-hidden w-full relative pb-8 md:pb-12 pt-4">
                            {/* Gradient Masks */}
                            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10"></div>

                            <div className="flex gap-12 whitespace-nowrap animate-marquee grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                {logos.map((logo, index) => (
                                    <span key={index} className={`text-xl md:text-2xl font-bold shrink-0 ${logo.color}`}>
                                        {logo.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlatformStats;
