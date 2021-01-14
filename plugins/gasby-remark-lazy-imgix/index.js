/* global __dirname, require, module */
const visit = require('unist-util-visit')
const imageSize = require(`probe-image-size`)
const fs = require(`fs-extra`)
const path = require(`path`)

const imageSizeCache = new Map()

const getImageSizeSync = (file) => {
    if (imageSizeCache.has(file)) {
        return imageSizeCache.get(file)
    }
    const dimensions = imageSize.sync(fs.readFileSync(file))
    if (!dimensions) {
        return null
    }

    imageSizeCache.set(file, dimensions)
    return dimensions
}

module.exports = ({ markdownAST }, { imgixHost, maxWidth }) => {
    // handle all image nodes
    visit(markdownAST, 'image', (node) => {
        // Always add lazy loading
        let html = `
            <img 
                class="gatsby-resp-image-image" 
                src='${node.url}' 
                title='${node.alt}' 
                alt='${node.alt}' 
                loading='lazy'>
        `

        // Get dimensions for local images
        if (
            node.url.startsWith('/') &&
            (node.url.endsWith('.png') || node.url.endsWith('.jpg') || node.url.endsWith('.gif'))
        ) {
            try {
                const dimensions = getImageSizeSync(path.join(__dirname, '../../public', node.url))
                let srcSet = ''
                if (imgixHost && !node.url.endsWith('.gif')) {
                    srcSet = [0.25, 0.5, 1, 1.5, 2, 3]
                        .map((m) => m * maxWidth)
                        .filter((w) => w <= dimensions.width)
                        .map((w) => `https://${imgixHost}${node.url}?w=${w}`)
                        .join(' ')
                }

                // in case the image is less than maxWidth wide, make it responsive (100vw) only if the screen is smaller than that
                const minWidth = Math.min(maxWidth, dimensions.width)

                html = `
                    <img
                        class="gatsby-resp-image-image"
                        src='${node.url}'
                        srcSet="${srcSet}" 
                        sizes="(max-width: ${minWidth}px) 100vw, ${minWidth}px"
                        title='${node.alt || ''}'
                        alt='${node.alt || ''}'
                        loading='lazy'>
                `
            } catch (e) {
                // can't get dimensions. ignore
            }
        }

        node.type = 'html' // this breaks the node type, so always use this plugin last
        node.children = undefined
        node.value = html
    })

    return markdownAST
}
