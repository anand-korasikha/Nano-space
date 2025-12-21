/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                'primary-glow': 'var(--primary-glow)',
                accent: 'var(--accent)',
                'accent-glow': 'var(--accent-glow)',
                'bg-primary': 'var(--bg-primary)',
                'bg-card': 'var(--bg-card)',
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
            },
        },
    },
    plugins: [],
}
