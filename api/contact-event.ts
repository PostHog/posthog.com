import type { VercelRequest, VercelResponse } from '@vercel/node'
import { PostHog } from 'posthog-node'

const handler = async (req: VercelRequest, res: VercelResponse) => {
    const ip = req.headers['x-forwarded-for']
    const { distinctId, formName, ...other } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const client = new PostHog(process.env.PUBLIC_POSTHOG_API_KEY, {
        host: process.env.PUBLIC_POSTHOG_UI_HOST,
        disableGeoip: false,
    })

    await client.capture({
        distinctId,
        event: 'form submission',
        properties: {
            form_name: formName,
            form_data: JSON.stringify(other),
            $ip: ip,
        },
    })

    await client.shutdown()

    return res.status(200).send('OK')
}

export default handler
