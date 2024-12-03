import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import { PostHog } from 'posthog-node'

const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    const ip = req.headers['x-forwarded-for']
    const { distinctId, formName, ...other } = JSON.parse(req.body)
    const client = new PostHog(process.env.GATSBY_POSTHOG_API_KEY, {
        host: process.env.GATSBY_POSTHOG_UI_HOST,
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
