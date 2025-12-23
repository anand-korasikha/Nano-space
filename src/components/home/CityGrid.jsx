import React, { useState } from 'react';
import ServiceModal from './ServiceModal';
import './CityGrid.css';

// City icon mapping - maps city names to their SVG file paths
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
    'Surat': '/svg/Surat.svg',
    'Lucknow': '/svg/lucknow.svg',
    'Indore': '/svg/indore.svg',
    'Chandigarh': '/svg/chandigarh.svg',
    'Kochi': '/svg/kochi.svg',
    'Coimbatore': '/svg/coimbatore.svg',
    'Noida': '/svg/noida.svg',
    'Gurgaon': '/svg/Gurugram.svg',
    'Goa': '/svg/goa.svg'
};

const cities = [
    'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune',
    'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Indore',
    'Chandigarh', 'Kochi', 'Coimbatore', 'Noida', 'Gurgaon', 'Goa'
];

const CityGrid = ({ currentPage = 'home' }) => {
    const [selectedCity, setSelectedCity] = useState(null);

    // Helper function to get icon path
    const getCityIconPath = (cityName) => {
        return cityIconMap[cityName] || '/svg/default-city.svg';
    };

    return (
        <>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-3">
                {cities.map((city, index) => (
                    <button
                        key={city}
                        onClick={() => setSelectedCity(city)}
                        className="group flex flex-col items-center justify-center gap-2 aspect-square rounded-full border border-gray-100 hover:border-blue-200 hover:bg-white hover:shadow-lg transition-all duration-300"
                        title={city}
                    >
                        {/* City Icon */}
                        <div className="city-icon-container">
                            <img
                                src={getCityIconPath(city)}
                                alt={`${city} icon`}
                                className="city-icon"
                            />
                        </div>
                        <span className="text-[10px] md:text-xs font-medium text-gray-500 group-hover:text-blue-600 transition-colors truncate w-full px-2 text-center">
                            {city}
                        </span>
                    </button>
                ))}
            </div>

            <ServiceModal
                isOpen={!!selectedCity}
                cityName={selectedCity}
                cityIconPath={selectedCity ? getCityIconPath(selectedCity) : ''}
                currentPage={currentPage}
                onClose={() => setSelectedCity(null)}
            />
        </>
    );
};

export default CityGrid;

