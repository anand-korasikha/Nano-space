import React from 'react';
import { Link } from 'react-router-dom';

const ServiceModal = ({ isOpen, onClose, cityName, cityIconPath, currentPage = 'home' }) => {
    if (!isOpen) return null;

    // Normalize city name for URL (lowercase)
    const cityUrlName = cityName?.toLowerCase();

    const services = [
        {
            name: 'Coworking Space',
            path: `/coworking/${cityUrlName}`,
            bgColor: 'bg-[#FFF8E7]', // Creamy yellow
            icon: (
                <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            name: 'Coliving Space',
            path: `/coliving/${cityUrlName}`,
            bgColor: 'bg-[#EAF6FF]', // Light blue
            icon: (
                <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            name: 'Virtual Office',
            path: `/virtual-office/${cityUrlName}`,
            bgColor: 'bg-[#FFF8E7]',
            icon: (
                <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            name: 'Office Space',
            path: '/business-plans',
            bgColor: 'bg-[#FFF8E7]',
            icon: (
                <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 pt-12 max-w-3xl w-full transform transition-all animate-fadeIn" style={{ marginTop: '20px' }}>

                {/* Floating Top Icon */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#FFF8E7] p-4 rounded-full shadow-lg border-4 border-white">
                    {cityIconPath ? (
                        <img
                            src={cityIconPath}
                            alt={`${cityName} icon`}
                            className="w-12 h-12 object-contain"
                        />
                    ) : (
                        <svg className="w-12 h-12 text-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 21H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 21V7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 9H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 13H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 17H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header Text */}
                <div className="text-center mb-10 mt-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        Find the Best Spaces in <span className="uppercase">{cityName}</span>
                    </h3>
                    <p className="text-[#3b82f6] font-medium text-sm md:text-base">
                        Choose from 100,000+ Sanitized and Verified Spaces
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center">
                    {services.map((service) => (
                        <Link
                            key={service.name}
                            to={service.path}
                            onClick={onClose}
                            className="group flex flex-col items-center gap-4 text-center w-full"
                        >
                            {/* Circular Icon Container */}
                            <div className={`${service.bgColor} w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-transform transform group-hover:scale-110 shadow-sm border border-transparent group-hover:border-blue-100`}>
                                {service.icon}
                            </div>

                            {/* Label */}
                            <span className="font-bold text-gray-800 text-sm md:text-base leading-tight px-2">
                                {service.name.split(' ').map((word, i) => (
                                    <span key={i} className="block">{word}</span>
                                ))}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceModal;
