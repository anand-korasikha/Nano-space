import React, { useState } from 'react';
import { X } from 'lucide-react';
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
        image: '',
        badge: 'Popular'
    });

    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null);

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
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({
                    ...prev,
                    image: 'Please select a valid image file'
                }));
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    image: 'Image size should be less than 5MB'
                }));
                return;
            }

            // Clear previous errors
            setErrors(prev => ({
                ...prev,
                image: ''
            }));

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData(prev => ({
                    ...prev,
                    image: reader.result // Store base64 string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setFormData(prev => ({
            ...prev,
            image: ''
        }));
        // Reset file input
        const fileInput = document.getElementById('image');
        if (fileInput) {
            fileInput.value = '';
        }
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

        if (!formData.image) {
            newErrors.image = 'Property image is required';
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
            image: '',
            badge: 'Popular'
        });
        setErrors({});
        setImagePreview(null);
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
                        <label htmlFor="image">Property Image *</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file-input"
                        />
                        {errors.image && <span className="error-text">{errors.image}</span>}
                        <small className="form-hint">Upload an image (max 5MB, JPG/PNG)</small>

                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="image-preview-container">
                                <img src={imagePreview} alt="Preview" className="image-preview" />
                                <button
                                    type="button"
                                    className="remove-image-btn"
                                    onClick={removeImage}
                                >
                                    Remove Image
                                </button>
                            </div>
                        )}
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
