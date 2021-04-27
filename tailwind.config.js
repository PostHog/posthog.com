module.exports = {
    purge: {
        content: ['./src/**/*.{js,jsx,ts,tsx}'],
        options: {
            safelist: [
                'w-full',
                'w-56',
                'w-64',
                'w-72',
                '-mt-2',
                '-ml-2',
                '-mr-2',
                '-mb-2',
                '-mt-4',
                '-mr-4',
                '-mb-4',
                '-ml-4',
                'max-w-xl',
                'max-w-2xl',
                'max-w-3xl',
                'max-w-4xl',
                'max-w-5xl',
            ],
        },
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                gosha: ['Gosha Sans', 'Arial', 'Helvetica', 'sans-serif'],
                serif: ['Gosha Sans', 'Arial', 'Helvetica', 'sans-serif'],
                sans: ['Good Sans', 'Arial', 'Helvetica', 'sans-serif', 'Inter'],
                inter: [
                    'Inter',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica',
                    'Arial',
                    'sans-serif',
                    'Apple Color Emoji',
                    'Segoe UI Emoji',
                    'Segoe UI Symbol',
                ],
            },
            fontSize: {
                '2xs': '0.65rem',
                'base-larger': '15px',
            },
            colors: {
                primary: 'rgba(255, 99, 39, 0.9)',
                'primary-dark': 'rgba(218, 72, 16, 0.9)',
                purpleish: '#802f6a',
                'purpleish-dark': '#72286E',
                orange: '#FFB877',
                'darkmode-purple': '#220f3f',
                'offwhite-purple': '#F4F1F8',
            },
            minHeight: {
                780: '780px',
            },
            borderRadius: {
                sm: '4px',
                lg: '20px',
            },
            borderWidth: {
                3: '3px',
            },
            padding: {
                'fluid-video': '56.25%',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
