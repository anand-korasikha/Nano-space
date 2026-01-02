import React, { useState } from 'react';
import './ColivingEnquiryModal.css';

const ColivingEnquiryModal = ({ isOpen, onClose, propertyName }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        type: '',
        budget: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
        onClose();
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="coliving-modal-overlay" onClick={onClose}>
            <div className="coliving-modal-container" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="coliving-close-btn" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Left Section - Brands & Image */}
                <div className="coliving-left-section">
                    {/* Brand Logos Background */}
                    <div className="brand-logos-background">
                        <div className="brand-logo brand-logo-1">
                            <img src="/images/clients/img1.png" alt="Brand" />
                        </div>
                        <div className="brand-logo brand-logo-2">
                            <img src="/images/clients/img2.png" alt="Brand" />
                        </div>
                        <div className="brand-logo brand-logo-3">
                            <img src="/images/clients/img3.png" alt="Brand" />
                        </div>
                        <div className="brand-logo brand-logo-4">
                            <img src="/images/clients/img4.png" alt="Brand" />
                        </div>
                        <div className="brand-logo brand-logo-5">
                            <img src="/images/clients/img5.png" alt="Brand" />
                        </div>
                        <div className="brand-logo brand-logo-6">
                            <img src="/images/clients/img6.png" alt="Brand" />
                        </div>
                        <div className="brand-logo brand-logo-7">
                            <img src="/images/clients/img7.png" alt="Brand" />
                        </div>
                        <div className="brand-logo brand-logo-8">
                            <img src="/images/clients/img8.png" alt="Brand" />
                        </div>
                    </div>

                    {/* Professional Woman Image */}
                    <div className="professional-image-wrapper">
                        <img
                            src="/images/professional-woman.png"
                            alt="Professional"
                            className="professional-image"
                        />
                    </div>

                    {/* Top Brands Section */}
                    <div className="top-brands-section">
                        <div className="star-rating">
                            <span className="star">⭐</span>
                            <span className="star">⭐</span>
                            <span className="star">⭐</span>
                            <span className="star">⭐</span>
                            <span className="star">⭐</span>
                        </div>
                        <h3 className="brands-title">Our Top Brands</h3>
                        <p className="brands-description">
                            Find affordable coliving spaces across 500+ cities in India.
                        </p>
                    </div>
                </div>

                {/* Right Section - Form */}
                <div className="coliving-right-section">
                    <h2 className="coliving-form-title">Interested in this Property</h2>
                    <p className="coliving-form-subtitle">Fill your details to find your next coliving home</p>

                    <form onSubmit={handleSubmit} className="coliving-form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name*"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="coliving-input"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email*"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="coliving-input"
                        />

                        <div className="coliving-phone-input">
                            <select className="country-code">
                                <option value="+91">+91</option>
                            </select>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone*"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="coliving-input phone-field"
                            />
                        </div>

                        <div className="coliving-select-row">
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="coliving-select"
                            >
                                <option value="">Type</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Triple">Triple</option>
                            </select>

                            <select
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="coliving-select"
                            >
                                <option value="">Budget</option>
                                <option value="0-10000">₹0 - ₹10,000</option>
                                <option value="10000-15000">₹10,000 - ₹15,000</option>
                                <option value="15000-20000">₹15,000 - ₹20,000</option>
                                <option value="20000+">₹20,000+</option>
                            </select>
                        </div>

                        <button type="submit" className="coliving-submit-btn">
                            Submit
                        </button>

                        {/* Contact Expert */}
                        <div className="coliving-contact-expert">
                            <img src="/images/expert.jpg" alt="Space Expert" className="expert-image" />
                            <div className="expert-info">
                                <p className="expert-text">Connect with our space expert</p>
                                <a href="mailto:hello@Nanospace.com" className="expert-email">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    hello@Nanospace.com
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ColivingEnquiryModal;
