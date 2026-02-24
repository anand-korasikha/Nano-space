import React from 'react';
import { Phone, Mail, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const CoworkingFooterBanner = ({ cityName }) => {
    return (
        <section className="bg-gradient-to-r from-yellow-400 to-orange-400 py-12">
            <div className="mx-6 md:mx-12 lg:mx-20">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Left Column - Brand Info */}
                    <div className="flex-1 text-center md:text-left">
                        {/* Logo/Brand */}
                        <div className="mb-6">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                <div className="hidden md:block w-1.5 h-10 bg-gray-900"></div>
                                <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">NANOSPACE</h3>
                            </div>
                            <p className="text-gray-800 font-bold text-lg mb-2">
                                Fynd the right space {cityName && `in ${cityName}`}, Globally!
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-gray-800 mb-6 leading-relaxed max-w-2xl mx-auto md:mx-0 text-sm md:text-base">
                            NanoSpace is India's #1 online platform for searching and booking Coworking, Coliving, Private Offices & Virtual Offices across {cityName || 'India'}.
                            Choose from 100,000+ verified fully furnished spaces to Work & Live.
                        </p>
                        <p className="text-gray-900 font-bold mb-8">
                            Space Search Made Simple with NanoSpace!
                        </p>

                        {/* Navigation Links */}
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-3 text-sm text-gray-800 font-semibold mb-6">
                            <a href="#" className="hover:text-gray-900 transition-colors">Coworking Space</a>
                            <span className="text-gray-500 hidden sm:inline">•</span>
                            <a href="#" className="hover:text-gray-900 transition-colors">Coliving Space</a>
                            <span className="text-gray-500 hidden sm:inline">•</span>
                            <a href="#" className="hover:text-gray-900 transition-colors">Virtual Space</a>
                            <span className="text-gray-500 hidden sm:inline">•</span>
                            <a href="#" className="hover:text-gray-900 transition-colors">Enterprise Solutions</a>
                            <span className="text-gray-500 hidden sm:inline">•</span>
                            <a href="#" className="hover:text-gray-900 transition-colors">List Your Space</a>
                        </div>

                        {/* Footer Links */}
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-3 text-sm text-gray-800 font-semibold">
                            <a href="#" className="hover:text-gray-900 transition-colors">About us</a>
                            <span className="text-gray-500 hidden sm:inline">•</span>
                            <a href="#" className="hover:text-gray-900 transition-colors">Contact us</a>
                            <span className="text-gray-500 hidden sm:inline">•</span>
                            <a href="#" className="hover:text-gray-900 transition-colors">Engineering Services</a>
                            <span className="text-gray-500 hidden sm:inline">•</span>
                            <a href="#" className="hover:text-gray-900 transition-colors">Refund</a>
                        </div>
                    </div>

                    {/* Right Column - Contact & Social */}
                    <div className="w-full md:w-auto space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
                        {/* Business Plans */}
                        <div>
                            <h4 className="font-bold text-gray-900 mb-3 text-lg">Business Plans</h4>
                            <ul className="space-y-2 text-sm text-gray-800 font-medium">
                                <li>
                                    <a href="#" className="hover:text-gray-900 transition-colors underline-offset-4 hover:underline">Coworking Space Business Plans</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-gray-900 transition-colors underline-offset-4 hover:underline">Coliving Space Business Plans</a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="font-bold text-gray-900 mb-4 text-lg">Feel free connect with us</h4>
                            <div className="space-y-3 text-sm text-gray-800 font-semibold">
                                <div className="flex items-center justify-center md:justify-start gap-3">
                                    <Phone size={18} className="text-gray-900" />
                                    <a href="tel:+919355284999" className="hover:text-gray-900 transition-colors">
                                        +91 9355 28 4999
                                    </a>
                                </div>
                                <div className="flex items-center justify-center md:justify-start gap-3">
                                    <Mail size={18} className="text-gray-900" />
                                    <a href="mailto:hello@nanospace.com" className="hover:text-gray-900 transition-colors">
                                        hello@nanospace.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-900 text-yellow-400 flex items-center justify-center hover:bg-gray-800 transition-all duration-300 shadow-md"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-900 text-yellow-400 flex items-center justify-center hover:bg-gray-800 transition-all duration-300 shadow-md"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-900 text-yellow-400 flex items-center justify-center hover:bg-gray-800 transition-all duration-300 shadow-md"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-900 text-yellow-400 flex items-center justify-center hover:bg-gray-800 transition-all duration-300 shadow-md"
                                aria-label="Twitter"
                            >
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoworkingFooterBanner;
