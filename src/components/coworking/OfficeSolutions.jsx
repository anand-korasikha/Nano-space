import React, { useState } from 'react';
import './OfficeSolutions.css';
import EnquiryModal from './EnquiryModal';

const OfficeSolutions = ({ cityName }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOffice, setSelectedOffice] = useState(null);

    const solutions = [
        {
            id: 1,
            title: 'Private Office',
            description: 'Fully furnished Private office for you and your growing team.',
            image: '/images/private-office.jpg',
            buttonText: 'Enquire Now'
        },
        {
            id: 2,
            title: 'Managed Office',
            description: 'Customizable by Nanospace office managed by professionals.',
            image: '/images/managed-office.jpg',
            buttonText: 'Enquire Now'
        },
        {
            id: 3,
            title: 'Enterprise Solution',
            description: 'Fully equipped offices for larger teams with flexibility to scale & customise.',
            image: '/images/enterprise-solution.jpg',
            buttonText: 'Enquire Now'
        }
    ];

    const handleEnquireClick = (solution) => {
        setSelectedOffice(solution);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOffice(null);
    };

    return (
        <>
            <section className="office-solutions-section">
                <div className="office-solutions-container">
                    <h2 className="office-solutions-title">
                        Find Your Perfect Office Solution
                    </h2>

                    <div className="office-solutions-grid">
                        {solutions.map((solution) => (
                            <div key={solution.id} className="office-solution-card">
                                <div className="solution-image-wrapper">
                                    <img
                                        src={solution.image}
                                        alt={solution.title}
                                        className="solution-image"
                                    />
                                </div>
                                <div className="solution-content">
                                    <h3 className="solution-title">{solution.title}</h3>
                                    <p className="solution-description">{solution.description}</p>
                                    <button
                                        className="solution-btn"
                                        onClick={() => handleEnquireClick(solution)}
                                    >
                                        {solution.buttonText}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <EnquiryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                officeType={selectedOffice?.title}
                officeImage={selectedOffice?.image}
            />
        </>
    );
};

export default OfficeSolutions;

