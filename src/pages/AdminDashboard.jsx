import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shield, CheckCircle, XCircle, Users, TrendingUp } from 'lucide-react';
import './Dashboard.css';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('pending');

    const pendingProperties = [
        { id: 1, name: 'New Coworking Space', owner: 'John Doe', type: 'Coworking', submitted: '2025-01-10' },
        { id: 2, name: 'Boutique Coliving', owner: 'Jane Smith', type: 'Coliving', submitted: '2025-01-12' },
    ];

    const stats = {
        totalUsers: 1250,
        totalProperties: 450,
        pendingApprovals: pendingProperties.length,
        activeListings: 398
    };

    const handleApprove = (id) => {
        console.log('Approved property:', id);
        // In production, this would call API
    };

    const handleReject = (id) => {
        console.log('Rejected property:', id);
        // In production, this would call API
    };

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
                        <Users className="stat-icon" />
                        <div>
                            <p className="stat-value">{stats.totalUsers}</p>
                            <p className="stat-label">Total Users</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <TrendingUp className="stat-icon" />
                        <div>
                            <p className="stat-value">{stats.totalProperties}</p>
                            <p className="stat-label">Total Properties</p>
                        </div>
                    </div>
                    <div className="stat-card alert">
                        <Shield className="stat-icon" />
                        <div>
                            <p className="stat-value">{stats.pendingApprovals}</p>
                            <p className="stat-label">Pending Approvals</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <CheckCircle className="stat-icon" />
                        <div>
                            <p className="stat-value">{stats.activeListings}</p>
                            <p className="stat-label">Active Listings</p>
                        </div>
                    </div>
                </div>

                {/* Pending Approvals Section */}
                <div className="dashboard-section">
                    <div className="section-header">
                        <h2>Property Approvals</h2>
                        <div className="tabs">
                            <button
                                className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
                                onClick={() => setActiveTab('pending')}
                            >
                                Pending ({pendingProperties.length})
                            </button>
                            <button
                                className={`tab ${activeTab === 'approved' ? 'active' : ''}`}
                                onClick={() => setActiveTab('approved')}
                            >
                                Approved
                            </button>
                        </div>
                    </div>

                    <div className="approvals-list">
                        {activeTab === 'pending' && pendingProperties.length > 0 ? (
                            pendingProperties.map(property => (
                                <div key={property.id} className="approval-card">
                                    <div className="approval-info">
                                        <h3>{property.name}</h3>
                                        <p className="approval-meta">
                                            <span>Owner: {property.owner}</span>
                                            <span>Type: {property.type}</span>
                                            <span>Submitted: {property.submitted}</span>
                                        </p>
                                    </div>
                                    <div className="approval-actions">
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
                            ))
                        ) : (
                            <p className="empty-state">
                                {activeTab === 'pending'
                                    ? 'No pending approvals at the moment.'
                                    : 'No approved properties to display.'}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
