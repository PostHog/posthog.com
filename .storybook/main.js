const path = require('path')

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
        '@storybook/preset-scss',
    ],
    core: {
        builder: 'webpack5',
    },
    typescript: { reactDocgen: false },
    webpackFinal: async (config) => {
        config.resolve.modules = [path.resolve(__dirname, '..', 'src'), path.resolve(__dirname, '..', 'node_modules')]
        return config
    },
}
