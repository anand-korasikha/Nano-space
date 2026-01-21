import React, { useState } from 'react';
import { X } from 'lucide-react';
import LocationPicker from '../common/LocationPicker';
import './AddPropertyModal.css';

const AddPropertyModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'Coworking',
        city: '',
        description: '',
        location: '',
        amenities: '',
        price: '',
        period: 'month',
        images: [], // Changed from single image to array of images
        badge: 'Popular',
        mapLocation: null
    });

    const [errors, setErrors] = useState({});
    const [imagePreviews, setImagePreviews] = useState([]); // Changed to array

    const propertyTypes = ['Coworking', 'Coliving', 'Virtual Office'];
    const cities = [
        'Hyderabad', 'Bangalore', 'Mumbai', 'Delhi', 'Pune',
        'Noida', 'Chennai', 'Gurugram', 'Ahmedabad', 'Lucknow', 'Indore'
    ];
    const periods = ['hour', 'day', 'month', 'year'];
    const badges = ['Popular', 'Premium', 'Featured'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length === 0) return;

        // Check if adding these files would exceed 4 images
        const currentImageCount = imagePreviews.length;
        const totalImages = currentImageCount + files.length;

        if (totalImages > 4) {
            setErrors(prev => ({
                ...prev,
                images: `You can only upload 4 images. You have ${currentImageCount} and are trying to add ${files.length} more.`
            }));
            return;
        }

        // Validate each file
        const validFiles = [];
        for (let file of files) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({
                    ...prev,
                    images: 'Please select valid image files only'
                }));
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    images: 'Each image size should be less than 5MB'
                }));
                return;
            }

            validFiles.push(file);
        }

        // Clear previous errors
        setErrors(prev => ({
            ...prev,
            images: ''
        }));

        // Process all valid files
        const newPreviews = [];
        const newImages = [];
        let processedCount = 0;

        validFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push(reader.result);
                newImages.push(reader.result);
                processedCount++;

                // Once all files are processed, update state
                if (processedCount === validFiles.length) {
                    setImagePreviews(prev => [...prev, ...newPreviews]);
                    setFormData(prev => ({
                        ...prev,
                        images: [...prev.images, ...newImages]
                    }));
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index) => {
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));

        // Clear error if exists
        setErrors(prev => ({
            ...prev,
            images: ''
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Property name is required';
        }

        if (!formData.city) {
            newErrors.city = 'City is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        }

        if (!formData.amenities.trim()) {
            newErrors.amenities = 'Amenities are required';
        }

        if (!formData.price.trim()) {
            newErrors.price = 'Price is required';
        }

        // Validate exactly 4 images
        if (!formData.images || formData.images.length === 0) {
            newErrors.images = 'Please upload exactly 4 property images';
        } else if (formData.images.length < 4) {
            newErrors.images = `Please upload ${4 - formData.images.length} more image(s). You need exactly 4 images.`;
        } else if (formData.images.length > 4) {
            newErrors.images = 'You can only upload 4 images. Please remove extra images.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Process amenities into array
        const amenitiesArray = formData.amenities
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0);

        const propertyData = {
            ...formData,
            amenities: amenitiesArray,
            rating: 0, // New properties start with 0 rating
        };

        onSubmit(propertyData);

        // Reset form
        setFormData({
            name: '',
            type: 'Coworking',
            city: '',
            description: '',
            location: '',
            amenities: '',
            price: '',
            period: 'month',
            images: [], // Reset to empty array
            badge: 'Popular',
            mapLocation: null
        });
        setErrors({});
        setImagePreviews([]); // Reset to empty array
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add New Property</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="property-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Property Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g., WeWork Gachibowli"
                            />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="type">Property Type *</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                {propertyTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="city">City *</label>
                            <select
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            >
                                <option value="">Select a city</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                            {errors.city && <span className="error-text">{errors.city}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Location/Address *</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g., Gachibowli, Hyderabad"
                            />
                            {errors.location && <span className="error-text">{errors.location}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your property..."
                            rows="4"
                        />
                        {errors.description && <span className="error-text">{errors.description}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="amenities">Amenities * (comma-separated)</label>
                        <input
                            type="text"
                            id="amenities"
                            name="amenities"
                            value={formData.amenities}
                            onChange={handleChange}
                            placeholder="e.g., High speed WiFi, Coffee & Bar, Meeting Rooms"
                        />
                        {errors.amenities && <span className="error-text">{errors.amenities}</span>}
                    </div>

                    {/* Map Location Picker */}
                    <LocationPicker
                        value={formData.mapLocation}
                        onChange={(location) => setFormData(prev => ({ ...prev, mapLocation: location }))}
                        defaultCenter={[17.385044, 78.486671]} // Hyderabad coordinates
                    />

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="price">Price *</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="e.g., ₹10,999"
                            />
                            {errors.price && <span className="error-text">{errors.price}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="period">Period</label>
                            <select
                                id="period"
                                name="period"
                                value={formData.period}
                                onChange={handleChange}
                            >
                                {periods.map(period => (
                                    <option key={period} value={period}>{period}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="badge">Badge</label>
                            <select
                                id="badge"
                                name="badge"
                                value={formData.badge}
                                onChange={handleChange}
                            >
                                {badges.map(badge => (
                                    <option key={badge} value={badge}>{badge}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="label-with-progress">
                            <label htmlFor="images">Property Images * (Exactly 4 required)</label>
                            <span className="upload-progress">
                                {imagePreviews.length}/4 images uploaded
                            </span>
                        </div>

                        <input
                            type="file"
                            id="images"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="file-input"
                            disabled={imagePreviews.length >= 4}
                        />
                        {errors.images && <span className="error-text">{errors.images}</span>}
                        <small className="form-hint">
                            Upload 4 images (max 5MB each, JPG/PNG).
                            {imagePreviews.length < 4 && ` ${4 - imagePreviews.length} more needed.`}
                        </small>

                        {/* Image Upload Grid - 2x2 layout */}
                        <div className="image-upload-grid">
                            {[0, 1, 2, 3].map((index) => (
                                <div key={index} className={`image-slot ${imagePreviews[index] ? 'filled' : 'empty'}`}>
                                    {imagePreviews[index] ? (
                                        <>
                                            <img src={imagePreviews[index]} alt={`Preview ${index + 1}`} className="image-preview" />
                                            <button
                                                type="button"
                                                className="remove-image-btn"
                                                onClick={() => removeImage(index)}
                                                title="Remove image"
                                            >
                                                <X size={16} />
                                            </button>
                                            <span className="image-number">{index + 1}</span>
                                        </>
                                    ) : (
                                        <div className="image-placeholder">
                                            <span className="placeholder-icon">📷</span>
                                            <span className="placeholder-text">Image {index + 1}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-submit">
                            Submit Property
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPropertyModal;
