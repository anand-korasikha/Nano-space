import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Check, Wifi, Monitor, Users, Printer, Coffee, Car } from 'lucide-react';
import cityOfficeSpacesData from '../data/cityOfficeSpaces.json';
import { getCityIcon } from '../assets/icons/cityIcons';
import BookingModal from '../components/BookingModal';
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
