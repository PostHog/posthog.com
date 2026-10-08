/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs/promises')
const path = require('node:path')
const http = require('node:http')
const https = require('node:https')
const dns = require('node:dns')
const { BlockList, isIP } = require('node:net')
const { createHash } = require('node:crypto')
const sharp = require('sharp')

const BUILT_INS = new Set(['coffee', 'pizza', 'pineapple', 'palm-tree', 'laptop', 'robot', 'terminal', 'cloud'])
const assets = path.join(__dirname, '../static')
const blocked = new BlockList()
for (const [address, prefix] of [
    ['0.0.0.0', 8],
    ['10.0.0.0', 8],
    ['100.64.0.0', 10],
    ['127.0.0.0', 8],
    ['169.254.0.0', 16],
    ['172.16.0.0', 12],
    ['192.0.0.0', 24],
    ['192.0.2.0', 24],
    ['192.168.0.0', 16],
    ['198.18.0.0', 15],
    ['198.51.100.0', 24],
    ['203.0.113.0', 24],
    ['224.0.0.0', 3],
])
    blocked.addSubnet(address, prefix, 'ipv4')
const globalIPv6 = new BlockList()
globalIPv6.addSubnet('2000::', 3, 'ipv6')
for (const [address, prefix] of [
    ['2001::', 23],
    ['2001:db8::', 32],
    ['2002::', 16],
]) {
    blocked.addSubnet(address, prefix, 'ipv6')
}

function isPublicAddress(address) {
    const family = isIP(address)
    return family === 4
        ? !blocked.check(address, 'ipv4')
        : family === 6 && globalIPv6.check(address, 'ipv6') && !blocked.check(address, 'ipv6')
}

function fetchArtwork(url, squeakOrigin, redirects = 0) {
    const localUpload = url.origin === squeakOrigin && url.pathname.startsWith('/uploads/')
    const hostname = url.hostname.replace(/^\[|\]$/g, '')
    if (
        url.username ||
        url.password ||
        (!localUpload && url.protocol !== 'https:') ||
        !['https:', 'http:'].includes(url.protocol) ||
        (!localUpload && isIP(hostname) && !isPublicAddress(hostname))
    ) {
        return Promise.reject(new Error('Unsupported artwork address'))
    }
    return new Promise((resolve, reject) => {
        const request = (url.protocol === 'https:' ? https : http).get(
            url,
            {
                signal: AbortSignal.timeout(8000),
                headers: { Accept: 'image/*', ...(localUpload ? { 'ngrok-skip-browser-warning': '1' } : {}) },
                lookup: (host, options, callback) =>
                    dns.lookup(host, { all: true }, (error, addresses) => {
                        // Validate and use the same DNS result for the connection, including redirects.
                        if (
                            error ||
                            !addresses?.length ||
                            (!localUpload && addresses.some(({ address }) => !isPublicAddress(address)))
                        ) {
                            return callback(error || new Error('Unsupported artwork address'))
                        }
                        if (options.all) callback(null, addresses)
                        else callback(null, addresses[0].address, addresses[0].family)
                    }),
            },
            (response) => {
                if (
                    [301, 302, 303, 307, 308].includes(response.statusCode) &&
                    response.headers.location &&
                    redirects < 3
                ) {
                    response.resume()
                    try {
                        resolve(fetchArtwork(new URL(response.headers.location, url), squeakOrigin, redirects + 1))
                    } catch (error) {
                        reject(error)
                    }
                    return
                }
                if (response.statusCode !== 200) {
                    response.resume()
                    return reject(new Error('Artwork could not be loaded'))
                }
                let size = 0
                const chunks = []
                response.on('data', (chunk) => {
                    size += chunk.length
                    if (size > 8 * 1024 * 1024) request.destroy(new Error('Artwork exceeds 8 MB'))
                    else chunks.push(chunk)
                })
                response.on('end', () => resolve(Buffer.concat(chunks)))
                response.on('error', reject)
            }
        )
        request.on('error', reject)
    })
}

