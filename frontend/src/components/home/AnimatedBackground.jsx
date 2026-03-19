import React from 'react';
import './AnimatedBackground.css';

// Static particles defined in JSX — no JS DOM manipulation, no useEffect.
// CSS handles all the animation via staggered animation-delay on each item.
const PARTICLES = [
    { colorClass: 'particle-blue',       size: 12, left: '8%',  top: '70%', delay: '0s',   duration: '18s' },
    { colorClass: 'particle-red',        size: 8,  left: '15%', top: '40%', delay: '3s',   duration: '22s' },
    { colorClass: 'particle-light-blue', size: 14, left: '25%', top: '80%', delay: '7s',   duration: '16s' },
    { colorClass: 'particle-light-red',  size: 7,  left: '35%', top: '55%', delay: '1s',   duration: '20s' },
    { colorClass: 'particle-blue',       size: 10, left: '45%', top: '75%', delay: '5s',   duration: '14s' },
    { colorClass: 'particle-red',        size: 13, left: '55%', top: '30%', delay: '9s',   duration: '19s' },
    { colorClass: 'particle-light-blue', size: 9,  left: '65%', top: '65%', delay: '2s',   duration: '17s' },
    { colorClass: 'particle-light-red',  size: 11, left: '75%', top: '50%', delay: '6s',   duration: '21s' },
    { colorClass: 'particle-blue',       size: 7,  left: '82%', top: '85%', delay: '11s',  duration: '15s' },
    { colorClass: 'particle-red',        size: 15, left: '90%', top: '20%', delay: '4s',   duration: '23s' },
];

const AnimatedBackground = () => (
    <div className="carousel-background">
        <div className="carousel-slide slide-1"></div>
        <div className="carousel-slide slide-2"></div>
        <div className="carousel-slide slide-3"></div>
        <div className="carousel-slide slide-4"></div>

        {/* Static particles — animated purely with CSS */}
        <div className="floating-particles">
            {PARTICLES.map((p, i) => (
                <div
                    key={i}
                    className={`particle ${p.colorClass}`}
                    style={{
                        width: p.size,
                        height: p.size,
                        left: p.left,
                        top: p.top,
                        animationDelay: p.delay,
                        animationDuration: p.duration,
                    }}
                />
            ))}
        </div>
    </div>
);

export default AnimatedBackground;
