import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import './OTPInput.css';

const OTPInput = ({ onComplete, onResend, identifier, type = 'email', isVerifying = false }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
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
            onComplete(newOtp.join(''));
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                // If current input is empty, focus previous
                inputRefs.current[index - 1]?.focus();
            } else {
                // Clear current input
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

        // Check if pasted data is 6 digits
        if (/^\d{6}$/.test(pastedData)) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);
            inputRefs.current[5]?.focus();
            onComplete(pastedData);
        }
    };

    const handleResend = () => {
        if (resendCooldown === 0) {
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
            setResendCooldown(60);
            onResend();
        }
    };

    return (
        <div className="otp-input-container">
            <div className="otp-header">
                <h3>Enter Verification Code</h3>
                <p>
                    We've sent a 6-digit code to your {type}
                    <br />
                    <strong>{identifier}</strong>
                </p>
            </div>

            <div className="otp-inputs">
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
                        className={`otp-digit ${digit ? 'filled' : ''}`}
                        disabled={isVerifying}
                    />
                ))}
            </div>

            <div className="otp-actions">
                <button
                    type="button"
                    className="resend-btn"
                    onClick={handleResend}
                    disabled={resendCooldown > 0 || isVerifying}
                >
                    <RefreshCw size={16} />
                    {resendCooldown > 0 ? (
                        <span>Resend in {resendCooldown}s</span>
                    ) : (
                        <span>Resend Code</span>
                    )}
                </button>
            </div>

            {isVerifying && (
                <div className="otp-verifying">
                    <div className="spinner"></div>
                    <span>Verifying...</span>
                </div>
            )}
        </div>
    );
};

export default OTPInput;
