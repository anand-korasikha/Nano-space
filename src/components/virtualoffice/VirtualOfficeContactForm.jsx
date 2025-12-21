import React, { useState } from 'react';
import { Building2, FileText, MapPin, Users } from 'lucide-react';

const VirtualOfficeContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const services = [
        {
            icon: Building2,
            title: 'Company Registration',
            description: 'Register your company with ease'
        },
        {
            icon: FileText,
            title: 'GST Registration',
            description: 'Get your GST number quickly'
        },
        {
            icon: MapPin,
            title: 'Business Address',
            description: 'Premium business locations'
        },
        {
            icon: Users,
            title: 'Meeting Room Access',
            description: 'Professional meeting spaces'
        }
    ];

    return (
        <section className="relative py-8 md:py-12 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center relative mb-3">
                        {/* Red Circle Accent */}
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-red-500 rounded-full -z-10"></div>

                        <h2 className="relative text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 px-4">
                            Connect with <span className="text-blue-600">Virtual Office</span> Expert
                        </h2>
                    </div>
                </div>

                {/* Main Content Container with Blue Cityscape Background */}
                <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl overflow-hidden shadow-xl">
                    {/* Cityscape SVG Background */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 opacity-30">
                        <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="none">
                            {/* India Gate */}
                            <g transform="translate(500, 80)">
                                <rect x="80" y="100" width="40" height="120" fill="#1E40AF" />
                                <polygon points="70,100 130,100 100,60" fill="#1E40AF" />
                                <circle cx="100" cy="80" r="15" fill="#1E40AF" />
                                <rect x="90" y="150" width="20" height="70" fill="#1E3A8A" />
                            </g>

                            {/* Buildings */}
                            <rect x="50" y="150" width="80" height="150" fill="#1E40AF" />
                            <rect x="150" y="120" width="60" height="180" fill="#2563EB" />
                            <rect x="230" y="140" width="70" height="160" fill="#1E40AF" />
                            <rect x="320" y="100" width="90" height="200" fill="#2563EB" />

                            {/* Taj Mahal inspired dome */}
                            <g transform="translate(700, 100)">
                                <rect x="60" y="120" width="80" height="100" fill="#1E40AF" />
                                <ellipse cx="100" cy="120" rx="50" ry="40" fill="#2563EB" />
                                <circle cx="100" cy="100" r="8" fill="#1E40AF" />
                            </g>

                            {/* More buildings */}
                            <rect x="850" y="130" width="75" height="170" fill="#1E40AF" />
                            <rect x="940" y="110" width="85" height="190" fill="#2563EB" />
                            <rect x="1040" y="145" width="65" height="155" fill="#1E40AF" />
                            <rect x="1120" y="125" width="70" height="175" fill="#2563EB" />

                            {/* Windows on buildings */}
                            <g fill="#1E3A8A" opacity="0.6">
                                <rect x="60" y="160" width="15" height="15" />
                                <rect x="85" y="160" width="15" height="15" />
                                <rect x="60" y="185" width="15" height="15" />
                                <rect x="85" y="185" width="15" height="15" />
                            </g>
                        </svg>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 md:p-8">
                        {/* Left Side - Services */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="bg-red-100 w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                                            <service.icon className="w-5 h-5 text-red-600" strokeWidth={2} />
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-sm mb-1">
                                            {service.title}
                                        </h3>
                                        <p className="text-xs text-gray-600">
                                            {service.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 md:p-6 shadow-lg">
                            <form onSubmit={handleSubmit} className="space-y-3">
                                {/* Name Input */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Your Name*
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            👤
                                        </span>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Email*
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            ✉️
                                        </span>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Phone Input */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        +91 - Phone*
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            📞
                                        </span>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter your phone number"
                                            required
                                            pattern="[0-9]{10}"
                                            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm"
                                >
                                    Submit
                                </button>
                            </form>

                            {/* Contact Info */}
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-600">
                                    <a href="tel:93115 28043" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                                        <span>📞</span>
                                        <span className="font-medium">93115 28043</span>
                                    </a>
                                    <span className="text-gray-300">|</span>
                                    <a href="mailto:hello@cofynd.com" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                                        <span>✉️</span>
                                        <span className="font-medium">hello@cofynd.com</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VirtualOfficeContactForm;
