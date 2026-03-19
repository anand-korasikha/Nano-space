import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
    Shield, CheckCircle, XCircle, Users, Building2,
    MessageSquare, Calendar, RefreshCw, Trash2,
    Clock, Mail, Phone, MapPin, ChevronDown, ChevronUp,
    IndianRupee, Plus, Star,
    CheckSquare, Square, Upload, LayoutDashboard,
    LogOut, ChevronRight, Menu, X, CreditCard, Bell
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
import { adminAPI, paymentsAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend
} from 'recharts';
import './AdminDashboard.css';

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

const NAV_ITEMS = [
    { id: 'dashboard_overview', label: 'Dashboard', icon: LayoutDashboard },
    {
        id: 'properties', label: 'Properties', icon: Building2,
        children: [
            { id: 'properties_pending', label: 'Pending Approval' },
            { id: 'properties_approved', label: 'Approved' },
            { id: 'properties_rejected', label: 'Rejected' },
        ],
    },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'enquiries', label: 'Enquiries', icon: MessageSquare },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'add_listing', label: 'Add Listing', icon: Plus },
];

// ── Admin Dashboard ────────────────────────────────────────────────────────────
const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('dashboard_overview');
    const [propertySubTab, setPropertySubTab] = useState('pending');
    const [bookingFilter, setBookingFilter] = useState('all');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [propertiesExpanded, setPropertiesExpanded] = useState(false);

    // Data
    const [pendingProperties, setPendingProperties] = useState([]);
    const [approvedProperties, setApprovedProperties] = useState([]);
    const [rejectedProperties, setRejectedProperties] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [payments, setPayments] = useState([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0, users: {}, bookings: {}, enquiries: {} });
    const [usersList, setUsersList] = useState([]);

    // UI
    const [loading, setLoading] = useState(true);
    const [paymentsLoading, setPaymentsLoading] = useState(false);
    const [paymentFilter, setPaymentFilter] = useState('all');
    const [rejectionReason, setRejectionReason] = useState({});
    const [expandedEnquiry, setExpandedEnquiry] = useState(null);
    const [expandedBooking, setExpandedBooking] = useState(null);
    const [error, setError] = useState(null);
    const [submittingListing, setSubmittingListing] = useState(false);
    const [enquiryFilter, setEnquiryFilter] = useState('all');
    const [selectedEnquiries, setSelectedEnquiries] = useState([]);

    // ── Notifications ──────────────────────────────────────────────────────────
    const [showNotifications, setShowNotifications] = useState(false);
    const [seenIds, setSeenIds] = useState(() => {
        try { return new Set(JSON.parse(localStorage.getItem('ns_admin_seen_notifs') || '[]')); }
        catch { return new Set(); }
    });
    const notifRef = useRef(null);

    // Listing form
    const [newListing, setNewListing] = useState({
        name: '', type: 'Coworking Space', city: '',
        area: '', address: '', price: '', period: 'month',
        description: '', amenities: '',
        image: '', image2: '', image3: '', image4: '',
        latitude: '', longitude: '',
        is_featured: false, show_on_homepage: false,
        show_on_rent: false, show_on_buy: false,
    });

    // ── Data loading ───────────────────────────────────────────────────────────
    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [pending, approved, rejected, statsData, enquiryData, bookingData, usersData, paymentsData] = await Promise.all([
                getPendingProperties(),
                getApprovedProperties(),
                getRejectedProperties(),
                getAdminStats(),
                adminAPI.getEnquiries().catch(() => ({ enquiries: [] })),
                adminAPI.getAllBookings().catch(() => ({ bookings: [] })),
                adminAPI.getAllUsers().catch(() => ({ users: [] })),
                adminAPI.getPayments().catch(() => ({ payments: [] })),
            ]);
            setPendingProperties(pending || []);
            setApprovedProperties(approved || []);
            setRejectedProperties(rejected || []);
            setStats(statsData || {});
            setEnquiries(enquiryData?.enquiries || []);
            setBookings(bookingData?.bookings || []);
            setUsersList(usersData?.users || []);
            setPayments(paymentsData?.payments || []);
        } catch {
            setError('Failed to load dashboard data. Please try refreshing.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadData(); }, [loadData]);

    // Close notification dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Persist seenIds to localStorage
    useEffect(() => {
        localStorage.setItem('ns_admin_seen_notifs', JSON.stringify([...seenIds]));
    }, [seenIds]);

    // ── Handlers ───────────────────────────────────────────────────────────────
    const handleApprove = async (id) => {
        try { await approveProperty(id); await loadData(); }
        catch { setError('Failed to approve property.'); }
    };

    const handleReject = async (id) => {
        try {
            await rejectProperty(id, rejectionReason[id] || '');
            setRejectionReason(prev => { const n = { ...prev }; delete n[id]; return n; });
            await loadData();
        } catch { setError('Failed to reject property.'); }
    };

    const handleDeleteProperty = async (id) => {
        if (!window.confirm('Delete this property permanently?')) return;
        try { await adminAPI.deleteProperty(id); await loadData(); }
        catch { setError('Failed to delete property.'); }
    };

    const handleBookingStatus = async (id, status) => {
        try {
            await adminAPI.updateBookingStatus(id, status);
            setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
        } catch { setError('Failed to update booking status.'); }
    };

    const handleEnquiryStatus = async (id, status) => {
        try {
            const oldStatus = enquiries.find(e => e.id === id)?.status;
            await adminAPI.updateEnquiryStatus(id, status);

            // Update local state list
            setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));

            // Update stats counts live so dashboard is accurate
            if (oldStatus && oldStatus !== status) {
                setStats(prev => ({
                    ...prev,
                    enquiries: {
                        ...prev.enquiries,
                        [oldStatus]: Math.max(0, (prev.enquiries?.[oldStatus] || 0) - 1),
                        [status]: (prev.enquiries?.[status] || 0) + 1
                    }
                }));
            }
        } catch (err) {
            console.error('Status update failed:', err);
            setError('Failed to update enquiry status.');
        }
    };

    const handleBulkStatusUpdate = async (status) => {
        if (selectedEnquiries.length === 0) return;
        setLoading(true);
        try {
            await Promise.all(selectedEnquiries.map(id => adminAPI.updateEnquiryStatus(id, status)));
            await loadData();
            setSelectedEnquiries([]);
        } catch {
            setError('Failed to update some enquiries.');
        } finally {
            setLoading(false);
        }
    };

    const toggleEnquirySelection = (id) => {
        setSelectedEnquiries(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleSelectAllEnquiries = (filteredEnquiries) => {
        if (selectedEnquiries.length === filteredEnquiries.length) {
            setSelectedEnquiries([]);
        } else {
            setSelectedEnquiries(filteredEnquiries.map(e => e.id));
        }
    };

    const handleDeleteEnquiry = async (id) => {
        if (!window.confirm('Delete this enquiry?')) return;
        try { await adminAPI.deleteEnquiry(id); setEnquiries(prev => prev.filter(e => e.id !== id)); }
        catch { setError('Failed to delete enquiry.'); }
    };

    const handleImageUpload = async (file, field) => {
        if (!file) return;
        try {
            const { uploadToFirebaseStorage } = await import('../lib/firebase');
            const storagePath = `listings/${Date.now()}_${file.name}`;
            const url = await uploadToFirebaseStorage(file, storagePath);
            setNewListing(prev => ({ ...prev, [field]: url }));
        } catch { setError('Image upload failed.'); }
    };

    const handleCreateListing = async (e) => {
        e.preventDefault();
        setSubmittingListing(true);
        try {
            const token = localStorage.getItem('nanospace_token');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/properties`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    ...newListing,
                    amenities: newListing.amenities.split(',').map(a => a.trim()).filter(Boolean),
                    images: [newListing.image, newListing.image2, newListing.image3, newListing.image4].filter(Boolean),
                }),
            });
            const data = await res.json();
            if (res.ok) {
                alert('✅ Listing created successfully!');
                setNewListing({ name: '', type: 'Coworking Space', city: '', area: '', address: '', price: '', period: 'month', description: '', amenities: '', image: '', image2: '', image3: '', image4: '', latitude: '', longitude: '', is_featured: false, show_on_homepage: false, show_on_rent: false, show_on_buy: false });
                await loadData();
            } else {
                setError(data.error || 'Failed to create listing.');
            }
        } catch { setError('Failed to create listing.'); }
        finally { setSubmittingListing(false); }
    };

    const handleToggleFlag = async (property, flag) => {
        try { await adminAPI.updateProperty(property.id, { [flag]: !property[flag] }); await loadData(); }
        catch { setError('Failed to update property flag.'); }
    };

    const handleLogout = () => { logout(); navigate('/'); };

    // ── Computed ───────────────────────────────────────────────────────────────
    // Build notification list from pending bookings + new enquiries
    const notifications = [
        ...bookings
            .filter(b => b.status === 'pending')
            .map(b => ({
                id: `booking_${b.id}`,
                type: 'booking',
                title: b.property_name || `Booking #${b.id}`,
                subtitle: b.customer_name ? `from ${b.customer_name}` : 'New booking request',
                time: b.created_at,
                tab: 'bookings',
            })),
        ...enquiries
            .filter(e => e.status === 'new')
            .map(e => ({
                id: `enquiry_${e.id}`,
                type: 'enquiry',
                title: e.name || 'New Enquiry',
                subtitle: `${ENQUIRY_TYPE_LABELS[e.enquiry_type] || e.enquiry_type}${e.property_name ? ` · ${e.property_name}` : ''}`,
                time: e.created_at,
                tab: 'enquiries',
            })),
    ].sort((a, b) => new Date(b.time) - new Date(a.time));

    const unreadCount = notifications.filter(n => !seenIds.has(n.id)).length;

    const markAllSeen = () => setSeenIds(new Set(notifications.map(n => n.id)));

    const handleNotifClick = (notif) => {
        setSeenIds(prev => new Set([...prev, notif.id]));
        setShowNotifications(false);
        setActiveTab(notif.tab);
        if (notif.tab === 'bookings') setBookingFilter('pending');
        if (notif.tab === 'enquiries') setEnquiryFilter('new');
    };

    const filteredBookings = bookingFilter === 'all' ? bookings : bookings.filter(b => b.status === bookingFilter);
    const currentProperties = propertySubTab === 'pending' ? pendingProperties : propertySubTab === 'approved' ? approvedProperties : rejectedProperties;
    const totalProperties = pendingProperties.length + approvedProperties.length + rejectedProperties.length;
    const bookingCounts = { all: bookings.length, pending: bookings.filter(b => b.status === 'pending').length, confirmed: bookings.filter(b => b.status === 'confirmed').length, cancelled: bookings.filter(b => b.status === 'cancelled').length };

    const handleNavClick = (id) => {
        if (id === 'properties') {
            setPropertiesExpanded(v => !v);
        } else if (id.startsWith('properties_')) {
            setPropertySubTab(id.replace('properties_', ''));
            setActiveTab('properties');
            setPropertiesExpanded(true);
        } else {
            setActiveTab(id);
        }
    };

    const getBreadcrumb = () => ({
        dashboard_overview: 'Overview',
        properties: `Properties / ${propertySubTab.charAt(0).toUpperCase() + propertySubTab.slice(1)}`,
        bookings: 'Bookings',
        enquiries: 'Enquiries',
        users: 'Users',
        add_listing: 'Add Listing',
    }[activeTab] || activeTab);

    // ── Card renderers ─────────────────────────────────────────────────────────
    const renderBookingCard = (booking) => {
        const style = BOOKING_STATUS_STYLES[booking.status] || BOOKING_STATUS_STYLES.pending;
        const isExpanded = expandedBooking === booking.id;
        const amount = booking.total_amount ? `₹${booking.total_amount}` : booking.amount || '—';
        return (
            <div key={booking.id} className="ad-card booking-card" style={{ borderLeft: `4px solid ${style.border}` }}>
                <div className="ad-card-row">
                    <div className="ad-card-main">
                        <div className="ad-badges">
                            <span className="ad-badge" style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}>{booking.status}</span>
                            {booking.booking_type && <span className="ad-badge ad-badge-gray">{booking.booking_type}</span>}
                            <span className="ad-meta-time"><Clock size={11} /> {new Date(booking.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div className="ad-card-title">
                            <Building2 size={15} className="ad-icon-purple" />
                            <span>{booking.property_name || `Property #${booking.property_id}`}</span>
                            {booking.property_city && <span className="ad-meta-loc"><MapPin size={11} /> {booking.property_city}</span>}
                        </div>
                        <div className="ad-card-meta">
                            {booking.customer_name && <span><Users size={13} className="ad-icon-gray" /> {booking.customer_name}</span>}
                            {booking.customer_phone && <span><Phone size={12} className="ad-icon-gray" /> {booking.customer_phone}</span>}
                            {booking.customer_email && <span><Mail size={12} className="ad-icon-gray" /> {booking.customer_email}</span>}
                        </div>
                    </div>
                    <div className="ad-card-side">
                        <span className="ad-amount"><IndianRupee size={14} />{amount.replace('₹', '')}</span>
                        <button className="ad-expand-btn" onClick={() => setExpandedBooking(isExpanded ? null : booking.id)}>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />} {isExpanded ? 'Less' : 'Details'}
                        </button>
                    </div>
                </div>
                {isExpanded && (
                    <div className="ad-expand-body">
                        <div className="ad-expand-row">
                            {booking.start_date && <span><strong>Start:</strong>  {new Date(booking.start_date).toLocaleDateString('en-IN')}</span>}
                            {booking.end_date && <span><strong>End:</strong>    {new Date(booking.end_date).toLocaleDateString('en-IN')}</span>}
                            {booking.quantity && <span><strong>Qty:</strong>    {booking.quantity}</span>}
                            {booking.property_type && <span><strong>Space:</strong>  {booking.property_type}</span>}
                        </div>
                        {booking.notes && <p className="ad-notes">{booking.notes}</p>}
                        <div className="ad-actions">
                            {booking.status === 'pending' && <button className="ad-btn ad-btn-green" onClick={() => handleBookingStatus(booking.id, 'confirmed')}><CheckCircle size={14} /> Confirm</button>}
                            {booking.status !== 'cancelled' && <button className="ad-btn ad-btn-red-soft" onClick={() => handleBookingStatus(booking.id, 'cancelled')}><XCircle size={14} /> Cancel</button>}
                            {booking.status === 'cancelled' && <button className="ad-btn ad-btn-yellow" onClick={() => handleBookingStatus(booking.id, 'pending')}><RefreshCw size={14} /> Restore</button>}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderPropertyCard = (property) => (
        <div key={property.id} className="ad-card property-card">
            {property.image && (
                <div className="ad-prop-img-wrap">
                    <img src={property.image} alt={property.name} className="ad-prop-img" />
                    <span className={`ad-prop-status-badge ad-prop-status-${propertySubTab}`}>{propertySubTab}</span>
                </div>
            )}
            <div className="ad-card-body">
                <h3 className="ad-prop-name">{property.name}</h3>
                <div className="ad-prop-meta">
                    <span><Building2 size={12} /> {property.type}</span>
                    <span><MapPin size={12} />    {property.city}</span>
                    {property.area && <span>{property.area} sqft</span>}
                </div>
                <div className="ad-prop-price">
                    <IndianRupee size={13} />
                    {property.price_per_seat ? `${property.price_per_seat}/seat`
                        : property.price_per_month ? `${property.price_per_month}/mo`
                            : property.price ? `${property.price}/${property.period}` : '—'}
                </div>
                {(property.contact_name || property.contact_email || property.contact_phone) && (
                    <div className="ad-owner-info">
                        {property.contact_name && <span><Users size={13} /> {property.contact_name}</span>}
                        {property.contact_email && <span><Mail size={13} /> {property.contact_email}</span>}
                        {property.contact_phone && <span><Phone size={13} /> {property.contact_phone}</span>}
                    </div>
                )}
                {property.rejection_reason && <p className="ad-rejection-reason">⚠ {property.rejection_reason}</p>}

                {propertySubTab === 'pending' && (
                    <div className="ad-prop-actions">
                        <input className="ad-input" type="text" placeholder="Rejection reason (optional)"
                            value={rejectionReason[property.id] || ''}
                            onChange={e => setRejectionReason(p => ({ ...p, [property.id]: e.target.value }))} />
                        <div className="ad-actions">
                            <button className="ad-btn ad-btn-green" onClick={() => handleApprove(property.id)}><CheckCircle size={14} /> Approve</button>
                            <button className="ad-btn ad-btn-red" onClick={() => handleReject(property.id)}><XCircle size={14} /> Reject</button>
                        </div>
                    </div>
                )}
                {(propertySubTab === 'approved' || propertySubTab === 'rejected') && (
                    <div className="ad-prop-actions">
                        <div className="ad-flag-row">
                            {[
                                { flag: 'show_on_homepage', label: 'Home' },
                                { flag: 'is_featured', label: 'Featured' },
                                { flag: 'show_on_buy', label: 'Buy' },
                                { flag: 'show_on_rent', label: 'Rent' },
                            ].map(({ flag, label }) => (
                                <button key={flag} className={`ad-flag-btn ${property[flag] ? 'active' : ''}`} onClick={() => handleToggleFlag(property, flag)}>
                                    {property[flag] ? <CheckSquare size={13} /> : <Square size={13} />} {label}
                                </button>
                            ))}
                        </div>
                        <button className="ad-btn ad-btn-red-soft" onClick={() => handleDeleteProperty(property.id)}><Trash2 size={14} /> Delete</button>
                    </div>
                )}
            </div>
        </div>
    );

    const renderEnquiryCard = (enquiry) => {
        const isExpanded = expandedEnquiry === enquiry.id;
        const isSelected = selectedEnquiries.includes(enquiry.id);
        const statusColor = ENQUIRY_STATUS_COLORS[enquiry.status] || '#6b7280';
        return (
            <div key={enquiry.id} className={`ad-card ${isSelected ? 'selected' : ''}`} style={{ borderLeft: `4px solid ${statusColor}` }}>
                <div className="ad-card-row">
                    <div className="ad-card-check">
                        <input type="checkbox" checked={isSelected} onChange={() => toggleEnquirySelection(enquiry.id)} />
                    </div>
                    <div className="ad-card-main" onClick={() => setExpandedEnquiry(isExpanded ? null : enquiry.id)} style={{ cursor: 'pointer' }}>
                        <div className="ad-badges">
                            <h3 className="ad-enquiry-name">{enquiry.name}</h3>
                            <span className="ad-badge" style={{ background: statusColor + '20', color: statusColor, border: `1px solid ${statusColor}` }}>{enquiry.status}</span>
                            <span className="ad-badge ad-badge-gray">{ENQUIRY_TYPE_LABELS[enquiry.enquiry_type] || enquiry.enquiry_type}</span>
                        </div>
                        <div className="ad-card-meta">
                            {enquiry.email && <span><Mail size={12} className="ad-icon-gray" /> {enquiry.email}</span>}
                            {enquiry.phone && <span><Phone size={12} className="ad-icon-gray" /> {enquiry.phone}</span>}
                            {enquiry.city && <span><MapPin size={12} className="ad-icon-gray" /> {enquiry.city}</span>}
                            <span className="ad-meta-time"><Clock size={11} /> {new Date(enquiry.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        </div>
                    </div>
                    <button className="ad-expand-btn" onClick={() => setExpandedEnquiry(isExpanded ? null : enquiry.id)}>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                </div>
                {isExpanded && (
                    <div className="ad-expand-body">
                        {enquiry.subject && <p><strong>Subject:</strong> {enquiry.subject}</p>}
                        {enquiry.message && <p className="ad-notes">{enquiry.message}</p>}
                        <div className="ad-expand-row">
                            {enquiry.property_name && <span><strong>Property:</strong> {enquiry.property_name}</span>}
                            {enquiry.budget && <span><strong>Budget:</strong>   {enquiry.budget}</span>}
                            {enquiry.seats_required && <span><strong>Seats:</strong>    {enquiry.seats_required}</span>}
                        </div>
                        <div className="ad-actions">
                            <span className="ad-action-label">Mark as:</span>
                            {enquiry.status !== 'new' && (
                                <button className="ad-btn ad-btn-yellow-soft" onClick={() => handleEnquiryStatus(enquiry.id, 'new')}>
                                    <Clock size={13} /> New
                                </button>
                            )}
                            {enquiry.status !== 'contacted' && (
                                <button className="ad-btn ad-btn-blue-soft" onClick={() => handleEnquiryStatus(enquiry.id, 'contacted')}>
                                    <Phone size={13} /> Contacted
                                </button>
                            )}
                            {enquiry.status !== 'resolved' && (
                                <button className="ad-btn ad-btn-green-soft" onClick={() => handleEnquiryStatus(enquiry.id, 'resolved')}>
                                    <CheckCircle size={13} /> Resolved
                                </button>
                            )}
                            {enquiry.status !== 'closed' && (
                                <button className="ad-btn ad-btn-gray-soft" onClick={() => handleEnquiryStatus(enquiry.id, 'closed')}>
                                    <XCircle size={13} /> Closed
                                </button>
                            )}
                            <div style={{ marginLeft: 'auto' }}>
                                <button className="ad-btn ad-btn-red-soft" onClick={() => handleDeleteEnquiry(enquiry.id)}>
                                    <Trash2 size={13} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // ── Analytics helpers ──────────────────────────────────────────────────────
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const PIE_COLORS = ['#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899'];

    const bookingsByMonth = MONTHS.map((m, i) => ({
        month: m,
        bookings: bookings.filter(b => b.created_at && new Date(b.created_at).getMonth() === i).length,
    }));

    const bookingStatusData = [
        { name: 'Pending', value: bookings.filter(b => b.status === 'pending').length, fill: '#f59e0b' },
        { name: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, fill: '#10b981' },
        { name: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, fill: '#ef4444' },
        { name: 'Completed', value: bookings.filter(b => b.status === 'completed').length, fill: '#7c3aed' },
    ].filter(d => d.value > 0);

    const allProperties = [...pendingProperties, ...approvedProperties, ...rejectedProperties];
    const propTypeMap = {};
    allProperties.forEach(p => { const t = p.type || 'Other'; propTypeMap[t] = (propTypeMap[t] || 0) + 1; });
    const propertyTypeData = Object.entries(propTypeMap).map(([name, count]) => ({ name, count }));

    const enquiriesByMonth = MONTHS.map((m, i) => ({
        month: m,
        enquiries: enquiries.filter(e => e.created_at && new Date(e.created_at).getMonth() === i).length,
    }));

    // ── Content renderer ───────────────────────────────────────────────────────
    const renderContent = () => {
        // Overview
        if (activeTab === 'dashboard_overview') return (
            <div className="ad-overview">
                <div className="ad-stats-grid">
                    {[
                        { label: 'Total Properties', value: stats.total ?? totalProperties, icon: Building2, color: '#7c3aed', bg: '#ede9fe' },
                        { label: 'Pending Approvals', value: stats.pending ?? pendingProperties.length, icon: Clock, color: '#f59e0b', bg: '#fef3c7' },
                        { label: 'Total Bookings', value: stats.bookings?.total ?? bookings.length, icon: Calendar, color: '#10b981', bg: '#d1fae5' },
                        { label: 'New Enquiries', value: enquiries.filter(e => e.status === 'new').length || (stats.enquiries?.new ?? 0), icon: MessageSquare, color: '#f59e0b', bg: '#fef3c7' },
                        { label: 'Contacted', value: enquiries.filter(e => e.status === 'contacted').length || (stats.enquiries?.contacted ?? 0), icon: Phone, color: '#3b82f6', bg: '#dbeafe' },
                        { label: 'Total Users', value: stats.users?.total ?? usersList.length, icon: Users, color: '#ec4899', bg: '#fce7f3' },
                        { label: 'Approved Listings', value: stats.approved ?? approvedProperties.length, icon: CheckCircle, color: '#059669', bg: '#d1fae5' },
                        { label: 'Revenue Collected', value: `₹${payments.filter(p => p.status === 'paid').reduce((s, p) => s + (p.amount || 0) / 100, 0).toLocaleString('en-IN')}`, icon: CreditCard, color: '#0f766e', bg: '#ccfbf1' },
                    ].map((stat) => {
                        const StatIcon = stat.icon;
                        return (
                            <div className="ad-stat-card" key={stat.label}>
                                <div className="ad-stat-icon" style={{ background: stat.bg, color: stat.color }}><StatIcon size={22} /></div>
                                <div>
                                    <p className="ad-stat-value" style={{ color: stat.color }}>{loading ? '…' : stat.value}</p>
                                    <p className="ad-stat-label">{stat.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="ad-quick-panels">
                    <div className="ad-quick-card">
                        <div className="ad-quick-header">
                            <Clock size={16} className="ad-icon-yellow" />
                            <h3>Pending Properties ({pendingProperties.length})</h3>
                            <button className="ad-view-all" onClick={() => { setActiveTab('properties'); setPropertySubTab('pending'); setPropertiesExpanded(true); }}>View All <ChevronRight size={14} /></button>
                        </div>
                        {pendingProperties.slice(0, 3).map(p => (
                            <div key={p.id} className="ad-quick-row">
                                <Building2 size={14} className="ad-icon-purple" />
                                <div><span className="ad-quick-title">{p.name}</span><span className="ad-quick-sub">{p.city} · {p.type}</span></div>
                            </div>
                        ))}
                        {pendingProperties.length === 0 && <p className="ad-empty-mini">No pending properties.</p>}
                    </div>
                    <div className="ad-quick-card">
                        <div className="ad-quick-header">
                            <Calendar size={16} className="ad-icon-purple" />
                            <h3>Recent Bookings ({bookings.filter(b => b.status === 'pending').length} pending)</h3>
                            <button className="ad-view-all" onClick={() => setActiveTab('bookings')}>View All <ChevronRight size={14} /></button>
                        </div>
                        {bookings.slice(0, 3).map(b => (
                            <div key={b.id} className="ad-quick-row">
                                <div className="ad-quick-dot" style={{ background: BOOKING_STATUS_STYLES[b.status]?.border || '#ccc' }} />
                                <div><span className="ad-quick-title">{b.property_name || `Booking #${b.id}`}</span><span className="ad-quick-sub">{b.customer_name} · {b.status}</span></div>
                            </div>
                        ))}
                        {bookings.length === 0 && <p className="ad-empty-mini">No bookings yet.</p>}
                    </div>
                </div>

                {/* ── Analytics ──────────────────────────────────────── */}
                <div className="ad-analytics-section">
                    <h2 className="ad-analytics-title">Analytics Overview</h2>
                    <div className="ad-analytics-grid">

                        {/* Bookings Over Time */}
                        <div className="ad-chart-card ad-chart-wide">
                            <p className="ad-chart-label">Bookings Over Time</p>
                            <ResponsiveContainer width="100%" height={220}>
                                <LineChart data={bookingsByMonth} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="bookings" stroke="#7c3aed" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Enquiries Trend */}
                        <div className="ad-chart-card ad-chart-wide">
                            <p className="ad-chart-label">Enquiries Trend</p>
                            <ResponsiveContainer width="100%" height={220}>
                                <AreaChart data={enquiriesByMonth} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="enquiryGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="enquiries" stroke="#3b82f6" strokeWidth={2.5} fill="url(#enquiryGrad)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Property Types */}
                        <div className="ad-chart-card">
                            <p className="ad-chart-label">Property Types</p>
                            {propertyTypeData.length === 0
                                ? <p className="ad-chart-empty">No data yet</p>
                                : <ResponsiveContainer width="100%" height={220}>
                                    <BarChart data={propertyTypeData} margin={{ top: 5, right: 10, left: -20, bottom: 30 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" interval={0} />
                                        <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                                        <Tooltip />
                                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                            {propertyTypeData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            }
                        </div>

                        {/* Booking Status */}
                        <div className="ad-chart-card">
                            <p className="ad-chart-label">Booking Status</p>
                            {bookingStatusData.length === 0
                                ? <p className="ad-chart-empty">No bookings yet</p>
                                : <ResponsiveContainer width="100%" height={220}>
                                    <PieChart>
                                        <Pie data={bookingStatusData} cx="50%" cy="45%" outerRadius={75} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                                            {bookingStatusData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                                        </Pie>
                                        <Tooltip />
                                        <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            }
                        </div>

                    </div>
                </div>

            </div>
        );

        // Properties
        if (activeTab === 'properties') return (
            <div>
                <div className="ad-sub-tabs">
                    {['pending', 'approved', 'rejected'].map(sub => (
                        <button key={sub} className={`ad-sub-tab ${propertySubTab === sub ? 'active' : ''}`} onClick={() => setPropertySubTab(sub)}>
                            {sub.charAt(0).toUpperCase() + sub.slice(1)}
                            <span className="ad-sub-count">{sub === 'pending' ? pendingProperties.length : sub === 'approved' ? approvedProperties.length : rejectedProperties.length}</span>
                        </button>
                    ))}
                </div>
                <p className="ad-show-count">Showing <strong>{currentProperties.length}</strong> {propertySubTab} propert{currentProperties.length === 1 ? 'y' : 'ies'}</p>
                {loading
                    ? <div className="ad-loading"><RefreshCw size={22} className="spin" /> Loading…</div>
                    : currentProperties.length === 0
                        ? <div className="ad-empty"><Building2 size={48} /><p>No {propertySubTab} properties.</p></div>
                        : <div className="ad-prop-grid">{currentProperties.map(renderPropertyCard)}</div>}
            </div>
        );

        // Bookings
        if (activeTab === 'bookings') return (
            <div>
                <div className="ad-filter-pills">
                    {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
                        <button key={f} className={`ad-pill ${bookingFilter === f ? 'active' : ''}`} onClick={() => setBookingFilter(f)}>
                            {f.charAt(0).toUpperCase() + f.slice(1)} ({bookingCounts[f]})
                        </button>
                    ))}
                </div>
                {loading
                    ? <div className="ad-loading"><RefreshCw size={22} className="spin" /> Loading…</div>
                    : filteredBookings.length === 0
                        ? <div className="ad-empty"><Calendar size={48} /><p>No {bookingFilter !== 'all' ? bookingFilter : ''} bookings.</p></div>
                        : <div className="ad-list">{filteredBookings.map(renderBookingCard)}</div>}
            </div>
        );

        // Enquiries
        if (activeTab === 'enquiries') {
            const filteredEnquiries = enquiryFilter === 'all'
                ? enquiries
                : enquiries.filter(e => e.status === enquiryFilter);
            return (
                <div>
                    <div className="ad-filter-pills">
                        {['all', 'new', 'contacted', 'resolved', 'closed'].map(f => (
                            <button key={f} className={`ad-pill ${enquiryFilter === f ? 'active' : ''}`} onClick={() => setEnquiryFilter(f)}>
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                                {' '}({f === 'all' ? enquiries.length : enquiries.filter(e => e.status === f).length})
                            </button>
                        ))}
                    </div>

                    <div className="ad-bulk-bar">
                        <div className="ad-bulk-left">
                            <input
                                type="checkbox"
                                checked={selectedEnquiries.length === filteredEnquiries.length && filteredEnquiries.length > 0}
                                onChange={() => handleSelectAllEnquiries(filteredEnquiries)}
                            />
                            <span className="ad-bulk-text">{selectedEnquiries.length} selected</span>
                        </div>
                        {selectedEnquiries.length > 0 && (
                            <div className="ad-bulk-actions">
                                <span className="ad-bulk-label">Mark all selected as:</span>
                                <button className="ad-btn ad-btn-blue-soft" onClick={() => handleBulkStatusUpdate('contacted')}><Phone size={13} /> Contacted</button>
                                <button className="ad-btn ad-btn-green-soft" onClick={() => handleBulkStatusUpdate('resolved')}><CheckCircle size={13} /> Resolved</button>
                                <button className="ad-btn ad-btn-gray-soft" onClick={() => handleBulkStatusUpdate('closed')}><XCircle size={13} /> Closed</button>
                            </div>
                        )}
                    </div>

                    <p className="ad-show-count">Showing <strong>{filteredEnquiries.length}</strong> enquir{filteredEnquiries.length === 1 ? 'y' : 'ies'}</p>
                    {loading
                        ? <div className="ad-loading"><RefreshCw size={22} className="spin" /> Loading…</div>
                        : filteredEnquiries.length === 0
                            ? <div className="ad-empty"><MessageSquare size={48} /><p>No {enquiryFilter !== 'all' ? enquiryFilter : ''} enquiries yet.</p></div>
                            : <div className="ad-list">{filteredEnquiries.map(renderEnquiryCard)}</div>}
                </div>
            );
        }

        // Users
        if (activeTab === 'users') return (
            <div>
                <div className="ad-stats-grid ad-stats-grid-sm" style={{ marginBottom: '1.5rem' }}>
                    {[
                        { label: 'Total Users', value: stats.users?.total || usersList.length, color: '#7c3aed' },
                        { label: 'Customers', value: stats.users?.customers || 0, color: '#3b82f6' },
                        { label: 'Property Owners', value: stats.users?.owners || 0, color: '#10b981' },
                    ].map(item => (
                        <div key={item.label} className="ad-stat-mini" style={{ borderTop: `3px solid ${item.color}` }}>
                            <p className="ad-stat-value" style={{ color: item.color }}>{item.value}</p>
                            <p className="ad-stat-label">{item.label}</p>
                        </div>
                    ))}
                </div>
                <div className="ad-table-wrap">
                    <table className="ad-table">
                        <thead>
                            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th></tr>
                        </thead>
                        <tbody>
                            {usersList.length === 0
                                ? <tr><td colSpan="5" className="ad-table-empty">No users found.</td></tr>
                                : usersList.map(item => (
                                    <tr key={item.id}>
                                        <td className="ad-td-bold">{item.full_name}</td>
                                        <td><span className="ad-td-flex">{item.email}{item.email_verified ? <CheckCircle size={13} className="ad-icon-green" title="Verified" /> : <Clock size={13} className="ad-icon-gray" title="Unverified" />}</span></td>
                                        <td><span className="ad-td-flex">{item.phone || '—'}{item.phone && (item.phone_verified ? <CheckCircle size={13} className="ad-icon-green" /> : <Clock size={13} className="ad-icon-gray" />)}</span></td>
                                        <td><span className={`ad-role-badge ad-role-${item.role}`}>{item.role}</span></td>
                                        <td className="ad-td-muted">{new Date(item.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );

        // Payments
        if (activeTab === 'payments') {
            const PAYMENT_STATUS_STYLES = {
                paid: { bg: '#d1fae5', color: '#065f46', border: '#10b981' },
                pending: { bg: '#fef3c7', color: '#92400e', border: '#f59e0b' },
                failed: { bg: '#fee2e2', color: '#991b1b', border: '#ef4444' },
            };
            const filteredPayments = paymentFilter === 'all'
                ? payments
                : payments.filter(p => p.status === paymentFilter);
            const totalRevenue = payments
                .filter(p => p.status === 'paid')
                .reduce((sum, p) => sum + (p.amount || 0) / 100, 0);
            const paymentCounts = {
                all: payments.length,
                paid: payments.filter(p => p.status === 'paid').length,
                pending: payments.filter(p => p.status === 'pending').length,
                failed: payments.filter(p => p.status === 'failed').length,
            };
            return (
                <div>
                    {/* Revenue summary */}
                    <div className="ad-stats-grid ad-stats-grid-sm" style={{ marginBottom: '1.5rem' }}>
                        {[
                            { label: 'Total Payments', value: payments.length, color: '#7c3aed' },
                            { label: 'Successful', value: paymentCounts.paid, color: '#10b981' },
                            { label: 'Pending', value: paymentCounts.pending, color: '#f59e0b' },
                            { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, color: '#059669' },
                        ].map(item => (
                            <div key={item.label} className="ad-stat-mini" style={{ borderTop: `3px solid ${item.color}` }}>
                                <p className="ad-stat-value" style={{ color: item.color }}>{item.value}</p>
                                <p className="ad-stat-label">{item.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Filter pills */}
                    <div className="ad-filter-pills">
                        {['all', 'paid', 'pending', 'failed'].map(f => (
                            <button key={f} className={`ad-pill ${paymentFilter === f ? 'active' : ''}`} onClick={() => setPaymentFilter(f)}>
                                {f.charAt(0).toUpperCase() + f.slice(1)} ({paymentCounts[f]})
                            </button>
                        ))}
                    </div>

                    {loading
                        ? <div className="ad-loading"><RefreshCw size={22} className="spin" /> Loading…</div>
                        : filteredPayments.length === 0
                            ? <div className="ad-empty"><CreditCard size={48} /><p>No {paymentFilter !== 'all' ? paymentFilter : ''} payments yet.</p></div>
                            : (
                                <div className="ad-table-wrap">
                                    <table className="ad-table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Owner</th>
                                                <th>Property</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Order ID</th>
                                                <th>Payment ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPayments.map(pay => {
                                                const style = PAYMENT_STATUS_STYLES[pay.status] || PAYMENT_STATUS_STYLES.pending;
                                                return (
                                                    <tr key={pay.id}>
                                                        <td className="ad-td-muted">
                                                            {pay.created_at
                                                                ? new Date(pay.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                                                                : '—'}
                                                        </td>
                                                        <td>
                                                            <div className="ad-td-bold">{pay.owner_name || '—'}</div>
                                                            <div className="ad-td-muted" style={{ fontSize: '0.75rem' }}>{pay.owner_email}</div>
                                                        </td>
                                                        <td className="ad-td-bold">{pay.property_name || '—'}</td>
                                                        <td>
                                                            <span className="ad-amount" style={{ color: '#059669', fontSize: '0.95rem' }}>
                                                                <IndianRupee size={13} />
                                                                {((pay.amount || 0) / 100).toLocaleString('en-IN')}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="ad-badge" style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}>
                                                                {pay.status}
                                                            </span>
                                                        </td>
                                                        <td className="ad-td-muted" style={{ fontSize: '0.75rem' }}>
                                                            {pay.razorpay_order_id
                                                                ? `${pay.razorpay_order_id.slice(0, 18)}…`
                                                                : '—'}
                                                        </td>
                                                        <td className="ad-td-muted" style={{ fontSize: '0.75rem' }}>
                                                            {pay.razorpay_payment_id
                                                                ? `${pay.razorpay_payment_id.slice(0, 18)}…`
                                                                : pay.status === 'pending' ? 'Awaiting payment' : '—'}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                </div>
            );
        }

        // Add Listing
        if (activeTab === 'add_listing') return (
            <div className="ad-form-wrap">
                <div className="ad-form-intro">
                    <h2>Post New Property</h2>
                    <p>Fill this form to instantly add a property to any page on the site.</p>
                </div>
                <form onSubmit={handleCreateListing} className="ad-form-grid">
                    <div className="ad-form-group span-2">
                        <label>Property Name *</label>
                        <input type="text" required value={newListing.name} onChange={e => setNewListing({ ...newListing, name: e.target.value })} placeholder="e.g. Nanospace Premium Office" />
                    </div>
                    <div className="ad-form-group">
                        <label>Page / Category *</label>
                        <select value={newListing.type} onChange={e => setNewListing({ ...newListing, type: e.target.value })}>
                            {['Coworking Space', 'Coliving Space', 'Hotel Room', 'Event Space', 'Virtual Office', 'Party Hall', 'Private Theatre', 'Office Space', 'Residential Property'].map(t => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                    <div className="ad-form-group">
                        <label>City *</label>
                        <input type="text" required value={newListing.city} onChange={e => setNewListing({ ...newListing, city: e.target.value })} placeholder="e.g. Hyderabad" />
                    </div>
                    <div className="ad-form-group">
                        <label>Price *</label>
                        <input type="text" required value={newListing.price} onChange={e => setNewListing({ ...newListing, price: e.target.value })} placeholder="e.g. 5000" />
                    </div>
                    <div className="ad-form-group">
                        <label>Price Period</label>
                        <select value={newListing.period} onChange={e => setNewListing({ ...newListing, period: e.target.value })}>
                            <option value="month">Per Month</option>
                            <option value="day">Per Day</option>
                            <option value="seat">Per Seat</option>
                            <option value="sqft">Per Sqft</option>
                            <option value="total">Total</option>
                        </select>
                    </div>

                    {[
                        { field: 'image', label: 'Main Photo (Hero) *', id: 'img1', span: true },
                        { field: 'image2', label: 'Photo 2', id: 'img2', span: false },
                        { field: 'image3', label: 'Photo 3', id: 'img3', span: false },
                        { field: 'image4', label: 'Photo 4', id: 'img4', span: false },
                    ].map(({ field, label, id, span }) => (
                        <div key={field} className={`ad-form-group${span ? ' span-2' : ''}`}>
                            <label>{label}</label>
                            <div className="ad-file-row">
                                <input type="file" id={id} accept="image/*" style={{ display: 'none' }} onChange={e => handleImageUpload(e.target.files[0], field)} />
                                <label htmlFor={id} className="ad-file-btn"><Upload size={14} /> Upload</label>
                                <input type="text" readOnly value={newListing[field]} placeholder="No file chosen" className="ad-file-input" />
                            </div>
                            {newListing[field] && <img src={newListing[field]} alt="Preview" className="ad-img-preview" />}
                        </div>
                    ))}

                    <div className="ad-form-group">
                        <label>Latitude</label>
                        <input type="text" value={newListing.latitude} onChange={e => setNewListing({ ...newListing, latitude: e.target.value })} placeholder="17.4483" />
                    </div>
                    <div className="ad-form-group">
                        <label>Longitude</label>
                        <input type="text" value={newListing.longitude} onChange={e => setNewListing({ ...newListing, longitude: e.target.value })} placeholder="78.3915" />
                    </div>
                    <div className="ad-form-group span-2">
                        <LocationPicker
                            value={newListing.latitude && newListing.longitude ? { lat: parseFloat(newListing.latitude), lng: parseFloat(newListing.longitude) } : null}
                            onChange={loc => { if (loc) setNewListing({ ...newListing, latitude: loc.lat.toString(), longitude: loc.lng.toString(), address: loc.address || newListing.address }); }}
                        />
                    </div>
                    <div className="ad-form-group">
                        <label>Area (sqft)</label>
                        <input type="text" value={newListing.area} onChange={e => setNewListing({ ...newListing, area: e.target.value })} placeholder="1500" />
                    </div>
                    <div className="ad-form-group">
                        <label>Locality / Address</label>
                        <input type="text" value={newListing.address} onChange={e => setNewListing({ ...newListing, address: e.target.value })} placeholder="e.g. Jubilee Hills" />
                    </div>
                    <div className="ad-form-group span-2">
                        <label>Amenities (comma-separated)</label>
                        <input type="text" value={newListing.amenities} onChange={e => setNewListing({ ...newListing, amenities: e.target.value })} placeholder="WiFi, AC, Parking, Cafeteria" />
                    </div>
                    <div className="ad-form-group span-2">
                        <label>Description</label>
                        <textarea rows="3" value={newListing.description} onChange={e => setNewListing({ ...newListing, description: e.target.value })} placeholder="Enter property description..." />
                    </div>
                    <div className="ad-form-group span-2">
                        <div className="ad-visibility-row">
                            {[
                                { key: 'show_on_homepage', label: 'Show on Homepage' },
                                { key: 'is_featured', label: 'Mark Featured' },
                                { key: 'show_on_rent', label: 'Post to Rent Page' },
                                { key: 'show_on_buy', label: 'Post to Buy Page' },
                            ].map(({ key, label }) => (
                                <label key={key} className="ad-toggle-label">
                                    <input type="checkbox" checked={newListing[key]} onChange={e => setNewListing({ ...newListing, [key]: e.target.checked })} />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="ad-form-group span-2">
                        <button type="submit" disabled={submittingListing} className="ad-submit-btn">
                            {submittingListing ? <><RefreshCw size={16} className="spin" /> Posting…</> : <><Plus size={16} /> Create & Post Listing</>}
                        </button>
                    </div>
                </form>
            </div>
        );

        return null;
    };

    const PAGE_TITLES = { dashboard_overview: 'Dashboard Overview', properties: 'Properties', bookings: 'Bookings', enquiries: 'Enquiries', users: 'Users', payments: 'Payments', add_listing: 'Add Listing' };

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <div className={`ad-layout${sidebarOpen ? '' : ' sidebar-collapsed'}`}>
            {/* Mobile overlay — tap to close sidebar */}
            <div
                className={`ad-overlay${sidebarOpen ? ' visible' : ''}`}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`ad-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
                <div className="ad-brand">
                    <img src="/images/Logo.png" alt="Nanospace" className="ad-logo" />
                    {sidebarOpen && (
                        <div className="ad-brand-text">
                            <span className="ad-brand-name">Nanospace</span>
                            <span className="ad-brand-sub">Admin Panel</span>
                        </div>
                    )}
                </div>

                <nav className="ad-nav">
                    {NAV_ITEMS.map(item => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id || (item.id === 'properties' && activeTab === 'properties');
                        const hasChildren = item.children?.length > 0;
                        return (
                            <div key={item.id}>
                                <button
                                    className={`ad-nav-item ${isActive ? 'active' : ''} ${item.id === 'add_listing' ? 'ad-nav-add' : ''}`}
                                    onClick={() => handleNavClick(item.id)}
                                    title={!sidebarOpen ? item.label : ''}
                                >
                                    <Icon size={18} className="ad-nav-icon" />
                                    {sidebarOpen && <span className="ad-nav-label">{item.label}</span>}
                                    {sidebarOpen && hasChildren && (
                                        <ChevronDown size={14} className={`ad-nav-arrow ${propertiesExpanded ? 'rotated' : ''}`} />
                                    )}
                                </button>
                                {hasChildren && propertiesExpanded && sidebarOpen && (
                                    <div className="ad-sub-nav">
                                        {item.children.map(child => (
                                            <button
                                                key={child.id}
                                                className={`ad-sub-nav-item ${propertySubTab === child.id.replace('properties_', '') && activeTab === 'properties' ? 'active' : ''}`}
                                                onClick={() => handleNavClick(child.id)}
                                            >
                                                <ChevronRight size={12} /> {child.label}
                                                <span className="ad-sub-count-mini">
                                                    {child.id === 'properties_pending' ? pendingProperties.length : child.id === 'properties_approved' ? approvedProperties.length : rejectedProperties.length}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                <div className="ad-sidebar-footer">
                    {sidebarOpen && (
                        <div className="ad-user-info">
                            <div className="ad-user-avatar">{(user?.full_name || user?.name || 'A')[0].toUpperCase()}</div>
                            <div>
                                <p className="ad-user-name">{user?.full_name || user?.name || 'Admin'}</p>
                                <p className="ad-user-role">Administrator</p>
                            </div>
                        </div>
                    )}
                    <button className="ad-logout-btn" onClick={handleLogout} title="Logout">
                        <LogOut size={16} />{sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="ad-main">
                <header className="ad-topbar">
                    <div className="ad-topbar-left">
                        <button className="ad-menu-btn" onClick={() => setSidebarOpen(v => !v)}><Menu size={20} /></button>
                        <div className="ad-breadcrumb">
                            <span className="ad-bc-root">Admin</span>
                            <ChevronRight size={14} className="ad-bc-sep" />
                            <span className="ad-bc-current">{getBreadcrumb()}</span>
                        </div>
                    </div>
                    <div className="ad-topbar-right">
                        {/* Notification Bell */}
                        <div className="ad-notif-wrap" ref={notifRef}>
                            <button
                                className="ad-notif-btn"
                                onClick={() => setShowNotifications(v => !v)}
                                aria-label="Notifications"
                            >
                                <Bell size={18} />
                                {unreadCount > 0 && (
                                    <span className="ad-notif-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
                                )}
                            </button>

                            {showNotifications && (
                                <div className="ad-notif-dropdown">
                                    <div className="ad-notif-header">
                                        <span className="ad-notif-title">
                                            Notifications
                                            {unreadCount > 0 && <span className="ad-notif-count">{unreadCount} new</span>}
                                        </span>
                                        {unreadCount > 0 && (
                                            <button className="ad-notif-mark-all" onClick={markAllSeen}>
                                                Mark all read
                                            </button>
                                        )}
                                    </div>

                                    <div className="ad-notif-list">
                                        {notifications.length === 0 ? (
                                            <div className="ad-notif-empty">
                                                <Bell size={28} />
                                                <p>All caught up!</p>
                                                <span>No pending bookings or new enquiries.</span>
                                            </div>
                                        ) : (
                                            notifications.map(notif => {
                                                const isUnread = !seenIds.has(notif.id);
                                                return (
                                                    <button
                                                        key={notif.id}
                                                        className={`ad-notif-item${isUnread ? ' unread' : ''}`}
                                                        onClick={() => handleNotifClick(notif)}
                                                    >
                                                        <div className={`ad-notif-icon-wrap ${notif.type}`}>
                                                            {notif.type === 'booking'
                                                                ? <Calendar size={15} />
                                                                : <MessageSquare size={15} />}
                                                        </div>
                                                        <div className="ad-notif-body">
                                                            <p className="ad-notif-item-title">{notif.title}</p>
                                                            <p className="ad-notif-item-sub">{notif.subtitle}</p>
                                                            {notif.time && (
                                                                <p className="ad-notif-item-time">
                                                                    {new Date(notif.time).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                                </p>
                                                            )}
                                                        </div>
                                                        {isUnread && <span className="ad-notif-dot" />}
                                                    </button>
                                                );
                                            })
                                        )}
                                    </div>

                                    {notifications.length > 0 && (
                                        <div className="ad-notif-footer">
                                            <button className="ad-notif-view-all" onClick={() => { setShowNotifications(false); setActiveTab('bookings'); setBookingFilter('pending'); }}>
                                                <Calendar size={13} /> View pending bookings
                                            </button>
                                            <button className="ad-notif-view-all" onClick={() => { setShowNotifications(false); setActiveTab('enquiries'); setEnquiryFilter('new'); }}>
                                                <MessageSquare size={13} /> View new enquiries
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <button className="ad-refresh-btn" onClick={loadData} disabled={loading}>
                            <RefreshCw size={15} className={loading ? 'spin' : ''} /><span>Refresh</span>
                        </button>
                        <div className="ad-admin-badge"><Shield size={14} /><span>Admin</span></div>
                    </div>
                </header>

                <div className="ad-page-header">
                    <h1 className="ad-page-title">{PAGE_TITLES[activeTab] || 'Dashboard'}</h1>
                    <p className="ad-page-sub">Welcome back, {user?.full_name || user?.name || 'Admin'}</p>
                </div>

                {error && (
                    <div className="ad-error-bar">
                        <XCircle size={16} /> {error}
                        <button onClick={() => setError(null)} className="ad-error-close"><X size={14} /></button>
                    </div>
                )}

                <div className="ad-content">{renderContent()}</div>
            </div>
        </div>
    );
};

export default AdminDashboard;
