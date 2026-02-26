import React, { useState, useEffect } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const TopCoworkingCities = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [cardsPerView, setCardsPerView] = useState(4);

    useEffect(() => {
        const updateCardsPerView = () => {
            if (window.innerWidth < 640) setCardsPerView(1);
            else if (window.innerWidth < 1024) setCardsPerView(2);
            else setCardsPerView(4);
        };
        updateCardsPerView();
        window.addEventListener('resize', updateCardsPerView);
        return () => window.removeEventListener('resize', updateCardsPerView);
    }, []);

    const cities = [
        {
            name: "Hyderabad",
            image: "/images/latestimg/top1.webp"
        },
        {
            name: "Bangalore",
            image: "/images/latestimg/top2.webp"
        },
        {
            name: "Mumbai",
            image: "/images/latestimg/top3.webp"
        },
        {
            name: "Gurugram",
            image: "/images/latestimg/top4.webp"
        },
        {
            name: "Pune",
            image: "/images/latestimg/top5.webp"
        },
        {
            name: "Delhi",
            image: "/images/latestimg/top6.webp"
        },
        {
            name: "Ahmedabad",
            image: "/images/latestimg/top7.webp"
        }
    ];

    // Auto-play carousel
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
        <section className="py-4 bg-gray-50">
            <div className="mx-2 md:mx-4 lg:mx-8">
                {/* Section Header */}
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex-shrink-0"></div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
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
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-linear"
                            style={{
                                transform: `translateX(-${(currentIndex % cities.length) * (100 / cardsPerView)}%)`,
                                gap: cardsPerView > 1 ? '12px' : '0px'
                            }}
                        >
                            {[...cities, ...cities, ...cities, ...cities, ...cities].map((city, idx) => (
                                <div
                                    key={`${city.name}-${idx}`}
                                    className="flex-shrink-0"
                                    style={{ width: cardsPerView > 1 ? `calc((100% - ${(cardsPerView - 1) * 12}px) / ${cardsPerView})` : '100%' }}
                                >
                                    <div className="relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 h-[240px]">
                                        {/* Background Image */}
                                        <img
                                            src={city.image}
                                            alt={`${city.name} coworking spaces`}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />

                                        {/* Dark Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300"></div>

                                        {/* City Name */}
                                        <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                                            <div className="flex items-center gap-1.5 text-white">
                                                <MapPin size={16} strokeWidth={2.5} className="flex-shrink-0" />
                                                <span className="text-sm font-bold tracking-wide">{city.name}</span>
                                            </div>
                                        </div>

                                        {/* Hover Border Effect */}
                                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 transition-all duration-300 rounded-2xl pointer-events-none"></div>
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

export default TopCoworkingCities;
