import React, { useState, useEffect } from 'react';
import { Briefcase, Building2, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HeroCarousel.css';

// Star/Sparkle Icon Component
const StarIcon = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
);

const HeroCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const cards = [
        {
            id: 'coworking',
            title: 'Coworking',
            subtitle: 'Flexible Workspaces',
            description: 'Premium coworking spaces with modern amenities',
            image: '/images/hero/hero1.webp',
            icon: <Briefcase className="w-6 h-6" />,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            path: '/coworking',
            features: ['Hot Desks', 'Private Cabins', 'Meeting Rooms']
        },
        {
            id: 'coliving',
            title: 'Coliving',
            subtitle: 'Community Living',
            description: 'Modern coliving spaces for professionals',
            image: '/images/hero/home-2.jpg',
            icon: <Building2 className="w-6 h-6" />,
            color: 'from-rose-500 to-rose-600',
            bgColor: 'bg-rose-50',
            textColor: 'text-rose-600',
            path: '/coliving',
            features: ['Fully Furnished', 'Housekeeping', 'Community Events']
        },
        {
            id: 'virtual-office',
            title: 'Virtual Office',
            subtitle: 'Remote Solutions',
            description: 'Professional business address & services',
            image: '/images/hero/home-3.jpg',
            icon: <Globe className="w-6 h-6" />,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600',
            path: '/virtual-office',
            features: ['Business Address', 'Mail Handling', 'Call Answering']
        }
    ];

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % cards.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [cards.length, isHovered]);

    const handleCardClick = (index, path) => {
        if (index === activeIndex) {
            navigate(path);
        } else {
            setActiveIndex(index);
        }
    };

    const handlePrevious = (e) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev + 1) % cards.length);
    };

    const getCardClass = (index) => {
        let position = index - activeIndex;
        if (position < 0) position += cards.length;
        if (position === 2) position = -1;

        const baseClass = "carousel-card-enhanced";

        if (position === 0) {
            return `${baseClass} card-center-enhanced`;
        } else if (position === 1) {
            return `${baseClass} card-right-enhanced`;
        } else {
            return `${baseClass} card-left-enhanced`;
        }
    };

    return (
        <div
            className="hero-carousel-container-enhanced"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
                {/* Decorative Arcs */}
                <div className="bg-arc-outer"></div>
                <div className="bg-arc-inner"></div>

                {/* Stars/Sparkles */}
                <div className="star-icon star-red-large">
                    <StarIcon className="w-8 h-8 md:w-10 md:h-10 transform rotate-12 animate-spin-slow" />
                </div>
                <div className="star-icon star-red-small">
                    <StarIcon className="w-5 h-5 md:w-6 md:h-6 transform -rotate-12 animate-pulse" />
                </div>
                <div className="star-icon star-blue-large">
                    <StarIcon className="w-8 h-8 md:w-10 md:h-10 transform -rotate-6 animate-spin-slow" />
                </div>
                <div className="star-icon star-blue-small">
                    <StarIcon className="w-4 h-4 md:w-5 md:h-5 transform rotate-45 animate-pulse" />
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={handlePrevious}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full nav-arrow transition-all duration-300 hover:scale-110 group"
                aria-label="Previous"
            >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full nav-arrow transition-all duration-300 hover:scale-110 group"
                aria-label="Next"
            >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
            </button>

            {/* Cards Container */}
            <div className="cards-wrapper-enhanced">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        className={getCardClass(index)}
                        onClick={() => handleCardClick(index, card.path)}
                    >
                        {/* Card Content */}
                        <div className="card-content-enhanced">
                            {/* Image with Overlay */}
                            <div className="card-image-wrapper-enhanced">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="card-image-enhanced"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${card.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                            </div>

                            {/* Card Info Overlay */}
                            <div className="card-info-overlay">
                                {/* Icon Badge */}
                                <div className={`inline-flex items-center gap-2 ${card.bgColor} ${card.textColor} px-4 py-2 rounded-full mb-3 shadow-md`}>
                                    {card.icon}
                                    <span className="font-bold text-sm md:text-base">{card.title}</span>
                                </div>

                                {/* Title & Description (Visible on Active Card) */}
                                <div className="card-details">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{card.subtitle}</h3>
                                    <p className="text-white/90 text-sm md:text-base mb-4">{card.description}</p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {card.features.map((feature, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {cards.map((_, index) => (
                    <button
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex(index);
                        }}
                        className={`h-2 rounded-full dot-indicator transition-all duration-300 ${index === activeIndex
                            ? 'w-8 bg-blue-600'
                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
