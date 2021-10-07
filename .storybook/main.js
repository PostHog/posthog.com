module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        'storybook-addon-gatsby',
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
            },
        },
        'storybook-dark-mode',
    ],
    core: {
        builder: 'webpack5',
    },
    typescript: { reactDocgen: false },
}
