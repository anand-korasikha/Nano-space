import React from 'react';

const FounderNote = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-[800px] mx-auto text-center px-4">

                {/* 3D Illustration */}
                <div className="mb-8 flex justify-center">
                    <img
                        src="/images/founder.png"
                        alt="Founder"
                        className="w-48 h-48 object-contain rounded-full shadow-xl mb-4 bg-white"
                    />
                </div>

                {/* Header */}
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    What's the Nanospace Desk?
                </h2>

                {/* Text Content */}
                <p className="text-gray-600 mb-2 leading-relaxed text-lg">
                    Nanospace is helping professionals find their perfect WorkSpace, Living Space & Everything in between.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    As we grow, we think of ourselves as creating a shared Ecosystem, one that lets the Nanospace community Breathe, Connect and Climb to their highest in life.
                </p>

                {/* Signature */}
                <div className="text-blue-600 font-semibold text-xl">
                    Atul Gupta, Founder & CEO
                </div>

            </div>
        </section>
    );
};

export default FounderNote;
