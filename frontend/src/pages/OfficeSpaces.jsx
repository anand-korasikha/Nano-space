import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Check, ChevronRight, Monitor, Users } from 'lucide-react';
import cityOfficeSpacesData from '../data/cityOfficeSpaces.json';
import { getCityIcon } from '../assets/icons/cityIcons';
import BookingModal from '../components/BookingModal';
import TrustedCompanies from '../components/home/TrustedCompanies';
import './OfficeSpaces.css';
import './NewHeroSection.css';

const OfficeSpaces = () => {
    const { cityName } = useParams();
    const [cityData, setCityData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        // Default to hyderabad if no cityName or city not found
        const normalizedCity = cityName?.toLowerCase() || 'hyderabad';
        const data = cityOfficeSpacesData[normalizedCity] || cityOfficeSpacesData['hyderabad'];
        setCityData(data);
    }, [cityName]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Enquiry submitted:', formData);
        alert(`Thank you for your enquiry for ${cityData?.cityName}! Our Office Space Expert will connect with you soon.`);
    };

    const handleBookNow = (location) => {
        // Parse price from string like "₹ 50,000*"
        const priceNum = parseInt(location.price.replace(/[^0-9]/g, '')) || 50000;
        setSelectedLocation({
            name: `Office Space in ${location.name}`,
            price: priceNum,
            totalPrice: priceNum
        });
        setIsModalOpen(true);
    };

    if (!cityData) return <div className="loading-container">Loading...</div>;

    // Helper to split features for 2-column display
    const firstHalfFeatures = cityData.features.slice(0, Math.ceil(cityData.features.length / 2));
    const secondHalfFeatures = cityData.features.slice(Math.ceil(cityData.features.length / 2));

    return (
        <div className="office-spaces-page">
            {/* NEW Hero Section - Mobile First */}
            <section
                className="new-hero-section"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${cityData.heroImage})`
                }}
            >
                <div className="new-hero-content">
                    {/* Hero Text Content */}
                    <div className="new-hero-text">
                        <h1 className="new-hero-heading">
                            Choose from 1,000+ Office Space For Rent in <span className="city-highlight">{cityData.cityName}</span>
                        </h1>

                        <div className="new-hero-location">
                            <div className="location-icon">
                                {getCityIcon(cityData.cityName)}
                            </div>
                            <p className="location-text">{cityData.locationsText}</p>
                        </div>

                        <div className="new-hero-features">
                            {cityData.features.map((feature, index) => (
                                <div key={index} className="new-feature-item">
                                    <Check size={16} strokeWidth={3} className="feature-check" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Enquiry Form Card */}
                    <div className="new-hero-form">
                        <div className="new-form-header">
                            <h2>Fully Furnished Office Space For Rent In {cityData.cityName}</h2>
                            <p>Our Office Space Expert will connect with you with the best options</p>
                        </div>

                        <form className="new-enquiry-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name*"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email*"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone*"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit">Enquire Now</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Top Locations Section */}
            <section className="locations-section">
                <div className="locations-wrapper">
                    <div className="locations-header-container">
                        <div className="title-decoration-wrapper">
                            <div className="yellow-glow-circle"></div>
                            <h2 className="locations-section-title">Top Office Space Locations in {cityData.cityName}</h2>
                        </div>
                        <div className="blue-title-underline"></div>
                    </div>

                    <div className="locations-grid">
                        {cityData.topLocations.map((location, index) => (
                            <div
                                key={index}
                                className="location-card"
                                style={{ backgroundImage: `url(${location.image})` }}
                            >
                                <div className="card-overlay"></div>
                                <div className="location-price-tag">
                                    Starting {location.price}
                                </div>
                                <div className="location-card-footer">
                                    <h3>Office Space in {location.name}</h3>
                                    <button
                                        className="btn-book-now"
                                        onClick={() => handleBookNow(location)}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Amenities Section - Redesigned Premium View */}
            <section className="amenities-section">
                <div className="amenities-wrapper">
                    <div className="section-header">
                        <h2>
                            <i className="fas fa-building"></i>
                            Premium Office Space
                            <i className="fas fa-crown" style={{ fontSize: '2rem', marginLeft: '10px' }}></i>
                        </h2>
                        <div className="subhead">
                            <i className="fas fa-map-pin" style={{ marginRight: '8px' }}></i>
                            {cityData.cityName} · all locations · exclusive benefits
                        </div>
                    </div>

                    <div className="amenities-grid">
                        {cityData.amenities?.map((amenity) => (
                            <div key={amenity.id} className="amenity-card">
                                <div className="card-header">
                                    <div className="icon-wrapper">
                                        {amenity.id === 'wifi' && <i className="fas fa-wifi"></i>}
                                        {amenity.id === 'workstation' && <i className="fas fa-laptop"></i>}
                                        {amenity.id === 'meeting' && <i className="fas fa-users"></i>}
                                        {amenity.id === 'printer' && <i className="fas fa-print"></i>}
                                        {amenity.id === 'pantry' && <i className="fas fa-mug-saucer"></i>}
                                        {amenity.id === 'parking' && <i className="fas fa-square-parking"></i>}
                                    </div>
                                    <h3>{amenity.title}</h3>
                                </div>
                                <ul className="feature-list">
                                    {(amenity.features || [amenity.description]).map((feature, idx) => (
                                        <li key={idx}>
                                            <i className={
                                                amenity.id === 'wifi' ? "fas fa-circle-check" :
                                                    amenity.id === 'pantry' ? (idx === 0 ? "fas fa-utensils" : "fas fa-couch") :
                                                        amenity.id === 'workstation' ? "fas fa-user-group" :
                                                            amenity.id === 'meeting' ? "fas fa-lightbulb" :
                                                                amenity.id === 'printer' ? "fas fa-file-lines" :
                                                                    "fas fa-car"
                                            }></i>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="accent-tag">
                                    <i className={
                                        amenity.id === 'wifi' ? "fas fa-bolt" :
                                            amenity.id === 'workstation' ? "fas fa-handshake" :
                                                amenity.id === 'meeting' ? "fas fa-video" :
                                                    amenity.id === 'printer' ? "fas fa-cloud" :
                                                        amenity.id === 'pantry' ? "fas fa-coffee" :
                                                            "fas fa-bicycle"
                                    }></i>
                                    {amenity.accentTag || (
                                        amenity.id === 'wifi' ? "up to 1 Gbps" :
                                            amenity.id === 'workstation' ? "collaborative vibe" :
                                                amenity.id === 'meeting' ? "4K screens & whiteboards" :
                                                    amenity.id === 'printer' ? "wireless & duplex" :
                                                        amenity.id === 'pantry' ? "free espresso · kombucha" :
                                                            "EV charging · bike racks"
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="subtle-note">
                        <i className="fas fa-star"></i>
                        Enjoy exclusive benefits across all office spaces in {cityData.cityName} locations
                        <i className="fas fa-location-dot" style={{ marginLeft: '8px' }}></i>
                    </div>
                </div>
            </section>

            {/* One-Stop Destination Section */}
            <section className="office-solutions-hero">
                <div className="solutions-container">
                    {/* Main Heading */}
                    <header className="solutions-hero-header">
                        <div className="solutions-badge">One-Stop Destination for all Office Space Solutions</div>
                        <p className="solutions-subtitle">Explore Coworking, Private/Customized Offices, and Virtual office solutions</p>
                    </header>

                    {/* Services Grid */}
                    <div className="services-showcase-grid">
                        <div className="service-showcase-item">
                            <div className="service-image-wrapper">
                                <img
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                                    alt="Fixed Desks"
                                />
                            </div>
                            <div className="service-content">
                                <h3>Fixed Desks</h3>
                                <p>Your dedicated desk, personalized for productivity</p>
                            </div>
                        </div>

                        <div className="service-showcase-item">
                            <div className="service-image-wrapper">
                                <img
                                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80"
                                    alt="Private Cabins"
                                />
                            </div>
                            <div className="service-content">
                                <h3>Private Cabins</h3>
                                <p>Secluded productivity in your own private cabin</p>
                            </div>
                        </div>

                        <div className="service-showcase-item">
                            <div className="service-image-wrapper">
                                <img
                                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80"
                                    alt="Customized Offices"
                                />
                            </div>
                            <div className="service-content">
                                <h3>Customized Offices</h3>
                                <p>Tailored spaces, designed for your unique vision</p>
                            </div>
                        </div>

                        <div className="service-showcase-item">
                            <div className="service-image-wrapper">
                                <img
                                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80"
                                    alt="Virtual Office"
                                />
                            </div>
                            <div className="service-content">
                                <h3>Virtual Office</h3>
                                <p>Elevate your business presence with a virtual office</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Office Space with Nanospace Benefits Section */}
            <section className="Nanospace-benefits-section">
                <div className="benefits-container">
                    <h2 className="benefits-main-title">Office Space with Nanospace</h2>

                    <div className="benefits-grid">
                        <article className="benefit-card">
                            <div className="benefit-icon-wrapper">
                                <Monitor size={32} strokeWidth={2} />
                            </div>
                            <div className="benefit-content">
                                <h3 className="benefit-title">Fully-Furnished Spaces</h3>
                                <p className="benefit-description">
                                    Get access to <strong>100,000+</strong> fully-furnished office spaces with easy availability and convenience anytime and anywhere.
                                </p>
                            </div>
                        </article>

                        <article className="benefit-card">
                            <div className="benefit-icon-wrapper">
                                <Check size={32} strokeWidth={2} />
                            </div>
                            <div className="benefit-content">
                                <h3 className="benefit-title">Verified Office Spaces</h3>
                                <p className="benefit-description">
                                    Nanospace has the largest collection of verified and approved spaces with flexible lease terms.
                                </p>
                            </div>
                        </article>

                        <article className="benefit-card">
                            <div className="benefit-icon-wrapper">
                                <Users size={32} strokeWidth={2} />
                            </div>
                            <div className="benefit-content">
                                <h3 className="benefit-title">100% Offline Support</h3>
                                <p className="benefit-description">
                                    We provide complete offline support from choosing the best space, scheduling site visits, bookings, and after sales.
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="contact-form-section">
                <div className="contact-form-container">
                    <div className="contact-form-content">
                        {/* Left Side - Image */}
                        <div className="contact-form-image">
                            <img
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                                alt="Office Space"
                            />
                        </div>

                        {/* Right Side - Form */}
                        <div className="contact-form-wrapper">
                            <div className="form-header">
                                <h2 className="form-main-title">
                                    Interested in Office Space for Rent in {cityData.cityName}
                                </h2>
                                <div className="title-underline"></div>
                            </div>

                            <p className="form-subtitle">Connect with our office space expert Now!</p>

                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-field">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name*"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-field">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email*"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-field">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone*"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <p className="privacy-text">
                                    Please visit the <a href="/privacy-policy">privacy policy</a> to understand how Cofynd handles your personal data.
                                </p>

                                <div className="form-cta-buttons">
                                    <button type="submit" className="btn-enquire-primary">
                                        Enquire Now
                                    </button>
                                    <a href="tel:9940591963" className="btn-call-secondary">
                                        Call Now: 9940591963
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted Companies Section */}
            <TrustedCompanies />

            {selectedLocation && (
                <BookingModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    hotel={selectedLocation}
                    bookingType="office"
                />
            )}
        </div>
    );
};

export default OfficeSpaces;


