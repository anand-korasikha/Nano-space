import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Info, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HotelRooms.css';
import hotelsData from '../data/hotelsData.json';

const HotelRooms = () => {
    return (
        <>
            {/* Hero Section with Image */}
            <div className="hotel-hero-section">
                <div className="hotel-hero-overlay"></div>
                <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&h=400&fit=crop"
                    alt="Luxury Hotels"
                    className="hotel-hero-image"
                />
                <div className="hotel-hero-content">
                    <h1>Premium Hotel Rooms</h1>
                    <p>Discover comfortable stays at the best prices across India</p>
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
                    <span className="breadcrumb-current">Hotel Rooms</span>
                </nav>
            </div>

            <div className="hotel-rooms-page">
                <div className="hotel-rooms-container">

                    {/* Hyderabad Hotels */}
                    <CityHotelsCarousel
                        cityName="Hyderabad"
                        hotels={hotelsData.hyderabad}
                        reverse={false}
                    />

                    {/* Bangalore Hotels */}
                    <CityHotelsCarousel
                        cityName="Bangalore"
                        hotels={hotelsData.bangalore}
                        reverse={true}
                    />

                    {/* Chennai Hotels */}
                    <CityHotelsCarousel
                        cityName="Chennai"
                        hotels={hotelsData.chennai}
                        reverse={false}
                    />
                </div>
            </div>
        </>
    );
};

const CityHotelsCarousel = ({ cityName, hotels, reverse = false }) => {
    const carouselRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Reverse the hotels array if reverse prop is true
    const displayHotels = reverse ? [...hotels].reverse() : hotels;

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
            <h2 className="city-title">Hotels in {cityName}</h2>

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
                    className="hotels-carousel"
                    ref={carouselRef}
                    onScroll={checkScrollButtons}
                >
                    {displayHotels.map((hotel) => (
                        <HotelCard key={hotel.id} hotel={hotel} />
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

const HotelCard = ({ hotel }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e) => {
        e.preventDefault();
        setCurrentImageIndex((prev) =>
            prev === hotel.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = (e) => {
        e.preventDefault();
        setCurrentImageIndex((prev) =>
            prev === 0 ? hotel.images.length - 1 : prev - 1
        );
    };

    return (
        <div className="hotel-card">
            <div className="hotel-image-container">
                {hotel.badge && (
                    <div className="hotel-badge">{hotel.badge}</div>
                )}
                <img
                    src={hotel.images[currentImageIndex]}
                    alt={hotel.name}
                    className="hotel-image"
                />
                <button className="image-nav-btn prev-btn" onClick={prevImage}>
                    <ChevronLeft size={20} />
                </button>
                <button className="image-nav-btn next-btn" onClick={nextImage}>
                    <ChevronRight size={20} />
                </button>
                <div className="image-indicators">
                    {hotel.images.map((_, index) => (
                        <span
                            key={index}
                            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>

            <div className="hotel-content">
                <h3 className="hotel-name">{hotel.name}</h3>

                <div className="hotel-stars">
                    {[...Array(hotel.stars)].map((_, i) => (
                        <Star key={i} size={14} fill="#FFB800" color="#FFB800" />
                    ))}
                </div>

                <div className="hotel-location">{hotel.location}</div>

                <div className="hotel-rating">
                    <span className="rating-score">{hotel.rating}/10</span>
                    <span className="rating-text">{hotel.ratingText}</span>
                    <span className="rating-reviews">({hotel.reviews} review{hotel.reviews > 1 ? 's' : ''})</span>
                </div>

                <div className="hotel-pricing">
                    {hotel.memberPrice && (
                        <div className="member-price-badge">
                            <span>💎 Member Price available</span>
                        </div>
                    )}

                    {hotel.discount && (
                        <div className="discount-badge">{hotel.discount}% off</div>
                    )}

                    <div className="price-container">
                        <div className="current-price">
                            ₹{hotel.price.toLocaleString('en-IN')}
                            <Info size={14} className="info-icon" />
                        </div>
                        <div className="original-price">₹{hotel.originalPrice.toLocaleString('en-IN')}</div>
                    </div>

                    <div className="total-price">
                        ₹{hotel.totalPrice.toLocaleString('en-IN')} total
                    </div>
                    <div className="price-note">includes taxes & fees</div>
                </div>
            </div>
        </div>
    );
};

export default HotelRooms;
