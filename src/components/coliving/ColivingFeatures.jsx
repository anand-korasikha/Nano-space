import React from 'react';
import { Home, Wifi, FileText, Utensils, Sparkles, Users } from 'lucide-react';

const ColivingFeatures = () => {
    const features = [
        {
            icon: Home,
            title: 'Fully Furnished',
            description: 'Live in a fully furnished space and unlock the benefits such as community, comfort and cost saving.',
            color: 'text-blue-600'
        },
        {
            icon: Wifi,
            title: 'High Speed WiFi',
            description: 'High-Speed Wifi. HDTVs everything you need to do your best work.',
            color: 'text-orange-600'
        },
        {
            icon: FileText,
            title: 'Flexible Lease',
            description: 'There is a presence of flexible lease terms and countless amenities. No need to worry, just live with glory.',
            color: 'text-yellow-600'
        },
        {
            icon: Sparkles,
            title: 'Regular Cleaning',
            description: 'We aim to provide the best experience. Thus regular cleaning activities are taken care of on a priority basis.',
            color: 'text-red-600'
        },
        {
            icon: Utensils,
            title: 'Kitchen',
            description: 'Lounge, kitchen, breakout rooms, and more. mix of both work tables and lounge seating.',
            color: 'text-orange-600'
        },
        {
            icon: Users,
            title: 'Community',
            description: 'We make sure you interact with wonderful people and build an amazing community. Live & enjoy your living journey with us.',
            color: 'text-yellow-600'
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="mx-6 md:mx-12 lg:mx-20">
                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group hover:bg-gray-50 p-6 rounded-xl transition-all duration-300"
                            >
                                {/* Icon */}
                                <div className="mb-4">
                                    <div className={`inline-flex p-3 rounded-lg bg-gray-50 group-hover:bg-white transition-colors duration-300`}>
                                        <Icon size={32} className={`${feature.color}`} />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 leading-relaxed">
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

export default ColivingFeatures;
