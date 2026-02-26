import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
const logo = '/images/Logo.png';
import './Header.css';
import './Logo.css';
import CityDropdown from './CityDropdown';
import { Menu, X, User, LogOut } from 'lucide-react';

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isCoworkingDropdownOpen, setIsCoworkingDropdownOpen] = useState(false);
    const [isColivingDropdownOpen, setIsColivingDropdownOpen] = useState(false);
    const [isEventSpacesDropdownOpen, setIsEventSpacesDropdownOpen] = useState(false);
    const [isOurServicesDropdownOpen, setIsOurServicesDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsCoworkingDropdownOpen(false);
        setIsColivingDropdownOpen(false);
        setIsEventSpacesDropdownOpen(false);
        setIsOurServicesDropdownOpen(false);
    };

    const toggleMobileDropdown = (dropdown) => {
        if (dropdown === 'coworking') {
            setIsCoworkingDropdownOpen(!isCoworkingDropdownOpen);
            setIsColivingDropdownOpen(false);
            setIsEventSpacesDropdownOpen(false);
            setIsOurServicesDropdownOpen(false);
        } else if (dropdown === 'coliving') {
            setIsColivingDropdownOpen(!isColivingDropdownOpen);
            setIsCoworkingDropdownOpen(false);
            setIsEventSpacesDropdownOpen(false);
            setIsOurServicesDropdownOpen(false);
        } else if (dropdown === 'events') {
            setIsEventSpacesDropdownOpen(!isEventSpacesDropdownOpen);
            setIsCoworkingDropdownOpen(false);
            setIsColivingDropdownOpen(false);
            setIsOurServicesDropdownOpen(false);
        } else if (dropdown === 'services') {
            setIsOurServicesDropdownOpen(!isOurServicesDropdownOpen);
            setIsCoworkingDropdownOpen(false);
            setIsColivingDropdownOpen(false);
            setIsEventSpacesDropdownOpen(false);
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

                        <li>
                            <NavLink
                                to="/hotel-rooms"
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                onClick={closeMobileMenu}
                            >
                                Hotel Rooms
                            </NavLink>
                        </li>

                        {/* Event Spaces with Dropdown */}
                        <li
                            className="nav-item-dropdown"
                            onMouseEnter={() => window.innerWidth > 768 && setIsEventSpacesDropdownOpen(true)}
                            onMouseLeave={() => window.innerWidth > 768 && setIsEventSpacesDropdownOpen(false)}
                        >
                            <div className="nav-link-wrapper">
                                <NavLink
                                    to="/event-spaces"
                                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                    onClick={(e) => {
                                        if (window.innerWidth <= 768) {
                                            e.preventDefault();
                                            toggleMobileDropdown('events');
                                        } else {
                                            setIsEventSpacesDropdownOpen(false);
                                            closeMobileMenu();
                                        }
                                    }}
                                >
                                    Event Spaces
                                    <svg
                                        className="dropdown-arrow"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        style={{
                                            marginLeft: '6px',
                                            transform: isEventSpacesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.2s ease'
                                        }}
                                    >
                                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </NavLink>
                            </div>

                            {isEventSpacesDropdownOpen && (
                                <ul className="simple-dropdown-menu">
                                    <li>
                                        <NavLink
                                            to="/party-halls"
                                            className="dropdown-item"
                                            onClick={closeMobileMenu}
                                        >
                                            Party Halls
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/private-theatres"
                                            className="dropdown-item"
                                            onClick={closeMobileMenu}
                                        >
                                            Private Theatres
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Our Services Dropdown */}
                        <li
                            className="nav-item-dropdown"
                            onMouseEnter={() => window.innerWidth > 768 && setIsOurServicesDropdownOpen(true)}
                            onMouseLeave={() => window.innerWidth > 768 && setIsOurServicesDropdownOpen(false)}
                        >
                            <div className="nav-link-wrapper">
                                <div
                                    className={`nav-link ${isOurServicesDropdownOpen ? 'active' : ''}`}
                                    onClick={() => {
                                        if (window.innerWidth <= 768) {
                                            toggleMobileDropdown('services');
                                        }
                                    }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Other Services
                                    <svg
                                        className="dropdown-arrow"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        style={{
                                            marginLeft: '6px',
                                            transform: isOurServicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.2s ease'
                                        }}
                                    >
                                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            {isOurServicesDropdownOpen && (
                                <ul className="simple-dropdown-menu">
                                    <li>
                                        <NavLink
                                            to="/other-services"
                                            className="dropdown-item featured"
                                            onClick={closeMobileMenu}
                                        >
                                            🌟 View All Services
                                        </NavLink>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li>
                                        <NavLink
                                            to="/services/it-development"
                                            className="dropdown-item"
                                            onClick={closeMobileMenu}
                                        >
                                            💻 IT Development
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/services/digital-marketing"
                                            className="dropdown-item"
                                            onClick={closeMobileMenu}
                                        >
                                            📱 Digital Marketing
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/services/advocates-lawyers"
                                            className="dropdown-item"
                                            onClick={closeMobileMenu}
                                        >
                                            ⚖️ Advocates / Lawyers
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/services/chartered-accountants"
                                            className="dropdown-item"
                                            onClick={closeMobileMenu}
                                        >
                                            📊 Chartered Accountants
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/services/mentors-trainers"
                                            className="dropdown-item"
                                            onClick={closeMobileMenu}
                                        >
                                            🎓 Mentors / Trainers
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <NavLink
                                to="/buy"
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                onClick={closeMobileMenu}
                            >
                                Buy
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/rent"
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                onClick={closeMobileMenu}
                            >
                                Rent
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/sell"
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                onClick={closeMobileMenu}
                            >
                                Sell
                            </NavLink>
                        </li>

                    </ul>

                    {/* Mobile Actions - Visible only on Mobile */}
                    <div className="mobile-actions">
                        {isAuthenticated() ? (
                            <>
                                <button
                                    className="user-profile-btn"
                                    onClick={() => {
                                        navigate(`/dashboard/${user.role || 'customer'}`);
                                        closeMobileMenu();
                                    }}
                                >
                                    <User size={18} />
                                    <span>{user.name}</span>
                                </button>
                                <button
                                    className="logout-btn"
                                    onClick={() => {
                                        logout();
                                        navigate('/');
                                        closeMobileMenu();
                                    }}
                                    style={{ width: '100%', borderRadius: '50px', justifyContent: 'center', gap: '0.5rem' }}
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="book-now-btn" onClick={closeMobileMenu}>
                                <span>List My Space</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </Link>
                        )}
                    </div>


                </nav>

                {/* Actions Section - Desktop Only */}
                <div className="header-right">
                    {isAuthenticated() ? (
                        <div className="user-menu">
                            <button
                                className="user-profile-btn"
                                onClick={() => navigate(`/dashboard/${user.role || 'customer'}`)}
                            >
                                <User size={18} />
                                <span>{user.name}</span>
                            </button>
                            <button
                                className="logout-btn"
                                onClick={() => {
                                    logout();
                                    navigate('/');
                                    closeMobileMenu();
                                }}
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="book-now-btn" onClick={closeMobileMenu}>
                            <span>List My Space</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>
                    )}
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
