import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2, RefreshCw, X } from 'lucide-react';
import './InlineOTPVerification.css';

const InlineOTPVerification = ({ identifier, type = 'email', onVerified, onCancel }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);
    const inputRefs = useRef([]);

    // Handle resend cooldown timer
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => {
                setResendCooldown(resendCooldown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    // Focus first input on mount
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, value) => {
        // Only allow digits
        if (value && !/^\d$/.test(value)) {
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Check if OTP is complete
        if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
            handleVerify(newOtp.join(''));
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
            } else {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            }
        }
        // Handle left arrow
        else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        // Handle right arrow
        else if (e.key === 'ArrowRight' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').trim();

        if (/^\d{6}$/.test(pastedData)) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);
            inputRefs.current[5]?.focus();
            handleVerify(pastedData);
        }
    };

    const handleVerify = async (otpCode) => {
        setIsVerifying(true);
        setError('');

        // Import OTP service dynamically to avoid circular dependencies
        const { verifyOTP } = await import('../../services/otpService');

        const result = verifyOTP(identifier, otpCode);

        if (result.success) {
            setIsVerifying(false);
            onVerified();
        } else {
            setError(result.message);
            setIsVerifying(false);
            // Clear OTP inputs on error
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        }
    };

    const handleResend = async () => {
        if (resendCooldown === 0) {
            setOtp(['', '', '', '', '', '']);
            setError('');
            inputRefs.current[0]?.focus();
            setResendCooldown(60);

            // Import OTP service dynamically
            const { sendEmailOTP, sendPhoneOTP } = await import('../../services/otpService');

            if (type === 'email') {
                sendEmailOTP(identifier);
            } else {
                sendPhoneOTP(identifier);
            }
        }
    };

    return (
        <div className="inline-otp-verification">
            <div className="inline-otp-header">
                <span className="inline-otp-label">
                    Enter 6-digit code sent to {type === 'email' ? 'your email' : 'your phone'}
                </span>
                <button
                    type="button"
                    className="inline-otp-close"
                    onClick={onCancel}
                    disabled={isVerifying}
                >
                    <X size={16} />
                </button>
            </div>

            <div className="inline-otp-inputs">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className={`inline-otp-digit ${digit ? 'filled' : ''}`}
                        disabled={isVerifying}
                    />
                ))}
            </div>

            {error && (
                <div className="inline-otp-error">
                    {error}
                </div>
            )}

            <div className="inline-otp-actions">
                <button
                    type="button"
                    className="inline-otp-resend"
                    onClick={handleResend}
                    disabled={resendCooldown > 0 || isVerifying}
                >
                    <RefreshCw size={14} />
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
                </button>
            </div>

            {isVerifying && (
                <div className="inline-otp-verifying">
                    <div className="spinner-small"></div>
                    <span>Verifying...</span>
                </div>
            )}
        </div>
    );
};

export default InlineOTPVerification;
