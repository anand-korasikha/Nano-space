import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

const Layout = () => {
    return (
        <div className="app-layout relative">
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />

            {/* Global Persistent Call Button with Buzzer Animation */}
            <a href="tel:+919311328049" className="call-buzzer-btn" aria-label="Call us">
                {/* Pulsing ring waves */}
                <span className="buzzer-ring buzzer-ring-1"></span>
                <span className="buzzer-ring buzzer-ring-2"></span>
                <span className="buzzer-ring buzzer-ring-3"></span>
                {/* Phone icon */}
                <svg className="buzzer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </a>
        </div>
    );
};

export default Layout;
