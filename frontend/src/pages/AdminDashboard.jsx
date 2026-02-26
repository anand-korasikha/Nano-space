import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
    Shield, CheckCircle, XCircle, Users, Building2,
    MessageSquare, Calendar, RefreshCw, Trash2,
    TrendingUp, Clock, Mail, Phone, MapPin, ChevronDown, ChevronUp,
    IndianRupee, Tag, BookOpen, Plus, Image, Eye, Star,
    CheckSquare, Square, Upload
} from 'lucide-react';
import LocationPicker from '../components/common/LocationPicker';
import {
    getPendingProperties,
    getApprovedProperties,
    getRejectedProperties,
    approveProperty,
    rejectProperty,
    getAdminStats
} from '../services/propertyService';
import { adminAPI } from '../services/api';
import './Dashboard.css';

// ── Constants ──────────────────────────────────────────────────────────────────

const BOOKING_STATUS_STYLES = {
    pending: { bg: '#fef3c7', color: '#92400e', border: '#f59e0b' },
    confirmed: { bg: '#d1fae5', color: '#065f46', border: '#10b981' },
    cancelled: { bg: '#fee2e2', color: '#991b1b', border: '#ef4444' },
};

const ENQUIRY_STATUS_COLORS = {
    new: '#f59e0b',
    contacted: '#3b82f6',
    resolved: '#10b981',
    closed: '#6b7280',
};

const ENQUIRY_TYPE_LABELS = {
    coworking: 'Coworking', coliving: 'Coliving',
    virtual_office: 'Virtual Office', event_space: 'Event Space',
    party_hall: 'Party Hall', hotel_room: 'Hotel Room',
    private_theatre: 'Private Theatre', sell: 'Sell', buy: 'Buy',
    rent: 'Rent', general: 'General',
};

