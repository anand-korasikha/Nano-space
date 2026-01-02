import React from 'react';
import './WhatsAppCTABanner.css';

const WhatsAppCTABanner = ({ content }) => {
    if (!content) return null;

    return (
        <section className="whatsapp-cta-banner">
            <div className="whatsapp-cta-container">
                <div className="whatsapp-cta-content">
                    <h2 className="whatsapp-cta-title">
                        {content.title}
                    </h2>
                    <p className="whatsapp-cta-subtitle">
                        {content.subtitle}
                    </p>
                    <a href="#enquire" className="whatsapp-cta-button">
                        {content.buttonText}
                    </a>
                </div>
                <div className="whatsapp-cta-images">
                    <img
                        src="/images/phone-whatsapp.png"
                        alt="WhatsApp on Phone"
                        className="whatsapp-phone-image"
                    />
                    <img
                        src="/images/woman-phone.png"
                        alt="Woman using phone"
                        className="whatsapp-woman-image"
                    />
                </div>
            </div>
        </section>
    );
};

export default WhatsAppCTABanner;
