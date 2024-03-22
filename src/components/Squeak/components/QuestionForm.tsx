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
import { Chevron } from 'components/Icons'
import { fetchTopicGroups, topicGroupsSorted } from '../../../pages/questions'
import Spinner from 'components/Spinner'
import usePostHog from 'hooks/usePostHog'
import { navigate } from 'gatsby'

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
    disclaimer?: boolean
}

export const Select = ({
    value,
    setFieldValue,
    label = 'Please select a topic',
}: {
    value?: Topic
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
    label?: string
}) => {
    const [topicGroups, setTopicGroups] = useState([])

    const handleChange = (topic: Topic) => {
        setFieldValue('topic', topic)
    }

    useEffect(() => {
        fetchTopicGroups().then((topicGroups) => setTopicGroups(topicGroups))
    }, [])

    return (
        <div className="relative border-b border-border dark:border-dark">
            <Listbox value={value || {}} onChange={handleChange}>
                <Listbox.Button
                    className={`font-semibold text-black dark:text-primary-dark text-base w-full py-3 px-4 outline-none rounded-none text-left flex items-center justify-between ${
                        !value?.attributes?.label ? 'opacity-60' : ''
                    }`}
                >
                    <span>{value?.attributes?.label || label}</span>
                    <Chevron className="w-2.5" />
                </Listbox.Button>
                {topicGroups?.length > 0 && (
                    <Listbox.Options className="list-none p-0 m-0 absolute z-20 bg-white dark:bg-gray-accent-dark-hover w-full max-h-[247px] overflow-auto shadow-md rounded-br-md rounded-bl-md border-t divide-y border-black/30 dark:border-primary-dark/30 divide-black/30 dark:divide-primary-dark/30">
                        {topicGroups
                            .sort(
                                (a, b) =>
                                    topicGroupsSorted.indexOf(a?.attributes?.label) -
                                    topicGroupsSorted.indexOf(b?.attributes?.label)
                            )
                            .map(({ attributes: { label, topics } }) => {
                                return (
                                    <div key={label}>
                                        <h5 className="m-0 py-2 px-4 sticky top-0 bg-white dark:bg-gray-accent-dark-hover">
                                            {label}
                                        </h5>
                                        {topics?.data.map((topic) => (
                                            <Listbox.Option key={topic.id} value={topic}>
                                                {({ selected }) => (
                                                    <div
                                                        className={`${
                                                            selected
                                                                ? 'bg-gray-accent-light text-black dark:bg-gray-accent-dark dark:text-primary-dark'
                                                                : 'bg-white text-black hover:bg-gray-accent-light/30 dark:bg-gray-accent-dark-hover dark:hover:bg-gray-accent-dark/30 dark:text-primary-dark'
                                                        } py-2 px-4 cursor-pointer transition-all`}
                                                    >
                                                        {topic.attributes.label}
                                                    </div>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </div>
                                )
                            })}
                    </Listbox.Options>
                )}
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
    disclaimer = true,
}: QuestionFormMainProps) {
    const posthog = usePostHog()
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
                    url: undefined,
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
                onSubmit={(values) => {
                    if (values.url) {
                        posthog?.capture('community honeypot rejection')
                        return navigate('/')
                    }
                    onSubmit(values, user)
                }}
            >
                {({ setFieldValue, isValid, values, submitForm }) => {
                    return (
                        <Form className="mb-0">
                            <div className="w-[40px] h-[40px] mr-[10px] float-left rounded-full overflow-hidden">
                                <Avatar className="w-[40px] aspect-fill" image={getAvatarURL(user?.profile)} />
                            </div>

                            <div className="bg-white dark:bg-accent-dark border border-light dark:border-dark rounded-md overflow-hidden mb-4">
                                {showTopicSelector && <Select value={values.topic} setFieldValue={setFieldValue} />}
                                {subject && (
                                    <>
                                        <Field
                                            autoFocus
                                            className="font-semibold text-black dark:text-primary-dark dark:bg-accent-dark border-b border-light dark:border-dark text-base w-full py-3 px-4 outline-none rounded-none"
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
                                        onSubmit={submitForm}
                                        autoFocus={!subject}
                                        setFieldValue={setFieldValue}
                                        initialValue={initialValues?.body}
                                        values={values}
                                    />
                                </div>
                                <Field
                                    className="opacity-0 absolute left-0 top-0 h-0 w-0 -z-50 border-0 p-0"
                                    name="url"
                                    id="url"
                                    type="text"
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </div>
                            <span className="ml-[50px]">
                                <Button
                                    loading={loading}
                                    disabled={loading || !isValid}
                                    type="submit"
                                    className="w-[calc(100%_-_50px)]"
                                >
                                    {user ? 'Post' : 'Login & post'}
                                </Button>
                            </span>

                            {disclaimer && (
                                <p className="text-xs text-center mt-4 ml-[50px] [text-wrap:_balance] opacity-60 mb-0">
                                    If you need to share personal info relating to a bug or issue with your account, we
                                    suggest filing a support ticket in the app.
                                </p>
                            )}
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
    parentName?: string
    buttonText?: React.ReactNode | string
    subject?: boolean
    disclaimer?: boolean
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
    parentName,
    subject,
    disclaimer,
    ...other
}: QuestionFormProps) => {
    const { user, getJwt, logout } = useUser()
    const [formValues, setFormValues] = useState<QuestionFormValues | null>(null)
    const [view, setView] = useState<string | null>(initialView || null)
    const [loading, setLoading] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const buttonText =
        other.buttonText ??
        (formType === 'question' ? (
            <span className="font-bold">Ask a question</span>
        ) : (
            <span className="squeak-reply-label">Reply</span>
        ))

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
                await reply(transformedValues.body)
            }

            if (onSubmit) {
                await onSubmit(transformedValues, formType)
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

    useEffect(() => {
        setView(initialView || null)
    }, [slug])

    return (
        <div>
            {view ? (
                {
                    'question-form': (
                        <QuestionFormMain
                            disclaimer={disclaimer}
                            subject={subject ?? formType === 'question'}
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
                    <div className="rounded-full overflow-hidden w-[40px] h-[40px]">
                        <Avatar className="w-[40px]" image={getAvatarURL(user?.profile)} />
                    </div>
                    <Button
                        disabled={archived}
                        onClick={() => setView('question-form')}
                        buttonType={formType === 'reply' ? 'outline' : 'primary'}
                        size="md"
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
                            className="!ml-auto text-red dark:text-yellow opacity-80 hover:opacity-100 font-bold"
                        >
                            {user ? 'Logout' : 'Login'}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
