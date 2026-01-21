import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Building2, MapPin, IndianRupee, Upload, CheckCircle2, Phone, Mail, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { submitProperty } from '../services/propertyService';
import { sendEmailOTP, sendPhoneOTP } from '../services/otpService';
import LocationPicker from '../components/common/LocationPicker';
import InlineOTPVerification from '../components/common/InlineOTPVerification';
import './Sell.css';

const Sell = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        propertyType: '',
        propertyName: '',
        location: '',
        city: '',
        price: '',
        period: 'month',
        area: '',
        description: '',
        amenities: [],
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
        images: [],
        mapLocation: null
    });

    const [submitted, setSubmitted] = useState(false);

    // Inline OTP verification states
    const [emailVerified, setEmailVerified] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [showEmailOTP, setShowEmailOTP] = useState(false);
    const [showPhoneOTP, setShowPhoneOTP] = useState(false);

    const propertyTypes = [
        'Coworking Space',
        'Coliving Space',
        'Virtual Office',
        'Hotel Room',
        'Event Space',
        'Party Hall',
        'Private Theatre',
        'Commercial Property',
        'Residential Property'
    ];

    const amenitiesList = [
        'WiFi',
        'Parking',
        'AC',
        'Power Backup',
        'Security',
        'Cafeteria',
        'Meeting Rooms',
        'Gym',
        'Swimming Pool',
        'Garden',
        'Elevator',
        'CCTV'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAmenityToggle = (amenity) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if user is authenticated
        if (!user) {
            alert('Please log in to submit a property listing.');
            navigate('/login');
            return;
        }

        // Check if email and phone are verified
        if (!emailVerified) {
            alert('Please verify your email address before submitting.');
            return;
        }

        if (!phoneVerified) {
            alert('Please verify your phone number before submitting.');
            return;
        }

        // Both verifications complete, submit property
        submitPropertyData();
    };

    // Handle verify email button click
    const handleVerifyEmail = () => {
        if (!formData.ownerEmail) {
            alert('Please enter your email address first.');
            return;
        }

        const result = sendEmailOTP(formData.ownerEmail);
        if (result.success) {
            setShowEmailOTP(true);
        }
    };

    // Handle verify phone button click
    const handleVerifyPhone = () => {
        if (!formData.ownerPhone) {
            alert('Please enter your phone number first.');
            return;
        }

        const result = sendPhoneOTP(formData.ownerPhone);
        if (result.success) {
            setShowPhoneOTP(true);
        }
    };

    // Handle email verification complete
    const handleEmailVerified = () => {
        setEmailVerified(true);
        setShowEmailOTP(false);
    };

    // Handle phone verification complete
    const handlePhoneVerified = () => {
        setPhoneVerified(true);
        setShowPhoneOTP(false);
    };

    const submitPropertyData = () => {
        // Prepare property data matching the property service schema
        const propertyData = {
            name: formData.propertyName,
            type: formData.propertyType,
            location: formData.location,
            city: formData.city,
            price: `₹${formData.price}`,
            period: formData.period,
            area: formData.area,
            description: formData.description,
            amenities: formData.amenities,
            images: formData.images.map(file => URL.createObjectURL(file)), // Convert to URLs
            mapLocation: formData.mapLocation,
            contactName: formData.ownerName,
            contactEmail: formData.ownerEmail,
            contactPhone: formData.ownerPhone
        };

        // Submit property using the property service
        const result = submitProperty(propertyData, user.id);

        if (result) {
            setSubmitted(true);
            setShowOTPModal(false);

            // Redirect to owner dashboard after 2 seconds
            setTimeout(() => {
                navigate('/owner-dashboard');
            }, 2000);
        } else {
            alert('Error submitting property. Please try again.');
        }
    };

    return (
        <>
            {/* Hero Section */}
            <div className="sell-hero-section">
                <div className="sell-hero-overlay"></div>
                <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=400&fit=crop"
                    alt="Sell Your Property"
                    className="sell-hero-image"
                />
                <div className="sell-hero-content">
                    <h1>List Your Property</h1>
                    <p>Reach thousands of potential buyers and renters</p>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="breadcrumb-container">
                <nav className="breadcrumb">
                    <Link to="/" className="breadcrumb-link">
                        <Home size={16} />
                        <span>Home</span>
                    </Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">Sell</span>
                </nav>
            </div>

            <div className="sell-page">
                <div className="sell-container">
                    {/* Benefits Section */}
                    <div className="benefits-section">
                        <h2>Why List With Us?</h2>
                        <div className="benefits-grid">
                            <div className="benefit-card">
                                <div className="benefit-icon">
                                    <Building2 size={32} />
                                </div>
                                <h3>Wide Reach</h3>
                                <p>Connect with thousands of verified buyers and renters across India</p>
                            </div>
                            <div className="benefit-card">
                                <div className="benefit-icon">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h3>Quick Listing</h3>
                                <p>Get your property listed in minutes with our simple process</p>
                            </div>
                            <div className="benefit-card">
                                <div className="benefit-icon">
                                    <IndianRupee size={32} />
                                </div>
                                <h3>Best Price</h3>
                                <p>Get the best value for your property with competitive pricing</p>
                            </div>
                        </div>
                    </div>

                    {/* Listing Form */}
                    <div className="form-section">
                        <h2>Property Details</h2>

                        {submitted && (
                            <div className="success-message">
                                <CheckCircle2 size={24} />
                                <div>
                                    <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
                                        Property submitted successfully!
                                    </p>
                                    <p style={{ margin: 0, fontSize: '0.9rem' }}>
                                        Your property is pending admin approval. Redirecting to your dashboard...
                                    </p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="sell-form">
                            {/* Property Type */}
                            <div className="form-group">
                                <label htmlFor="propertyType">Property Type *</label>
                                <select
                                    id="propertyType"
                                    name="propertyType"
                                    value={formData.propertyType}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Property Type</option>
                                    {propertyTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Property Name */}
                            <div className="form-group">
                                <label htmlFor="propertyName">Property Name *</label>
                                <input
                                    type="text"
                                    id="propertyName"
                                    name="propertyName"
                                    value={formData.propertyName}
                                    onChange={handleInputChange}
                                    placeholder="Enter property name"
                                    required
                                />
                            </div>

                            {/* Location & City */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="location">Location/Area *</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Banjara Hills"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">City *</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Hyderabad"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Price & Area */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="price">Price (₹) *</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="Enter price"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="period">Pricing Period *</label>
                                    <select
                                        id="period"
                                        name="period"
                                        value={formData.period}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="month">Per Month</option>
                                        <option value="day">Per Day</option>
                                        <option value="year">Per Year</option>
                                        <option value="hour">Per Hour</option>
                                        <option value="seat">Per Seat</option>
                                    </select>
                                </div>
                            </div>

                            {/* Area */}
                            <div className="form-group">
                                <label htmlFor="area">Area (sq.ft) *</label>
                                <input
                                    type="number"
                                    id="area"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleInputChange}
                                    placeholder="Enter area"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="form-group">
                                <label htmlFor="description">Description *</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe your property..."
                                    rows="5"
                                    required
                                ></textarea>
                            </div>

                            {/* Amenities */}
                            <div className="form-group">
                                <label>Amenities</label>
                                <div className="amenities-grid">
                                    {amenitiesList.map(amenity => (
                                        <div
                                            key={amenity}
                                            className={`amenity-chip ${formData.amenities.includes(amenity) ? 'selected' : ''}`}
                                            onClick={() => handleAmenityToggle(amenity)}
                                        >
                                            {amenity}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Map Location Picker */}
                            <LocationPicker
                                value={formData.mapLocation}
                                onChange={(location) => setFormData(prev => ({ ...prev, mapLocation: location }))}
                                defaultCenter={[17.385044, 78.486671]} // Hyderabad coordinates
                            />

                            {/* Owner Details */}
                            <div className="owner-details-section">
                                <h3>Contact Information</h3>

                                <div className="form-group">
                                    <label htmlFor="ownerName">Your Name *</label>
                                    <div className="input-with-icon">
                                        <User size={20} />
                                        <input
                                            type="text"
                                            id="ownerName"
                                            name="ownerName"
                                            value={formData.ownerName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="label-with-action">
                                        <label htmlFor="ownerEmail">Email *</label>
                                        {emailVerified ? (
                                            <span className="verified-badge">
                                                <CheckCircle2 size={16} />
                                                Verified
                                            </span>
                                        ) : (
                                            <button
                                                type="button"
                                                className="verify-btn"
                                                onClick={handleVerifyEmail}
                                                disabled={!formData.ownerEmail || showEmailOTP}
                                            >
                                                Verify Email
                                            </button>
                                        )}
                                    </div>
                                    <div className="input-with-icon">
                                        <Mail size={20} />
                                        <input
                                            type="email"
                                            id="ownerEmail"
                                            name="ownerEmail"
                                            value={formData.ownerEmail}
                                            onChange={handleInputChange}
                                            placeholder="your.email@example.com"
                                            required
                                            disabled={emailVerified}
                                        />
                                    </div>
                                    {showEmailOTP && (
                                        <InlineOTPVerification
                                            identifier={formData.ownerEmail}
                                            type="email"
                                            onVerified={handleEmailVerified}
                                            onCancel={() => setShowEmailOTP(false)}
                                        />
                                    )}
                                </div>

                                <div className="form-group">
                                    <div className="label-with-action">
                                        <label htmlFor="ownerPhone">Phone Number *</label>
                                        {phoneVerified ? (
                                            <span className="verified-badge">
                                                <CheckCircle2 size={16} />
                                                Verified
                                            </span>
                                        ) : (
                                            <button
                                                type="button"
                                                className="verify-btn"
                                                onClick={handleVerifyPhone}
                                                disabled={!formData.ownerPhone || showPhoneOTP}
                                            >
                                                Verify Phone
                                            </button>
                                        )}
                                    </div>
                                    <div className="input-with-icon">
                                        <Phone size={20} />
                                        <input
                                            type="tel"
                                            id="ownerPhone"
                                            name="ownerPhone"
                                            value={formData.ownerPhone}
                                            onChange={handleInputChange}
                                            placeholder="+91 XXXXX XXXXX"
                                            required
                                            disabled={phoneVerified}
                                        />
                                    </div>
                                    {showPhoneOTP && (
                                        <InlineOTPVerification
                                            identifier={formData.ownerPhone}
                                            type="phone"
                                            onVerified={handlePhoneVerified}
                                            onCancel={() => setShowPhoneOTP(false)}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="form-group">
                                <label htmlFor="images">Property Images</label>
                                <div className="upload-area">
                                    <Upload size={32} />
                                    <p>Click to upload or drag and drop</p>
                                    <span>PNG, JPG up to 10MB</span>
                                    <input
                                        type="file"
                                        id="images"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                    />
                                </div>
                                {formData.images.length > 0 && (
                                    <div className="uploaded-images">
                                        <p>{formData.images.length} image(s) selected</p>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={!user || submitted}
                                style={!user || submitted ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                            >
                                {submitted ? 'Submitted! Redirecting...' : user ? 'Submit Property Listing' : 'Login Required to Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sell;
