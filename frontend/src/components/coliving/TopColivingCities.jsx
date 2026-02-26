import React from 'react';
import { MapPin } from 'lucide-react';

const TopColivingCities = () => {
    // Hero city - Hyderabad (large left card - HIGHLIGHTED)
    // Hero city - Hyderabad (large left card - HIGHLIGHTED)
    const heroCity = {
        name: 'Hyderabad',
        image: '/images/hero/coliving-1.jpg'
    };

    // Grid cities in exact order from reference image
    // Top row: Bangalore, Gurugram, Noida
    // Bottom row: Delhi, Pune, Mumbai
    const gridCities = [
        {
            name: 'Bangalore',
            image: '/images/latestimg/top11.webp'
        },
        {
            name: 'Gurugram',
            image: '/images/hero/coliving-3.jpg'
        },
        {
            name: 'Noida',
            image: '/images/hero/coliving-4.jpg'
        },
        {
            name: 'Delhi',
            image: '/images/latestimg/top10.webp'
        },
        {
            name: 'Pune',
            image: '/images/latestimg/top9.webp'
        },
        {
            name: 'Mumbai',
            image: '/images/latestimg/top8.webp'
        }
    ];


    return (
        <section className="relative py-12 md:py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header with Yellow Circle Accent */}
                <div className="relative mb-8 md:mb-10 text-center">
                    <div className="inline-flex items-center justify-center relative">
                        {/* Yellow Circle Accent - positioned behind "Top" */}
                        <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-yellow-400 rounded-full -z-10"></div>

                        <h2 className="relative text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 px-4">
                            Top Coliving Cities in India
                        </h2>
                    </div>
                </div>

                {/* Exact Layout: Hyderabad (left - HIGHLIGHTED) + 2x3 Grid (right) */}
                <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
                    {/* Hero Card - Hyderabad (Large Vertical Rectangle on Left - HIGHLIGHTED) */}
                    <div className="lg:w-[40%] flex-shrink-0">
                        <div className="group relative h-[350px] lg:h-[480px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                            {/* Image */}
                            <img
                                src={heroCity.image}
                                alt={heroCity.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                            {/* City Label */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                                <div className="flex items-center gap-2 text-white">
                                    <MapPin size={20} className="flex-shrink-0" strokeWidth={2.5} />
                                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{heroCity.name}</h3>
                                </div>
                            </div>

                            {/* Hover Effect Border - BLUE THEME */}
                            <div className="absolute inset-0 border-4 border-transparent group-hover:border-blue-500 transition-all duration-300 rounded-2xl pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Grid Cards - 2x3 Layout (Right Side) */}
                    <div className="lg:flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        {gridCities.map((city, index) => (
                            <div key={city.name} className="w-full">
                                <div className="group relative h-[220px] lg:h-[234px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                                    {/* Image */}
                                    <img
                                        src={city.image}
                                        alt={city.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                                    {/* City Label */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                                        <div className="flex items-center gap-2 text-white">
                                            <MapPin size={18} className="flex-shrink-0" strokeWidth={2.5} />
                                            <h3 className="text-lg md:text-xl font-bold tracking-tight">{city.name}</h3>
                                        </div>
                                    </div>

                                    {/* Hover Effect Border - BLUE THEME */}
                                    <div className="absolute inset-0 border-4 border-transparent group-hover:border-blue-500 transition-all duration-300 rounded-2xl pointer-events-none"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopColivingCities;
