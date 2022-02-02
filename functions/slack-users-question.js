/* eslint-disable @typescript-eslint/no-var-requires */
const queryString = require('query-string')
const { App, AwsLambdaReceiver } = require('@slack/bolt')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)

const awsLambdaReceiver = new AwsLambdaReceiver({
    signingSecret: process.env.SLACK_USERS_SIGNING_SECRET,
})

const app = new App({
    signingSecret: process.env.SLACK_USERS_SIGNING_SECRET,
    token: process.env.SLACK_USERS_API_KEY,
    receiver: awsLambdaReceiver,
})

app.shortcut('publish_thread', async ({ shortcut, ack, client, logger }) => {
    try {
        await ack()
        const user = await client.users.info({ user: shortcut.user.id })
        if (!user.user.is_admin) return
        const { data, error } = await supabase
            .from('Messages')
            .select('slack_timestamp, slug')
            .eq('slack_timestamp', shortcut.message.ts)

        const view = {
            trigger_id: shortcut.trigger_id,
            view: {
                private_metadata: JSON.stringify({
                    ts: shortcut.message.ts,
                    channel: shortcut.channel.id,
                    user: shortcut.user.id,
                }),
                callback_id: 'submit-db-button',
                type: 'modal',
                title: {
                    type: 'plain_text',
                    text: 'PostHog Q&A',
                },
                submit: {
                    type: 'plain_text',
                    text: 'Publish',
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
                        optional: false,
                        element: {
                            type: 'plain_text_input',
                            action_id: 'slug',
                        },
                        label: {
                            type: 'plain_text',
                            text: 'Slug (eg: /docs/api/insights), separated by commas',
                            emoji: true,
                        },
                    },
                ],
            },
        }
        if (data.length > 0 && data[0].slug) {
            view.view.blocks[0].element.initial_value = data[0].slug
            view.view.blocks[0].optional = true
            view.view.submit.text = 'Update'
        }
        await client.views.open(view)
    } catch (error) {
        logger.error(error)
    }
})

app.view('submit-db-button', async ({ ack, view }) => {
    await ack()
    const {
        private_metadata,
        state: { values },
    } = view
    const body = {
        slug: null,
    }

    const { ts, channel, user } = JSON.parse(private_metadata)

    Object.keys(values).forEach((valueKey) => {
        Object.keys(body).forEach((bodyKey) => {
            if (values[valueKey][bodyKey]) {
                body[bodyKey] = values[valueKey][bodyKey].value
            }
        })
    })

    body.slack_timestamp = ts
    body.slack_channel = channel
    body.slack_user = user

    await supabase.from('Messages').upsert([body])
})

exports.handler = async (event, context, callback) => {
    const { body } = event
    const { payload } = queryString.parse(body)
    const { token } = JSON.parse(payload)
    if (token !== process.env.SLACK_USERS_VERIFICATION_TOKEN) return { statusCode: 500, body: 'Invalid token' }
    const handler = await awsLambdaReceiver.start()
    return handler(event, context, callback)
}
