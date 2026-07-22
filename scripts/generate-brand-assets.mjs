import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import sharp from 'sharp'
import { Logo } from '@posthog/brand/logo'

// Materialize stable /brand URLs from the canonical package before Gatsby copies static/ to public/.
// package.json lifecycle hooks run this automatically for the standard start and build commands.
const outputDirectory = fileURLToPath(new URL('../static/brand/', import.meta.url))

const assets = [
    {
        name: 'posthog-logo',
        props: {},
        svg: [157, 30],
        png: [157, 30],
        png2x: [314, 60],
        padded: [167, 40],
        padded2x: [334, 80],
        paddedSvg: true,
    },
    {
        name: 'posthog-logo-black',
        props: { variant: 'mono', color: '#111' },
        svg: [157, 30],
        png: [157, 30],
        png2x: [314, 60],
        padded: [167, 40],
        padded2x: [334, 80],
        paddedSvg: true,
    },
    {
        name: 'posthog-logo-white',
        props: { variant: 'mono', color: '#FAFAFA' },
        svg: [157, 30],
        png: [157, 30],
        png2x: [314, 60],
        padded: [167, 40],
        padded2x: [334, 80],
        paddedSvg: true,
    },
    {
        name: 'posthog-logomark',
        props: { layout: 'logomark' },
        svg: [50, 30],
        png: [50, 30],
        png2x: [100, 60],
        padded: [60, 40],
        padded2x: [120, 80],
        paddedSvg: true,
    },
    {
        name: 'posthog-logo-stacked',
        props: { layout: 'stacked' },
        svg: [137, 132],
        png: [499, 479],
        png2x: [996, 956],
        padded: [539, 518],
        padded2x: [1076, 1036],
        paddedSvg: false,
    },
]

const replaceRootSvgAttributes = (markup, attributes) =>
    markup.replace(/^<svg\b([^>]*)>/, (_match, currentAttributes) => {
        const cleanedAttributes = currentAttributes.replace(
            /\s(?:aria-hidden|height|role|width|x|y)=(?:"[^"]*"|'[^']*')/g,
            ''
        )
        const serializedAttributes = Object.entries(attributes)
            .map(([name, value]) => ` ${name}="${value}"`)
            .join('')
        return `<svg${cleanedAttributes}${serializedAttributes}>`
    })

const renderLogo = (props, [width, height]) =>
    replaceRootSvgAttributes(renderToStaticMarkup(React.createElement(Logo, props)), { width, height })

const renderPaddedLogo = (props, [contentWidth, contentHeight], [width, height]) => {
    const x = (width - contentWidth) / 2
    const y = (height - contentHeight) / 2
    const innerLogo = replaceRootSvgAttributes(renderToStaticMarkup(React.createElement(Logo, props)), {
        x,
        y,
        width: contentWidth,
        height: contentHeight,
    })

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${innerLogo}</svg>`
}

const writeSvg = (filename, svg) => fs.writeFile(path.join(outputDirectory, filename), `${svg}\n`)

const writePng = (filename, svg, [width, height]) =>
    sharp(Buffer.from(svg), { density: 288 })
        .resize(width, height, { fit: 'fill' })
        .png({ compressionLevel: 9, palette: true })
        .toFile(path.join(outputDirectory, filename))

await fs.mkdir(outputDirectory, { recursive: true })

for (const asset of assets) {
    const svg = renderLogo(asset.props, asset.svg)
    const pngSvg = renderLogo(asset.props, asset.png)
    const png2xSvg = renderLogo(asset.props, asset.png2x)
    const paddedSvg = renderPaddedLogo(asset.props, asset.png, asset.padded)
    const padded2xSvg = renderPaddedLogo(asset.props, asset.png2x, asset.padded2x)

    await Promise.all([
        writeSvg(`${asset.name}.svg`, svg),
        writePng(`${asset.name}.png`, pngSvg, asset.png),
        writePng(`${asset.name}@2x.png`, png2xSvg, asset.png2x),
        writePng(`${asset.name}-padded.png`, paddedSvg, asset.padded),
        writePng(`${asset.name}-padded@2x.png`, padded2xSvg, asset.padded2x),
        ...(asset.paddedSvg ? [writeSvg(`${asset.name}-padded.svg`, paddedSvg)] : []),
    ])
}

// Image-only integrations often force avatars into square boxes. Keep the official
// 52:28 logomark intact and center it on a transparent square canvas instead of stretching it.
await writeSvg('posthog-logomark-square.svg', renderPaddedLogo({ layout: 'logomark' }, [52, 28], [60, 60]))

console.log(`Generated ${assets.length} public logo variants in ${path.relative(process.cwd(), outputDirectory)}`)
