import React from 'react';

const colivingCities = [
    {
        name: 'Gurugram',
        tagline: 'Millennium City',
        image: '/images/latestimg/top15.webp',
        id: 1
    },
    {
        name: 'Bangalore',
        tagline: "India's Silicon Valley",
        image: '/images/latestimg/top16.webp',
        id: 2
    },
    {
        name: 'Mumbai',
        tagline: 'A City of Dreams',
        image: '/images/latestimg/top17.webp',
        id: 3
    },
    {
        name: 'Hyderabad',
        tagline: 'A City of Pearls',
        image: '/images/latestimg/top18.webp',
        id: 4
    },
    {
        name: 'Pune',
        tagline: 'Queen of the Deccan',
        image: '/images/latestimg/top19.webp',
        id: 5
    },
    {
        name: 'Delhi',
        tagline: 'The Nation Capital',
        image: '/images/latestimg/top20.webp',
        id: 6
    },
    {
        name: 'Noida',
        tagline: 'The Hitech City',
        image: '/images/latestimg/top21.webp',
        id: 7
    },
    {
        name: 'Ahmedabad',
        tagline: 'The Hitech City',
        image: '/images/latestimg/top22.webp',
        id: 8
    }
];

const TopColiving = () => {
    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="max-w-[90%] mx-auto px-4 md:px-8 lg:px-16">

                {/* Header */}
                <div className="text-center mb-10 md:mb-16 relative">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold inline-block relative z-10 text-gray-900">
                        <span className="relative">
                            <span className="absolute -left-2 sm:-left-4 -top-2 sm:-top-4 w-10 sm:w-12 h-10 sm:h-12 bg-yellow-200 rounded-full -z-10 opacity-70"></span>
                            Top
                        </span> Coliving in India
                    </h2>
                    <div className="w-16 md:w-24 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full shadow-sm"></div>
                    <p className="text-gray-500 mt-4 text-sm sm:text-base max-w-xl mx-auto">
                        Discover vibrant shared living communities in India's most popular cities
                    </p>
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
