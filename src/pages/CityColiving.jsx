import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cityColivingData from '../data/cityColiving.json';
import { getApprovedPropertiesByType } from '../services/propertyService';
import ColivingEnquiryModal from '../components/coliving/ColivingEnquiryModal';
// import ColivingPromo from '../components/coliving/ColivingPromo';
import ColivingPromoBanner from '../components/coliving/ColivingPromoBanner';
import FeaturedColivingProperties from '../components/coliving/FeaturedColivingProperties';
import WhatsAppCTABanner from '../components/coliving/WhatsAppCTABanner';
import ColivingPropertyGrid from '../components/coliving/ColivingPropertyGrid';
import CoworkingFAQ from '../components/coworking/CoworkingFAQ';
import CoworkingFooterBanner from '../components/coworking/CoworkingFooterBanner';
import { MapPin, Star, Wifi, Coffee, Home, Utensils } from 'lucide-react';
import './CityCoworking.css'; // Reusing existing styles for now

const CityColiving = () => {
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
        const data = cityColivingData[normalizedCityName];

        if (data) {
            // Get approved properties from localStorage
            const approvedProperties = getApprovedPropertiesByType('Coliving', normalizedCityName);

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
                    amenities: prop.amenities,
                    occupancy: 'Single/Double' // Default occupancy for approved properties
                }))
            ];

            setCityData({
                ...data,
                spaces: mergedSpaces
            });
        } else {
            // Redirect to main coliving page if city not found
            navigate('/coliving');
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

    // Filter logic
    const filteredSpaces = cityData.spaces.filter(space => {
        const matchLocation = selectedLocation === 'Popular Locations' || space.location.includes(selectedLocation);
        let matchPrice = true;

        if (selectedPrice !== 'Select Price') {
            const price = parseInt(space.price.replace(/[^0-9]/g, ''));
            const [min, max] = selectedPrice.split('-').map(p => p === '20000+' ? 20000 : parseInt(p));

            if (selectedPrice === '20000+') {
                matchPrice = price >= 20000;
            } else {
                matchPrice = price >= min && price <= max;
            }
        }

        return matchLocation && matchPrice;
    });

    return (
        <div className="city-coworking-page">
            {/* Hero Section */}
            <section
                className="city-coworking-hero"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/${cityData.heroImage})`
                }}
            >
                <div className="city-coworking-hero-content">
                    <h1 className="city-coworking-title">
                        Coliving Space In {cityData.cityName}
                    </h1>

                    {/* Location Tabs */}
                    <div className="location-tabs">
                        {cityData.popularLocations.slice(0, 12).map((location, index) => (
                            <button
                                key={index}
                                className="location-tab"
                                onClick={() => setSelectedLocation(location)}
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

            {/* Coliving Spaces Grid */}
            <section className="coworking-spaces-section">
                <div className="coworking-spaces-container">
                    <div className="coworking-spaces-grid">
                        {filteredSpaces.length > 0 ? (
                            filteredSpaces.map((space) => (
                                <div key={space.id} className="coworking-space-card">
                                    {/* Badge */}
                                    {space.badge && (
                                        <div className={`space-badge ${space.badge.toLowerCase().replace(' ', '-')}`}>
                                            {space.badge}
                                        </div>
                                    )}

                                    {/* Image */}
                                    <div className="space-image-wrapper">
                                        <img
                                            src={`/${space.image}`} // Ensure root path
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

                                        {/* Occupancy */}
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2 mb-2">
                                            <Home size={14} />
                                            <span>{space.occupancy} Occupancy</span>
                                        </div>

                                        {/* Amenities Preview */}
                                        <div className="flex gap-2 mb-3">
                                            {space.amenities.includes('WiFi') && <Wifi size={14} className="text-gray-400" />}
                                            {space.amenities.includes('Meals') && <Utensils size={14} className="text-gray-400" />}
                                            {space.amenities.includes('Housekeeping') && <Home size={14} className="text-gray-400" />}
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
                            ))
                        ) : (
                            <div className="text-center col-span-full py-10">
                                <h3 className="text-xl font-medium text-gray-600">No spaces found matching your criteria.</h3>
                                <p className="text-gray-500">Try adjusting your filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>



            {/* Promotional Banner */}
            {cityData.promoBanner && (
                <ColivingPromoBanner content={cityData.promoBanner} />
            )}

            {/* Featured Coliving Properties */}
            <FeaturedColivingProperties
                spaces={cityData.spaces.slice(0, 8)}
                title={cityData.featuredSection?.title}
                cityName={cityData.cityName}
                onViewNumber={handleGetQuoteClick}
            />

            {/* WhatsApp CTA Banner */}
            {cityData.whatsAppCTA && (
                <WhatsAppCTABanner content={cityData.whatsAppCTA} />
            )}

            {/* All Available Properties */}
            <ColivingPropertyGrid
                spaces={cityData.spaces}
                onViewNumber={handleGetQuoteClick}
            />

            {/* FAQ Section */}
            {cityData.faqs && (
                <CoworkingFAQ
                    pageType="coliving"
                    faqs={cityData.faqs}
                    cityName={cityData.cityName}
                />
            )}

            {/* Footer Banner */}
            <CoworkingFooterBanner cityName={cityData.cityName} />

            {/* Coliving Enquiry Modal */}
            <ColivingEnquiryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                propertyName={selectedSpace?.name}
            />
        </div>
    );
};

export default CityColiving;
