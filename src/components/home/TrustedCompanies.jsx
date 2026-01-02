import React from 'react';

const companies = [
    { name: 'INOX', image: 'images/clients/img1.png' },
    { name: 'Kotak', image: 'images/clients/img2.png' },
    { name: 'Razorpay', image: 'images/clients/img3.png' },
    { name: 'Doubtnut', image: 'images/clients/img4.png' },
    { name: 'Credable', image: 'images/clients/img5.png' },
    { name: 'AccioJob', image: 'images/clients/img6.png' },
    { name: 'Purple', image: 'images/clients/img7.png' },
    { name: 'Classplus', image: 'images/clients/img8.png' },
    { name: 'Hector', image: 'images/clients/img9.png' },
    { name: 'Atlas Law', image: 'images/clients/img10.png' },
    { name: 'Fyp', image: 'images/clients/img11.png' },
    { name: 'Easebuzz', image: 'images/clients/img12.png' },

];

const TrustedCompanies = () => {
    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="max-w-[90%] mx-auto px-4 md:px-0">

                {/* Header */}
                <div className="text-center mb-10 md:mb-16 relative">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold inline-block relative z-10">
                        <span className="relative">
                            <span className="absolute -left-3 sm:-left-4 -top-3 sm:-top-4 w-10 sm:w-12 h-10 sm:h-12 bg-yellow-200 rounded-full -z-10 opacity-60"></span>
                            Trusted
                        </span> By Top Companies
                    </h2>
                    <div className="w-20 md:w-24 h-1 bg-blue-500 mx-auto mt-3 md:mt-4 rounded-full"></div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                    {companies.map((company, index) => (
                        <div key={index} className="flex items-center justify-center p-2 sm:p-3 group cursor-pointer bg-gray-50 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300">
                            <img
                                src={company.image}
                                alt={company.name}
                                className="w-full h-10 sm:h-12 md:h-16 object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TrustedCompanies;
