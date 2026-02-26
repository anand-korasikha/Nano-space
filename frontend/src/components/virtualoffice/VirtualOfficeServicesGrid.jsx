import React from 'react';

const VirtualOfficeServicesGrid = () => {
    const services = [
        {
            id: 1,
            title: 'Company Registration',
            image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 2,
            title: 'GST Registration',
            image: 'https://images.unsplash.com/photo-1554224311-beee4f0d696c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 3,
            title: 'Business Address',
            image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 4,
            title: 'Mailing Address',
            image: 'https://images.unsplash.com/photo-1607827448387-a67db1383b59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 5,
            title: 'Reception Services',
            image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 6,
            title: 'Meeting Room',
            image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    ];

    return (
        <section className="py-8 md:py-12 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-10">
                    <div className="inline-flex items-center justify-center relative">
                        {/* Yellow Circle Accent */}
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-yellow-400 rounded-full -z-10"></div>

                        <h2 className="relative text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 px-4">
                            Virtual Office Services We Offer to You
                        </h2>
                    </div>
                    {/* Blue underline accent */}
                    <div className="flex justify-center mt-2">
                        <div className="w-12 h-0.5 bg-blue-600 rounded-full"></div>
                    </div>
                </div>

                {/* Services Grid - 2 rows x 3 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group relative h-48 md:h-56 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
                        >
                            {/* Image */}
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                            {/* Service Title */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                                    {service.title}
                                </h3>
                            </div>

                            {/* Hover Effect Border */}
                            <div className="absolute inset-0 border-4 border-transparent group-hover:border-blue-500 transition-all duration-300 rounded-xl pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VirtualOfficeServicesGrid;
