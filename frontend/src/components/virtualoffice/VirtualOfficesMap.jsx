import React, { useState } from 'react';
import India from '@svg-maps/india';

const VirtualOfficesMap = () => {
    const [hoveredCity, setHoveredCity] = useState(null);

    const stats = [
        {
            id: 1,
            number: '25+',
            label: 'Cities',
            color: 'text-blue-600'
        },
        {
            id: 2,
            number: '300+',
            label: 'Virtual Offices',
            color: 'text-blue-600'
        },
        {
            id: 3,
            number: '5000+',
            label: 'Company Registered',
            color: 'text-blue-600'
        }
    ];

    // 12 Major cities with their positions (SVG coordinates based on viewBox: 0 0 612 696)
    // Coordinates precisely calibrated based on actual geographical locations and state boundaries
    // Reference points: Delhi (260, 105) as North anchor, Chennai (315, 505) as South-East anchor
    const cities = [
        { name: 'Delhi', x: 260, y: 105 },           // NCT Delhi - North-Central (anchor point)
        { name: 'Gurgaon', x: 255, y: 115 },         // Haryana - Just south of Delhi
        { name: 'Noida', x: 270, y: 110 },           // Uttar Pradesh - Just east of Delhi
        { name: 'Chandigarh', x: 235, y: 75 },       // Chandigarh UT - Punjab/Haryana border, northwest of Delhi (CORRECTED: moved west)
        { name: 'Jaipur', x: 220, y: 145 },          // Rajasthan - Eastern part, southwest of Delhi
        { name: 'Ahmedabad', x: 150, y: 250 },       // Gujarat - Eastern Gujarat, western India
        { name: 'Mumbai', x: 140, y: 330 },          // Maharashtra - Western coast
        { name: 'Pune', x: 165, y: 350 },            // Maharashtra - Inland, southeast of Mumbai
        { name: 'Hyderabad', x: 210, y: 405, featured: true },  // Telangana - Central Telangana (CORRECTED: moved significantly west)
        { name: 'Bangalore', x: 195, y: 490 },       // Karnataka - Southern Karnataka (CORRECTED: moved west and slightly south)
        { name: 'Chennai', x: 315, y: 505 },         // Tamil Nadu - Eastern coast (CORRECTED: moved east to coastline, anchor point)
        { name: 'Kolkata', x: 410, y: 305 },         // West Bengal - Southern WB, near Ganges delta (CORRECTED: moved south)
    ];

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left Content */}
                    <div>
                        {/* Section Header */}
                        <div className="mb-6 md:mb-8">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                Virtual Offices Across India
                            </h2>
                            {/* Blue underline */}
                            <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
                        </div>

                        {/* Description */}
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-8 md:mb-10">
                            With a PAN India network NanoSpace has a wide range of virtual office locations across all major cities in India. Expand your business presence by opting for a virtual office, anywhere in India. Own a Virtual Office anywhere in India and give your business the growth it was looking for. Virtual office helps you to register your business in any city apart from your base city location and enables you to get GST number and business address of particular state for your taxation purpose.
                        </p>

                        {/* Statistics */}
                        <div className="grid grid-cols-3 gap-6 md:gap-8">
                            {stats.map((stat) => (
                                <div key={stat.id}>
                                    <h3 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${stat.color} mb-1`}>
                                        {stat.number}
                                    </h3>
                                    <p className="text-xs md:text-sm text-gray-700 font-medium">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - India Map - INCREASED SIZE */}
                    <div className="relative">
                        <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center bg-gradient-to-br from-blue-50/50 to-white rounded-3xl p-6 md:p-10">
                            <div className="india-map-wrapper w-full h-full relative">
                                <style>{`
                                    .india-map-wrapper svg {
                                        width: 100%;
                                        height: 100%;
                                    }
                                    
                                    .india-map-wrapper path {
                                        fill: #E8E8E8;
                                        stroke: #D1D5DB;
                                        stroke-width: 0.5;
                                        transition: all 0.3s ease;
                                    }
                                    
                                    .india-map-wrapper path:hover {
                                        fill: #FEE2E2;
                                        stroke: #EF4444;
                                    }
                                    
                                    /* Highlight Hyderabad (Telangana) in blue */
                                    .india-map-wrapper path[id="in-tg"] {
                                        fill: #DBEAFE;
                                        stroke: #3B82F6;
                                        stroke-width: 1;
                                    }
                                    
                                    .india-map-wrapper path[id="in-tg"]:hover {
                                        fill: #FEE2E2;
                                        stroke: #EF4444;
                                    }
                                    
                                    /* City markers */
                                    .city-marker {
                                        cursor: pointer;
                                        transition: all 0.2s ease;
                                    }
                                    
                                    .city-marker:hover {
                                        transform: scale(1.3);
                                    }
                                    
                                    .city-marker.featured {
                                        animation: pulse 2s infinite;
                                    }
                                    
                                    @keyframes pulse {
                                        0%, 100% { opacity: 1; }
                                        50% { opacity: 0.6; }
                                    }
                                `}</style>

                                {/* SVG Map */}
                                <svg
                                    viewBox={India.viewBox}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-full h-full"
                                >
                                    {/* Render all states */}
                                    {India.locations.map((location, index) => (
                                        <path
                                            key={index}
                                            id={location.id}
                                            name={location.name}
                                            d={location.path}
                                        />
                                    ))}

                                    {/* City Markers - positioned using percentage */}
                                    {cities.map((city, index) => (
                                        <g key={index}>
                                            {/* Yellow marker dot */}
                                            <circle
                                                cx={city.x}
                                                cy={city.y}
                                                r={city.featured ? "10" : "7"}
                                                fill={city.featured ? "#3B82F6" : "#FBBF24"}
                                                stroke={city.featured ? "#1E40AF" : "#F59E0B"}
                                                strokeWidth="2"
                                                className={`city-marker ${city.featured ? 'featured' : ''}`}
                                                onMouseEnter={() => setHoveredCity(city.name)}
                                                onMouseLeave={() => setHoveredCity(null)}
                                            />

                                            {/* City name label */}
                                            <text
                                                x={city.x}
                                                y={city.y}
                                                dx="12"
                                                dy="5"
                                                fontSize="13"
                                                fill={city.featured ? "#1E40AF" : "#374151"}
                                                fontWeight={city.featured ? "700" : "500"}
                                                className="pointer-events-none select-none"
                                            >
                                                {city.name}
                                            </text>
                                        </g>
                                    ))}
                                </svg>

                                {/* Tooltip for hovered city */}
                                {hoveredCity && (
                                    <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg border border-blue-200 z-10">
                                        <p className="text-sm font-semibold text-gray-900">{hoveredCity}</p>
                                        <p className="text-xs text-gray-600">Virtual Office Available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VirtualOfficesMap;
