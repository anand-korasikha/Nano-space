import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
const logo = '/images/Logo.png';
import './Header.css';
import './Logo.css';
import CityDropdown from './CityDropdown';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isCoworkingDropdownOpen, setIsCoworkingDropdownOpen] = useState(false);
    const [isColivingDropdownOpen, setIsColivingDropdownOpen] = useState(false);
    const [isVirtualOfficeDropdownOpen, setIsVirtualOfficeDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsCoworkingDropdownOpen(false);
        setIsColivingDropdownOpen(false);
        setIsVirtualOfficeDropdownOpen(false);
    };

    const toggleMobileDropdown = (dropdown) => {
        if (dropdown === 'coworking') {
            setIsCoworkingDropdownOpen(!isCoworkingDropdownOpen);
            setIsColivingDropdownOpen(false);
            setIsVirtualOfficeDropdownOpen(false);
        } else if (dropdown === 'coliving') {
            setIsColivingDropdownOpen(!isColivingDropdownOpen);
            setIsCoworkingDropdownOpen(false);
            setIsVirtualOfficeDropdownOpen(false);
        } else if (dropdown === 'virtualoffice') {
            setIsVirtualOfficeDropdownOpen(!isVirtualOfficeDropdownOpen);
            setIsCoworkingDropdownOpen(false);
            setIsColivingDropdownOpen(false);
        }
    };

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo Section */}
                <div className="header-left">
                    <Link to="/" className="logo" onClick={closeMobileMenu}>
                        <img src={logo} alt="Nanospace" className="logo-img animated-logo" />
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-menu-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Navigation Section */}
                <nav className={`header-center ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                    <ul className="nav-list">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                onClick={closeMobileMenu}
                            >
                                Home
                            </NavLink>
                        </li>

                        {/* Coworking with Dropdown */}
                        <li
                            className="nav-item-dropdown"
                            onMouseEnter={() => window.innerWidth > 768 && setIsCoworkingDropdownOpen(true)}
                            onMouseLeave={() => window.innerWidth > 768 && setIsCoworkingDropdownOpen(false)}
                        >
                            <div className="nav-link-wrapper">
                                <NavLink
                                    to="/coworking"
                                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                    onClick={(e) => {
                                        if (window.innerWidth <= 768) {
                                            e.preventDefault();
                                            toggleMobileDropdown('coworking');
                                        } else {
                                            // On desktop, allow navigation and close dropdown
                                            setIsCoworkingDropdownOpen(false);
                                            closeMobileMenu();
                                        }
                                    }}
                                >
                                    Coworking
                                    <svg
                                        className="dropdown-arrow"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        style={{
                                            marginLeft: '6px',
                                            transform: isCoworkingDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.2s ease'
                                        }}
                                    >
                                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </NavLink>
                            </div>
                            <CityDropdown
                                isOpen={isCoworkingDropdownOpen}
                                onClose={() => setIsCoworkingDropdownOpen(false)}
                                servicePath="coworking"
                                onCityClick={closeMobileMenu}
                                onMouseEnter={() => window.innerWidth > 768 && setIsCoworkingDropdownOpen(true)}
                                onMouseLeave={() => window.innerWidth > 768 && setIsCoworkingDropdownOpen(false)}
                            />
                        </li>


                        {/* Coliving with Dropdown */}
                        <li
                            className="nav-item-dropdown"
                            onMouseEnter={() => window.innerWidth > 768 && setIsColivingDropdownOpen(true)}
                            onMouseLeave={() => window.innerWidth > 768 && setIsColivingDropdownOpen(false)}
                        >
                            <div className="nav-link-wrapper">
                                <NavLink
                                    to="/coliving"
                                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                    onClick={(e) => {
                                        if (window.innerWidth <= 768) {
                                            e.preventDefault();
                                            toggleMobileDropdown('coliving');
                                        } else {
                                            // On desktop, allow navigation and close dropdown
                                            setIsColivingDropdownOpen(false);
                                            closeMobileMenu();
                                        }
                                    }}
                                >
                                    Coliving
                                    <svg
                                        className="dropdown-arrow"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        style={{
                                            marginLeft: '6px',
                                            transform: isColivingDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.2s ease'
                                        }}
                                    >
                                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </NavLink>
                            </div>
                            <CityDropdown
                                isOpen={isColivingDropdownOpen}
                                onClose={() => setIsColivingDropdownOpen(false)}
                                servicePath="coliving"
                                onCityClick={closeMobileMenu}
                                onMouseEnter={() => window.innerWidth > 768 && setIsColivingDropdownOpen(true)}
                                onMouseLeave={() => window.innerWidth > 768 && setIsColivingDropdownOpen(false)}
                            />
                        </li>

                        {/* Virtual Office with Dropdown */}
                        <li
                            className="nav-item-dropdown"
                            onMouseEnter={() => window.innerWidth > 768 && setIsVirtualOfficeDropdownOpen(true)}
                            onMouseLeave={() => window.innerWidth > 768 && setIsVirtualOfficeDropdownOpen(false)}
                        >
                            <div className="nav-link-wrapper">
                                <NavLink
                                    to="/virtual-office"
                                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                    onClick={(e) => {
                                        if (window.innerWidth <= 768) {
                                            e.preventDefault();
                                            toggleMobileDropdown('virtualoffice');
                                        } else {
                                            // On desktop, allow navigation and close dropdown
                                            setIsVirtualOfficeDropdownOpen(false);
                                            closeMobileMenu();
                                        }
                                    }}
                                >
                                    Virtual Office
                                    <svg
                                        className="dropdown-arrow"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        style={{
                                            marginLeft: '6px',
                                            transform: isVirtualOfficeDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.2s ease'
                                        }}
                                    >
                                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </NavLink>
                            </div>
                            <CityDropdown
                                isOpen={isVirtualOfficeDropdownOpen}
                                onClose={() => setIsVirtualOfficeDropdownOpen(false)}
                                servicePath="virtual-office"
                                onCityClick={closeMobileMenu}
                                onMouseEnter={() => window.innerWidth > 768 && setIsVirtualOfficeDropdownOpen(true)}
                                onMouseLeave={() => window.innerWidth > 768 && setIsVirtualOfficeDropdownOpen(false)}
                            />
                        </li>
                        <li>
                            <NavLink
                                to="/business-plans"
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                onClick={closeMobileMenu}
                            >
                                Business Plans
                            </NavLink>
                        </li>
                    </ul>

                    {/* Mobile Social Icons and Book Now */}
                    <div className="mobile-actions">
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                        <button className="book-now-btn">
                            <span>Book Now</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Actions Section - Desktop Only */}
                <div className="header-right">
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>
                    <div className="divider"></div>
                    <button className="book-now-btn">
                        <span>Contact Us</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="mobile-menu-overlay"
                    onClick={closeMobileMenu}
                />
            )}
        </header>
    );
};

export default Header;
