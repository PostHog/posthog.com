// Serves the Vercel functions in api/ during `astro dev`. In
// production Vercel runs them itself. Adds the request and response helpers Vercel provides
// (`req.query`, `req.body`, `res.status`, `res.json`, `res.send`).
import type { AstroIntegration } from 'astro'
import fs from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import path from 'node:path'

async function readBody(req: IncomingMessage): Promise<unknown> {
    const chunks: Buffer[] = []
    for await (const chunk of req) chunks.push(chunk as Buffer)
    const raw = Buffer.concat(chunks).toString('utf8')
    if (!raw) return undefined
    if (req.headers['content-type']?.includes('application/json')) {
        try {
            return JSON.parse(raw)
        } catch {
            return raw
        }
    }
    return raw
}

export default function devApi(): AstroIntegration {
    return {
        name: 'posthog:dev-api',
        hooks: {
            'astro:server:setup': ({ server }) => {
                server.middlewares.use(async (req, res, next) => {
                    const url = new URL(req.url ?? '/', 'http://localhost')
                    const name = url.pathname.match(/^\/api\/([\w-]+)$/)?.[1]
                    const file =
                        name && ['ts', 'js'].map((ext) => path.resolve('api', `${name}.${ext}`)).find(fs.existsSync)
                    if (!file) return next()
                    try {
                        const module = await server.ssrLoadModule(file)
                        const response = res as ServerResponse & Record<string, unknown>
                        Object.assign(req, { query: Object.fromEntries(url.searchParams), body: await readBody(req) })
                        response.status = (code: number) => ((res.statusCode = code), response)
                        response.json = (data: unknown) => {
                            res.setHeader('content-type', 'application/json')
                            res.end(JSON.stringify(data))
                            return response
                        }
                        response.send = (data: unknown) =>
                            typeof data === 'object'
                                ? (response.json as (data: unknown) => unknown)(data)
                                : res.end(String(data))
                        await module.default(req, res)
                    } catch (error) {
                        next(error)
                    }
                })
            },
        },
    }
}
