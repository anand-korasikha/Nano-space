import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceModal.css';

const ServiceModal = ({ isOpen, onClose, cityName, cityIconPath, currentPage = 'home' }) => {
    if (!isOpen) return null;

    const cityUrlName = cityName.toLowerCase().replace(/\s+/g, '-');

    const services = [
        {
            name: 'Coworking',
            name2: 'Space',
            path: `/coworking/${cityUrlName}`,
            bgColor: 'bg-[#FFF8E7]',
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 28H28" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="14" y="16" width="12" height="12" rx="1" fill="#FEF3C7" stroke="#333" strokeWidth="1.5" />
                    <path d="M10 28V24H14M30 28V24H26" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="20" cy="12" r="2" fill="#333" />
                    <path d="M16 12H24" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M14 20H26" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )
        },
        {
            name: 'Coliving',
            name2: 'Space',
            path: `/coliving/${cityUrlName}`,
            bgColor: 'bg-[#EAF6FF]',
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 28V14C8 12.8954 8.89543 12 10 12H30C31.1046 12 32 12.8954 32 14V28" stroke="#333" strokeWidth="1.5" />
                    <path d="M8 20H32" stroke="#333" strokeWidth="1.5" />
                    <rect x="12" y="16" width="6" height="4" rx="1" fill="#BFDBFE" stroke="#333" strokeWidth="1.2" />
                    <rect x="22" y="16" width="6" height="4" rx="1" fill="#BFDBFE" stroke="#333" strokeWidth="1.2" />
                    <path d="M10 24H30" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
                </svg>
            )
        },
        {
            name: 'Virtual',
            name2: 'Office',
            path: `/virtual-office/${cityUrlName}`,
            bgColor: 'bg-[#FFF8E7]',
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="12" y="18" width="16" height="10" rx="1" fill="#FEF3C7" stroke="#333" strokeWidth="1.5" />
                    <path d="M16 22H24" stroke="#333" strokeWidth="1" />
                    <circle cx="20" cy="14" r="3" stroke="#333" strokeWidth="1.5" />
                    <path d="M14 28L12 30H28L26 28" stroke="#333" strokeWidth="1.5" />
                    <path d="M24 22H25" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )
        },
        {
            name: 'Office',
            name2: 'Space',
            path: `/business-plans/${cityUrlName}`,
            bgColor: 'bg-[#FFF8E7]',
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="14" width="20" height="14" rx="1" stroke="#333" strokeWidth="1.5" />
                    <path d="M14 14V12C14 10.8954 14.8954 10 16 10H24C25.1046 10 26 10.8954 26 12V14" stroke="#333" strokeWidth="1.5" />
                    <circle cx="20" cy="21" r="2" fill="#FDE68A" stroke="#333" strokeWidth="1" />
                    <path d="M10 20H30" stroke="#333" strokeWidth="1" />
                </svg>
            )
        },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl w-[94%] sm:max-w-xl transform transition-all animate-fadeIn overflow-visible border border-gray-100">

                {/* Floating City Icon */}
                {cityIconPath && (
                    <div className="absolute -top-10 sm:-top-12 left-1/2 transform -translate-x-1/2 bg-white w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center rounded-full shadow-lg border-[4px] sm:border-[6px] border-white z-20">
                        <div className="absolute inset-0 bg-[#FFF8E7] rounded-full scale-90"></div>
                        <img
                            src={cityIconPath}
                            alt={`${cityName} icon`}
                            className="relative w-8 h-8 sm:w-12 sm:h-12 object-contain z-10"
                        />
                        <div className="absolute inset-0 pointer-events-none opacity-20 z-10">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <circle cx="20" cy="30" r="1.5" fill="#3B82F6" />
                                <circle cx="80" cy="40" r="2" fill="#3B82F6" />
                                <circle cx="30" cy="70" r="1.5" fill="#3B82F6" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Close Button - Optimized for corner placement */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 sm:top-5 sm:right-5 text-gray-500 hover:text-gray-800 transition-all p-2 hover:bg-gray-100 rounded-full z-[100]"
                    aria-label="Close modal"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header Section */}
                <div className="text-center px-4 sm:px-6 pt-10 sm:pt-16 pb-3 sm:pb-8">
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 tracking-tight">
                        Find the Best Spaces in <span className="text-blue-600 uppercase whitespace-nowrap">{cityName}</span>
                    </h2>
                    <p className="text-blue-500 font-semibold text-[10px] sm:text-base px-2">
                        Choose from 100,000+ Sanitized and Verified Spaces
                    </p>
                </div>

                {/* Body Section */}
                <div className="px-2 sm:px-8 pb-5 sm:pb-12">
                    {/* Using flex-wrap with explicit 50% width to force 2x2 on mobile regardless of screen width */}
                    <div className="flex flex-wrap justify-between gap-y-6 sm:flex-nowrap sm:gap-x-4">
                        {services.map((service) => (
                            <Link
                                key={service.name}
                                to={service.path}
                                onClick={onClose}
                                className="group flex flex-col items-center w-1/2 sm:w-1/4 transition-all hover:-translate-y-1 active:scale-95 px-1"
                            >
                                {/* Icon Container - Sized to ensure 2x2 fits easily */}
                                <div className={`${service.bgColor} w-14 h-14 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-all group-hover:shadow-md mb-1.5`}>
                                    <div className="transform group-hover:scale-110 transition-transform duration-300 flex items-center justify-center w-[70%] h-[70%]">
                                        {React.cloneElement(service.icon, {
                                            width: "100%",
                                            height: "100%",
                                            strokeWidth: 1.5
                                        })}
                                    </div>
                                </div>

                                {/* Label */}
                                <div className="text-center">
                                    <div className="font-bold text-gray-800 text-[11px] sm:text-base leading-tight">
                                        {service.name}
                                    </div>
                                    <div className="font-bold text-gray-800 text-[11px] sm:text-base leading-tight">
                                        {service.name2}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceModal;
