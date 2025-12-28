import React, { useState, useEffect } from 'react';
import { Briefcase, Building2, Globe } from 'lucide-react';
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
    const navigate = useNavigate();

    const cards = [
        {
            id: 'coworking',
            title: 'Coworking',
            image: '/images/hero/home-1.jpg',
            icon: <Briefcase className="w-5 h-5" />,
            color: 'text-blue-600',
            titleColor: 'text-blue-600',
            path: '/coworking'
        },
        {
            id: 'coliving',
            title: 'Coliving',
            image: '/images/hero/home-2.jpg',
            icon: <Building2 className="w-5 h-5" />,
            color: 'text-rose-600',
            titleColor: 'text-rose-600',
            path: '/coliving'
        },
        {
            id: 'virtual-office',
            title: 'Virtual Office',
            image: '/images/hero/home-3.jpg',
            icon: <Globe className="w-5 h-5" />,
            color: 'text-blue-600',
            titleColor: 'text-blue-600',
            path: '/virtual-office'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % cards.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [cards.length]);

    const handleCardClick = (index, path) => {
        if (index === activeIndex) {
            navigate(path);
        } else {
            setActiveIndex(index);
        }
    };

    const getCardClass = (index) => {
        let position = index - activeIndex;
        if (position < 0) position += cards.length;

        if (position === 2) position = -1;

        const baseClass = "carousel-card";

        if (position === 0) {
            return `${baseClass} card-center`;
        } else if (position === 1) {
            return `${baseClass} card-right`;
        } else {
            return `${baseClass} card-left`;
        }
    };

    return (
        <div className="hero-carousel-container">

            {/* Background Decorative Arcs */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-arc-outer"></div>
                <div className="bg-arc-inner"></div>

                {/* Stars/Sparkles */}
                <div className="star-icon star-red-large">
                    <StarIcon className="w-8 h-8 md:w-10 md:h-10 transform rotate-12" />
                </div>
                <div className="star-icon star-red-small">
                    <StarIcon className="w-5 h-5 md:w-6 md:h-6 transform -rotate-12" />
                </div>

                <div className="star-icon star-blue-large">
                    <StarIcon className="w-8 h-8 md:w-10 md:h-10 transform -rotate-6" />
                </div>
                <div className="star-icon star-blue-small">
                    <StarIcon className="w-4 h-4 md:w-5 md:h-5 transform rotate-45" />
                </div>
            </div>


            {/* Cards Container */}
            <div className="cards-wrapper">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        className={getCardClass(index)}
                        onClick={() => handleCardClick(index, card.path)}
                    >
                        {/* Header */}
                        <div className="card-header">
                            <div className={`flex items-center gap-1.5 ${card.titleColor}`}>
                                {card.icon}
                                <span className="font-bold text-lg md:text-xl tracking-tight">{card.title}</span>
                            </div>
                        </div>

                        {/* Image Area */}
                        <div className="card-image-container group">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="card-image"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
