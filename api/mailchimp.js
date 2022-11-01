/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')
const md5 = require('md5')

const handler = async (req, res) => {
    let { body } = req
    if (!body) return res.status(500).json({ error: 'Missing body' })
    const { email, tag } = body
    if (!email || !tag) return { statusCode: 500, body: 'Missing required fields' }
    const data = await fetch(`https://us19.api.mailchimp.com/3.0/lists/ef3044881e/members/${md5(email)}/tags`, {
        headers: {
            Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
        },
        method: 'POST',
        body: JSON.stringify({ tags: [{ name: tag, status: 'active' }], is_syncing: false }),
    })
    return res.status(200).json(data)
}

export default handler
