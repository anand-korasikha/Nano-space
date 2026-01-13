import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Wifi, Users, Utensils, Home, Shield, X } from 'lucide-react';
import cityColivingData from '../../data/cityColiving.json';
import ColivingEnquiryModal from './ColivingEnquiryModal';
import './ColivingSpaceDetails.css';

const ColivingSpaceDetails = () => {
    const { city, spaceId } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(0);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);

    // Get the space data
    const cityData = cityColivingData[city?.toLowerCase()];
    const space = cityData?.spaces.find(s => s.id === parseInt(spaceId));

    // If space not found, show error
    if (!space) {
        return (
            <div className="space-not-found">
                <h2>Coliving Space Not Found</h2>
                <p>The space you're looking for doesn't exist.</p>
                <button onClick={() => navigate('/coliving')} className="back-btn">
                    Back to Coliving
                </button>
            </div>
        );
    }

    // Amenity icons mapping
    const amenityIcons = {
        'Housekeeping': Home,
        'Meals': Utensils,
        'WiFi': Wifi,
        'Laundry': Home,
        'Gym': Users,
        'Security': Shield
    };

    return (
        <div className="coliving-space-details">
            {/* Header Section */}
            <div className="details-header">
                <div className="header-content">
                    <h1 className="space-name">{space.name}</h1>
                    <div className="space-meta">
                        <div className="location-info">
                            <MapPin size={18} />
                            <span>{space.location}</span>
                        </div>
                        {space.rating && (
                            <div className="rating-info">
                                <Star size={18} fill="#FFD700" color="#FFD700" />
                                <span className="rating-value">{space.rating}</span>
                            </div>
                        )}
                        {space.badge && (
                            <div className="badge-tag">
                                {space.badge}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Image Gallery Section */}
            <div className="image-gallery-section">
                <div className="main-image-container">
                    <img
                        src={space.images?.[selectedImage] || space.image}
                        alt={space.name}
                        className="main-image"
                    />
                    {space.images && space.images.length > 1 && (
                        <button
                            className="view-all-photos-btn"
                            onClick={() => setShowAllPhotos(true)}
                        >
                            View All Photos
                        </button>
                    )}
                </div>

                {space.images && space.images.length > 1 && (
                    <div className="thumbnail-gallery">
                        {space.images.slice(0, 4).map((img, idx) => (
                            <div
                                key={idx}
                                className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                                onClick={() => setSelectedImage(idx)}
                            >
                                <img src={img} alt={`${space.name} ${idx + 1}`} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Content Grid */}
            <div className="details-content-grid">
                {/* Left Column - Details */}
                <div className="details-left">
                    {/* Description */}
                    {space.description && (
                        <div className="details-card">
                            <h2>About This Space</h2>
                            <p className="space-description">{space.description}</p>
                        </div>
                    )}

                    {/* Occupancy */}
                    {space.occupancy && (
                        <div className="details-card">
                            <h2>Occupancy Options</h2>
                            <p className="occupancy-info">{space.occupancy}</p>
                        </div>
                    )}

                    {/* Amenities */}
                    <div className="details-card">
                        <h2>Amenities</h2>
                        <div className="amenities-grid">
                            {space.amenities.map((amenity, idx) => {
                                const Icon = amenityIcons[amenity] || Home;
                                return (
                                    <div key={idx} className="amenity-item">
                                        <Icon size={20} className="amenity-icon" />
                                        <span>{amenity}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column - Pricing & CTA */}
                <div className="details-right">
                    <div className="pricing-card sticky-card">
                        <div className="pricing-header">
                            <h3>Pricing</h3>
                        </div>
                        <div className="pricing-details">
                            <div className="price-item">
                                <span className="price-value">{space.price}</span>
                                <span className="price-period">/{space.period}</span>
                            </div>
                        </div>
                        <button
                            className="enquiry-btn"
                            onClick={() => setShowEnquiryModal(true)}
                        >
                            Book Now
                        </button>
                        <button
                            className="contact-btn"
                            onClick={() => setShowEnquiryModal(true)}
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>

            {/* Full Screen Photo Gallery Modal */}
            {showAllPhotos && space.images && (
                <div className="photo-gallery-modal" onClick={() => setShowAllPhotos(false)}>
                    <button className="close-modal-btn" onClick={() => setShowAllPhotos(false)}>
                        <X size={24} />
                    </button>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="gallery-grid">
                            {space.images.map((img, idx) => (
                                <img key={idx} src={img} alt={`${space.name} ${idx + 1}`} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Enquiry Modal */}
            {showEnquiryModal && (
                <ColivingEnquiryModal
                    isOpen={showEnquiryModal}
                    onClose={() => setShowEnquiryModal(false)}
                    propertyName={space.name}
                    propertyLocation={space.location}
                />
            )}
        </div>
    );
};

export default ColivingSpaceDetails;
