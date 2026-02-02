import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Check, Wifi, Monitor, Users, Printer, Coffee, Car } from 'lucide-react';
import cityOfficeSpacesData from '../data/cityOfficeSpaces.json';
import { getCityIcon } from '../assets/icons/cityIcons';
import BookingModal from '../components/BookingModal';
import TrustedCompanies from '../components/home/TrustedCompanies';
import './OfficeSpaces.css';

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
            {/* Hero Section */}
            <section
                className="hero-container"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${cityData.heroImage})`
                }}
            >
                <div className="hero-content-split">
                    {/* Left Side: Content & Features */}
                    <div className="hero-content-left">
                        <h1 className="hero-main-title">
                            Choose from 1,000+ Office Space For Rent in <span className="highlight-city">{cityData.cityName}</span>
                        </h1>
                        <div className="hero-locations-wrapper">
                            <div className="city-main-icon">
                                {getCityIcon(cityData.cityName)}
                            </div>
                            <p className="hero-locations-text">
                                {cityData.locationsText}
                            </p>
                        </div>

                        <div className="hero-features-grid">
                            <div className="features-column">
                                {firstHalfFeatures.map((feature, index) => (
                                    <div key={index} className="hero-feature-item">
                                        <div className="check-icon-wrapper">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="features-column">
                                {secondHalfFeatures.map((feature, index) => (
                                    <div key={index} className="hero-feature-item">
                                        <div className="check-icon-wrapper">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Enquiry Form Card */}
                    <div className="hero-form-card">
                        <div className="form-card-header">
                            <h2>Fully Furnished Office Space For Rent In {cityData.cityName}</h2>
                            <p>Our Office Space Expert will connect with you with the best options</p>
                        </div>

                        <form className="hero-card-form" onSubmit={handleSubmit}>
                            <div className="card-form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name*"
                                    className="card-input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="card-form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email*"
                                    className="card-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="card-form-group">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone*"
                                    className="card-input"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-card-enquire">Enquire Now</button>
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

            {/* Amenities Section */}
            <section className="amenities-section">
                <div className="amenities-wrapper">
                    <div className="locations-header-container">
                        <div className="title-decoration-wrapper">
                            <div className="yellow-glow-circle"></div>
                            <h2 className="locations-section-title">Premium Office Space Amenities</h2>
                        </div>
                        <div className="blue-title-underline"></div>
                        <p className="amenities-subtitle">Enjoy exclusive benefits across all the office space in {cityData.cityName} locations</p>
                    </div>

                    <div className="amenities-grid">
                        {cityData.amenities?.map((amenity) => (
                            <div key={amenity.id} className="amenity-item">
                                <div className="amenity-icon-box">
                                    {amenity.id === 'wifi' && <Wifi size={24} />}
                                    {amenity.id === 'workstation' && <Monitor size={24} />}
                                    {amenity.id === 'meeting' && <Users size={24} />}
                                    {amenity.id === 'printer' && <Printer size={24} />}
                                    {amenity.id === 'pantry' && <Coffee size={24} />}
                                    {amenity.id === 'parking' && <Car size={24} />}
                                </div>
                                <div className="amenity-text">
                                    <h4>{amenity.title}</h4>
                                    <p>{amenity.description}</p>
                                </div>
                            </div>
                        ))}
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


