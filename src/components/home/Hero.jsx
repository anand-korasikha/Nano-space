import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, TrendingUp } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import CityGrid, { cityIconMap } from './CityGrid';
import HeroCarousel from './HeroCarousel';
import heroContentData from '../../data/heroContent.json';
import ServiceModal from './ServiceModal';
import './Hero.css';
import './CarouselBubbles.css';

const Hero = ({ pageType = 'home' }) => {
    const content = heroContentData[pageType] || heroContentData.home;
    const navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState(null);
    const [searchType, setSearchType] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    // Helper function to get icon path
    const getCityIconPath = (cityName) => {
        return cityIconMap[cityName] || '/svg/default-city.svg';
    };

    // Handle search button click
    const handleSearch = () => {
        if (!searchCity) {
            alert('Please select a city');
            return;
        }

        let route = '';
        const cityPath = searchCity.toLowerCase();

        if (pageType === 'home') {
            if (!searchType) {
                alert('Please select what you are looking for');
                return;
            }

            if (searchType === 'Coworking Space') {
                route = `/coworking/${cityPath}`;
            } else if (searchType === 'Coliving Space') {
                route = `/coliving/${cityPath}`;
            } else if (searchType === 'Virtual Office') {
                route = `/virtual-office/${cityPath}`;
            }
        } else if (pageType === 'coworking') {
            route = `/coworking/${cityPath}`;
        } else if (pageType === 'coliving') {
            route = `/coliving/${cityPath}`;
        } else if (pageType === 'virtualoffice') {
            route = `/virtual-office/${cityPath}`;
        }

        if (route) {
            navigate(route);
        }
    };

    return (
        <>

            <div className="relative min-h-[auto] md:min-h-[100vh] flex flex-col lg:flex-row overflow-visible bg-transparent">
                {/* Left Column: Enhanced Content */}
                <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col justify-start pt-[80px] lg:pt-[1.5rem] px-4 sm:px-6 md:px-10 lg:px-16 pb-8 lg:pb-0 z-10">
                    <div className="max-w-3xl">
                        {/* Title with Enhanced Typography and Bounce Animation */}
                        <div className="mb-6 lg:mb-8 text-center lg:text-left">
                            <h1 className="text-[2.15rem] leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-3 tracking-tight">
                                <span className="hero-word-1">{content.title.line1}</span>
                                <br />
                                <span className="hero-gradient-bounce">{content.title.line2.trim()} </span>
                                <span className="hero-word-3">{content.title.line3.trim()}</span>
                            </h1>
                            <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto lg:mx-0">
                                Unlock premium workspaces across India’s fastest-growing business hubs
                            </p>
                        </div>

                        {/* Search Section - No Background Box */}
                        <div className="mb-3">
                            {/* Search Type & City Selectors */}
                            <div className="flex flex-col sm:flex-row gap-2 mb-2">
                                {/* Type Selector */}
                                <div className="relative flex-1">
                                    <select
                                        value={searchType}
                                        onChange={(e) => setSearchType(e.target.value)}
                                        className="w-full appearance-none bg-white border border-gray-300 text-gray-700 text-sm py-2 px-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all shadow-sm"
                                    >
                                        <option value="">{content.searchPlaceholder.type}</option>
                                        {content.typeOptions.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* City Selector */}
                                <div className="relative flex-1">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <select
                                        value={searchCity}
                                        onChange={(e) => setSearchCity(e.target.value)}
                                        className="w-full appearance-none bg-white border border-gray-300 text-gray-700 text-sm py-2 pl-10 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all shadow-sm"
                                    >
                                        <option value="">{content.searchPlaceholder.city}</option>
                                        {content.cityOptions.map((city, index) => (
                                            <option key={index} value={city}>{city}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Search Button */}
                            <button
                                onClick={handleSearch}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-sm py-2 px-5 rounded-lg transition-all shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                            >
                                <Search className="w-4 h-4" />
                                {content.searchButton}
                            </button>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${activeFilter === 'all'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                All Cities
                            </button>
                            <button
                                onClick={() => setActiveFilter('popular')}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${activeFilter === 'popular'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                <TrendingUp className="w-3 h-3" />
                                Popular
                            </button>
                            <button
                                onClick={() => setActiveFilter('metro')}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${activeFilter === 'metro'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                Metro Cities
                            </button>
                        </div>

                        {/* Cities Section */}
                        <div className="mb-2">
                            <div className="flex items-center justify-between mb-2.5">
                                <p className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                                    {content.popularCitiesLabel}
                                </p>
                                <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full font-semibold">
                                    15 Cities
                                </span>
                            </div>
                            <CityGrid
                                currentPage={pageType}
                                onCitySelect={(city) => setSelectedCity(city)}
                                searchQuery={searchQuery}
                                activeFilter={activeFilter}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Hero Carousel - Optimized Size */}
                <div className="w-full lg:w-[45%] xl:w-[40%] flex items-start justify-center pt-[3.75rem] pb-6 lg:pr-6 lg:px-6 relative overflow-x-hidden">
                    {/* Bubbles only in carousel area */}
                    <div className="carousel-bubbles-container">
                        <div className="floating-particles" ref={(ref) => {
                            if (ref && ref.children.length === 0) {
                                const colors = [
                                    'particle-red',
                                    'particle-blue',
                                    'particle-light-red',
                                    'particle-light-blue'
                                ];

                                for (let i = 0; i < 15; i++) {
                                    const particle = document.createElement('div');
                                    const colorClass = colors[Math.floor(Math.random() * colors.length)];
                                    particle.className = `particle ${colorClass}`;
                                    const size = Math.random() * 10 + 5;
                                    particle.style.width = `${size}px`;
                                    particle.style.height = `${size}px`;
                                    particle.style.left = `${Math.random() * 100}%`;
                                    particle.style.top = `${Math.random() * 100}%`;
                                    particle.style.animationDelay = `${Math.random() * 20}s`;
                                    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
                                    ref.appendChild(particle);
                                }
                            }
                        }}></div>
                    </div>
                    <HeroCarousel />
                </div>

                <ServiceModal
                    isOpen={!!selectedCity}
                    cityName={selectedCity}
                    cityIconPath={selectedCity ? getCityIconPath(selectedCity) : ''}
                    currentPage={pageType}
                    onClose={() => setSelectedCity(null)}
                />
            </div>
        </>
    );
};

export default Hero;
