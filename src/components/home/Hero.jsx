import React, { useState } from 'react';
import CityGrid from './CityGrid';
import heroContentData from '../../data/heroContent.json';
import HeroCarousel from './HeroCarousel';

const Hero = ({ pageType = 'home' }) => {
    const content = heroContentData[pageType] || heroContentData.home;

    return (
        <div className="relative min-h-[auto] md:min-h-[90vh] flex flex-col lg:flex-row bg-white overflow-hidden">
            {/* Left Column: Content */}
            <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-6 sm:py-8 md:py-12 lg:py-0 z-10">
                <div className="max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4 md:mb-6">
                        {content.title.line1} <br />
                        <span className="text-blue-600">{content.title.line2}</span> {content.title.line3}
                    </h1>

                    {/* Search/Dropdown Filters (Visual Only) */}
                    <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-10">
                        <div className="relative flex-1 sm:max-w-xs">
                            <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm md:text-base py-2 sm:py-2.5 md:py-3 px-3 md:px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
                                <option>{content.searchPlaceholder.type}</option>
                                {content.typeOptions.map((option, index) => (
                                    <option key={index}>{option}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>

                        <div className="relative flex-1 sm:max-w-xs">
                            <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm md:text-base py-2 sm:py-2.5 md:py-3 px-3 md:px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
                                <option>{content.searchPlaceholder.city}</option>
                                {content.cityOptions.map((city, index) => (
                                    <option key={index}>{city}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>

                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm md:text-base py-2 sm:py-2.5 md:py-3 px-6 md:px-8 rounded-xl transition-colors shadow-lg shadow-blue-500/30 w-full sm:w-auto">
                            {content.searchButton}
                        </button>
                    </div>

                    <div className="mb-3 sm:mb-4">
                        <p className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3 md:mb-4">{content.popularCitiesLabel}</p>
                        <CityGrid currentPage={pageType} />
                    </div>
                </div>
            </div>

            {/* Right Column: Hero Carousel */}
            <div className="w-full lg:w-[45%] xl:w-[40%] flex items-center justify-center p-4 sm:p-8 lg:p-0">
                <HeroCarousel />
            </div>
        </div>
    );
};

export default Hero;
