import React, { useState } from 'react';
import { X, Calendar, Users, Phone, Mail, User, MessageSquare, CheckCircle } from 'lucide-react';
import { enquiriesAPI } from '../services/api';
import './BookingModal.css';

const PartyHallEnquiryModal = ({ isOpen, onClose, venue }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        guests: '',
        eventType: '',
        message: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen || !venue) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            await enquiriesAPI.submit({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                enquiry_type: 'party_hall',
                subject: `Party Hall Enquiry – ${venue.name}`,
                message: `Event Type: ${formData.eventType || 'N/A'}\nEvent Date: ${formData.eventDate}\nGuests: ${formData.guests}\n\n${formData.message}`,
                city: venue.city || venue.location || '',
                property_name: venue.name,
                property_type: 'Party Hall',
                move_in_date: formData.eventDate,
                seats_required: parseInt(formData.guests) || null,
            });
            setSubmitted(true);
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({ name: '', email: '', phone: '', eventDate: '', guests: '', eventType: '', message: '' });
        setSubmitted(false);
        setError('');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={handleClose}>
                    <X size={24} />
                </button>

                <div className="modal-header">
                    <div className="modal-header-content">
                        <h2>Enquire About This Venue</h2>
                        <p className="modal-hotel-name">{venue.name}</p>
                    </div>
                </div>

                <div className="modal-body">
                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                            <CheckCircle size={56} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem', color: '#065f46' }}>
                                Enquiry Submitted!
                            </h3>
                            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                                Thank you! Our team will get in touch with you shortly about <strong>{venue.name}</strong>.
                            </p>
                            <button className="btn-confirm" onClick={handleClose}>
                                Close
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {/* Contact Info */}
                            <div className="form-section">
                                <h3 className="section-title">Your Contact Details</h3>

                                <div className="form-group">
                                    <label htmlFor="enq-name">
                                        <User size={16} /> Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="enq-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="enq-email">
                                            <Mail size={16} /> Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="enq-email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="enq-phone">
                                            <Phone size={16} /> Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            id="enq-phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="form-section">
                                <h3 className="section-title">Event Details</h3>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="enq-date">
                                            <Calendar size={16} /> Event Date *
                                        </label>
                                        <input
                                            type="date"
                                            id="enq-date"
                                            name="eventDate"
                                            value={formData.eventDate}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="enq-guests">
                                            <Users size={16} /> No. of Guests *
                                        </label>
                                        <input
                                            type="number"
                                            id="enq-guests"
                                            name="guests"
                                            value={formData.guests}
                                            onChange={handleChange}
                                            placeholder="e.g. 200"
                                            min="1"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="enq-eventType">Event Type</label>
                                    <select
                                        id="enq-eventType"
                                        name="eventType"
                                        value={formData.eventType}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select event type</option>
                                        <option value="Wedding">Wedding</option>
                                        <option value="Birthday Party">Birthday Party</option>
                                        <option value="Corporate Event">Corporate Event</option>
                                        <option value="Engagement">Engagement</option>
                                        <option value="Anniversary">Anniversary</option>
                                        <option value="Baby Shower">Baby Shower</option>
                                        <option value="Farewell Party">Farewell Party</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="enq-message">
                                        <MessageSquare size={16} /> Additional Requirements
                                    </label>
                                    <textarea
                                        id="enq-message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Describe your event requirements, decorations, catering preferences, etc."
                                        rows="3"
                                    />
                                </div>
                            </div>

                            {error && (
                                <p style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center' }}>
                                    {error}
                                </p>
                            )}

                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={handleClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-confirm" disabled={submitting}>
                                    {submitting ? 'Submitting...' : 'Submit Enquiry'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PartyHallEnquiryModal;
