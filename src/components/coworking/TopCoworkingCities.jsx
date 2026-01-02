import React, { useState, useEffect } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const TopCoworkingCities = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [cardsPerView, setCardsPerView] = useState(3);

    useEffect(() => {
        const updateCardsPerView = () => {
            if (window.innerWidth < 640) setCardsPerView(1);
            else if (window.innerWidth < 1024) setCardsPerView(2);
            else setCardsPerView(3);
        };
        updateCardsPerView();
        window.addEventListener('resize', updateCardsPerView);
        return () => window.removeEventListener('resize', updateCardsPerView);
    }, []);

    const cities = [
        {
            name: "Hyderabad",
            image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Bangalore",
            image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Mumbai",
            image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Gurugram",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Pune",
            image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Delhi",
            image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Ahmedabad",
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
    ];

    // Auto-play carousel
    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % cities.length);
            }, 3000); // Change slide every 3 seconds

            return () => clearInterval(interval);
        }
    }, [isPaused, cities.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + cities.length) % cities.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % cities.length);
    };

    // Calculate visible cities based on responsive cardsPerView
    const getVisibleCities = () => {
        const visible = [];
        for (let i = 0; i < cardsPerView; i++) {
            const index = (currentIndex + i) % cities.length;
            visible.push({ ...cities[index], originalIndex: index });
        }
        return visible;
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="mx-6 md:mx-12 lg:mx-20">
                {/* Section Header */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex-shrink-0"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Top Coworking Cities in India
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

                    {/* Cities Carousel */}
                    <div className="flex justify-center items-center gap-0 md:gap-6 px-0 md:px-16">
                        {getVisibleCities().map((city, idx) => (
                            <div
                                key={`${city.name}-${idx}`}
                                className={`relative rounded-3xl overflow-hidden group cursor-pointer transition-all duration-500 ${cardsPerView === 1
                                    ? 'w-full h-[320px]'
                                    : idx === 0
                                        ? 'w-[450px] h-[320px]'
                                        : 'w-[280px] h-[280px] hover:w-[450px] hover:h-[320px]'
                                    }`}
                            >
                                {/* Background Image */}
                                <img
                                    src={city.image}
                                    alt={`${city.name} coworking spaces`}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300"></div>

                                {/* City Name */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                    <div className="flex items-center gap-2 text-white">
                                        <MapPin size={20} strokeWidth={2.5} className="flex-shrink-0" />
                                        <span className="text-lg font-bold tracking-wide">{city.name}</span>
                                    </div>
                                </div>

                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 border-4 border-transparent group-hover:border-yellow-400 transition-all duration-300 rounded-3xl pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopCoworkingCities;
