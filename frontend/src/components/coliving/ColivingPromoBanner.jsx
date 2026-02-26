import React from 'react';
import './ColivingPromoBanner.css';

const ColivingPromoBanner = ({ content }) => {
    if (!content || !content.columns) return null;

    return (
        <div className="coliving-promo-banner">
            <div className="promo-banner-container">
                {content.columns.map((col, index) => (
                    <div key={index} className={`promo-column ${col.style}`}>
                        <div className="promo-content">
                            <div className="promo-image">
                                <img
                                    src={col.image}
                                    alt={col.title}
                                />
                            </div>
                            <div className="promo-text">
                                <h3 className="promo-title">{col.title}</h3>
                                <p className="promo-description">{col.description}</p>
                                <a href="#enquire" className="promo-btn">Enquire Now</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColivingPromoBanner;
