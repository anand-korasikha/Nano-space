import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Info, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HotelRooms.css';
import hotelsData from '../data/hotelsData.json';
import BookingModal from '../components/BookingModal';

const HotelRooms = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);

    const handleBookNow = (hotel) => {
        setSelectedHotel(hotel);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedHotel(null);
    };

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
                        onBookNow={handleBookNow}
                    />

                    {/* Bangalore Hotels */}
                    <CityHotelsCarousel
                        cityName="Bangalore"
                        hotels={hotelsData.bangalore}
                        onBookNow={handleBookNow}
                    />

                    {/* Chennai Hotels */}
                    <CityHotelsCarousel
                        cityName="Chennai"
                        hotels={hotelsData.chennai}
                        onBookNow={handleBookNow}
                    />
                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal
                isOpen={isModalOpen}
                onClose={closeModal}
                hotel={selectedHotel}
            />
        </>
    );
};

const CityHotelsCarousel = ({ cityName, hotels, onBookNow }) => {
    return (
        <div className="city-section">
            <h2 className="city-title">Hotels in {cityName}</h2>
            <div className="hotels-grid">
                {hotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} onBookNow={onBookNow} />
                ))}
            </div>
        </div>
    );
};

const HotelCard = ({ hotel, onBookNow }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval;
        if (!isHovered && hotel.images && hotel.images.length > 1) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev === hotel.images.length - 1 ? 0 : prev + 1));
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isHovered, hotel.images]);

    const nextImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === hotel.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === 0 ? hotel.images.length - 1 : prev - 1
        );
    };

    // Calculate savings
    const savings = hotel.originalPrice - hotel.price;
    const savingsPercentage = hotel.discount || Math.round((savings / hotel.originalPrice) * 100);

    return (
        <div
            className="hotel-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="hotel-image-container">
                {hotel.badge && (
                    <div className={`hotel-badge ${hotel.badge.toLowerCase().replace(' ', '-')}`}>
                        {hotel.badge}
                    </div>
                )}
                <div
                    className="hotel-image-slider"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                >
                    {hotel.images.map((image, i) => (
                        <img
                            key={i}
                            src={image}
                            alt={`${hotel.name} - ${i + 1}`}
                            className="hotel-image"
                        />
                    ))}
                </div>
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
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(index);
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="hotel-content">
                {/* Hotel Name */}
                <h3 className="hotel-name">{hotel.name}</h3>

                {/* Rating Section */}
                <div className="hotel-rating-section">
                    <div className="hotel-stars">
                        {[...Array(hotel.stars)].map((_, i) => (
                            <Star key={i} size={14} fill="#FFB800" color="#FFB800" />
                        ))}
                    </div>
                    <div className="rating-badge">
                        <span className="rating-score">{hotel.rating}/10</span>
                        <span className="rating-text">{hotel.ratingText}</span>
                    </div>
                    <span className="rating-reviews">({hotel.reviews} review{hotel.reviews > 1 ? 's' : ''})</span>
                </div>

                {/* Location */}
                <div className="hotel-location">
                    📍 {hotel.location}
                </div>

                {/* Amenities */}
                <div className="hotel-amenities">
                    <span className="amenity">✅ Free cancellation</span>
                    <span className="amenity">🚗 Parking</span>
                    <span className="amenity">📶 Free WiFi</span>
                </div>

                {/* Divider */}
                <div className="hotel-divider"></div>

                {/* Pricing Section */}
                <div className="hotel-pricing-section">
                    {hotel.memberPrice && (
                        <div className="member-exclusive-badge">
                            🔒 VIP Member Exclusive
                        </div>
                    )}

                    <div className="price-breakdown">
                        <div className="price-row">
                            <span className="price-label">Original Price:</span>
                            <span className="original-price">₹{hotel.originalPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="price-row highlight">
                            <span className="price-label">{hotel.memberPrice ? 'Member Price:' : 'Discounted Price:'}</span>
                            <span className="current-price">₹{hotel.price.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="price-row savings">
                            <span className="price-label">You Save:</span>
                            <span className="savings-amount">
                                {savingsPercentage}% off (₹{savings.toLocaleString('en-IN')})
                            </span>
                        </div>
                    </div>

                    <div className="total-price-section">
                        <span className="total-label">Total with taxes:</span>
                        <span className="total-price">₹{hotel.totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="hotel-actions">
                    <button className="btn-primary" onClick={() => onBookNow(hotel)}>
                        Book Now - ₹{hotel.price.toLocaleString('en-IN')}/night
                    </button>
                    <button className="btn-secondary">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelRooms;
