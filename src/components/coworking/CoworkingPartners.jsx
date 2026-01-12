import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CoworkingPartners = () => {
    const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
    const [currentSpaceIndex, setCurrentSpaceIndex] = useState(0);
    const [isPausedLogos, setIsPausedLogos] = useState(false);
    const [isPausedSpaces, setIsPausedSpaces] = useState(false);
    const [logosPerView, setLogosPerView] = useState(5);
    const [spacesPerView, setSpacesPerView] = useState(4);

    useEffect(() => {
        const updateCardsPerView = () => {
            if (window.innerWidth < 640) {
                setLogosPerView(2);
                setSpacesPerView(1);
            } else if (window.innerWidth < 1024) {
                setLogosPerView(3);
                setSpacesPerView(2);
            } else {
                setLogosPerView(5);
                setSpacesPerView(4);
            }
        };
        updateCardsPerView();
        window.addEventListener('resize', updateCardsPerView);
        return () => window.removeEventListener('resize', updateCardsPerView);
    }, []);

    // Partner logos
    const partners = [
        { name: 'Unispace', logo: 'https://via.placeholder.com/150x60/6366f1/ffffff?text=Unispace' },
        { name: 'Indiqube', logo: 'https://via.placeholder.com/150x60/1f2937/fbbf24?text=Indiqube' },
        { name: 'Attic', logo: 'https://via.placeholder.com/150x60/4f46e5/ffffff?text=Attic' },
        { name: 'Red Brick', logo: 'https://via.placeholder.com/150x60/dc2626/ffffff?text=Red+Brick' },
        { name: 'CoFiez', logo: 'https://via.placeholder.com/150x60/7c3aed/ffffff?text=CoFiez' },
        { name: '2Gethr', logo: 'https://via.placeholder.com/150x60/f59e0b/ffffff?text=2Gethr' },
        { name: 'WeWork', logo: 'https://via.placeholder.com/150x60/000000/ffffff?text=WeWork' },
        { name: 'Awfis', logo: 'https://via.placeholder.com/150x60/0891b2/ffffff?text=Awfis' }
    ];

    // Featured spaces
    const featuredSpaces = [
        {
            name: 'Quest',
            location: 'Mumbai',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            exclusive: true
        },
        {
            name: 'WeWork',
            location: 'Gurgaon',
            image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            exclusive: true
        },
        {
            name: 'Hustlehub',
            location: 'Bangalore',
            image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            exclusive: true
        },
        {
            name: 'Cowrks',
            location: 'Pune',
            image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            exclusive: false
        },
        {
            name: 'Regus',
            location: 'Delhi',
            image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            exclusive: true
        },
        {
            name: '91Springboard',
            location: 'Hyderabad',
            image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            exclusive: false
        }
    ];

    const totalLogoSlides = Math.ceil(partners.length / logosPerView);
    const totalSpaceSlides = Math.ceil(featuredSpaces.length / spacesPerView);

    // Auto-play for logos carousel
    useEffect(() => {
        if (!isPausedLogos) {
            const interval = setInterval(() => {
                setCurrentLogoIndex((prev) => (prev + 1) % totalLogoSlides);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isPausedLogos, totalLogoSlides]);

    // Auto-play for spaces carousel
    useEffect(() => {
        if (!isPausedSpaces) {
            const interval = setInterval(() => {
                setCurrentSpaceIndex((prev) => prev + 1);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isPausedSpaces]);

    const goToLogoSlide = (index) => {
        setCurrentLogoIndex(index);
    };

    const goToSpaceSlide = (index) => {
        setCurrentSpaceIndex(index);
    };

    const previousLogoSlide = () => {
        setCurrentLogoIndex((prev) => (prev - 1 + totalLogoSlides) % totalLogoSlides);
    };

    const nextLogoSlide = () => {
        setCurrentLogoIndex((prev) => (prev + 1) % totalLogoSlides);
    };

    const previousSpaceSlide = () => {
        setCurrentSpaceIndex((prev) => (prev - 1 + totalSpaceSlides) % totalSpaceSlides);
    };

    const nextSpaceSlide = () => {
        setCurrentSpaceIndex((prev) => (prev + 1) % totalSpaceSlides);
    };

    return (
        <section className="py-4 bg-white">
            <div className="mx-2 md:mx-4 lg:mx-8">
                {/* Section Header */}
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex-shrink-0"></div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        Our CoWorking Partners
                    </h2>
                </div>

                {/* Partner Logos Carousel */}
                <div
                    className="relative mb-6"
                    onMouseEnter={() => setIsPausedLogos(true)}
                    onMouseLeave={() => setIsPausedLogos(false)}
                >
                    {/* Left Arrow */}
                    <button
                        onClick={previousLogoSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 transition-all duration-300 hover:scale-110 hidden md:block"
                        aria-label="Previous logos"
                    >
                        <ChevronLeft size={20} className="text-gray-800" />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={nextLogoSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 transition-all duration-300 hover:scale-110 hidden md:block"
                        aria-label="Next logos"
                    >
                        <ChevronRight size={20} className="text-gray-800" />
                    </button>

                    {/* Logos Container */}
                    <div className="overflow-hidden px-0 md:px-8">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentLogoIndex * 100}%)` }}
                        >
                            {Array.from({ length: totalLogoSlides }).map((_, slideIndex) => (
                                <div key={slideIndex} className="flex gap-2 md:gap-4 min-w-full justify-center">
                                    {partners
                                        .slice(slideIndex * logosPerView, (slideIndex + 1) * logosPerView)
                                        .map((partner, index) => (
                                            <div
                                                key={index}
                                                className="flex-shrink-0 bg-white p-2 rounded-lg hover:shadow-md transition-shadow duration-300"
                                            >
                                                <img
                                                    src={partner.logo}
                                                    alt={partner.name}
                                                    className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                                />
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Featured Spaces Carousel */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsPausedSpaces(true)}
                    onMouseLeave={() => setIsPausedSpaces(false)}
                >
                    {/* Left Arrow */}
                    <button
                        onClick={previousSpaceSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 hidden md:block"
                        aria-label="Previous spaces"
                    >
                        <ChevronLeft size={24} className="text-gray-800" />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={nextSpaceSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 hidden md:block"
                        aria-label="Next spaces"
                    >
                        <ChevronRight size={24} className="text-gray-800" />
                    </button>

                    {/* Spaces Container */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-linear"
                            style={{ 
                                transform: `translateX(-${(currentSpaceIndex % featuredSpaces.length) * (100 / spacesPerView)}%)`,
                                gap: spacesPerView > 1 ? '12px' : '0px'
                            }}
                        >
                            {[...featuredSpaces, ...featuredSpaces, ...featuredSpaces, ...featuredSpaces, ...featuredSpaces].map((space, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0"
                                    style={{ width: spacesPerView > 1 ? `calc((100% - ${(spacesPerView - 1) * 12}px) / ${spacesPerView})` : '100%' }}
                                >
                                            <div
                                                key={index}
                                                className="w-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group h-[240px]"
                                            >
                                                {/* Exclusive Badge */}
                                                {space.exclusive && (
                                                    <div className="absolute top-2 left-2 z-10 bg-yellow-400 text-gray-900 px-3 py-0.5 rounded-full text-xs font-semibold shadow-lg">
                                                        NanoSpace Exclusive
                                                    </div>
                                                )}

                                                {/* Space Image */}
                                                <div className="relative h-full overflow-hidden">
                                                    <img
                                                        src={space.image}
                                                        alt={space.name}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                                </div>

                                                {/* Space Info */}
                                                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                                                    <h3 className="text-lg font-bold mb-0.5">{space.name}</h3>
                                                    <p className="text-xs text-gray-200">{space.location}</p>
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

export default CoworkingPartners;
