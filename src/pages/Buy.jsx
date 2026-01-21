import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, MapPin, IndianRupee, Building2, Filter, ChevronDown, Star } from 'lucide-react';
import MapPreview from '../components/common/MapPreview';
import './Buy.css';

const Buy = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [showFilters, setShowFilters] = useState(false);

    const cities = ['Hyderabad', 'Bangalore', 'Chennai', 'Mumbai', 'Delhi', 'Pune'];

    const propertyTypes = [
        'All Properties',
        'Coworking Space',
        'Coliving Space',
        'Virtual Office',
        'Hotel Room',
        'Event Space',
        'Commercial Property',
        'Residential Property'
    ];

    // Sample properties data
    const properties = [
        {
            id: 1,
            name: 'Premium Coworking Space',
            type: 'Coworking Space',
            location: 'Banjara Hills',
            city: 'Hyderabad',
            price: 750000,
            area: 2500,
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
            rating: 4.5,
            amenities: ['WiFi', 'Parking', 'AC', 'Cafeteria']
        },
        {
            id: 2,
            name: 'Modern Coliving Space',
            type: 'Coliving Space',
            location: 'Koramangala',
            city: 'Bangalore',
            price: 850000,
            area: 3000,
            image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop',
            rating: 4.8,
            amenities: ['WiFi', 'Gym', 'Security', 'Power Backup']
        },
        {
            id: 3,
            name: 'Luxury Event Space',
            type: 'Event Space',
            location: 'Anna Nagar',
            city: 'Chennai',
            price: 1200000,
            area: 5000,
            image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c6b0?w=400&h=300&fit=crop',
            rating: 4.7,
            amenities: ['Parking', 'AC', 'Catering', 'Sound System']
        },
        {
            id: 4,
            name: 'Virtual Office Hub',
            type: 'Virtual Office',
            location: 'Gachibowli',
            city: 'Hyderabad',
            price: 450000,
            area: 1500,
            image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop',
            rating: 4.3,
            amenities: ['WiFi', 'Meeting Rooms', 'Reception']
        },
        {
            id: 5,
            name: 'Boutique Hotel Rooms',
            type: 'Hotel Room',
            location: 'MG Road',
            city: 'Bangalore',
            price: 950000,
            area: 2000,
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
            rating: 4.6,
            amenities: ['WiFi', 'Parking', 'Restaurant', 'Gym']
        },
        {
            id: 6,
            name: 'Commercial Complex',
            type: 'Commercial Property',
            location: 'Jubilee Hills',
            city: 'Hyderabad',
            price: 2500000,
            area: 8000,
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
            rating: 4.9,
            amenities: ['Parking', 'Elevator', 'Security', 'CCTV']
        }
    ];

    const filteredProperties = properties.filter(property => {
        const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCity = !selectedCity || property.city === selectedCity;
        const matchesType = !selectedType || selectedType === 'All Properties' || property.type === selectedType;
        const matchesPrice = (!priceRange.min || property.price >= parseInt(priceRange.min)) &&
            (!priceRange.max || property.price <= parseInt(priceRange.max));

        return matchesSearch && matchesCity && matchesType && matchesPrice;
    });

    return (
        <>
            {/* Hero Section */}
            <div className="buy-hero-section">
                <div className="buy-hero-overlay"></div>
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=400&fit=crop"
                    alt="Buy Property"
                    className="buy-hero-image"
                />
                <div className="buy-hero-content">
                    <h1>Find Your Perfect Property</h1>
                    <p>Discover the best commercial and residential spaces</p>
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
                    <span className="breadcrumb-current">Buy</span>
                </nav>
            </div>

            <div className="buy-page">
                <div className="buy-container">
                    {/* Search and Filter Section */}
                    <div className="search-section">
                        <div className="search-bar-container">
                            <div className="search-bar">
                                <Search size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by property name or location..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button
                                className="filter-toggle-btn"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter size={20} />
                                Filters
                                <ChevronDown size={16} className={showFilters ? 'rotated' : ''} />
                            </button>
                        </div>

                        {/* Filters */}
                        {showFilters && (
                            <div className="filters-container">
                                <div className="filter-group">
                                    <label>City</label>
                                    <select
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                    >
                                        <option value="">All Cities</option>
                                        {cities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Property Type</label>
                                    <select
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                    >
                                        {propertyTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Min Price (₹)</label>
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                    />
                                </div>

                                <div className="filter-group">
                                    <label>Max Price (₹)</label>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                    />
                                </div>

                                <button
                                    className="clear-filters-btn"
                                    onClick={() => {
                                        setSelectedCity('');
                                        setSelectedType('');
                                        setPriceRange({ min: '', max: '' });
                                    }}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Results Header */}
                    <div className="results-header">
                        <h2>{filteredProperties.length} Properties Found</h2>
                        <p>Showing the best matches for your search</p>
                    </div>

                    {/* Properties Grid */}
                    <div className="properties-grid">
                        {filteredProperties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>

                    {filteredProperties.length === 0 && (
                        <div className="no-results">
                            <Building2 size={64} />
                            <h3>No properties found</h3>
                            <p>Try adjusting your filters or search criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

const PropertyCard = ({ property }) => {
    return (
        <div className="property-card">
            <div className="property-image-container">
                <img src={property.image} alt={property.name} className="property-image" />
                <div className="property-type-badge">{property.type}</div>
            </div>

            <div className="property-content">
                <h3 className="property-name">{property.name}</h3>

                <div className="property-location">
                    <MapPin size={16} />
                    <span>{property.location}, {property.city}</span>
                </div>

                <div className="property-rating">
                    <Star size={14} fill="#FFB800" color="#FFB800" />
                    <span>{property.rating}</span>
                </div>

                <div className="property-details">
                    <div className="detail-item">
                        <Building2 size={16} />
                        <span>{property.area} sq.ft</span>
                    </div>
                </div>

                <div className="property-amenities">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="amenity-tag">{amenity}</span>
                    ))}
                    {property.amenities.length > 3 && (
                        <span className="amenity-tag">+{property.amenities.length - 3}</span>
                    )}
                </div>

                {/* Map Preview - Add sample coordinates for demo */}
                <MapPreview
                    latitude={property.latitude || 17.385044}
                    longitude={property.longitude || 78.486671}
                    address={`${property.location}, ${property.city}`}
                    propertyName={property.name}
                />

                <div className="property-footer">
                    <div className="property-price">
                        <IndianRupee size={18} />
                        <span>{(property.price / 100000).toFixed(1)}L</span>
                    </div>
                    <button className="view-details-btn">View Details</button>
                </div>
            </div>
        </div>
    );
};

export default Buy;
