import React from 'react';
import './DiscoverWorkspace.css';

const DiscoverWorkspace = ({ cityName, onEnquireClick }) => {
    return (
        <section className="discover-workspace-section">
            <div className="discover-workspace-wrapper">
                <div className="discover-workspace-card">
                    {/* Left Side - Content Area */}
                    <div className="discover-content-area">
                        <h2 className="discover-main-heading">
                            Discover your perfect workspace with NanoSpace
                        </h2>
                        <p className="discover-sub-heading">
                            Explore Flexible Coworking Solutions, Premium Amenities, and Prime
                            Locations Across {cityName || 'India'}
                        </p>
                        <button
                            className="discover-enquire-btn"
                            onClick={onEnquireClick}
                        >
                            Enquire Now
                        </button>
                    </div>

                    {/* Right Side - Image Area with Gradient Overlay */}
                    <div className="discover-image-area">
                        <div className="discover-image-overlay"></div>
                        <img
                            src="/images/workspace-team.jpg"
                            alt="Professional team collaborating in modern workspace"
                            className="discover-workspace-img"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DiscoverWorkspace;
