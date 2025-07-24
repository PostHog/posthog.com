module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './contents/**/*.{js,jsx,ts,tsx,mdx}', './safelist.txt'],
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
            backgroundColor: {
                light: '#fff',
                'accent-light': '#e5e7e0',
                dark: '#1e1f23',
                'accent-dark': '#232429',
                primary: 'rgb(var(--bg) / <alpha-value>)',
                accent: 'rgb(var(--accent) / <alpha-value>)',
                input: 'rgb(var(--input-bg) / <alpha-value>)',
                'input-hover': 'rgb(var(--input-bg-hover) / <alpha-value>)',
            },
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

                'arrow-up-right':
                    'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 24 24"><path fill="%232F80FA" fill-rule="evenodd" d="M7.995 5.75a.75.75 0 0 1 .75-.75h8.505c.966 0 1.75.784 1.75 1.75v9.496a.75.75 0 0 1-1.5 0V7.56L7.03 18.03a.75.75 0 0 1-1.06-1.061L16.44 6.5H8.744a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"/></svg>\')',
                'red-carpet': "url('https://res.cloudinary.com/dmukukwp6/image/upload/carpet_8817dd42aa.png')",
            },
            backgroundPosition: {
                0: '0',
                100: '100%',
            },
            borderColor: {
                light: '#fff',
                'accent-light': '#e5e7e0',
                dark: '#1e1f23',
                'accent-dark': '#232429',
                button: '#B17816',
                'button-dark': '#835C19',
                'button-secondary-dark': '#C78617',

                primary: 'rgb(var(--border) / <alpha-value>)',
                input: 'rgb(var(--input-border) / <alpha-value>)',
                'input-hover': 'rgb(var(--input-border-hover) / <alpha-value>)',
            },
            borderRadius: {
                xs: '2px',
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
            colors: {
                'light-1': '#FDFDF8',
                'light-2': '#EEEFE9',
                'light-3': '#E5E7E0',
                'light-4': '#D2D3CC',
                'light-5': '#C8CAC1',
                'light-6': '#BFC1B7',
                'light-7': '#B6B7AF',
                'light-8': '#D0D1C9',
                'light-9': '#73756B',
                'light-10': '#9EA096',
                'light-11': '#4D4F46',
                'light-12': '#23251D',

                transparent: 'transparent',
                current: 'currentColor',

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
                'green-dark': '#4D7533',
                'green-2': '#36C46F',
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

                'button-shadow': '#CD8407',
                'button-border': '#B17816',
                'button-shadow-dark': '#99660E',
                'button-secondary-shadow-dark': '#925D05',

                border: 'rgb(var(--border) / <alpha-value>)',

                light: '#fff',
                'accent-light': '#e5e7e0',
                dark: '#1e1f23',
                'accent-dark': '#232429',

                // frame-bg
                // frame-border
                // plaque-bg
                // plaque-border
                // plaque-shadow-bg
            },
            textColor: {
                primary: 'rgb(var(--text-primary) / <alpha-value>)',
                secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
                muted: 'rgb(var(--text-muted) / <alpha-value>)',
            },
            fill: {
                primary: 'rgb(var(--text-primary) / <alpha-value>)',
                secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
                muted: 'rgb(var(--text-muted) / <alpha-value>)',
                accent: 'rgb(var(--accent) / <alpha-value>)',
            },
            stroke: {
                primary: 'rgb(var(--text-primary) / <alpha-value>)',
                secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
                muted: 'rgb(var(--text-muted) / <alpha-value>)',
                accent: 'rgb(var(--accent) / <alpha-value>)',
            },
            fontFamily: {
                'fairytale-title': ['Fairytale', 'sans-serif'],
                fairytale: ['Computer Modern', 'sans-serif'],
                serif: ['Charter', 'MatterVF', 'Arial', 'Helvetica', 'sans-serif'],
                sans: [
                    'IBM Plex Sans',
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
                fancy: ['Zapfino', 'serif'],
                button: ['IBM Plex Sans', 'sans-serif'],
                nav: ['IBM Plex Sans', 'sans-serif'],
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
                '2xs': '.625rem',
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
                slideDown: {
                    from: { height: '0px' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                slideUp: {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0px' },
                },
                develop: {
                    '0%': {
                        opacity: '0',
                        filter: 'grayscale(100%) brightness(200%)',
                    },
                    '30%': {
                        opacity: '1',
                        filter: 'grayscale(100%) brightness(150%)',
                    },
                    '100%': {
                        opacity: '1',
                        filter: 'grayscale(0%) brightness(100%)',
                    },
                },
                'svg-stroke-dashoffset-around': {
                    from: { 'stroke-dashoffset': '0' },
                    to: { 'stroke-dashoffset': '1000' },
                },
                wobble: {
                    '0%, 100%': { transform: 'rotate(-2deg) translateX(-5px)' },
                    '50%': { transform: 'rotate(2deg) translateX(5px)' },
                },
                hide: {
                    from: { opacity: '1' },
                    to: { opacity: '0' },
                },
                slideIn: {
                    from: {
                        transform: 'translateX(calc(100% + var(--viewport-padding)))',
                    },
                    to: { transform: 'translateX(0)' },
                },
                swipeOut: {
                    from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
                    to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
                },
                'spin-slow': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                },
                'spin-slow-reverse': {
                    from: { transform: 'rotate(360deg)' },
                    to: { transform: 'rotate(0deg)' },
                },
                'gradient-rotate': {
                    '0%, 100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                },
            },
            animation: {
                wiggle: 'wiggle .2s ease-in-out 3',
                grow: 'grow 2s linear infinite',
                'grow-sm': 'grow-sm 3s linear infinite',
                flash: 'flash 1s ease-in-out 2',
                reveal: 'reveal 1s ease-in-out',
                'text-gradient': 'text-gradient 2500ms linear infinite',
                develop: 'develop 1.5s ease-out forwards',
                slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                'svg-stroke-dashoffset-around': 'svg-stroke-dashoffset-around 2.5s linear infinite',
                wobble: 'wobble 3s ease-in-out infinite',
                hide: 'hide 100ms ease-in',
                slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
                swipeOut: 'swipeOut 100ms ease-out',
                'spin-slow': 'spin-slow 4s linear infinite',
                'spin-slow-reverse': 'spin-slow-reverse 4s linear infinite',
                'gradient-rotate': 'gradient-rotate 3s ease-in-out infinite',
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
        // typography: {
        //     DEFAULT: {
        //         css: {
        //             h5: {
        //                 marginBottom: '.25rem',
        //             },
        //         },
        //     },
        // },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@headlessui/tailwindcss'),
        require('@tailwindcss/container-queries'),
        function ({ addUtilities }) {
            addUtilities({
                '.container-size': { 'container-type': 'size' },
            })
        },
        require('tailwindcss-animated'),
        require('@tailwindcss/typography'),
        function ({ addVariant }) {
            addVariant('skin-modern', 'body[data-skin="modern"] &')
            addVariant('skin-classic', 'body[data-skin="classic"] &')
            addVariant('wallpaper-keyboard-garden', 'body[data-wallpaper="keyboard-garden"] &')
            addVariant('wallpaper-hogzilla', 'body[data-wallpaper="hogzilla"] &')
            addVariant('wallpaper-office-party', 'body[data-wallpaper="office-party"] &')
            addVariant('wallpaper-2001-bliss', 'body[data-wallpaper="2001-bliss"] &')
            addVariant('wallpaper-parade', 'body[data-wallpaper="parade"] &')
            addVariant('wallpaper-coding-at-night', 'body[data-wallpaper="coding-at-night"] &')
            addVariant('wallpaper-startup-monopoly', 'body[data-wallpaper="startup-monopoly"] &')
        },
    ],
}
