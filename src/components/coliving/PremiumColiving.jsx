import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

const PremiumColiving = () => {
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

    const premiumSpaces = [
        {
            id: 1,
            name: 'Setti Alberti',
            location: 'Kasavanahalli, Bangalore',
            price: '₹13,000',
            period: 'month',
            image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 2,
            name: 'Setti Alem - Near Metro',
            location: 'Sector 43, Gurgaon',
            price: '₹15,000',
            period: 'month',
            image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 3,
            name: 'Setti Alivea',
            location: 'Indiranagar, Bengaluru',
            price: '₹20,000',
            period: 'month',
            image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 4,
            name: 'Setti Arion - Near Metro',
            location: 'Sector 47, Gurgaon',
            price: '₹17,000',
            period: 'month',
            image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    ];

    const totalSlides = Math.ceil(premiumSpaces.length / cardsPerView);

    // Auto-play carousel
    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % totalSlides);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [isPaused, totalSlides]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    return (
        <section className="relative py-8 md:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-10">
                    <div className="inline-flex items-center justify-center relative">
                        {/* Yellow Circle Accent */}
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-yellow-400 rounded-full -z-10"></div>

                        <h2 className="relative text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 px-4">
                            Premium Coliving Setti
                        </h2>
                    </div>
                </div>

                {/* Carousel Container */}
                <div
                    className="relative mb-8 md:mb-12"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Left Arrow */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-2.5 md:p-3 transition-all duration-300 hover:scale-110 hidden md:block"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={20} className="text-gray-800" />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-2.5 md:p-3 transition-all duration-300 hover:scale-110 hidden md:block"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={20} className="text-gray-800" />
                    </button>

                    {/* Spaces Carousel */}
                    <div className="overflow-hidden px-0 md:px-14">
                        <div
                            className="flex transition-transform duration-500 ease-in-out gap-0 md:gap-6"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                <div key={slideIndex} className="flex gap-0 md:gap-6 min-w-full">
                                    {premiumSpaces
                                        .slice(slideIndex * cardsPerView, (slideIndex + 1) * cardsPerView)
                                        .map((space) => (
                                            <div
                                                key={space.id}
                                                className="w-full md:flex-1 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group cursor-pointer"
                                            >
                                                {/* Space Image */}
                                                <div className="relative h-44 md:h-52 overflow-hidden">
                                                    <img
                                                        src={space.image}
                                                        alt={space.name}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                </div>

                                                {/* Space Details */}
                                                <div className="p-4 md:p-5">
                                                    {/* Space Name */}
                                                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                                                        {space.name}
                                                    </h3>

                                                    {/* Location */}
                                                    <div className="flex items-center gap-1.5 text-gray-600 mb-3">
                                                        <MapPin size={14} className="flex-shrink-0" />
                                                        <span className="text-xs md:text-sm">{space.location}</span>
                                                    </div>

                                                    {/* Price */}
                                                    <div className="pt-3 border-t border-gray-100">
                                                        <p className="text-lg md:text-xl font-bold text-blue-600">
                                                            {space.price}
                                                            <span className="text-xs md:text-sm text-gray-500 font-normal"> / {space.period}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* TRIBE Banner */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                            alt="TRIBE Community Space"
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/95 via-blue-50/85 to-blue-50/40"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 py-12 md:py-16 px-6 md:px-10 lg:px-12">
                        <div className="max-w-xl">
                            {/* TRIBE Logo/Text */}
                            <div className="mb-3 md:mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-gray-800 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-wider">
                                    TRIBE
                                </h3>
                            </div>

                            {/* Tagline */}
                            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800">
                                Where Luxury Meets Community
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PremiumColiving;
