import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import { PostHog } from 'posthog-node'

const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed')
    }
    try {
        const ip = req.headers['x-forwarded-for']
        const {
            companyName,
            yourName,
            yourTitle,
            email,
            distinctId, // optional, if you want to associate with a user
        } = req.body

        const client = new PostHog(process.env.GATSBY_POSTHOG_API_KEY as string, {
            host: process.env.GATSBY_POSTHOG_UI_HOST as string,
            disableGeoip: false,
        })
        await client.capture({
            distinctId: distinctId || 'baa_export_anon',
            event: 'baa_form_export',
            properties: {
                company_name: companyName,
                representative_name: yourName,
                representative_title: yourTitle,
                representative_email: email,
                $ip: ip,
            },
        })

        await client.shutdown()

        // Send the same data to Zapier webhook
        if (process.env.ZAPIER_BAA_WEBHOOK_URL) {
            try {
                const zapierResponse = await fetch(process.env.ZAPIER_BAA_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        company_name: companyName,
                        representative_name: yourName,
                        representative_title: yourTitle,
                        representative_email: email,
                    }),
                })

                if (!zapierResponse.ok) {
                    // Continue execution even if Zapier webhook fails
                }
            } catch (zapierError) {
                // Continue execution even if Zapier webhook fails
            }
        }

        return res.status(200).send('OK')
    } catch (e) {
        return res.status(400).send('Bad Request')
    }
}

export default handler
