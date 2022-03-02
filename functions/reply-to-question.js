/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')
const getGravatar = require('gravatar')
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)

exports.handler = async (e) => {
    let { body } = e
    if (!body) return { statusCode: 500, body: 'Missing body' }
    body = JSON.parse(body)
    const { messageID, userID, question } = body

    let avatar
    if (body.email) {
        const gravatar = getGravatar.url(body.email)
        avatar = await fetch(`https:${gravatar}?d=404`).then((res) => (res.ok && `https:${gravatar}`) || '')
    }

    const reply = await supabase.from('replies').insert({
        message_id: messageID,
        body: question,
        user: userID,
    })

    return {
        statusCode: 200,
        body: JSON.stringify({ timestamp: reply.data[0].created_at, avatar }),
    }
}
