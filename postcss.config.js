module.exports = () => ({
    plugins: [
        require('tailwindcss/nesting'),
        require('tailwindcss'),
        require('autoprefixer'),
        // Only minify in production
        ...(process.env.NODE_ENV === 'production' ? [require('cssnano')({ preset: 'default' })] : []),
    ],
})
