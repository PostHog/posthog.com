module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './safelist.txt'],
    options: {
        safelist: [
            // use safelist.txt
        ],
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        fill: {
            current: 'currentColor',
            white: 'white',

            'lime-green': '#96E5B6',
            blue: '#1D4AFF',
            yellow: '#F7A501',
            red: '#F54E00',
            green: '#6AA84F',
            primary: '#151515',

            'gray-accent': '#D0D1C9',
            'gray-accent-dark': '#2C2C2C',
            'gray-accent-dark-hover': '#3D3D3D',
            'gray-accent-light': '#E5E7E0',
            'gray-accent-light-hover': '#C5C6C2',
        },
        screens: {
            xs: '482px',
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

            reasonable: { raw: '(min-height: 640px)' },
        },
        scale: {
            '-1': '-1',
            75: '.75',
            100: '1',
        },
        flex: {
            1: '1',
            '1/3': '0 0 33%',
            '2/3': '0 0 66%',
            half: '0 0 49%',
            full: '0 0 100%',
        },
        backgroundColor: (theme) => ({
            light: '#EEEFE9',
            dark: '#1D1F27',
            accent: '#E5E7E0',
            'accent-dark': '#232429',
            border: '#D0D1C9',
            'border-dark': '#4A4C52',

            'button-shadow': '#CD8407',
            'button-border': '#B17816',
            'button-shadow-dark': '#99660E',
            'button-secondary-shadow-dark': '#925D05',

            'lime-green': '#96E5B6',
            blue: '#2F80FA',
            orange: '#EB9D2A',
            teal: '#29DBBB',
            purple: '#B62AD9',
            seagreen: '#30ABC6',
            salmon: '#F35454',
            green: '#6AA84F',
            'light-blue': '#54B6FF',

            white: '#fff',
            black: '#000',
            primary: '#151515',
            'primary-dark': '#fff',
            yellow: '#F7A501',
            footer: '#08042f',
            highlight: 'rgba(235,157,42,.2)',
            transparent: 'transparent',
            tan: '#EEEFE9',
            'gray-accent': '#D0D1C9',
            'gray-accent-dark': '#2C2C2C',
            'gray-accent-dark-hover': '#3D3D3D',
            'gray-accent-light': '#E5E7E0',
            'gray-accent-light-hover': '#C5C6C2',
            red: '#F54E00',
        }),
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'bullet-light':
                    'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 8"><path fill="%23D0D1C9" d="M4.23 7.704c-2.034 0-3.636-1.602-3.636-3.6 0-1.98 1.602-3.6 3.636-3.6 1.962 0 3.564 1.62 3.564 3.6 0 1.998-1.602 3.6-3.564 3.6Z"/></svg>\')',
                'bullet-dark':
                    'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 8"><path fill="%234A4C52" d="M4.23 7.704c-2.034 0-3.636-1.602-3.636-3.6 0-1.98 1.602-3.6 3.636-3.6 1.962 0 3.564 1.62 3.564 3.6 0 1.998-1.602 3.6-3.564 3.6Z"/></svg>\')',
            },
            fontFamily: {
                serif: ['MatterVF', 'Arial', 'Helvetica', 'sans-serif'],
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
            colors: {
                primary: '#151515',
                'primary-dark': '#EEEFE9',
                accent: '#E5E7E0',
                'accent-dark': '#232429',
                border: '#D0D1C9',
                'border-dark': '#4A4C52',
                light: '#EEEFE9',
                dark: '#1D1F27',

                'lime-green': '#96E5B6',
                blue: '#2F80FA',
                orange: '#EB9D2A',
                teal: '#29DBBB',
                purple: '#B62AD9',
                seagreen: '#30ABC6',
                salmon: '#F35454',

                yellow: '#F7A501',
                tan: '#EEEFE9',
                gray: '#8F8F8C',
                'gray-accent': '#E5E7E0',
                'gray-accent-dark': '#2C2C2C',
                'gray-accent-light': '#BFBFBC',
                red: '#F54E00',
                green: '#6AA84F',
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
            },
            animation: {
                wiggle: 'wiggle .2s ease-in-out 3',
                grow: 'grow 2s linear infinite',
                'grow-sm': 'grow-sm 3s linear infinite',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@headlessui/tailwindcss'),
        require('@tailwindcss/container-queries'),
    ],
}
