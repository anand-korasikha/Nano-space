import React, { useState } from 'react';
import { X, Calendar, Users, Phone, Mail, User } from 'lucide-react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, hotel, bookingType = 'hotel' }) => {
    const isPartyHall = bookingType === 'party-hall';

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        adults: 1,
        children: 0,
        specialRequests: ''
    });

    if (!isOpen || !hotel) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Booking Data:', { ...formData, hotel: hotel.name, type: bookingType });
        const dateMsg = isPartyHall
            ? `Event Date: ${formData.checkIn}`
            : `Check-in: ${formData.checkIn}\nCheck-out: ${formData.checkOut}`;

        alert(`Booking request submitted for ${hotel.name}!\n${dateMsg}`);
        onClose();
    };

    // Calculate number of nights (only for hotels)
    const calculateNights = () => {
        if (isPartyHall) return 1;

        if (formData.checkIn && formData.checkOut) {
            const checkIn = new Date(formData.checkIn);
            const checkOut = new Date(formData.checkOut);
            const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
            return nights > 0 ? nights : 0;
        }
        return 0;
    };

    const nights = calculateNights();
    const totalPrice = isPartyHall ? hotel.totalPrice : nights * hotel.price; // Use totalPrice directly for Party Halls if available, else standard calc

    // For Party Halls, we might want to use the total price displayed on the card which includes taxes
    // But existing logic for hotels calculates base * nights. 
    // Let's assume for Party Hall, the price passed in 'hotel' object is the base price.
    // However, in PartyHalls.jsx, we see `price` and `totalPrice`. 
    // Let's use `hotel.totalPrice` for the final amount if it exists and isPartyHall, otherwise calculate.

    // Simplification for display:
    const displayBasePrice = isPartyHall ? hotel.price : hotel.price;
    const finalTotal = isPartyHall ? hotel.totalPrice : (nights > 0 ? hotel.totalPrice * nights : 0);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Close Button - Positioned absolutely */}
                <button className="modal-close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                {/* Modal Header */}
                <div className="modal-header">
                    <div className="modal-header-content">
                        <h2>{isPartyHall ? 'Book Party Hall' : 'Complete Your Booking'}</h2>
                        <p className="modal-hotel-name">{hotel.name}</p>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        {/* Guest Information */}
                        <div className="form-section">
                            <h3 className="section-title">Guest Information</h3>

                            <div className="form-group">
                                <label htmlFor="fullName">
                                    <User size={18} />
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <Mail size={18} />
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">
                                        <Phone size={18} />
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Booking Details */}
                        <div className="form-section">
                            <h3 className="section-title">Booking Details</h3>

                            <div className="form-row">
                                <div className="form-group" style={{ width: isPartyHall ? '100%' : '' }}>
                                    <label htmlFor="checkIn">
                                        <Calendar size={18} />
                                        {isPartyHall ? 'Event Date *' : 'Check-in Date *'}
                                    </label>
                                    <input
                                        type="date"
                                        id="checkIn"
                                        name="checkIn"
                                        value={formData.checkIn}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>

                                {!isPartyHall && (
                                    <div className="form-group">
                                        <label htmlFor="checkOut">
                                            <Calendar size={18} />
                                            Check-out Date *
                                        </label>
                                        <input
                                            type="date"
                                            id="checkOut"
                                            name="checkOut"
                                            value={formData.checkOut}
                                            onChange={handleChange}
                                            min={formData.checkIn || new Date().toISOString().split('T')[0]}
                                            required
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="adults">
                                        <Users size={18} />
                                        {isPartyHall ? 'Guests' : 'Adults'}
                                    </label>
                                    {isPartyHall ? (
                                        <input
                                            type="number"
                                            name="adults"
                                            id="adults"
                                            value={formData.adults}
                                            onChange={handleChange}
                                            min="1"
                                            placeholder="Number of guests"
                                            required
                                        />
                                    ) : (
                                        <select
                                            id="adults"
                                            name="adults"
                                            value={formData.adults}
                                            onChange={handleChange}
                                        >
                                            {[1, 2, 3, 4, 5, 6].map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                {!isPartyHall && (
                                    <div className="form-group">
                                        <label htmlFor="children">
                                            <Users size={18} />
                                            Children
                                        </label>
                                        <select
                                            id="children"
                                            name="children"
                                            value={formData.children}
                                            onChange={handleChange}
                                        >
                                            {[0, 1, 2, 3, 4].map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="specialRequests">
                                    Special Requests (Optional)
                                </label>
                                <textarea
                                    id="specialRequests"
                                    name="specialRequests"
                                    value={formData.specialRequests}
                                    onChange={handleChange}
                                    placeholder="Any special requirements or requests..."
                                    rows="3"
                                />
                            </div>
                        </div>

                        {/* Price Summary */}
                        <div className="price-summary">
                            <h3 className="section-title">Price Summary</h3>
                            <div className="summary-row">
                                {isPartyHall ? (
                                    <span>Base Price</span>
                                ) : (
                                    <span>₹{hotel.price.toLocaleString('en-IN')} × {nights} night{nights !== 1 ? 's' : ''}</span>
                                )}
                                <span className="summary-price">₹{(isPartyHall ? hotel.price : (nights * hotel.price)).toLocaleString('en-IN')}</span>
                            </div>
                            <div className="summary-row">
                                <span>Taxes & Fees</span>
                                <span className="summary-price">
                                    ₹{(isPartyHall
                                        ? (hotel.totalPrice - hotel.price)
                                        : (nights > 0 ? (hotel.totalPrice - hotel.price) * nights : 0)
                                    ).toLocaleString('en-IN')}
                                </span>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row total">
                                <span>Total Amount</span>
                                <span className="summary-total">₹{(isPartyHall ? hotel.totalPrice : (nights > 0 ? hotel.totalPrice * nights : 0)).toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="modal-actions">
                            <button type="button" className="btn-cancel" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-confirm">
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
