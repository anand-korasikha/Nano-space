import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Wifi, Coffee, Users, Car, Clock, Wind, Printer, Utensils, X, DollarSign, Compass, ShieldCheck, UserCheck, Calendar, Sparkles, Presentation, ConciergeBell, Phone, Monitor, Armchair } from 'lucide-react';
import topSpacesData from '../../data/topSpaces.json';
import EnquiryModal from './EnquiryModal';
import './CoworkingSpaceDetails.css';

const CoworkingSpaceDetails = () => {
    const { city, spaceId } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(0);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);

    console.log('City:', city);
    console.log('Space ID:', spaceId);
    console.log('Top Spaces Data:', topSpacesData);

    // Get the space data
    const cityData = topSpacesData[city?.toLowerCase()];
    console.log('City Data:', cityData);

    const space = cityData?.spaces.find(s => s.id === spaceId);
    console.log('Found Space:', space);

    // If space not found, show error
    if (!space) {
        return (
            <div className="space-not-found">
                <h2>Coworking Space Not Found</h2>
                <p>The space you're looking for doesn't exist.</p>
                <p>Debug info: City: {city}, ID: {spaceId}</p>
                <button onClick={() => navigate('/coworking')} className="back-btn">
                    Back to Coworking
                </button>
            </div>
        );
    }

    // Amenity icons mapping
    const amenityIcons = {
        'High speed WiFi': Wifi,
        'Coffee & Bar': Coffee,
        'Meeting Rooms': Presentation,
        'Parking': Car,
        '24/7 Access': Clock,
        'Air Conditioning': Wind,
        'Printer & Scanner': Printer,
        'Cafeteria': Utensils,
        'Housekeeping': Sparkles,
        'Reception': ConciergeBell,
        'Phone Booth': Phone,
        'Ergo Workstations': Monitor,
        'Lounge': Armchair,
        'Pantry': Utensils
    };

    return (
        <div className="coworking-space-details">
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
                                {space.reviewsCount && (
                                    <span className="reviews-count">({space.reviewsCount} reviews)</span>
                                )}
                            </div>
                        )}
                        {space.trustBadge && (
                            <div className="trust-badge">
                                <span>✓ {space.trustBadge}</span>
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
                    <button
                        className="view-all-photos-btn"
                        onClick={() => setShowAllPhotos(true)}
                    >
                        View All Photos
                    </button>
                </div>

                {space.images && space.images.length > 1 && (
                    <div className="thumbnail-gallery">
                        {space.images?.slice(0, 4).map((img, idx) => (
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

                    {/* Office Timing */}
                    <div className="details-card office-timing-section">
                        <h2>Office Timing</h2>
                        <div className="timing-grid">
                            <div className="timing-item">
                                <Calendar size={20} className="timing-icon" />
                                <div className="timing-info">
                                    <span className="timing-day">Mon - Fri</span>
                                    <span className="timing-hours">08:00 AM to 08:00 PM</span>
                                </div>
                            </div>
                            <div className="timing-item">
                                <Calendar size={20} className="timing-icon" />
                                <div className="timing-info">
                                    <span className="timing-day">Sat</span>
                                    <span className="timing-hours">08:00 AM to 08:00 PM</span>
                                </div>
                            </div>
                            <div className="timing-item">
                                <Calendar size={20} className="timing-icon off-day" />
                                <div className="timing-info">
                                    <span className="timing-day">Sun</span>
                                    <span className="timing-hours closed">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Amenities Redesigned */}
                    <div className="details-card amenities-section">
                        <h2>Amenities</h2>
                        <div className="amenities-grid-new">
                            {space.amenities?.map((amenity, idx) => {
                                const Icon = amenityIcons[amenity] || Wifi;
                                return (
                                    <div key={idx} className="amenity-item-new">
                                        <Icon size={18} className="amenity-icon-new" />
                                        <span>{amenity}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Interested Banner */}
                    <div className="interested-banner">
                        <div className="banner-content">
                            <div className="banner-icon">
                                <Star size={24} fill="#667eea" className="text-purple-600" />
                            </div>
                            <div className="banner-text">
                                <h3>Interested in {space.name}? Connect with us</h3>
                                <p>Nanospace experts provide personalized consultations and arrange workspace visits</p>
                            </div>
                        </div>
                        <button
                            className="banner-enquire-btn"
                            onClick={() => setShowEnquiryModal(true)}
                        >
                            Enquire Now
                        </button>
                    </div>

                    {/* Seating Plans Section */}
                    <div className="details-card seating-plans-section">
                        <div className="seating-plans-header">
                            <div className="premium-badge">
                                <span>🏆</span>
                                <span>Premium Coworking</span>
                                <span>🏆</span>
                            </div>
                            <h2>Seating Plans</h2>
                            <p className="section-subtitle">The Largest Network of Flex Workspaces in India</p>
                        </div>

                        <div className="seating-options">
                            {/* Dedicated Desk */}
                            <div className="seating-option">
                                <div className="option-image">
                                    <img
                                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                                        alt="Dedicated Desk"
                                    />
                                </div>
                                <div className="option-details">
                                    <h3>Dedicated Desk</h3>
                                    <p className="option-description">
                                        Fixed workspace in a Coworking Office with all amenities
                                    </p>
                                    <div className="option-capacity">
                                        <Users size={16} />
                                        <span>Seating: 1 - 100+ Seats</span>
                                    </div>
                                    <div className="option-footer">
                                        <div className="option-price">
                                            <span className="price-amount">₹10,999/</span>
                                            <span className="price-period">seat</span>
                                        </div>
                                        <button
                                            className="enquire-option-btn"
                                            onClick={() => setShowEnquiryModal(true)}
                                        >
                                            Enquire Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Private Cabin */}
                            <div className="seating-option">
                                <div className="option-image">
                                    <img
                                        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                                        alt="Private Cabin"
                                    />
                                </div>
                                <div className="option-details">
                                    <h3>Private Cabin</h3>
                                    <p className="option-description">
                                        Ready to move fully furnished private office with all amenities
                                    </p>
                                    <div className="option-capacity">
                                        <Users size={16} />
                                        <span>Seating: 4, 6, 8, 10+ (Customization Available)</span>
                                    </div>
                                    <div className="option-footer">
                                        <div className="option-price">
                                            <span className="price-amount">₹12,999/</span>
                                            <span className="price-period">seat</span>
                                        </div>
                                        <button
                                            className="enquire-option-btn"
                                            onClick={() => setShowEnquiryModal(true)}
                                        >
                                            Enquire Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Virtual Office */}
                            <div className="seating-option">
                                <div className="option-image">
                                    <img
                                        src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                                        alt="Virtual Office"
                                    />
                                </div>
                                <div className="option-details">
                                    <h3>Virtual Office</h3>
                                    <p className="option-description">
                                        Build your Company presence with Virtual Office in any city across India
                                    </p>
                                    <div className="option-footer">
                                        <div className="option-price">
                                            <span className="price-amount">₹19,999/</span>
                                            <span className="price-period">year</span>
                                        </div>
                                        <button
                                            className="enquire-option-btn"
                                            onClick={() => setShowEnquiryModal(true)}
                                        >
                                            Enquire Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="seating-disclaimer">
                            *Prices mentioned above are starting prices & as per availability
                        </p>
                    </div>

                    {/* Office Upgrade Section */}
                    <div className="details-card office-upgrade-section">
                        <h2>Upgrade your office with Nanospace</h2>
                        <div className="upgrade-options">
                            {/* Managed Office Space */}
                            <div className="upgrade-card">
                                <div className="upgrade-image">
                                    <img
                                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                                        alt="Managed Office Space"
                                    />
                                </div>
                                <div className="upgrade-content">
                                    <h3>Managed Office Space</h3>
                                    <p>An end-to-end office space solution customised to your needs including sourcing, design, building and operations</p>
                                    <button
                                        className="upgrade-enquire-btn"
                                        onClick={() => setShowEnquiryModal(true)}
                                    >
                                        Enquire Now
                                    </button>
                                </div>
                            </div>

                            {/* Enterprise Solutions */}
                            <div className="upgrade-card">
                                <div className="upgrade-image">
                                    <img
                                        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                                        alt="Enterprise Solutions"
                                    />
                                </div>
                                <div className="upgrade-content">
                                    <h3>Enterprise Solutions</h3>
                                    <p>Fully equipped offices for larger teams with flexibility to scale and customize your office in prime locations & LEED certified buildings</p>
                                    <button
                                        className="upgrade-enquire-btn"
                                        onClick={() => setShowEnquiryModal(true)}
                                    >
                                        Enquire Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Why Book Section */}
                    <div className="details-card why-book-section">
                        <h2>Why book coworking space with Nanospace?</h2>
                        <div className="benefits-grid">
                            <div className="benefit-item">
                                <div className="benefit-icon-wrapper">
                                    <DollarSign size={24} className="benefit-icon-svg" />
                                </div>
                                <div className="benefit-content">
                                    <h4>Exclusive Pricing</h4>
                                    <p>Zero Booking fee & Best rates</p>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <div className="benefit-icon-wrapper">
                                    <Compass size={24} className="benefit-icon-svg" />
                                </div>
                                <div className="benefit-content">
                                    <h4>Curated Tours</h4>
                                    <p>Office Space Tours arranged</p>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <div className="benefit-icon-wrapper">
                                    <ShieldCheck size={24} className="benefit-icon-svg" />
                                </div>
                                <div className="benefit-content">
                                    <h4>Verified Spaces</h4>
                                    <p>Trusted Operators only</p>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <div className="benefit-icon-wrapper">
                                    <UserCheck size={24} className="benefit-icon-svg" />
                                </div>
                                <div className="benefit-content">
                                    <h4>Dedicated Support</h4>
                                    <p>Personal Relationship Manager</p>
                                </div>
                            </div>
                        </div>
                        <button
                            className="benefits-enquire-btn"
                            onClick={() => setShowEnquiryModal(true)}
                        >
                            Enquire Now
                        </button>
                    </div>

                    {/* Space Details Section */}
                    <div className="details-card space-details-section">
                        <h2>{space.name}</h2>
                        <p className="space-detailed-description">
                            {space.name} is a creatively designed coworking space offering dedicated desks, private cabins, and meeting rooms.
                            It also has various amenities such as ergonomic seating, high speed internet, 24/7 access, a lounge area, and parking.
                            The space is easily accessible from the Metro Station and various other modes of public transportation.
                        </p>
                    </div>
                </div>

                {/* Right Column - Pricing & CTA */}
                <div className="details-right">
                    <div className="pricing-card sticky-card">
                        <div className="pricing-header">
                            <h3>Pricing</h3>
                        </div>
                        <div className="pricing-details">
                            {space.priceDetails ? (
                                <>
                                    <div className="price-item">
                                        <span className="price-label">Per Seat</span>
                                        <span className="price-value">{space.priceDetails.perSeat}</span>
                                        <span className="price-period">/{space.priceDetails.period}</span>
                                    </div>
                                    <div className="price-item">
                                        <span className="price-label">Per Cabin</span>
                                        <span className="price-value">{space.priceDetails.perCabin}</span>
                                        <span className="price-period">/{space.priceDetails.period}</span>
                                    </div>
                                </>
                            ) : (
                                <div className="price-item">
                                    <span className="price-value">{space.price}</span>
                                    <span className="price-period">/{space.period}</span>
                                </div>
                            )}
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
            {showAllPhotos && (
                <div className="photo-gallery-modal" onClick={() => setShowAllPhotos(false)}>
                    <button className="close-modal-btn" onClick={() => setShowAllPhotos(false)}>
                        <X size={24} />
                    </button>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="gallery-grid">
                            {space.images?.map((img, idx) => (
                                <img key={idx} src={img} alt={`${space.name} ${idx + 1}`} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Enquiry Modal */}
            {showEnquiryModal && (
                <EnquiryModal
                    isOpen={showEnquiryModal}
                    onClose={() => setShowEnquiryModal(false)}
                    propertyName={space.name}
                    propertyLocation={space.location}
                />
            )}
        </div>
    );
};

export default CoworkingSpaceDetails;
