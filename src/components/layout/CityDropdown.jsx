import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CityDropdown.css';

// City icon mapping - same as CityGrid
const cityIconMap = {
    'Bangalore': '/svg/Bangalore (1).svg',
    'Mumbai': '/svg/Mumbai.svg',
    'Delhi': '/svg/Delhi 1.svg',
    'Hyderabad': '/svg/hyderabad.svg',
    'Chennai': '/svg/Chennai.svg',
    'Pune': '/svg/Pune.svg',
    'Kolkata': '/svg/kolkata.svg',
    'Ahmedabad': '/svg/ahmadabad.svg',
    'Jaipur': '/svg/jaipur.svg',
    'Lucknow': '/svg/lucknow.svg',
    'Indore': '/svg/indore.svg',
    'Noida': '/svg/noida.svg',
    'Gurugram': '/svg/Gurugram.svg',
};

const cities = [
    'Gurugram', 'Hyderabad', 'Bangalore', 'Mumbai',
    'Chennai', 'Lucknow', 'Pune', 'Noida',
    'Delhi', 'Indore', 'Ahmedabad'
];

const CityDropdown = ({ isOpen, onClose, servicePath = 'coworking', onCityClick, onMouseEnter, onMouseLeave }) => {
    if (!isOpen) return null;

    const getCityIconPath = (city) => {
        return cityIconMap[city] || '/svg/default-city.svg';
    };

    return (
        /* Dropdown content - NO OVERLAY */
        <div
            className="city-dropdown-menu"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="city-dropdown-grid">
                {cities.map((city) => (
                    <Link
                        key={city}
                        to={`/${servicePath}/${city.toLowerCase()}`}
                        className="city-dropdown-item"
                        onClick={() => {
                            onClose();
                            if (onCityClick) onCityClick();
                        }}
                    >
                        <img
                            src={getCityIconPath(city)}
                            alt={`${city} icon`}
                            className="city-dropdown-icon"
                        />
                        <span className="city-dropdown-name">{city}</span>
                    </Link>
                ))}
            </div>

            {/* View All Link */}
            <Link
                to={`/${servicePath}`}
                className="view-all-link"
                onClick={() => {
                    onClose();
                    if (onCityClick) onCityClick();
                }}
            >
                View All
            </Link>
        </div>
    );
};

export default CityDropdown;
