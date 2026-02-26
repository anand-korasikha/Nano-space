import React from 'react';
import { Star, MapPin } from 'lucide-react';
import './PremiumSpaces.css';

const PremiumSpaces = ({ spaces, cityName, onGetQuoteClick }) => {
    return (
        <section className="premium-spaces-section">
            <div className="premium-spaces-container">
                {/* Section Header */}
                <div className="premium-spaces-header">
                    <h2 className="premium-spaces-title">
                        Premium Office Spaces in {cityName}
                    </h2>
                    <p className="premium-spaces-subtitle">
                        Explore our handpicked selection of premium workspaces
                    </p>
                </div>

                {/* Spaces Grid */}
                <div className="premium-spaces-grid">
                    {spaces.map((space) => (
                        <div key={space.id} className="premium-space-card">
                            {/* Badge */}
                            {space.badge && (
                                <div className={`premium-badge ${space.badge.toLowerCase()}`}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    {space.badge}
                                </div>
                            )}

                            {/* Image */}
                            <div className="premium-space-image-wrapper">
                                <img
                                    src={space.image}
                                    alt={space.name}
                                    className="premium-space-image"
                                />
                            </div>

                            {/* Content */}
                            <div className="premium-space-content">
                                {/* Name and Rating */}
                                <div className="premium-space-header">
                                    <h3 className="premium-space-name">{space.name}</h3>
                                    <div className="premium-space-rating">
                                        <Star size={13} fill="#FFD700" color="#FFD700" />
                                        <span>{space.rating}</span>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="premium-space-location">
                                    <MapPin size={12} />
                                    <span>{space.location}</span>
                                </div>

                                {/* Price and Button */}
                                <div className="premium-space-footer">
                                    <div className="premium-space-price">
                                        <span className="premium-price-amount">{space.price}</span>
                                        <span className="premium-price-period">/ {space.period}</span>
                                    </div>
                                    <button
                                        className="premium-quote-btn"
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

export default PremiumSpaces;
