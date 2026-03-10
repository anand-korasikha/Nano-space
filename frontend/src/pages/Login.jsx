import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getFirebaseAuth } from '../lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
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
    const [mode, setMode] = useState('login'); // 'login' | 'signup'
    // signup steps: 'form' → 'otp' → 'done'
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
    const { login, signup } = useAuth();

    // ── countdown timer for resend ──
    useEffect(() => {
        if (countdown <= 0) return;
        const t = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [countdown]);

    // ── clean up reCAPTCHA when leaving OTP step ──
    useEffect(() => {
        return () => {
            if (recaptchaVerifierRef.current) {
                recaptchaVerifierRef.current.clear();
                recaptchaVerifierRef.current = null;
            }
        };
    }, []);

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
    // Firebase — send OTP
    // ────────────────────────────────────────────────────────────────────────
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
            callback: () => { },
        });
        recaptchaVerifierRef.current = verifier;

        const result = await signInWithPhoneNumber(firebaseAuth, phone, verifier);
        confirmationResultRef.current = result;
        setStep('otp');
        setCountdown(60);
        setInfo(`Sequence transmitted to ${phone}`);
    };

    // ────────────────────────────────────────────────────────────────────────
    // STEP 2 — Confirm OTP
    // ────────────────────────────────────────────────────────────────────────
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        if (otpCode.length !== 6) { setError('6-digit sequence required.'); return; }
        setVerifying(true);
        try {
            // Confirm OTP with Firebase
            const credential = await confirmationResultRef.current.confirm(otpCode);

            // Get Firebase idToken and send to backend signup
            const idToken = await credential.user.getIdToken();
            await signup(formData, idToken);

            setStep('done');
        } catch (err) {
            if (err.code === 'auth/invalid-verification-code') {
                setError('Invalid sequence detected.');
            } else if (err.code === 'auth/code-expired') {
                setError('Sequence identity expired.');
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
            setError(err.message || 'Failed to re-link.');
        } finally {
            setSending(false);
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
                        {/* Invisible reCAPTCHA container — Firebase requires this in the DOM */}
                        <div id="recaptcha-container" />

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
                                        <a href="#" className="link-forgot">Forgot Password</a>
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

                                <button type="button" className="nexus-btn-social">
                                    <svg className="social-icon-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    <span>Signin with Google</span>
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
                                        <span>{sending ? 'Routing OTP...' : 'SignIn'}</span>
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
                                        <label>OTP Sequence</label>
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
                                        <span>{verifying ? 'decrypting...' : 'Validate Sequence'}</span>
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
                                        ← Abort Sequence
                                    </button>
                                </div>
                            </>
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
        </div>
    );
};

export default Login;
