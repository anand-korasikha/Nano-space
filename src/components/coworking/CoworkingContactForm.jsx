import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const CoworkingContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        requirements: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
    };

    const cities = [
        'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune',
        'Kolkata', 'Ahmedabad', 'Jaipur', 'Noida', 'Gurgaon', 'Other'
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="mx-6 md:mx-12 lg:mx-20">
                {/* Section Header */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex-shrink-0"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Yes, I'm interested in Coworking Space
                    </h2>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left - Image */}
                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                                alt="Coworking space"
                                className="w-full h-[500px] object-cover"
                            />
                            {/* Decorative blob */}
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gray-200 rounded-full -z-10"></div>
                        </div>
                    </div>

                    {/* Right - Form */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Answers to your Coworking Space query
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name and Email Row */}
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Name Input */}
                                <div className="relative">
                                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name*"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="relative">
                                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email*"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Phone and City Row */}
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Phone Input */}
                                <div className="relative">
                                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <div className="flex">
                                        <span className="inline-flex items-center px-3 text-sm text-gray-600 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg">
                                            +91
                                        </span>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone*"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-3 pr-4 py-3 border border-gray-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* City Dropdown */}
                                <div className="relative">
                                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                                    <select
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                                    >
                                        <option value="">Select City*</option>
                                        {cities.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Requirements Textarea */}
                            <div className="relative">
                                <MessageSquare size={18} className="absolute left-3 top-4 text-gray-400" />
                                <textarea
                                    name="requirements"
                                    placeholder="Requirements"
                                    value={formData.requirements}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                            >
                                Submit
                            </button>

                            {/* Contact Info */}
                            <p className="text-sm text-gray-600 mt-4">
                                Need Assistance? Email: {' '}
                                <a href="mailto:hello@nanospace.com" className="text-blue-600 hover:underline font-medium">
                                    hello@nanospace.com
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoworkingContactForm;
