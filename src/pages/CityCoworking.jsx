import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cityCoworkingData from '../data/cityCoworking.json';
import { getApprovedPropertiesByType } from '../services/propertyService';
import OfficeSolutions from '../components/coworking/OfficeSolutions';
import PopularCoworkingSpaces from '../components/coworking/PopularCoworkingSpaces';
import DiscoverWorkspace from '../components/coworking/DiscoverWorkspace';
import FeaturedSpaces from '../components/coworking/FeaturedSpaces';
import CustomizedSolutions from '../components/coworking/CustomizedSolutions';
import PremiumSpaces from '../components/coworking/PremiumSpaces';
import TopLocations from '../components/coworking/TopLocations';
import FAQ from '../components/common/FAQ';
import EnquiryModal from '../components/coworking/EnquiryModal';
import './CityCoworking.css';
import { MapPin, Star } from 'lucide-react';

const CityCoworking = () => {
    const { cityName } = useParams();
    const navigate = useNavigate();
    const [cityData, setCityData] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState('Popular Locations');
    const [selectedPrice, setSelectedPrice] = useState('Select Price');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSpace, setSelectedSpace] = useState(null);

    useEffect(() => {
        // Get city data from JSON
        const normalizedCityName = cityName?.toLowerCase();
        const data = cityCoworkingData[normalizedCityName];

        if (data) {
            // Get approved properties from localStorage
            const approvedProperties = getApprovedPropertiesByType('Coworking', normalizedCityName);

            // Merge approved properties with existing spaces
            const mergedSpaces = [
                ...data.spaces,
                ...approvedProperties.map(prop => ({
                    id: prop.id,
                    name: prop.name,
                    location: prop.location,
                    image: prop.image,
                    rating: prop.rating || 0,
                    price: prop.price,
                    period: prop.period,
                    badge: prop.badge,
                    amenities: prop.amenities
                }))
            ];

            setCityData({
                ...data,
                spaces: mergedSpaces
            });
        } else {
            // Redirect to main coworking page if city not found
            navigate('/coworking');
        }
    }, [cityName, navigate]);

    const handleGetQuoteClick = (space) => {
        setSelectedSpace(space);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSpace(null);
    };

    if (!cityData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="city-coworking-page">
            {/* Hero Section */}
            <section
                className="city-coworking-hero"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${cityData.heroImage})`
                }}
            >
                <div className="city-coworking-hero-content">
                    <h1 className="city-coworking-title">
                        Coworking Space In {cityData.cityName}
                    </h1>

                    {/* Location Tabs */}
                    <div className="location-tabs">
                        {cityData.popularLocations.slice(0, 12).map((location, index) => (
                            <button
                                key={index}
                                className="location-tab"
                            >
                                {location}
                            </button>
                        ))}
                    </div>

                    {/* Filter Dropdowns */}
                    <div className="filter-dropdowns">
                        <div className="dropdown-wrapper">
                            <select
                                className="filter-dropdown"
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                            >
                                <option>Popular Locations</option>
                                {cityData.popularLocations.map((location, index) => (
                                    <option key={index} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>

                        <div className="dropdown-wrapper">
                            <select
                                className="filter-dropdown"
                                value={selectedPrice}
                                onChange={(e) => setSelectedPrice(e.target.value)}
                            >
                                <option>Select Price</option>
                                <option value="0-10000">₹0 - ₹10,000</option>
                                <option value="10000-15000">₹10,000 - ₹15,000</option>
                                <option value="15000-20000">₹15,000 - ₹20,000</option>
                                <option value="20000+">₹20,000+</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Coworking Spaces Grid */}
            <section className="coworking-spaces-section">
                <div className="coworking-spaces-container">
                    <div className="coworking-spaces-grid">
                        {cityData.spaces.map((space) => (
                            <div key={space.id} className="coworking-space-card">
                                {/* Badge */}
                                {space.badge && (
                                    <div className={`space-badge ${space.badge.toLowerCase()}`}>
                                        {space.badge}
                                    </div>
                                )}

                                {/* Image */}
                                <div className="space-image-wrapper">
                                    <img
                                        src={space.image}
                                        alt={space.name}
                                        className="space-image"
                                    />
                                </div>

                                {/* Content */}
                                <div className="space-content">
                                    <div className="space-header">
                                        <h3 className="space-name">{space.name}</h3>
                                        <div className="space-rating">
                                            <Star size={16} fill="#FFD700" color="#FFD700" />
                                            <span>{space.rating}</span>
                                        </div>
                                    </div>

                                    <div className="space-location">
                                        <MapPin size={14} />
                                        <span>{space.location}</span>
                                    </div>

                                    <div className="space-footer">
                                        <div className="space-price">
                                            <span className="price-amount">{space.price}</span>
                                            <span className="price-period">/ {space.period}</span>
                                        </div>
                                        <button
                                            className="get-quote-btn"
                                            onClick={() => handleGetQuoteClick(space)}
                                        >
                                            Get Quote
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Office Solutions Section */}
            <OfficeSolutions cityName={cityData.cityName} />

            {/* Popular Coworking Spaces Section */}
            <PopularCoworkingSpaces
                spaces={cityData.spaces}
                cityName={cityData.cityName}
                onGetQuoteClick={handleGetQuoteClick}
            />

            {/* Discover Workspace Section */}
            <DiscoverWorkspace cityName={cityData.cityName} />

            {/* Featured Spaces Section */}
            <FeaturedSpaces
                spaces={cityData.spaces}
                cityName={cityData.cityName}
                onGetQuoteClick={handleGetQuoteClick}
            />

            <CustomizedSolutions
                cityName={cityData.cityName}
                onEnquireClick={() => setIsModalOpen(true)}
            />

            {/* Premium Spaces Section */}
            <PremiumSpaces
                spaces={cityData.spaces}
                cityName={cityData.cityName}
                onGetQuoteClick={handleGetQuoteClick}
            />

            {/* Top Locations Section */}
            <TopLocations cityName={cityData.cityName} />

            {/* FAQ Section */}
            <FAQ category="coworking" />

            {/* Enquiry Modal */}
            <EnquiryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                officeType="Coworking Space"
                officeImage={selectedSpace?.image}
            />
        </div>
    );
};

export default CityCoworking;
