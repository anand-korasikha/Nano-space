import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Home, Building2, MapPin, IndianRupee, Upload,
    CheckCircle2, Phone, Mail, User, ChevronRight,
    ChevronLeft, Star, Camera, Video, Mic, Info,
    Circle, CheckCircle, MoreHorizontal
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { submitProperty } from '../services/propertyService';
import { sendEmailOTP, sendPhoneOTP } from '../services/otpService';
import LocationPicker from '../components/common/LocationPicker';
import InlineOTPVerification from '../components/common/InlineOTPVerification';
import './Sell.css';

const Sell = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    // Form data state
    const [formData, setFormData] = useState({
        // Step 1: Basic
        lookingTo: 'Sell', // Sell, Rent, PG
        propertyCategory: 'Residential', // Residential, Commercial
        propertyType: '', // Flat, House, Villa, etc.

        // Step 2: Location
        city: '',
        locality: '',
        project: '',
        address: '',
        mapLocation: null,

        // Step 3: Profile
        bhk: '',
        bathrooms: '',
        balconies: '',
        furnishing: '', // Furnished, Semi-furnished, Unfurnished
        floorNo: '',
        totalFloors: '',
        propertyAge: '',
        area: '',

        // Step 4: Media
        images: [],
        videos: [],

        // Step 5: Pricing & Contact
        price: '',
        maintenance: '',
        description: '',
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
        amenities: []
    });

    // Verification states (Step 5)
    const [emailVerified, setEmailVerified] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [showEmailOTP, setShowEmailOTP] = useState(false);
    const [showPhoneOTP, setShowPhoneOTP] = useState(false);

    // Categories and types
    const categories = {
        Residential: ['Flat/Apartment', 'Independent House / Villa', 'Independent / Builder Floor', '1 RK/ Studio Apartment', 'Serviced Apartment', 'Farmhouse', 'Other'],
        Commercial: ['Office Space', 'Shop / Showroom', 'Commercial Land', 'Warehouse/ Godown', 'Industrial Shed', 'Industrial Building', 'Other']
    };

    const furnishings = ['Furnished', 'Semi-furnished', 'Unfurnished'];
    const pAge = ['0-1 years', '1-5 years', '5-10 years', '10+ years'];

    // Completion Score Calculation
    const [propertyScore, setPropertyScore] = useState(0);

    useEffect(() => {
        const fields = Object.values(formData);
        const filled = fields.filter(f => f && (Array.isArray(f) ? f.length > 0 : true)).length;
        const total = fields.length;
        const score = Math.round((filled / total) * 100);
        setPropertyScore(score);
    }, [formData]);

    const handleNext = () => setActiveStep(prev => Math.min(prev + 1, 5));
    const handleBack = () => setActiveStep(prev => Math.max(prev - 1, 1));

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePillSelect = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        if (!user) {
            alert('Please login to list property');
            navigate('/login');
            return;
        }

        if (!emailVerified || !phoneVerified) {
            alert('Please verify your contact details first.');
            return;
        }

        const submission = {
            name: `${formData.bhk ? formData.bhk + ' BHK ' : ''}${formData.propertyType} in ${formData.locality}`,
            type: formData.propertyType,
            city: formData.city,
            location: `${formData.locality}, ${formData.project}`,
            address: formData.address || formData.locality,
            area: formData.area,
            description: formData.description,
            price: formData.price,
            period: formData.lookingTo === 'Rent' ? 'month' : 'total',
            contactName: formData.ownerName,
            contactEmail: formData.ownerEmail,
            contactPhone: formData.ownerPhone,
            images: [], // In real app, upload to S3 first
            amenities: formData.amenities,
            latitude: formData.mapLocation?.lat,
            longitude: formData.mapLocation?.lng
        };

        try {
            const result = await submitProperty(submission);
            if (result) {
                setSubmitted(true);
                setTimeout(() => navigate('/dashboard/owner'), 3000);
            }
        } catch (err) {
            alert('Submission failed: ' + err.message);
        }
    };

    // OTP Handlers (Existing logic integration)
    const triggerEmailOTP = async () => {
        if (!formData.ownerEmail) return alert('Enter email');
        const res = await sendEmailOTP(formData.ownerEmail);
        if (res.success) setShowEmailOTP(true);
    };

    const triggerPhoneOTP = async () => {
        if (!formData.ownerPhone) return alert('Enter phone');
        const res = await sendPhoneOTP(formData.ownerPhone);
        if (res.success) setShowPhoneOTP(true);
    };

    // --- SUB-COMPONENTS FOR STEPS ---

    const Step1 = () => (
        <div className="step-content animate-fade-in">
            <div className="field-section">
                <span className="field-label">I'm looking to</span>
                <div className="radio-group">
                    {['Sell', 'Rent', 'PG'].map(opt => (
                        <div
                            key={opt}
                            className={`custom-radio ${formData.lookingTo === opt ? 'active' : ''}`}
                            onClick={() => handlePillSelect('lookingTo', opt)}
                        >
                            <div className="radio-circle"></div>
                            <span className="radio-label">{opt}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="field-section">
                <span className="field-label">What kind of property do you have?</span>
                <div className="radio-group mb-4">
                    {['Residential', 'Commercial'].map(opt => (
                        <div
                            key={opt}
                            className={`custom-radio ${formData.propertyCategory === opt ? 'active' : ''}`}
                            onClick={() => handlePillSelect('propertyCategory', opt)}
                        >
                            <div className="radio-circle"></div>
                            <span className="radio-label">{opt}</span>
                        </div>
                    ))}
                </div>

                <div className="pill-grid mt-4">
                    {categories[formData.propertyCategory].map(type => (
                        <div
                            key={type}
                            className={`option-pill ${formData.propertyType === type ? 'active' : ''}`}
                            onClick={() => handlePillSelect('propertyType', type)}
                        >
                            {type}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const Step2 = () => (
        <div className="step-content">
            <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                    <label className="field-label">City</label>
                    <div className="input-field-group">
                        <MapPin size={18} color="#94a3b8" />
                        <input name="city" value={formData.city} onChange={handleInputChange} placeholder="e.g. Hyderabad" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="field-label">Locality / Area</label>
                    <div className="input-field-group">
                        <Home size={18} color="#94a3b8" />
                        <input name="locality" value={formData.locality} onChange={handleInputChange} placeholder="e.g. Madhapur" />
                    </div>
                </div>
            </div>

            <div className="form-group mb-6">
                <label className="field-label">Project / Society Name</label>
                <div className="input-field-group">
                    <Building2 size={18} color="#94a3b8" />
                    <input name="project" value={formData.project} onChange={handleInputChange} placeholder="e.g. My Home Abhra" />
                </div>
            </div>

            <div className="field-section">
                <label className="field-label">Pin on Map</label>
                <LocationPicker
                    value={formData.mapLocation}
                    onChange={(loc) => setFormData(prev => ({ ...prev, mapLocation: loc }))}
                    defaultCenter={[17.385044, 78.486671]}
                />
            </div>
        </div>
    );

    const Step3 = () => (
        <div className="step-content">
            <div className="field-section">
                <span className="field-label">Add Room Details</span>
                <div className="mb-4">
                    <p className="text-sm font-medium text-slate-500 mb-2">No. of Bedrooms</p>
                    <div className="number-selector">
                        {[1, 2, 3, 4, '5+'].map(n => (
                            <div
                                key={n}
                                className={`num-pill ${formData.bhk == n ? 'active' : ''}`}
                                onClick={() => handlePillSelect('bhk', n)}
                            >{n}</div>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <p className="text-sm font-medium text-slate-500 mb-2">No. of Bathrooms</p>
                    <div className="number-selector">
                        {[1, 2, 3, 4, '4+'].map(n => (
                            <div
                                key={n}
                                className={`num-pill ${formData.bathrooms == n ? 'active' : ''}`}
                                onClick={() => handlePillSelect('bathrooms', n)}
                            >{n}</div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="field-section">
                <span className="field-label">Furnishing</span>
                <div className="pill-grid">
                    {furnishings.map(f => (
                        <div
                            key={f}
                            className={`option-pill ${formData.furnishing === f ? 'active' : ''}`}
                            onClick={() => handlePillSelect('furnishing', f)}
                        >{f}</div>
                    ))}
                </div>
            </div>

            <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                    <label className="field-label">Plot / Built-up Area</label>
                    <div className="input-field-group">
                        <input name="area" type="number" value={formData.area} onChange={handleInputChange} placeholder="Total Area" />
                        <span className="input-unit">sq.ft.</span>
                    </div>
                </div>
                <div className="form-group">
                    <label className="field-label">Age of Property</label>
                    <div className="input-field-group">
                        <select name="propertyAge" value={formData.propertyAge} onChange={handleInputChange}>
                            <option value="">Select Age</option>
                            {pAge.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    const Step4 = () => (
        <div className="step-content">
            <div className="media-upload-container">
                <div className="media-dropzone" onClick={() => document.getElementById('image-input').click()}>
                    <Camera size={48} strokeWidth={1.5} />
                    <h4>Add Photos of your property</h4>
                    <p>Buyers love seeing high quality photos before contact</p>
                    <input id="image-input" type="file" multiple hidden onChange={handleImageUpload} />
                </div>

                <div className="media-hints">
                    <div className="hint-box">
                        <Video size={18} className="mb-2" />
                        <p>Adding a video tour increases responses by 3x</p>
                    </div>
                    <div className="hint-box">
                        <Mic size={18} className="mb-2" />
                        <p>Voice-over descriptions help set expectations</p>
                    </div>
                    <div className="hint-box">
                        <Info size={18} className="mb-2" />
                        <p>Exterior, Living Room, and Kitchen are most important</p>
                    </div>
                </div>

                {formData.images.length > 0 && (
                    <div className="flex gap-2 mt-4">
                        <CheckCircle2 color="#22c55e" size={20} />
                        <span className="font-semibold text-slate-700">{formData.images.length} Photos Selected</span>
                    </div>
                )}
            </div>
        </div>
    );

    const Step5 = () => (
        <div className="step-content">
            <div className="field-section">
                <label className="field-label">Expected Price</label>
                <div className="input-field-group" style={{ maxWidth: '400px' }}>
                    <IndianRupee size={18} color="#94a3b8" />
                    <input name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="Enter total amount" />
                </div>
            </div>

            <div className="owner-details-section">
                <h3 className="field-label">Contact Information</h3>
                <div className="grid gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="form-group">
                        <label className="text-sm font-semibold mb-1">Full Name</label>
                        <div className="input-field-group">
                            <User size={18} color="#94a3b8" />
                            <input name="ownerName" value={formData.ownerName} onChange={handleInputChange} placeholder="John Doe" />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-semibold">Email</label>
                            {emailVerified ? <span className="verified-badge"><CheckCircle size={14} /> Verified</span> :
                                <button className="text-xs text-blue-600 font-bold" onClick={triggerEmailOTP}>Verify</button>}
                        </div>
                        <div className="input-field-group">
                            <Mail size={18} color="#94a3b8" />
                            <input name="ownerEmail" value={formData.ownerEmail} onChange={handleInputChange} placeholder="john@example.com" disabled={emailVerified} />
                        </div>
                        {showEmailOTP && <InlineOTPVerification identifier={formData.ownerEmail} type="email" onVerified={() => { setEmailVerified(true); setShowEmailOTP(false); }} onCancel={() => setShowEmailOTP(false)} />}
                    </div>

                    <div className="form-group">
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-semibold">Phone Number</label>
                            {phoneVerified ? <span className="verified-badge"><CheckCircle size={14} /> Verified</span> :
                                <button className="text-xs text-blue-600 font-bold" onClick={triggerPhoneOTP}>Verify</button>}
                        </div>
                        <div className="input-field-group">
                            <Phone size={18} color="#94a3b8" />
                            <input name="ownerPhone" value={formData.ownerPhone} onChange={handleInputChange} placeholder="+91 XXXX" disabled={phoneVerified} />
                        </div>
                        {showPhoneOTP && <InlineOTPVerification identifier={formData.ownerPhone} type="phone" onVerified={() => { setPhoneVerified(true); setShowPhoneOTP(false); }} onCancel={() => setShowPhoneOTP(false)} />}
                    </div>
                </div>
            </div>

            <div className="form-group mt-8">
                <label className="field-label">Tell us more (Optional)</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Add neighborhood features, local market proximity, etc..."
                    style={{ width: '100%', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1rem', minHeight: '120px', outline: 'none' }}
                />
            </div>
        </div>
    );

    // --- MAIN RENDER ---

    const steps = [
        { id: 1, title: 'Basic Details', subtitle: 'Type & Purpose' },
        { id: 2, title: 'Location Details', subtitle: 'Locality & Map' },
        { id: 3, title: 'Property Profile', subtitle: 'Rooms & Area' },
        { id: 4, title: 'Photos & Videos', subtitle: 'Visual Tour' },
        { id: 5, title: 'Pricing & Other', subtitle: 'Final Submission' }
    ];

    if (submitted) {
        return (
            <div className="sell-success-overlay">
                <div className="success-content">
                    <CheckCircle2 size={80} className="success-icon-animated" />
                    <h2>Listing Received!</h2>
                    <p>Your property is now under verification by our experts. You'll be notified once it's live.</p>
                    <button className="btn-continue" onClick={() => navigate('/dashboard/owner')}>Go to Dashboard</button>
                </div>
            </div>
        );
    }

    return (
        <div className="sell-page-container">
            {/* Breadcrumb Hero Section */}
            <div className="sell-breadcrumb-hero">
                <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=200&fit=crop"
                    alt="Sell Banner"
                    className="hero-bg-image"
                />
                <div className="hero-overlay"></div>
                <div className="breadcrumb-container">
                    <nav className="breadcrumb">
                        <Link to="/" className="breadcrumb-link">
                            <Home size={14} />
                            <span>Home</span>
                        </Link>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">Sell</span>
                    </nav>
                </div>
            </div>

            <div className="sell-layout">
                {/* Sidebar */}
                <aside className="sell-sidebar">
                    <div className="sidebar-card">
                        <div className="step-tracker">
                            {steps.map(step => (
                                <div key={step.id} className={`step-item ${activeStep === step.id ? 'active' : ''} ${activeStep > step.id ? 'completed' : ''}`}>
                                    <div className="step-icon">
                                        {activeStep > step.id ? <CheckCircle size={18} /> : <span>{step.id}</span>}
                                    </div>
                                    <div className="step-info">
                                        <span className="step-title">{step.title} {activeStep > step.id && <span className="step-edit" onClick={() => setActiveStep(step.id)}>Edit</span>}</span>
                                        <span className="step-subtitle">{step.subtitle}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-card score-card">
                        <div className="score-progress">
                            <svg className="score-svg" width="70" height="70">
                                <circle className="score-circle-bg" cx="35" cy="35" r="32" />
                                <circle
                                    className="score-circle-val"
                                    cx="35" cy="35" r="32"
                                    strokeDasharray="201.06"
                                    strokeDashoffset={201.06 - (201.06 * propertyScore) / 100}
                                />
                            </svg>
                            <span className="score-text">{propertyScore}%</span>
                        </div>
                        <div className="score-info">
                            <h4>Property Score</h4>
                            <p>Complete your profile for better visibility</p>
                        </div>
                    </div>
                </aside>

                {/* Form Area */}
                <main className="sell-form-container animate-fade-in" key={activeStep}>
                    <div className="step-header">
                        <h2>{steps[activeStep - 1].title}</h2>
                        <p>{activeStep === 1 ? 'Welcome back, let\'s fill out some basic details' : 'Almost there! Help us know your property better'}</p>
                    </div>

                    {activeStep === 1 && <Step1 />}
                    {activeStep === 2 && <Step2 />}
                    {activeStep === 3 && <Step3 />}
                    {activeStep === 4 && <Step4 />}
                    {activeStep === 5 && <Step5 />}

                    <div className="form-actions">
                        {activeStep > 1 ? (
                            <button className="btn-back" onClick={handleBack}>
                                <ChevronLeft size={20} />
                                Back
                            </button>
                        ) : <div></div>}

                        {activeStep < 5 ? (
                            <button className="btn-continue" onClick={handleNext}>
                                Continue
                                <ChevronRight size={20} />
                            </button>
                        ) : (
                            <button
                                className="btn-continue"
                                onClick={handleSubmit}
                                disabled={!emailVerified || !phoneVerified}
                            >
                                Submit Listing
                            </button>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Sell;
