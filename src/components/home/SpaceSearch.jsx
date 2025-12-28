import React from 'react';

const SpaceSearch = () => {
    return (
        <section className="py-12 md:py-16 bg-white overflow-hidden">
            <div className="max-w-[90%] mx-auto px-4 md:px-0">

                {/* Main Card */}
                <div className="bg-white rounded-[30px] md:rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 p-6 sm:p-8 lg:p-12 relative flex flex-col lg:flex-row items-center justify-between overflow-hidden">

                    {/* Decorative Background Shapes */}
                    <div className="absolute top-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple-50 rounded-full blur-3xl -z-10 opacity-60 transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute top-0 left-0 hidden sm:block">
                        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 opacity-10">
                            <path d="M0 0C50 0 100 50 100 100C100 150 50 200 0 200V0Z" fill="#8B5CF6" />
                        </svg>
                    </div>

                    {/* Left Column: Content & Form */}
                    <div className="w-full lg:w-3/5 relative z-10 pr-0 lg:pr-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 md:mb-3 text-gray-900">
                            Let us find your perfect Property
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500 mb-6 md:mb-8">
                            Connect to a Nanospace Space Expert now
                        </p>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" onSubmit={(e) => e.preventDefault()}>

                            {/* Name */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Name*"
                                    className="w-full border-b border-gray-300 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 transition-colors bg-transparent placeholder-gray-400"
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Email*"
                                    className="w-full border-b border-gray-300 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 transition-colors bg-transparent placeholder-gray-400"
                                />
                            </div>

                            {/* Type of Space */}
                            <div className="relative">
                                <select className="w-full border-b border-gray-300 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 transition-colors bg-transparent text-gray-500">
                                    <option value="">Type Of Space</option>
                                    <option value="coworking">Coworking</option>
                                    <option value="coliving">Coliving</option>
                                    <option value="virtual">Virtual Office</option>
                                </select>
                            </div>

                            {/* City */}
                            <div className="relative">
                                <select className="w-full border-b border-gray-300 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 transition-colors bg-transparent text-gray-500">
                                    <option value="">Select City*</option>
                                    <option value="delhi">Delhi</option>
                                    <option value="mumbai">Mumbai</option>
                                    <option value="bangalore">Bangalore</option>
                                    <option value="gurgaon">Gurgaon</option>
                                </select>
                            </div>

                            {/* Phone */}
                            <div className="relative flex items-center border-b border-gray-300">
                                <span className="text-gray-500 mr-2 text-sm sm:text-base">+91</span>
                                <svg className="w-3 h-3 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                <input
                                    type="tel"
                                    placeholder="Phone*"
                                    className="w-full py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none bg-transparent placeholder-gray-400"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="relative pt-2">
                                <button className="w-full md:w-auto px-10 sm:px-12 py-2.5 sm:py-3 text-sm sm:text-base bg-[#FFE588] text-gray-900 font-semibold rounded-lg hover:bg-[#ffe066] transition-colors shadow-sm">
                                    Submit
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* Right Column: Circular Image */}
                    <div className="w-full lg:w-2/5 mt-8 sm:mt-10 lg:mt-0 flex justify-center lg:justify-end relative">
                        {/* Purple Ring Glow */}
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full border-[8px] sm:border-[10px] border-[#F3E8FF] transform scale-105"></div>

                            {/* Image Container */}
                            <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10">
                                <img
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
                                    alt="Modern Office"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Small decorative circle */}
                            <div className="absolute bottom-3 sm:bottom-4 right-6 sm:right-8 w-6 sm:w-8 h-6 sm:h-8 bg-white rounded-full z-20 shadow-md"></div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default SpaceSearch;
