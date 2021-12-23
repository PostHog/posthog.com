/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')
const queryString = require('query-string')

exports.handler = async (e) => {
    let { body } = e
    if (!body) return { statusCode: 500, body: 'Missing body' }
    const { payload } = queryString.parse(body)
    const { trigger_id, actions } = JSON.parse(payload)
    if (actions && actions[0]['action_id'] === 'answer-question-button') {
        const { question, name, email } = JSON.parse(actions[0].value)
        fetch('https://slack.com/api/views.open', {
            method: 'POST',
            body: JSON.stringify({
                trigger_id: trigger_id,
                view: {
                    type: 'modal',
                    title: {
                        type: 'plain_text',
                        text: `${name}'s question`,
                        emoji: true,
                    },
                    submit: {
                        type: 'plain_text',
                        text: 'Publish answer',
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
                                action_id: 'modal-email',
                                initial_value: email,
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
                                action_id: 'modal-question',
                                initial_value: question,
                            },
                            label: {
                                type: 'plain_text',
                                text: 'Question',
                                emoji: true,
                            },
                        },
                        {
                            type: 'input',
                            element: {
                                type: 'plain_text_input',
                                multiline: true,
                                action_id: 'modal-answer',
                            },
                            label: {
                                type: 'plain_text',
                                text: 'Answer',
                                emoji: true,
                            },
                        },
                    ],
                },
            }),
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.SLACK_API_KEY}` },
        })
    } else {
        const {
            view: {
                state: { values },
            },
        } = JSON.parse(payload)
        let modalQuestion
        let modalAnswer
        Object.keys(values).forEach((key) => {
            if (values[key]['modal-question']) {
                modalQuestion = values[key]['modal-question'].value
            }
            if (values[key]['modal-answer']) {
                modalAnswer = values[key]['modal-answer'].value
            }
        })
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
    }
}
