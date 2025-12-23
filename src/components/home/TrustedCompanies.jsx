import React from 'react';

const companies = [
    { name: 'INOX', color: 'text-blue-900' },
    { name: 'Kotak', color: 'text-red-600' },
    { name: 'Razorpay', color: 'text-blue-500' },
    { name: 'Doubtnut', color: 'text-orange-500' },
    { name: 'Credable', color: 'text-yellow-600' },
    { name: 'AccioJob', color: 'text-blue-700' },
    { name: 'Purple', color: 'text-purple-600' },
    { name: 'Classplus', color: 'text-blue-400' },
    { name: 'Hector', color: 'text-orange-600' },
    { name: 'Atlas Law', color: 'text-gray-800' },
    { name: 'Fyp', color: 'text-red-500' },
    { name: 'Easebuzz', color: 'text-indigo-600' },
    { name: 'Zingbus', color: 'text-purple-500' },
    { name: 'BluOne', color: 'text-blue-600' },
    { name: 'Bricz', color: 'text-indigo-800' },
    { name: 'Dahua', color: 'text-red-700' },
    { name: 'Devtown', color: 'text-blue-500' },
    { name: 'Flash', color: 'text-yellow-500' },
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 gap-y-8 sm:gap-y-12">
                    {companies.map((company, index) => (
                        <div key={index} className="flex items-center justify-center p-2 sm:p-4 group cursor-pointer">
                            <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${company.color} opacity-70 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105`}>
                                {company.name}
                            </h3>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TrustedCompanies;
