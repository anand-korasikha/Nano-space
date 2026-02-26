import React from 'react';
import { MapPin } from 'lucide-react';
import './ColivingPropertyGrid.css';

const ColivingPropertyGrid = ({ spaces, onViewNumber }) => {
    if (!spaces || spaces.length === 0) {
        return null;
    }

    return (
        <section className="coliving-property-grid-section">
            <div className="property-grid-container">
                <div className="property-grid">
                    {spaces.map((space) => (
                        <div key={space.id} className="property-grid-card">
                            {/* Property Image */}
                            <div className="property-grid-image-wrapper">
                                <img
                                    src={`/${space.image}`}
                                    alt={space.name}
                                    className="property-grid-image"
                                />
                            </div>

                            {/* Property Details */}
                            <div className="property-grid-content">
                                <h3 className="property-grid-name">{space.name}</h3>

                                <div className="property-grid-location">
                                    <MapPin size={14} />
                                    <span>{space.location}</span>
                                </div>

                                <div className="property-grid-footer">
                                    <div className="property-grid-price">
                                        <span className="price-amount">{space.price}</span>
                                        <span className="price-period">/ {space.period}</span>
                                    </div>

                                    <button
                                        className="property-grid-view-btn"
                                        onClick={() => onViewNumber && onViewNumber(space)}
                                    >
                                        Get Qoute
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

export default ColivingPropertyGrid;
