import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, MapPin, IndianRupee, Building2, Filter, ChevronDown, Star, Heart, Phone, MoreHorizontal, ExternalLink, CheckCircle2, Mail } from 'lucide-react';
import MapPreview from '../components/common/MapPreview';
import './Rent.css';

import topSpacesData from '../data/topSpaces.json';
import cityColivingData from '../data/cityColiving.json';
import cityOfficeSpacesData from '../data/cityOfficeSpaces.json';
import cityVirtualOfficeData from '../data/cityVirtualOffice.json';
import cityCoworkingData from '../data/cityCoworking.json';
import eventSpacesData from '../data/eventSpacesData.json';
import hotelsData from '../data/hotelsData.json';
import partyHallsData from '../data/partyHallsData.json';
import privateTheatresData from '../data/privateTheatresData.json';

const Rent = () => {
    // Helper to extract spaces from grouping-by-city format
    const extractSpaces = (data, defaultType, prefix) => {
        return Object.values(data).flatMap(cityData =>
            (cityData.spaces || []).map(space => ({
                ...space,
                id: space.id ? `${prefix}-${space.id}` : `${prefix}-${Math.random()}`,
                city: cityData.cityName,
                type: space.type || defaultType,
                // Unified numeric price for filtering
                numericPrice: parseInt(space.price?.toString().replace(/[^0-9]/g, '')) || 0
            }))
        );
    };

    // Construct master properties list
    // Construct master properties list
    const staticSpaces = [
        ...extractSpaces(topSpacesData, 'Coworking Space', 'top'),
        ...extractSpaces(cityColivingData, 'Coliving Space', 'colive'),
        ...extractSpaces(cityOfficeSpacesData, 'Office Space', 'office'),
        ...extractSpaces(cityVirtualOfficeData, 'Virtual Office', 'virtual'),
        ...extractSpaces(cityCoworkingData, 'Coworking Space', 'cowork'),
        ...extractSpaces(eventSpacesData, 'Event Space', 'event'),
        ...extractSpaces(hotelsData, 'Hotel Room', 'hotel'),
        ...extractSpaces(partyHallsData, 'Party Hall', 'party'),
        ...extractSpaces(privateTheatresData, 'Private Theatre', 'theatre')
    ];

    const [backendSpaces, setBackendSpaces] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBackendProperties = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/properties/?status=approved&rent=true`);
                if (response.ok) {
                    const data = await response.json();
                    const formatted = (data.properties || []).map(p => ({
                        id: `backend-${p.id}`,
                        name: p.name,
                        location: p.address || p.location || p.city,
                        city: p.city,
                        type: p.type,
                        price: p.price_per_month ? `₹${p.price_per_month}` : p.price_per_day ? `₹${p.price_per_day}` : p.price_per_seat ? `₹${p.price_per_seat}` : 'Contact for Price',
                        period: p.price_per_month ? 'month' : p.price_per_day ? 'day' : 'seat',
                        rating: 4.8,
                        reviewsCount: 0,
                        image: p.images?.[0] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
                        numericPrice: p.price_per_month || p.price_per_day || p.price_per_seat || 0,
                        latitude: p.latitude,
                        longitude: p.longitude,
                        amenities: p.amenities || [],
                        is_featured: p.is_featured,
                        show_on_homepage: p.show_on_homepage
                    }));
                    setBackendSpaces(formatted);
                }
            } catch (err) {
                console.error('Error fetching backend properties:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBackendProperties();
    }, []);

    const allSpaces = [...backendSpaces, ...staticSpaces];

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedType, setSelectedType] = useState('Flat');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [showFlatDropdown, setShowFlatDropdown] = useState(false);
    const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
    const [activeBudgetField, setActiveBudgetField] = useState('min');

    const widgetRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (widgetRef.current && !widgetRef.current.contains(event.target)) {
                setShowFlatDropdown(false);
                setShowBudgetDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredProperties = allSpaces.filter(property => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = property.name.toLowerCase().includes(query) ||
            property.location.toLowerCase().includes(query) ||
            property.city.toLowerCase().includes(query);

        const cityNameMatch = !selectedCity || property.city.toLowerCase() === selectedCity.toLowerCase();

        // Handling the type filter from the new dropdown (selectedType)
        const matchesType = !selectedType ||
            selectedType === 'Flat' ||
            property.type.toLowerCase().includes(selectedType.toLowerCase()) ||
            (selectedType === 'Residential' && property.type.toLowerCase().includes('coliving')) ||
            (selectedType === 'Commercial' && (property.type.toLowerCase().includes('office') || property.type.toLowerCase().includes('coworking')));

        const parsePrice = (priceStr) => {
            if (!priceStr) return null;
            if (typeof priceStr === 'number') return priceStr;
            let val = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
            if (priceStr.includes('Lac')) val *= 100000;
            if (priceStr.includes('Cr')) val *= 10000000;
            return val;
        };

        const min = parsePrice(priceRange.min);
        const max = parsePrice(priceRange.max);

        const matchesPrice = (!min || property.numericPrice >= min) &&
            (!max || property.numericPrice <= max);

        return matchesSearch && cityNameMatch && matchesType && matchesPrice;
    });


    return (
        <>
            {/* Hero Section with Floating Search Widget */}
            <div className="rent-hero-container">
                <div className="rent-hero-banner">
                    <img
                        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&h=400&fit=crop"
                        alt="Rent Property Hero"
                    />
                    <div className="hero-overlay"></div>
                </div>

                <div className="new-floating-search-widget" ref={widgetRef}>
                    <div className="new-widget-tabs">
                        {['Buy', 'Rent', 'Sell'].map((tab) => (
                            <button
                                key={tab}
                                className={tab === 'Rent' ? 'active' : ''}
                                onClick={() => {
                                    if (tab === 'Sell') window.location.href = '/sell';
                                    if (tab === 'Buy') window.location.href = '/buy';
                                    if (tab === 'Rent') window.location.href = '/rent';
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                        <button className="post-ad-btn">Post Free Property Ad</button>
                    </div>

                    <div className="new-search-main-row">
                        <div className="search-field location-field">
                            <MapPin size={20} className="field-icon blue-icon" />
                            <input
                                type="text"
                                placeholder="Enter City, Locality, Project"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="field-divider"></div>

                        <div className="search-field dropdown-field" onClick={() => {
                            setShowFlatDropdown(!showFlatDropdown);
                            setShowBudgetDropdown(false);
                        }}>
                            <Home size={20} className="field-icon blue-icon" />
                            <div className="field-content">
                                <span className="field-text">{selectedType || 'Flat'}</span>
                                <ChevronDown size={18} className={showFlatDropdown ? 'rotated' : ''} />
                            </div>

                            {showFlatDropdown && (
                                <div className="dropdown-panel flat-panel" onClick={(e) => e.stopPropagation()}>
                                    <div className="category-section">
                                        <div className="category-header">
                                            <span>Residential</span>
                                            <ChevronDown size={16} />
                                        </div>
                                        <div className="pill-group">
                                            {['Flat', 'House/Villa', 'Plot'].map(type => (
                                                <button
                                                    key={type}
                                                    className={`pill ${selectedType === type ? 'active' : ''}`}
                                                    onClick={() => {
                                                        setSelectedType(type);
                                                        setShowFlatDropdown(false);
                                                    }}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="pill-group bhk-group">
                                            {['1 Bhk', '2 Bhk', '3 Bhk', '4 Bhk', '5 Bhk', '5+ Bhk'].map(bhk => (
                                                <button key={bhk} className="pill">{bhk}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="category-section">
                                        <div className="category-header">
                                            <span>Commercial</span>
                                            <ChevronDown size={16} />
                                        </div>
                                    </div>
                                    <div className="category-section">
                                        <div className="category-header">
                                            <span>Other Property Types</span>
                                            <ChevronDown size={16} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="field-divider"></div>

                        <div className="search-field dropdown-field" onClick={() => {
                            setShowBudgetDropdown(!showBudgetDropdown);
                            setShowFlatDropdown(false);
                        }}>
                            <IndianRupee size={20} className="field-icon blue-icon" />
                            <div className="field-content">
                                <span className="field-text">
                                    {priceRange.min || priceRange.max
                                        ? `${priceRange.min ? '₹' + priceRange.min : 'Min'} - ${priceRange.max ? '₹' + priceRange.max : 'Max'}`
                                        : 'Budget'}
                                </span>
                                <ChevronDown size={18} className={showBudgetDropdown ? 'rotated' : ''} />
                            </div>

                            {showBudgetDropdown && (
                                <div className="dropdown-panel budget-panel" onClick={(e) => e.stopPropagation()}>
                                    <div className="budget-inputs">
                                        <div
                                            className={`budget-input-box ${activeBudgetField === 'min' ? 'active' : ''}`}
                                            onClick={() => setActiveBudgetField('min')}
                                        >
                                            <input
                                                type="text"
                                                placeholder="Min Price"
                                                value={priceRange.min}
                                                readOnly
                                            />
                                        </div>
                                        <div
                                            className={`budget-input-box ${activeBudgetField === 'max' ? 'active' : ''}`}
                                            onClick={() => setActiveBudgetField('max')}
                                        >
                                            <input
                                                type="text"
                                                placeholder="Max Price"
                                                value={priceRange.max}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="price-list">
                                        <div
                                            className="price-item"
                                            onClick={() => {
                                                setPriceRange({ ...priceRange, [activeBudgetField]: '' });
                                            }}
                                        >
                                            {activeBudgetField === 'min' ? 'Min' : 'Max'}
                                        </div>
                                        {['5 Lac', '10 Lac', '20 Lac', '30 Lac', '40 Lac', '50 Lac', '60 Lac', '80 Lac', '1 Cr', '2 Cr', '5 Cr'].map(price => (
                                            <div
                                                key={price}
                                                className={`price-item ${priceRange[activeBudgetField] === price ? 'active' : ''}`}
                                                onClick={() => {
                                                    setPriceRange({ ...priceRange, [activeBudgetField]: price });
                                                    if (activeBudgetField === 'min') setActiveBudgetField('max');
                                                }}
                                            >
                                                ₹{price}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="new-main-search-btn" onClick={() => {
                            setShowFlatDropdown(false);
                            setShowBudgetDropdown(false);
                        }}>
                            <Search size={22} strokeWidth={2.5} />
                            <span>Search</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Breadcrumb Section */}
            <div className="breadcrumb-container">
                <nav className="breadcrumb">
                    <Link to="/" className="breadcrumb-link">
                        <Home size={16} />
                        <span>Home</span>
                    </Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">Rent</span>
                </nav>
            </div>

            <div className="rent-page">
                <div className="rent-container">

                    {/* Results Header */}
                    <div className="results-header">
                        <h2>{filteredProperties.length} Rentals Found</h2>
                        <p>Showing the best matches for your search</p>
                    </div>

                    {/* Properties List (Horizontal Cards) */}
                    <div className="properties-list">
                        {filteredProperties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>

                    {filteredProperties.length === 0 && (
                        <div className="no-results">
                            <Building2 size={64} />
                            <h3>No properties found</h3>
                            <p>Try adjusting your filters or search area</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

const PropertyCard = ({ property }) => {
    return (
        <div className="new-horizontal-card">
            {/* Left: Image Section */}
            <div className="card-media">
                <img src={property.image} alt={property.name} className="main-image" />
                <div className="media-overlay">
                    <div className="badge-row">
                        <span className="badge featured">FEATURED</span>
                        {/* Randomly show SEEN for demo variety */}
                        {Math.random() > 0.5 && <span className="badge seen">SEEN</span>}
                    </div>
                    <button className="like-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                        <Heart size={20} />
                    </button>
                </div>
                <div className="social-proof">
                    <Star size={12} fill="#FFD700" color="#FFD700" />
                    <span>{Math.floor(Math.random() * 10) + 2} people recently viewed</span>
                </div>
            </div>

            {/* Right: Content Section */}
            <div className="card-info">
                <div className="card-main">
                    <div className="top-row">
                        <h3 className="property-title">{property.name}</h3>
                        <MoreHorizontal size={20} className="more-icon" />
                    </div>

                    <div className="subtitle-row">
                        <span className="property-desc">
                            {property.type} in {property.location}, {property.city}
                        </span>
                        <div className="rera-badge">
                            <CheckCircle2 size={12} />
                            <span>RERA</span>
                        </div>
                    </div>

                    <div className="stats-row">
                        <div className="stat-box">
                            <div className="stat-primary">{property.price}{property.period ? `/${property.period}` : ''}</div>
                            <div className="stat-secondary">₹{Math.floor(Math.random() * 1000) + 500} Maintenance</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-box">
                            <div className="stat-primary">
                                {property.area ? `${property.area} sqft` : '1,200 - 2,500 sqft'}
                            </div>
                            <div className="stat-secondary">Super Built-up Area</div>
                        </div>
                    </div>

                    <p className="property-snippet">
                        {property.description || `This ${property.type} offers modern amenities and excellent connectivity in ${property.city}. Perfect for those looking for a premium rental lifestyle.`}
                    </p>
                </div>

                <div className="card-footer">
                    <div className="footer-left">
                        <div className="timestamp-row">Listing Age • {Math.floor(Math.random() * 5) + 1}mo ago</div>
                        <div className="vendor-name">NANOSPACE RENTALS</div>
                    </div>
                    <div className="footer-right">
                        <button className="action-btn buzzed-call">
                            <Phone size={18} className="ringing-icon" />
                            <span>Call Us</span>
                        </button>
                        <button className="action-btn outline">View Number</button>
                        <button className="action-btn primary">
                            <Mail size={18} />
                            <span>Enquire</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Rent;
