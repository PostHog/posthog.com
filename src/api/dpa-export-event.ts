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
            companyAddress,
            yourName,
            yourTitle,
            date,
            representativeEmail,
            distinctId, // optional, if you want to associate with a user
        } = req.body
        console.log('DPA Export Event API called with:', {
            companyName,
            companyAddress,
            yourName,
            yourTitle,
            date,
            representativeEmail,
            distinctId,
            ip,
        })
        console.log('Instantiating PostHog client...')
        const client = new PostHog(process.env.GATSBY_POSTHOG_API_KEY as string, {
            host: process.env.GATSBY_POSTHOG_UI_HOST as string,
            disableGeoip: false,
        })
        console.log('Sending event to PostHog...')
        await client.capture({
            distinctId: distinctId || 'dpa_export_anon',
            event: 'dpa_form_export',
            properties: {
                company_name: companyName,
                company_address: companyAddress,
                representative_name: yourName,
                representative_title: yourTitle,
                date,
                representative_email: representativeEmail,
                $ip: ip,
            },
        })

        console.log('Event sent, shutting down client...')
        await client.shutdown()
        console.log('Client shutdown complete')

        // Send the same data to Zapier webhook
        if (process.env.ZAPIER_WEBHOOK_URL) {
            console.log('Sending data to Zapier webhook...')
            try {
                const zapierResponse = await fetch(process.env.ZAPIER_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        company_name: companyName,
                        company_address: companyAddress,
                        representative_name: yourName,
                        representative_title: yourTitle,
                        date,
                        representative_email: representativeEmail,
                        ip: ip,
                        distinct_id: distinctId || 'dpa_export_anon',
                    }),
                })

                if (!zapierResponse.ok) {
                    console.error('Failed to send data to Zapier:', await zapierResponse.text())
                } else {
                    console.log('Successfully sent data to Zapier webhook')
                }
            } catch (zapierError) {
                console.error('Error sending data to Zapier webhook:', zapierError)
                // Continue execution even if Zapier webhook fails
            }
        } else {
            console.log('Zapier webhook URL not configured, skipping')
        }

        console.log('Responding 200')
        return res.status(200).send('OK')
    } catch (e) {
        console.error('Error in DPA Export Event API:', e)
        return res.status(400).send('Bad Request')
    }
}

export default handler
