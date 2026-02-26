/**
 * API Service - Central HTTP client for the Nanospace backend
 * Connects to the Flask REST API at http://localhost:5000
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Get the stored JWT access token
 */
const getToken = () => localStorage.getItem('nanospace_token');

/**
 * Store tokens after login/register
 */
export const storeTokens = (accessToken, refreshToken) => {
    localStorage.setItem('nanospace_token', accessToken);
    if (refreshToken) {
        localStorage.setItem('nanospace_refresh_token', refreshToken);
    }
};

/**
 * Clear tokens on logout
 */
export const clearTokens = () => {
    localStorage.removeItem('nanospace_token');
    localStorage.removeItem('nanospace_refresh_token');
};

/**
 * Core fetch wrapper with auth headers and error handling
 */
const request = async (endpoint, options = {}) => {
    const token = getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    // Handle 401 - only auto-logout if we actually sent a token that was rejected.
    // If there was no token (e.g. hardcoded admin bypass), a 401 just means the
    // backend doesn't accept unauthenticated requests — don't nuke the session.
    if (response.status === 401) {
        if (token) {
            // Real token was rejected — session has expired, force re-login
            clearTokens();
            localStorage.removeItem('nanospace_user');
            window.location.href = '/login';
        }
        throw new Error('Authentication required. Please login.');
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || `API Error: ${response.status}`);
    }

    return data;
};

// ─── Auth API ────────────────────────────────────────────────────────────────

export const authAPI = {
    login: (identifier, password) =>
        request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ identifier, password }),
        }),

    register: (userData) =>
        request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        }),

    getMe: () => request('/auth/me'),

    updateProfile: (updates) =>
        request('/auth/update-profile', {
            method: 'PUT',
            body: JSON.stringify(updates),
        }),
};

// ─── Properties API ──────────────────────────────────────────────────────────

export const propertiesAPI = {
    /** Submit a new property listing (owner) */
    submit: (propertyData) =>
        request('/properties/', {
            method: 'POST',
            body: JSON.stringify(propertyData),
        }),

    /** Get properties owned by logged-in user */
    getMyProperties: () => request('/properties/my-properties'),

    /** Get all approved properties (public) */
    getApproved: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return request(`/properties/?${params}`);
    },

    /** Get a single property by ID */
    getById: (id) => request(`/properties/${id}`),

    /** Update a property */
    update: (id, updates) =>
        request(`/properties/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        }),

    /** Delete a property */
    remove: (id) =>
        request(`/properties/${id}`, {
            method: 'DELETE',
        }),
};

// ─── Admin API ───────────────────────────────────────────────────────────────

export const adminAPI = {
    /** Get overall dashboard statistics */
    getStats: () => request('/admin/stats'),

    /** Get all users */
    getAllUsers: () => request('/admin/users'),

    /** Get pending property listings */
    getPendingProperties: () => request('/admin/properties/pending'),

    /** Approve a property */
    approveProperty: (id) =>
        request(`/admin/properties/${id}/approve`, { method: 'PUT' }),

    /** Reject a property */
    rejectProperty: (id, reason = '') =>
        request(`/admin/properties/${id}/reject`, {
            method: 'PUT',
            body: JSON.stringify({ reason }),
        }),

    /** Get all enquiries submitted via the website */
    getEnquiries: () => request('/admin/enquiries'),

    /** Update enquiry status */
    updateEnquiryStatus: (id, status) =>
        request(`/admin/enquiries/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        }),

    /** Delete an enquiry */
    deleteEnquiry: (id) =>
        request(`/admin/enquiries/${id}`, { method: 'DELETE' }),

    /** Get all bookings */
    getAllBookings: () => request('/admin/bookings'),

    /** Update a booking status */
    updateBookingStatus: (id, status) =>
        request(`/admin/bookings/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        }),
};

// ─── Enquiries API (public, no auth required) ────────────────────────────────

export const enquiriesAPI = {
    /** Submit a new enquiry from any contact/enquiry form */
    submit: (enquiryData) =>
        request('/enquiries/', {
            method: 'POST',
            body: JSON.stringify(enquiryData),
        }),
};

// ─── Bookings API ─────────────────────────────────────────────────────────────

export const bookingsAPI = {
    create: (bookingData) =>
        request('/bookings/', {
            method: 'POST',
            body: JSON.stringify(bookingData),
        }),

    getMyBookings: () => request('/bookings/my-bookings'),

    cancel: (id) =>
        request(`/bookings/${id}/cancel`, { method: 'PUT' }),
};

export default request;
