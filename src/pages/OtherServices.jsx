import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Check, Shield } from 'lucide-react';
import servicesData from '../data/servicesData.json';
import './OtherServices.css';

const OtherServices = () => {
    // State for interactive card system
    const [activeCard, setActiveCard] = useState('unified');
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [activeValueIndex, setActiveValueIndex] = useState(0);

    const categoryGridRef = useRef(null);
    const valueGridRef = useRef(null);

    const handleScroll = (ref, setIndex) => {
        if (!ref.current) return;
        const scrollPosition = ref.current.scrollLeft;
        const containerWidth = ref.current.offsetWidth;
        // On mobile, cardWidth is 88% of viewport width and gap is 20px (1.25rem)
        const approxCardWidth = containerWidth * 0.88 + 20;
        const index = Math.round(scrollPosition / approxCardWidth);
        setIndex(index);
    };

    const scrollToCard = (ref, index) => {
        if (!ref.current) return;
        const containerWidth = ref.current.offsetWidth;
        const approxCardWidth = containerWidth * 0.88 + 20;
        ref.current.scrollTo({
            left: index * approxCardWidth,
            behavior: 'smooth'
        });
    };

    // Card data with testimonials
    const cardData = {
        unified: {
            icon: '🌐',
            title: 'Unified Platform',
            description: 'One platform for spaces and professional services',
            features: [
                'Seamless integration across all services',
                'Single dashboard for complete control',
                'Unified billing and payment system'
            ],
            testimonial: 'Streamline all your business needs in one place'
        },
        verified: {
            icon: '✅',
            title: 'Verified Excellence',
            description: 'Verified and curated service providers',
            features: [
                'Background checked professionals',
                'Quality rated by real users',
                'Performance reviewed regularly'
            ],
            testimonial: 'Trust only the best for your business'
        },
        direct: {
            icon: '🔗',
            title: 'Direct Connection',
            description: 'Connect directly without middlemen',
            features: [
                'No commission fees or hidden costs',
                'Transparent pricing always',
                'Direct communication with providers'
            ],
            testimonial: 'Save costs with direct provider connections'
        },
        built: {
            icon: '🎯',
            title: 'Built for All',
            description: 'Perfect for startups, SMEs, and enterprises',
            features: [
                'Scalable solutions that grow with you',
                'Flexible plans for every budget',
                'Enterprise support when you need it'
            ],
            testimonial: 'Grow with us from startup to enterprise'
        }
    };

    const benefits = [
        'One platform for spaces and professional services',
        'Verified and curated service providers',
        'Direct connectivity without middlemen',
        'Built for startups, SMEs, and enterprises'
    ];

    // Category-specific color themes
    const categoryColors = {
        'it-development': {
            primary: '#667eea',
            secondary: '#764ba2',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        'digital-marketing': {
            primary: '#f093fb',
            secondary: '#f5576c',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        'advocates-lawyers': {
            primary: '#4facfe',
            secondary: '#00f2fe',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        'chartered-accountants': {
            primary: '#43e97b',
            secondary: '#38f9d7',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        },
        'mentors-trainers': {
            primary: '#fa709a',
            secondary: '#fee140',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        }
    };

    return (
        <div className="other-services-page">
            {/* Hero Section */}
            <section className="services-hero">
                <div className="services-hero-content">
                    <h1 className="services-hero-title">
                        <span className="gradient-text">Nanospace</span> Other Services
                    </h1>
                    <p className="services-hero-subtitle">
                        A complete business ecosystem designed to support entrepreneurs, startups,
                        professionals, and enterprises at every stage of growth
                    </p>
                    <p className="services-hero-description">
                        Connect with verified professional service providers across multiple domains,
                        all accessible through the Nanospace platform
                    </p>
                </div>
            </section>

            {/* Service Categories Grid */}
            <section className="service-categories-section">
                <div className="container">
                    <h2 className="section-title">Our Service Categories</h2>
                    <p className="section-subtitle">
                        Explore our comprehensive range of professional services
                    </p>

                    <div
                        className="service-categories-grid"
                        ref={categoryGridRef}
                        onScroll={() => handleScroll(categoryGridRef, setActiveCategoryIndex)}
                    >
                        {servicesData.categories.map((category) => {
                            const colors = categoryColors[category.slug] || { primary: '#667eea', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' };
                            const maxVisibleServices = 4;
                            const hasMore = category.subcategories.length > maxVisibleServices;

                            return (
                                <Link
                                    key={category.id}
                                    to={`/services/${category.slug}`}
                                    className="service-category-card"
                                    style={{
                                        '--category-color': colors.primary,
                                        '--category-gradient': colors.gradient
                                    }}
                                >
                                    <div className="category-header">
                                        <div className="category-icon">{category.icon}</div>
                                        <h3 className="category-name">{category.name}</h3>
                                    </div>
                                    <div className="category-divider"></div>
                                    <p className="category-description">{category.description}</p>
                                    <div className="service-list">
                                        {category.subcategories.slice(0, maxVisibleServices).map((service, index) => (
                                            <div key={index} className="service-item">
                                                <Check className="check-icon" size={16} />
                                                <span>{service}</span>
                                            </div>
                                        ))}
                                        {hasMore && (
                                            <div className="service-more">
                                                +{category.subcategories.length - maxVisibleServices} more
                                            </div>
                                        )}
                                    </div>
                                    <div className="verified-badge">
                                        <Shield className="shield-icon" size={18} />
                                        <span>{category.providers.length}+ Professionals</span>
                                    </div>
                                    <div className="explore-button">
                                        <span>Explore Services</span>
                                        <ArrowRight className="arrow-icon" size={18} />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="carousel-dots show-mobile">
                        {servicesData.categories.map((_, index) => (
                            <div
                                key={index}
                                className={`carousel-dot ${activeCategoryIndex === index ? 'active' : ''}`}
                                onClick={() => scrollToCard(categoryGridRef, index)}
                            />
                        ))}
                    </div>


                </div>
            </section>

            {/* How It Works - Modern Timeline */}
            <section className="how-it-works-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">How It Works</h2>
                        <p className="section-subtitle">Simple 3-step process to connect with experts</p>
                    </div>

                    <div className="steps-timeline">
                        <div className="step-card">
                            <div className="step-indicator">
                                <div className="step-number-circle">
                                    <span className="step-number">1</span>
                                </div>
                                <div className="step-icon-emoji">🎯</div>
                            </div>
                            <div className="step-content">
                                <h3 className="step-title">Choose a Category</h3>
                                <p className="step-description">Select the service category that matches your needs</p>
                            </div>
                        </div>

                        <div className="connection-line">
                            <div className="flow-dot"></div>
                            <div className="flow-dot"></div>
                            <div className="flow-dot"></div>
                        </div>

                        <div className="step-card">
                            <div className="step-indicator">
                                <div className="step-number-circle">
                                    <span className="step-number">2</span>
                                </div>
                                <div className="step-icon-emoji">👥</div>
                            </div>
                            <div className="step-content">
                                <h3 className="step-title">Browse Professionals</h3>
                                <p className="step-description">View verified professionals with detailed profiles</p>
                            </div>
                        </div>

                        <div className="connection-line">
                            <div className="flow-dot"></div>
                            <div className="flow-dot"></div>
                            <div className="flow-dot"></div>
                        </div>

                        <div className="step-card">
                            <div className="step-indicator">
                                <div className="step-number-circle">
                                    <span className="step-number">3</span>
                                </div>
                                <div className="step-icon-emoji">💬</div>
                            </div>
                            <div className="step-content">
                                <h3 className="step-title">Connect Directly</h3>
                                <p className="step-description">Reach out via phone or email without any middlemen</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Nanospace - Interactive Value Proposition */}
            <section className="why-nanospace-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">Why Choose Us</div>
                        <h2 className="section-title">Why Nanospace Stands Out</h2>
                        <p className="section-subtitle">The complete platform for modern businesses</p>
                    </div>

                    {/* Interactive Cards Grid */}
                    <div
                        className="value-grid"
                        ref={valueGridRef}
                        onScroll={() => handleScroll(valueGridRef, setActiveValueIndex)}
                    >
                        {/* Card 1: Unified Platform */}
                        <div
                            className="value-card"
                            data-card="unified"
                            onClick={() => setActiveCard('unified')}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="value-card-icon">🌐</div>
                            <h3 className="value-title">Unified Platform</h3>
                            <p className="value-description">One platform for spaces and professional services</p>
                        </div>

                        {/* Card 2: Verified Excellence */}
                        <div
                            className="value-card"
                            data-card="verified"
                            onClick={() => setActiveCard('verified')}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="value-card-icon">✅</div>
                            <h3 className="value-title">Verified Excellence</h3>
                            <p className="value-description">Verified and curated service providers</p>
                        </div>

                        {/* Card 3: Direct Connection */}
                        <div
                            className="value-card"
                            data-card="direct"
                            onClick={() => setActiveCard('direct')}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="value-card-icon">🔗</div>
                            <h3 className="value-title">Direct Connection</h3>
                            <p className="value-description">Connect directly without middlemen</p>
                        </div>

                        {/* Card 4: Built for All */}
                        <div
                            className="value-card"
                            data-card="built"
                            onClick={() => setActiveCard('built')}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="value-card-icon">🎯</div>
                            <h3 className="value-title">Built for All</h3>
                            <p className="value-description">Perfect for startups, SMEs, and enterprises</p>
                        </div>
                    </div>

                    <div className="carousel-dots show-mobile">
                        {['unified', 'verified', 'direct', 'built'].map((_, index) => (
                            <div
                                key={index}
                                className={`carousel-dot ${activeValueIndex === index ? 'active' : ''}`}
                                onClick={() => scrollToCard(valueGridRef, index)}
                            />
                        ))}
                    </div>

                    {/* Interactive Detail Panel */}
                    <div className={`detail-panel ${activeCard ? 'active' : ''}`}>
                        <div className="detail-content">
                            <div className="detail-header">
                                <span className="detail-icon">{cardData[activeCard]?.icon}</span>
                                <h2 className="detail-title">{cardData[activeCard]?.title}</h2>
                            </div>
                            <p className="detail-description">{cardData[activeCard]?.description}</p>
                            <ul className="detail-features">
                                {cardData[activeCard]?.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                            <div className="testimonial">
                                💡 "{cardData[activeCard]?.testimonial}"
                            </div>
                        </div>
                    </div>

                    {/* Business Audience Badges */}
                    <div className="business-audience">
                        <h4 className="audience-title">Perfect for:</h4>
                        <div className="badge-container">
                            <div className="business-badge startup">
                                <span className="badge-icon">🚀</span>
                                <span className="badge-text">Startups</span>
                            </div>
                            <div className="business-badge sme">
                                <span className="badge-icon">🏢</span>
                                <span className="badge-text">SMEs</span>
                            </div>
                            <div className="business-badge enterprise">
                                <span className="badge-icon">🏛️</span>
                                <span className="badge-text">Enterprises</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OtherServices;
