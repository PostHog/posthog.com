/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-redeclare
/* global __dirname, require, module */

const visit = require('unist-util-visit')
const fs = require(`fs`)
const path = require(`path`)
const isRelative = require('is-relative')
const mime = require('mime')
const sizeOf = require('image-size')
const { buildGatsbyImageDataObject } = require('@imgix/gatsby/dist/pluginHelpers')

const generateImageNode = ({ publicURL, srcSet, mime, width = 0, height = 0 }) => {
    const data = {
        layout: 'constrained',
        width,
        height,
        images: {
            fallback: {
                src: publicURL,
                srcSet,
                sizes: '(min-width: 1000px) 1000px, 100vw',
            },
            sources: [
                {
                    type: mime,
                    srcSet,
                    sizes: '(min-width: 1000px) 1000px, 100vw',
                },
            ],
        },
    }
    return data
}

module.exports = ({ markdownAST, getNode, markdownNode }, { imgixDomain, imgixToken, branch }) => {
    const parentNode = getNode(markdownNode?.parent)
    if (!parentNode) return markdownAST
    // handle all image nodes
    visit(markdownAST, 'image', (node) => {
        const url = node?.url
        if (!url || !isRelative(url)) return node

        const imagePath = path.resolve(
            path.join(parentNode?.absolutePath.substring(0, parentNode?.absolutePath.lastIndexOf('/'))),
            url
        )
        if (!fs.existsSync(imagePath)) return node
        let html
        const { width, height } = sizeOf(imagePath) ?? {}
        const mimeType = mime.getType(imagePath)
        const extension = mime.getExtension(mimeType)
        if (extension !== 'gif' && branch && imgixDomain && imgixToken) {
            // create imgix image
            const gitHubURL = `https://raw.githubusercontent.com/PostHog/posthog.com/${branch}/contents/${
                imagePath.split('contents/')[1]
            }`
            const data = buildGatsbyImageDataObject({
                url: gitHubURL,
                imgixClientOptions: {
                    domain: imgixDomain,
                    secureURLToken: imgixToken,
                },
                resolverArgs: {
                    layout: 'constrained',
                    imgixParams: {},
                    placeholderImgixParams: {},
                },
                dimensions: { width: width ?? 0, height: height ?? 0 },
            })

            const source = data.images.sources[0]

            html = `
                <img
                    src='${data.images.fallback.src}'
                    ${source ? `srcSet="${source.srcSet}" sizes="${source.sizes}"` : ''}
                    title='${node.alt || ''}'
                    alt='${node.alt || ''}'
                    loading='lazy'>
            `
        } else {
            // create local image
            const imageName = imagePath.replaceAll('/', '-') + path.basename(imagePath)
            const publicPath = path.join(process.cwd(), `public`, `static`, imageName)
            fs.copyFileSync(imagePath, publicPath)
            const publicURL = `/static/${imageName}`
            data = generateImageNode({
                publicURL,
                srcSet: '',
                mime: mimeType,
                width: width,
                height: height,
            })
            html = `
                <img
                    src='${publicURL}'
                    title='${node.alt || ''}'
                    alt='${node.alt || ''}'
                    loading='lazy'>
            `
        }

        // Add a link if the image is the first thing in the line (e.g.: ![alt](/path.png))
        // ... otherwise it's in a link already (e.g.: [![alt](/path.png)](http://link))
        const addLink = node.position.start.column === 1

        node.value = addLink ? `<a href='${node.url}'>${html}</a>` : html
        node.type = 'html' // this breaks the node type, so always use this plugin last
        node.children = undefined
    })

    return markdownAST
}
