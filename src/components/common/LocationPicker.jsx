import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Search, MapPin, X } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './LocationPicker.css';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map clicks
const MapClickHandler = ({ onLocationSelect }) => {
    useMapEvents({
        click: (e) => {
            onLocationSelect(e.latlng);
        },
    });
    return null;
};

const LocationPicker = ({ value, onChange, defaultCenter = [17.385044, 78.486671] }) => {
    const [position, setPosition] = useState(value || null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [address, setAddress] = useState('');
    const mapRef = useRef(null);
    const searchTimeoutRef = useRef(null);

    // Update position when value prop changes
    useEffect(() => {
        if (value && value.lat && value.lng) {
            setPosition({ lat: value.lat, lng: value.lng });
            setAddress(value.address || '');
        }
    }, [value]);

    // Reverse geocoding to get address from coordinates
    const reverseGeocode = async (lat, lng) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            return data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        } catch (error) {
            console.error('Reverse geocoding error:', error);
            return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        }
    };

    // Handle location selection
    const handleLocationSelect = async (latlng) => {
        const newPosition = { lat: latlng.lat, lng: latlng.lng };
        setPosition(newPosition);

        // Get address for the selected location
        const addressText = await reverseGeocode(latlng.lat, latlng.lng);
        setAddress(addressText);

        // Call onChange with the complete location data
        if (onChange) {
            onChange({
                lat: latlng.lat,
                lng: latlng.lng,
                address: addressText
            });
        }

        // Center map on new position
        if (mapRef.current) {
            mapRef.current.setView([latlng.lat, latlng.lng], 15);
        }
    };

    // Search for locations using Nominatim
    const searchLocation = async (query) => {
        if (!query || query.length < 3) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=in`
            );
            const data = await response.json();
            setSearchResults(data);
            setShowResults(true);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    // Handle search input change with debounce
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Clear previous timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Set new timeout for search
        searchTimeoutRef.current = setTimeout(() => {
            searchLocation(query);
        }, 500);
    };

    // Handle search result selection
    const handleResultSelect = (result) => {
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);

        handleLocationSelect({ lat, lng });
        setSearchQuery(result.display_name);
        setShowResults(false);

        // Center map on selected location
        if (mapRef.current) {
            mapRef.current.setView([lat, lng], 15);
        }
    };

    // Clear search
    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setShowResults(false);
    };

    // Clear location
    const clearLocation = () => {
        setPosition(null);
        setAddress('');
        if (onChange) {
            onChange(null);
        }
    };

    return (
        <div className="location-picker">
            <div className="location-picker-header">
                <label className="location-label">
                    <MapPin size={18} />
                    Property Location on Map
                </label>
                {position && (
                    <button
                        type="button"
                        className="clear-location-btn"
                        onClick={clearLocation}
                    >
                        <X size={16} />
                        Clear Location
                    </button>
                )}
            </div>

            {/* Search Input */}
            <div className="location-search">
                <div className="search-input-wrapper">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search for a location (e.g., Banjara Hills, Hyderabad)"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => searchResults.length > 0 && setShowResults(true)}
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            className="clear-search-btn"
                            onClick={clearSearch}
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Search Results Dropdown */}
                {showResults && searchResults.length > 0 && (
                    <div className="search-results">
                        {searchResults.map((result, index) => (
                            <div
                                key={index}
                                className="search-result-item"
                                onClick={() => handleResultSelect(result)}
                            >
                                <MapPin size={16} />
                                <span>{result.display_name}</span>
                            </div>
                        ))}
                    </div>
                )}

                {isSearching && (
                    <div className="search-loading">Searching...</div>
                )}
            </div>

            {/* Map Container */}
            <div className="map-container">
                <MapContainer
                    center={position ? [position.lat, position.lng] : defaultCenter}
                    zoom={position ? 15 : 12}
                    style={{ height: '100%', width: '100%' }}
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler onLocationSelect={handleLocationSelect} />
                    {position && (
                        <Marker
                            position={[position.lat, position.lng]}
                            draggable={true}
                            eventHandlers={{
                                dragend: (e) => {
                                    const marker = e.target;
                                    const newPos = marker.getLatLng();
                                    handleLocationSelect(newPos);
                                },
                            }}
                        />
                    )}
                </MapContainer>
            </div>

            {/* Selected Location Info */}
            {position && (
                <div className="location-info">
                    <div className="location-info-item">
                        <strong>Address:</strong>
                        <span>{address || 'Loading address...'}</span>
                    </div>
                    <div className="location-coordinates">
                        <div className="coordinate-item">
                            <strong>Latitude:</strong>
                            <span>{position.lat.toFixed(6)}</span>
                        </div>
                        <div className="coordinate-item">
                            <strong>Longitude:</strong>
                            <span>{position.lng.toFixed(6)}</span>
                        </div>
                    </div>
                </div>
            )}

            <p className="location-hint">
                Click on the map or search for a location to set the property's exact position
            </p>
        </div>
    );
};

export default LocationPicker;
