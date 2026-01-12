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
                    <CityTheatresCarousel
                        cityName="Hyderabad"
                        theatres={privateTheatresData.hyderabad}
                    />

                    {/* Bangalore Private Theatres */}
                    <CityTheatresCarousel
                        cityName="Bangalore"
                        theatres={privateTheatresData.bangalore}
                        reverse={true}
                    />

                    {/* Chennai Private Theatres */}
                    <CityTheatresCarousel
                        cityName="Chennai"
                        theatres={privateTheatresData.chennai}
                    />
                </div>
            </div>
        </>
    );
};

const CityTheatresCarousel = ({ cityName, theatres, reverse = false }) => {
    const carouselRef = React.useRef(null);
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

    // Reverse the theatres array if reverse prop is true
    const displayTheatres = reverse ? [...theatres].reverse() : theatres;

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

    React.useEffect(() => {
        checkScrollButtons();
        window.addEventListener('resize', checkScrollButtons);
        return () => window.removeEventListener('resize', checkScrollButtons);
    }, []);

    return (
        <div className={`city-section ${reverse ? 'reverse' : ''}`}>
            <h2 className="city-title">Private Theatres in {cityName}</h2>

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
                    <div className="theatres-carousel-mobile">
                        <div
                            className="theatres-carousel-track"
                            style={{
                                transform: reverse 
                                    ? `translateX(${((currentIndex % displayTheatres.length) * 100)}%)`
                                    : `translateX(-${((currentIndex % displayTheatres.length) * 100)}%)`,
                                transition: 'transform 700ms linear'
                            }}
                        >
                            {[...displayTheatres, ...displayTheatres, ...displayTheatres].map((theatre, index) => (
                                <div key={`${theatre.id}-${index}`} className="theatre-card-wrapper">
                                    <TheatreCard theatre={theatre} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div
                        className="theatres-carousel"
                        ref={carouselRef}
                        onScroll={checkScrollButtons}
                    >
                        {displayTheatres.map((theatre) => (
                            <TheatreCard key={theatre.id} theatre={theatre} />
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
