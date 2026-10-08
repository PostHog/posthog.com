const assert = require('node:assert/strict')
const test = require('node:test')
const sharp = require('sharp')
const handler = require('../api/laptop-share')
const { renderLaptop, isPublicAddress, fetchArtwork } = handler

test('share images preserve layer order, transparency, stains, and holographic finishes in both themes', async () => {
    const circle = (color) =>
        Buffer.from(
            `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="45" fill="${color}"/></svg>`
        )
    const art = async (url) => circle(url.pathname.includes('red') ? '#ff0000' : '#0000ff')
    const p = (name, extra = {}) => ({
        id: 1,
        x: 0.5,
        y: 0.5,
        size: 0.2,
        rotation: 0,
        sticker: { imageUrl: `https://assets.example/${name}.svg` },
        ...extra,
    })
    const pixel = async (buffer, x, y) => {
        const scale = 610 / 729
        return [
            ...(await sharp(buffer)
                .extract({
                    left: Math.round((1200 - 933 * scale) / 2 + (84 + x * 768) * scale),
                    top: Math.round(10 + (10 + y * 512) * scale),
                    width: 1,
                    height: 1,
                })
                .raw()
                .toBuffer()),
        ]
    }
    for (const theme of ['light', 'dark']) {
        const empty = await renderLaptop({ placements: [] }, theme, 'https://squeak.example', art)
        const stacked = await renderLaptop({ placements: [p('red'), p('blue')] }, theme, 'https://squeak.example', art)
        const metadata = await sharp(stacked).metadata()
        assert.equal(metadata.width, 1200)
        assert.equal(metadata.height, 630)
        assert.deepEqual((await pixel(stacked, 0.5, 0.5)).slice(0, 3), [0, 0, 255])
        const stain = await renderLaptop(
            { placements: [p('red', { removedAt: 'now', rotation: 30 })] },
            theme,
            'https://squeak.example',
            art
        )
        assert.notDeepEqual(await pixel(stain, 0.5, 0.5), await pixel(empty, 0.5, 0.5))
        assert.deepEqual(
            await pixel(stain, 0.6, 0.65),
            await pixel(empty, 0.6, 0.65),
            'Transparent corners must not leave a square stain'
        )
        const covered = await renderLaptop(
            { placements: [p('blue'), p('red', { removedAt: 'now' })] },
            theme,
            'https://squeak.example',
            art
        )
        assert.deepEqual(
            await pixel(covered, 0.5, 0.5),
            await pixel(stacked, 0.5, 0.5),
            'All residue stays below attached artwork'
        )
        const foil = await renderLaptop(
            { placements: [p('red', { sticker: { imageUrl: 'https://assets.example/red.svg', holographic: true } })] },
            theme,
            'https://squeak.example',
            art
        )
        assert.notDeepEqual((await pixel(foil, 0.5, 0.5)).slice(0, 3), [255, 0, 0])
    }
})

test('remote artwork cannot request local/private hosts or embed external SVG resources', async () => {
    for (const address of [
        '127.0.0.1',
        '10.0.0.1',
        '192.168.1.1',
        '169.254.169.254',
        '100.64.0.1',
        '::1',
        '::ffff:127.0.0.1',
        'fc00::1',
    ])
        assert.equal(isPublicAddress(address), false)
    for (const address of ['1.1.1.1', '8.8.8.8', '2606:4700:4700::1111']) assert.equal(isPublicAddress(address), true)
    for (const url of [
        'https://127.0.0.1/secret',
        'https://[::1]/secret',
        'https://169.254.169.254/latest/meta-data',
        'http://example.com/image.png',
        'file:///etc/passwd',
        'https://user:pass@example.com/image.png',
    ]) {
        await assert.rejects(fetchArtwork(new URL(url), 'https://squeak.example'), /Unsupported artwork address/)
    }
    await assert.rejects(
        renderLaptop(
            {
                placements: [
                    {
                        x: 0.5,
                        y: 0.5,
                        size: 0.2,
                        rotation: 0,
                        sticker: { imageUrl: 'https://assets.example/unsafe.svg' },
                    },
                ],
            },
            'light',
            'https://squeak.example',
            async () => Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><image href="file:///etc/passwd"/></svg>')
        ),
        /must contain its own images/
    )
})

test('share links return crawler metadata, revisioned PNG URLs, profile navigation, and useful failures', async () => {
    const fetch = global.fetch
    const host = process.env.GATSBY_SQUEAK_AUTH_HOST
    const sourceHost = process.env.SQUEAK_SOURCE_HOST
    delete process.env.SQUEAK_SOURCE_HOST
    let expectedHost = 'https://squeak.example'
    const log = console.error
    process.env.GATSBY_SQUEAK_AUTH_HOST = 'https://squeak.example'
    let status = 200
    let placements = []
    global.fetch = async (url, options) => {
        assert.equal(String(url), `${expectedHost}/api/profiles/42/laptop`)
        assert.equal(options.headers.Authorization, undefined)
        return { status, ok: status === 200, json: async () => ({ data: { placements } }) }
    }
    const request = async (query = {}, method = 'GET') => {
        const res = {
            headers: {},
            code: 200,
            body: undefined,
            status(code) {
                this.code = code
                return this
            },
            setHeader(name, value) {
                this.headers[name] = value
                return this
            },
            send(body) {
                this.body = body
                return this
            },
            json(body) {
                this.body = body
                return this
            },
            end() {
                return this
            },
        }
        await handler(
            {
                method,
                query: { profileId: '42', theme: 'dark', ...query },
                headers: { host: 'posthog.example', 'x-forwarded-proto': 'https' },
            },
            res
        )
        return res
    }
    try {
        const html = await request()
        assert.equal(html.code, 200)
        assert.match(html.headers['Content-Type'], /text\/html/)
        assert.match(
            html.body,
            /property="og:image" content="https:\/\/posthog.example\/api\/laptop-share\?profileId=42&amp;format=png&amp;theme=dark&amp;v=[a-f0-9]+"/
        )
        assert.match(html.body, /name="twitter:card" content="summary_large_image"/)
        assert.match(html.body, /href="\/community\/profiles\/42\?laptop=1"/)
        assert.match(html.body, /src="\/scripts\/laptop-share.js" defer/)
        const png = await request({ format: 'png' })
        assert.equal(png.headers['Content-Type'], 'image/png')
        assert.equal((await sharp(png.body).metadata()).width, 1200)
        assert.equal((await request({ format: 'png' }, 'HEAD')).body, undefined)
        placements = [{ id: 1, sticker: null, removedAt: 'now' }]
        assert.notEqual((await request()).body, html.body, 'Changed layouts get a different OG image revision')
        assert.equal((await request({}, 'POST')).code, 405)
        assert.equal((await request({ profileId: '../42' })).code, 400)
        process.env.SQUEAK_SOURCE_HOST = expectedHost = 'http://127.0.0.1:1337'
        assert.equal((await request()).code, 200)
        status = 404
        assert.equal((await request()).code, 404)
        status = 503
        console.error = () => {}
        const failure = await request()
        assert.equal(failure.code, 502)
        assert.equal(failure.headers['Cache-Control'], 'no-store')
    } finally {
        global.fetch = fetch
        if (sourceHost === undefined) delete process.env.SQUEAK_SOURCE_HOST
        else process.env.SQUEAK_SOURCE_HOST = sourceHost
        console.error = log
        if (host === undefined) delete process.env.GATSBY_SQUEAK_AUTH_HOST
        else process.env.GATSBY_SQUEAK_AUTH_HOST = host
    }
})
