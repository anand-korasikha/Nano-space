import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Building2, Plus, Eye, MessageSquare, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';
import AddPropertyModal from '../components/owner/AddPropertyModal';
import {
    submitProperty,
    getPropertiesByOwner,
    getOwnerStats,
    deleteProperty
} from '../services/propertyService';
import './Dashboard.css';

const OwnerDashboard = () => {
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [properties, setProperties] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0
    });

    // Load properties on mount and when modal closes
    useEffect(() => {
        loadProperties();
    }, [user]);

    const loadProperties = async () => {
        if (user?.id) {
            const [ownerProperties, ownerStats] = await Promise.all([
                getPropertiesByOwner(),
                getOwnerStats(),
            ]);
            setProperties(ownerProperties);
            setStats(ownerStats);
        }
    };

    const handleSubmitProperty = async (propertyData) => {
        const result = await submitProperty(propertyData);
        if (result) {
            setIsModalOpen(false);
            loadProperties(); // Reload properties
            alert('Property submitted successfully! Waiting for admin approval.');
        } else {
            alert('Error submitting property. Please try again.');
        }
    };

    const handleDeleteProperty = async (propertyId) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            const success = await deleteProperty(propertyId);
            if (success) {
                loadProperties();
                alert('Property deleted successfully.');
            } else {
                alert('Error deleting property. Please try again.');
            }
        }
    };


    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved':
                return <CheckCircle className="w-4 h-4" />;
            case 'pending':
                return <Clock className="w-4 h-4" />;
            case 'rejected':
                return <XCircle className="w-4 h-4" />;
            default:
                return null;
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'approved':
                return 'status-active';
            case 'pending':
                return 'status-pending';
            case 'rejected':
                return 'status-rejected';
            default:
                return '';
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>
                    <h1>Welcome, {user?.name}!</h1>
                    <p>Manage your property listings</p>
                </div>
                <div className="user-badge owner">
                    <Building2 className="w-5 h-5" />
                    <span>Owner</span>
                </div>
            </div>

            <div className="dashboard-grid">
                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <Building2 className="stat-icon" />
                        <div>
                            <p className="stat-value">{stats.total}</p>
                            <p className="stat-label">Total Properties</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Clock className="stat-icon" />
                        <div>
                            <p className="stat-value">{stats.pending}</p>
                            <p className="stat-label">Pending Approval</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <CheckCircle className="stat-icon" />
                        <div>
                            <p className="stat-value">{stats.approved}</p>
                            <p className="stat-label">Active Listings</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <XCircle className="stat-icon" />
                        <div>
                            <p className="stat-value">{stats.rejected}</p>
                            <p className="stat-label">Rejected</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="dashboard-section">
                    <h2>Quick Actions</h2>
                    <div className="actions-grid">
                        <button
                            className="action-btn primary"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add New Property</span>
                        </button>
                        <button className="action-btn">
                            <MessageSquare className="w-5 h-5" />
                            <span>View Inquiries</span>
                        </button>
                    </div>
                </div>

                {/* Properties List */}
                <div className="dashboard-section">
                    <h2>Your Properties</h2>
                    <div className="properties-list">
                        {properties.length > 0 ? (
                            properties.map(property => (
                                <div key={property.id} className="property-card">
                                    <div className="property-header">
                                        <div>
                                            <h3>{property.name}</h3>
                                            <p className="property-type">{property.type} • {property.city}</p>
                                        </div>
                                        <span className={`status-badge ${getStatusClass(property.status)}`}>
                                            {getStatusIcon(property.status)}
                                            <span style={{ marginLeft: '0.25rem' }}>
                                                {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                                            </span>
                                        </span>
                                    </div>

                                    <div className="property-details" style={{ marginBottom: '1rem' }}>
                                        <p><strong>Location:</strong> {property.address || property.area} — {property.city}</p>
                                        <p><strong>Type:</strong> {property.type}</p>
                                        <p><strong>Price:</strong> ₹{property.price_per_month
                                            ? `${property.price_per_month}/month`
                                            : property.price_per_day
                                                ? `${property.price_per_day}/day`
                                                : property.price_per_seat
                                                    ? `${property.price_per_seat}/seat`
                                                    : '—'}
                                        </p>
                                        {property.contact_name && (
                                            <p><strong>Contact:</strong> {property.contact_name} · {property.contact_phone}</p>
                                        )}
                                        {property.status === 'rejected' && property.rejection_reason && (
                                            <p style={{ color: '#f5576c', marginTop: '0.5rem' }}>
                                                <strong>Rejection Reason:</strong> {property.rejection_reason}
                                            </p>
                                        )}
                                    </div>


                                    {property.status === 'approved' && (
                                        <div className="property-stats">
                                            <div className="property-stat">
                                                <Eye className="w-4 h-4" />
                                                <span>0 views</span>
                                            </div>
                                            <div className="property-stat">
                                                <MessageSquare className="w-4 h-4" />
                                                <span>0 inquiries</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="property-actions">
                                        {property.status === 'pending' && (
                                            <button
                                                className="btn-secondary"
                                                onClick={() => handleDeleteProperty(property.id)}
                                            >
                                                Delete
                                            </button>
                                        )}
                                        <button className="btn-secondary">View Details</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="empty-state">No properties listed yet. Add your first property!</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Property Modal */}
            <AddPropertyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitProperty}
            />
        </div>
    );
};

export default OwnerDashboard;
