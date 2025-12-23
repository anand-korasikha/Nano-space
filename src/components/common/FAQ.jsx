import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import faqData from '../../data/faqData.json';
import './FAQ.css';

const FAQ = ({ category = 'coworking' }) => {
    const [openIndex, setOpenIndex] = useState(null);

    // Get FAQs for the specified category
    const faqs = faqData[category] || [];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (faqs.length === 0) {
        return null;
    }

    return (
        <section className="faq-section">
            <div className="faq-container">
                {/* Section Header */}
                <div className="faq-header">
                    <h2 className="faq-title">Frequently Asked Questions</h2>
                    <p className="faq-subtitle">
                        Find answers to common questions about our services
                    </p>
                </div>

                {/* FAQ List */}
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.id}
                            className={`faq-item ${openIndex === index ? 'active' : ''}`}
                        >
                            {/* Question */}
                            <button
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span className="faq-question-text">{faq.question}</span>
                                <span className="faq-icon">
                                    {openIndex === index ? (
                                        <ChevronUp size={20} />
                                    ) : (
                                        <ChevronDown size={20} />
                                    )}
                                </span>
                            </button>

                            {/* Answer */}
                            <div
                                className={`faq-answer ${openIndex === index ? 'open' : ''}`}
                            >
                                <p className="faq-answer-text">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
