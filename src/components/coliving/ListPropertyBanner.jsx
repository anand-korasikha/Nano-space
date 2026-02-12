import React from 'react';

const ListPropertyBanner = () => {
    return (
        <section className="relative py-8 md:py-10 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Banner Container */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-10 md:py-12 px-6 md:px-10 lg:px-12">
                        {/* Left Content */}
                        <div className="flex-1 text-center lg:text-left">
                            {/* Heading */}
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
                                Promote Your Available Space with Nano Space and Start Earning
                            </h2>

                            {/* Description */}
                            <p className="text-sm md:text-base text-gray-700 mb-5 md:mb-6 max-w-2xl mx-auto lg:mx-0">
                                List for free and trust our experts completely. Stay organized, manage leads, and track your bookings all in one place
                            </p>

                            {/* CTA Button */}
                            <button className="group bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 hover:border-blue-700 px-6 py-3 rounded-lg font-semibold text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
                                List Your Property
                                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </button>
                        </div>

                        {/* Right Illustration */}
                        <div className="flex-shrink-0 w-full lg:w-auto max-w-md">
                            <div className="relative">
                                {/* Illustration - Happy people celebrating */}
                                <svg viewBox="0 0 400 250" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                                    {/* Confetti */}
                                    <circle cx="50" cy="40" r="3" fill="#EF4444" opacity="0.8" />
                                    <circle cx="100" cy="30" r="2" fill="#3B82F6" opacity="0.8" />
                                    <circle cx="150" cy="50" r="2.5" fill="#FBBF24" opacity="0.8" />
                                    <circle cx="200" cy="35" r="3" fill="#10B981" opacity="0.8" />
                                    <circle cx="250" cy="45" r="2" fill="#8B5CF6" opacity="0.8" />
                                    <circle cx="300" cy="30" r="2.5" fill="#F59E0B" opacity="0.8" />
                                    <circle cx="350" cy="55" r="3" fill="#EC4899" opacity="0.8" />

                                    <rect x="70" y="25" width="3" height="8" fill="#3B82F6" opacity="0.7" transform="rotate(15 71.5 29)" />
                                    <rect x="180" y="20" width="3" height="8" fill="#EF4444" opacity="0.7" transform="rotate(-20 181.5 24)" />
                                    <rect x="280" y="40" width="3" height="8" fill="#FBBF24" opacity="0.7" transform="rotate(25 281.5 44)" />
                                    <rect x="320" y="25" width="3" height="8" fill="#10B981" opacity="0.7" transform="rotate(-15 321.5 29)" />

                                    {/* Person 1 - Left */}
                                    <g transform="translate(60, 120)">
                                        <ellipse cx="25" cy="20" rx="18" ry="20" fill="#3B82F6" />
                                        <circle cx="25" cy="0" r="15" fill="#FDE68A" />
                                        <circle cx="20" cy="-3" r="2" fill="#1F2937" />
                                        <circle cx="30" cy="-3" r="2" fill="#1F2937" />
                                        <path d="M 20 5 Q 25 8 30 5" stroke="#1F2937" strokeWidth="2" fill="none" />
                                        <rect x="10" y="40" width="8" height="25" fill="#1E40AF" rx="3" />
                                        <rect x="32" y="40" width="8" height="25" fill="#1E40AF" rx="3" />
                                        <ellipse cx="5" cy="25" rx="12" ry="8" fill="#3B82F6" transform="rotate(-30 5 25)" />
                                        <ellipse cx="45" cy="25" rx="12" ry="8" fill="#3B82F6" transform="rotate(30 45 25)" />
                                    </g>

                                    {/* Person 2 - Center Left */}
                                    <g transform="translate(140, 110)">
                                        <ellipse cx="25" cy="25" rx="18" ry="22" fill="#EC4899" />
                                        <circle cx="25" cy="0" r="15" fill="#FDE68A" />
                                        <circle cx="20" cy="-3" r="2" fill="#1F2937" />
                                        <circle cx="30" cy="-3" r="2" fill="#1F2937" />
                                        <path d="M 20 5 Q 25 8 30 5" stroke="#1F2937" strokeWidth="2" fill="none" />
                                        <rect x="10" y="47" width="8" height="28" fill="#BE185D" rx="3" />
                                        <rect x="32" y="47" width="8" height="28" fill="#BE185D" rx="3" />
                                        <ellipse cx="5" cy="30" rx="12" ry="8" fill="#EC4899" transform="rotate(-40 5 30)" />
                                        <ellipse cx="45" cy="30" rx="12" ry="8" fill="#EC4899" transform="rotate(40 45 30)" />
                                    </g>

                                    {/* Person 3 - Center Right */}
                                    <g transform="translate(220, 115)">
                                        <ellipse cx="25" cy="22" rx="18" ry="21" fill="#1E40AF" />
                                        <circle cx="25" cy="0" r="15" fill="#FDE68A" />
                                        <circle cx="20" cy="-3" r="2" fill="#1F2937" />
                                        <circle cx="30" cy="-3" r="2" fill="#1F2937" />
                                        <path d="M 20 5 Q 25 8 30 5" stroke="#1F2937" strokeWidth="2" fill="none" />
                                        <rect x="10" y="43" width="8" height="26" fill="#1E3A8A" rx="3" />
                                        <rect x="32" y="43" width="8" height="26" fill="#1E3A8A" rx="3" />
                                        <ellipse cx="5" cy="27" rx="12" ry="8" fill="#1E40AF" transform="rotate(-35 5 27)" />
                                        <ellipse cx="45" cy="27" rx="12" ry="8" fill="#1E40AF" transform="rotate(35 45 27)" />
                                    </g>

                                    {/* Person 4 - Right */}
                                    <g transform="translate(300, 125)">
                                        <ellipse cx="25" cy="18" rx="18" ry="19" fill="#FBBF24" />
                                        <circle cx="25" cy="0" r="15" fill="#FDE68A" />
                                        <circle cx="20" cy="-3" r="2" fill="#1F2937" />
                                        <circle cx="30" cy="-3" r="2" fill="#1F2937" />
                                        <path d="M 20 5 Q 25 8 30 5" stroke="#1F2937" strokeWidth="2" fill="none" />
                                        <rect x="10" y="37" width="8" height="24" fill="#D97706" rx="3" />
                                        <rect x="32" y="37" width="8" height="24" fill="#D97706" rx="3" />
                                        <ellipse cx="5" cy="23" rx="12" ry="8" fill="#FBBF24" transform="rotate(-25 5 23)" />
                                        <ellipse cx="45" cy="23" rx="12" ry="8" fill="#FBBF24" transform="rotate(25 45 23)" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ListPropertyBanner;
