module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './safelist.txt'],
    options: {
        safelist: [
            // use safelist.txt
        ],
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        screens: {
            '2xs': '400px',
            xs: '482px',
            sm: '640px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            mdlg: '900px',
            // specifically for plans

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            lgxl: '1160px',
            // => @media (min-width: 1024px) { ... }

            xl: '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }

            reasonable: { raw: '(min-height: 640px)' },
        },
        flex: {
            1: '1',
            '1/3': '0 0 33%',
            '2/3': '0 0 66%',
            half: '0 0 49%',
            full: '0 0 100%',
        },

        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'bullet-light':
                    'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 8"><path fill="%23D0D1C9" d="M4.23 7.704c-2.034 0-3.636-1.602-3.636-3.6 0-1.98 1.602-3.6 3.636-3.6 1.962 0 3.564 1.62 3.564 3.6 0 1.998-1.602 3.6-3.564 3.6Z"/></svg>\')',
                'bullet-dark':
                    'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 8"><path fill="%234A4C52" d="M4.23 7.704c-2.034 0-3.636-1.602-3.636-3.6 0-1.98 1.602-3.6 3.636-3.6 1.962 0 3.564 1.62 3.564 3.6 0 1.998-1.602 3.6-3.564 3.6Z"/></svg>\')',
                'bullet-check-light':
                    'url(\'data:image/svg+xml,<svg fill="green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.475-3.08a.75.75 0 0 1 .106 1.055l-4.5 5.5a.75.75 0 0 1-1.111.055l-2-2a.75.75 0 1 1 1.06-1.06l1.414 1.414 3.975-4.859a.75.75 0 0 1 1.056-.105Z"></path></svg>\')',

                'bullet-check-dark':
                    'url(\'data:image/svg+xml,<svg fill="lightgreen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.475-3.08a.75.75 0 0 1 .106 1.055l-4.5 5.5a.75.75 0 0 1-1.111.055l-2-2a.75.75 0 1 1 1.06-1.06l1.414 1.414 3.975-4.859a.75.75 0 0 1 1.056-.105Z"></path></svg>\')',

                'bullet-chevron-light':
                    'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 24 24"><path fill="%23555" fill-rule="evenodd" d="M8.47 3.47a.75.75 0 0 1 1.06 0l7.293 7.292a1.75 1.75 0 0 1 0 2.475L9.53 20.53a.75.75 0 0 1-1.06-1.06l7.293-7.293a.25.25 0 0 0 0-.354L8.47 4.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/></svg>\')',

                'bullet-chevron-dark':
                    'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 24 24"><path fill="%23999" fill-rule="evenodd" d="M8.47 3.47a.75.75 0 0 1 1.06 0l7.293 7.292a1.75 1.75 0 0 1 0 2.475L9.53 20.53a.75.75 0 0 1-1.06-1.06l7.293-7.293a.25.25 0 0 0 0-.354L8.47 4.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/></svg>\')',
            },
            backgroundPosition: {
                0: '0',
                100: '100%',
            },
            colors: {
                transparent: 'transparent',
                current: 'currentColor',

                primary: '#151515',
                'primary-dark': '#EEEFE9',
                accent: '#E5E7E0',
                'accent-dark': '#232429',
                border: '#D0D1C9',
                'border-dark': '#4A4C52',
                light: '#EEEFE9',
                dark: '#1D1F27',
                highlight: 'rgba(235,157,42,.2)',
                footer: '#08042f',

                black: '#000',
                blue: '#2F80FA',
                'blue-2': '#589DF8',
                'blue-2-dark': '#1E2F46',
                brown: '#3B2B26',
                'burnt-orange': '#DF6133',
                'burnt-orange-dark': '#8E2600',
                creamsicle: '#FFD699',
                'creamsicle-dark': '#E38907',
                fuchsia: '#A621C8',
                'fuchsia-dark': '#74108D',
                gray: '#8F8F8C',
                green: '#6AA84F',
                gold: '#FFBA53',
                'gold-dark': '#E38907',
                lilac: '#8567FF',
                'light-blue': '#9FC4FF',
                'light-blue-dark': '#1E2F46',
                'light-purple': '#E2D6FF',
                'light-purple-dark': '#78689D',
                'light-yellow': '#FFCE5C',
                'light-yellow-dark': '#C7982B',
                'lime-green': '#96E5B6',
                navy: '#1E2F46',
                'navy-dark': '#0F233D',
                orange: '#EB9D2A',
                pink: '#E34C6F',
                'pink-dark': '#8C0D3B',
                'pale-blue': '#D2E6FF',
                'pale-blue-dark': '#648DC2',
                purple: '#B62AD9',
                'purple-2': '#40396E',
                'purple-2-dark': '#3C3154',
                red: '#F54E00',
                'red-2': '#F87A4C',
                'red-2-dark': '#C03300',
                salmon: '#F35454',
                seagreen: '#30ABC6',
                'sky-blue': '#2EA2D3',
                tan: '#EEEFE9',
                teal: '#29DBBB',
                'teal-2': '#6BC0B3',
                'teal-2-dark': '#34796F',
                white: '#fff',
                'white-dark': '#111', // crest dark border hack
                yellow: '#F7A501',

                // frame-bg
                // frame-border
                // plaque-bg
                // plaque-border
                // plaque-shadow-bg

                'button-shadow': '#CD8407',
                'button-border': '#B17816',
                'button-shadow-dark': '#99660E',
                'button-secondary-shadow-dark': '#925D05',
                'gray-accent': '#D0D1C9',
                'gray-accent-dark': '#2C2C2C',
                'gray-accent-dark-hover': '#3D3D3D',
                'gray-accent-light': '#E5E7E0',
                'gray-accent-light-hover': '#C5C6C2',
            },
            fontFamily: {
                'fairytale-title': ['Fairytale', 'sans-serif'],
                fairytale: ['Computer Modern', 'sans-serif'],
                serif: ['Times New Roman', 'MatterVF', 'Arial', 'Helvetica', 'sans-serif'],
                sans: [
                    'MatterVF',
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
                button: ['MatterVF', 'sans-serif'],
                nav: ['MatterVF', 'sans-serif'],
                code: ['Source Code Pro', 'Menlo', 'Consolas', 'monaco', 'monospace'],
                squeak: ['Squeak', 'sans-serif'],
                comic: [
                    'Comic Sans MS',
                    'Comic Sans',
                    'Arial Rounded MT Bold',
                    'Helvetica Rounded',
                    'Arial',
                    'sans-serif',
                ],
                os: [
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
                '4xl': '1.875rem',
                '3xl': '1.5rem',
                '6xl': '3.5rem',
            },
            gridTemplateColumns: {
                16: 'repeat(16, minmax(0, 1fr))',
            },
            gridColumn: {
                'span-13': 'span 13 / span 13',
                'span-16': 'span 16 / span 16',
            },

            minHeight: {
                md: '780px',
            },
            borderColor: {
                light: '#D0D1C9',
                dark: '#4A4C52',
                'bg-light': '#EEEFE9',
                'bg-dark': '#1D1F27',
                button: '#B17816',
                'button-dark': '#835C19',
                'button-secondary-dark': '#C78617',
            },
            borderRadius: {
                sm: '4px',
                lg: '20px',
            },
            borderWidth: {
                half: '.5px',
                1: '1px',
                3: '3px',
                8: '8px',
                12: '12px',
                16: '16px',
            },
            padding: {
                'fluid-video': '56.25%',
                '1/2': '50%',
            },
            maxWidth: {
                '2xs': '16rem',
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(6deg)' },
                    '50%': { transform: 'rotate(-6deg)' },
                },
                grow: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.2)' },
                },
                'grow-sm': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                },
                flash: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.02)' },
                },
                reveal: {
                    '0%': { maxHeight: 0, opacity: 0 },
                    '50%': { opacity: 1 },
                    '100%': { maxHeight: '1000px', opacity: 1 },
                    'text-gradient': {
                        '0%': { 'background-position-x': '0%' },
                        '100%': { 'background-position-x': '100%' },
                    },
                },
            },
            animation: {
                wiggle: 'wiggle .2s ease-in-out 3',
                grow: 'grow 2s linear infinite',
                'grow-sm': 'grow-sm 3s linear infinite',
                flash: 'flash 1s ease-in-out 2',
                reveal: 'reveal 1s ease-in-out',
                'text-gradient': 'text-gradient 2500ms linear infinite',
            },
            containers: {
                '2xs': '16rem',
            },
            scale: {
                50: '.5',
                55: '.55',
                60: '.6',
                65: '.65',
                70: '.7',
                75: '.75',
                80: '.8',
                85: '.85',
                90: '.9',
                95: '.95',
                '-1': '-1',
                100: '1',
                '-100': '-1',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@headlessui/tailwindcss'),
        require('@tailwindcss/container-queries'),
        require('tailwindcss-animated'),
    ],
}
