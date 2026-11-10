const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const path = require('node:path')
const { test } = require('node:test')
const { runInNewContext } = require('node:vm')
const http = require('node:http')
const { once } = require('node:events')
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

function load(file, environment, dependencies = {}, globals = {}) {
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
        Request,
        AbortSignal,
        fetch,
        ...globals,
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

test('each build downloads the current bootstrap and replaces an existing generated file', async () => {
    const writes = new Map([['posthog-bootstrap.js', 'stale bootstrap']])
    const requests = []
    const download = async (request) => {
        requests.push(request)
        assert.equal(request.url, 'https://us-assets.i.posthog.com/static/1/loader-bootstrap.js')
        assert.equal(request.cache, 'no-store')
        assert.equal(request.signal.aborted, false)
        return new Response(
            `window.bootstrapVersion = ${requests.length};\n//# sourceMappingURL=loader-bootstrap.js.map\n`
        )
    }
    await generatedInit(env, download, writes)
    assert.equal(writes.get('posthog-bootstrap.js'), 'window.bootstrapVersion = 1;\n')
    await generatedInit(env, download, writes)
    assert.equal(writes.get('posthog-bootstrap.js'), 'window.bootstrapVersion = 2;\n')
    assert.equal(requests.length, 2)
})

for (const [name, failure] of [
    ...[408, 429, 503].map((status) => [`HTTP ${status}`, () => new Response('unavailable', { status })]),
    [
        'connection reset',
        () => {
            throw new TypeError('fetch failed: connection reset')
        },
    ],
    [
        'timeout',
        () => {
            throw new DOMException('The operation timed out', 'TimeoutError')
        },
    ],
    [
        'response body failure',
        () =>
            new Response(
                new ReadableStream({
                    start(controller) {
                        controller.error(new TypeError('connection reset while reading body'))
                    },
                })
            ),
    ],
]) {
    test(`a build retries ${name} with bounded backoff and publishes only a fresh bootstrap`, async () => {
        const writes = new Map([['posthog-bootstrap.js', 'stale bootstrap']])
        const requests = []
        const waits = []
        await generatedInit(
            env,
            async (request) => {
                requests.push(request)
                assert.equal(request.cache, 'no-store')
                assert.equal(request.signal.aborted, false)
                assert.equal(writes.get('posthog-bootstrap.js'), 'stale bootstrap')
                assert.equal(writes.has('posthog-init.js'), false)
                return requests.length < 3 ? failure() : new Response('window.bootstrapVersion = "fresh";')
            },
            writes,
            waits
        )
        assert.equal(requests.length, 3)
        assert.equal(new Set(requests.map((request) => request.signal)).size, 3)
        assert.deepEqual(waits, [500, 1000])
        assert.equal(writes.get('posthog-bootstrap.js'), 'window.bootstrapVersion = "fresh";')
        assert.equal(writes.has('posthog-init.js'), true)
    })
}

for (const [name, download, message, attempts] of [
    ['HTTP failure', async () => new Response('unavailable', { status: 503 }), /503/, 3],
    ['permanent HTTP failure', async () => new Response('not found', { status: 404 }), /404/, 1],
    ['empty response', async () => new Response('  \n'), /empty/i, 1],
    [
        'network failure',
        async () => {
            throw new Error('network unavailable')
        },
        /network unavailable/,
        3,
    ],
]) {
    test(`a build fails instead of keeping a stale bootstrap after ${name}`, async () => {
        const writes = new Map([['posthog-bootstrap.js', 'stale bootstrap']])
        const waits = []
        let requests = 0
        await assert.rejects(
            generatedInit(
                env,
                async () => {
                    requests++
                    return download()
                },
                writes,
                waits
            ),
            message
        )
        assert.equal(requests, attempts)
        assert.deepEqual(waits, attempts === 3 ? [500, 1000] : [])
        assert.equal(writes.get('posthog-bootstrap.js'), 'stale bootstrap')
        assert.equal(writes.has('posthog-init.js'), false)
    })
}

for (const missing of ['GATSBY_POSTHOG_API_KEY', 'GATSBY_POSTHOG_API_HOST']) {
    test(`a build does not download analytics without ${missing}`, async () => {
        let requests = 0
        const writes = new Map()
        await generatedInit(
            { ...env, [missing]: undefined },
            async () => {
                requests++
                return new Response('window.bootstrapVersion = 1;')
            },
            writes
        )
        assert.equal(requests, 0)
        assert.equal(writes.has('posthog-bootstrap.js'), false)
        assert.equal(writes.has('posthog-init.js'), false)
    })
}

async function generatedInit(
    environment = env,
    download = async () => new Response('window.bootstrapVersion = 1;'),
    writes = new Map(),
    waits = []
) {
    const { onPreBootstrap } = load(
        'gatsby/onPreBootstrap.ts',
        environment,
        {
            fs: {
                existsSync: () => true,
                readFileSync: () => JSON.stringify({ branch: 'master' }),
                writeFileSync: (file, value) => writes.set(path.basename(file), value),
                cpSync: () => {},
            },
            'timers/promises': { setTimeout: async (delay) => waits.push(delay) },
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
        },
        { fetch: download }
    )
    await onPreBootstrap({
        cache: {},
        store: {
            getState: () => ({
                flattenedPlugins: [{ name: 'gatsby-source-git', pluginOptions: { name: 'docs' } }],
            }),
        },
    })
    return writes.get('posthog-init.js')
}

test(
    'Gatsby application scripts start and queue calls while the analytics response is held',
    { timeout: 60000 },
    async (t) => {
        const puppeteer = require('puppeteer')
        let markup
        let initialization
        let bootstrap
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
                return response.end(bootstrap)
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
        const generated = new Map()
        initialization = await generatedInit(environment, fetch, generated)
        bootstrap = generated.get('posthog-bootstrap.js')
        assert.ok(bootstrap)
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
