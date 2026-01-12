import React from 'react';
import { MapPin, Star } from 'lucide-react';
import './FeaturedColivingProperties.css';

const FeaturedColivingProperties = ({ spaces, title, cityName, onViewNumber }) => {
    const displayTitle = title || (cityName ? `Featured Coliving Spaces in ${cityName}` : "Featured Coliving Spaces");

    if (!spaces || spaces.length === 0) {
        return null;
    }

    return (
        <section className="featured-coliving-section">
            <div className="featured-coliving-container">
                <h2 className="featured-title">{displayTitle}</h2>

                <div className="featured-grid">
                    {spaces.map((space) => (
                        <div key={space.id} className="featured-card">
                            {/* Badge */}
                            {space.badge && (
                                <div className={`featured-badge badge-${space.badge.toLowerCase().replace(/\s+/g, '-')}`}>
                                    {space.badge === 'Premium' && '⭐ Premium'}
                                    {space.badge === 'Value for Money' && '💰 Value for Money'}
                                    {space.badge === 'Special Offer' && '🔥 Special Offer'}
                                    {space.badge === 'Popular' && '🔥 Popular'}
                                    {!['Premium', 'Value for Money', 'Special Offer', 'Popular'].includes(space.badge) && space.badge}
                                </div>
                            )}

                            {/* Image */}
                            <div className="featured-image-wrapper">
                                <img
                                    src={`/${space.image}`}
                                    alt={space.name}
                                    className="featured-image"
                                />
                            </div>

                            {/* Content */}
                            <div className="featured-content">
                                <h3 className="featured-name">{space.name}</h3>

                                <div className="featured-location">
                                    <MapPin size={14} />
                                    <span>{space.location}</span>
                                </div>

                                <div className="featured-footer">
                                    <div className="featured-price-section">
                                        <div className="featured-rating">
                                            <Star size={14} fill="#FFD700" color="#FFD700" />
                                            <span>{space.rating}</span>
                                        </div>
                                        <div className="featured-price">
                                            <span className="price-amount">{space.price}</span>
                                            <span className="price-period">/ {space.period}</span>
                                        </div>
                                    </div>

                                    <button
                                        className="featured-view-btn"
                                        onClick={() => onViewNumber && onViewNumber(space)}
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

export default FeaturedColivingProperties;
