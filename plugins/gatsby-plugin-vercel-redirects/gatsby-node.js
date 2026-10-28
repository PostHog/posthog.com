const fs = require('fs')
const path = require('path')
const { compileRedirects } = require('./compile')

const MAX_FUNCTION_ROUTE_RULES = 100

const STATIC_ASSET_ROUTES = [
    '/static/*',
    '/fonts/*',
    '/images/*',
    '/icons/*',
    '/scripts/*',
    '/sounds/*',
    '/app-*.js',
    '/framework-*.js',
    '/webpack-runtime-*.js',
    '/component---*.js',
    '/polyfill-*.js',
    '/commons-*.js',
    '/styles*.css',
]

exports.onPreBootstrap = ({ store }) => {
    const directory = store.getState().program.directory
    const config = JSON.parse(fs.readFileSync(path.join(directory, 'vercel.json'), 'utf8'))
    const rules = compileRedirects(config.redirects)
    fs.mkdirSync(path.join(directory, '.cache'), { recursive: true })
    fs.writeFileSync(path.join(directory, '.cache/vercel-redirects.json'), JSON.stringify(rules))
}

exports.onPostBuild = ({ store }) => {
    const directory = store.getState().program.directory
    const outputDirectory = path.join(directory, 'public')
    const rules = JSON.parse(fs.readFileSync(path.join(directory, '.cache/vercel-redirects.json'), 'utf8'))
    const redirectPatterns = rules.map(({ src }) => new RegExp(src))
    const hashedChunks = fs
        .readdirSync(outputDirectory, { withFileTypes: true })
        .filter((entry) => entry.isFile() && /^[a-f0-9]{8,40}-[a-f0-9]+\.js$/.test(entry.name))
        .map((entry) => `/${entry.name}`)
        .filter((route) => !redirectPatterns.some((pattern) => pattern.test(route)))
        .sort()
    const include = ['/*']
    const exclude = [...STATIC_ASSET_ROUTES, ...hashedChunks].slice(0, MAX_FUNCTION_ROUTE_RULES - include.length)
    fs.writeFileSync(path.join(outputDirectory, '_routes.json'), JSON.stringify({ version: 1, include, exclude }))
}
