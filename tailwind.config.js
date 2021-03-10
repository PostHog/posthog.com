module.exports = {
    purge: {
        content: ['./src/**/*.{js,jsx,ts,tsx}'],
        options: {
            safelist: ['w-full', 'w-56', 'w-64', 'w-72'],
        },
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                gosha: ['Gosha Sans', 'Arial', 'Helvetica', 'sans-serif'],
            },
            fontSize: {
                'base-larger': '15px',
            },
            colors: {
                primary: 'rgba(255, 99, 39, 0.9)',
                'primary-dark': 'rgba(218, 72, 16, 0.9)',
                purpleish: '#802f6a',
                'purpleish-dark': '#72286E',
            },
            minHeight: {
                780: '780px',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
