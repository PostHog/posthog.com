/* eslint-disable @typescript-eslint/no-var-requires */
const hubspot = require('@hubspot/api-client')

const handler = async (req, res) => {
    let { body } = req
    if (!body) return res.status(500).json({ error: 'Missing body' })
    const { email, firstName, lastName } = JSON.parse(body)

    if (!email || !firstName || !lastName) {
        return res.status(500).json({ error: 'Missing required fields' })
    }

    const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN })

    const properties = {
        email,
        firstname: firstName,
        lastname: lastName,
    }
    const SimplePublicObjectInput = { properties }

    try {
        const apiResponse = await hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInput)
        console.log(JSON.stringify(apiResponse.body, null, 2))
    } catch (e) {
        e.message === 'HTTP request failed' ? console.error(JSON.stringify(e.response, null, 2)) : console.error(e)
        return res.status(500).json({ error: 'HubSpot request failed' })
    }

    return res.status(200)
}

export default handler
