// OTP Service - Handle OTP generation, storage, and validation via Backend API

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Handle API errors
 */
const handleApiError = (error) => {
    console.error('OTP Service API Error:', error);
    return {
        success: false,
        message: error.message || 'An error occurred with the OTP service.'
    };
};

/**
 * Send OTP to email
 */
export const sendEmailOTP = async (email) => {
    try {
        const response = await fetch(`${BASE_URL}/otp/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to send email OTP');

        return {
            success: true,
            message: data.message || `OTP sent to ${email}`,
            expiresIn: data.expires_in || 300
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Send OTP to phone
 */
export const sendPhoneOTP = async (phone) => {
    try {
        const response = await fetch(`${BASE_URL}/otp/send-sms`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to send phone OTP');

        return {
            success: true,
            message: data.message || `OTP sent to ${phone}`,
            expiresIn: data.expires_in || 300
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Verify OTP
 */
export const verifyOTP = async (identifier, enteredOTP) => {
    try {
        const response = await fetch(`${BASE_URL}/otp/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, otp: enteredOTP })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Verification failed');

        return {
            success: true,
            message: data.message || 'OTP verified successfully!'
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Resend OTP
 */
export const resendOTP = async (identifier) => {
    try {
        const response = await fetch(`${BASE_URL}/otp/resend`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to resend OTP');

        return {
            success: true,
            message: data.message || `OTP resent to ${identifier}`,
            expiresIn: data.expires_in || 300
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Clear OTP from storage (No-op now since backend handles it)
 */
export const clearOTP = (identifier) => {
    // Backend handles OTP state
};

/**
 * Check if resend is allowed (Stub for frontend logic if needed)
 */
export const canResendOTP = (identifier) => {
    return { canResend: true, waitTime: 0 };
};

/**
 * Get OTP expiry time remaining (Stub)
 */
export const getOTPTimeRemaining = (identifier) => {
    return 300; // Default 5 mins
};

