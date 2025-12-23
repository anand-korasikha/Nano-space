import React, { useState, useEffect } from 'react';
import CityGrid from './CityGrid';
import heroContentData from '../../data/heroContent.json';

const Hero = ({ pageType = 'home' }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const content = heroContentData[pageType] || heroContentData.home;
    const heroImages = content.heroImages || [];

    useEffect(() => {
        setCurrentImageIndex(0); // Reset to first image when page type changes

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [pageType, heroImages.length]);

    return (
        <div className="relative min-h-[90vh] flex flex-col lg:flex-row bg-white overflow-hidden pt-16">
            {/* Left Column: Content */}
            <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12 lg:py-0 z-10">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        {content.title.line1} <br />
                        <span className="text-blue-600">{content.title.line2}</span> {content.title.line3}
                    </h1>

                    {/* Search/Dropdown Filters (Visual Only) */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                        <div className="relative flex-1 max-w-xs">
                            <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
                                <option>{content.searchPlaceholder.type}</option>
                                {content.typeOptions.map((option, index) => (
                                    <option key={index}>{option}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>

                        <div className="relative flex-1 max-w-xs">
                            <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
                                <option>{content.searchPlaceholder.city}</option>
                                {content.cityOptions.map((city, index) => (
                                    <option key={index}>{city}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>

                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-blue-500/30">
                            {content.searchButton}
                        </button>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">{content.popularCitiesLabel}</p>
                        <CityGrid currentPage={pageType} />
                    </div>
                </div>
            </div>

            {/* Right Column: Image */}
            <div className="w-full lg:w-[45%] xl:w-[40%] relative min-h-[400px] lg:min-h-full">
                <div
                    className="absolute inset-0 bg-gray-100 lg:rounded-l-[3rem] overflow-hidden"
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' // Fallback/Base
                    }}
                >
                    <div className="w-full h-full bg-blue-50 relative">
                        {heroImages.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Office Space ${index + 1}`}
                                className={`absolute inset-0 w-full h-full object-cover lg:rounded-l-[3rem] transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:rounded-l-[3rem] pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
