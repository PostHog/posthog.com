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
        config.module.rules[0].use[0].options.plugins = [
            // use @babel/plugin-proposal-class-properties for class arrow functions
            require.resolve('@babel/plugin-proposal-class-properties'),
            // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
            require.resolve('babel-plugin-remove-graphql-queries'),
        ]
        // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
        config.resolve.mainFields = ['browser', 'module', 'main']
        config.resolve.modules = [path.resolve(__dirname, '..', 'src'), path.resolve(__dirname, '..', 'node_modules')]
        return config
    },
}
