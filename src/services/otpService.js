// OTP Service - Handle OTP generation, storage, and validation

const OTP_EXPIRY_MINUTES = 5;
const MAX_ATTEMPTS = 3;
const RESEND_COOLDOWN_SECONDS = 60;

/**
 * Generate a 6-digit OTP
 */
export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Store OTP in localStorage with expiry
 */
const storeOTP = (identifier, otp) => {
    const otpData = {
        otp,
        expiresAt: Date.now() + (OTP_EXPIRY_MINUTES * 60 * 1000),
        attempts: 0,
        createdAt: Date.now()
    };

    localStorage.setItem(`otp_${identifier}`, JSON.stringify(otpData));
    return otpData;
};

/**
 * Get stored OTP data
 */
const getStoredOTP = (identifier) => {
    try {
        const data = localStorage.getItem(`otp_${identifier}`);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error retrieving OTP:', error);
        return null;
    }
};

/**
 * Clear OTP from storage
 */
export const clearOTP = (identifier) => {
    localStorage.removeItem(`otp_${identifier}`);
};

/**
 * Send OTP to email (simulated for demo)
 */
export const sendEmailOTP = (email) => {
    const otp = generateOTP();
    storeOTP(email, otp);

    // Simulate email sending (in production, call your email service API)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 EMAIL OTP SENT');
    console.log(`To: ${email}`);
    console.log(`OTP Code: ${otp}`);
    console.log(`Valid for: ${OTP_EXPIRY_MINUTES} minutes`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return {
        success: true,
        message: `OTP sent to ${email}`,
        expiresIn: OTP_EXPIRY_MINUTES * 60
    };
};

/**
 * Send OTP to phone (simulated for demo)
 */
export const sendPhoneOTP = (phone) => {
    const otp = generateOTP();
    storeOTP(phone, otp);

    // Simulate SMS sending (in production, call your SMS service API)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📱 SMS OTP SENT');
    console.log(`To: ${phone}`);
    console.log(`OTP Code: ${otp}`);
    console.log(`Valid for: ${OTP_EXPIRY_MINUTES} minutes`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return {
        success: true,
        message: `OTP sent to ${phone}`,
        expiresIn: OTP_EXPIRY_MINUTES * 60
    };
};

/**
 * Verify OTP
 */
export const verifyOTP = (identifier, enteredOTP) => {
    const storedData = getStoredOTP(identifier);

    if (!storedData) {
        return {
            success: false,
            message: 'OTP not found. Please request a new one.'
        };
    }

    // Check if OTP has expired
    if (Date.now() > storedData.expiresAt) {
        clearOTP(identifier);
        return {
            success: false,
            message: 'OTP has expired. Please request a new one.'
        };
    }

    // Check if max attempts exceeded
    if (storedData.attempts >= MAX_ATTEMPTS) {
        clearOTP(identifier);
        return {
            success: false,
            message: 'Maximum attempts exceeded. Please request a new OTP.'
        };
    }

    // Verify OTP
    if (storedData.otp === enteredOTP) {
        clearOTP(identifier);
        return {
            success: true,
            message: 'OTP verified successfully!'
        };
    } else {
        // Increment attempts
        storedData.attempts += 1;
        localStorage.setItem(`otp_${identifier}`, JSON.stringify(storedData));

        const remainingAttempts = MAX_ATTEMPTS - storedData.attempts;
        return {
            success: false,
            message: `Invalid OTP. ${remainingAttempts} attempt(s) remaining.`,
            remainingAttempts
        };
    }
};

/**
 * Check if resend is allowed (cooldown period)
 */
export const canResendOTP = (identifier) => {
    const storedData = getStoredOTP(identifier);

    if (!storedData) {
        return { canResend: true, waitTime: 0 };
    }

    const timeSinceCreation = Date.now() - storedData.createdAt;
    const cooldownMs = RESEND_COOLDOWN_SECONDS * 1000;

    if (timeSinceCreation < cooldownMs) {
        const waitTime = Math.ceil((cooldownMs - timeSinceCreation) / 1000);
        return {
            canResend: false,
            waitTime,
            message: `Please wait ${waitTime} seconds before requesting a new OTP.`
        };
    }

    return { canResend: true, waitTime: 0 };
};

/**
 * Get OTP expiry time remaining in seconds
 */
export const getOTPTimeRemaining = (identifier) => {
    const storedData = getStoredOTP(identifier);

    if (!storedData) {
        return 0;
    }

    const remaining = Math.max(0, Math.ceil((storedData.expiresAt - Date.now()) / 1000));
    return remaining;
};
