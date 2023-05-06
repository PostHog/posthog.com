import React, { useState, useRef, useEffect } from 'react'
import { Field, Form, Formik } from 'formik'
import { useUser, User } from 'hooks/useUser'
import { Approval } from './Approval'
import Authentication from './Authentication'
import Avatar from './Avatar'
import RichText from './RichText'
import getAvatarURL from '../util/getAvatar'
import { usePost } from 'components/PostLayout/hooks'
import qs from 'qs'
import Button from './Button'
import uploadImage from '../util/uploadImage'
import { Listbox } from '@headlessui/react'

type QuestionFormValues = {
    subject: string
    body: string
    images: { fakeImagePath: string; file: File; objectURL: string }[]
    topic?: Topic
}

interface Topic {
    id: number
    attributes: {
        label: string
    }
}

type QuestionFormMainProps = {
    title?: string
    onSubmit: (values: QuestionFormValues, user: User | null) => void
    subject: boolean
    loading: boolean
    initialValues?: Partial<QuestionFormValues> | null
    formType?: 'question' | 'reply'
    showTopicSelector?: boolean
}

const Select = ({
    value,
    setFieldValue,
}: {
    value?: Topic
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}) => {
    const [topics, setTopics] = useState<Topic[]>([])

    const handleChange = (topic: Topic) => {
        setFieldValue('topic', topic)
    }

    useEffect(() => {
        const topicQuery = qs.stringify(
            {
                pagination: {
                    pageSize: 100,
                },
                fields: ['label'],
                filters: {
                    label: {
                        $notContainsi: 'Internal:',
                    },
                },
                sort: 'label:asc',
            },
            {
                encodeValuesOnly: true,
            }
        )
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/topics?${topicQuery}`)
            .then((res) => res.json())
            .then(({ data }) => setTopics(data))
    }, [])

    return (
        <div className="relative border-b border-black/30 dark:border-primary-dark/30">
            <Listbox value={value || {}} onChange={handleChange}>
                <Listbox.Button
                    className={`font-semibold text-black dark:text-primary-dark dark:bg-gray-accent-dark-hover text-base w-full py-3 px-4 outline-none rounded-none text-left ${
                        !value?.attributes?.label ? 'opacity-60' : ''
                    }`}
                >
                    {value?.attributes?.label || 'Please select a topic'}
                </Listbox.Button>
                <Listbox.Options className="list-none p-0 m-0 absolute z-20 bg-white w-full max-h-[180px] overflow-auto shadow-md rounded-br-md rounded-bl-md border-t border-gray-accent-light grid divide-y divide-gray-accent-light">
                    {topics.map((topic) => (
                        <Listbox.Option key={topic.id} value={topic}>
                            {({ selected }) => (
                                <div
                                    className={`${
                                        selected
                                            ? 'bg-gray-accent-light text-black'
                                            : 'bg-white text-black hover:bg-opacity-30 hover:bg-gray-accent-light '
                                    } py-2 px-4 cursor-pointer transition-all`}
                                >
                                    {topic.attributes.label}
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    )
}

function QuestionFormMain({
    title,
    onSubmit,
    subject = true,
    loading,
    initialValues,
    showTopicSelector,
}: QuestionFormMainProps) {
    const { user, logout } = useUser()

    return (
        <div className="flex-1 mb-1">
            {title && <h2>{title}</h2>}
            <Formik
                initialValues={{
                    subject: '',
                    body: '',
                    images: [],
                    topic: undefined,
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
                    if (showTopicSelector && !values.topic) {
                        errors.topic = 'Required'
                    }
                    return errors
                }}
                onSubmit={(values) => onSubmit(values, user)}
            >
                {({ setFieldValue, isValid, values }) => {
                    return (
                        <Form className="mb-0">
                            <Avatar className="w-[40px] mr-[10px]" image={getAvatarURL(user?.profile)} />

                            <div className="bg-white border border-black/30 dark:bg-gray-accent-dark-hover dark:border-white/30 rounded-md overflow-hidden mb-4">
                                {showTopicSelector && <Select value={values.topic} setFieldValue={setFieldValue} />}
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
                                        values={values}
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

                            <p className="text-xs text-center mt-4 ml-[50px] [text-wrap:_balance] opacity-60 mb-0">
                                If you need to share personal info relating to a bug or issue with your account, we
                                suggest filing a support ticket in the app.
                            </p>
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
    topicID?: number
    archived?: boolean
    showTopicSelector?: boolean
}

export const QuestionForm = ({
    slug,
    formType = 'question',
    questionId,
    initialView,
    reply,
    onSubmit,
    archived,
    showTopicSelector,
    ...other
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

    const createQuestion = async ({ subject, body, topic }: QuestionFormValues) => {
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

        const topicID =
            topic?.id ||
            other?.topicID ||
            (await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/topics?${topicQuery}`)
                .then((res) => res.json())
                .then((topic) => topic?.data && topic?.data[0]?.id))

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

    const transformValues = async (values: QuestionFormValues, user: User) => {
        if (values.images.length <= 0) return values
        const jwt = await getJwt()
        const profileID = user?.profile?.id
        if (!jwt || !profileID) return values
        let transformedBody = values.body
        for (const image of values.images) {
            const { file, fakeImagePath, objectURL } = image
            URL.revokeObjectURL(objectURL)
            if (transformedBody.includes(fakeImagePath)) {
                try {
                    const uploadedImage = await uploadImage(file, jwt, {
                        field: 'images',
                        id: profileID,
                        type: 'api::profile.profile',
                    })
                    if (uploadedImage?.url) {
                        transformedBody = transformedBody.replaceAll(fakeImagePath, uploadedImage.url)
                    }
                } catch (err) {
                    console.error(err)
                    return { ...values, body: transformedBody }
                }
            }
        }

        return { ...values, body: transformedBody }
    }

    const handleMessageSubmit = async (values: QuestionFormValues, user: User | null) => {
        setLoading(true)

        if (user) {
            const transformedValues = await transformValues(values, user)
            if (formType === 'question') {
                await createQuestion(transformedValues)
            }

            if (formType === 'reply' && questionId) {
                reply(transformedValues.body)
            }

            if (onSubmit) {
                onSubmit(transformedValues, formType)
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

    useEffect(() => {
        if (archived) {
            setView(null)
        }
    }, [archived])

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
                            showTopicSelector={showTopicSelector}
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
                        disabled={archived}
                        onClick={() => setView('question-form')}
                        className={
                            formType !== 'reply'
                                ? 'text-red border-red'
                                : `w-full text-left border-black/30 dark:border-white/30 ${
                                      archived ? '' : 'hover:border-black/50 dark:hover:border-white/50'
                                  }`
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
