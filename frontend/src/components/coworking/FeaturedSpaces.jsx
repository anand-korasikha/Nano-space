import React from 'react';
import { Star, MapPin } from 'lucide-react';
import './FeaturedSpaces.css';

const FeaturedSpaces = ({ spaces, cityName, onGetQuoteClick }) => {
    return (
        <section className="featured-spaces-section">
            <div className="featured-spaces-container">
                {/* Section Header */}
                <div className="featured-spaces-header">
                    <h2 className="featured-spaces-title">
                        Featured Coworking Spaces in {cityName}
                    </h2>
                    <p className="featured-spaces-subtitle">
                        Handpicked premium workspaces for your business needs
                    </p>
                </div>

                {/* Spaces Grid */}
                <div className="featured-spaces-grid">
                    {spaces.map((space) => (
                        <div key={space.id} className="featured-space-card">
                            {/* Popular Badge */}
                            {space.badge && (
                                <div className="featured-badge">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    {space.badge}
                                </div>
                            )}

                            {/* Image */}
                            <div className="featured-space-image-container">
                                <img
                                    src={space.image}
                                    alt={space.name}
                                    className="featured-space-image"
                                />
                            </div>

                            {/* Content */}
                            <div className="featured-space-content">
                                {/* Name and Rating */}
                                <div className="featured-space-top">
                                    <h3 className="featured-space-name">{space.name}</h3>
                                    <div className="featured-space-rating">
                                        <Star size={14} fill="#FFD700" color="#FFD700" />
                                        <span>{space.rating}</span>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="featured-space-location">
                                    <MapPin size={13} />
                                    <span>{space.location}</span>
                                </div>

                                {/* Price and Button */}
                                <div className="featured-space-bottom">
                                    <div className="featured-space-price">
                                        <span className="price-value">{space.price}</span>
                                        <span className="price-period">/ {space.period}</span>
                                    </div>
                                    <button
                                        className="featured-quote-btn"
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

export default FeaturedSpaces;
