import React from 'react';
import { Phone, Mail, MapPin, Award } from 'lucide-react';
import './ServiceProviderCard.css';

const ServiceProviderCard = ({ provider }) => {
    const handleContact = (type, value) => {
        if (type === 'phone') {
            window.location.href = `tel:${value}`;
        } else if (type === 'email') {
            window.location.href = `mailto:${value}`;
        }
    };

    return (
        <div className="service-provider-card">
            <div className="provider-header">
                <div className="provider-avatar">
                    {provider.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="provider-info">
                    <h3 className="provider-name">{provider.name}</h3>
                    <p className="provider-expertise">{provider.expertise}</p>
                </div>
            </div>

            <div className="provider-details">
                <div className="provider-experience">
                    <Award size={16} />
                    <span>{provider.experience} years experience</span>
                </div>
                <div className="provider-location">
                    <MapPin size={16} />
                    <span>{provider.location}</span>
                </div>
            </div>

            <p className="provider-summary">{provider.profileSummary}</p>

            <div className="provider-specializations">
                {provider.specializations.map((spec, index) => (
                    <span key={index} className="specialization-tag">
                        {spec}
                    </span>
                ))}
            </div>

            <div className="provider-contact-actions">
                <button
                    className="contact-btn phone-btn"
                    onClick={() => handleContact('phone', provider.phone)}
                >
                    <Phone size={18} />
                    <span>Call</span>
                </button>
                <button
                    className="contact-btn email-btn"
                    onClick={() => handleContact('email', provider.email)}
                >
                    <Mail size={18} />
                    <span>Email</span>
                </button>
            </div>
        </div>
    );
};

export default ServiceProviderCard;
