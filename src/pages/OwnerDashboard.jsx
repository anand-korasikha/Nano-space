import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Building2, Plus, Eye, MessageSquare, DollarSign } from 'lucide-react';
import './Dashboard.css';

const OwnerDashboard = () => {
    const { user } = useAuth();

    const properties = [
        { id: 1, name: 'Downtown Coworking Hub', type: 'Coworking', status: 'Active', views: 245, inquiries: 12 },
        { id: 2, name: 'Luxury Coliving Space', type: 'Coliving', status: 'Pending', views: 89, inquiries: 5 },
    ];

    const totalRevenue = '₹45,000';
    const totalProperties = properties.length;
    const activeListings = properties.filter(p => p.status === 'Active').length;

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
                            <p className="stat-value">{totalProperties}</p>
                            <p className="stat-label">Total Properties</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Eye className="stat-icon" />
                        <div>
                            <p className="stat-value">{activeListings}</p>
                            <p className="stat-label">Active Listings</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <DollarSign className="stat-icon" />
                        <div>
                            <p className="stat-value">{totalRevenue}</p>
                            <p className="stat-label">Total Revenue</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="dashboard-section">
                    <h2>Quick Actions</h2>
                    <div className="actions-grid">
                        <button className="action-btn primary">
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
                                            <p className="property-type">{property.type}</p>
                                        </div>
                                        <span className={`status-badge status-${property.status.toLowerCase()}`}>
                                            {property.status}
                                        </span>
                                    </div>
                                    <div className="property-stats">
                                        <div className="property-stat">
                                            <Eye className="w-4 h-4" />
                                            <span>{property.views} views</span>
                                        </div>
                                        <div className="property-stat">
                                            <MessageSquare className="w-4 h-4" />
                                            <span>{property.inquiries} inquiries</span>
                                        </div>
                                    </div>
                                    <div className="property-actions">
                                        <button className="btn-secondary">Edit</button>
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
        </div>
    );
};

export default OwnerDashboard;
