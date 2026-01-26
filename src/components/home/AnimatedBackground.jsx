import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
    const particlesRef = useRef(null);

    useEffect(() => {
        // Create floating particles with colors
        if (particlesRef.current) {
            const colors = [
                'particle-red',
                'particle-blue',
                'particle-light-red',
                'particle-light-blue'
            ];

            for (let i = 0; i < 20; i++) {
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
                particlesRef.current.appendChild(particle);
            }
        }

        return () => {
            if (particlesRef.current) {
                particlesRef.current.innerHTML = '';
            }
        };
    }, []);

    return (
        <div className="carousel-background">
            <div className="carousel-slide slide-1"></div>
            <div className="carousel-slide slide-2"></div>
            <div className="carousel-slide slide-3"></div>
            <div className="carousel-slide slide-4"></div>

            {/* Floating Particles */}
            <div className="floating-particles" ref={particlesRef}></div>
        </div>
    );
};

export default AnimatedBackground;
