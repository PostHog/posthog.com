module.exports = {
    plugins: [
        {
            resolve: 'gatsby-plugin-netlify-cache',
            options: {
                cachePublic: true,
            },
        },
    ],
}
