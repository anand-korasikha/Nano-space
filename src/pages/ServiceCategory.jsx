import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Code, Database, Brain, Cloud, TrendingUp, Users, Megaphone, Palette, Scale, FileText, Shield, Gavel, Calculator, PieChart, Building2, Briefcase, GraduationCap, Target, TrendingUp as Growth, BookOpen } from 'lucide-react';
import servicesData from '../data/servicesData.json';
import ServiceProviderCard from '../components/services/ServiceProviderCard';
import './ServiceCategory.css';

const ServiceCategory = () => {
    const { category } = useParams();

    // Find the category data
    const categoryData = servicesData.categories.find(
        cat => cat.slug === category
    );

    // If category not found, show error
    if (!categoryData) {
        return (
            <div className="category-not-found">
                <h1>Category Not Found</h1>
                <p>The service category you're looking for doesn't exist.</p>
                <Link to="/other-services" className="back-link">
                    <ArrowLeft size={20} />
                    Back to All Services
                </Link>
            </div>
        );
    }

    // Define background images for each category
    const categoryBackgrounds = {
        'it-development': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&h=400&fit=crop',
        'digital-marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=400&fit=crop',
        'advocates-lawyers': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&h=400&fit=crop',
        'chartered-accountants': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&h=400&fit=crop',
        'mentors-trainers': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&h=400&fit=crop'
    };

    // Service-specific icons mapping
    const serviceIcons = {
        'it-development': [Code, Database, Brain, Cloud],
        'digital-marketing': [TrendingUp, Users, Megaphone, Palette],
        'advocates-lawyers': [Scale, FileText, Shield, Gavel],
        'chartered-accountants': [Calculator, PieChart, Building2, Briefcase],
        'mentors-trainers': [GraduationCap, Target, Growth, BookOpen]
    };

    // Service badge colors
    const serviceColors = ['#7C3AED', '#10B981', '#F59E0B', '#3B82F6'];

    const heroImage = categoryBackgrounds[categoryData.slug] || categoryBackgrounds['it-development'];
    const icons = serviceIcons[categoryData.slug] || serviceIcons['it-development'];

    return (
        <div className="service-category-page">
            {/* Hero Section with Background Image */}
            <div className="service-hero-section">
                <div className="service-hero-overlay"></div>
                <img
                    src={heroImage}
                    alt={categoryData.name}
                    className="service-hero-image"
                />

                {/* Breadcrumb overlaying the image */}
                <div className="breadcrumb-container overlay-breadcrumb">
                    <div className="breadcrumb">
                        <Link to="/other-services" className="breadcrumb-link">
                            <ArrowLeft size={18} />
                            All Services
                        </Link>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">{categoryData.name}</span>
                    </div>
                </div>

                <div className="service-hero-content">
                    <div className="category-icon-large">{categoryData.icon}</div>
                    <h1>{categoryData.name}</h1>
                    <p>{categoryData.description}</p>
                </div>
            </div>

            {/* Category Stats */}
            <section className="category-stats-section">
                <div className="container">
                    <div className="category-stats">
                        <div className="stat-item">
                            <span className="stat-number">{categoryData.providers.length}+</span>
                            <span className="stat-label">Verified Professionals</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{categoryData.subcategories.length}</span>
                            <span className="stat-label">Specializations</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Areas - Modern Cards with Animated Icons */}
            <section className="subcategories-section">
                <div className="container">
                    <h2 className="section-title">Service Areas</h2>
                    <div className="subcategories-grid">
                        {categoryData.subcategories.map((service, index) => {
                            const IconComponent = icons[index];
                            return (
                                <div
                                    key={index}
                                    className="service-card"
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                        '--badge-color': serviceColors[index],
                                        '--badge-glow': `${serviceColors[index]}40`
                                    }}
                                >
                                    <div
                                        className="service-icon-badge"
                                        style={{
                                            background: `${serviceColors[index]}15`,
                                            border: `2px solid ${serviceColors[index]}30`
                                        }}
                                    >
                                        <IconComponent
                                            size={36}
                                            color={serviceColors[index]}
                                            strokeWidth={2}
                                            className="service-icon"
                                        />
                                    </div>
                                    <div className="service-card-content">
                                        <h3 className="service-title">{service}</h3>
                                        <p className="service-description">
                                            {categoryData.serviceDescriptions?.[index] ||
                                                `Professional ${service.toLowerCase()} services tailored to your business needs`}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Service Providers */}
            <section className="providers-section">
                <div className="container">
                    <h2 className="section-title">Our Verified Professionals</h2>
                    <p className="section-subtitle">
                        Connect directly with experienced professionals in {categoryData.name.toLowerCase()}
                    </p>

                    <div className="providers-grid">
                        {categoryData.providers.map((provider) => (
                            <ServiceProviderCard key={provider.id} provider={provider} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceCategory;
