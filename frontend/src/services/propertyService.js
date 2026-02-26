/**
 * Property Service - Uses the Flask backend API.
 * All data is persisted in the server-side SQLite database,
 * not localStorage.
 */

import { propertiesAPI, adminAPI } from './api';

// ── Owner functions ───────────────────────────────────────────────────────────

/**
 * Submit a new property listing (owner)
 */
export const submitProperty = async (propertyData) => {
    try {
        const data = await propertiesAPI.submit(propertyData);
        return data.property || data;
    } catch (error) {
        console.error('Error submitting property:', error);
        return null;
    }
};

/**
 * Get properties submitted by the logged-in owner
 */
export const getPropertiesByOwner = async () => {
    try {
        const data = await propertiesAPI.getMyProperties();
        return data.properties || [];
    } catch (error) {
        console.error('Error fetching owner properties:', error);
        return [];
    }
};

/**
 * Update a property
 */
export const updateProperty = async (propertyId, updates) => {
    try {
        const data = await propertiesAPI.update(propertyId, updates);
        return data.property || null;
    } catch (error) {
        console.error('Error updating property:', error);
        return null;
    }
};

/**
 * Delete a property (owner deletes their own)
 */
export const deleteProperty = async (propertyId) => {
    try {
        await propertiesAPI.remove(propertyId);
        return true;
    } catch (error) {
        console.error('Error deleting property:', error);
        return false;
    }
};

// ── Admin functions ───────────────────────────────────────────────────────────

/**
 * Get all pending properties (admin)
 */
export const getPendingProperties = async () => {
    try {
        const data = await adminAPI.getPendingProperties();
        return data.properties || [];
    } catch (error) {
        console.error('Error fetching pending properties:', error);
        return [];
    }
};

/**
 * Get all approved properties
 * Uses the PUBLIC endpoint — no admin token required.
 * Used by homepage, listing pages, etc.
 */
export const getApprovedProperties = async () => {
    try {
        const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${BASE}/properties/?status=approved&per_page=100`);
        if (!response.ok) return [];
        const data = await response.json();
        return data.properties || [];
    } catch (error) {
        console.error('Error fetching approved properties:', error);
        return [];
    }
};

/**
 * Get all rejected properties (admin only)
 */
export const getRejectedProperties = async () => {
    try {
        const token = localStorage.getItem('nanospace_token');
        const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${BASE}/admin/properties/rejected`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) return [];
        const data = await response.json();
        return data.properties || [];
    } catch (error) {
        console.error('Error fetching rejected properties:', error);
        return [];
    }
};

/**
 * Approve a property (admin)
 */
export const approveProperty = async (propertyId) => {
    try {
        await adminAPI.approveProperty(propertyId);
        return true;
    } catch (error) {
        console.error('Error approving property:', error);
        return false;
    }
};

/**
 * Reject a property (admin)
 */
export const rejectProperty = async (propertyId, reason = '') => {
    try {
        await adminAPI.rejectProperty(propertyId, reason);
        return true;
    } catch (error) {
        console.error('Error rejecting property:', error);
        return false;
    }
};

/**
 * Get admin dashboard statistics
 */
export const getAdminStats = async () => {
    try {
        const data = await adminAPI.getStats();
        return {
            total: data.properties?.total || 0,
            pending: data.properties?.pending || 0,
            approved: data.properties?.approved || 0,
            rejected: data.properties?.rejected || 0,
            users: data.users || {},
            bookings: data.bookings || {},
            enquiries: data.enquiries || {},
        };
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return {
            total: 0,
            pending: 0,
            approved: 0,
            rejected: 0,
            users: {},
            bookings: {},
            enquiries: {},
        };
    }
};

/**
 * Get owner property statistics
 */
export const getOwnerStats = async () => {
    try {
        const properties = await getPropertiesByOwner();
        return {
            total: properties.length,
            pending: properties.filter(p => p.status === 'pending').length,
            approved: properties.filter(p => p.status === 'approved').length,
            rejected: properties.filter(p => p.status === 'rejected').length,
        };
    } catch (error) {
        console.error('Error calculating owner stats:', error);
        return { total: 0, pending: 0, approved: 0, rejected: 0 };
    }
};

/**
 * Get approved properties by type and city (public listing pages)
 * Uses the public endpoint — no auth token required.
 */
export const getApprovedPropertiesByType = async (type, city) => {
    try {
        const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const params = new URLSearchParams({ status: 'approved', per_page: 100 });
        if (type) params.set('type', type);
        if (city) params.set('city', city);
        const response = await fetch(`${BASE}/properties/?${params}`);
        if (!response.ok) return [];
        const data = await response.json();
        return data.properties || [];
    } catch (error) {
        console.error('Error fetching approved properties by type:', error);
        return [];
    }
};
