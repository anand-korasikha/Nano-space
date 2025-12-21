import React from 'react';

const PerfectCoworkingSpace = () => {
    const cities = [
        'Bangalore', 'Hyderabad', 'Mumbai', 'Pune', 'Delhi',
        'Noida', 'Gurgaon', '& More...'
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="mx-6 md:mx-12 lg:mx-20">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-50 to-white shadow-lg">
                    <div className="grid md:grid-cols-2 items-center">
                        {/* Left Content */}
                        <div className="p-8 md:p-12 lg:p-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Get the Perfect Coworking Space in your City
                            </h2>

                            {/* Cities List */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {cities.map((city, index) => (
                                    <React.Fragment key={city}>
                                        <span className="text-gray-700 font-medium">
                                            {city}
                                        </span>
                                        {index < cities.length - 1 && (
                                            <span className="text-gray-400">|</span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <button className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl">
                                Enquire Now
                            </button>
                        </div>

                        {/* Right Image */}
                        <div className="relative h-64 md:h-full min-h-[300px]">
                            <img
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                                alt="Coworking space"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-transparent to-transparent md:from-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PerfectCoworkingSpace;
