const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const path = require('node:path')
const { test } = require('node:test')
const { runInNewContext } = require('node:vm')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const { JSDOM } = require('jsdom')
const ts = require('typescript')

const env = {
    GATSBY_POSTHOG_API_KEY: 'phc_test',
    GATSBY_POSTHOG_API_HOST: 'https://ingest.example.com',
    GATSBY_POSTHOG_UI_HOST: 'https://us.posthog.com',
    GATSBY_POSTHOG_ASSET_HOST: 'https://us-assets.i.posthog.com',
}

function load(file, environment, dependencies = {}) {
    const filename = path.resolve(__dirname, '..', file)
    const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
    })
    const exports = {}
    runInNewContext(outputText, {
        exports,
        __dirname: path.dirname(filename),
        process: { env: environment },
        require: (name) => (name in dependencies ? dependencies[name] : require(name)),
    })
    return exports
}

function scripts(environment) {
    const HTML = load('src/html.tsx', environment).default
    const markup = renderToStaticMarkup(React.createElement(HTML, { body: '', htmlAttributes: {}, bodyAttributes: {} }))
    const dom = new JSDOM(markup)
    const result = [...dom.window.document.querySelectorAll('script')]
    dom.window.close()
    return result
}

for (const assetHost of [env.GATSBY_POSTHOG_ASSET_HOST, undefined]) {
    test(`loads the deferred bootstrap before initialization (asset host: ${assetHost})`, () => {
        const elements = scripts({ ...env, GATSBY_POSTHOG_ASSET_HOST: assetHost })
        assert.equal(elements.length, 2)
        assert.equal(
            elements[0].getAttribute('src'),
            assetHost ? `${assetHost}/static/1/loader.js` : `${env.GATSBY_POSTHOG_API_HOST}/static/loader.js`
        )
        assert.equal(elements[0].getAttribute('data-defer-init'), 'true')
        assert.equal(elements[0].getAttribute('crossorigin'), 'anonymous')
        assert.equal(elements[0].hasAttribute('async'), false)
        assert.equal(elements[0].hasAttribute('defer'), false)
        assert.equal(elements[1].getAttribute('src'), '/scripts/posthog-init.js')
    })
}

for (const missing of ['GATSBY_POSTHOG_API_KEY', 'GATSBY_POSTHOG_API_HOST']) {
    test(`omits both analytics scripts without ${missing}`, () => {
        assert.equal(scripts({ ...env, [missing]: undefined }).length, 0)
    })
}

test('the generated init script preserves configuration and callbacks without bootstrapping another SDK', async () => {
    const writes = new Map()
    const { onPreBootstrap } = load('gatsby/onPreBootstrap.ts', env, {
        fs: {
            existsSync: () => true,
            readFileSync: () => JSON.stringify({ branch: 'master' }),
            writeFileSync: (file, value) => writes.set(path.basename(file), value),
            cpSync: () => {},
        },
        './devFetchCache': { cacheFetchResponsesInDevelopment: () => {} },
        './enrichVideos': { enrichVideos: async () => {} },
        './utils/fetchMCPTools': {
            fetchAndProcessMCPTools: async () => ({ error: true }),
            writeMCPToolsToFile: () => {},
        },
        './utils/fetchScoutSkills': {
            fetchScoutSkills: async () => [],
            writeScoutSkillsToFile: () => {},
        },
    })
    await onPreBootstrap({
        cache: {},
        store: {
            getState: () => ({
                flattenedPlugins: [{ name: 'gatsby-source-git', pluginOptions: { name: 'docs' } }],
            }),
        },
    })
    const script = writes.get('posthog-init.js')
    assert.ok(script)
    assert.doesNotMatch(script, /__SV|createElement|array\.js/)
    let configuration
    const window = { location: { hostname: 'posthog.com' } }
    runInNewContext(script, {
        window,
        posthog: {
            init: (token, config) => {
                assert.equal(token, env.GATSBY_POSTHOG_API_KEY)
                configuration = config
            },
        },
    })
    assert.equal(configuration.api_host, env.GATSBY_POSTHOG_API_HOST)
    assert.equal(configuration.asset_host, env.GATSBY_POSTHOG_ASSET_HOST)
    assert.equal(configuration.strict_script_versioning, true)
    assert.equal(configuration.defaults, 'latest')
    assert.equal(configuration.capture_pageview, false)
    assert.equal(configuration.capture_pageleave, true)
    assert.equal(configuration.session_recording.maskInputOptions.password, true)
    assert.equal(configuration.capture_webmcp, true)
    assert.equal(configuration.person_profiles, 'identified_only')
    const exception = { event: '$exception' }
    assert.equal(configuration.before_send(exception), exception)
    for (const hostname of ['localhost', '127.0.0.1']) {
        window.location.hostname = hostname
        assert.equal(configuration.before_send(exception), null)
        const pageview = { event: '$pageview' }
        assert.equal(configuration.before_send(pageview), pageview)
    }
})
