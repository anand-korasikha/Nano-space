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
                    What is the Nano Space Desk?
                </h2>

                {/* Text Content */}
                <p className="text-gray-600 mb-2 leading-relaxed text-lg">
                    Nano Space empowers professionals to discover the ideal workspace, living space, and everything that connects the two.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    As we continue to grow, we envision Nano Space as a thriving shared ecosystem. The one that enables our community to breathe freely, connect meaningfully, and rise toward their highest potential in life
                </p>

                {/* Signature */}
                <div className="text-blue-600 font-semibold text-xl">
                    Rafi, Founder & CEO
                </div>

            </div>
        </section>
    );
};

export default FounderNote;
