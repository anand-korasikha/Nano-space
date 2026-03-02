import React, { useRef, useState } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { MapPin, Search, X, Loader } from 'lucide-react';
import './PlacesSearch.css';

const LIBRARIES = ['places'];

/**
 * PlacesSearch — Standalone Google Places Autocomplete component.
 *
 * Props:
 *   onPlaceSelect(place)  — called with the full Google Place object when user picks a result.
 *                           Useful fields: place.name, place.formatted_address,
 *                           place.geometry.location.lat(), place.geometry.location.lng()
 *   placeholder           — input placeholder text (default: "Search for a place…")
 *   types                 — Google Places types array, e.g. ['establishment'] or ['geocode']
 *                           default: [] (all types)
 *   country               — restrict results to a country code, e.g. 'in' for India
 *   className             — extra CSS class on the wrapper
 *
 * Usage:
 *   <PlacesSearch
 *     onPlaceSelect={(place) => console.log(place)}
 *     placeholder="Search location"
 *     country="in"
 *   />
 */
const PlacesSearch = ({
    onPlaceSelect,
    placeholder = 'Search for a place…',
    types = [],
    country = 'in',
    className = '',
}) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey || '',
        libraries: LIBRARIES,
    });

    const autocompleteRef = useRef(null);
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [selectedPlace, setSelectedPlace] = useState(null);

    const handleLoad = (autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current?.getPlace();
        if (!place || !place.geometry) return;

        const details = {
            name: place.name || '',
            address: place.formatted_address || '',
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            placeId: place.place_id || '',
            types: place.types || [],
            raw: place, // full Google Place object
        };

        setInputValue(place.formatted_address || place.name || '');
        setSelectedPlace(details);

        if (onPlaceSelect) {
            onPlaceSelect(details);
        }
    };

    const clearInput = () => {
        setInputValue('');
        setSelectedPlace(null);
        if (inputRef.current) inputRef.current.value = '';
        if (onPlaceSelect) onPlaceSelect(null);
    };

    // API key missing
    if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
        return (
            <div className={`places-search-wrapper places-search--error ${className}`}>
                <MapPin size={18} className="places-search-icon" />
                <span className="places-search-missing-key">
                    Add <code>VITE_GOOGLE_MAPS_API_KEY</code> to <code>frontend/.env</code>
                </span>
            </div>
        );
    }

    if (loadError) {
        return (
            <div className={`places-search-wrapper places-search--error ${className}`}>
                <span>Failed to load Google Maps: {loadError.message}</span>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className={`places-search-wrapper places-search--loading ${className}`}>
                <Loader size={18} className="places-search-spinner" />
                <span>Loading Places…</span>
            </div>
        );
    }

    return (
        <div className={`places-search-wrapper ${className}`}>
            <Search size={18} className="places-search-icon" />

            <Autocomplete
                onLoad={handleLoad}
                onPlaceChanged={handlePlaceChanged}
                options={{
                    types,
                    componentRestrictions: country ? { country } : undefined,
                }}
            >
                <input
                    ref={inputRef}
                    type="text"
                    className="places-search-input"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoComplete="off"
                />
            </Autocomplete>

            {inputValue && (
                <button
                    type="button"
                    className="places-search-clear"
                    onClick={clearInput}
                    aria-label="Clear"
                >
                    <X size={15} />
                </button>
            )}

            {selectedPlace && (
                <div className="places-search-badge">
                    <MapPin size={13} />
                    <span>{selectedPlace.name || selectedPlace.address}</span>
                </div>
            )}
        </div>
    );
};

export default PlacesSearch;
