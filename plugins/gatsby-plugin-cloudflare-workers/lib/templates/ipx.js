;(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports)
        if (v !== undefined) module.exports = v
    } else if (typeof define === 'function' && define.amd) {
        define(['require', 'exports', 'buffer', '@netlify/ipx'], factory)
    }
})(function (require, exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.handler = void 0
    const buffer_1 = require('buffer')
    const ipx_1 = require('@netlify/ipx')
    const ipxHandler = (0, ipx_1.createIPXHandler)({
        propsEncoding: 'base64',
        basePath: '/_gatsby/image/',
        bypassDomainCheck: true,
    })
    // eslint-disable-next-line require-await
    const handler = async (event, ...rest) => {
        const { pathname, host } = new URL(event.rawUrl)
        const [, , type, encodedUrl] = pathname.split('/')
        if (type === 'image') {
            return ipxHandler(event, ...rest)
        }
        try {
            const urlString = buffer_1.Buffer.from(encodedUrl, 'base64').toString('utf8')
            // Validate it by parsing it
            const url = new URL(urlString)
            if (url.host === host) {
                return {
                    statusCode: 400,
                    body: 'File cannot be served from the same host as the original request',
                }
            }
            console.log(`Redirecting to ${urlString}`)
            return {
                statusCode: 301,
                headers: {
                    Location: url.toString(),
                },
                body: '',
            }
        } catch (error) {
            console.error(error)
            return {
                statusCode: 400,
                body: 'Invalid request',
            }
        }
    }
    exports.handler = handler
})
