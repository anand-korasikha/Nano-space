import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const WorkspaceOptions = () => {
    const workspaceTypes = [
        {
            name: "Hot Desk",
            tagline: "Flexibility First",
            price: "₹5,999",
            period: "per month",
            description: "Perfect for freelancers and remote workers who need a professional space without commitment.",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            features: [
                "Access to any open seat",
                "High-speed WiFi",
                "Meeting room credits (4 hrs/month)",
                "Printing facilities",
                "Complimentary beverages",
                "Community events access"
            ],
            popular: false,
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            name: "Dedicated Desk",
            tagline: "Your Personal Space",
            price: "₹9,999",
            period: "per month",
            description: "Your own desk in a shared office. Leave your monitor, plants, and make it truly yours.",
            image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            features: [
                "Reserved desk with nameplate",
                "Personal storage locker",
                "High-speed WiFi",
                "Meeting room credits (8 hrs/month)",
                "24/7 access",
                "Mail handling service",
                "Priority support"
            ],
            popular: true,
            gradient: "from-purple-500 to-pink-500"
        },
        {
            name: "Private Office",
            tagline: "Team Headquarters",
            price: "₹24,999",
            period: "per month",
            description: "Fully furnished private offices for teams of 1-100. Complete privacy with all amenities.",
            image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            features: [
                "Lockable private office",
                "Customizable layout",
                "Dedicated phone line",
                "Unlimited meeting rooms",
                "24/7 access",
                "Mail & package handling",
                "Dedicated support manager",
                "Custom branding options"
            ],
            popular: false,
            gradient: "from-orange-500 to-red-500"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Choose Your <span className="text-blue-600">Workspace</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        From flexible hot desks to private offices, find the perfect workspace solution for your needs
                    </p>
                </div>

                {/* Workspace Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {workspaceTypes.map((workspace, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${workspace.popular ? 'border-purple-500 scale-105' : 'border-gray-100 hover:border-blue-200'
                                }`}
                        >
                            {/* Popular Badge */}
                            {workspace.popular && (
                                <div className="absolute top-6 right-6 z-10">
                                    <div className={`bg-gradient-to-r ${workspace.gradient} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={workspace.image}
                                    alt={workspace.name}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${workspace.gradient} opacity-20`}></div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {/* Header */}
                                <div className="mb-6">
                                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                        {workspace.tagline}
                                    </p>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        {workspace.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        {workspace.description}
                                    </p>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-2">
                                        <span className={`text-4xl font-bold bg-gradient-to-r ${workspace.gradient} bg-clip-text text-transparent`}>
                                            {workspace.price}
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            {workspace.period}
                                        </span>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-3 mb-8">
                                    {workspace.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${workspace.gradient} flex items-center justify-center mt-0.5`}>
                                                <Check size={14} className="text-white" strokeWidth={3} />
                                            </div>
                                            <span className="text-gray-700 text-sm">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <button
                                    className={`w-full bg-gradient-to-r ${workspace.gradient} text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group`}
                                >
                                    Get Started
                                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Note */}
                <div className="mt-16 text-center">
                    <p className="text-gray-600 mb-4">
                        All plans include access to our community events, networking sessions, and workshops
                    </p>
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-2 group">
                        Compare all plans in detail
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default WorkspaceOptions;
