import React from 'react';

const mediaLogos = [
    { name: 'YOURSTORY', color: 'text-red-500' },
    { name: 'The Statesman', color: 'text-gray-900 font-serif' },
    { name: 'ET Prime', color: 'text-red-600 font-bold' },
    { name: 'dailyhunt', color: 'text-blue-500' },
    { name: 'Inc42', color: 'text-red-500 font-bold' },
    { name: 'TECHCIRCLE', color: 'text-gray-800' },
];

const MediaMentions = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-[90%] mx-auto">

                {/* Header */}
                <div className="text-center mb-12 relative">
                    <h2 className="text-3xl md:text-4xl font-bold inline-block relative z-10">
                        <span className="relative">
                            <span className="absolute -left-4 -top-4 w-12 h-12 bg-yellow-200 rounded-full -z-10 opacity-60"></span>
                            Nanospace
                        </span> in the News
                    </h2>
                    <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Logos Row */}
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-80">
                    {mediaLogos.map((logo, index) => (
                        <div key={index} className="text-3xl md:text-4xl font-bold hover:scale-110 transition-transform duration-300 cursor-pointer">
                            <span className={logo.color}>{logo.name}</span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default MediaMentions;
