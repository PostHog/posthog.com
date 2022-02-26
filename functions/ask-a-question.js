/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')
const getGravatar = require('gravatar')
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)

exports.handler = async (e) => {
    let { body } = e
    if (!body) return { statusCode: 500, body: 'Missing body' }
    body = JSON.parse(body)
    const { slug, question, email, subject, userID } = body
    await supabase
        .from('messages')
        .insert({
            slug: [slug],
            subject,
        })
        .then((data) => {
            return supabase.from('replies').insert({
                body: question,
                message_id: data?.data[0]?.id,
                email,
                user: userID,
            })
        })

    let avatar
    if (body.email) {
        const gravatar = getGravatar.url(body.email)
        avatar = await fetch(`https:${gravatar}?d=404`).then((res) => (res.ok && `https:${gravatar}`) || '')
    }

    const name = `${body.firstName} ${body.lastName}`

    const message = {
        channel: process.env.SLACK_QUESTION_CHANNEL,
        ts: body.timestamp,
        text: body.question,
        username: name,
        blocks: [
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: `${name} on ${body.slug}`,
                    emoji: true,
                },
                block_id: 'name_and_slug',
            },
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: body.subject,
                    emoji: true,
                },
                block_id: 'subject',
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
                            name,
                            slug: body.slug,
                            email: body.email,
                            subject: body.subject,
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
                            name,
                            slug: body.slug,
                            email: body.email,
                            subject: body.subject,
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
        body: JSON.stringify({ timestamp: slack.ts, avatar }),
    }
}
