import React from 'react';
import { CheckCircle2, Info, ArrowRight } from 'lucide-react';

const VirtualOfficePlans = ({ city }) => {
    // Default plans if not provided in city data
    const defaultPlans = [
        {
            id: 1,
            title: "Company Registration",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            features: [
                "Hassle-free company setup with expert guidance",
                "Get a professional business address for registration",
                "Fast & seamless documentation for smooth approval"
            ],
            documentsLink: "#documents",
            quoteLink: "#contact"
        },
        {
            id: 2,
            title: "GST Registration",
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            features: [
                "Get a GST approved virtual office address",
                "Quick & easy GST registration with minimal paperwork",
                "Support for multi-state GST registration"
            ],
            documentsLink: "#documents",
            quoteLink: "#contact"
        },
        {
            id: 3,
            title: "Business Address",
            image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            features: [
                "Premium virtual office address in prime locations",
                "Enhance credibility with a registered business address",
                "Ideal for startups, freelancers & remote businesses"
            ],
            documentsLink: "#documents",
            quoteLink: "#contact"
        }
    ];

    const plans = city?.plans || defaultPlans;

    const handleViewDocuments = (e) => {
        e.preventDefault();
        // Scroll to documents section or open modal
        console.log('View documents clicked');
    };

    const handleGetQuote = (e) => {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 inline-block">
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-yellow-200 px-3 py-1 rounded">Virtual Office Plans</span>
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></span>
                        </span>
                    </h2>
                </div>

                {/* Plans Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-blue-500"
                        >
                            {/* Plan Image with Overlay */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={plan.image}
                                    alt={plan.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>

                                {/* Plan Title */}
                                <div className="absolute top-4 left-4 right-4">
                                    <h3 className="text-xl font-bold text-white drop-shadow-lg">
                                        {plan.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Plan Content */}
                            <div className="p-5 space-y-3">
                                {/* Features List */}
                                <ul className="space-y-2">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle2
                                                size={20}
                                                className="flex-shrink-0 text-green-600 mt-0.5"
                                            />
                                            <span className="text-gray-700 text-sm leading-relaxed">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Action Buttons */}
                                <div className="pt-3 space-y-2">
                                    {/* View Documents Link */}
                                    <a
                                        href={plan.documentsLink}
                                        onClick={handleViewDocuments}
                                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors group/link"
                                    >
                                        <Info size={16} />
                                        View Documents
                                        <ArrowRight
                                            size={14}
                                            className="group-hover/link:translate-x-1 transition-transform duration-200"
                                        />
                                    </a>

                                    {/* Get Quote Button */}
                                    <button
                                        onClick={handleGetQuote}
                                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        Get Quote
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VirtualOfficePlans;
