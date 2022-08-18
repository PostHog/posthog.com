import { Buffer } from 'buffer'

import { Handler, HandlerResponse } from '@netlify/functions'
import { createIPXHandler } from '@netlify/ipx'

const ipxHandler = createIPXHandler({
    propsEncoding: 'base64',
    basePath: '/_gatsby/image/',
    bypassDomainCheck: true,
})

// eslint-disable-next-line require-await
export const handler: Handler = async (event, ...rest) => {
    const { pathname, host } = new URL(event.rawUrl)

    const [, , type, encodedUrl] = pathname.split('/')

    if (type === 'image') {
        return ipxHandler(event, ...rest) as Promise<HandlerResponse>
    }

    try {
        const urlString = Buffer.from(encodedUrl, 'base64').toString('utf8')
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
