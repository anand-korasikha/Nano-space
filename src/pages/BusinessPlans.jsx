import React from 'react';

const BusinessPlans = () => {
    const plans = [
        { title: 'Starter', price: '$29/mo', features: ['Virtual Address', '1 Day Pass/mo', 'Community Access'] },
        { title: 'Professional', price: '$199/mo', features: ['Hot Desk Access', '5 Meeting Room Hrs', 'Mail Handling'] },
        { title: 'Enterprise', price: 'Custom', features: ['Private Office', 'Unlimited Meeting Rooms', 'Custom Branding'] },
    ];

    return (
        <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
            <h1 className="page-title" style={{ fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--text-primary)' }}>Business Plans</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {plans.map((plan, index) => (
                    <div key={index} style={{
                        background: 'var(--bg-card)',
                        padding: '3rem 2rem',
                        borderRadius: '16px',
                        border: index === 1 ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                        position: 'relative',
                        transform: index === 1 ? 'scale(1.05)' : 'none'
                    }}>
                        {index === 1 && <span style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', padding: '0.25rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold' }}>POPULAR</span>}
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{plan.title}</h2>
                        <div style={{ fontSize: '2.5rem', fontWeight: '800', margin: '1rem 0', color: 'var(--primary)' }}>{plan.price}</div>
                        <ul style={{ textAlign: 'left', margin: '2rem 0', color: 'var(--text-secondary)' }}>
                            {plan.features.map((feature, i) => (
                                <li key={i} style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✓</span> {feature}
                                </li>
                            ))}
                        </ul>
                        <button style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: '8px',
                            background: index === 1 ? 'linear-gradient(to right, var(--primary), var(--accent))' : 'transparent',
                            border: index === 1 ? 'none' : '1px solid var(--text-secondary)',
                            color: 'white',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>
                            Choose {plan.title}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusinessPlans;
