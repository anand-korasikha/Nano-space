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

    // Handle 401 — token was rejected by the backend.
    // Dispatch a custom event so React/AuthContext can handle the redirect via
    // React Router (no hard navigation → no flicker / wrong-page flash).
    if (response.status === 401) {
        if (token) {
            clearTokens();
            localStorage.removeItem('nanospace_user');
            window.dispatchEvent(new Event('nanospace:auth-expired'));
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

    /**
     * Verify Firebase phone auth token with the backend.
     * Backend decodes it with Firebase Admin SDK and marks phone_verified = true.
     */
    verifyFirebasePhone: (firebaseToken) =>
        request('/auth/verify-firebase-phone', {
            method: 'POST',
            body: JSON.stringify({ firebase_token: firebaseToken }),
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

    /** Delete a property permanently */
    deleteProperty: (id) =>
        request(`/admin/properties/${id}`, { method: 'DELETE' }),

    /** Get all enquiries submitted via the website */
    getEnquiries: () => request('/enquiries/admin'),

    /** Update enquiry status */
    updateEnquiryStatus: (id, status) =>
        request(`/enquiries/admin/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        }),

    /** Delete an enquiry */
    deleteEnquiry: (id) =>
        request(`/enquiries/admin/${id}`, { method: 'DELETE' }),

    /** Get all bookings */
    getAllBookings: () => request('/admin/bookings'),

    /** Update a booking status */
    updateBookingStatus: (id, status) =>
        request(`/admin/bookings/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        }),

    /** Update a property (flags, status, etc.) */
    updateProperty: (id, updates) =>
        request(`/admin/properties/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        }),

    /** Get all payments */
    getPayments: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return request(`/payments/${params ? `?${params}` : ''}`);
    },
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

// ─── Payments API ────────────────────────────────────────────────────────────

export const paymentsAPI = {
    /** Create a Razorpay order for the listing fee */
    createOrder: (data) =>
        request('/payments/create-order', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    /** Verify payment signature and create the property listing */
    verifyPayment: (data) =>
        request('/payments/verify', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    /** Get all payments (admin only) */
    getAll: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return request(`/payments/${params ? `?${params}` : ''}`);
    },
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
