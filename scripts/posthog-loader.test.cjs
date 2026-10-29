const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const path = require('node:path')
const { test } = require('node:test')
const { runInNewContext } = require('node:vm')
const http = require('node:http')
const { once } = require('node:events')
const { createHash } = require('node:crypto')
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

function render(environment, body = '', postBodyComponents) {
    const HTML = load('src/html.tsx', environment).default
    return renderToStaticMarkup(
        React.createElement(HTML, { body, htmlAttributes: {}, bodyAttributes: {}, postBodyComponents })
    )
}

function scripts(environment, postBodyComponents) {
    const dom = new JSDOM(render(environment, '', postBodyComponents))
    const document = dom.window.document.cloneNode(true)
    dom.window.close()
    return [...document.querySelectorAll('script')]
}

for (const assetHost of [env.GATSBY_POSTHOG_ASSET_HOST, undefined]) {
    test(`loads the local bootstrap before initialization (asset host: ${assetHost})`, () => {
        const elements = scripts({ ...env, GATSBY_POSTHOG_ASSET_HOST: assetHost })
        assert.equal(elements.length, 2)
        assert.equal(elements[0].getAttribute('src'), '/scripts/posthog-bootstrap.js')
        assert.equal(elements[0].getAttribute('data-asset-host'), assetHost || env.GATSBY_POSTHOG_API_HOST)
        assert.equal(elements[0].getAttribute('data-sdk-version'), '1')
        assert.equal(elements[0].hasAttribute('data-defer-init'), false)
        assert.equal(elements[0].hasAttribute('async'), false)
        assert.equal(elements[0].hasAttribute('defer'), false)
        assert.equal(elements[1].getAttribute('src'), '/scripts/posthog-init.js')
    })
}

test('analytics loads after server-rendered content and before Gatsby scripts', () => {
    const elements = scripts(env, React.createElement('script', { src: '/app.js', async: true }))
    const content = elements[0].ownerDocument.getElementById('___gatsby')
    assert.equal(elements[0].parentElement.tagName, 'BODY')
    assert.ok(content.compareDocumentPosition(elements[0]) & content.DOCUMENT_POSITION_FOLLOWING)
    assert.equal(elements[1].getAttribute('src'), '/scripts/posthog-init.js')
    assert.equal(elements[2].getAttribute('src'), '/app.js')
    assert.equal(elements[2].hasAttribute('async'), true)
})

for (const missing of ['GATSBY_POSTHOG_API_KEY', 'GATSBY_POSTHOG_API_HOST']) {
    test(`omits both analytics scripts without ${missing}`, () => {
        assert.equal(scripts({ ...env, [missing]: undefined }).length, 0)
    })
}

test('the local bootstrap matches the recorded SDK artifact provenance', () => {
    const provenance = JSON.parse(readFileSync(path.resolve(__dirname, 'posthog-bootstrap.provenance.json'), 'utf8'))
    const artifact = readFileSync(path.resolve(__dirname, '..', provenance.vendored_artifact))
    assert.equal(createHash('sha256').update(artifact).digest('hex'), provenance.vendored_sha256)
    assert.doesNotMatch(artifact.toString(), /sourceMappingURL=/)
    assert.match(provenance.commit, /^[0-9a-f]{40}$/)
    assert.ok(readFileSync(path.resolve(__dirname, '..', provenance.license)).length > 0)
})

async function generatedInit(environment = env) {
    const writes = new Map()
    const { onPreBootstrap } = load('gatsby/onPreBootstrap.ts', environment, {
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
    return script
}

test(
    'Gatsby application scripts start and queue calls while the analytics response is held',
    { timeout: 20000 },
    async (t) => {
        const puppeteer = require('puppeteer')
        let markup
        let initialization
        let pending
        let markRequested
        const analyticsRequests = []
        const requested = new Promise((resolve) => {
            markRequested = resolve
        })
        const server = http.createServer((request, response) => {
            const pathname = new URL(request.url, 'http://localhost').pathname
            response.setHeader('content-type', pathname === '/' ? 'text/html' : 'application/javascript')
            if (pathname === '/') return response.end(markup)
            if (pathname === '/scripts/posthog-bootstrap.js') {
                return response.end(readFileSync(path.resolve(__dirname, '../static/scripts/posthog-bootstrap.js')))
            }
            if (pathname === '/scripts/posthog-init.js') return response.end(initialization)
            if (pathname === '/app.js') {
                return response.end(`window.appReady = true;
                document.querySelector('#probe').addEventListener('click', function () {
                    document.querySelector('#result').textContent = 'clicked';
                    posthog.capture('queued-startup-probe');
                });`)
            }
            if (pathname.endsWith('/loader.js') || pathname.endsWith('/array.js')) {
                analyticsRequests.push(pathname)
                pending = response
                markRequested()
                return
            }
            response.statusCode = 404
            response.end('')
        })
        server.listen(0, '127.0.0.1')
        await once(server, 'listening')
        const origin = `http://127.0.0.1:${server.address().port}`
        const release = () => {
            if (pending && !pending.writableEnded) pending.end('window.sdkDownloadFinished = true;')
        }
        t.after(async () => {
            release()
            server.closeAllConnections()
            await new Promise((resolve) => server.close(resolve))
        })
        const environment = {
            ...env,
            GATSBY_POSTHOG_API_HOST: `${origin}/ingest`,
            GATSBY_POSTHOG_ASSET_HOST: `${origin}/assets`,
        }
        initialization = await generatedInit(environment)
        markup =
            '<!doctype html>' +
            render(
                environment,
                '<button id="probe">Probe</button><output id="result"></output>',
                React.createElement('script', { src: '/app.js', async: true })
            )
        const browser = await puppeteer.launch({
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
            headless: true,
            args: ['--no-sandbox'],
        })
        t.after(() => browser.close())
        const page = await browser.newPage()
        const errors = []
        page.on('pageerror', (error) => errors.push(error.message))
        const navigation = page.goto(origin, { waitUntil: 'load' })
        navigation.catch(() => {})
        await requested
        await page.waitForSelector('#probe')
        const readyBeforeRelease = await page
            .waitForFunction(() => window.appReady, { timeout: 5000 })
            .then(
                () => true,
                () => false
            )
        let queued
        if (readyBeforeRelease) {
            await page.click('#probe')
            queued = await page.evaluate(() => ({
                result: document.querySelector('#result').textContent,
                calls: window.posthog.slice(),
                token: window.posthog._i[0][0],
                apiHost: window.posthog._i[0][1].api_host,
                beforeSend: typeof window.posthog._i[0][1].before_send,
                loaded: window.posthog.__loaded === true,
            }))
        }
        release()
        await navigation
        assert.equal(readyBeforeRelease, true, 'Application startup is blocked by the held analytics response')
        assert.equal(queued.result, 'clicked')
        assert.deepEqual(queued.calls, [['capture', 'queued-startup-probe']])
        assert.equal(queued.token, env.GATSBY_POSTHOG_API_KEY)
        assert.equal(queued.apiHost, environment.GATSBY_POSTHOG_API_HOST)
        assert.equal(queued.beforeSend, 'function')
        assert.equal(queued.loaded, false)
        assert.deepEqual(analyticsRequests, ['/assets/static/1/array.js'])
        assert.equal(await page.evaluate(() => window.sdkDownloadFinished), true)
        assert.deepEqual(errors, [])
    }
)

test('the generated init script preserves configuration and callbacks without bootstrapping another SDK', async () => {
    const script = await generatedInit()
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
