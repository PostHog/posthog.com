/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')

exports.handler = async (e) => {
    let { body } = e
    if (!body) return { statusCode: 500, body: 'Missing body' }
    body = JSON.parse(body)
    const slack = await fetch(
        body.timestamp ? 'https://slack.com/api/chat.update' : 'https://slack.com/api/chat.postMessage',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.SLACK_API_KEY}`,
            },
            body: JSON.stringify({
                channel: process.env.SLACK_QUESTION_CHANNEL,
                ts: body.timestamp,
                blocks: [
                    {
                        type: 'header',
                        text: {
                            type: 'plain_text',
                            text: `${body.name} on ${body.url}`,
                            emoji: true,
                        },
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `>${body.question.replace(/\n/g, '\n>')}`,
                        },
                    },
                    {
                        type: 'actions',
                        elements: [
                            {
                                type: 'button',
                                style: 'primary',
                                text: {
                                    type: 'plain_text',
                                    text: 'Answer question',
                                    emoji: true,
                                },
                                value: JSON.stringify({
                                    question: body.question,
                                    name: body.name,
                                    url: body.url,
                                    email: body.email,
                                }),
                                action_id: 'answer-question-button',
                            },
                        ],
                    },
                ],
            }),
        }
    ).then((res) => res.json())

    return {
        statusCode: 200,
        body: JSON.stringify({ timestamp: slack.ts }),
    }
}
