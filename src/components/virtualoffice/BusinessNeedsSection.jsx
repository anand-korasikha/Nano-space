import React from 'react';
import { Building2, ShoppingCart, Users, Briefcase, ArrowRight } from 'lucide-react';

const BusinessNeedsSection = ({ city }) => {
    // Default business categories data
    const businessCategories = [
        {
            id: 1,
            icon: Building2,
            title: "Startups & SMEs",
            description: "Get a professional address, build credibility, and register your business without the high costs of a physical office.",
            color: "blue",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            linkColor: "text-blue-600 hover:text-blue-700"
        },
        {
            id: 2,
            icon: ShoppingCart,
            title: "E-commerce & Online Sellers",
            description: "Secure GST registration (APOB/PPOB) and keep your home address private while boosting customer trust.",
            color: "blue",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            linkColor: "text-blue-600 hover:text-blue-700"
        },
        {
            id: 3,
            icon: Users,
            title: "Freelancers & Remote Teams",
            description: "Maintain a professional presence with mail handling, client meetings, and workspace access when needed.",
            color: "blue",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            linkColor: "text-blue-600 hover:text-blue-700"
        },
        {
            id: 4,
            icon: Briefcase,
            title: "B2B & B2C Service Providers",
            description: "Establish your brand in new cities with a virtual office, ensuring compliance and local market reach.",
            color: "blue",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            linkColor: "text-blue-600 hover:text-blue-700"
        }
    ];

    const handleEnquireClick = (e) => {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 inline-block">
                        Does Your Business Need A{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-blue-100 px-2 rounded">Virtual Office?</span>
                        </span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Illustration */}
                    <div className="hidden lg:flex justify-center items-center">
                        <div className="relative">
                            {/* Illustration placeholder - you can replace with actual image */}
                            <div className="w-full max-w-md">
                                <img
                                    src="https://illustrations.popsy.co/amber/remote-work.svg"
                                    alt="Business professional with office"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Business Categories Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {businessCategories.map((category) => {
                            const IconComponent = category.icon;
                            return (
                                <div
                                    key={category.id}
                                    className={`${category.bgColor} rounded-xl p-6 hover:shadow-lg transition-all duration-300 group border border-gray-100`}
                                >
                                    {/* Icon */}
                                    <div className={`w-12 h-12 ${category.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent size={48} strokeWidth={1.5} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                                        {category.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                                        {category.description}
                                    </p>

                                    {/* Enquire Link */}
                                    <a
                                        href="#contact"
                                        onClick={handleEnquireClick}
                                        className={`inline-flex items-center gap-1 ${category.linkColor} font-semibold text-sm group/link transition-colors`}
                                    >
                                        Enquire Now
                                        <ArrowRight
                                            size={16}
                                            className="group-hover/link:translate-x-1 transition-transform duration-200"
                                        />
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BusinessNeedsSection;
