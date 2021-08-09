module.exports = {
    mode: 'jit',
    purge: {
        content: ['./src/**/*.{js,jsx,ts,tsx}'],
        options: {
            safelist: [
                'justify-start',
                'h-full',
                'flex',
                'gap-y-4',
                '-mt-2',
                '-mt-4',
                '-ml-2',
                '-mr-2',
                '-mb-2',
                '-mt-4',
                '-mr-4',
                '-mr-8',
                '-mb-4',
                '-ml-4',
                '-mb-12',
                'mt-16',
                'mb-4',
                'pr-32',
                'rotate-45',
                'rotate-90',
                'max-w-xl',
                'max-w-2xl',
                'max-w-3xl',
                'max-w-4xl',
                'max-w-5xl',
                'w-full',
                'w-56',
                'w-64',
                'w-72',
            ],
        },
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        rotate: {
            '-31': '-31deg',
        },
        screens: {
            sm: '640px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            mdlg: '900px',
            // specifically for plans

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            xl: '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
        scale: {
            '-1': '-1',
        },
        flex: {
            '1/3': '0 0 33%',
            '2/3': '0 0 66%',
            half: '0 0 49%',
            full: '0 0 100%',
        },
        backgroundColor: (theme) => ({
            purple: '#220f3f',
            white: '#fff',
            black: '#000',
            orange: '#EF7632',
            purpleish: '#802f6a',
            'purpleish-dark': '#72286E',
            'darkmode-purple': '#220f3f',
            'offwhite-purple': '#F4F1F8',
            'baby-blue': '#CDD0FF',
            'deep-blue': '#160431',
            'royal-blue': '#232D69',
            yellow: '#F7A501',
            footer: '#08042f',
            pink: '#A970DC',
        }),
        extend: {
            fontFamily: {
                serif: ['DM Sans', 'Arial', 'Helvetica', 'sans-serif'],
                sans: [
                    'DM Sans',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'avenir next',
                    'avenir',
                    'segoe ui',
                    'helvetica neue',
                    'helvetica',
                    'Ubuntu',
                    'roboto',
                    'noto',
                    'arial',
                    'sans-serif',
                ],
                button: ['DM Sans', 'sans-serif'],
                nav: ['DM Sans', 'sans-serif'],
            },
            fontSize: {
                '2xs': '0.65rem',
                base: '.875rem',
                'base-larger': '.933rem',
                'text-sm': '.8rem',
            },
            colors: {
                primary: 'rgba(255, 99, 39, 0.9)',
                'primary-dark': 'rgba(218, 72, 16, 0.9)',
                purpleish: '#802f6a',
                'purpleish-dark': '#72286E',
                orange: '#EF7632',
                'darkmode-purple': '#220f3f',
                'offwhite-purple': '#F4F1F8',
                'baby-blue': '#CDD0FF',
                'deep-blue': '#160431',
                'royal-blue': '#232D69',
                yellow: '#F7A501',
                footer: '#08042f',
                pink: '#A970DC',
            },
            minHeight: {
                780: '780px',
            },
            borderRadius: {
                sm: '4px',
                lg: '20px',
            },
            borderWidth: {
                half: '.5px',
                3: '3px',
                8: '8px',
                12: '12px',
                16: '16px',
            },
            padding: {
                'fluid-video': '56.25%',
                '1/2': '50%',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
