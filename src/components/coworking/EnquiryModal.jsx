import React, { useState } from 'react';
import './EnquiryModal.css';

const EnquiryModal = ({ isOpen, onClose, officeType, officeImage }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        type: officeType || '',
        seats: ''
    });

    // Update formData when officeType changes
    React.useEffect(() => {
        if (officeType) {
            setFormData(prev => ({ ...prev, type: officeType }));
        }
    }, [officeType]);

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
        <div className="enquiry-modal-overlay" onClick={onClose}>
            <div className="enquiry-modal-container" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="enquiry-close-btn" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Left Section - Info */}
                <div className="enquiry-left-section">
                    <h2 className="enquiry-main-title">Find Your Perfect Office Now !</h2>
                    <p className="enquiry-subtitle">
                        Our space experts will provide customized quote with detailed inventory as per your needs
                    </p>

                    {/* Features List */}
                    <div className="enquiry-features">
                        <div className="enquiry-feature-row">
                            <div className="enquiry-feature">
                                <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" fill="#0d6efd" />
                                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Customized Workspaces</span>
                            </div>
                            <div className="enquiry-feature">
                                <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" fill="#0d6efd" />
                                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Prime Locations</span>
                            </div>
                        </div>
                        <div className="enquiry-feature-row">
                            <div className="enquiry-feature">
                                <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" fill="#0d6efd" />
                                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Free Guided Tours</span>
                            </div>
                            <div className="enquiry-feature">
                                <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" fill="#0d6efd" />
                                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Flexible Terms</span>
                            </div>
                        </div>
                    </div>

                    {/* Trusted Companies */}
                    <div className="enquiry-trusted-section">
                        <h3 className="trusted-title">Trusted by top companies</h3>
                        <div className="trusted-logos">
                            <img src="/images/logos/inox.png" alt="INOX" />
                            <img src="/images/logos/kotak.png" alt="Kotak" />
                            <img src="/images/logos/razorpay.png" alt="Razorpay" />
                            <img src="/images/logos/doubtnut.png" alt="Doubtnut" />
                            <img src="/images/logos/credable.png" alt="Credable" />
                            <img src="/images/logos/acciojob.png" alt="AccioJob" />
                            <img src="/images/logos/purple.png" alt="Purple" />
                            <img src="/images/logos/classplus.png" alt="Classplus" />
                            <img src="/images/logos/other.png" alt="Other" />
                        </div>
                    </div>
                </div>

                {/* Right Section - Form */}
                <div className="enquiry-right-section">
                    <h2 className="enquiry-form-title">Yes, I am Interested !</h2>
                    <p className="enquiry-form-subtitle">Fill your details for a customized quote</p>

                    <form onSubmit={handleSubmit} className="enquiry-form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name*"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="enquiry-input"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email*"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="enquiry-input"
                        />

                        <div className="enquiry-phone-input">
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
                                className="enquiry-input phone-field"
                            />
                        </div>

                        <div className="enquiry-select-row">
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="enquiry-select"
                            >
                                <option value="">Type</option>
                                <option value="Coworking Space">Coworking Space</option>
                                <option value="Virtual Office">Virtual Office</option>
                                <option value="Private Office">Private Office</option>
                                <option value="Managed Office">Managed Office</option>
                                <option value="Enterprise Solution">Enterprise Solution</option>
                            </select>

                            <select
                                name="seats"
                                value={formData.seats}
                                onChange={handleChange}
                                className="enquiry-select"
                            >
                                <option value="">No. Of Seats</option>
                                <option value="1-5">1-5</option>
                                <option value="6-10">6-10</option>
                                <option value="11-20">11-20</option>
                                <option value="21-50">21-50</option>
                                <option value="50+">50+</option>
                            </select>
                        </div>

                        <button type="submit" className="enquiry-submit-btn">
                            Submit
                        </button>

                        {/* Contact Expert */}
                        <div className="enquiry-contact-expert">
                            <img src="/images/expert.jpg" alt="Space Expert" className="expert-image" />
                            <div className="expert-info">
                                <p className="expert-text">Connect with our space expert</p>
                                <a href="mailto:hello@nanospace.com" className="expert-email">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    hello@nanospace.com
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EnquiryModal;
