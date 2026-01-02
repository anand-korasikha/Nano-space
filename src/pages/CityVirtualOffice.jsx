import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, FileText, Building, Clock, Phone, Mail, ChevronDown, Star, Wifi, Users, Video } from 'lucide-react';
import cityData from '../data/cityVirtualOffice.json';
import { getApprovedPropertiesByType } from '../services/propertyService';
import VirtualOfficeHelpCards from '../components/virtualoffice/VirtualOfficeHelpCards';
import BusinessNeedsSection from '../components/virtualoffice/BusinessNeedsSection';
import ExploreLocationsSection from '../components/virtualoffice/ExploreLocationsSection';
import VirtualOfficePlans from '../components/virtualoffice/VirtualOfficePlans';
import EnquiryModal from '../components/coworking/EnquiryModal';

const CityVirtualOffice = () => {
    const { cityName } = useParams();
    const navigate = useNavigate();
    const [city, setCity] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOffice, setSelectedOffice] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        microlocation: ''
    });

    useEffect(() => {
        // Load city data from JSON
        const cityKey = cityName?.toLowerCase();
        if (cityKey && cityData[cityKey]) {
            const data = cityData[cityKey];

            // Get approved properties from localStorage
            const approvedProperties = getApprovedPropertiesByType('Virtual Office', cityKey);

            // Merge approved properties with existing office spaces
            const mergedOfficeSpaces = [
                ...(data.officeSpaces || []),
                ...approvedProperties.map(prop => ({
                    id: prop.id,
                    name: prop.name,
                    location: prop.location,
                    image: prop.image,
                    rating: prop.rating || 0,
                    price: prop.price,
                    period: prop.period,
                    badge: prop.badge,
                    amenities: prop.amenities,
                    seats: '10-20 Seats',
                    cabins: '2-3 Cabins',
                    meetingRooms: '1-2 Rooms'
                }))
            ];

            setCity({
                ...data,
                officeSpaces: mergedOfficeSpaces
            });
        } else {
            // Redirect to virtual office page if city not found
            navigate('/virtual-office');
        }
    }, [cityName, navigate]);

    // Scroll to top when city changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [cityName]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
        alert('Thank you! We will contact you soon.');
    };

    const handleGetQuoteClick = (office = null) => {
        setSelectedOffice(office);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOffice(null);
    };

    if (!city) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    const iconMap = {
        MapPin: MapPin,
        FileText: FileText,
        Building: Building,
        Clock: Clock
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section
                className="relative h-[500px] md:h-[600px] bg-cover bg-center"
                style={{ backgroundImage: `url(${city.heroImage})` }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Content Container */}
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-8 h-full items-center">
                        {/* Left Side - Hero Content */}
                        <div className="text-white space-y-6 py-12">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                {city.title}
                            </h1>

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                {city.features.map((feature, index) => {
                                    const IconComponent = iconMap[feature.icon];
                                    return (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                                {IconComponent && <IconComponent size={20} className="text-white" />}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-sm md:text-base">{feature.title}</h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Popular Locations */}
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold mb-3">Popular Locations</h3>
                                <div className="flex flex-wrap gap-2">
                                    {city.popularLocations.slice(0, 8).map((location, index) => (
                                        <button
                                            key={index}
                                            className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-sm hover:bg-white/20 transition-all duration-300"
                                        >
                                            {location}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 mt-8">
                                <button
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                    onClick={() => handleGetQuoteClick()}
                                >
                                    Get Quote
                                </button>
                                <a
                                    href={`tel:${city.phone}`}
                                    className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                                >
                                    <Phone size={18} />
                                    {city.phone}
                                </a>
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="lg:flex justify-end hidden" id="contact">
                            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                                        Book Virtual Office from NanoSpace
                                    </h2>
                                    <p className="text-gray-600 text-sm">
                                        Get your virtual office address in {city.name}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <div>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Name*"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email*"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <div className="w-20">
                                            <input
                                                type="text"
                                                value="+91"
                                                disabled
                                                className="w-full px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center font-medium"
                                            />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone*"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            pattern="[0-9]{10}"
                                            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <div className="relative">
                                        <select
                                            name="microlocation"
                                            value={formData.microlocation}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Microlocation*</option>
                                            {city.microlocations.map((location, index) => (
                                                <option key={index} value={location}>
                                                    {location}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        Enquire Now
                                    </button>
                                </form>

                                {/* Contact Expert */}
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="https://ui-avatars.com/api/?name=Space+Expert&background=0D8ABC&color=fff"
                                            alt="Expert"
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-900">Connect with our space expert</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <a href={`tel:${city.phone}`} className="text-blue-600 text-sm font-medium flex items-center gap-1">
                                                    <Phone size={14} />
                                                    {city.phone}
                                                </a>
                                                <a href={`mailto:${city.email}`} className="text-blue-600 text-sm font-medium flex items-center gap-1">
                                                    <Mail size={14} />
                                                    {city.email}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Form Section */}
            <section className="lg:hidden py-8 bg-gray-50">
                <div className="max-w-md mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-1">
                                Book Virtual Office from NanoSpace
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Get your virtual office address in {city.name}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name*"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email*"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="flex gap-2">
                                <div className="w-20">
                                    <input
                                        type="text"
                                        value="+91"
                                        disabled
                                        className="w-full px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-center font-medium"
                                    />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone*"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    pattern="[0-9]{10}"
                                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="relative">
                                <select
                                    name="microlocation"
                                    value={formData.microlocation}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Microlocation*</option>
                                    {city.microlocations.map((location, index) => (
                                        <option key={index} value={location}>
                                            {location}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Enquire Now
                            </button>
                        </form>

                        {/* Contact Expert */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://ui-avatars.com/api/?name=Space+Expert&background=0D8ABC&color=fff"
                                    alt="Expert"
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">Connect with our space expert</p>
                                    <div className="flex flex-col gap-1 mt-1">
                                        <a href={`tel:${city.phone}`} className="text-blue-600 text-sm font-medium flex items-center gap-1">
                                            <Phone size={14} />
                                            {city.phone}
                                        </a>
                                        <a href={`mailto:${city.email}`} className="text-blue-600 text-sm font-medium flex items-center gap-1">
                                            <Mail size={14} />
                                            {city.email}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Content Section - You can add more sections here */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Virtual Office in {city.name}?
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Get a prestigious business address with complete support for GST registration,
                            company registration, and all essential business services.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {city.features.map((feature, index) => {
                            const IconComponent = iconMap[feature.icon];
                            return (
                                <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-lg transition-all duration-300">
                                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        {IconComponent && <IconComponent size={28} className="text-white" />}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Office Spaces Listing Section */}
            {city.officeSpaces && city.officeSpaces.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Top Virtual Office Space In {city.name}
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Choose from our premium virtual office spaces with world-class amenities and professional services
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {city.officeSpaces.map((office) => (
                                <div
                                    key={office.id}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                                >
                                    {/* Office Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={office.image}
                                            alt={office.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                            <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                            <span className="font-semibold text-sm">{office.rating}</span>
                                        </div>
                                    </div>

                                    {/* Office Details */}
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                                            {office.name}
                                        </h3>
                                        <div className="flex items-start gap-2 text-gray-600 mb-4">
                                            <MapPin size={16} className="flex-shrink-0 mt-1" />
                                            <p className="text-sm line-clamp-2">{office.location}</p>
                                        </div>

                                        {/* Amenities */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {office.amenities.map((amenity, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full flex items-center gap-1"
                                                >
                                                    <Wifi size={12} />
                                                    {amenity}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Capacity Info */}
                                        <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-gray-200">
                                            <div className="text-center">
                                                <Users size={16} className="mx-auto text-gray-400 mb-1" />
                                                <p className="text-xs text-gray-600">{office.seats}</p>
                                            </div>
                                            <div className="text-center">
                                                <Building size={16} className="mx-auto text-gray-400 mb-1" />
                                                <p className="text-xs text-gray-600">{office.cabins}</p>
                                            </div>
                                            <div className="text-center">
                                                <Video size={16} className="mx-auto text-gray-400 mb-1" />
                                                <p className="text-xs text-gray-600">{office.meetingRooms}</p>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <button
                                            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                                            onClick={() => handleGetQuoteClick(office)}
                                        >
                                            Get Quote for Virtual Office
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* View More Button */}
                        <div className="text-center mt-10">
                            <button className="px-8 py-3 bg-white hover:bg-gray-50 text-blue-600 font-semibold rounded-lg border-2 border-blue-600 transition-all duration-300 shadow-md hover:shadow-lg">
                                View More Spaces
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Help Cards Section */}
            <VirtualOfficeHelpCards city={city} />

            {/* Business Needs Section */}
            <BusinessNeedsSection city={city} />

            {/* Explore Locations Section */}
            <ExploreLocationsSection city={city} />

            {/* Virtual Office Plans Section */}
            <VirtualOfficePlans city={city} />

            {/* Enquiry Modal */}
            <EnquiryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                officeType="Virtual Office"
                officeImage={selectedOffice?.image}
            />
        </div>
    );
};

export default CityVirtualOffice;
