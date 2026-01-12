import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Info, Home, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import './PartyHalls.css';
import partyHallsData from '../data/partyHallsData.json';

const PartyHalls = () => {
    return (
        <>
            {/* Hero Section with Image */}
            <div className="party-hero-section">
                <div className="party-hero-overlay"></div>
                <img
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&h=400&fit=crop"
                    alt="Party Halls & Banquet Venues"
                    className="party-hero-image"
                />
                <div className="party-hero-content">
                    <h1>Party Halls & Banquet Venues</h1>
                    <p>Celebrate your special moments at premium party halls</p>
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
                    <span className="breadcrumb-current">Party Halls</span>
                </nav>
            </div>

            <div className="party-halls-page">
                <div className="party-halls-container">

                    {/* Hyderabad Party Halls */}
                    <CityPartyHallsCarousel
                        cityName="Hyderabad"
                        venues={partyHallsData.hyderabad}
                        reverse={false}
                    />

                    {/* Bangalore Party Halls */}
                    <CityPartyHallsCarousel
                        cityName="Bangalore"
                        venues={partyHallsData.bangalore}
                        reverse={true}
                    />

                    {/* Chennai Party Halls */}
                    <CityPartyHallsCarousel
                        cityName="Chennai"
                        venues={partyHallsData.chennai}
                        reverse={false}
                    />
                </div>
            </div>
        </>
    );
};

const CityPartyHallsCarousel = ({ cityName, venues, reverse = false }) => {
    const carouselRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile
    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Reverse the venues array if reverse prop is true
    const displayVenues = reverse ? [...venues].reverse() : venues;

    // Auto-scroll for mobile continuous flow
    React.useEffect(() => {
        if (isMobile) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => {
                    if (reverse) {
                        return prev - 1;
                    } else {
                        return prev + 1;
                    }
                });
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isMobile, reverse]);

    const checkScrollButtons = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction) => {
        if (carouselRef.current) {
            const isMobile = window.innerWidth <= 768;
            const scrollAmount = isMobile
                ? window.innerWidth - 32
                : 320;

            const newScrollLeft = carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            carouselRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
            setTimeout(checkScrollButtons, 300);
        }
    };

    return (
        <div className={`city-section ${reverse ? 'reverse' : ''}`}>
            <h2 className="city-title">Party Halls in {cityName}</h2>

            <div className="carousel-container">
                {!isMobile && canScrollLeft && (
                    <button
                        className="carousel-nav-btn left"
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={24} />
                    </button>
                )}

                {isMobile ? (
                    <div className="halls-carousel-mobile">
                        <div
                            className="halls-carousel-track"
                            style={{
                                transform: reverse 
                                    ? `translateX(${((currentIndex % displayVenues.length) * 100)}%)`
                                    : `translateX(-${((currentIndex % displayVenues.length) * 100)}%)`,
                                transition: 'transform 700ms linear'
                            }}
                        >
                            {[...displayVenues, ...displayVenues, ...displayVenues].map((venue, index) => (
                                <div key={`${venue.id}-${index}`} className="hall-card-wrapper">
                                    <HallCard venue={venue} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div
                        className="halls-carousel"
                        ref={carouselRef}
                        onScroll={checkScrollButtons}
                    >
                        {displayVenues.map((venue) => (
                            <HallCard key={venue.id} venue={venue} />
                        ))}
                    </div>
                )}

                {!isMobile && canScrollRight && (
                    <button
                        className="carousel-nav-btn right"
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={24} />
                    </button>
                )}
            </div>
        </div>
    );
};

const HallCard = ({ venue }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e) => {
        e.preventDefault();
        setCurrentImageIndex((prev) =>
            prev === venue.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = (e) => {
        e.preventDefault();
        setCurrentImageIndex((prev) =>
            prev === 0 ? venue.images.length - 1 : prev - 1
        );
    };

    return (
        <div className="hall-card">
            <div className="hall-image-container">
                {venue.badge && (
                    <div className="hall-badge">{venue.badge}</div>
                )}
                <img
                    src={venue.images[currentImageIndex]}
                    alt={venue.name}
                    className="hall-image"
                />
                <button className="image-nav-btn prev-btn" onClick={prevImage}>
                    <ChevronLeft size={20} />
                </button>
                <button className="image-nav-btn next-btn" onClick={nextImage}>
                    <ChevronRight size={20} />
                </button>
                <div className="image-indicators">
                    {venue.images.map((_, index) => (
                        <span
                            key={index}
                            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>

            <div className="hall-content">
                <h3 className="hall-name">{venue.name}</h3>

                <div className="hall-stars">
                    {[...Array(venue.stars)].map((_, i) => (
                        <Star key={i} size={14} fill="#FFB800" color="#FFB800" />
                    ))}
                </div>

                <div className="hall-location">{venue.location}</div>

                {venue.capacity && (
                    <div className="hall-capacity">
                        <Users size={16} />
                        <span>{venue.capacity}</span>
                    </div>
                )}

                <div className="hall-rating">
                    <span className="rating-score">{venue.rating}/10</span>
                    <span className="rating-text">{venue.ratingText}</span>
                    <span className="rating-reviews">({venue.reviews} review{venue.reviews > 1 ? 's' : ''})</span>
                </div>

                <div className="hall-pricing">
                    {venue.memberPrice && (
                        <div className="member-price-badge">
                            <span>💎 Member Price available</span>
                        </div>
                    )}

                    {venue.discount && (
                        <div className="discount-badge">{venue.discount}% off</div>
                    )}

                    <div className="price-container">
                        <div className="current-price">
                            ₹{venue.price.toLocaleString('en-IN')}
                            <Info size={14} className="info-icon" />
                        </div>
                        <div className="original-price">₹{venue.originalPrice.toLocaleString('en-IN')}</div>
                    </div>

                    <div className="total-price">
                        ₹{venue.totalPrice.toLocaleString('en-IN')} total
                    </div>
                    <div className="price-note">includes taxes & fees</div>
                </div>
            </div>
        </div>
    );
};

export default PartyHalls;
