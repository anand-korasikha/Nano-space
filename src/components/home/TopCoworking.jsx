import React from 'react';

const cities = [
    {
        name: 'Gurugram',
        tagline: 'Millennium City',
        image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=600&q=80',
        id: 1
    },
    {
        name: 'Hyderabad',
        tagline: 'A City of Pearls',
        image: 'https://images.unsplash.com/photo-1572455857216-db59286d9a0d?auto=format&fit=crop&w=600&q=80',
        id: 2
    },
    {
        name: 'Bangalore',
        tagline: "India's Silicon Valley",
        image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80',
        id: 3
    },
    {
        name: 'Mumbai',
        tagline: 'A City of Dreams',
        image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=600&q=80',
        id: 4
    },
    {
        name: 'Pune',
        tagline: 'Queen of the Deccan',
        image: 'https://images.unsplash.com/photo-1565538059080-b74a5892e622?auto=format&fit=crop&w=600&q=80',
        id: 5
    },
    {
        name: 'Delhi',
        tagline: 'The Nation Capital',
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80',
        id: 6
    },
    {
        name: 'Noida',
        tagline: 'The Hitech City',
        image: 'https://images.unsplash.com/photo-1570155308259-f40381fa5b18?auto=format&fit=crop&w=600&q=80',
        id: 7
    },
    {
        name: 'Lucknow',
        tagline: 'The City of Nawabs',
        image: 'https://images.unsplash.com/photo-1591465243170-179344449830?auto=format&fit=crop&w=600&q=80',
        id: 8
    }
];

const TopCoworking = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-[90%] mx-auto px-4 md:px-8 lg:px-16">

                {/* Header */}
                <div className="text-center mb-12 relative">
                    <h2 className="text-3xl md:text-4xl font-bold inline-block relative z-10">
                        <span className="relative">
                            <span className="absolute -left-4 -top-4 w-12 h-12 bg-yellow-200 rounded-full -z-10 opacity-60"></span>
                            Top
                        </span> Coworking In India
                    </h2>
                    <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cities.map((city) => (
                        <div key={city.id} className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            {/* Background Image */}
                            <img
                                src={city.image}
                                alt={city.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-4 text-center">
                                <h3 className="text-white font-bold text-xl mb-1">{city.name}</h3>
                                <p className="text-gray-300 text-sm font-medium">{city.tagline}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TopCoworking;
