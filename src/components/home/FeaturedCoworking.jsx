import React from 'react';

const brands = [
    { name: 'wework', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/WeWork_Logo.svg/2560px-WeWork_Logo.svg.png' },
    { name: 'awfis', src: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Awfis_Logo.jpg' },
    { name: 'innov8', src: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Innov8_Coworking_Logo.png' },
    { name: '91springboard', src: 'https://upload.wikimedia.org/wikipedia/commons/3/36/91springboard_logo.png' },
    { name: 'instaoffice', src: 'https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1485860715/i8q6q5q5q5q5q5q5q5q5.png' },
    { name: 'indiqube', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/IndiQube_Logo.png/800px-IndiQube_Logo.png' },
    { name: 'bhive', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Bhive_workspace_logo.png/800px-Bhive_workspace_logo.png' },
    // Duplicates for marquee
    { name: 'wework', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/WeWork_Logo.svg/2560px-WeWork_Logo.svg.png' },
    { name: 'awfis', src: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Awfis_Logo.jpg' },
    { name: 'innov8', src: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Innov8_Coworking_Logo.png' },
    { name: '91springboard', src: 'https://upload.wikimedia.org/wikipedia/commons/3/36/91springboard_logo.png' },
];

const features = [
    { icon: '📋', text: 'Company Registration' },
    { icon: '📝', text: 'GST Registration' },
    { icon: '🏢', text: 'Business Address' },
    { icon: '📮', text: 'Mailing Address' },
    { icon: '👩‍💼', text: 'Reception Services' },
    { icon: '👥', text: 'Meeting Room Access' },
];

const FeaturedCoworking = () => {
    return (
        <section className="py-12 md:py-16 bg-white overflow-hidden">
            <div className="max-w-[90%] mx-auto px-4 md:px-8 lg:px-16">

                {/* Header */}
                <div className="text-center mb-8 md:mb-12 relative">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold inline-block relative z-10">
                        <span className="relative">
                            <span className="absolute -left-3 sm:-left-4 -top-3 sm:-top-4 w-10 sm:w-12 h-10 sm:h-12 bg-yellow-200 rounded-full -z-10 opacity-60"></span>
                            Featured
                        </span> Coworking
                    </h2>
                    <div className="w-20 md:w-24 h-1 bg-blue-500 mx-auto mt-3 md:mt-4 rounded-full"></div>
                </div>

                {/* Brands Marquee */}
                <div className="overflow-hidden mb-12 md:mb-16 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-white to-transparent z-10"></div>

                    <div className="flex gap-8 sm:gap-12 md:gap-16 items-center animate-marquee whitespace-nowrap">
                        {brands.map((brand, index) => (
                            <div key={index} className="w-24 h-10 sm:w-32 sm:h-12 md:w-40 md:h-16 flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                                {/* Using text placeholders if images fail or for simplicity, but creating structure for images */}
                                {brand.src && !brand.src.includes('undefined') ? (
                                    <img src={brand.src} alt={brand.name} className="max-w-full max-h-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
                                ) : null}
                                <span className="text-lg sm:text-xl font-bold text-gray-400 capitalize hidden">{brand.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Banner */}
                <div className="bg-[#FFFDF2] rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-yellow-100 flex flex-col md:flex-row relative">
                    {/* Background Gradient Effect - Subtle */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 via-white to-white opacity-50 z-0"></div>

                    {/* Left Content */}
                    <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-12 relative z-10">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
                            Book Your Virtual Office <span className="text-yellow-500">with Nanospace</span>
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 md:mb-8">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 sm:gap-3">
                                    <span className="text-xl sm:text-2xl">{feature.icon}</span>
                                    <span className="text-xs sm:text-sm font-medium text-gray-700">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mt-4 text-gray-600 font-medium text-sm sm:text-base">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                <span>+91 9311 32 8049</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <span>hello@nanospace.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Image Mask styling */}
                    <div className="w-full md:w-2/5 relative min-h-[200px] sm:min-h-[250px] md:min-h-auto">
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#FFFDF2] z-10 w-16 sm:w-24 -ml-1 hidden md:block"></div>
                        <img
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
                            alt="Office Meeting"
                            className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FeaturedCoworking;
