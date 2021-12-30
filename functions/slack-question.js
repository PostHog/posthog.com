/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')
const queryString = require('query-string')
const formData = require('form-data')
const Mailgun = require('mailgun.js')

exports.handler = async (e) => {
    let { body } = e
    if (!body) return { statusCode: 500, body: 'Missing body' }
    const { payload } = queryString.parse(body)
    const {
        actions,
        token,
        type,
        message: { ts },
    } = JSON.parse(payload)
    if (token !== process.env.SLACK_VERIFICATION_TOKEN) return { statusCode: 500, body: 'Invalid token' }
    if (type === 'block_actions' && actions[0]['action_id'] === 'publish-button') {
        const { question, name, slug, email, avatar } = JSON.parse(actions[0].value)
        const replies = await fetch(
            `https://slack.com/api/conversations.replies?ts=${ts}&channel=${process.env.SLACK_QUESTION_CHANNEL}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.SLACK_API_KEY}`,
                },
            }
        ).then((res) => res.json())

        const answer = replies.messages && replies.messages[1] && replies.messages[1].text
        if (answer) {
            if (email) {
                const mailgun = new Mailgun(formData)
                const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY })
                const mailgunData = {
                    from: 'hey@posthog.com',
                    to: email,
                    subject: `Someone answered your question on posthog.com!`,
                    template: 'question-answered',
                    'h:X-Mailgun-Variables': JSON.stringify({
                        question,
                        answer,
                    }),
                    'h:Reply-To': 'hey@posthog.com',
                }
                await mg.messages.create(process.env.MAILGUN_DOMAIN, mailgunData).catch((err) => console.log(err))
            }
            await fetch('https://slack.com/api/chat.update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.SLACK_API_KEY}`,
                },
                body: JSON.stringify({
                    channel: process.env.SLACK_QUESTION_CHANNEL,
                    ts,
                    text: question,
                    username: name,
                    blocks: [
                        {
                            type: 'header',
                            text: {
                                type: 'plain_text',
                                text: `${name} on ${slug}`,
                                emoji: true,
                            },
                            block_id: 'name_and_slug',
                        },
                        {
                            type: 'section',
                            block_id: 'question',
                            text: {
                                type: 'mrkdwn',
                                text: question,
                            },
                            ...(avatar && {
                                accessory: {
                                    type: 'image',
                                    image_url: avatar,
                                    alt_text: name,
                                },
                            }),
                        },
                        {
                            type: 'section',
                            block_id: 'published',
                            text: {
                                type: 'plain_text',
                                text: '✅ Published',
                                emoji: true,
                            },
                        },
                    ],
                }),
            })
        }
    }
    return {
        statusCode: 200,
    }
}
