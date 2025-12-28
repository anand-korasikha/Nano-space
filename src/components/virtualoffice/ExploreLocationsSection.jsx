import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const ExploreLocationsSection = ({ city }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Default locations if not provided in city data
    const defaultLocations = [
        {
            id: 1,
            name: `Virtual Office in ${city?.name || 'Prime Location'}`,
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            startingPrice: "₹ 999/month"
        },
        {
            id: 2,
            name: `Virtual Office in ${city?.name || 'Business District'}`,
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            startingPrice: "₹ 849/month"
        },
        {
            id: 3,
            name: `Virtual Office in ${city?.name || 'Central Area'}`,
            image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            startingPrice: "₹ 699/month"
        },
        {
            id: 4,
            name: `Virtual Office in ${city?.name || 'Tech Hub'}`,
            image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            startingPrice: "₹ 999/month"
        }
    ];

    const locations = city?.locations || defaultLocations;
    const itemsPerView = 4;
    const maxIndex = Math.max(0, locations.length - itemsPerView);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    const handleGetQuote = (e) => {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (!city) return null;

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 inline-block">
                        Explore{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-blue-100 px-2 rounded">Virtual Office Locations</span>
                        </span>
                        {' '}In{' '}
                        <span className="relative inline-block text-blue-600">
                            {city.name}
                        </span>
                    </h2>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    {locations.length > itemsPerView && (
                        <>
                            <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                aria-label="Previous"
                            >
                                <ChevronLeft size={24} className="text-gray-700" />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentIndex >= maxIndex}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                aria-label="Next"
                            >
                                <ChevronRight size={24} className="text-gray-700" />
                            </button>
                        </>
                    )}

                    {/* Carousel Track */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out gap-6"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / itemsPerView + 1.5)}%)`
                            }}
                        >
                            {locations.map((location) => (
                                <div
                                    key={location.id}
                                    className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] group"
                                >
                                    <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-64">
                                        {/* Location Image */}
                                        <img
                                            src={location.image}
                                            alt={location.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                        {/* Location Info */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                            <h3 className="text-lg font-bold mb-2 leading-tight">
                                                {location.name}
                                            </h3>
                                            <p className="text-sm font-semibold text-blue-400">
                                                Starting {location.startingPrice}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center mt-12">
                    <a
                        href="#contact"
                        onClick={handleGetQuote}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg group/link transition-colors"
                    >
                        Get Quote for virtual office address in your locations
                        <ArrowRight
                            size={20}
                            className="group-hover/link:translate-x-1 transition-transform duration-200"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ExploreLocationsSection;
