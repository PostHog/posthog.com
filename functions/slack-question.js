/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')
const queryString = require('query-string')
const formData = require('form-data')
const Mailgun = require('mailgun.js')
const getGravatar = require('gravatar')

exports.handler = async (e) => {
    let { body } = e
    if (!body) return { statusCode: 500, body: 'Missing body' }
    const { payload } = queryString.parse(body)
    const { actions, token, type, trigger_id, message, view } = JSON.parse(payload)
    if (token !== process.env.SLACK_VERIFICATION_TOKEN) return { statusCode: 500, body: 'Invalid token' }
    if (type === 'block_actions' && actions[0]['action_id'] === 'publish-button') {
        const { question, name, slug, email, avatar } = JSON.parse(actions[0].value)
        const replies = await fetch(
            `https://slack.com/api/conversations.replies?ts=${message.ts}&channel=${process.env.SLACK_QUESTION_CHANNEL}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.SLACK_API_KEY}`,
                },
            }
        ).then((res) => res.json())

        const answer = replies.messages && replies.messages[1] && replies.messages[1].text
        if (answer) {
            // Disabling until we figure out the best way to handle email notifications
            // if (email) {
            //     const mailgun = new Mailgun(formData)
            //     const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY })
            //     const mailgunData = {
            //         from: 'hey@posthog.com',
            //         to: email,
            //         subject: `Someone answered your question on posthog.com!`,
            //         template: 'question-answered',
            //         'h:X-Mailgun-Variables': JSON.stringify({
            //             question,
            //             answer,
            //         }),
            //         'h:Reply-To': 'hey@posthog.com',
            //     }
            //     await mg.messages.create(process.env.MAILGUN_DOMAIN, mailgunData).catch((err) => console.log(err))
            // }
            await fetch('https://slack.com/api/chat.update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.SLACK_API_KEY}`,
                },
                body: JSON.stringify({
                    channel: process.env.SLACK_QUESTION_CHANNEL,
                    ts: message.ts,
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
    if (type === 'block_actions' && actions[0]['action_id'] === 'edit-question-button') {
        const { question, name, email, slug } = JSON.parse(actions[0].value)
        await fetch('https://slack.com/api/views.open', {
            method: 'POST',
            body: JSON.stringify({
                trigger_id: trigger_id,
                view: {
                    private_metadata: message.ts,
                    type: 'modal',
                    title: {
                        type: 'plain_text',
                        text: `${name}'s question`,
                        emoji: true,
                    },
                    submit: {
                        type: 'plain_text',
                        text: 'Save',
                        emoji: true,
                    },
                    close: {
                        type: 'plain_text',
                        text: 'Cancel',
                        emoji: true,
                    },
                    blocks: [
                        {
                            type: 'input',
                            element: {
                                type: 'plain_text_input',
                                action_id: 'slug',
                                initial_value: slug,
                            },
                            label: {
                                type: 'plain_text',
                                text: 'Slug',
                                emoji: true,
                            },
                        },
                        {
                            type: 'input',
                            element: {
                                type: 'plain_text_input',
                                action_id: 'name',
                                initial_value: name,
                            },
                            label: {
                                type: 'plain_text',
                                text: 'Name',
                                emoji: true,
                            },
                        },
                        {
                            type: 'input',
                            optional: true,
                            element: {
                                type: 'plain_text_input',
                                action_id: 'email',
                                initial_value: email || '',
                            },
                            label: {
                                type: 'plain_text',
                                text: 'Email',
                                emoji: true,
                            },
                        },
                        {
                            type: 'input',
                            element: {
                                type: 'plain_text_input',
                                multiline: true,
                                action_id: 'question',
                                initial_value: question,
                            },
                            label: {
                                type: 'plain_text',
                                text: 'Question',
                                emoji: true,
                            },
                        },
                    ],
                },
            }),
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.SLACK_API_KEY}` },
        })
    }
    if (type === 'view_submission') {
        const {
            private_metadata,
            state: { values },
        } = view

        const body = {
            slug: null,
            name: null,
            email: null,
            question: null,
        }

        Object.keys(values).forEach((valueKey) => {
            Object.keys(body).forEach((bodyKey) => {
                if (values[valueKey][bodyKey]) {
                    body[bodyKey] = values[valueKey][bodyKey].value
                }
            })
        })

        body.timestamp = private_metadata

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
                                timestamp: body.timestamp,
                            }),
                            action_id: 'edit-question-button',
                        },
                    ],
                },
            ],
        }

        await fetch(body.timestamp ? 'https://slack.com/api/chat.update' : 'https://slack.com/api/chat.postMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.SLACK_API_KEY}`,
            },
            body: JSON.stringify(message),
        })
    }
    return {
        statusCode: 200,
    }
}
