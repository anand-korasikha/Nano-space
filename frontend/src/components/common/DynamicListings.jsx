import React, { useState, useEffect } from 'react';
import { MapPin, Star, IndianRupee, Tag } from 'lucide-react';
import { getApprovedPropertiesByType } from '../../services/propertyService';
import './DynamicListings.css';

/**
 * DynamicListings — renders backend-approved listings as cards.
 * Drop this into any listing page and pass the matching `type`.
 *
 * @param {string}   type          — matches the "Page / Category" set in Add Listing
 *                                   e.g. "Hotel Room" | "Event Space" | "Party Hall" |
 *                                        "Private Theatre" | "Coworking Space" | …
 * @param {string}   [sectionTitle]— override the section heading
 * @param {Function} [onBook]      — callback(property) when "Book Now" is clicked
 */
const DynamicListings = ({ type, sectionTitle, onBook }) => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        getApprovedPropertiesByType(type)
            .then(data => { if (!cancelled) setListings(data || []); })
            .catch(() => { if (!cancelled) setListings([]); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [type]);

    if (loading || listings.length === 0) return null;

    const heading = sectionTitle || `New ${type} Listings`;

    return (
        <section className="dl-section">
            <div className="dl-header">
                <span className="dl-dot" />
                <h2 className="dl-title">{heading}</h2>
            </div>

            <div className="dl-grid">
                {listings.map(prop => (
                    <ListingCard key={prop.id} property={prop} onBook={onBook} />
                ))}
            </div>
        </section>
    );
};

const PLACEHOLDER = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop';

const ListingCard = ({ property, onBook }) => {
    const [imgIdx, setImgIdx] = useState(0);
    const images = property.images?.filter(Boolean).length
        ? property.images.filter(Boolean)
        : [PLACEHOLDER];

    const price = (() => {
        if (property.price_per_month) return { value: property.price_per_month, period: 'month' };
        if (property.price_per_day)   return { value: property.price_per_day,   period: 'day' };
        if (property.price_per_seat)  return { value: property.price_per_seat,  period: 'seat' };
        return null;
    })();

    const location = [property.address || property.area, property.city]
        .filter(Boolean).join(', ');

    const amenities = Array.isArray(property.amenities) ? property.amenities.slice(0, 4) : [];

    return (
        <div className="dl-card">
            {/* Image */}
            <div className="dl-img-wrap">
                <img
                    src={images[imgIdx] || PLACEHOLDER}
                    alt={property.name}
                    className="dl-img"
                    onError={e => { e.target.src = PLACEHOLDER; }}
                />
                {images.length > 1 && (
                    <div className="dl-img-dots">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                className={`dl-dot-btn${i === imgIdx ? ' active' : ''}`}
                                onClick={() => setImgIdx(i)}
                                aria-label={`Image ${i + 1}`}
                            />
                        ))}
                    </div>
                )}
                {property.is_featured && (
                    <span className="dl-featured-badge">
                        <Star size={11} fill="#FFB800" color="#FFB800" /> Featured
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="dl-content">
                <h3 className="dl-name">{property.name}</h3>

                {location && (
                    <div className="dl-location">
                        <MapPin size={13} />
                        <span>{location}</span>
                    </div>
                )}

                {amenities.length > 0 && (
                    <div className="dl-amenities">
                        {amenities.map((a, i) => (
                            <span key={i} className="dl-amenity">
                                <Tag size={10} /> {a}
                            </span>
                        ))}
                    </div>
                )}

                <div className="dl-footer">
                    {price ? (
                        <div className="dl-price">
                            <IndianRupee size={13} />
                            <span className="dl-price-value">{Number(price.value).toLocaleString('en-IN')}</span>
                            <span className="dl-price-period">/{price.period}</span>
                        </div>
                    ) : (
                        <div className="dl-price dl-price-tbd">Price on request</div>
                    )}

                    <button
                        className="dl-btn"
                        onClick={() => onBook?.(property)}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DynamicListings;
