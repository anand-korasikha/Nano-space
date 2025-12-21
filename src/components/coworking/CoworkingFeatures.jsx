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
            title: "Comfy Workstation",
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
                {/* Features Grid - 6 cards in 2 rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="flex flex-col items-start"
                            >
                                {/* Icon */}
                                <div className="mb-4">
                                    <Icon
                                        size={40}
                                        style={{ color: feature.color }}
                                        strokeWidth={1.5}
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
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
