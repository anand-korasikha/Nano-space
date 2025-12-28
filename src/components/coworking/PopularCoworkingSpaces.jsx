import React from 'react';
import { Star, MapPin } from 'lucide-react';
import './PopularCoworkingSpaces.css';

const PopularCoworkingSpaces = ({ spaces, cityName, onGetQuoteClick }) => {
    return (
        <section className="popular-coworking-spaces">
            <div className="popular-spaces-container">
                <div className="popular-spaces-header">
                    <h2 className="popular-spaces-title">
                        Popular Coworking Spaces in {cityName}
                    </h2>
                    <p className="popular-spaces-subtitle">
                        Discover the best coworking spaces tailored to your needs
                    </p>
                </div>

                <div className="popular-spaces-grid">
                    {spaces.map((space) => (
                        <div key={space.id} className="popular-space-card">
                            {/* Badge */}
                            {space.badge && (
                                <div className={`popular-badge ${space.badge.toLowerCase()}`}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    {space.badge}
                                </div>
                            )}

                            {/* Image */}
                            <div className="popular-space-image-wrapper">
                                <img
                                    src={space.image}
                                    alt={space.name}
                                    className="popular-space-image"
                                />
                            </div>

                            {/* Content */}
                            <div className="popular-space-content">
                                <div className="popular-space-header">
                                    <h3 className="popular-space-name">{space.name}</h3>
                                    <div className="popular-space-rating">
                                        <Star size={16} fill="#FFD700" color="#FFD700" />
                                        <span>{space.rating}</span>
                                    </div>
                                </div>

                                <div className="popular-space-location">
                                    <MapPin size={14} />
                                    <span>{space.location}</span>
                                </div>

                                <div className="popular-space-footer">
                                    <div className="popular-space-price">
                                        <span className="price-amount">{space.price}</span>
                                        <span className="price-period">/ {space.period}</span>
                                    </div>
                                    <button
                                        className="popular-get-quote-btn"
                                        onClick={() => onGetQuoteClick(space)}
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

export default PopularCoworkingSpaces;
