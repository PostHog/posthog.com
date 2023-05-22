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
            'almost-black': '#151515',
            white: 'white',
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
            white: '#fff',
            black: '#000',
            primary: '#151515',
            'primary-dark': '#EEEFE9',
            orange: '#EF7632',
            'deep-blue': '#160431',
            'royal-blue': '#232D69',
            yellow: '#F7A501',
            footer: '#08042f',
            pink: '#A970DC',
            transparent: 'transparent',
            'dark-yellow': '#DC9300',
            'light-yellow': '#F1A82C',
            'almost-black': '#151515',
            tan: '#EEEFE9',
            'gray-accent': '#D0D1C9',
            'gray-accent-dark': '#2C2C2C',
            'gray-accent-dark-hover': '#3D3D3D',
            'gray-accent-light': '#E5E7E0',
            'gray-accent-light-hover': '#C5C6C2',
            blue: '#1D4AFF',
            red: '#F54E00',
        }),
        extend: {
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
            },
            fontSize: {
                '6xl': '3.5rem',
            },
            colors: {
                primary: '#151515',
                'primary-dark': '#EEEFE9',
                orange: '#EF7632',
                'deep-blue': '#160431',
                'royal-blue': '#232D69',
                yellow: '#F7A501',
                footer: '#08042f',
                pink: '#A970DC',
                'dark-yellow': '#DC9300',
                'light-yellow': '#F1A82C',
                'almost-black': '#151515',
                tan: '#EEEFE9',
                gray: '#8F8F8C',
                'gray-2': '#777',
                'gray-accent': '#E5E7E0',
                'gray-accent-dark': '#2C2C2C',
                'gray-accent-light': '#BFBFBC',
                red: '#F54E00',
                'dashed-line-dark': '#4b4b4b',
                'dashed-line-light': '#D0D1C9',
                blue: '#1D4AFF',
                green: '#6AA84F',
            },
            minHeight: {
                780: '780px',
            },
            borderColor: {
                'dashed-line-dark': '#4B4B4B',
                'dashed-line-light': '#D0D1C9',
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
            },
            animation: {
                wiggle: 'wiggle .2s ease-in-out 3',
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp'), require('@headlessui/tailwindcss')],
}
