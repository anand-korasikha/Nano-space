import React from 'react';
import { Link } from 'react-router-dom';

const PlatformStats = () => {
    // Client logos for infinite scroll effect
    const logos = [
        { name: "Client 1", image: "images/clients/img1.png" },
        { name: "Client 2", image: "images/clients/img2.png" },
        { name: "Client 3", image: "images/clients/img3.png" },
        { name: "Client 4", image: "images/clients/img4.png" },
        { name: "Client 5", image: "images/clients/img5.png" },
        { name: "Client 6", image: "images/clients/img6.png" },
        { name: "Client 7", image: "images/clients/img7.png" },
        { name: "Client 8", image: "images/clients/img8.png" },
        { name: "Client 9", image: "images/clients/img9.png" },
        { name: "Client 10", image: "images/clients/img10.png" },
        { name: "Client 11", image: "images/clients/img11.png" },
        { name: "Client 12", image: "images/clients/img12.png" },
    ];

    return (
        <section className="bg-[#007bff] relative overflow-hidden">
            <div className="max-w-[90%] mx-auto px-4 md:px-8 lg:px-16 pt-4 md:pt-10 lg:pt-12 flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">

                {/* Left Column: Floating Cards & Stats */}
                <div className="w-full md:w-1/2 flex flex-col justify-between relative z-10">
                    {/* Floating Cards Area */}
                    <div className="relative min-h-[220px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px] w-full mb-3 md:mb-6">
                        {/* Card 1: Coworking (Back/Left) */}
                        <div className="absolute top-0 left-0 w-40 sm:w-48 md:w-52 lg:w-56 bg-white p-2 rounded-xl shadow-xl transform -rotate-3 z-10 hover:z-30 transition-all duration-300 hover:scale-105">
                            <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-gray-700 shadow-sm z-10 border border-gray-100">Coworking</span>
                            <div className="h-20 sm:h-24 md:h-28 rounded-lg overflow-hidden mb-1.5">
                                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80" alt="WeWork Forum" className="w-full h-full object-cover" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-xs sm:text-sm">WeWork Forum</h4>
                            <p className="text-gray-500 text-[10px]">DLF Cyber City, Gurugram</p>
                            <p className="text-xs font-bold text-gray-900 mt-0.5">₹ 28,000/ <span className="text-[10px] font-normal text-gray-500">month</span></p>
                        </div>

                        {/* Card 2: Coliving (Front/Right) */}
                        <div className="absolute top-16 sm:top-20 md:top-24 left-16 sm:left-20 md:left-24 lg:left-28 w-40 sm:w-48 md:w-52 lg:w-56 bg-white p-2 rounded-xl shadow-2xl transform rotate-3 z-20 hover:z-30 transition-all duration-300 hover:scale-105">
                            <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-gray-700 shadow-sm z-10 border border-gray-100">Coliving</span>
                            <div className="h-20 sm:h-24 md:h-28 rounded-lg overflow-hidden mb-1.5">
                                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80" alt="Stanza Living" className="w-full h-full object-cover" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Stanza Living Dunkirk House</h4>
                            <p className="text-gray-500 text-[10px]">Sector 48, Gurgaon</p>
                            <p className="text-xs font-bold text-gray-900 mt-0.5">₹ 11,799/ <span className="text-[10px] font-normal text-gray-500">month</span></p>
                        </div>
                    </div>

                    {/* Stats Section (Bottom Left) */}
                    <div className="pb-4 md:pb-8 pt-1 pl-0 md:pl-4">
                        <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 text-white">
                            <div>
                                <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-0.5">100,000+</p>
                                <p className="text-blue-100 text-xs font-medium">Live Spaces</p>
                            </div>
                            <div>
                                <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-0.5">1,000+</p>
                                <p className="text-blue-100 text-xs font-medium">Locations</p>
                            </div>
                            <div>
                                <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-0.5">25+</p>
                                <p className="text-blue-100 text-xs font-medium">Cities</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Text & Curved White Section */}
                <div className="w-full md:w-1/2 flex flex-col min-h-full">
                    {/* Top Content */}
                    <div className="text-white mb-4 md:mb-6 md:pl-6 pt-2">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-tight mb-3 md:mb-4">
                            Elevate your  <span className="font-bold">Revenue, Visibility & Leads Through</span> Nano Space Plans
                        </h2>
                        <h3 className="text-base sm:text-lg md:text-xl text-blue-50 mb-4 md:mb-5 font-light leading-relaxed">
                            India's <span className="font-bold">#1 online platform</span> for Coworking & Coliving Spaces
                        </h3>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 md:gap-3">
                            <Link to="/list-property" className="px-4 md:px-5 py-2 md:py-2.5 border border-white rounded-lg font-medium hover:bg-white hover:text-[#007bff] transition-all text-sm text-center">
                                List Your Space
                            </Link>
                            <Link to="/business-plans" className="px-4 md:px-5 py-2 md:py-2.5 border border-white rounded-lg font-medium hover:bg-white hover:text-[#007bff] transition-all text-sm text-center">
                                Business Plans
                            </Link>
                        </div>
                    </div>

                    {/* Trusted By Section (White Curved Box) */}
                    <div className="bg-white rounded-tl-[50px] md:rounded-tl-[60px] flex-grow flex flex-col justify-center relative mr-0 md:-mr-8 lg:-mr-16 -mb-0 mt-auto overflow-visible">
                        {/* Background Extension to cover right side */}
                        <div className="absolute top-0 bottom-0 left-full w-screen bg-white"></div>

                        {/* Content Container */}
                        <div className="p-5 md:p-8 md:pl-10 pb-0 md:pb-0">
                            <div className="mb-4 relative z-10 bg-white">
                                <div id="platform-stats-stars" className="flex flex-row items-center gap-1 mb-1.5 text-yellow-400">
                                    {[...Array(4)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 fill-current shrink-0" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                    <div className="relative overflow-hidden w-2 h-4 shrink-0">
                                        <svg className="w-4 h-4 fill-gray-300 absolute left-0 top-0" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        <svg className="w-4 h-4 fill-yellow-400 absolute left-0 top-0 overflow-hidden" style={{ clipPath: 'inset(0 20% 0 0)' }} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    </div>
                                </div>
                                <p className="text-gray-800 font-bold text-base md:text-lg">Trusted by more than 500+ Companies</p>
                            </div>

                            {/* Carousel Container */}
                            <div className="overflow-hidden w-full relative pb-5 md:pb-8 pt-2">
                                {/* Gradient Masks */}
                                <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white to-transparent z-10"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white to-transparent z-10"></div>

                                <div id="platform-stats-logos" className="flex flex-row gap-4 md:gap-8 whitespace-nowrap animate-marquee">
                                    {logos.map((logo, index) => (
                                        <img
                                            key={index}
                                            src={logo.image}
                                            alt={logo.name}
                                            className="h-8 md:h-16 object-contain shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300"
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlatformStats;
