import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shield, CheckCircle, XCircle, Users, TrendingUp, Building2 } from 'lucide-react';
import {
    getPendingProperties,
    getApprovedProperties,
    getRejectedProperties,
    approveProperty,
    rejectProperty,
    deleteProperty,
    getAdminStats
} from '../services/propertyService';
import './Dashboard.css';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('pending');
    const [pendingProperties, setPendingProperties] = useState([]);
    const [approvedProperties, setApprovedProperties] = useState([]);
    const [rejectedProperties, setRejectedProperties] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0
    });
    const [rejectionReason, setRejectionReason] = useState({});

    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = () => {
        setPendingProperties(getPendingProperties());
        setApprovedProperties(getApprovedProperties());
        setRejectedProperties(getRejectedProperties());
        setStats(getAdminStats());
    };

    const handleApprove = (id) => {
        if (window.confirm('Are you sure you want to approve this property?')) {
            const success = approveProperty(id);
            if (success) {
                loadProperties();
                alert('Property approved successfully!');
            } else {
                alert('Error approving property. Please try again.');
            }
        }
    };

    const handleReject = (id) => {
        const reason = rejectionReason[id] || '';
        if (window.confirm('Are you sure you want to reject this property?')) {
            const success = rejectProperty(id, reason);
            if (success) {
                loadProperties();
                setRejectionReason(prev => {
                    const newState = { ...prev };
                    delete newState[id];
                    return newState;
                });
                alert('Property rejected successfully!');
            } else {
                alert('Error rejecting property. Please try again.');
            }
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to permanently delete this property? This action cannot be undone.')) {
            const success = deleteProperty(id);
            if (success) {
                loadProperties();
                alert('Property deleted successfully!');
            } else {
                alert('Error deleting property. Please try again.');
            }
        }
    };

    const handleRejectionReasonChange = (id, reason) => {
        setRejectionReason(prev => ({
            ...prev,
            [id]: reason
        }));
    };

    const renderPropertyCard = (property) => (
        <div key={property.id} className="approval-card">
            <div className="approval-info">
                <h3>{property.name}</h3>
                <p className="approval-meta">
                    <span><strong>Type:</strong> {property.type}</span>
                    <span><strong>City:</strong> {property.city}</span>
                    <span><strong>Location:</strong> {property.location}</span>
                </p>
                <p className="approval-meta">
                    <span><strong>Price:</strong> {property.price}/{property.period}</span>
                    <span><strong>Submitted:</strong> {new Date(property.submittedAt).toLocaleDateString()}</span>
                </p>
                <p style={{ marginTop: '0.5rem', color: '#666' }}>
                    <strong>Description:</strong> {property.description}
                </p>
                <p style={{ marginTop: '0.25rem', color: '#666' }}>
                    <strong>Amenities:</strong> {property.amenities.join(', ')}
                </p>
                {property.status === 'rejected' && property.rejectionReason && (
                    <p style={{ marginTop: '0.5rem', color: '#f5576c' }}>
                        <strong>Rejection Reason:</strong> {property.rejectionReason}
                    </p>
                )}
                {property.status === 'approved' && property.approvedAt && (
                    <p style={{ marginTop: '0.5rem', color: '#155724' }}>
                        <strong>Approved:</strong> {new Date(property.approvedAt).toLocaleDateString()}
                    </p>
                )}
            </div>
            {activeTab === 'pending' && (
                <div className="approval-actions-vertical">
                    <input
                        type="text"
                        placeholder="Rejection reason (optional)"
                        value={rejectionReason[property.id] || ''}
                        onChange={(e) => handleRejectionReasonChange(property.id, e.target.value)}
                        style={{
                            padding: '0.5rem',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            marginBottom: '0.5rem'
                        }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            className="btn-approve"
                            onClick={() => handleApprove(property.id)}
                        >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                        </button>
                        <button
                            className="btn-reject"
                            onClick={() => handleReject(property.id)}
                        >
                            <XCircle className="w-4 h-4" />
                            Reject
                        </button>
                    </div>
                </div>
            )}
            {(activeTab === 'approved' || activeTab === 'rejected') && (
                <div className="approval-actions-vertical">
                    <button
                        className="btn-delete"
                        onClick={() => handleDelete(property.id)}
                    >
                        <XCircle className="w-4 h-4" />
                        Delete Property
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>Welcome, {user?.name}</p>
                </div>
                <div className="user-badge admin">
                    <Shield className="w-5 h-5" />
                    <span>Administrator</span>
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
                    <div className="stat-card alert">
                        <Shield className="stat-icon" />
                        <div>
                            <p className="stat-value">{stats.pending}</p>
                            <p className="stat-label">Pending Approvals</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <CheckCircle className="stat-icon" />
                        <div>
                            <p className="stat-value">{stats.approved}</p>
                            <p className="stat-label">Approved Properties</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <XCircle className="stat-icon" />
                        <div>
                            <p className="stat-value">{stats.rejected}</p>
                            <p className="stat-label">Rejected Properties</p>
                        </div>
                    </div>
                </div>

                {/* Pending Approvals Section */}
                <div className="dashboard-section">
                    <div className="section-header">
                        <h2>Property Management</h2>
                        <div className="tabs">
                            <button
                                className={`tab ${activeTab === 'pending' ? 'active' : ''} `}
                                onClick={() => setActiveTab('pending')}
                            >
                                Pending ({pendingProperties.length})
                            </button>
                            <button
                                className={`tab ${activeTab === 'approved' ? 'active' : ''} `}
                                onClick={() => setActiveTab('approved')}
                            >
                                Approved ({approvedProperties.length})
                            </button>
                            <button
                                className={`tab ${activeTab === 'rejected' ? 'active' : ''} `}
                                onClick={() => setActiveTab('rejected')}
                            >
                                Rejected ({rejectedProperties.length})
                            </button>
                        </div>
                    </div>

                    <div className="approvals-list">
                        {activeTab === 'pending' && (
                            pendingProperties.length > 0 ? (
                                pendingProperties.map(renderPropertyCard)
                            ) : (
                                <p className="empty-state">No pending approvals at the moment.</p>
                            )
                        )}
                        {activeTab === 'approved' && (
                            approvedProperties.length > 0 ? (
                                approvedProperties.map(renderPropertyCard)
                            ) : (
                                <p className="empty-state">No approved properties to display.</p>
                            )
                        )}
                        {activeTab === 'rejected' && (
                            rejectedProperties.length > 0 ? (
                                rejectedProperties.map(renderPropertyCard)
                            ) : (
                                <p className="empty-state">No rejected properties to display.</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