function checkSVG(buffer) {
    const text = buffer.toString('utf8')
    if (!/<svg[\s>]/i.test(text)) return
    if (
        /<!DOCTYPE|<!ENTITY|@import|xml:base/i.test(text) ||
        [...text.matchAll(/(?:href|src)\s*=\s*["']([^"']*)["']/gi)].some(
            (match) => !/^(#|data:image\/)/i.test(match[1])
        ) ||
        [...text.matchAll(/url\(\s*["']?([^)'"\s]+)/gi)].some((match) => !/^(#|data:image\/)/i.test(match[1]))
    ) {
        throw new Error('SVG artwork must contain its own images')
    }
}

async function renderLaptop(laptop, theme, squeakOrigin, loadArtwork = fetchArtwork) {
    const images = new Map()
    const placements = laptop.placements
    if (!Array.isArray(placements) || placements.length > 1000) throw new Error('Unsupported laptop layout')
    const layers = []
    const ordered = [...placements.filter((p) => p.removedAt), ...placements.filter((p) => !p.removedAt)]
    for (let start = 0; start < ordered.length; start += 4) {
        layers.push(
            ...(await Promise.all(
                ordered
                    .slice(start, start + 4)
                    .filter((p) => p.sticker)
                    .map(async (placement) => {
                        const { sticker, size, x, y, rotation, removedAt } = placement
                        if (
                            ![size, x, y, rotation].every(Number.isFinite) ||
                            size < 0.025 ||
                            size > 0.45 ||
                            x < 0 ||
                            x > 1 ||
                            y < 0 ||
                            y > 1
                        ) {
                            throw new Error('Invalid sticker placement')
                        }
                        const key = sticker.imageUrl || sticker.artwork
                        if (!images.has(key)) {
                            images.set(
                                key,
                                sticker.imageUrl
                                    ? loadArtwork(new URL(sticker.imageUrl, squeakOrigin), new URL(squeakOrigin).origin)
                                    : BUILT_INS.has(key)
                                    ? fs.readFile(path.join(assets, 'stickers/laptop', `${key}.svg`))
                                    : Promise.reject(new Error('Sticker artwork is missing'))
                            )
                        }
                        const input = await images.get(key)
                        checkSVG(input)
                        const width = Math.round(768 * size)
                        const { data, info } = await sharp(input, { limitInputPixels: 25000000 })
                            .resize(width, width, { fit: 'contain', background: '#00000000' })
                            .toColourspace('srgb')
                            .ensureAlpha()
                            .raw()
                            .toBuffer({ resolveWithObject: true })
                        for (let i = 0; i < data.length; i += 4) {
                            if (removedAt) {
                                data[i] = 209
                                data[i + 1] = 202
                                data[i + 2] = 182
                                data[i + 3] *= 0.28
                            } else if (sticker.holographic) {
                                const phase = ((((i / 4) % width) + Math.floor(i / 4 / width)) / width) * 0.8
                                const strength =
                                    0.3 + ((data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722) / 255) * 0.5
                                const seed =
                                    Math.sin(
                                        Math.floor((i / 4) % width) * 12.9898 + Math.floor(i / 4 / width) * 78.233
                                    ) * 437.5
                                const grain = seed - Math.floor(seed)
                                const sparkle =
                                    grain > 0.88
                                        ? Math.pow(Math.max(0, Math.cos(grain * 62.8 + phase * 9)), 12) * 0.95
                                        : 0
                                const glint = Math.pow(Math.max(0, Math.cos(phase * Math.PI * 4)), 32) * 0.4
                                for (let channel = 0; channel < 3; channel++) {
                                    const foil = (0.55 + 0.45 * Math.cos(2 * Math.PI * (phase + channel / 3))) * 255
                                    data[i + channel] = Math.min(
                                        255,
                                        Math.round(
                                            data[i + channel] * (1 - strength) +
                                                foil * strength +
                                                (glint + sparkle) * 255
                                        )
                                    )
                                }
                            }
                        }
                        const rotated = await sharp(data, { raw: info })
                            .rotate(rotation % 360, { background: '#00000000' })
                            .png()
                            .toBuffer({ resolveWithObject: true })
                        return {
                            input: rotated.data,
                            left: Math.round(84 + x * 768 - rotated.info.width / 2),
                            top: Math.round(10 + y * 512 - rotated.info.height / 2),
                        }
                    })
            ))
        )
    }
    const lid =
        theme === 'dark'
            ? await sharp({ create: { width: 933, height: 729, channels: 4, background: '#00000000' } })
                  .composite([
                      {
                          input: await sharp(path.join(assets, 'images/dark_mode_laptop.png'))
                              .resize(793)
                              .extract({ left: 0, top: 11, width: 793, height: 559 })
                              .png()
                              .toBuffer(),
                          left: 74,
                          top: 0,
                      },
                  ])
                  .png()
                  .toBuffer()
            : await fs.readFile(path.join(assets, 'images/light_mode_laptop.png'))
    const image = await sharp(lid).composite(layers).png().toBuffer()
    const fitted = await sharp(image).resize({ height: 610 }).png().toBuffer()
    return sharp({
        create: { width: 1200, height: 630, channels: 4, background: theme === 'dark' ? '#25262b' : '#f3f2ed' },
    })
        .composite([{ input: fitted, gravity: 'centre' }])
        .png()
        .toBuffer()
}

const escapeHTML = (text) =>
    String(text).replace(
        /[&<>"']/g,
        (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])
    )

async function handler(req, res) {
    if (!['GET', 'HEAD'].includes(req.method)) return res.status(405).setHeader('Allow', 'GET, HEAD').end()
    const id = String(req.query.profileId || '')
    const theme = req.query.theme === 'dark' ? 'dark' : 'light'
    if (!/^[1-9]\d*$/.test(id) || Number(id) > 2147483647) return res.status(400).json({ error: 'Invalid profile ID' })
    try {
        const squeak =
            process.env.SQUEAK_SOURCE_HOST || process.env.GATSBY_SQUEAK_AUTH_HOST || process.env.GATSBY_SQUEAK_API_HOST
        if (!squeak) throw new Error('Squeak host is not configured')
        const response = await fetch(new URL(`/api/profiles/${id}/laptop`, squeak), {
            headers: { 'ngrok-skip-browser-warning': '1' },
            signal: AbortSignal.timeout(10000),
        })
        if (response.status === 404) return res.status(404).json({ error: 'Laptop not found' })
        if (!response.ok) throw new Error('Could not load laptop')
        const { data: laptop } = await response.json()
        const revision = createHash('sha256').update(JSON.stringify(laptop)).digest('hex').slice(0, 16)
        res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60')
        res.setHeader('X-Content-Type-Options', 'nosniff')
        if (req.query.format === 'png') {
            const image = await renderLaptop(laptop, theme, squeak)
            res.setHeader('Content-Type', 'image/png')
            res.setHeader('Content-Disposition', `inline; filename="posthog-laptop-${id}.png"`)
            return req.method === 'HEAD' ? res.status(200).end() : res.status(200).send(image)
        }
        const host = req.headers['x-forwarded-host'] || req.headers.host
        if (typeof host !== 'string' || !/^[a-z0-9.-]+(?::\d+)?$/i.test(host)) throw new Error('Invalid share host')
        const protocol = ['http', 'https'].includes(req.headers['x-forwarded-proto'])
            ? req.headers['x-forwarded-proto']
            : req.protocol || (process.env.VERCEL ? 'https' : 'http')
        const origin = `${protocol}://${host}`
        const url = escapeHTML(`${origin}/community/laptops/${id}?theme=${theme}`)
        const image = escapeHTML(`${origin}/api/laptop-share?profileId=${id}&format=png&theme=${theme}&v=${revision}`)
        const profile = `/community/profiles/${id}?laptop=1`
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        return res.status(200)
            .send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Community laptop - PostHog</title><link rel="canonical" href="${url}">
<meta property="og:type" content="website"><meta property="og:title" content="Check out this laptop - PostHog">
<meta property="og:description" content="A laptop covered in stickers earned in the PostHog community."><meta property="og:url" content="${url}">
<meta property="og:image" content="${image}"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="This community member's decorated laptop">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${image}"><meta name="twitter:title" content="Check out this laptop - PostHog">
<script src="/scripts/laptop-share.js" defer></script></head><body>
<a id="open-laptop" href="${profile}">Open laptop on PostHog</a><p><img src="${image}" alt="This community member's decorated laptop" width="1200" height="630" style="max-width:100%;height:auto"></p>
</body></html>`)
    } catch (error) {
        console.error('Laptop share failed:', error.message)
        res.setHeader('Cache-Control', 'no-store')
        return res
            .status(502)
            .json({ error: 'Could not create the laptop image. Check that its artwork is available, then try again.' })
    }
}

module.exports = handler
module.exports.renderLaptop = renderLaptop
module.exports.isPublicAddress = isPublicAddress
module.exports.fetchArtwork = fetchArtwork
