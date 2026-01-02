import React from 'react';

const ColivingPromo = ({ cards }) => {
    if (!cards || cards.length === 0) return null;

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <div key={card.id} className={`${card.color} rounded-xl p-6 flex flex-col items-start relative overflow-hidden h-64`}>
                            <div className="w-2/3 z-10">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                                <button className={`${card.buttonColor} font-semibold underline text-sm hover:opacity-80`}>{card.buttonText}</button>
                            </div>
                            {/* Placeholder/Image */}
                            <div className="absolute -right-4 bottom-0 w-32 h-40 bg-gray-200 rounded-tl-3xl opacity-50 flex items-center justify-center">
                                <span className="text-xs text-gray-500">Image</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ColivingPromo;
