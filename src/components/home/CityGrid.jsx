import React, { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import ServiceModal from './ServiceModal';
import './CityGrid.css';

// City icon mapping - maps city names to their SVG file paths
export const cityIconMap = {
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
    'Kochi': '/svg/kochi.svg',
    'Coimbatore': '/svg/coimbatore.svg',
    'Noida': '/svg/noida.svg',
    'Gurgaon': '/svg/Gurugram.svg',
    'Goa': '/svg/goa.svg'
};

// Enhanced city data with metadata
const citiesData = [
    { name: 'Bangalore', popular: true, metro: true },
    { name: 'Mumbai', popular: true, metro: true },
    { name: 'Delhi', popular: true, metro: true },
    { name: 'Hyderabad', popular: true, metro: true },
    { name: 'Chennai', popular: false, metro: true },
    { name: 'Pune', popular: true, metro: true },
    { name: 'Kolkata', popular: false, metro: true },
    { name: 'Ahmedabad', popular: false, metro: false },
    { name: 'Jaipur', popular: false, metro: false },
    { name: 'Surat', popular: false, metro: false },
    { name: 'Lucknow', popular: false, metro: false },
    { name: 'Kochi', popular: true, metro: false },
    { name: 'Coimbatore', popular: false, metro: false },
    { name: 'Noida', popular: false, metro: false },
    { name: 'Gurgaon', popular: true, metro: true }
];

const CityGrid = ({ currentPage = 'home', onCitySelect, searchQuery = '', activeFilter = 'all' }) => {

    // Helper function to get icon path
    const getCityIconPath = (cityName) => {
        return cityIconMap[cityName] || '/svg/default-city.svg';
    };

    // Filter cities based on search query and active filter
    const filteredCities = useMemo(() => {
        return citiesData.filter(city => {
            // Search filter
            const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase());

            // Category filter
            let matchesFilter = false;
            if (activeFilter === 'all') matchesFilter = true;
            if (activeFilter === 'popular' && city.popular) matchesFilter = true;
            if (activeFilter === 'metro' && city.metro) matchesFilter = true;

            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, activeFilter]);

    return (
        <>
            {filteredCities.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-5xl mb-4">🏙️</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No Cities Found</h3>
                    <p className="text-gray-500 text-sm">Try adjusting your search or filter</p>
                </div>
            ) : (
                <div className="grid grid-cols-5 gap-2.5 md:gap-3">
                    {filteredCities.map((city) => (
                        <button
                            key={city.name}
                            onClick={() => onCitySelect && onCitySelect(city.name)}
                            className="group flex flex-col items-center justify-start gap-1.5 transition-all duration-300 w-full hover:-translate-y-1"
                            title={city.name}
                        >
                            {/* Enhanced City Icon Container */}
                            <div className="relative city-icon-container-enhanced">
                                {/* Popular Badge */}
                                {city.popular && (
                                    <div className="absolute -top-1 -right-1 z-10">
                                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full p-1 shadow-lg">
                                            <TrendingUp className="w-3 h-3" />
                                        </div>
                                    </div>
                                )}

                                <img
                                    src={getCityIconPath(city.name)}
                                    alt={`${city.name} icon`}
                                    className="city-icon-enhanced"
                                />
                            </div>

                            {/* City Name */}
                            <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors text-center w-full leading-tight">
                                {city.name}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </>
    );
};

export default CityGrid;
