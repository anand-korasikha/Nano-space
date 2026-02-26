import React from 'react';
import { Navigation } from 'lucide-react';
import './MapPreview.css';

const MapPreview = ({ latitude, longitude, address, propertyName }) => {
    // If no coordinates, don't render
    if (!latitude || !longitude) {
        return null;
    }

    // Google Maps directions URL
    const getDirectionsUrl = () => {
        if (address) {
            return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
        }
        return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    };

    // Open Google Maps in new tab
    const handleDirectionsClick = (e) => {
        e.stopPropagation(); // Prevent card click event
        window.open(getDirectionsUrl(), '_blank');
    };

    return (
        <button
            className="directions-button"
            onClick={handleDirectionsClick}
            title="Get directions to this property"
        >
            <Navigation size={16} />
            <span>Directions</span>
        </button>
    );
};

export default MapPreview;
