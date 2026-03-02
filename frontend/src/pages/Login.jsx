import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getFirebaseAuth } from '../lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import './Login.css';

// â”€â”€ helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/** Ensure a phone number has the country code prefix (defaults +91 India). */
const normalisePhone = (phone) => {
    const clean = phone.replace(/\s+/g, '');
    if (clean.startsWith('+')) return clean;
    if (clean.startsWith('0')) return `+91${clean.slice(1)}`;
    return `+91${clean}`;
};

// â”€â”€ component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const Login = () => {
    const [mode, setMode] = useState('login'); // 'login' | 'signup'
    // signup steps: 'form' â†’ 'otp' â†’ 'done'
    const [step, setStep] = useState('form');

    const [formData, setFormData] = useState({
        email: '', password: '', name: '', phone: '', role: 'customer',
    });
    const [otpCode, setOtpCode] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [sending, setSending] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [countdown, setCountdown] = useState(0);

    // Firebase phone auth state
    const recaptchaVerifierRef = useRef(null);
    const confirmationResultRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { login, signup, verifyFirebasePhone } = useAuth();

    // â”€â”€ countdown timer for resend â”€â”€
    useEffect(() => {
        if (countdown <= 0) return;
        const t = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [countdown]);

    // â”€â”€ clean up reCAPTCHA when leaving OTP step â”€â”€
    useEffect(() => {
        return () => {
            if (recaptchaVerifierRef.current) {
                recaptchaVerifierRef.current.clear();
                recaptchaVerifierRef.current = null;
            }
        };
    }, []);

    // â”€â”€ field change â”€â”€
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    };

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // STEP 1 â€” Login or register
    // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const user = await login(formData);
            const from = location.state?.from?.pathname || `/dashboard/${user?.role || 'customer'}`;
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Authentication failed. Please try again.');
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!formData.phone) { setError('Phone number is required for verification.'); return; }
        setSending(true);
        try {
            // 1. Create account in backend
            await signup(formData);

            // 2. Send OTP via Firebase
            await sendOtp();
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setSending(false);
        }
    };

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // Firebase â€” send OTP
    // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const sendOtp = async () => {
        setError('');
        const phone = normalisePhone(formData.phone);

        // Clear previous verifier
        if (recaptchaVerifierRef.current) {
            recaptchaVerifierRef.current.clear();
            recaptchaVerifierRef.current = null;
        }

        // Lazy-init Firebase (throws if env vars not configured)
        const firebaseAuth = getFirebaseAuth();

        const verifier = new RecaptchaVerifier(firebaseAuth, 'recaptcha-container', {
            size: 'invisible',
            callback: () => {},
        });
        recaptchaVerifierRef.current = verifier;

        const result = await signInWithPhoneNumber(firebaseAuth, phone, verifier);
        confirmationResultRef.current = result;
        setStep('otp');
        setCountdown(60);
        setInfo(`OTP sent to ${phone}`);
    };

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // STEP 2 â€” Confirm OTP
    // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        if (otpCode.length !== 6) { setError('Enter the 6-digit OTP.'); return; }
        setVerifying(true);
        try {
            // Confirm OTP with Firebase
            const credential = await confirmationResultRef.current.confirm(otpCode);

            // Get Firebase idToken and send to backend
            const idToken = await credential.user.getIdToken();
            await verifyFirebasePhone(idToken);

            setStep('done');
        } catch (err) {
            if (err.code === 'auth/invalid-verification-code') {
                setError('Incorrect OTP. Please try again.');
            } else if (err.code === 'auth/code-expired') {
                setError('OTP has expired. Please resend.');
            } else {
                setError(err.message || 'Verification failed.');
            }
        } finally {
            setVerifying(false);
        }
    };

    const handleResendOtp = async () => {
        if (countdown > 0) return;
        setSending(true);
        try {
            await sendOtp();
        } catch (err) {
            setError(err.message || 'Failed to resend OTP.');
        } finally {
            setSending(false);
        }
    };

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // STEP 3 â€” Done â†’ redirect
    // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const goToDashboard = () => {
        navigate(`/dashboard/${formData.role || 'customer'}`, { replace: true });
    };

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // Render
    // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    return (
        <div className="login-container">
            {/* Invisible reCAPTCHA container â€” Firebase requires this in the DOM */}
            <div id="recaptcha-container" />

            <div className="login-wrapper">
                <div className="login-card">

                    {/* â”€â”€ LOGIN â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                    {mode === 'login' && (
                        <>
                            <div className="login-header">
                                <h1>Welcome Back</h1>
                                <p>Login to access your dashboard</p>
                            </div>
                            {error && <div className="error-message">{error}</div>}
                            <form onSubmit={handleLoginSubmit} className="login-form">
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" name="email" value={formData.email}
                                        onChange={handleChange} placeholder="Enter your email" required />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" value={formData.password}
                                        onChange={handleChange} placeholder="Enter your password" required />
                                </div>
                                <div className="form-options">
                                    <label className="remember-me"><input type="checkbox" /><span>Remember me</span></label>
                                    <a href="#" className="forgot-password">Forgot Password?</a>
                                </div>
                                <button type="submit" className="submit-btn">Login</button>
                            </form>
                            <div className="form-divider"><span>OR</span></div>
                            <div className="toggle-form">
                                <p>Don't have an account?{' '}
                                    <button type="button" onClick={() => { setMode('signup'); setStep('form'); setError(''); }}
                                        className="toggle-btn">Sign Up</button>
                                </p>
                            </div>
                        </>
                    )}

                    {/* â”€â”€ SIGNUP STEP 1 â€” form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                    {mode === 'signup' && step === 'form' && (
                        <>
                            <div className="login-header">
                                <h1>Create Account</h1>
                                <p>Sign up to get started</p>
                            </div>
                            {error && <div className="error-message">{error}</div>}
                            <form onSubmit={handleSignupSubmit} className="login-form">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="name" value={formData.name}
                                        onChange={handleChange} placeholder="Enter your full name" required />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" name="email" value={formData.email}
                                        onChange={handleChange} placeholder="Enter your email" required />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone}
                                        onChange={handleChange} placeholder="+91 98765 43210" required />
                                    <small className="otp-hint">An OTP will be sent to this number via Firebase.</small>
                                </div>
                                <div className="form-group">
                                    <label>I am a</label>
                                    <select name="role" value={formData.role} onChange={handleChange} required>
                                        <option value="customer">Customer â€“ Looking for spaces</option>
                                        <option value="owner">Owner â€“ Want to list my property</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" value={formData.password}
                                        onChange={handleChange} placeholder="Create a password" required />
                                </div>
                                <button type="submit" className="submit-btn" disabled={sending}>
                                    {sending ? 'Creating account & sending OTPâ€¦' : 'Sign Up & Send OTP'}
                                </button>
                            </form>
                            <div className="toggle-form">
                                <p>Already have an account?{' '}
                                    <button type="button" onClick={() => { setMode('login'); setError(''); }}
                                        className="toggle-btn">Login</button>
                                </p>
                            </div>
                        </>
                    )}

                    {/* â”€â”€ SIGNUP STEP 2 â€” OTP entry â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                    {mode === 'signup' && step === 'otp' && (
                        <>
                            <div className="login-header">
                                <div className="otp-icon">ðŸ“±</div>
                                <h1>Verify Your Phone</h1>
                                <p>Enter the 6-digit OTP sent to<br />
                                    <strong>{normalisePhone(formData.phone)}</strong></p>
                            </div>
                            {info && <div className="info-message">{info}</div>}
                            {error && <div className="error-message">{error}</div>}
                            <form onSubmit={handleVerifyOtp} className="login-form">
                                <div className="form-group">
                                    <label>OTP Code</label>
                                    <input
                                        type="text" inputMode="numeric" maxLength={6}
                                        value={otpCode}
                                        onChange={e => { setOtpCode(e.target.value.replace(/\D/g, '')); setError(''); }}
                                        placeholder="Enter 6-digit OTP"
                                        className="otp-input"
                                        autoFocus
                                    />
                                </div>
                                <button type="submit" className="submit-btn" disabled={verifying || otpCode.length !== 6}>
                                    {verifying ? 'Verifyingâ€¦' : 'Verify OTP'}
                                </button>
                                <div className="otp-resend">
                                    {countdown > 0
                                        ? <span>Resend OTP in {countdown}s</span>
                                        : <button type="button" onClick={handleResendOtp} disabled={sending}
                                            className="toggle-btn">{sending ? 'Sendingâ€¦' : 'Resend OTP'}</button>
                                    }
                                </div>
                            </form>
                            <div className="toggle-form">
                                <button type="button" onClick={() => { setStep('form'); setError(''); setOtpCode(''); }}
                                    className="toggle-btn">â† Back</button>
                            </div>
                        </>
                    )}

                    {/* â”€â”€ SIGNUP STEP 3 â€” done â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                    {mode === 'signup' && step === 'done' && (
                        <div className="otp-done">
                            <div className="otp-success-icon">âœ…</div>
                            <h1>Phone Verified!</h1>
                            <p>Your account has been created and your phone number is verified.</p>
                            <button className="submit-btn" onClick={goToDashboard}>
                                Go to Dashboard
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Login;
