import React from 'react';
import { Mail } from 'lucide-react';

const FindOfficeSpace = () => {
    return (
        <section className="py-16 bg-white">
            <div className="mx-6 md:mx-12 lg:mx-20">
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
                    {/* Content */}
                    <div className="relative z-10 max-w-3xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Find your Office Space with NanoSpace
                        </h2>
                        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                            Just drop us an email with your Office Space requirements - Number of Seat, Location, Start Date... and our team will connect back with you within 24 Hrs with the best possible options.
                        </p>

                        {/* Email Link */}
                        <a
                            href="mailto:hello@nanospace.com"
                            className="inline-flex items-center gap-3 text-gray-800 hover:text-gray-900 transition-colors group"
                        >
                            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Mail size={20} className="text-gray-800" />
                            </div>
                            <span className="text-lg font-semibold">hello@nanospace.com</span>
                        </a>
                    </div>

                    {/* Decorative Email Icon */}
                    <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 opacity-20 md:opacity-100">
                        <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Envelope */}
                            <rect x="20" y="30" width="160" height="100" rx="8" fill="#FCD34D" stroke="#F59E0B" strokeWidth="3" />

                            {/* Envelope Flap */}
                            <path d="M20 30 L100 90 L180 30" stroke="#F59E0B" strokeWidth="3" fill="none" />
                            <path d="M20 30 L100 90 L180 30 L180 40 L100 100 L20 40 Z" fill="#FBBF24" opacity="0.7" />

                            {/* Letter inside */}
                            <rect x="50" y="60" width="100" height="4" rx="2" fill="#F59E0B" opacity="0.5" />
                            <rect x="50" y="70" width="80" height="4" rx="2" fill="#F59E0B" opacity="0.5" />
                            <rect x="50" y="80" width="90" height="4" rx="2" fill="#F59E0B" opacity="0.5" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FindOfficeSpace;
