import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Info, Home, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import './EventSpaces.css';
import eventSpacesData from '../data/eventSpacesData.json';

const EventSpaces = () => {
    return (
        <>
            {/* Hero Section with Image */}
            <div className="event-hero-section">
                <div className="event-hero-overlay"></div>
                <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&h=400&fit=crop"
                    alt="Event Spaces & Convention Centers"
                    className="event-hero-image"
                />
                <div className="event-hero-content">
                    <h1>Event Spaces & Convention Centers</h1>
                    <p>Host memorable events at premium venues across India</p>
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
                    <span className="breadcrumb-current">Event Spaces</span>
                </nav>
            </div>

            <div className="event-spaces-page">
                <div className="event-spaces-container">

                    {/* Hyderabad Event Spaces */}
                    <CityEventSpacesCarousel
                        cityName="Hyderabad"
                        venues={eventSpacesData.hyderabad}
                        reverse={false}
                    />

                    {/* Bangalore Event Spaces */}
                    <CityEventSpacesCarousel
                        cityName="Bangalore"
                        venues={eventSpacesData.bangalore}
                        reverse={true}
                    />

                    {/* Chennai Event Spaces */}
                    <CityEventSpacesCarousel
                        cityName="Chennai"
                        venues={eventSpacesData.chennai}
                        reverse={false}
                    />
                </div>
            </div>
        </>
    );
};

const CityEventSpacesCarousel = ({ cityName, venues, reverse = false }) => {
    const carouselRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Reverse the venues array if reverse prop is true
    const displayVenues = reverse ? [...venues].reverse() : venues;

    const checkScrollButtons = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 320; // Card width + gap
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
            <h2 className="city-title">Event Spaces in {cityName}</h2>

            <div className="carousel-container">
                {canScrollLeft && (
                    <button
                        className="carousel-nav-btn left"
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={24} />
                    </button>
                )}

                <div
                    className="venues-carousel"
                    ref={carouselRef}
                    onScroll={checkScrollButtons}
                >
                    {displayVenues.map((venue) => (
                        <VenueCard key={venue.id} venue={venue} />
                    ))}
                </div>

                {canScrollRight && (
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

const VenueCard = ({ venue }) => {
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
        <div className="venue-card">
            <div className="venue-image-container">
                {venue.badge && (
                    <div className="venue-badge">{venue.badge}</div>
                )}
                <img
                    src={venue.images[currentImageIndex]}
                    alt={venue.name}
                    className="venue-image"
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

            <div className="venue-content">
                <h3 className="venue-name">{venue.name}</h3>

                <div className="venue-stars">
                    {[...Array(venue.stars)].map((_, i) => (
                        <Star key={i} size={14} fill="#FFB800" color="#FFB800" />
                    ))}
                </div>

                <div className="venue-location">{venue.location}</div>

                {venue.capacity && (
                    <div className="venue-capacity">
                        <Users size={16} />
                        <span>{venue.capacity}</span>
                    </div>
                )}

                <div className="venue-rating">
                    <span className="rating-score">{venue.rating}/10</span>
                    <span className="rating-text">{venue.ratingText}</span>
                    <span className="rating-reviews">({venue.reviews} review{venue.reviews > 1 ? 's' : ''})</span>
                </div>

                <div className="venue-pricing">
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

export default EventSpaces;
