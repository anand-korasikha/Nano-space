import React from 'react';

const companies = [
    { name: 'INOX', image: '/images/clients/img1.png' },
    { name: 'OYO', image: '/images/clients/img2.png' },
    { name: 'SDS', image: '/images/clients/img3.png' },
    { name: 'Buttlework', image: '/images/clients/img4.png' },
    { name: 'Credable', image: '/images/clients/img5.png' },
    { name: 'Topper', image: '/images/clients/img6.png' },
    { name: 'Swiggy', image: '/images/clients/img7.png' },
    { name: 'Viacom', image: '/images/clients/img8.png' },
    { name: 'Matrimony', image: '/images/clients/img9.png' },
    { name: 'WHO', image: '/images/clients/img10.png' },
    { name: 'OLO', image: '/images/clients/img11.png' },
    { name: 'Novicom', image: '/images/clients/img12.png' },
];

const TrustedCompanies = () => {
    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-block">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                            Backed By{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                                Leading Companies
                            </span>
                        </h2>
                        <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
                    </div>
                    <p className="text-gray-600 mt-4 text-base md:text-lg max-w-2xl mx-auto">
                        Work with 500+ trusted companies for their workspace solutions
                    </p>
                </div>

                {/* Logos Grid */}
                <div className="trusted-logos-grid grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-1 sm:gap-2 md:gap-2 lg:gap-0">
                    {companies.map((company, index) => (
                        <div
                            key={index}
                            className="group flex items-center justify-center p-2 lg:p-0"
                            style={{
                                animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`
                            }}
                        >
                            {/* Logo */}
                            <img
                                src={company.image}
                                alt={company.name}
                                className="h-8 md:h-14 object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                            />
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12 md:mt-16">
                    <p className="text-gray-700 font-medium text-base md:text-lg mb-4">
                        Ready to join these industry leaders?
                    </p>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-1">
                        Get Started Today
                    </button>
                </div>

            </div>

            {/* Keyframe animation */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
};

export default TrustedCompanies;
