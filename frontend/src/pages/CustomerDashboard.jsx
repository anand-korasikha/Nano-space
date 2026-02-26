import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Heart, Clock, User, MapPin } from 'lucide-react';
import './Dashboard.css';

const CustomerDashboard = () => {
    const { user } = useAuth();

    const favorites = [
        { id: 1, name: 'Modern Coworking Space', location: 'Bangalore', type: 'Coworking', price: '₹5,000/month' },
        { id: 2, name: 'Luxury Coliving', location: 'Mumbai', type: 'Coliving', price: '₹15,000/month' },
    ];

    const bookings = [
        { id: 1, property: 'Conference Room A', date: '2025-01-15', status: 'Confirmed' },
        { id: 2, property: 'Private Theatre', date: '2025-01-20', status: 'Pending' },
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>
                    <h1>Welcome back, {user?.name}!</h1>
                    <p>Manage your bookings and favorites</p>
                </div>
                <div className="user-badge">
                    <User className="w-5 h-5" />
                    <span>Customer</span>
                </div>
            </div>

            <div className="dashboard-grid">
                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <Heart className="stat-icon" />
                        <div>
                            <p className="stat-value">{favorites.length}</p>
                            <p className="stat-label">Saved Favorites</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Clock className="stat-icon" />
                        <div>
                            <p className="stat-value">{bookings.length}</p>
                            <p className="stat-label">Active Bookings</p>
                        </div>
                    </div>
                </div>

                {/* Favorites Section */}
                <div className="dashboard-section">
                    <h2>Saved Favorites</h2>
                    <div className="items-grid">
                        {favorites.length > 0 ? (
                            favorites.map(fav => (
                                <div key={fav.id} className="item-card">
                                    <div className="item-header">
                                        <h3>{fav.name}</h3>
                                        <Heart className="w-5 h-5 text-red-500 fill-current" />
                                    </div>
                                    <div className="item-details">
                                        <p><MapPin className="w-4 h-4" /> {fav.location}</p>
                                        <p className="item-type">{fav.type}</p>
                                    </div>
                                    <p className="item-price">{fav.price}</p>
                                </div>
                            ))
                        ) : (
                            <p className="empty-state">No favorites yet. Start exploring properties!</p>
                        )}
                    </div>
                </div>

                {/* Bookings Section */}
                <div className="dashboard-section">
                    <h2>Recent Bookings</h2>
                    <div className="bookings-list">
                        {bookings.length > 0 ? (
                            bookings.map(booking => (
                                <div key={booking.id} className="booking-item">
                                    <div>
                                        <h4>{booking.property}</h4>
                                        <p className="booking-date">{booking.date}</p>
                                    </div>
                                    <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                                        {booking.status}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="empty-state">No bookings yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
