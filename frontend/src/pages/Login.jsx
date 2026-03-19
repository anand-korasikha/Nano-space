import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { sendPhoneOTP, verifyOTP, resetPassword } from '../services/otpService';
import { signInWithGoogle as firebaseSignInWithGoogle } from '../lib/firebase';
import logoSvg from '../assets/logo.svg';
import './Login.css';

// ── helpers ─────────────────────────────────────────────────────────────────

/** Ensure a phone number has the country code prefix (defaults +91 India). */
const normalisePhone = (phone) => {
    const clean = phone.replace(/\s+/g, '');
    if (clean.startsWith('+')) return clean;
    if (clean.startsWith('0')) return `+91${clean.slice(1)}`;
    return `+91${clean}`;
};

// ── component ───────────────────────────────────────────────────────────────

const Login = () => {
    const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
    // signup steps: 'form' → 'otp' → 'done'
    // forgot steps: 'request' → 'otp' → 'reset' → 'done'
    const [step, setStep] = useState('form');

    const [forgotIdentifier, setForgotIdentifier] = useState('');
    const [forgotOtp, setForgotOtp] = useState('');
    const [forgotNewPassword, setForgotNewPassword] = useState('');
    const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');

    const [formData, setFormData] = useState({
        email: '', password: '', name: '', phone: '', role: 'customer',
    });
    const [otpCode, setOtpCode] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [sending, setSending] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [googleStep, setGoogleStep] = useState(null); // null | 'role-select'
    const [googleCredential, setGoogleCredential] = useState(null);
    const [countdown, setCountdown] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();
    const { login, signup, loginWithGoogle } = useAuth();

    // ── countdown timer for resend ──
    useEffect(() => {
        if (countdown <= 0) return;
        const t = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [countdown]);

    // ── field change ──
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    };

    // ────────────────────────────────────────────────────────────────────────
    // STEP 1 — Login or register
    // ────────────────────────────────────────────────────────────────────────
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
            await sendOtp();
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setSending(false);
        }
    };

    // ────────────────────────────────────────────────────────────────────────
    // FORGOT PASSWORD handlers
    // ────────────────────────────────────────────────────────────────────────
    const handleForgotRequest = async (e) => {
        e.preventDefault();
        setError('');
        if (!forgotIdentifier) { setError('Please enter your registered phone number.'); return; }
        const phone = normalisePhone(forgotIdentifier.trim());
        setSending(true);
        try {
            const result = await sendPhoneOTP(phone);
            if (!result.success) throw new Error(result.message);
            setForgotIdentifier(phone); // store normalised form
            setStep('otp');
            setCountdown(60);
            const devHint = result.devOtp ? ` [DEV] OTP: ${result.devOtp}` : '';
            setInfo(`OTP sent to ${phone}.${devHint}`);
        } catch (err) {
            setError(err.message || 'Failed to send OTP.');
        } finally {
            setSending(false);
        }
    };

    const handleForgotVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        if (forgotOtp.length !== 6) { setError('6-digit OTP required.'); return; }
        // Advance to password reset — OTP is verified together with the new password on submit
        setStep('reset');
    };

    const handleForgotResendOtp = async () => {
        if (countdown > 0) return;
        setSending(true);
        try {
            const result = await sendPhoneOTP(forgotIdentifier);
            if (!result.success) throw new Error(result.message);
            setCountdown(60);
            const devHint = result.devOtp ? ` [DEV] OTP: ${result.devOtp}` : '';
            setInfo(`OTP re-sent to ${forgotIdentifier}.${devHint}`);
        } catch (err) {
            setError(err.message || 'Failed to resend OTP.');
        } finally {
            setSending(false);
        }
    };

    const handleForgotReset = async (e) => {
        e.preventDefault();
        setError('');
        if (forgotNewPassword.length < 6) { setError('Password must be at least 6 characters.'); return; }
        if (forgotNewPassword !== forgotConfirmPassword) { setError('Passwords do not match.'); return; }
        setVerifying(true);
        try {
            const result = await resetPassword(forgotIdentifier, forgotOtp, forgotNewPassword);
            if (!result.success) throw new Error(result.message);
            setStep('done');
            setInfo('Password updated successfully!');
        } catch (err) {
            setError(err.message || 'Password reset failed.');
        } finally {
            setVerifying(false);
        }
    };

    // ────────────────────────────────────────────────────────────────────────
    // Backend — send OTP
    // ────────────────────────────────────────────────────────────────────────
    const sendOtp = async () => {
        setError('');
        const phone = normalisePhone(formData.phone);

        const result = await sendPhoneOTP(phone);
        if (!result.success) throw new Error(result.message);

        setStep('otp');
        setCountdown(60);
        const devHint = result.devOtp ? ` [DEV] OTP: ${result.devOtp}` : '';
        setInfo(`OTP sent to ${phone}.${devHint}`);
    };

    // ────────────────────────────────────────────────────────────────────────
    // STEP 2 — Confirm OTP
    // ────────────────────────────────────────────────────────────────────────
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        if (otpCode.length !== 6) { setError('6-digit OTP required.'); return; }
        setVerifying(true);
        try {
            // Verify OTP with backend
            const phone = normalisePhone(formData.phone);
            const result = await verifyOTP(phone, otpCode);
            if (!result.success) throw new Error(result.message);

            // OTP verified — register the user
            await signup(formData);

            setStep('done');
        } catch (err) {
            setError(err.message || 'Verification failed.');
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
            setError(err.message || 'Failed to re-link.');
        } finally {
            setSending(false);
        }
    };

    // ────────────────────────────────────────────────────────────────────────
    // Google Sign-In
    // ────────────────────────────────────────────────────────────────────────
    const handleGoogleSignIn = async () => {
        setError('');
        setGoogleLoading(true);
        try {
            // Must be called synchronously from the click — no dynamic import
            const result = await firebaseSignInWithGoogle();
            setGoogleCredential(result);
            setGoogleStep('role-select');
        } catch (err) {
            if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
                setError(err.message || 'Google sign-in failed. Please try again.');
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleGoogleRoleSelect = async (role) => {
        setGoogleLoading(true);
        setError('');
        try {
            const idToken = await googleCredential.user.getIdToken();
            const user = await loginWithGoogle(idToken, role);
            const from = location.state?.from?.pathname || `/dashboard/${user?.role || 'customer'}`;
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Google sign-in failed. Please try again.');
            setGoogleStep(null);
            setGoogleCredential(null);
        } finally {
            setGoogleLoading(false);
        }
    };

    // ────────────────────────────────────────────────────────────────────────
    // STEP 3 — Done → redirect
    // ────────────────────────────────────────────────────────────────────────
    const goToDashboard = () => {
        navigate(`/dashboard/${formData.role || 'customer'}`, { replace: true });
    };

    // ────────────────────────────────────────────────────────────────────────
    // Render
    // ────────────────────────────────────────────────────────────────────────
    return (
        <div className="login-container">
            <div className="login-bg"></div>
            <div className="accent-border-bar"></div>
            <div className="scanline-effect"></div>

            <div className="login-layout">
                <div className="panel-divider-line"></div>

                {/* ── LEFT PANEL: HERO ────────────────────────────────── */}
                <div className="login-left-panel">
                    <div className="hero-content">
                        <div className="hero-tagline">Secure access portal</div>
                        <h1 className="hero-main-title">
                            Gateway
                            <span className="keyword-accent">Nexus</span>
                            <span className="outline-text">Verified.</span>
                        </h1>
                        <p className="hero-paragraph">
                            Access the most premium coworking and private spaces across the globe. Secure, verified, and ready for you.
                        </p>
                    </div>

                    <div className="hero-stats-row">
                        <div className="stat-item-box">
                            <div className="stat-value">500<span>+</span></div>
                            <div className="stat-label-text">Verified Spaces</div>
                        </div>
                        <div className="stat-item-box">
                            <div className="stat-value">99<span>%</span></div>
                            <div className="stat-label-text">Trust Score</div>
                        </div>
                        <div className="stat-item-box">
                            <div className="stat-value">0<span>ms</span></div>
                            <div className="stat-label-text">Validation Latency</div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT PANEL: AUTH ────────────────────────────────── */}
                <div className="login-right-panel">
                    <div className={`auth-card-nexus ${mode === 'signup' ? 'signup-active' : ''}`}>

                        {/* ── LOGIN MODE ─────────────────────── */}
                        {mode === 'login' && (
                            <>
                                <h2 className="card-nexus-title">Welcome Back</h2>
                                <p className="card-nexus-subtitle">
                                    No account?
                                    <button onClick={() => { setMode('signup'); setStep('form'); setError(''); }} className="link-alt">
                                        Register →
                                    </button>
                                </p>

                                {error && <div className="nexus-error-box">{error}</div>}

                                <form onSubmit={handleLoginSubmit} className="nexus-form">
                                    <div className="form-field-group">
                                        <label>Email ID</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="nexus-input"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@nexus.io"
                                            required
                                        />
                                    </div>
                                    <div className="form-field-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="nexus-input"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                    <div className="form-meta-row">
                                        <label className="nexus-checkbox-label">
                                            <input type="checkbox" className="nexus-checkbox" />
                                            <span>Keep me logged in</span>
                                        </label>
                                        <button type="button" className="link-forgot" onClick={() => { setMode('forgot'); setStep('request'); setError(''); setInfo(''); setForgotIdentifier(''); setForgotOtp(''); setForgotNewPassword(''); setForgotConfirmPassword(''); }}>Forgot Password?</button>
                                    </div>
                                    <button type="submit" className="nexus-btn-primary">
                                        <span>Login</span>
                                    </button>
                                </form>

                                <div className="nexus-divider">
                                    <div className="nexus-divider-line"></div>
                                    <span className="nexus-divider-text">Or</span>
                                    <div className="nexus-divider-line"></div>
                                </div>

                                <button type="button" className="nexus-btn-social" onClick={handleGoogleSignIn} disabled={googleLoading}>
                                    {googleLoading ? (
                                        <span className="nexus-loading-spinner"></span>
                                    ) : (
                                        <svg className="social-icon-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                    )}
                                    <span>{googleLoading ? 'Signing in...' : 'Signin with Google'}</span>
                                </button>
                            </>
                        )}

                        {/* ── SIGNUP MODE: FORM STEP ─────────────────────── */}
                        {mode === 'signup' && step === 'form' && (
                            <>
                                <h2 className="card-nexus-title">Create Account</h2>
                                <p className="card-nexus-subtitle">
                                    Already verified?
                                    <button onClick={() => { setMode('login'); setError(''); }} className="link-alt">
                                        Login →
                                    </button>
                                </p>

                                {error && <div className="nexus-error-box">{error}</div>}

                                <form onSubmit={handleSignupSubmit} className="nexus-form">
                                    <div className="form-field-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="nexus-input"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter Full Name"
                                            required
                                        />
                                    </div>
                                    <div className="form-field-group">
                                        <label>Email ID</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="nexus-input"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="identity@nexus.io"
                                            required
                                        />
                                    </div>
                                    <div className="form-field-group">
                                        <label>Mobile Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="nexus-input"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 00000 00000"
                                            required
                                        />
                                        <small className="otp-hint">Secure With OTP</small>
                                    </div>
                                    <div className="form-field-group">
                                        <label>Select</label>
                                        <select
                                            name="role"
                                            className="nexus-select"
                                            value={formData.role}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="customer">Customer - Search for Spaces</option>
                                            <option value="owner">Owner - List my space</option>
                                        </select>
                                    </div>
                                    <div className="form-field-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="nexus-input"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Generate complex key"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="nexus-btn-primary" disabled={sending}>
                                        {sending && <span className="nexus-loading-spinner"></span>}
                                        <span>{sending ? 'Sending OTP...' : 'SignIn'}</span>
                                    </button>
                                </form>
                            </>
                        )}

                        {/* ── SIGNUP MODE: OTP STEP ─────────────────────── */}
                        {mode === 'signup' && step === 'otp' && (
                            <>
                                <div className="otp-display-header">
                                    <div className="otp-symbol">🔐</div>
                                    <h2 className="card-nexus-title">Validation</h2>
                                    <p className="card-nexus-subtitle">
                                        Intercepting 6-digit transmission at <br />
                                        <strong>{normalisePhone(formData.phone)}</strong>
                                    </p>
                                </div>

                                {info && <div className="nexus-info-box">{info}</div>}
                                {error && <div className="nexus-error-box">{error}</div>}

                                <form onSubmit={handleVerifyOtp} className="nexus-form">
                                    <div className="form-field-group">
                                        <label>Enter OTP</label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={6}
                                            className="nexus-input otp-nexus-input"
                                            value={otpCode}
                                            onChange={e => { setOtpCode(e.target.value.replace(/\D/g, '')); setError(''); }}
                                            placeholder="000 000"
                                            autoFocus
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="nexus-btn-primary" disabled={verifying || otpCode.length !== 6}>
                                        {verifying && <span className="nexus-loading-spinner"></span>}
                                        <span>{verifying ? 'decrypting...' : 'Validate OTP'}</span>
                                    </button>
                                    <div className="resend-nexus-row">
                                        {countdown > 0
                                            ? <span>Re-link in {countdown}s</span>
                                            : <span>Link dead. <button type="button" onClick={handleResendOtp} disabled={sending} className="btn-nexus-link">Reconnect →</button></span>
                                        }
                                    </div>
                                </form>
                                <div className="text-center mt-2">
                                    <button type="button" onClick={() => { setStep('form'); setError(''); setOtpCode(''); }} className="btn-nexus-link">
                                       
                                    </button>
                                </div>
                            </>
                        )}

                        {/* ── FORGOT PASSWORD: REQUEST STEP ─────────── */}
                        {mode === 'forgot' && step === 'request' && (
                            <>
                                <h2 className="card-nexus-title">Forgot Password</h2>
                                <p className="card-nexus-subtitle">
                                    Remember it?{' '}
                                    <button onClick={() => { setMode('login'); setStep('form'); setError(''); }} className="link-alt">
                                        Login →
                                    </button>
                                </p>
                                {error && <div className="nexus-error-box">{error}</div>}
                                <form onSubmit={handleForgotRequest} className="nexus-form">
                                    <div className="form-field-group">
                                        <label>Registered Phone Number</label>
                                        <input
                                            type="tel"
                                            className="nexus-input"
                                            value={forgotIdentifier}
                                            onChange={e => { setForgotIdentifier(e.target.value); setError(''); }}
                                            placeholder="+91 00000 00000"
                                            required
                                        />
                                        <small className="otp-hint">OTP will be sent to this number</small>
                                    </div>
                                    <button type="submit" className="nexus-btn-primary" disabled={sending}>
                                        {sending && <span className="nexus-loading-spinner"></span>}
                                        <span>{sending ? 'Sending OTP...' : 'Send OTP'}</span>
                                    </button>
                                </form>
                            </>
                        )}

                        {/* ── FORGOT PASSWORD: OTP STEP ─────────────────── */}
                        {mode === 'forgot' && step === 'otp' && (
                            <>
                                <div className="otp-display-header">
                                    <div className="otp-symbol">🔑</div>
                                    <h2 className="card-nexus-title">Verify Identity</h2>
                                    <p className="card-nexus-subtitle">
                                        Enter the OTP sent to<br />
                                        <strong>{forgotIdentifier}</strong>
                                    </p>
                                </div>
                                {info && <div className="nexus-info-box">{info}</div>}
                                {error && <div className="nexus-error-box">{error}</div>}
                                <form onSubmit={handleForgotVerifyOtp} className="nexus-form">
                                    <div className="form-field-group">
                                        <label>Enter OTP</label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={6}
                                            className="nexus-input otp-nexus-input"
                                            value={forgotOtp}
                                            onChange={e => { setForgotOtp(e.target.value.replace(/\D/g, '')); setError(''); }}
                                            placeholder="000 000"
                                            autoFocus
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="nexus-btn-primary" disabled={forgotOtp.length !== 6}>
                                        <span>Verify OTP</span>
                                    </button>
                                    <div className="resend-nexus-row">
                                        {countdown > 0
                                            ? <span>Resend in {countdown}s</span>
                                            : <span>Didn't receive? <button type="button" onClick={handleForgotResendOtp} disabled={sending} className="btn-nexus-link">Resend →</button></span>
                                        }
                                    </div>
                                </form>
                                <div className="text-center mt-2">
                                    <button type="button" onClick={() => { setStep('request'); setError(''); setForgotOtp(''); }} className="btn-nexus-link">
                                        ← Back
                                    </button>
                                </div>
                            </>
                        )}

                        {/* ── FORGOT PASSWORD: RESET STEP ───────────────── */}
                        {mode === 'forgot' && step === 'reset' && (
                            <>
                                <h2 className="card-nexus-title">Set New Password</h2>
                                <p className="card-nexus-subtitle">Choose a strong new password</p>
                                {error && <div className="nexus-error-box">{error}</div>}
                                <form onSubmit={handleForgotReset} className="nexus-form">
                                    <div className="form-field-group">
                                        <label>New Password</label>
                                        <input
                                            type="password"
                                            className="nexus-input"
                                            value={forgotNewPassword}
                                            onChange={e => { setForgotNewPassword(e.target.value); setError(''); }}
                                            placeholder="Min. 6 characters"
                                            required
                                        />
                                    </div>
                                    <div className="form-field-group">
                                        <label>Confirm New Password</label>
                                        <input
                                            type="password"
                                            className="nexus-input"
                                            value={forgotConfirmPassword}
                                            onChange={e => { setForgotConfirmPassword(e.target.value); setError(''); }}
                                            placeholder="Repeat password"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="nexus-btn-primary" disabled={verifying}>
                                        {verifying && <span className="nexus-loading-spinner"></span>}
                                        <span>{verifying ? 'Updating...' : 'Update Password'}</span>
                                    </button>
                                </form>
                            </>
                        )}

                        {/* ── FORGOT PASSWORD: DONE ────────────────────── */}
                        {mode === 'forgot' && step === 'done' && (
                            <div className="success-nexus-view">
                                <div className="success-nexus-icon">✓</div>
                                <h1 className="success-nexus-title">Password Reset</h1>
                                <p className="success-nexus-text">
                                    Your password has been updated. You can now log in with your new password.
                                </p>
                                <button className="nexus-btn-primary" onClick={() => { setMode('login'); setStep('form'); setError(''); setInfo(''); }}>
                                    <span>Back to Login</span>
                                </button>
                            </div>
                        )}

                        {/* ── SIGNUP MODE: DONE ─────────────────────── */}
                        {mode === 'signup' && step === 'done' && (
                            <div className="success-nexus-view">
                                <div className="success-nexus-icon">✓</div>
                                <h1 className="success-nexus-title">Verified</h1>
                                <p className="success-nexus-text">
                                    Identity confirmed. Your local node is now active and secure.
                                </p>
                                <button className="nexus-btn-primary" onClick={goToDashboard}>
                                    <span>Enter Workspace</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── GOOGLE ROLE POPUP ─────────────────────────────────── */}
            {googleStep === 'role-select' && (
                <div className="google-role-overlay" onClick={(e) => { if (e.target === e.currentTarget && !googleLoading) { setGoogleStep(null); setGoogleCredential(null); setError(''); } }}>
                    <div className="google-role-modal">
                        <div className="google-role-avatar">
                            <img src={logoSvg} alt="Nanospace" className="google-role-logo" />
                        </div>
                        <h2 className="google-role-title">You're joining as?</h2>
                        <p className="google-role-email">{googleCredential?.user?.displayName} · {googleCredential?.user?.email}</p>

                        {error && <div className="nexus-error-box" style={{ marginBottom: '1rem' }}>{error}</div>}

                        <div className="google-role-cards">
                            <button
                                className="google-role-card"
                                disabled={googleLoading}
                                onClick={() => handleGoogleRoleSelect('customer')}
                            >
                                <span className="google-role-card-icon">🔍</span>
                                <span className="google-role-card-label">Customer</span>
                                <span className="google-role-card-desc">Search for Spaces</span>
                                {googleLoading && <span className="nexus-loading-spinner" style={{ position: 'absolute', top: '10px', right: '10px' }}></span>}
                            </button>
                            <button
                                className="google-role-card"
                                disabled={googleLoading}
                                onClick={() => handleGoogleRoleSelect('owner')}
                            >
                                <span className="google-role-card-icon">🏢</span>
                                <span className="google-role-card-label">Owner</span>
                                <span className="google-role-card-desc">List My Space</span>
                                {googleLoading && <span className="nexus-loading-spinner" style={{ position: 'absolute', top: '10px', right: '10px' }}></span>}
                            </button>
                        </div>

                        <button
                            className="btn-nexus-link"
                            style={{ marginTop: '1.2rem', display: 'block', textAlign: 'center', width: '100%' }}
                            onClick={() => { setGoogleStep(null); setGoogleCredential(null); setError(''); }}
                            disabled={googleLoading}
                        >
                            ← Back
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
