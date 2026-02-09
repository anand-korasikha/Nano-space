import React from 'react';
import {
    Wifi,
    Coffee,
    Users,
    Printer,
    Utensils,
    Car
} from 'lucide-react';

const CoworkingFeatures = () => {
    const features = [
        {
            icon: Wifi,
            title: "High Speed WiFi",
            description: "High-Speed Wifi, HDTVs everything you need to do your best work.",
            color: "#F59E0B"
        },
        {
            icon: Users,
            title: "Comfy Workstatio",
            description: "Connect with other people and share your skills for better and quick growth.",
            color: "#F59E0B"
        },
        {
            icon: Coffee,
            title: "Meeting Rooms",
            description: "Come up with great ideas and engage in valuable discussions in meeting rooms.",
            color: "#F59E0B"
        },
        {
            icon: Printer,
            title: "Printer",
            description: "Printing and scanning facilities available without any extra cost.",
            color: "#F59E0B"
        },
        {
            icon: Utensils,
            title: "Pantry",
            description: "Lounge, kitchen, breakout rooms, and more, mix of both work tables and lounge seating.",
            color: "#F59E0B"
        },
        {
            icon: Car,
            title: "Parking",
            description: "Avoid morning hassle with easy and convenient parking area availability.",
            color: "#F59E0B"
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                {/* Features Grid - Card View */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="relative flex flex-col items-start p-5 md:p-6 bg-white border-2 border-transparent rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden"
                                style={{ background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6) border-box' }}
                            >
                                {/* Icon */}
                                <div className="mb-4 p-3 bg-orange-50 rounded-lg group-hover:bg-orange-100 group-hover:scale-110 transition-all duration-300">
                                    <Icon
                                        size={32}
                                        style={{ color: feature.color }}
                                        strokeWidth={1.5}
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CoworkingFeatures;
