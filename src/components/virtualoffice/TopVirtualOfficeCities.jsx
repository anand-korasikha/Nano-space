import React from 'react';
import { MapPin } from 'lucide-react';

const TopVirtualOfficeCities = () => {
    // Hyderabad as the hero city (large card)
    const heroCity = {
        name: 'Hyderabad',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    };

    // Other cities in grid
    const cities = [
        {
            name: 'Gurgaon',
            image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Noida',
            image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Pune',
            image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Delhi',
            image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Chennai',
            image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Noida',
            image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Bangalore',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Jaipur',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Kolkata',
            image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Mumbai',
            image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Ahmedabad',
            image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Chandigarh',
            image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Kochi',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            name: 'Indore',
            image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    ];

    return (
        <section className="relative py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-12">
                    <div className="inline-flex items-center justify-center relative">
                        {/* Yellow Circle Accent */}
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-yellow-400 rounded-full -z-10"></div>

                        <h2 className="relative text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 px-4">
                            Top Virtual Office Cities in India
                        </h2>
                    </div>
                </div>

                {/* Masonry Grid Layout */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {/* Hero Card - Hyderabad (Large, spans 2 rows and 2 columns on desktop) */}
                    <div className="col-span-2 row-span-2">
                        <div className="group relative h-full min-h-[320px] md:min-h-[400px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
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

                            {/* Hover Effect Border */}
                            <div className="absolute inset-0 border-4 border-transparent group-hover:border-blue-500 transition-all duration-300 rounded-xl pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Grid Cards - Other Cities */}
                    {cities.map((city, index) => (
                        <div
                            key={`${city.name}-${index}`}
                            className={`${index === 0 || index === 1 ? 'col-span-1 row-span-1' :
                                index === 2 ? 'col-span-2 row-span-1' :
                                    'col-span-1 row-span-1'
                                }`}
                        >
                            <div className="group relative h-full min-h-[150px] md:min-h-[190px] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer">
                                {/* Image */}
                                <img
                                    src={city.image}
                                    alt={city.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                                {/* City Label */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                                    <div className="flex items-center gap-1.5 text-white">
                                        <MapPin size={16} className="flex-shrink-0" strokeWidth={2.5} />
                                        <h3 className="text-base md:text-lg font-bold tracking-tight">{city.name}</h3>
                                    </div>
                                </div>

                                {/* Hover Effect Border */}
                                <div className="absolute inset-0 border-4 border-transparent group-hover:border-blue-500 transition-all duration-300 rounded-xl pointer-events-none"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopVirtualOfficeCities;
