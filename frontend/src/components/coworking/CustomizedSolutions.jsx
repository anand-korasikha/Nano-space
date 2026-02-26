import React from 'react';
import { Check } from 'lucide-react';
import './CustomizedSolutions.css';

const CustomizedSolutions = ({ cityName, onEnquireClick }) => {
    const features = [
        {
            id: 1,
            title: 'Customized Office Spaces',
            icon: <Check size={18} />
        },
        {
            id: 2,
            title: 'Prime Locations',
            icon: <Check size={18} />
        },
        {
            id: 3,
            title: 'Free Guided Tours',
            icon: <Check size={18} />
        },
        {
            id: 4,
            title: 'Perfect for 50+ Team Size',
            icon: <Check size={18} />
        }
    ];

    return (
        <section className="customized-solutions-section">
            <div className="customized-solutions-container">
                {/* Left Side - Content */}
                <div className="customized-content">
                    <h2 className="customized-title">
                        Customized office solutions for your team
                    </h2>

                    <div className="customized-features">
                        {features.map((feature) => (
                            <div key={feature.id} className="customized-feature-item">
                                <div className="feature-icon">
                                    {feature.icon}
                                </div>
                                <span className="feature-title">{feature.title}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        className="customized-enquire-btn"
                        onClick={onEnquireClick}
                    >
                        Enquire Now
                    </button>
                </div>

                {/* Right Side - Image */}
                <div className="customized-image">
                    <img
                        src="/images/city-skyline.jpg"
                        alt="Modern city skyline with office buildings"
                        className="customized-img"
                    />
                </div>
            </div>
        </section>
    );
};

export default CustomizedSolutions;
