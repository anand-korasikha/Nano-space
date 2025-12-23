import React from 'react';
import { Link } from 'react-router-dom';
import topLocationsData from '../../data/topLocations.json';
import './TopLocations.css';

const TopLocations = ({ cityName }) => {
    // Get locations for the current city
    const normalizedCityName = cityName?.toLowerCase();
    const cityLocations = topLocationsData[normalizedCityName];

    // If no locations found for this city, don't render the section
    if (!cityLocations || !cityLocations.locations || cityLocations.locations.length === 0) {
        return null;
    }

    return (
        <section className="top-locations-section">
            <div className="top-locations-container">
                {/* Section Header */}
                <div className="top-locations-header">
                    <h2 className="top-locations-title">
                        Explore Top Coworking Locations in {cityName}
                    </h2>
                </div>

                {/* Locations Grid */}
                <div className="top-locations-grid">
                    {cityLocations.locations.map((location) => (
                        <Link
                            key={location.id}
                            to={location.link}
                            className="top-location-card"
                        >
                            {/* Image */}
                            <div className="top-location-image-wrapper">
                                <img
                                    src={location.image}
                                    alt={location.title}
                                    className="top-location-image"
                                />
                                <div className="top-location-overlay"></div>
                            </div>

                            {/* Content */}
                            <div className="top-location-content">
                                <h3 className="top-location-title">{location.title}</h3>
                                <button className="top-location-btn">
                                    Explore Spaces
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopLocations;
