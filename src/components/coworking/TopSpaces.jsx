import React, { useState, useEffect } from 'react';
import { MapPin, Wifi, Coffee, ChevronLeft, ChevronRight } from 'lucide-react';
import topSpacesData from '../../data/topSpaces.json';

const TopSpaces = ({ city = 'hyderabad', reverse = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const cityData = topSpacesData[city.toLowerCase()] || topSpacesData.hyderabad;

    // Responsive cardsPerView
    const [cardsPerView, setCardsPerView] = useState(4);

    useEffect(() => {
        const updateCardsPerView = () => {
            if (window.innerWidth < 640) {
                setCardsPerView(1);
            } else if (window.innerWidth < 1024) {
                setCardsPerView(2);
            } else {
                setCardsPerView(4);
            }
        };

        // Initial call
        updateCardsPerView();

        // Event listener
        window.addEventListener('resize', updateCardsPerView);

        // Cleanup
        return () => window.removeEventListener('resize', updateCardsPerView);
    }, []);

    const totalSlides = Math.ceil(cityData.spaces.length / cardsPerView);

    // Auto-play carousel (forward or reverse based on prop)
    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => prev + 1);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isPaused]);

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
        <section className="py-4 bg-white">
            <div className="mx-2 md:mx-4 lg:mx-8">
                {/* Section Header */}
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex-shrink-0"></div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
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
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 hidden md:block"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={24} className="text-gray-800" />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 hidden md:block"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={24} className="text-gray-800" />
                    </button>

                    {/* Spaces Carousel */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-linear"
                            style={{ 
                                transform: `translateX(-${(currentIndex % cityData.spaces.length) * (100 / cardsPerView)}%)`,
                                gap: cardsPerView > 1 ? '12px' : '0px'
                            }}
                        >
                            {/* Render cards multiple times for infinite scroll */}
                            {[...cityData.spaces, ...cityData.spaces, ...cityData.spaces, ...cityData.spaces, ...cityData.spaces].map((space, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0"
                                    style={{ width: cardsPerView > 1 ? `calc((100% - ${(cardsPerView - 1) * 12}px) / ${cardsPerView})` : '100%' }}
                                >
                                            <div
                                                key={index}
                                                className="w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 flex flex-col h-[340px]"
                                            >
                                                {/* Space Image */}
                                                <div className="relative h-36 flex-shrink-0 overflow-hidden">
                                                    <img
                                                        src={space.image}
                                                        alt={space.name}
                                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                                    />
                                                </div>

                                                {/* Space Details */}
                                                <div className="p-3 flex flex-col flex-grow">
                                                    {/* Space Name */}
                                                    <h3 className="text-base font-bold text-gray-900 mb-1.5 line-clamp-1">
                                                        {space.name}
                                                    </h3>

                                                    {/* Location */}
                                                    <div className="flex items-center gap-1.5 text-gray-600 mb-2">
                                                        <MapPin size={12} className="flex-shrink-0" />
                                                        <span className="text-xs line-clamp-1">{space.location}</span>
                                                    </div>

                                                    {/* Amenities */}
                                                    <div className="space-y-1 mb-2 flex-grow">
                                                        {space.amenities.slice(0, 2).map((amenity, idx) => {
                                                            const Icon = amenityIcons[amenity] || Wifi;
                                                            return (
                                                                <div key={idx} className="flex items-center gap-1.5 text-gray-700">
                                                                    <Icon size={12} className="text-yellow-500 flex-shrink-0" />
                                                                    <span className="text-xs">{amenity}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Price and CTA */}
                                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
                                                        <div>
                                                            <p className="text-xs text-gray-500">Starting</p>
                                                            <p className="text-lg font-bold text-blue-600">
                                                                {space.price}
                                                                <span className="text-xs text-gray-500 font-normal">/{space.period}</span>
                                                            </p>
                                                        </div>
                                                        <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors md:text-sm text-xs md:px-0 px-2 md:py-0 py-1">
                                                            <span className="hidden md:inline">Explore More →</span>
                                                            <span className="md:hidden">→</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopSpaces;
