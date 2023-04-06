import React, { useState, useRef } from 'react'
import { Field, Form, Formik } from 'formik'
import root from 'react-shadow/styled-components'
import { useUser } from 'hooks/useUser'

import { Approval } from './Approval'
import Authentication from './Authentication'
import Avatar from './Avatar'
import Logo from './Logo'
import RichText from './RichText'
import { Theme } from './Theme'

type QuestionFormValues = {
    subject: string
    body: string
}

type QuestionFormMainProps = {
    title?: string
    onSubmit: (values: QuestionFormValues) => void
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
                onSubmit={onSubmit}
            >
                {({ setFieldValue, isValid }) => {
                    return (
                        <Form className="squeak-form">
                            <Avatar image={user?.profile?.avatar} />

                            <div className="squeak-inputs-wrapper">
                                {subject && (
                                    <>
                                        <Field
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
    formType: string
    questionId?: number
    reply: (body: string) => Promise<void>
    onSubmit?: (values: any, formType: string) => void
    onSignUp?: () => void
    initialView?: string
}

export const QuestionForm = ({
    formType = 'question',
    questionId,
    initialView,
    reply,
    onSubmit,
    onSignUp,
}: QuestionFormProps) => {
    const { user, getJwt, logout } = useUser()
    const [formValues, setFormValues] = useState<QuestionFormValues | null>(null)
    const [view, setView] = useState<string | null>(initialView || null)
    const [loading, setLoading] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

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

        const res = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                data: {
                    subject,
                    body,
                    resolved: false,
                    permalink: '',
                },
            }),
        })
    }

    const handleMessageSubmit = async (values: QuestionFormValues) => {
        setLoading(true)
        const userID = user?.id

        if (userID) {
            let view: any = null
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
            setView(view)
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
                                buttonText={{
                                    login: 'Login & post question',
                                    signUp: 'Sign up & post question',
                                }}
                                setParentView={setView}
                                formValues={formValues}
                                handleMessageSubmit={handleMessageSubmit}
                                onSignUp={onSignUp}
                            />
                        ),
                        login: (
                            <Authentication
                                setParentView={setView}
                                formValues={formValues}
                                handleMessageSubmit={() => setView(null)}
                                onSignUp={onSignUp}
                            />
                        ),
                        approval: <Approval handleConfirm={() => setView(null)} />,
                    }[view]
                ) : (
                    <div className="squeak-reply-buttons">
                        <Avatar image={user?.profile?.attributes?.avatar?.data?.attributes?.url} />

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
                                        setView('login')
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
