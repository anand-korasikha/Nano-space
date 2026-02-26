import React from 'react';
import { Briefcase, Globe, MapPinned, FileCheck } from 'lucide-react';

const VirtualOfficeBenefits = () => {
    const benefits = [
        {
            id: 1,
            icon: Briefcase,
            title: 'Get a premium address and save up to 90%',
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50'
        },
        {
            id: 2,
            icon: Globe,
            title: 'Partner with a Reliable brand',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            id: 3,
            icon: MapPinned,
            title: 'Choose from various premium locations',
            color: 'text-red-600',
            bgColor: 'bg-red-50'
        },
        {
            id: 4,
            icon: FileCheck,
            title: 'Register in under 72 hours',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        }
    ];

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-12">
                    <div className="inline-flex items-center justify-center relative">
                        {/* Yellow Circle Accent */}
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-yellow-400 rounded-full -z-10"></div>

                        <h2 className="relative text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 px-4">
                            Benefits of Virtual Office Spaces
                        </h2>
                    </div>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;
                        return (
                            <div
                                key={benefit.id}
                                className="flex flex-col items-center text-center group"
                            >
                                {/* Icon */}
                                <div className={`w-16 h-16 md:w-20 md:h-20 ${benefit.bgColor} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon size={32} className={benefit.color} strokeWidth={2} />
                                </div>

                                {/* Title */}
                                <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-snug max-w-xs">
                                    {benefit.title}
                                </h3>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default VirtualOfficeBenefits;
