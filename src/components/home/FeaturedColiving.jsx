import React from 'react';

const colivingBrands = [
    { name: 'tribe', src: 'https://the-tribe.com/wp-content/uploads/2021/05/logo-1.png' },
    { name: 'flock', src: 'https://flockcoliving.com/wp-content/uploads/2021/01/logo.png' },
    { name: 'yourspace', src: 'https://www.your-space.in/wp-content/uploads/2022/04/Logo-01.png' },
    { name: 'helloworld', src: 'https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1488277271/h1j3y2y5y5y5y5y5y5y5.png' }, // Placeholder or similar styling
    { name: 'isthara', src: 'https://www.isthara.com/images/logo.png' },
    { name: 'covie', src: 'https://thecovie.com/assets/images/logo.png' },
    { name: 'settl', src: 'https://settl.in/assets/images/logo.png' },
    // Duplicity for marquee
    { name: 'tribe', src: 'https://the-tribe.com/wp-content/uploads/2021/05/logo-1.png' },
    { name: 'flock', src: 'https://flockcoliving.com/wp-content/uploads/2021/01/logo.png' },
    { name: 'yourspace', src: 'https://www.your-space.in/wp-content/uploads/2022/04/Logo-01.png' },
];

const FeaturedColiving = () => {
    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="max-w-[90%] mx-auto">

                {/* Header */}
                <div className="text-center mb-12 relative">
                    <h2 className="text-3xl md:text-4xl font-bold inline-block relative z-10">
                        <span className="relative">
                            <span className="absolute -left-4 -top-4 w-12 h-12 bg-yellow-200 rounded-full -z-10 opacity-60"></span>
                            Featured
                        </span> Coliving
                    </h2>
                    <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Brands Marquee */}
                <div className="overflow-hidden relative">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10"></div>

                    <div className="flex gap-16 items-center animate-marquee whitespace-nowrap">
                        {colivingBrands.map((brand, index) => (
                            <div key={index} className="w-32 h-12 md:w-40 md:h-16 flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                                {brand.src && !brand.src.includes('undefined') ? (
                                    <img src={brand.src} alt={brand.name} className="max-w-full max-h-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
                                ) : null}
                                <span className="text-xl font-bold text-gray-400 capitalize hidden" style={{ display: 'none' }}>{brand.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FeaturedColiving;
