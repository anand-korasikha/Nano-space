import React, { useState, useEffect } from 'react';
import { MapPin, Wifi, Coffee, ChevronLeft, ChevronRight } from 'lucide-react';
import topSpacesData from '../../data/topSpaces.json';

const TopSpaces = ({ city = 'hyderabad', reverse = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const cityData = topSpacesData[city.toLowerCase()] || topSpacesData.hyderabad;
    const cardsPerView = 3;
    const totalSlides = Math.ceil(cityData.spaces.length / cardsPerView);

    // Auto-play carousel (forward or reverse based on prop)
    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                if (reverse) {
                    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
                } else {
                    setCurrentIndex((prev) => (prev + 1) % totalSlides);
                }
            }, 4000); // Change slide every 4 seconds

            return () => clearInterval(interval);
        }
    }, [isPaused, totalSlides, reverse]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    // Get visible spaces for current slide
    const getVisibleSpaces = () => {
        const startIndex = currentIndex * cardsPerView;
        return cityData.spaces.slice(startIndex, startIndex + cardsPerView);
    };

    const amenityIcons = {
        'High speed WiFi': Wifi,
        'Coffee & Bar': Coffee
    };

    return (
        <section className="py-20 bg-white">
            <div className="mx-6 md:mx-12 lg:mx-20">
                {/* Section Header */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex-shrink-0"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Top Spaces in {cityData.cityName}
                    </h2>
                </div>

                {/* Carousel Container */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Left Arrow */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={24} className="text-gray-800" />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={24} className="text-gray-800" />
                    </button>

                    {/* Spaces Carousel */}
                    <div className="overflow-hidden px-16">
                        <div
                            className="flex transition-transform duration-500 ease-in-out gap-6"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                <div key={slideIndex} className="flex gap-6 min-w-full">
                                    {cityData.spaces
                                        .slice(slideIndex * cardsPerView, (slideIndex + 1) * cardsPerView)
                                        .map((space, index) => (
                                            <div
                                                key={index}
                                                className="flex-1 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
                                            >
                                                {/* Space Image */}
                                                <div className="relative h-48 overflow-hidden">
                                                    <img
                                                        src={space.image}
                                                        alt={space.name}
                                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                                    />
                                                </div>

                                                {/* Space Details */}
                                                <div className="p-6">
                                                    {/* Space Name */}
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                        {space.name}
                                                    </h3>

                                                    {/* Location */}
                                                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                                                        <MapPin size={16} className="flex-shrink-0" />
                                                        <span className="text-sm">{space.location}</span>
                                                    </div>

                                                    {/* Amenities */}
                                                    <div className="space-y-2 mb-4">
                                                        {space.amenities.map((amenity, idx) => {
                                                            const Icon = amenityIcons[amenity] || Wifi;
                                                            return (
                                                                <div key={idx} className="flex items-center gap-2 text-gray-700">
                                                                    <Icon size={16} className="text-yellow-500" />
                                                                    <span className="text-sm">{amenity}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Price and CTA */}
                                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                        <div>
                                                            <p className="text-sm text-gray-500">Starting</p>
                                                            <p className="text-xl font-bold text-blue-600">
                                                                {space.price}
                                                                <span className="text-sm text-gray-500 font-normal">/{space.period}</span>
                                                            </p>
                                                        </div>
                                                        <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors">
                                                            Explore More →
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-300 rounded-full ${index === currentIndex
                                    ? 'bg-yellow-400 w-8 h-2.5'
                                    : 'bg-gray-300 hover:bg-gray-400 w-2.5 h-2.5'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopSpaces;
