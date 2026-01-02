// Property Service - Centralized property management using localStorage

const STORAGE_KEY = 'nanospace_properties';

/**
 * Get all properties from localStorage
 */
const getAllProperties = () => {
    try {
        const properties = localStorage.getItem(STORAGE_KEY);
        return properties ? JSON.parse(properties) : [];
    } catch (error) {
        console.error('Error fetching properties:', error);
        return [];
    }
};

/**
 * Save properties to localStorage
 */
const saveProperties = (properties) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
        return true;
    } catch (error) {
        console.error('Error saving properties:', error);
        return false;
    }
};

/**
 * Submit a new property
 * @param {Object} propertyData - Property details
 * @param {string} ownerId - ID of the property owner
 * @returns {Object} Created property or null on error
 */
export const submitProperty = (propertyData, ownerId) => {
    try {
        const properties = getAllProperties();

        const newProperty = {
            id: Date.now().toString(),
            ...propertyData,
            ownerId,
            status: 'pending',
            submittedAt: new Date().toISOString(),
            approvedAt: null,
            rejectedAt: null,
            rejectionReason: null
        };

        properties.push(newProperty);
        saveProperties(properties);

        return newProperty;
    } catch (error) {
        console.error('Error submitting property:', error);
        return null;
    }
};

/**
 * Get properties by owner ID
 * @param {string} ownerId - Owner's user ID
 * @returns {Array} Array of properties
 */
export const getPropertiesByOwner = (ownerId) => {
    try {
        const properties = getAllProperties();
        return properties.filter(prop => prop.ownerId === ownerId);
    } catch (error) {
        console.error('Error fetching owner properties:', error);
        return [];
    }
};

/**
 * Get all pending properties (for admin)
 * @returns {Array} Array of pending properties
 */
export const getPendingProperties = () => {
    try {
        const properties = getAllProperties();
        return properties.filter(prop => prop.status === 'pending');
    } catch (error) {
        console.error('Error fetching pending properties:', error);
        return [];
    }
};

/**
 * Get all approved properties
 * @returns {Array} Array of approved properties
 */
export const getApprovedProperties = () => {
    try {
        const properties = getAllProperties();
        return properties.filter(prop => prop.status === 'approved');
    } catch (error) {
        console.error('Error fetching approved properties:', error);
        return [];
    }
};

/**
 * Get all rejected properties
 * @returns {Array} Array of rejected properties
 */
export const getRejectedProperties = () => {
    try {
        const properties = getAllProperties();
        return properties.filter(prop => prop.status === 'rejected');
    } catch (error) {
        console.error('Error fetching rejected properties:', error);
        return [];
    }
};

/**
 * Get approved properties by type and city
 * @param {string} type - Property type (coworking, coliving, virtualoffice)
 * @param {string} city - City name (lowercase)
 * @returns {Array} Array of approved properties
 */
export const getApprovedPropertiesByType = (type, city) => {
    try {
        const properties = getAllProperties();
        return properties.filter(prop =>
            prop.status === 'approved' &&
            prop.type.toLowerCase() === type.toLowerCase() &&
            prop.city.toLowerCase() === city.toLowerCase()
        );
    } catch (error) {
        console.error('Error fetching approved properties by type:', error);
        return [];
    }
};

/**
 * Approve a property
 * @param {string} propertyId - Property ID to approve
 * @returns {boolean} Success status
 */
export const approveProperty = (propertyId) => {
    try {
        const properties = getAllProperties();
        const propertyIndex = properties.findIndex(prop => prop.id === propertyId);

        if (propertyIndex === -1) {
            console.error('Property not found');
            return false;
        }

        properties[propertyIndex].status = 'approved';
        properties[propertyIndex].approvedAt = new Date().toISOString();
        properties[propertyIndex].rejectedAt = null;
        properties[propertyIndex].rejectionReason = null;

        return saveProperties(properties);
    } catch (error) {
        console.error('Error approving property:', error);
        return false;
    }
};

/**
 * Reject a property
 * @param {string} propertyId - Property ID to reject
 * @param {string} reason - Rejection reason (optional)
 * @returns {boolean} Success status
 */
export const rejectProperty = (propertyId, reason = '') => {
    try {
        const properties = getAllProperties();
        const propertyIndex = properties.findIndex(prop => prop.id === propertyId);

        if (propertyIndex === -1) {
            console.error('Property not found');
            return false;
        }

        properties[propertyIndex].status = 'rejected';
        properties[propertyIndex].rejectedAt = new Date().toISOString();
        properties[propertyIndex].approvedAt = null;
        properties[propertyIndex].rejectionReason = reason;

        return saveProperties(properties);
    } catch (error) {
        console.error('Error rejecting property:', error);
        return false;
    }
};

/**
 * Update a property
 * @param {string} propertyId - Property ID to update
 * @param {Object} updates - Property updates
 * @returns {boolean} Success status
 */
export const updateProperty = (propertyId, updates) => {
    try {
        const properties = getAllProperties();
        const propertyIndex = properties.findIndex(prop => prop.id === propertyId);

        if (propertyIndex === -1) {
            console.error('Property not found');
            return false;
        }

        properties[propertyIndex] = {
            ...properties[propertyIndex],
            ...updates,
            id: propertyId, // Ensure ID doesn't change
            ownerId: properties[propertyIndex].ownerId, // Ensure owner doesn't change
        };

        return saveProperties(properties);
    } catch (error) {
        console.error('Error updating property:', error);
        return false;
    }
};

/**
 * Delete a property
 * @param {string} propertyId - Property ID to delete
 * @returns {boolean} Success status
 */
export const deleteProperty = (propertyId) => {
    try {
        const properties = getAllProperties();
        const filteredProperties = properties.filter(prop => prop.id !== propertyId);

        if (filteredProperties.length === properties.length) {
            console.error('Property not found');
            return false;
        }

        return saveProperties(filteredProperties);
    } catch (error) {
        console.error('Error deleting property:', error);
        return false;
    }
};

/**
 * Get property statistics for owner
 * @param {string} ownerId - Owner's user ID
 * @returns {Object} Statistics object
 */
export const getOwnerStats = (ownerId) => {
    try {
        const properties = getPropertiesByOwner(ownerId);

        return {
            total: properties.length,
            pending: properties.filter(p => p.status === 'pending').length,
            approved: properties.filter(p => p.status === 'approved').length,
            rejected: properties.filter(p => p.status === 'rejected').length
        };
    } catch (error) {
        console.error('Error calculating owner stats:', error);
        return { total: 0, pending: 0, approved: 0, rejected: 0 };
    }
};

/**
 * Get property statistics for admin
 * @returns {Object} Statistics object
 */
export const getAdminStats = () => {
    try {
        const properties = getAllProperties();

        return {
            total: properties.length,
            pending: properties.filter(p => p.status === 'pending').length,
            approved: properties.filter(p => p.status === 'approved').length,
            rejected: properties.filter(p => p.status === 'rejected').length
        };
    } catch (error) {
        console.error('Error calculating admin stats:', error);
        return { total: 0, pending: 0, approved: 0, rejected: 0 };
    }
};
