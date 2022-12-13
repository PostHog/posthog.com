/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')
const md5 = require('md5')

exports.handler = async (e) => {
    let { body } = e
    if (!body) return { statusCode: 500, body: 'Missing body' }
    body = JSON.parse(body)
    const { email, tag } = body
    if (!email || !tag) return { statusCode: 500, body: 'Missing required fields' }
    const data = await fetch(`https://us19.api.mailchimp.com/3.0/lists/ef3044881e/members/${md5(email)}/tags`, {
        headers: {
            Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
        },
        method: 'POST',
        body: JSON.stringify({ tags: [{ name: tag, status: 'active' }], is_syncing: false }),
    })
    return {
        statusCode: 200,
        body: JSON.stringify(data),
    }
}
