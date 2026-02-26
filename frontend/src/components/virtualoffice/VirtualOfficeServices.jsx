import React from 'react';
import { Building2, FileText, MapPin, Mail, Users, Video } from 'lucide-react';

const VirtualOfficeServices = () => {
    const services = [
        {
            id: 1,
            icon: Building2,
            title: 'Company Registration',
            description: 'Register your company in your desired city without having any physical address there.',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            id: 2,
            icon: FileText,
            title: 'GST Registration',
            description: 'Get a GST number for your company with all documents like NOC, Gir-page, Electricity Bill & more.',
            color: 'text-red-600',
            bgColor: 'bg-red-50'
        },
        {
            id: 3,
            icon: MapPin,
            title: 'Business Address',
            description: 'Get your business address in the prestigious location and mention it on your visiting card and website.',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            id: 4,
            icon: Mail,
            title: 'Mailing Address',
            description: 'Collect all couriers at your virtual office address and forwarded them to the address given by you.',
            color: 'text-red-600',
            bgColor: 'bg-red-50'
        },
        {
            id: 5,
            icon: Users,
            title: 'Reception Services',
            description: 'Get reception services for client handling, guest greeting and customer support.',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            id: 6,
            icon: Video,
            title: 'Meeting Room',
            description: 'Get free complimentary hours of meeting rooms every month for client meetings.',
            color: 'text-red-600',
            bgColor: 'bg-red-50'
        }
    ];

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.id}
                                className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                            >
                                {/* Icon */}
                                <div className={`w-14 h-14 ${service.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon size={28} className={service.color} strokeWidth={2} />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default VirtualOfficeServices;
