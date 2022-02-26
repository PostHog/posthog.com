/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')
const getGravatar = require('gravatar')

exports.handler = async (e) => {
    let { body } = e
    if (!body) return { statusCode: 500, body: 'Missing body' }
    body = JSON.parse(body)
    let avatar
    if (body.email) {
        const gravatar = getGravatar.url(body.email)
        avatar = await fetch(`https:${gravatar}?d=404`).then((res) => (res.ok && `https:${gravatar}`) || '')
    }

    const name = `${body.firstName} ${body.lastName}`

    const message = {
        channel: process.env.SLACK_QUESTION_CHANNEL,
        thread_ts: body.ts,
        text: body.question,
        username: name,
        blocks: [
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: name,
                    emoji: true,
                },
                block_id: 'name_and_slug',
            },
            {
                type: 'section',
                block_id: 'question',
                text: {
                    type: 'mrkdwn',
                    text: body.question,
                },
                ...(avatar && {
                    accessory: {
                        type: 'image',
                        image_url: avatar,
                        alt_text: name,
                    },
                }),
            },
        ],
    }

    const slack = await fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.SLACK_API_KEY}`,
        },
        body: JSON.stringify(message),
    }).then((res) => res.json())

    return {
        statusCode: 200,
        body: JSON.stringify({ timestamp: slack.ts }),
    }
}
