import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-section">
                    <h3>Nanospace</h3>
                    <p>Premium workspaces for modern professionals.</p>
                </div>
                <div className="footer-section">
                    <h4>Links</h4>
                    <ul>
                        <li><a href="/coworking">Coworking</a></li>
                        <li><a href="/coliving">Coliving</a></li>
                        <li><a href="/virtual-office">Virtual Office</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>info@nanospace.com</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Nanospace. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
