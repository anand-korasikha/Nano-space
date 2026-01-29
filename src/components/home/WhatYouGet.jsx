import React from 'react';

const benefits = [
    {
        icon: (
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        ),
        text: 'Exclusive pricing for Nanospace members'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        text: 'Verified Spaces and Trusted Partners'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        text: 'No booking service fee'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        text: '100% offline support'
    },
    {
        icon: (
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
        ),
        text: 'Exclusive Brand Coupon Codes'
    }
];

const WhatYouGet = () => {
    return (
        <section className="py-12 md:py-16 lg:py-20 bg-white overflow-hidden">
            <div className="max-w-[90%] mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16 xl:gap-24 relative px-4 md:px-0">

                {/* Visual Decoration Elements (Background) */}
                {/* Large Yellow Half Circle Left */}
                <div className="absolute left-[-15%] top-[10%] w-[30%] h-[60%] bg-[#FFF8C5] rounded-r-full -z-10 hidden xl:block opacity-50"></div>


                {/* Left Column: Image Area */}
                <div className="w-full lg:w-1/2 relative flex items-center justify-center">
                    {/* Background decorations for image */}
                    <div className="absolute left-[-20px] sm:left-[-50px] top-[10%] w-32 sm:w-64 h-32 sm:h-64 bg-[#FFF8C5] rounded-full -z-10 opacity-60"></div>
                    <div className="absolute right-[5%] bottom-[5%] w-12 sm:w-24 h-12 sm:h-24 bg-[#FFF8C5] rounded-full -z-10 opacity-50"></div>

                    {/* Main Image Masked - Fixed Height/Aspect on mobile to ensure coverage */}
                    <div className="relative w-full h-[250px] sm:h-[400px] lg:h-[500px] rounded-2xl sm:rounded-r-[120px] md:rounded-r-[150px] overflow-hidden shadow-xl md:shadow-2xl border-4 border-white">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                            alt="Office Collaboration"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Right Column: Content */}
                <div className="w-full lg:w-1/2 pt-6 lg:pt-0">
                    {/* Header */}
                    <div className="mb-8 lg:mb-16 relative lg:text-left text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold inline-block relative z-10 text-gray-900">
                            <span className="relative">
                                <span className="absolute -left-2 sm:-left-4 -top-2 sm:-top-4 w-10 sm:w-12 h-10 sm:h-12 bg-yellow-200 rounded-full -z-10 opacity-70"></span>
                                What
                            </span> You Get From Us
                        </h2>
                        <div className="w-16 md:w-24 h-1.5 bg-blue-600 mt-3 rounded-full shadow-sm mx-auto lg:mx-0"></div>
                        <p className="text-gray-500 mt-4 text-sm sm:text-base max-w-xl mx-auto lg:mx-0">
                            Experience the Nanospace advantage with our premium perks and dedicated support
                        </p>
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-4 md:space-y-8">
                        {benefits.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 md:gap-6 group">
                                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:bg-yellow-50 transition-all duration-300 flex-shrink-0">
                                    {item.icon}
                                </div>
                                <p className="text-[14px] sm:text-lg text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhatYouGet;
