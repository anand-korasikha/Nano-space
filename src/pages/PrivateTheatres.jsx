import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Info, Home, Users, Film, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import './PrivateTheatres.css';
import privateTheatresData from '../data/privateTheatresData.json';

const PrivateTheatres = () => {
    return (
        <>
            {/* Hero Section with Image */}
            <div className="theatre-hero-section">
                <div className="theatre-hero-overlay"></div>
                <img
                    src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&h=400&fit=crop"
                    alt="Private Theatres & Screening Rooms"
                    className="theatre-hero-image"
                />
                <div className="theatre-hero-content">
                    <h1>Private Theatres & Screening Rooms</h1>
                    <p>Experience cinema like never before in exclusive private screening rooms</p>
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
                    <span className="breadcrumb-current">Private Theatres</span>
                </nav>
            </div>

            <div className="private-theatres-page">
                <div className="theatres-container">

                    {/* Hyderabad Private Theatres */}
                    <CityTheatresSection
                        cityName="Hyderabad"
                        theatres={privateTheatresData.hyderabad}
                    />

                    {/* Bangalore Private Theatres */}
                    <CityTheatresSection
                        cityName="Bangalore"
                        theatres={privateTheatresData.bangalore}
                    />

                    {/* Chennai Private Theatres */}
                    <CityTheatresSection
                        cityName="Chennai"
                        theatres={privateTheatresData.chennai}
                    />
                </div>
            </div>
        </>
    );
};

const CityTheatresSection = ({ cityName, theatres }) => {
    return (
        <div className="city-section">
            <h2 className="city-title">Private Theatres in {cityName}</h2>

            <div className="theatres-grid">
                {theatres.map((theatre) => (
                    <TheatreCard key={theatre.id} theatre={theatre} />
                ))}
            </div>
        </div>
    );
};

const TheatreCard = ({ theatre }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e) => {
        e.preventDefault();
        setCurrentImageIndex((prev) =>
            prev === theatre.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = (e) => {
        e.preventDefault();
        setCurrentImageIndex((prev) =>
            prev === 0 ? theatre.images.length - 1 : prev - 1
        );
    };

    return (
        <div className="theatre-card">
            <div className="theatre-image-container">
                {theatre.badge && (
                    <div className={`theatre-badge ${theatre.badge.toLowerCase()}`}>
                        {theatre.badge}
                    </div>
                )}
                <img
                    src={theatre.images[currentImageIndex]}
                    alt={theatre.name}
                    className="theatre-image"
                />
                <button className="image-nav-btn prev-btn" onClick={prevImage}>
                    <ChevronLeft size={20} />
                </button>
                <button className="image-nav-btn next-btn" onClick={nextImage}>
                    <ChevronRight size={20} />
                </button>
                <div className="image-indicators">
                    {theatre.images.map((_, index) => (
                        <span
                            key={index}
                            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>

            <div className="theatre-content">
                <h3 className="theatre-name">{theatre.name}</h3>

                <div className="theatre-stars">
                    {[...Array(theatre.stars)].map((_, i) => (
                        <Star key={i} size={14} fill="#FFB800" color="#FFB800" />
                    ))}
                </div>

                <div className="theatre-location">{theatre.location}</div>

                {theatre.capacity && (
                    <div className="theatre-capacity">
                        <Users size={16} />
                        <span>{theatre.capacity}</span>
                    </div>
                )}

                <div className="theatre-rating">
                    <span className="rating-score">{theatre.rating}/10</span>
                    <span className="rating-text">{theatre.ratingText}</span>
                    <span className="rating-reviews">({theatre.reviews} review{theatre.reviews > 1 ? 's' : ''})</span>
                </div>

                <div className="theatre-pricing">
                    {theatre.memberPrice && (
                        <div className="member-price-badge">
                            <span>💎 Member Price available</span>
                        </div>
                    )}

                    {theatre.discount && (
                        <div className="discount-badge">{theatre.discount}% off</div>
                    )}

                    <div className="price-container">
                        <div className="current-price">
                            ₹{theatre.price.toLocaleString('en-IN')}
                            <Info size={14} className="info-icon" />
                        </div>
                        <div className="original-price">₹{theatre.originalPrice.toLocaleString('en-IN')}</div>
                    </div>

                    <div className="total-price">
                        ₹{theatre.totalPrice.toLocaleString('en-IN')} total
                    </div>
                    <div className="price-note">includes taxes & fees</div>
                </div>
            </div>
        </div>
    );
};

export default PrivateTheatres;
