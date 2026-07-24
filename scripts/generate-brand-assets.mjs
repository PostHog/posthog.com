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

const scaleDimensions = ([width, height], scale) => [width * scale, height * scale]
const padDimensions = ([width, height], padding) => [width + padding * 2, height + padding * 2]

const getNativeDimensions = (props) => {
    const markup = renderToStaticMarkup(React.createElement(Logo, props))
    const viewBox = markup.match(/\bviewBox="([^"]+)"/)?.[1]
    const dimensions = viewBox?.trim().split(/\s+/).map(Number)

    if (dimensions?.length !== 4 || dimensions.some((value) => !Number.isFinite(value))) {
        throw new Error(`Unable to read logo viewBox from: ${markup.slice(0, 200)}`)
    }

    return dimensions.slice(2)
}

const createAsset = ({ name, props, pngScale = 1, padding = 5, paddedSvg = true }) => {
    const svg = getNativeDimensions(props)
    const png = scaleDimensions(svg, pngScale)
    const padded = padDimensions(png, padding)

    return {
        name,
        props,
        svg,
        png,
        png2x: scaleDimensions(png, 2),
        padded,
        padded2x: scaleDimensions(padded, 2),
        paddedSvg,
    }
}

const assets = [
    createAsset({
        name: 'posthog-logo',
        props: {},
    }),
    createAsset({
        name: 'posthog-logo-black',
        props: { variant: 'mono', color: '#111' },
    }),
    createAsset({
        name: 'posthog-logo-white',
        props: { variant: 'mono', color: '#FAFAFA' },
    }),
    createAsset({
        name: 'posthog-logomark',
        props: { layout: 'logomark' },
    }),
    createAsset({
        name: 'posthog-logo-stacked',
        props: { layout: 'stacked' },
        pngScale: 5,
        padding: 20,
        paddedSvg: false,
    }),
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
// logomark aspect ratio intact and center it on a transparent square canvas instead of stretching it.
const squareLogomarkProps = { layout: 'logomark' }
await writeSvg(
    'posthog-logomark-square.svg',
    renderPaddedLogo(squareLogomarkProps, getNativeDimensions(squareLogomarkProps), [60, 60])
)

console.log(`Generated ${assets.length} public logo variants in ${path.relative(process.cwd(), outputDirectory)}`)
