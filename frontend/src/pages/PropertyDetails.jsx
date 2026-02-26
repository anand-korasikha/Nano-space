import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApprovedProperties } from '../services/propertyService';
import { MapPin, Star, ArrowLeft, Wifi, Coffee, Users, Home, Utensils, Car, Dumbbell, Phone, Mail, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './PropertyDetails.css';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PropertyDetails = () => {
    const { propertyId } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const approvedProperties = await getApprovedProperties();
                const idStr = String(propertyId);
                const foundProperty = (approvedProperties || []).find(
                    p => String(p.id) === idStr
                );
                if (foundProperty) {
                    setProperty(foundProperty);
                    setActiveImage(foundProperty.image || (foundProperty.images && foundProperty.images[0]));
                }
            } catch (err) {
                console.error('Error loading property:', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [propertyId]);


    const getAmenityIcon = (amenity) => {
        const amenityLower = amenity.toLowerCase();

        if (amenityLower.includes('wifi') || amenityLower.includes('internet')) {
            return <Wifi size={20} />;
        } else if (amenityLower.includes('coffee') || amenityLower.includes('cafe') || amenityLower.includes('bar')) {
            return <Coffee size={20} />;
        } else if (amenityLower.includes('meeting') || amenityLower.includes('conference')) {
            return <Users size={20} />;
        } else if (amenityLower.includes('housekeeping') || amenityLower.includes('cleaning')) {
            return <Home size={20} />;
        } else if (amenityLower.includes('meal') || amenityLower.includes('food') || amenityLower.includes('kitchen')) {
            return <Utensils size={20} />;
        } else if (amenityLower.includes('parking') || amenityLower.includes('car')) {
            return <Car size={20} />;
        } else if (amenityLower.includes('gym') || amenityLower.includes('fitness')) {
            return <Dumbbell size={20} />;
        }
        return <Star size={20} />;
    };

    if (loading) {
        return (
            <div className="property-details-loading">
                <div className="spinner"></div>
                <p>Loading property details...</p>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="property-details-error">
                <h2>Property Not Found</h2>
                <p>The property you're looking for doesn't exist or has been removed.</p>
                <button onClick={() => navigate('/')} className="back-home-btn">
                    <ArrowLeft size={20} />
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="property-details-page">
            {/* Back Button */}
            <div className="property-details-container">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <ArrowLeft size={20} />
                    Back
                </button>

                {/* Property Header */}
                <div className="property-header">
                    <div className="property-header-content">
                        <div className="property-badges">
                            <span className="property-type-badge">{property.type}</span>
                            {property.badge && (
                                <span className={`property-badge ${property.badge.toLowerCase()}`}>
                                    {property.badge}
                                </span>
                            )}
                        </div>
                        <h1 className="property-title">{property.name}</h1>
                        <div className="property-location-header">
                            <MapPin size={20} />
                            <span>{property.location}</span>
                        </div>
                        {property.rating > 0 && (
                            <div className="property-rating-header">
                                <Star size={20} fill="#FFD700" color="#FFD700" />
                                <span className="rating-value">{property.rating}</span>
                                <span className="rating-text">Rating</span>
                            </div>
                        )}
                    </div>
                    <div className="property-price-card">
                        <div className="price-label">Starting from</div>
                        <div className="price-value">{property.price}</div>
                        <div className="price-period">per {property.period}</div>
                        <button className="enquire-btn">
                            <Phone size={18} />
                            Enquire Now
                        </button>
                    </div>
                </div>

                {/* Property Image Gallery */}
                <div className="property-image-section">
                    <img src={activeImage} alt={property.name} className="property-main-image" />

                    {property.images && property.images.length > 1 && (
                        <div className="property-gallery-grid">
                            {property.images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`gallery-item ${activeImage === img ? 'active' : ''}`}
                                    onClick={() => setActiveImage(img)}
                                >
                                    <img src={img} alt={`${property.name} gallery ${idx}`} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Property Details Grid */}
                <div className="property-details-grid">
                    {/* Description */}
                    <div className="details-section">
                        <h2 className="section-title">About This Property</h2>
                        <p className="property-description">{property.description}</p>
                    </div>

                    {/* Amenities */}
                    <div className="details-section">
                        <h2 className="section-title">Amenities & Features</h2>
                        <div className="amenities-grid">
                            {property.amenities.map((amenity, index) => (
                                <div key={index} className="amenity-card">
                                    <div className="amenity-icon">
                                        {getAmenityIcon(amenity)}
                                    </div>
                                    <span className="amenity-name">{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Property Info */}
                    <div className="details-section">
                        <h2 className="section-title">Property Information</h2>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Property Type</span>
                                <span className="info-value">{property.type}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">City</span>
                                <span className="info-value">{property.city}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Location</span>
                                <span className="info-value">{property.location}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Pricing</span>
                                <span className="info-value">{property.price}/{property.period}</span>
                            </div>
                        </div>
                    </div>

                    {/* Map Location */}
                    {property.latitude && property.longitude && (
                        <div className="details-section">
                            <h2 className="section-title">Location Map</h2>
                            <div className="property-map-container">
                                <MapContainer
                                    center={[parseFloat(property.latitude), parseFloat(property.longitude)]}
                                    zoom={15}
                                    scrollWheelZoom={false}
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[parseFloat(property.latitude), parseFloat(property.longitude)]}>
                                        <Popup>
                                            <strong>{property.name}</strong><br />
                                            {property.address}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                            <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${property.latitude},${property.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-btn secondary"
                                    style={{ display: 'inline-flex', width: 'auto', padding: '0.5rem 1.2rem', gap: '8px', textDecoration: 'none' }}
                                >
                                    <Navigation size={18} /> Get Directions on Google Maps
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Contact Section */}
                    <div className="details-section contact-section">
                        <h2 className="section-title">Get in Touch</h2>
                        <p className="contact-description">
                            Interested in this property? Contact us for more information and to schedule a visit.
                        </p>
                        <div className="contact-buttons">
                            <button className="contact-btn primary">
                                <Phone size={20} />
                                Call Now
                            </button>
                            <button className="contact-btn secondary">
                                <Mail size={20} />
                                Email Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
