import React, { useState, useRef } from 'react'
import { Field, Form, Formik } from 'formik'
import { useUser, User } from 'hooks/useUser'
import { Approval } from './Approval'
import Authentication from './Authentication'
import Avatar from './Avatar'
import Logo from './Logo'
import RichText from './RichText'
import getAvatarURL from '../util/getAvatar'
import { usePost } from 'components/PostLayout/hooks'
import qs from 'qs'
import Button from './Button'

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
        <div className="flex-1 mb-4">
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
                        <Form>
                            <Avatar className="w-[40px] mr-[10px]" image={getAvatarURL(user?.profile)} />

                            <div className="bg-white border border-black/30 dark:bg-gray-accent-dark-hover dark:border-white/30 rounded-md overflow-hidden mb-4">
                                {subject && (
                                    <>
                                        <Field
                                            autoFocus
                                            className="font-semibold text-black dark:text-primary-dark dark:bg-gray-accent-dark-hover border-b border-black/30 dark:border-primary-dark/30 text-base w-full py-3 px-4 outline-none rounded-none"
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
                                <div className="leading-[0]">
                                    <RichText
                                        autoFocus={!subject}
                                        setFieldValue={setFieldValue}
                                        initialValue={initialValues?.body}
                                    />
                                </div>
                            </div>
                            <span className="ml-[50px]">
                                <Button
                                    disabled={loading || !isValid}
                                    type="submit"
                                    className={`w-[calc(100%_-_50px)] font-bold relative ${
                                        loading || !isValid
                                            ? ' opacity-50 cursor-not-allowed'
                                            : 'bg-red text-white border-red shadow-xl hover:scale-[1.01] hover:top-[-.5px]'
                                    } active:top-[0px] active:scale-[1]`}
                                >
                                    {user ? 'Post' : 'Login & post'}
                                </Button>
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
            <span className="font-bold">Ask a question</span>
        ) : (
            <span className="squeak-reply-label ">
                <strong className="underline">Reply</strong> to question
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
        <div>
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
                            buttonText={formValues ? { login: 'Login & post', signUp: 'Sign up & post' } : undefined}
                            setParentView={setView}
                            formValues={formValues}
                            handleMessageSubmit={handleMessageSubmit}
                        />
                    ),
                    approval: <Approval handleConfirm={() => setView(null)} />,
                }[view]
            ) : (
                <div className="flex flex-1 space-x-2">
                    <Avatar className="w-[40px]" image={getAvatarURL(user?.profile)} />
                    <Button
                        onClick={() => setView('question-form')}
                        className={
                            formType !== 'reply'
                                ? 'text-red border-red'
                                : 'w-full text-left border-black/30 dark:border-white/30 hover:border-black/50 dark:hover:border-white/50'
                        }
                    >
                        {buttonText}
                    </Button>
                    {formType === 'question' && (
                        <button
                            onClick={() => {
                                if (user) {
                                    logout()
                                } else {
                                    setView('auth')
                                }
                            }}
                            className="!ml-auto text-red opacity-80 hover:opacity-100 font-bold"
                        >
                            {user ? 'Logout' : 'Login'}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
