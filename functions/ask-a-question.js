/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')

exports.handler = async (e) => {
    let { body } = e
    if (!body) return { statusCode: 500, body: 'Missing body' }
    body = JSON.parse(body)
    fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.SLACK_API_KEY}`,
        },
        body: JSON.stringify({
            channel: process.env.SLACK_QUESTION_CHANNEL,
            text: `${body.name} asked "${body.question}" on ${body.url}`,
        }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))

    return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
    }
}