// ── Admin Dashboard ────────────────────────────────────────────────────────────

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('bookings');
    const [propertySubTab, setPropertySubTab] = useState('pending');
    const [bookingFilter, setBookingFilter] = useState('all');

    // Data
    const [pendingProperties, setPendingProperties] = useState([]);
    const [approvedProperties, setApprovedProperties] = useState([]);
    const [rejectedProperties, setRejectedProperties] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [stats, setStats] = useState({
        total: 0, pending: 0, approved: 0, rejected: 0,
        users: {}, bookings: {}, enquiries: {}
    });

    // UI state
    const [loading, setLoading] = useState(true);
    const [rejectionReason, setRejectionReason] = useState({});
    const [expandedEnquiry, setExpandedEnquiry] = useState(null);
    const [expandedBooking, setExpandedBooking] = useState(null);
    const [error, setError] = useState(null);
    const [showListingForm, setShowListingForm] = useState(false);

    // Form for new listing (Admin only)
    const [newListing, setNewListing] = useState({
        name: '', type: 'Coworking Space', city: '',
        area: '', address: '', price: '', period: 'month',
        description: '', amenities: '',
        image: '', image2: '', image3: '', image4: '',
        latitude: '', longitude: '',
        is_featured: false, show_on_homepage: false,
        show_on_rent: false, show_on_buy: false
    });
    const [submittingListing, setSubmittingListing] = useState(false);

    // ── Data loading ───────────────────────────────────────────────────────────

    const [usersList, setUsersList] = useState([]);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [pending, approved, rejected, statsData, enquiryData, bookingData, usersData] = await Promise.all([
                getPendingProperties(),
                getApprovedProperties(),
                getRejectedProperties(),
                getAdminStats(),
                adminAPI.getEnquiries().catch(() => ({ enquiries: [] })),
                adminAPI.getAllBookings().catch(() => ({ bookings: [] })),
                adminAPI.getAllUsers().catch(() => ({ users: [] })),
            ]);
            setPendingProperties(pending);
            setApprovedProperties(approved);
            setRejectedProperties(rejected);
            setStats(statsData);
            setEnquiries(enquiryData.enquiries || []);
            setBookings(bookingData.bookings || []);
            setUsersList(usersData.users || []);
        } catch (err) {
            setError('Failed to load data. Make sure the backend server is running on port 5000.');
            console.error('Admin dashboard load error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadData(); }, [loadData]);

    // ── Property handlers ──────────────────────────────────────────────────────

    const handleApprove = async (id) => {
        if (!window.confirm('Approve this property?')) return;
        const ok = await approveProperty(id);
        if (ok) { loadData(); alert('Property approved!'); }
        else alert('Error approving property.');
    };

    const handleReject = async (id) => {
        const reason = rejectionReason[id] || '';
        if (!window.confirm('Reject this property?')) return;
        const ok = await rejectProperty(id, reason);
        if (ok) {
            loadData();
            setRejectionReason(prev => { const s = { ...prev }; delete s[id]; return s; });
        } else alert('Error rejecting property.');
    };

    const handleDeleteProperty = async (id) => {
        if (!window.confirm('Permanently delete this property?')) return;
        try {
            await fetch(
                `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/properties/${id}`,
                { method: 'DELETE', headers: { Authorization: `Bearer ${localStorage.getItem('nanospace_token')}` } }
            );
        } catch (_) { }
        loadData();
    };

    // ── Booking handlers ───────────────────────────────────────────────────────

    const handleBookingStatus = async (id, status) => {
        try {
            await adminAPI.updateBookingStatus(id, status);
            loadData();
        } catch (err) {
            alert(`Failed to update booking: ${err.message}`);
        }
    };

    // ── Enquiry handlers ───────────────────────────────────────────────────────

    const handleEnquiryStatus = async (id, status) => {
        try {
            await adminAPI.updateEnquiryStatus(id, status);
            loadData();
        } catch (err) {
            alert('Failed to update enquiry status.');
        }
    };

    const handleDeleteEnquiry = async (id) => {
        if (!window.confirm('Delete this enquiry?')) return;
        try {
            await adminAPI.deleteEnquiry(id);
            loadData();
        } catch (err) {
            alert('Failed to delete enquiry.');
        }
    };

    const handleImageUpload = async (file, field) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('nanospace_token');
            const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

            const response = await fetch(`${BASE}/uploads/image`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                // We use the full API URL + the relative path returned from the server
                // The server returns /api/uploads/filename
                // BASE is http://localhost:5000/api
                // So we need to prepend the protocol and host
                const fullUrl = `${BASE.replace('/api', '')}${data.url}`;
                setNewListing(prev => ({ ...prev, [field]: fullUrl }));
            } else {
                alert('Failed to upload image');
            }
        } catch (err) {
            console.error('Upload error:', err);
            alert(`Error connecting to upload server: ${err.message}`);
        }
    };

    const handleCreateListing = async (e) => {
        e.preventDefault();
        setSubmittingListing(true);
        try {
            const token = localStorage.getItem('nanospace_token');
            const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

            // Clean amenities (split by comma)
            const amenitiesList = newListing.amenities.split(',').map(a => a.trim()).filter(a => a);
            const imagesList = [newListing.image, newListing.image2, newListing.image3, newListing.image4].filter(i => i);

            const response = await fetch(`${BASE}/properties/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...newListing,
                    amenities: amenitiesList,
                    images: imagesList,
                    latitude: parseFloat(newListing.latitude) || null,
                    longitude: parseFloat(newListing.longitude) || null,
                    status: 'approved' // Auto-approve as admin
                })
            });

            if (response.ok) {
                alert('Property listed successfully and auto-approved!');
                setNewListing({
                    name: '', type: 'Coworking Space', city: '',
                    area: '', address: '', price: '', period: 'month',
                    description: '', amenities: '',
                    image: '', image2: '', image3: '', image4: '',
                    latitude: '', longitude: '',
                    is_featured: false, show_on_homepage: false,
                    show_on_rent: false, show_on_buy: false
                });
                loadData();
                setActiveTab('properties');
                setPropertySubTab('approved');
            } else {
                const err = await response.json();
                alert(`Error: ${err.error || 'Failed to list property'}`);
            }
        } catch (err) {
            console.error('List error:', err);
            alert(`Failed to connect to server: ${err.message}`);
        } finally {
            setSubmittingListing(false);
        }
    };

    const handleToggleFlag = async (prop, flag) => {
        try {
            const token = localStorage.getItem('nanospace_token');
            const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${BASE}/properties/${prop.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ [flag]: !prop[flag] })
            });
            if (response.ok) loadData();
        } catch (err) {
            console.error('Update flag error:', err);
        }
    };

    // ── Booking filter ─────────────────────────────────────────────────────────

    const filteredBookings = bookingFilter === 'all'
        ? bookings
        : bookings.filter(b => b.status === bookingFilter);

    // ── Render helpers ─────────────────────────────────────────────────────────

    const renderBookingCard = (booking) => {
        const isExpanded = expandedBooking === booking.id;
        const style = BOOKING_STATUS_STYLES[booking.status] || BOOKING_STATUS_STYLES.pending;
        const amount = booking.total_amount
            ? `₹${Number(booking.total_amount).toLocaleString('en-IN')}`
            : '—';

        return (
            <div key={booking.id} style={{
                background: '#fff',
                border: '1.5px solid #e5e7eb',
                borderLeft: `4px solid ${style.border}`,
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                marginBottom: '1rem',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}>
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                        {/* Status + type badges */}
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.4rem', alignItems: 'center' }}>
                            <span style={{
                                background: style.bg, color: style.color,
                                border: `1px solid ${style.border}`,
                                borderRadius: '20px', padding: '2px 10px',
                                fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                            }}>{booking.status}</span>
                            {booking.booking_type && (
                                <span style={{
                                    background: '#f3f4f6', color: '#374151',
                                    borderRadius: '20px', padding: '2px 10px', fontSize: '0.72rem',
                                }}>{booking.booking_type}</span>
                            )}
                            <span style={{ fontSize: '0.8rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: 3 }}>
                                <Clock size={11} /> {new Date(booking.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </span>
                        </div>

                        {/* Property name */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                            <Building2 size={15} color="#7c3aed" />
                            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                                {booking.property_name || `Property #${booking.property_id}`}
                            </span>
                            {booking.property_city && (
                                <span style={{ fontSize: '0.8rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <MapPin size={11} /> {booking.property_city}
                                </span>
                            )}
                        </div>

                        {/* Customer info */}
                        <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                            {booking.customer_name && (
                                <span style={{ fontSize: '0.85rem', color: '#374151', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Users size={13} color="#6b7280" /> {booking.customer_name}
                                </span>
                            )}
                            {booking.customer_phone && (
                                <span style={{ fontSize: '0.85rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Phone size={12} /> {booking.customer_phone}
                                </span>
                            )}
                            {booking.customer_email && (
                                <span style={{ fontSize: '0.85rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Mail size={12} /> {booking.customer_email}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Amount + expand */}
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#7c3aed', display: 'flex', alignItems: 'center', gap: 3 }}>
                            <IndianRupee size={14} />{amount.replace('₹', '')}
                        </span>
                        <button
                            onClick={() => setExpandedBooking(isExpanded ? null : booking.id)}
                            style={{
                                background: 'none', border: '1px solid #e5e7eb',
                                borderRadius: '8px', padding: '3px 8px',
                                cursor: 'pointer', color: '#6b7280', fontSize: '0.78rem',
                                display: 'flex', alignItems: 'center', gap: 3,
                            }}
                        >
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            {isExpanded ? 'Less' : 'Details'}
                        </button>
                    </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1rem', fontSize: '0.85rem', color: '#6b7280' }}>
                            {booking.start_date && (
                                <span><strong>Start:</strong> {new Date(booking.start_date).toLocaleDateString('en-IN')}</span>
                            )}
                            {booking.end_date && (
                                <span><strong>End:</strong> {new Date(booking.end_date).toLocaleDateString('en-IN')}</span>
                            )}
                            {booking.quantity && (
                                <span><strong>Quantity:</strong> {booking.quantity}</span>
                            )}
                            {booking.property_type && (
                                <span><strong>Space:</strong> {booking.property_type}</span>
                            )}
                        </div>
                        {booking.notes && (
                            <p style={{ background: '#f9fafb', padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                                <strong>Notes:</strong> {booking.notes}
                            </p>
                        )}

                        {/* Action buttons */}
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {booking.status === 'pending' && (
                                <button
                                    onClick={() => handleBookingStatus(booking.id, 'confirmed')}
                                    style={{ padding: '6px 14px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}
                                >
                                    <CheckCircle size={14} /> Confirm Booking
                                </button>
                            )}
                            {booking.status !== 'cancelled' && (
                                <button
                                    onClick={() => handleBookingStatus(booking.id, 'cancelled')}
                                    style={{ padding: '6px 14px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}
                                >
                                    <XCircle size={14} /> Cancel
                                </button>
                            )}
                            {booking.status === 'cancelled' && (
                                <button
                                    onClick={() => handleBookingStatus(booking.id, 'pending')}
                                    style={{ padding: '6px 14px', background: '#fef3c7', color: '#92400e', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}
                                >
                                    <RefreshCw size={14} /> Restore to Pending
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderPropertyCard = (property) => (
        <div key={property.id} className="approval-card">
            <div className="approval-info">
                <h3>{property.name}</h3>
                <p className="approval-meta">
                    <span><strong>Type:</strong> {property.type}</span>
                    <span><strong>City:</strong> {property.city}</span>
                    <span><strong>Area:</strong> {property.area || '—'}</span>
                </p>
                <p className="approval-meta">
                    <span>
                        <strong>Price:</strong>{' '}
                        {property.price_per_seat ? `₹${property.price_per_seat}/seat`
                            : property.price_per_month ? `₹${property.price_per_month}/month`
                                : property.price ? `${property.price}/${property.period}` : '—'}
                    </span>
                    <span><strong>Submitted:</strong> {new Date(property.submitted_at || property.submittedAt || property.created_at).toLocaleDateString()}</span>
                </p>
                {property.description && (
                    <p style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                        {property.description}
                    </p>
                )}
                {/* Owner contact info */}
                {(property.contact_name || property.contact_email || property.contact_phone) && (
                    <div className="approval-meta" style={{
                        marginTop: '0.75rem',
                        background: '#f8fafc',
                        padding: '0.6rem 0.8rem',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        fontSize: '0.85rem'
                    }}>
                        {property.contact_name && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#1e293b' }}>
                                <Users size={14} color="#64748b" />
                                <strong>Owner:</strong> {property.contact_name}
                            </span>
                        )}
                        {property.contact_email && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569' }}>
                                <Mail size={14} color="#64748b" />
                                {property.contact_email}
                            </span>
                        )}
                        {property.contact_phone && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569' }}>
                                <Phone size={14} color="#64748b" />
                                {property.contact_phone}
                            </span>
                        )}
                    </div>
                )}
                {property.rejection_reason && (
                    <p style={{ marginTop: '0.4rem', color: '#f5576c', fontSize: '0.85rem' }}>
                        <strong>Rejection:</strong> {property.rejection_reason}
                    </p>
                )}
            </div>

            {propertySubTab === 'pending' && (
                <div className="approval-actions-vertical">
                    <input
                        type="text"
                        placeholder="Rejection reason (optional)"
                        value={rejectionReason[property.id] || ''}
                        onChange={(e) => setRejectionReason(prev => ({ ...prev, [property.id]: e.target.value }))}
                        style={{ padding: '0.5rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '0.5rem' }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn-approve" onClick={() => handleApprove(property.id)}>
                            <CheckCircle size={16} /> Approve
                        </button>
                        <button className="btn-reject" onClick={() => handleReject(property.id)}>
                            <XCircle size={16} /> Reject
                        </button>
                    </div>
                </div>
            )}

            {(propertySubTab === 'approved' || propertySubTab === 'rejected') && (
                <div className="approval-actions-vertical">
                    {/* Admin Visibility Filters Mapping */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                        <button
                            className={`flag-toggle ${property.show_on_homepage ? 'active' : ''}`}
                            onClick={() => handleToggleFlag(property, 'show_on_homepage')}
                        >
                            {property.show_on_homepage ? <CheckSquare size={14} /> : <Square size={14} />} Home
                        </button>
                        <button
                            className={`flag-toggle ${property.is_featured ? 'active' : ''}`}
                            onClick={() => handleToggleFlag(property, 'is_featured')}
                        >
                            {property.is_featured ? <Star size={14} fill="#f59e0b" color="#f59e0b" /> : <Star size={14} />} Featured
                        </button>
                        <button
                            className={`flag-toggle ${property.show_on_buy ? 'active' : ''}`}
                            onClick={() => handleToggleFlag(property, 'show_on_buy')}
                        >
                            {property.show_on_buy ? <CheckSquare size={14} /> : <Square size={14} />} Buy
                        </button>
                        <button
                            className={`flag-toggle ${property.show_on_rent ? 'active' : ''}`}
                            onClick={() => handleToggleFlag(property, 'show_on_rent')}
                        >
                            {property.show_on_rent ? <CheckSquare size={14} /> : <Square size={14} />} Rent
                        </button>
                    </div>
                    <button className="btn-delete" onClick={() => handleDeleteProperty(property.id)}>
                        <Trash2 size={16} /> Delete
                    </button>
                </div>
            )}
        </div>
    );

    const renderEnquiryCard = (enquiry) => {
        const isExpanded = expandedEnquiry === enquiry.id;
        const statusColor = ENQUIRY_STATUS_COLORS[enquiry.status] || '#6b7280';
        return (
            <div key={enquiry.id} style={{
                background: '#fff', border: '1.5px solid #e5e7eb',
                borderLeft: `4px solid ${statusColor}`,
                borderRadius: '12px', padding: '1rem 1.25rem',
                marginBottom: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{enquiry.name}</h3>
                            <span style={{ background: statusColor + '20', color: statusColor, border: `1px solid ${statusColor}`, borderRadius: '20px', padding: '2px 10px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>{enquiry.status}</span>
                            <span style={{ background: '#f3f4f6', color: '#374151', borderRadius: '20px', padding: '2px 10px', fontSize: '0.72rem' }}>
                                {ENQUIRY_TYPE_LABELS[enquiry.enquiry_type] || enquiry.enquiry_type}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                            {enquiry.email && <span style={{ fontSize: '0.82rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{enquiry.email}</span>}
                            {enquiry.phone && <span style={{ fontSize: '0.82rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{enquiry.phone}</span>}
                            {enquiry.city && <span style={{ fontSize: '0.82rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{enquiry.city}</span>}
                            <span style={{ fontSize: '0.78rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 3 }}>
                                <Clock size={11} />{new Date(enquiry.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </span>
                        </div>
                    </div>
                    <button onClick={() => setExpandedEnquiry(isExpanded ? null : enquiry.id)} style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '4px 8px', cursor: 'pointer', color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem' }}>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        {isExpanded ? 'More' : 'More'}
                    </button>
                </div>
                {isExpanded && (
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
                        {enquiry.subject && <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem' }}><strong>Subject:</strong> {enquiry.subject}</p>}
                        {enquiry.message && <p style={{ background: '#f9fafb', padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>{enquiry.message}</p>}
                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#6b7280' }}>
                            {enquiry.property_name && <span><strong>Property:</strong> {enquiry.property_name}</span>}
                            {enquiry.budget && <span><strong>Budget:</strong> {enquiry.budget}</span>}
                            {enquiry.seats_required && <span><strong>Seats:</strong> {enquiry.seats_required}</span>}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {enquiry.status === 'new' && (
                                <button onClick={() => handleEnquiryStatus(enquiry.id, 'contacted')} style={{ padding: '6px 14px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Phone size={14} /> Contacted
                                </button>
                            )}
                            {enquiry.status !== 'resolved' && (
                                <button onClick={() => handleEnquiryStatus(enquiry.id, 'resolved')} style={{ padding: '6px 14px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <CheckCircle size={14} /> Resolve
                                </button>
                            )}
                            {enquiry.status !== 'closed' && (
                                <button onClick={() => handleEnquiryStatus(enquiry.id, 'closed')} style={{ padding: '6px 14px', background: '#6b7280', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <XCircle size={14} /> Close
                                </button>
                            )}
                            <button onClick={() => handleDeleteEnquiry(enquiry.id)} style={{ padding: '6px 14px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Trash2 size={14} /> Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // ── Render ─────────────────────────────────────────────────────────────────

    const currentProperties =
        propertySubTab === 'pending' ? pendingProperties :
            propertySubTab === 'approved' ? approvedProperties :
                rejectedProperties;

    const bookingCounts = {
        all: bookings.length,
        pending: bookings.filter(b => b.status === 'pending').length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        cancelled: bookings.filter(b => b.status === 'cancelled').length,
    };

    return (
        <div className="dashboard-container">
            {/* ── Header ──────────────────────────────────────────────────── */}
            <div className="dashboard-header">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>Welcome, {user?.full_name || user?.name}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button
                        onClick={loadData}
                        disabled={loading}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', border: '1.5px solid #e5e7eb', borderRadius: '10px', background: '#fff', cursor: 'pointer', fontSize: '0.9rem', color: '#374151' }}
                    >
                        <RefreshCw size={15} className={loading ? 'spin' : ''} />
                        Refresh
                    </button>
                    <div className="user-badge admin"><Shield size={18} /><span>Administrator</span></div>
                </div>
            </div>

            {error && (
                <div style={{ margin: '0 0 1.5rem', padding: '1rem', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '10px', color: '#dc2626', fontSize: '0.9rem' }}>
                    ⚠️ {error}
                </div>
            )}

            <div className="dashboard-grid">
                {/* ── Stats Cards ──────────────────────────────────────── */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <Building2 className="stat-icon" />
                        <div><p className="stat-value">{stats.total ?? (pendingProperties.length + approvedProperties.length + rejectedProperties.length)}</p><p className="stat-label">Total Properties</p></div>
                    </div>
                    <div className="stat-card alert">
                        <Shield className="stat-icon" />
                        <div><p className="stat-value">{stats.pending ?? pendingProperties.length}</p><p className="stat-label">Pending Approvals</p></div>
                    </div>
                    <div className="stat-card" style={{ borderTop: '3px solid #10b981' }}>
                        <BookOpen className="stat-icon" style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }} />
                        <div><p className="stat-value">{stats.bookings?.total ?? bookings.length}</p><p className="stat-label">Total Bookings</p></div>
                    </div>
                    <div className="stat-card" style={{ borderTop: '3px solid #f59e0b' }}>
                        <MessageSquare className="stat-icon" style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)' }} />
                        <div><p className="stat-value">{stats.enquiries?.new ?? enquiries.filter(e => e.status === 'new').length}</p><p className="stat-label">New Enquiries</p></div>
                    </div>
                </div>

                {/* ── Main Tabs ─────────────────────────────────────────── */}
                <div className="dashboard-section">
                    <div className="section-header">
                        <div className="tabs">
                            <button className={`tab ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
                                <Calendar size={15} style={{ marginRight: 4 }} />
                                Bookings ({bookings.length})
                            </button>
                            <button className={`tab ${activeTab === 'enquiries' ? 'active' : ''}`} onClick={() => setActiveTab('enquiries')}>
                                <MessageSquare size={15} style={{ marginRight: 4 }} />
                                Enquiries ({enquiries.length})
                            </button>
                            <button className={`tab ${activeTab === 'properties' ? 'active' : ''}`} onClick={() => setActiveTab('properties')}>
                                <Building2 size={15} style={{ marginRight: 4 }} />
                                Properties ({pendingProperties.length + approvedProperties.length + rejectedProperties.length})
                            </button>
                            <button className={`tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
                                <Users size={15} style={{ marginRight: 4 }} />
                                Users ({stats.users?.total || 0})
                            </button>
                            <button className={`tab ${activeTab === 'add_listing' ? 'active' : ''}`} onClick={() => setActiveTab('add_listing')} style={{ background: '#7c3aed', color: '#fff' }}>
                                <Plus size={15} style={{ marginRight: 4 }} />
                                Add Listing
                            </button>
                        </div>
                    </div>

                    {/* ══ BOOKINGS TAB ══ */}
                    {activeTab === 'bookings' && (
                        <div>
                            {/* Filter pills */}
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                                {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setBookingFilter(f)}
                                        style={{
                                            padding: '5px 16px',
                                            borderRadius: '20px',
                                            border: `1.5px solid ${bookingFilter === f ? '#7c3aed' : '#e5e7eb'}`,
                                            background: bookingFilter === f ? '#7c3aed' : '#fff',
                                            color: bookingFilter === f ? '#fff' : '#374151',
                                            cursor: 'pointer', fontSize: '0.83rem', fontWeight: 500,
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        {f} ({bookingCounts[f]})
                                    </button>
                                ))}
                            </div>

                            <div className="approvals-list">
                                {loading ? (
                                    <p className="empty-state">Loading bookings...</p>
                                ) : filteredBookings.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                                        <Calendar size={48} style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
                                        <p style={{ fontSize: '1.05rem', fontWeight: 500 }}>No {bookingFilter !== 'all' ? bookingFilter : ''} bookings yet</p>
                                        <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Bookings made through the site will appear here automatically.</p>
                                    </div>
                                ) : (
                                    filteredBookings.map(renderBookingCard)
                                )}
                            </div>
                        </div>
                    )}

                    {/* ══ ENQUIRIES TAB ══ */}
                    {activeTab === 'enquiries' && (
                        <div className="approvals-list">
                            {loading ? (
                                <p className="empty-state">Loading enquiries...</p>
                            ) : enquiries.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                                    <MessageSquare size={48} style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
                                    <p style={{ fontSize: '1.05rem', fontWeight: 500 }}>No enquiries yet</p>
                                    <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Enquiry form submissions will appear here.</p>
                                </div>
                            ) : (
                                enquiries.map(renderEnquiryCard)
                            )}
                        </div>
                    )}

                    {/* ══ PROPERTIES TAB ══ */}
                    {activeTab === 'properties' && (
                        <>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                {['pending', 'approved', 'rejected'].map(sub => (
                                    <button
                                        key={sub}
                                        onClick={() => setPropertySubTab(sub)}
                                        style={{
                                            padding: '5px 16px',
                                            border: `1.5px solid ${propertySubTab === sub ? '#7c3aed' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            background: propertySubTab === sub ? '#7c3aed' : '#fff',
                                            color: propertySubTab === sub ? '#fff' : '#374151',
                                            cursor: 'pointer', fontSize: '0.85rem', textTransform: 'capitalize',
                                        }}
                                    >
                                        {sub} ({sub === 'pending' ? pendingProperties.length : sub === 'approved' ? approvedProperties.length : rejectedProperties.length})
                                    </button>
                                ))}
                            </div>
                            <div className="approvals-list">
                                {loading ? (
                                    <p className="empty-state">Loading properties...</p>
                                ) : currentProperties.length === 0 ? (
                                    <p className="empty-state">No {propertySubTab} properties.</p>
                                ) : (
                                    currentProperties.map(renderPropertyCard)
                                )}
                            </div>
                        </>
                    )}

                    {/* ══ USERS TAB ══ */}
                    {activeTab === 'users' && (
                        <div style={{ padding: '0.5rem 0' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                {[
                                    { label: 'Total Users', value: stats.users?.total || 0, color: '#7c3aed' },
                                    { label: 'Customers', value: stats.users?.customers || 0, color: '#3b82f6' },
                                    { label: 'Property Owners', value: stats.users?.owners || 0, color: '#10b981' },
                                ].map(item => (
                                    <div key={item.label} style={{ flex: 1, minWidth: 120, background: '#fff', border: `2px solid ${item.color}20`, borderTop: `3px solid ${item.color}`, borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
                                        <p style={{ fontSize: '2rem', fontWeight: 700, color: item.color, margin: 0 }}>{item.value}</p>
                                        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '4px 0 0' }}>{item.label}</p>
                                    </div>
                                ))}
                            </div>
                            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                                    <thead style={{ background: '#f9fafb', borderBottom: '1.5px solid #e5e7eb' }}>
                                        <tr>
                                            <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Name</th>
                                            <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Email</th>
                                            <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Phone</th>
                                            <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Role</th>
                                            <th style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usersList.length === 0 ? (
                                            <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>No users found.</td></tr>
                                        ) : (
                                            usersList.map(item => (
                                                <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                                    <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>{item.full_name}</td>
                                                    <td style={{ padding: '0.75rem 1rem' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                            {item.email}
                                                            {item.email_verified ?
                                                                <CheckCircle size={14} color="#10b981" title="Verified" /> :
                                                                <Clock size={14} color="#9ca3af" title="Unverified" />
                                                            }
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '0.75rem 1rem' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                            {item.phone || '—'}
                                                            {item.phone && (item.phone_verified ?
                                                                <CheckCircle size={14} color="#10b981" title="Verified" /> :
                                                                <Clock size={14} color="#9ca3af" title="Unverified" />
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '0.75rem 1rem' }}>
                                                        <span style={{
                                                            background: item.role === 'admin' ? '#fee2e2' : item.role === 'owner' ? '#d1fae5' : '#dbeafe',
                                                            color: item.role === 'admin' ? '#991b1b' : item.role === 'owner' ? '#065f46' : '#1e40af',
                                                            padding: '2px 8px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase'
                                                        }}>
                                                            {item.role}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>
                                                        {new Date(item.created_at).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {/* ══ ADD LISTING TAB ══ */}
                    {activeTab === 'add_listing' && (
                        <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', border: '1.5px solid #e5e7eb' }}>
                            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '1rem' }}>
                                <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Post New Property</h2>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Fill this form to instantly add a property to any page.</p>
                            </div>

                            <form onSubmit={handleCreateListing} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                                <div className="form-group-admin" style={{ gridColumn: 'span 2' }}>
                                    <label>Property Name *</label>
                                    <input type="text" required value={newListing.name} onChange={e => setNewListing({ ...newListing, name: e.target.value })} placeholder="e.g. Nanospace Premium Office" />
                                </div>

                                <div className="form-group-admin">
                                    <label>Page / Category *</label>
                                    <select value={newListing.type} onChange={e => setNewListing({ ...newListing, type: e.target.value })}>
                                        <option value="Coworking Space">Coworking Space</option>
                                        <option value="Coliving Space">Coliving Space</option>
                                        <option value="Hotel Room">Hotel Room</option>
                                        <option value="Event Space">Event Space</option>
                                        <option value="Virtual Office">Virtual Office</option>
                                        <option value="Party Hall">Party Hall</option>
                                        <option value="Private Theatre">Private Theatre</option>
                                        <option value="Office Space">Office Space</option>
                                        <option value="Residential Property">Residential Property</option>
                                    </select>
                                </div>

                                <div className="form-group-admin">
                                    <label>City *</label>
                                    <input type="text" required value={newListing.city} onChange={e => setNewListing({ ...newListing, city: e.target.value })} placeholder="e.g. Hyderabad" />
                                </div>

                                <div className="form-group-admin">
                                    <label>Price (Numeric) *</label>
                                    <input type="text" required value={newListing.price} onChange={e => setNewListing({ ...newListing, price: e.target.value })} placeholder="e.g. 5000" />
                                </div>

                                <div className="form-group-admin">
                                    <label>Price Period</label>
                                    <select value={newListing.period} onChange={e => setNewListing({ ...newListing, period: e.target.value })}>
                                        <option value="month">Per Month</option>
                                        <option value="day">Per Day</option>
                                        <option value="seat">Per Seat</option>
                                        <option value="sqft">Per Sqft</option>
                                        <option value="total">Total Price</option>
                                    </select>
                                </div>

                                <div className="form-group-admin" style={{ gridColumn: 'span 2' }}>
                                    <label>Main Photo (Hero Image) *</label>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <input
                                            type="file"
                                            onChange={e => handleImageUpload(e.target.files[0], 'image')}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="image-upload-1"
                                        />
                                        <label htmlFor="image-upload-1" style={{ padding: '0.6rem 1.2rem', background: '#f3f4f6', color: '#374151', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', border: '1px solid #d1d5db' }}>
                                            <Upload size={16} /> Choose File
                                        </label>
                                        <input type="text" readOnly value={newListing.image} placeholder="No file chosen" style={{ flex: 1, background: '#f9fafb', cursor: 'default' }} />
                                    </div>
                                    {newListing.image && <img src={newListing.image} alt="Preview" style={{ marginTop: '10px', borderRadius: '8px', height: '80px', objectFit: 'cover' }} />}
                                </div>

                                <div className="form-group-admin">
                                    <label>Photo 2</label>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <input
                                            type="file"
                                            onChange={e => handleImageUpload(e.target.files[0], 'image2')}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="image-upload-2"
                                        />
                                        <label htmlFor="image-upload-2" style={{ padding: '0.6rem 1rem', background: '#f3f4f6', color: '#374151', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', border: '1px solid #d1d5db' }}>
                                            <Upload size={14} /> Upload
                                        </label>
                                        <input type="text" readOnly value={newListing.image2} placeholder="Empty" style={{ flex: 1, background: '#f9fafb', fontSize: '0.8rem' }} />
                                    </div>
                                    {newListing.image2 && <img src={newListing.image2} alt="Preview" style={{ marginTop: '10px', borderRadius: '4px', height: '50px', objectFit: 'cover' }} />}
                                </div>

                                <div className="form-group-admin">
                                    <label>Photo 3</label>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <input
                                            type="file"
                                            onChange={e => handleImageUpload(e.target.files[0], 'image3')}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="image-upload-3"
                                        />
                                        <label htmlFor="image-upload-3" style={{ padding: '0.6rem 1rem', background: '#f3f4f6', color: '#374151', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', border: '1px solid #d1d5db' }}>
                                            <Upload size={14} /> Upload
                                        </label>
                                        <input type="text" readOnly value={newListing.image3} placeholder="Empty" style={{ flex: 1, background: '#f9fafb', fontSize: '0.8rem' }} />
                                    </div>
                                    {newListing.image3 && <img src={newListing.image3} alt="Preview" style={{ marginTop: '10px', borderRadius: '4px', height: '50px', objectFit: 'cover' }} />}
                                </div>

                                <div className="form-group-admin">
                                    <label>Photo 4</label>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <input
                                            type="file"
                                            onChange={e => handleImageUpload(e.target.files[0], 'image4')}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="image-upload-4"
                                        />
                                        <label htmlFor="image-upload-4" style={{ padding: '0.6rem 1rem', background: '#f3f4f6', color: '#374151', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', border: '1px solid #d1d5db' }}>
                                            <Upload size={14} /> Upload
                                        </label>
                                        <input type="text" readOnly value={newListing.image4} placeholder="Empty" style={{ flex: 1, background: '#f9fafb', fontSize: '0.8rem' }} />
                                    </div>
                                    {newListing.image4 && <img src={newListing.image4} alt="Preview" style={{ marginTop: '10px', borderRadius: '4px', height: '50px', objectFit: 'cover' }} />}
                                </div>

                                <div className="form-group-admin" style={{ gridColumn: 'span 2' }}>
                                    <label>Latitude (Google Map Coord)</label>
                                    <input type="text" value={newListing.latitude} onChange={e => setNewListing({ ...newListing, latitude: e.target.value })} placeholder="e.g. 17.4483" />
                                </div>
                                <div className="form-group-admin" style={{ gridColumn: 'span 2' }}>
                                    <label>Longitude (Google Map Coord)</label>
                                    <input type="text" value={newListing.longitude} onChange={e => setNewListing({ ...newListing, longitude: e.target.value })} placeholder="e.g. 78.3915" />
                                </div>

                                <div className="form-group-admin" style={{ gridColumn: 'span 2', marginBottom: '1.5rem' }}>
                                    <LocationPicker
                                        value={newListing.latitude && newListing.longitude ? { lat: parseFloat(newListing.latitude), lng: parseFloat(newListing.longitude) } : null}
                                        onChange={(loc) => {
                                            if (loc) {
                                                setNewListing({
                                                    ...newListing,
                                                    latitude: loc.lat.toString(),
                                                    longitude: loc.lng.toString(),
                                                    address: loc.address || newListing.address
                                                });
                                            }
                                        }}
                                    />
                                </div>

                                <div className="form-group-admin">
                                    <label>Area (sqft)</label>
                                    <input type="text" value={newListing.area} onChange={e => setNewListing({ ...newListing, area: e.target.value })} placeholder="e.g. 1500" />
                                </div>

                                <div className="form-group-admin">
                                    <label>Locality / Address</label>
                                    <input type="text" value={newListing.address} onChange={e => setNewListing({ ...newListing, address: e.target.value })} placeholder="e.g. Jubilee Hills" />
                                </div>

                                <div className="form-group-admin" style={{ gridColumn: 'span 2' }}>
                                    <label>Amenities (Comma separated)</label>
                                    <input type="text" value={newListing.amenities} onChange={e => setNewListing({ ...newListing, amenities: e.target.value })} placeholder="WiFi, AC, Parking, Cafeteria" />
                                </div>

                                <div className="form-group-admin" style={{ gridColumn: 'span 2' }}>
                                    <label>Description</label>
                                    <textarea rows="3" value={newListing.description} onChange={e => setNewListing({ ...newListing, description: e.target.value })} placeholder="Enter property description..."></textarea>
                                </div>

                                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '2rem', background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input type="checkbox" id="hp-check" checked={newListing.show_on_homepage} onChange={e => setNewListing({ ...newListing, show_on_homepage: e.target.checked })} />
                                        <label htmlFor="hp-check" style={{ fontWeight: 600 }}>Show on Homepage</label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input type="checkbox" id="ft-check" checked={newListing.is_featured} onChange={e => setNewListing({ ...newListing, is_featured: e.target.checked })} />
                                        <label htmlFor="ft-check" style={{ fontWeight: 600 }}>Mark Featured</label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input type="checkbox" id="rent-check" checked={newListing.show_on_rent} onChange={e => setNewListing({ ...newListing, show_on_rent: e.target.checked })} />
                                        <label htmlFor="rent-check" style={{ fontWeight: 600 }}>Post to Rent Page</label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input type="checkbox" id="buy-check" checked={newListing.show_on_buy} onChange={e => setNewListing({ ...newListing, show_on_buy: e.target.checked })} />
                                        <label htmlFor="buy-check" style={{ fontWeight: 600 }}>Post to Buy Page</label>
                                    </div>
                                </div>

                                <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
                                    <button
                                        type="submit"
                                        disabled={submittingListing}
                                        style={{ width: '100%', padding: '1rem', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 700, cursor: submittingListing ? 'not-allowed' : 'pointer' }}
                                    >
                                        {submittingListing ? 'Posting...' : 'Create & Post Listing'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
