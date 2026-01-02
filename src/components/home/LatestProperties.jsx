import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApprovedProperties } from '../../services/propertyService';
import { MapPin, Star, ArrowRight, Wifi, Coffee, Users, Home, Utensils, Car, Dumbbell } from 'lucide-react';
import './LatestProperties.css';

const LatestProperties = () => {
    const navigate = useNavigate();
    const [latestProperties, setLatestProperties] = useState([]);

    useEffect(() => {
        // Get all approved properties and sort by approval date
        const approved = getApprovedProperties();
        const sorted = approved
            .sort((a, b) => new Date(b.approvedAt) - new Date(a.approvedAt))
            .slice(0, 8); // Show latest 8 properties

        setLatestProperties(sorted);
    }, []);

    const getAmenityIcon = (amenity) => {
        const amenityLower = amenity.toLowerCase();

        if (amenityLower.includes('wifi') || amenityLower.includes('internet')) {
            return <Wifi size={14} />;
        } else if (amenityLower.includes('coffee') || amenityLower.includes('cafe') || amenityLower.includes('bar')) {
            return <Coffee size={14} />;
        } else if (amenityLower.includes('meeting') || amenityLower.includes('conference')) {
            return <Users size={14} />;
        } else if (amenityLower.includes('housekeeping') || amenityLower.includes('cleaning')) {
            return <Home size={14} />;
        } else if (amenityLower.includes('meal') || amenityLower.includes('food') || amenityLower.includes('kitchen')) {
            return <Utensils size={14} />;
        } else if (amenityLower.includes('parking') || amenityLower.includes('car')) {
            return <Car size={14} />;
        } else if (amenityLower.includes('gym') || amenityLower.includes('fitness')) {
            return <Dumbbell size={14} />;
        }
        return <Star size={14} />; // Default icon
    };

    const handlePropertyClick = (property) => {
        // Navigate to property details page
        navigate(`/property/${property.id}`);
    };

    if (latestProperties.length === 0) {
        return null; // Don't show section if no approved properties
    }

    return (
        <section className="latest-properties-section">
            <div className="latest-properties-container">
                <div className="latest-properties-header">
                    <div>
                        <h2 className="latest-properties-title">Latest Properties</h2>
                        <p className="latest-properties-subtitle">
                            Recently added spaces across India
                        </p>
                    </div>
                    <div className="new-badge">
                        <span className="pulse-dot"></span>
                        <span>New Listings</span>
                    </div>
                </div>

                <div className="latest-properties-scroll">
                    <div className="latest-properties-track">
                        {latestProperties.map((property) => (
                            <div
                                key={property.id}
                                className="latest-property-card"
                                onClick={() => handlePropertyClick(property)}
                            >
                                {/* Property Image */}
                                <div className="latest-property-image">
                                    {/* NEW Badge - Top Left */}
                                    <div className="latest-badge-new">NEW</div>

                                    {/* Property Badge - Top Right */}
                                    {property.badge && (
                                        <div className={`latest-badge-property ${property.badge.toLowerCase()}`}>
                                            <span className="badge-icon">★</span>
                                            {property.badge}
                                        </div>
                                    )}

                                    <img
                                        src={property.image}
                                        alt={property.name}
                                        loading="lazy"
                                    />

                                    {/* Type Badge - Bottom Right */}
                                    <div className="latest-property-type-badge">
                                        {property.type}
                                    </div>
                                </div>

                                {/* Property Details */}
                                <div className="latest-property-content">
                                    <h3 className="latest-property-name">{property.name}</h3>

                                    <div className="latest-property-location">
                                        <MapPin size={14} />
                                        <span>{property.location}</span>
                                    </div>

                                    <div className="latest-property-city">
                                        📍 {property.city}
                                    </div>

                                    {/* Amenities */}
                                    {property.amenities && property.amenities.length > 0 && (
                                        <div className="latest-property-amenities">
                                            {property.amenities.slice(0, 3).map((amenity, index) => (
                                                <div key={index} className="amenity-item">
                                                    {getAmenityIcon(amenity)}
                                                    <span>{amenity}</span>
                                                </div>
                                            ))}
                                            {property.amenities.length > 3 && (
                                                <div className="amenity-more">
                                                    +{property.amenities.length - 3} more
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="latest-property-footer">
                                        <div className="latest-property-price">
                                            <span className="price-amount">{property.price}</span>
                                            <span className="price-period">/{property.period}</span>
                                        </div>

                                        {property.rating > 0 && (
                                            <div className="latest-property-rating">
                                                <Star size={14} fill="#FFD700" color="#FFD700" />
                                                <span>{property.rating}</span>
                                            </div>
                                        )}
                                    </div>

                                    <button className="latest-view-btn">
                                        View Details
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicators */}
                <div className="scroll-indicators">
                    <div className="scroll-hint">
                        <ArrowRight size={20} />
                        <span>Scroll to see more</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestProperties;
