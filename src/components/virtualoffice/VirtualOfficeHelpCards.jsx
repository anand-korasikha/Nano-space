import React from 'react';
import { ArrowRight } from 'lucide-react';

const VirtualOfficeHelpCards = ({ city }) => {
    // Default help cards data (same for all cities)
    const defaultHelpCards = [
        {
            id: 1,
            title: "Virtual Office for the First Time?",
            description: "Get transparent virtual office space pricing, zero setup hassle and instant document support.",
            buttonText: "Enquire Now",
            buttonLink: "#contact",
            bgColor: "bg-blue-50",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            imageAlt: "Woman working on laptop"
        },
        {
            id: 2,
            title: "Facing GST or Business Registration issues?",
            description: `Get 100% complete virtual office address with the highest approval success rate.`,
            buttonText: "Enquire Now",
            buttonLink: "#contact",
            bgColor: "bg-blue-50",
            image: "https://miro.medium.com/v2/1*O1-uwBoA700raJeI6BjDPw.png",
            imageAlt: "Businessman thinking"
        }
    ];

    const helpCards = city?.helpCards || defaultHelpCards;

    const handleEnquireClick = (e, link) => {
        e.preventDefault();
        const contactSection = document.querySelector(link);
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-6">
                    {helpCards.map((card) => (
                        <div
                            key={card.id}
                            className={`${card.bgColor} rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group`}
                        >
                            <div className="flex flex-col md:flex-row items-center md:items-center p-6 md:p-8 gap-6">
                                {/* Image Section */}
                                <div className="flex-shrink-0">
                                    <div className="w-32 h-32 md:w-36 md:h-36">
                                        <img
                                            src={card.image}
                                            alt={card.imageAlt || card.title}
                                            className="w-full h-full object-cover rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                                        {card.title}
                                    </h3>
                                    <p className="text-gray-700 text-sm md:text-base mb-5 leading-relaxed">
                                        {card.description}
                                    </p>
                                    <a
                                        href={card.buttonLink}
                                        onClick={(e) => handleEnquireClick(e, card.buttonLink)}
                                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-base group/link transition-colors"
                                    >
                                        {card.buttonText}
                                        <ArrowRight
                                            size={18}
                                            className="group-hover/link:translate-x-1 transition-transform duration-200"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VirtualOfficeHelpCards;
