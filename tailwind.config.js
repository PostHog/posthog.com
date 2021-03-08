module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                gosha: ['Gosha Sans', 'Arial', 'Helvetica', 'sans-serif'],
            },
            fontSize: {
                'base-larger': '15px',
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
