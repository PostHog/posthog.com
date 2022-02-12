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

    const message = {
        channel: process.env.SLACK_QUESTION_CHANNEL,
        ts: body.timestamp,
        text: body.question,
        username: body.name,
        blocks: [
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: `${body.name} on ${body.slug}`,
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
                        alt_text: body.name,
                    },
                }),
            },
            {
                type: 'actions',
                elements: [
                    {
                        type: 'button',
                        style: 'primary',
                        text: {
                            type: 'plain_text',
                            text: `Publish${body.email ? ' & notify' : ''}`,
                            emoji: true,
                        },
                        value: JSON.stringify({
                            question: body.question,
                            name: body.name,
                            slug: body.slug,
                            email: body.email,
                            avatar,
                        }),
                        action_id: 'publish-button',
                        confirm: {
                            title: {
                                type: 'plain_text',
                                text: 'Please confirm',
                            },
                            text: {
                                type: 'mrkdwn',
                                text: `Clicking confirm will add this thread to the website${
                                    body.email ? ' and send an email to the original poster' : ''
                                }.`,
                            },
                            confirm: {
                                type: 'plain_text',
                                text: 'Confirm',
                            },
                            deny: {
                                type: 'plain_text',
                                text: 'Cancel',
                            },
                        },
                    },
                    {
                        type: 'button',
                        text: {
                            type: 'plain_text',
                            text: 'Edit',
                            emoji: true,
                        },
                        value: JSON.stringify({
                            question: body.question,
                            name: body.name,
                            slug: body.slug,
                            email: body.email,
                        }),
                        action_id: 'edit-question-button',
                    },
                ],
            },
        ],
    }

    const slack = await fetch(
        body.timestamp ? 'https://slack.com/api/chat.update' : 'https://slack.com/api/chat.postMessage',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.SLACK_API_KEY}`,
            },
            body: JSON.stringify(message),
        }
    ).then((res) => res.json())

    return {
        statusCode: 200,
        body: JSON.stringify({ timestamp: slack.ts }),
    }
}
