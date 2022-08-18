var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k
              var desc = Object.getOwnPropertyDescriptor(m, k)
              if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k]
                      },
                  }
              }
              Object.defineProperty(o, k2, desc)
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k
              o[k2] = m[k]
          })
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, 'default', { enumerable: true, value: v })
          }
        : function (o, v) {
              o['default'] = v
          })
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod
        var result = {}
        if (mod != null)
            for (var k in mod)
                if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k)
        __setModuleDefault(result, mod)
        return result
    }
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
;(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports)
        if (v !== undefined) module.exports = v
    } else if (typeof define === 'function' && define.amd) {
        define(['require', 'exports', 'buffer', 'http', 'stream', 'cookie', 'node-fetch', 'statuses'], factory)
    }
})(function (require, exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.proxyRequest = exports.createResponseObject = exports.createRequestObject = void 0
    const buffer_1 = require('buffer')
    const http_1 = __importDefault(require('http'))
    const stream_1 = __importDefault(require('stream'))
    const cookie_1 = __importDefault(require('cookie'))
    const node_fetch_1 = __importStar(require('node-fetch'))
    const statuses_1 = __importDefault(require('statuses'))
    // Mock a HTTP IncomingMessage object from the Netlify Function event parameters
    // Based on API Gateway Lambda Compat
    // Source: https://github.com/serverless-nextjs/serverless-next.js/blob/master/packages/compat-layers/apigw-lambda-compat/lib/compatLayer.js
    const createRequestObject = ({ event, context }) => {
        const {
            path = '',
            multiValueQueryStringParameters,
            queryStringParameters,
            httpMethod,
            multiValueHeaders = {},
            body,
            isBase64Encoded,
        } = event
        const newStream = new stream_1.default.Readable()
        const req = Object.assign(newStream, http_1.default.IncomingMessage.prototype)
        req.url = path
        req.originalUrl = req.url
        req.query = queryStringParameters
        req.multiValueQuery = multiValueQueryStringParameters
        req.method = httpMethod
        req.rawHeaders = []
        req.headers = {}
        // Expose Netlify Function event and context on request object.
        req.netlifyFunctionParams = { event, context }
        for (const key of Object.keys(multiValueHeaders)) {
            for (const value of multiValueHeaders[key]) {
                req.rawHeaders.push(key, value)
            }
            req.headers[key.toLowerCase()] = multiValueHeaders[key].toString()
        }
        req.getHeader = (name) => req.headers[name.toLowerCase()]
        req.getHeaders = () => req.headers
        // Gatsby includes cookie middleware
        const cookies = req.headers.cookie
        if (cookies) {
            req.cookies = cookie_1.default.parse(cookies)
        }
        // req.connection = {}
        if (body) {
            req.push(body, isBase64Encoded ? 'base64' : undefined)
        }
        req.push(null)
        return req
    }
    exports.createRequestObject = createRequestObject
    // Mock a HTTP ServerResponse object that returns a Netlify Function-compatible
    // response via the onResEnd callback when res.end() is called.
    // Based on API Gateway Lambda Compat
    // Source: https://github.com/serverless-nextjs/serverless-next.js/blob/master/packages/compat-layers/apigw-lambda-compat/lib/compatLayer.js
    // eslint-disable-next-line  max-lines-per-function
    const createResponseObject = ({ onResEnd }) => {
        const response = {
            isBase64Encoded: true,
            multiValueHeaders: {},
        }
        const res = new stream_1.default()
        Object.defineProperty(res, 'statusCode', {
            get() {
                return response.statusCode
            },
            set(statusCode) {
                response.statusCode = statusCode
            },
        })
        res.headers = { 'content-type': 'text/html; charset=utf-8' }
        res.writeHead = (status, headers) => {
            response.statusCode = status
            if (headers) {
                res.headers = Object.assign(res.headers, headers)
            }
            // Return res object to allow for chaining
            // Fixes: https://github.com/netlify/next-on-netlify/pull/74
            return res
        }
        res.write = (chunk) => {
            if (!response.body) {
                response.body = buffer_1.Buffer.from('')
            }
            response.body = buffer_1.Buffer.concat([
                buffer_1.Buffer.isBuffer(response.body) ? response.body : buffer_1.Buffer.from(response.body),
                buffer_1.Buffer.isBuffer(chunk) ? chunk : buffer_1.Buffer.from(chunk),
            ])
            return true
        }
        res.setHeader = (name, value) => {
            res.headers[name.toLowerCase()] = value
            return res
        }
        res.removeHeader = (name) => {
            delete res.headers[name.toLowerCase()]
        }
        res.getHeader = (name) => res.headers[name.toLowerCase()]
        res.getHeaders = () => res.headers
        res.hasHeader = (name) => Boolean(res.getHeader(name))
        res.end = (text) => {
            if (text) res.write(text)
            if (!res.statusCode) {
                res.statusCode = 200
            }
            if (response.body) {
                response.body = buffer_1.Buffer.from(response.body).toString('base64')
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore These types are a mess, and need sorting out
            response.multiValueHeaders = res.headers
            res.writeHead(response.statusCode)
            // Convert all multiValueHeaders into arrays
            for (const key of Object.keys(response.multiValueHeaders)) {
                const header = response.multiValueHeaders[key]
                if (!Array.isArray(header)) {
                    response.multiValueHeaders[key] = [header]
                }
            }
            res.finished = true
            res.writableEnded = true
            // Call onResEnd handler with the response object
            onResEnd(response)
            return res
        }
        // Gatsby Functions additions
        res.send = (data) => {
            if (res.finished) {
                return res
            }
            if (typeof data === 'number') {
                return res
                    .status(data)
                    .setHeader('content-type', 'text/plain; charset=utf-8')
                    .end(statuses_1.default.message[data] || String(data))
            }
            if (typeof data === 'boolean' || typeof data === 'object') {
                if (buffer_1.Buffer.isBuffer(data)) {
                    res.setHeader('content-type', 'application/octet-stream')
                } else if (data !== null) {
                    return res.json(data)
                }
            }
            res.end(data)
            return res
        }
        res.json = (data) => {
            if (res.finished) {
                return res
            }
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(data))
            return res
        }
        res.status = (code) => {
            const numericCode = Number.parseInt(code)
            if (!Number.isNaN(numericCode)) {
                response.statusCode = numericCode
            }
            return res
        }
        res.redirect = (statusCodeOrUrl, url) => {
            let statusCode = statusCodeOrUrl
            let Location = url
            if (!url && typeof statusCodeOrUrl === 'string') {
                Location = statusCodeOrUrl
                statusCode = 302
            }
            res.writeHead(statusCode, { Location })
            res.end()
            return res
        }
        return res
    }
    exports.createResponseObject = createResponseObject
    /**
     * During `netlify dev` we proxy requests to the `gatsby develop` server instead of
     * serving them ourselves.
     */
    const proxyRequest = async (event, res) => {
        // todo: get this from config
        const port = `8000`
        const url = new URL(event.path, `http://localhost:${port}`)
        Object.entries(event.multiValueQueryStringParameters).forEach(([name, values]) => {
            values.forEach((value) => {
                url.searchParams.append(name, value)
            })
        })
        const headers = new node_fetch_1.Headers()
        // Multi-value headers have an array of values, so we need to loop through them and append them to the Headers object
        Object.entries(event.multiValueHeaders).forEach(([name, val]) => {
            val.forEach((header) => {
                headers.append(name, header)
            })
        })
        const response = await (0, node_fetch_1.default)(url, {
            method: event.httpMethod,
            headers,
            body: event.body,
            redirect: 'manual',
        })
        ;[...response.headers.entries()].forEach(([name, value]) => {
            res.setHeader(name, value)
        })
        res.setHeader('x-forwarded-host', url.host)
        res.statusCode = response.status
        if (response.status === 302) {
            let location = response.headers.get('location') || ''
            // Local redirects will have the gatsby develop port, not the ntl dev one so we replace them
            if (location.startsWith(`http://localhost:${port}`)) {
                location = location.replace(`http://localhost:${port}`, `http://${event.headers.host}`)
                res.redirect(location)
            }
        }
        res.write(await response.buffer())
        res.send()
    }
    exports.proxyRequest = proxyRequest
})
