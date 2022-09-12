/* eslint-disable @typescript-eslint/no-var-requires */
const hubspot = require('@hubspot/api-client')

exports.handler = async (e) => {
    let { body } = e
    if (!body) return { statusCode: 500, body: 'Missing body' }
    body = JSON.parse(body)
    const { email, firstName, lastName } = body

    if (!email || !firstName || !lastName) {
        return {
            statusCode: 500,
            body: 'Missing required fields',
        }
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
        return {
            statusCode: 500,
            body: 'HubSpot request failed',
        }
    }

    return {
        statusCode: 200,
    }
}
