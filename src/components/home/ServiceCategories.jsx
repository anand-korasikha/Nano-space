import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
    {
        id: 1,
        titleLine1: "Coworking",
        titleLine2: "Spaces",
        link: "/coworking",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80",
        type: "image"
    },
    {
        id: 2,
        titleLine1: "Coliving",
        titleLine2: "Spaces",
        link: "/coliving",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
        type: "image"
    },
    {
        id: 3,
        titleLine1: "Virtual",
        titleLine2: "Offices",
        link: "/virtual-office",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80",
        type: "image"
    },
    {
        id: 4,
        titleLine1: "Business",
        titleLine2: "Plans",
        link: "/business-plans",
        type: "graphic",
        bgClass: "bg-purple-100",
        graphicElement: (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-24 h-24">
                {/* Abstract Graphic Placeholder */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-purple-600 opacity-80" fill="currentColor">
                    <path d="M50 0 L100 50 L50 100 L0 50 Z" />
                    <text x="50" y="50" fontSize="20" fill="white" textAnchor="middle" dy=".3em">Offer</text>
                </svg>
                <span className="absolute top-0 left-0 text-xs font-bold text-purple-500 rotate-[-15deg]">20% OFF</span>
                <span className="absolute bottom-0 right-0 text-xs font-bold text-purple-500 rotate-[15deg]">50% OFF</span>
            </div>
        )
    },
    {
        id: 5,
        titleLine1: "List",
        titleLine2: "Property",
        link: "/list-property",
        type: "graphic",
        bgClass: "bg-amber-50",
        graphicElement: (
            <div className="absolute left-4 bottom-0 h-32 w-auto">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" alt="Person" className="h-full w-auto object-contain mix-blend-multiply opacity-90" />
            </div>
        )
    },
    {
        id: 6,
        titleLine1: "Office",
        titleLine2: "Spaces",
        link: "/office-spaces",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
        type: "image"
    }
];

const ServiceCategories = () => {
    return (
        <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
            <div className="max-w-[90%] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((item) => (
                        <Link
                            key={item.id}
                            to={item.link}
                            className={`relative h-40 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group ${item.bgClass || 'bg-gray-100'}`}
                        >
                            {/* Background Image for Image Type */}
                            {item.type === 'image' && (
                                <>
                                    <img
                                        src={item.image}
                                        alt={`${item.titleLine1} ${item.titleLine2}`}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Light Overlay to ensure text readability if needed, though design suggests clean look */}
                                    <div className="absolute inset-0 bg-white/40 group-hover:bg-white/30 transition-colors"></div>
                                    {/* Gradient for text contrast */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/80"></div>
                                </>
                            )}

                            {/* Graphic Element for Graphic Type */}
                            {item.type === 'graphic' && item.graphicElement}

                            {/* Text Content */}
                            <div className="absolute inset-y-0 right-0 w-1/2 flex flex-col justify-center pr-8 text-right z-10">
                                <span className="text-gray-600 text-lg md:text-xl font-light leading-tight">
                                    {item.titleLine1}
                                </span>
                                <span className="text-gray-900 text-xl md:text-2xl font-bold leading-tight">
                                    {item.titleLine2}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceCategories;
