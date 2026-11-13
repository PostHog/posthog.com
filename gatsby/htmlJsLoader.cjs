module.exports = function (source, sourceMap) {
    const isBrowser = this.getOptions().stage === 'build-javascript'
    if (
        (isBrowser && /lodash/.test(source)) ||
        /graphql|macro|gatsby-plugin-image|\(\?<[^=!]|\\[pP]\{|=\s*("[^"]*[\r\n][^"]*"|'[^']*[\r\n][^']*')/.test(source)
    )
        return require('gatsby/dist/utils/babel-loader').default.call(this, source, sourceMap)
    const callback = this.async()
    require('esbuild')
        .transform(source, {
            loader: /\.tsx?$/.test(this.resourcePath) ? this.resourcePath.split('.').pop() : 'jsx',
            target: isBrowser ? 'es2017' : 'node22',
            jsx: source.includes('@jsx') ? 'transform' : 'automatic',
            tsconfigRaw: { compilerOptions: { useDefineForClassFields: false } },
        })
        .then(({ code }) => callback(null, code), callback)
}
