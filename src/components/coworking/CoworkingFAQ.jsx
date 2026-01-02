import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import faqData from '../../data/faq.json';

const CoworkingFAQ = ({ pageType = 'coworking', faqs: customFaqs }) => {
    const [openIndex, setOpenIndex] = useState(null);

    // Get FAQs based on page type or use custom FAQs
    const faqs = customFaqs || faqData[pageType] || faqData.coworking;

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="mx-6 md:mx-12 lg:mx-20">
                {/* Section Header */}
                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex-shrink-0"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Frequently Asked Questions
                    </h2>
                </div>

                {/* Subtitle */}
                <p className="text-center text-gray-600 mb-12 max-w-4xl mx-auto">
                    {pageType === 'virtualoffice'
                        ? 'Here are the frequently asked questions about virtual offices. We have gathered the most crucial ones to help you make the right decision for your business.'
                        : pageType === 'coliving'
                            ? 'Here are the frequently asked questions about coliving spaces. We have gathered the most crucial ones to help you make the right decision.'
                            : 'Here are the frequently asked questions that people enquired online before choosing a virtual office. We have gathered the most crucial ones and answer here to help you in making the right decision.'
                    }
                </p>

                {/* FAQ Accordion */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
                        >
                            {/* Question */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors duration-200"
                            >
                                <span className="font-semibold text-gray-900 pr-4">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    size={20}
                                    className={`flex-shrink-0 text-gray-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* Answer */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                    }`}
                            >
                                <div className="px-5 pb-5 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoworkingFAQ;
