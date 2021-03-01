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
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
