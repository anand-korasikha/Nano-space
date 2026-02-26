import React from 'react';

const ColivingBenefits = () => {
    const benefits = [
        {
            id: 1,
            title: 'Nutritious and Delicious Meals',
            description: 'Our kitchens are fully equipped for your late-night snack cravings.',
            image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            position: 'left'
        },
        {
            id: 2,
            title: 'Community Gatherings',
            description: 'We host engaging events every weekend at our flagship Community Spaces',
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            position: 'right'
        },
        {
            id: 3,
            title: 'Entertainment zone',
            description: 'Dedicated entertainment zones designed for the gamer and performer in you.',
            image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            position: 'left'
        }
    ];

    return (
        <section className="relative py-8 md:py-12 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                        Coliving
                    </h2>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-1">
                        with <span className="text-blue-600">Nano Space</span>
                    </p>
                </div>


                {/* Benefits Grid with Zigzag Layout */}
                <div className="relative">
                    {/* Vertical Dashed Line (Desktop only) */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-gray-300 -translate-x-1/2"></div>

                    <div className="space-y-8 md:space-y-10">
                        {benefits.map((benefit, index) => (
                            <div
                                key={benefit.id}
                                className={`flex flex-col lg:flex-row items-center gap-4 md:gap-6 ${benefit.position === 'right' ? 'lg:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Image Card */}
                                <div className={`w-full lg:w-1/2 ${benefit.position === 'left' ? 'lg:pr-8' : 'lg:pl-8'}`}>
                                    <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                                        <img
                                            src={benefit.image}
                                            alt={benefit.title}
                                            className="w-full h-[220px] md:h-[240px] object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className={`w-full lg:w-1/2 ${benefit.position === 'left' ? 'lg:pl-8' : 'lg:pr-8'}`}>
                                    <div className="bg-white rounded-xl p-5 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                            {benefit.description}
                                        </p>

                                        {/* Decorative element */}
                                        <div className="mt-3 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ColivingBenefits;
