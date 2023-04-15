import React, { useState, useRef } from 'react'
import { Field, Form, Formik } from 'formik'
import root from 'react-shadow/styled-components'
import { useUser, User } from 'hooks/useUser'

import { Approval } from './Approval'
import Authentication from './Authentication'
import Avatar from './Avatar'
import Logo from './Logo'
import RichText from './RichText'
import { Theme } from './Theme'
import getAvatarURL from '../util/getAvatar'
import { usePost } from 'components/PostLayout/hooks'
import qs from 'qs'

type QuestionFormValues = {
    subject: string
    body: string
}

type QuestionFormMainProps = {
    title?: string
    onSubmit: (values: QuestionFormValues, user: User | null) => void
    subject: boolean
    loading: boolean
    initialValues?: Partial<QuestionFormValues> | null
    formType?: 'question' | 'reply'
}

function QuestionFormMain({
    title,
    onSubmit,
    subject = true,
    loading,
    initialValues,
    formType,
}: QuestionFormMainProps) {
    const { user, logout } = useUser()

    return (
        <div className="squeak-form-frame">
            {title && <h2>{title}</h2>}
            <Formik
                initialValues={{
                    subject: '',
                    body: '',
                    ...initialValues,
                }}
                validate={(values) => {
                    const errors: any = {}
                    if (!values.body) {
                        errors.question = 'Required'
                    }
                    if (subject && !values.subject) {
                        errors.subject = 'Required'
                    }
                    return errors
                }}
                onSubmit={(values) => onSubmit(values, user)}
            >
                {({ setFieldValue, isValid }) => {
                    return (
                        <Form className="squeak-form">
                            <Avatar image={getAvatarURL(user?.profile)} />

                            <div className="squeak-inputs-wrapper">
                                {subject && (
                                    <>
                                        <Field
                                            onBlur={(e) => e.preventDefault()}
                                            required
                                            id="subject"
                                            name="subject"
                                            placeholder="Title"
                                            maxLength="140"
                                        />
                                        <hr />
                                    </>
                                )}
                                <div className="squeak-form-richtext">
                                    <RichText setFieldValue={setFieldValue} initialValue={initialValues?.body} />
                                </div>
                            </div>
                            <span className="squeak-reply-buttons-row">
                                <button
                                    className="squeak-post-button"
                                    style={loading || !isValid ? { opacity: '.5' } : {}}
                                    disabled={loading || !isValid}
                                    type="submit"
                                >
                                    {user ? 'Post' : 'Login & post'}
                                </button>
                                <div className="squeak-by-line">
                                    by
                                    <a href="https://squeak.posthog.com?utm_source=post-form">
                                        <Logo />
                                    </a>
                                </div>
                            </span>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

type QuestionFormProps = {
    slug?: string
    formType: string
    questionId?: number
    reply: (body: string) => Promise<void>
    onSubmit?: (values: any, formType: string) => void
    initialView?: string
}

export const QuestionForm = ({
    slug,
    formType = 'question',
    questionId,
    initialView,
    reply,
    onSubmit,
}: QuestionFormProps) => {
    const { user, getJwt, logout } = useUser()
    const [formValues, setFormValues] = useState<QuestionFormValues | null>(null)
    const [view, setView] = useState<string | null>(initialView || null)
    const [loading, setLoading] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const { breadcrumb } = usePost()
    const parentName = breadcrumb && breadcrumb?.length > 0 && breadcrumb[1]?.name

    const buttonText =
        formType === 'question' ? (
            <span>Ask a question</span>
        ) : (
            <span className="squeak-reply-label">
                <strong>Reply</strong> to question
            </span>
        )

    const createQuestion = async ({ subject, body }: QuestionFormValues) => {
        const token = await getJwt()
        const topicQuery = qs.stringify(
            {
                filters: {
                    label: {
                        $eq: parentName,
                    },
                },
            },
            {
                encodeValuesOnly: true,
            }
        )

        const topicID = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/topics?${topicQuery}`)
            .then((res) => res.json())
            .then((topic) => topic?.data && topic?.data[0]?.id)

        const data = {
            subject,
            body,
            resolved: false,
            slugs: [] as { slug: string }[],
            permalink: '',
            topics: {
                // 50 is uncategorized topic
                connect: [topicID || 50],
            },
        }

        if (slug) {
            data.slugs = [
                {
                    slug,
                },
            ]
        }

        const res = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                data,
            }),
        })
    }

    const handleMessageSubmit = async (values: QuestionFormValues, user: User | null) => {
        setLoading(true)

        if (user) {
            if (formType === 'question') {
                await createQuestion(values)
            }

            if (formType === 'reply' && questionId) {
                reply(values.body)
            }

            if (onSubmit) {
                onSubmit(values, formType)
            }

            setLoading(false)
            setView(null)
            setFormValues(null)
        } else {
            setFormValues(values)
            setView('auth')
            setLoading(false)
        }
    }

    return (
        <root.div ref={containerRef}>
            <Theme containerRef={containerRef} />
            <div className="squeak">
                {view ? (
                    {
                        'question-form': (
                            <QuestionFormMain
                                subject={formType === 'question'}
                                initialValues={formValues}
                                loading={loading}
                                onSubmit={handleMessageSubmit}
                            />
                        ),
                        auth: (
                            <Authentication
                                buttonText={{ login: 'Login & post', signUp: 'Sign up & post' }}
                                setParentView={setView}
                                formValues={formValues}
                                handleMessageSubmit={handleMessageSubmit}
                            />
                        ),
                        approval: <Approval handleConfirm={() => setView(null)} />,
                    }[view]
                ) : (
                    <div className="squeak-reply-buttons">
                        <Avatar image={getAvatarURL(user?.profile)} />
                        <button
                            className={formType === 'reply' ? 'squeak-reply-skeleton' : 'squeak-ask-button'}
                            onClick={() => setView('question-form')}
                        >
                            {buttonText}
                        </button>
                        {formType === 'question' && (
                            <button
                                onClick={() => {
                                    if (user) {
                                        logout()
                                    } else {
                                        setView('auth')
                                    }
                                }}
                                className="squeak-auth-button"
                            >
                                {user ? 'Logout' : 'Login'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </root.div>
    )
}
