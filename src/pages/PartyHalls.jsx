import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Info, Home, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import './PartyHalls.css';
import partyHallsData from '../data/partyHallsData.json';
import BookingModal from '../components/BookingModal';

const PartyHalls = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVenue, setSelectedVenue] = useState(null);

    const handleBookNow = (venue) => {
        setSelectedVenue(venue);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedVenue(null);
    };

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
                <BookingModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    hotel={selectedVenue}
                    bookingType="party-hall"
                />
                <div className="party-halls-container">

                    {/* Hyderabad Party Halls */}
                    <CityPartyHallsCarousel
                        cityName="Hyderabad"
                        venues={partyHallsData.hyderabad}
                        reverse={false}
                        onBookNow={handleBookNow}
                    />

                    {/* Bangalore Party Halls */}
                    <CityPartyHallsCarousel
                        cityName="Bangalore"
                        venues={partyHallsData.bangalore}
                        reverse={true}
                        onBookNow={handleBookNow}
                    />

                    {/* Chennai Party Halls */}
                    <CityPartyHallsCarousel
                        cityName="Chennai"
                        venues={partyHallsData.chennai}
                        reverse={false}
                        onBookNow={handleBookNow}
                    />
                </div>
            </div>
        </>
    );
};

const CityPartyHallsCarousel = ({ cityName, venues, reverse = false, onBookNow }) => {
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
                                    <HallCard venue={venue} onBookNow={onBookNow} />
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
                            <HallCard key={venue.id} venue={venue} onBookNow={onBookNow} />
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

const HallCard = ({ venue, onBookNow }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-scroll images
    React.useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prev) =>
                    prev === venue.images.length - 1 ? 0 : prev + 1
                );
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isHovered, venue.images.length]);

    const nextImage = (e) => {
        if (e) e.preventDefault();
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

    // Calculate details for display
    const savingAmount = venue.totalPrice && venue.price ? venue.totalPrice - venue.price : 0;
    // Assuming originalPrice is higher than price, let's derive savings if not explicit
    const derivedSavings = venue.originalPrice ? venue.originalPrice - venue.price : 0;

    return (
        <div
            className={`party-hall-card ${venue.memberPrice ? 'premium-featured' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {venue.memberPrice && (
                <div className="card-badge">Premium</div>
            )}

            {/* Image Slider Section reused as the top media part */}
            <div className="hall-image-container">
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
                <div className="card-header">
                    <h3 className="hall-name">{venue.name}</h3>
                    <div className="rating-badge">
                        <span className="stars">
                            {[...Array(venue.stars)].map((_, i) => (
                                <Star key={i} size={12} fill="#FFB800" color="#FFB800" />
                            ))}
                        </span>
                        <span className="rating-score">{venue.rating}/10</span>
                        <span className="rating-label">{venue.ratingText}</span>
                    </div>
                </div>

                <div className="location-section">
                    <span className="location-icon">📍</span>
                    <span className="location">{venue.location}</span>
                    {venue.capacity && (
                        <span className="guest-capacity">• {venue.capacity}</span>
                    )}
                </div>

                <div className="review-summary">
                    <span className="review-count">({venue.reviews} reviews)</span>
                    <button className="review-btn">Read Reviews</button>
                </div>

                <div className="discount-highlight">
                    {venue.discount && <span className="discount-percent">{venue.discount}% OFF</span>}
                    {venue.memberPrice && <span className="member-badge">Member Price available</span>}
                </div>

                <div className="pricing-section">
                    {venue.originalPrice && <div className="original-price">₹{venue.originalPrice.toLocaleString('en-IN')}</div>}
                    <div className="current-price">₹{venue.price.toLocaleString('en-IN')}</div>
                    <div className="price-label">per booking</div>
                </div>

                <div className="total-section">
                    <span className="total-label">Total (incl. taxes & fees):</span>
                    <span className="total-price">₹{venue.totalPrice.toLocaleString('en-IN')}</span>
                </div>

                {derivedSavings > 0 && (
                    <div className="comparison-savings">
                        You save: <strong>₹{derivedSavings.toLocaleString('en-IN')}</strong>
                    </div>
                )}

                <button className="cta-button" onClick={() => onBookNow(venue)}>
                    Book Now →
                </button>

                <div className="card-footer">
                    <span className="free-cancellation">Free cancellation</span>
                    <div className="verified-badge-container">
                        <img src="/svg/quality-assurance.svg" alt="Verified" className="verified-icon" />
                        <span className="verified-text">Verified venue</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartyHalls;
