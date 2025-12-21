import React from 'react';
import { Phone, Mail, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const CoworkingFooterBanner = () => {
    return (
        <section className="bg-gradient-to-r from-yellow-400 to-orange-400 py-12">
            <div className="mx-6 md:mx-12 lg:mx-20">
                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {/* Left Column - Brand Info */}
                    <div className="md:col-span-2">
                        {/* Logo/Brand */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-1 h-12 bg-gray-900"></div>
                                <h3 className="text-3xl font-bold text-gray-900">NANOSPACE</h3>
                            </div>
                            <p className="text-gray-800 font-medium mb-3">
                                Fynd the right space, Globally!
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-gray-800 mb-4 leading-relaxed max-w-2xl">
                            NanoSpace is India's #1 online platform for searching and booking Coworking, Coliving, Private Offices & Virtual Offices across India.
                            Choose from 100,000+ verified fully furnished spaces to Work & Live.
                        </p>
                        <p className="text-gray-800 font-medium mb-6">
                            Space Search Made Simple with NanoSpace!
                        </p>

                        {/* Navigation Links */}
                        <div className="flex flex-wrap gap-3 text-sm text-gray-800 mb-4">
                            <a href="#" className="hover:text-gray-900 font-medium transition-colors">Coworking Space</a>
                            <span>•</span>
                            <a href="#" className="hover:text-gray-900 font-medium transition-colors">Coliving Space</a>
                            <span>•</span>
                            <a href="#" className="hover:text-gray-900 font-medium transition-colors">Virtual Space</a>
                            <span>•</span>
                            <a href="#" className="hover:text-gray-900 font-medium transition-colors">Enterprise Solutions</a>
                            <span>•</span>
                            <a href="#" className="hover:text-gray-900 font-medium transition-colors">List Your Space</a>
                        </div>

                        {/* Footer Links */}
                        <div className="flex flex-wrap gap-3 text-sm text-gray-800">
                            <a href="#" className="hover:text-gray-900 font-medium transition-colors">About us</a>
                            <span>•</span>
                            <a href="#" className="hover:text-gray-900 font-medium transition-colors">Contact us</a>
                            <span>•</span>
                            <a href="#" className="hover:text-gray-900 font-medium transition-colors">Engineering Services</a>
                            <span>•</span>
                            <a href="#" className="hover:text-gray-900 font-medium transition-colors">Refund</a>
                        </div>
                    </div>

                    {/* Right Column - Contact & Social */}
                    <div className="space-y-6">
                        {/* Business Plans */}
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Business Plans</h4>
                            <ul className="space-y-1 text-sm text-gray-800">
                                <li>
                                    <a href="#" className="hover:text-gray-900 transition-colors">Coworking Space Business Plans</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-gray-900 transition-colors">Coliving Space Business Plans</a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="font-bold text-gray-900 mb-3">Feel free connect with us</h4>
                            <div className="space-y-2 text-sm text-gray-800">
                                <div className="flex items-center gap-2">
                                    <Phone size={16} className="flex-shrink-0" />
                                    <a href="tel:+919355284999" className="hover:text-gray-900 transition-colors">
                                        +91 9355 28 4999
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={16} className="flex-shrink-0" />
                                    <a href="mailto:hello@nanospace.com" className="hover:text-gray-900 transition-colors">
                                        hello@nanospace.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full border-2 border-gray-800 flex items-center justify-center hover:bg-gray-800 hover:text-yellow-400 transition-all duration-300"
                                aria-label="Facebook"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full border-2 border-gray-800 flex items-center justify-center hover:bg-gray-800 hover:text-yellow-400 transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full border-2 border-gray-800 flex items-center justify-center hover:bg-gray-800 hover:text-yellow-400 transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full border-2 border-gray-800 flex items-center justify-center hover:bg-gray-800 hover:text-yellow-400 transition-all duration-300"
                                aria-label="Twitter"
                            >
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoworkingFooterBanner;
