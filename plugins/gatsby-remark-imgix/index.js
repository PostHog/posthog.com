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
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})
const { createHash } = require('crypto')

const generateAWSKey = (filePath, branch) => `${branch}/${filePath.substring(filePath.indexOf('contents'))}`

const uploadFileToAWS = async (filePath, branch, cache) => {
    const file = fs.readFileSync(filePath)
    const key = generateAWSKey(filePath, branch)
    const cachedETag = await cache.get(key)
    if (cachedETag) {
        const hash = createHash('md5').update(file).digest('hex')
        if (cachedETag === hash) return
    }
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file,
    }
    try {
        const data = await s3.upload(params).promise()
        await cache.set(key, data?.ETag)
    } catch (err) {
        console.error(err)
    }
    return key
}

module.exports = async ({ markdownAST, getNode, markdownNode, cache }, { imgixDomain, imgixToken, branch }) => {
    const parentNode = getNode(markdownNode?.parent)
    if (!parentNode) return markdownAST
    const imagesToUpload = []
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
        if (branch && imgixDomain && imgixToken) {
            if (extension === 'gif') {
                const key = generateAWSKey(imagePath, branch)
                imagesToUpload.push(imagePath)
                const publicURL = `${process.env.CLOUDFRONT_DOMAIN}/${key}`
                html = `
                    <img
                        src='${publicURL}'
                        title='${node.alt || ''}'
                        alt='${node.alt || ''}'
                        loading='lazy'>
                `
            } else {
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
            }
        } else {
            // create local image
            const imageName = imagePath.replaceAll('/', '-') + path.basename(imagePath)
            const publicPath = path.join(process.cwd(), `public`, `static`, imageName)
            fs.copyFileSync(imagePath, publicPath)
            const publicURL = `/static/${imageName}`
            html = `
                <img
                    src='${publicURL}'
                    title='${node.alt || ''}'
                    alt='${node.alt || ''}'
                    loading='lazy'>
            `
        }

        node.value = html
        node.type = 'html'
        node.children = undefined
    })

    await Promise.all(imagesToUpload.map((imagePath) => uploadFileToAWS(imagePath, branch, cache)))

    return markdownAST
}
