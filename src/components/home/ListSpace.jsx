import React from 'react';

const ListSpace = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-[90%] mx-auto">

                {/* Banner Card */}
                <div className="bg-[#FFFCE5] rounded-[40px] px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">

                    {/* Left Side: Content */}
                    <div className="w-full md:w-1/2 relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            Showcase Your Vacant Property with Nano Space and Start Earning
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                            List at no cost and rely on our experts completely. Stay organized, manage leads, and track your bookings – all in one place
                        </p>

                        <button className="px-8 py-3 bg-white border border-blue-500 text-blue-500 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-sm">
                            List Your Property
                        </button>
                    </div>

                    {/* Right Side: Illustration */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end relative z-10">
                        {/* Confetti decoration placehodlers */}
                        <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                            <div className="absolute top-10 right-10 w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                            <div className="absolute top-20 right-40 w-3 h-3 bg-blue-400 transform rotate-45"></div>
                            <div className="absolute bottom-10 left-20 w-2 h-2 bg-yellow-400 rounded-full"></div>
                        </div>

                        <img
                            src="https://img.freepik.com/free-vector/happy-business-colleagues-jumping-together_74855-6456.jpg?w=1060&t=st=1686234000~exp=1686234600~hmac=..."
                            alt="Start Earning"
                            className="max-w-full h-auto max-h-[300px] object-contain mix-blend-multiply"
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"; // Fallback
                            }}
                        />
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ListSpace;
