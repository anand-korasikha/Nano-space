import React from 'react';

const colivingCities = [
    {
        name: 'Gurugram',
        tagline: 'Millennium City',
        image: 'https://images.unsplash.com/photo-1596276122653-651a3898309f?auto=format&fit=crop&w=600&q=80',
        id: 1
    },
    {
        name: 'Bangalore',
        tagline: "India's Silicon Valley",
        image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=600&q=80',
        id: 2
    },
    {
        name: 'Mumbai',
        tagline: 'A City of Dreams',
        image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=600&q=80',
        id: 3
    },
    {
        name: 'Hyderabad',
        tagline: 'A City of Pearls',
        image: 'https://images.unsplash.com/photo-1594191349377-bb894a4c57fb?auto=format&fit=crop&w=600&q=80',
        id: 4
    },
    {
        name: 'Pune',
        tagline: 'Queen of the Deccan',
        image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=600&q=80',
        id: 5
    },
    {
        name: 'Delhi',
        tagline: 'The Nation Capital',
        image: 'https://images.unsplash.com/photo-1570155308259-f40381fa5b18?auto=format&fit=crop&w=600&q=80',
        id: 6
    },
    {
        name: 'Noida',
        tagline: 'The Hitech City',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
        id: 7
    },
    {
        name: 'Ahmedabad',
        tagline: 'The Hitech City',
        image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=600&q=80',
        id: 8
    }
];

const TopColiving = () => {
    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="max-w-[90%] mx-auto px-4 md:px-8 lg:px-16">

                {/* Header */}
                <div className="text-center mb-8 md:mb-12 relative">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold inline-block relative z-10">
                        <span className="relative">
                            <span className="absolute -left-3 sm:-left-4 -top-3 sm:-top-4 w-10 sm:w-12 h-10 sm:h-12 bg-yellow-200 rounded-full -z-10 opacity-60"></span>
                            Top
                        </span> Coliving in India
                    </h2>
                    <div className="w-20 md:w-24 h-1 bg-blue-500 mx-auto mt-3 md:mt-4 rounded-full"></div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {colivingCities.map((city) => (
                        <div key={city.id} className="group relative h-44 sm:h-48 md:h-56 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            {/* Background Image */}
                            <img
                                src={city.image}
                                alt={city.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 text-center">
                                <h3 className="text-white font-bold text-lg sm:text-xl mb-1">{city.name}</h3>
                                <p className="text-gray-300 text-xs sm:text-sm font-medium">{city.tagline}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TopColiving;
