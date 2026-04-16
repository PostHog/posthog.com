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
import OSButton from 'components/OSButton'
import uploadImage from '../util/uploadImage'
import { fetchTopicGroups, topicGroupsSorted } from '../util/topicGroups'
import usePostHog from 'hooks/usePostHog'
import { navigate } from 'gatsby'
import { useAppStatus } from 'hooks/useAppStatus'
import Link from 'components/Link'
import Input from 'components/OSForm/input'
import { OSSelect } from 'components/OSForm'

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
    autoFocus?: boolean
    isInForum?: boolean
}

export const Select = ({
    value,
    setFieldValue,
    label = 'Select a topic',
    className = '',
}: {
    value?: Topic
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
    label?: string
    className?: string
}) => {
    const [topicGroups, setTopicGroups] = useState([])
    const [options, setOptions] = useState([])

    const handleChange = (selectedValue: any) => {
        setFieldValue('topic', selectedValue)
    }

    useEffect(() => {
        fetchTopicGroups().then((topicGroups) => {
            const filteredGroups = topicGroups.filter((group) => group?.attributes?.label !== 'Off-topic')
            setTopicGroups(filteredGroups)

            // Flatten topic groups into options array with section headers
            const flatOptions = filteredGroups
                .sort(
                    (a, b) =>
                        topicGroupsSorted.indexOf(a?.attributes?.label) -
                        topicGroupsSorted.indexOf(b?.attributes?.label)
                )
                .flatMap(({ attributes: { label: groupLabel, topics } }) => {
                    const header = {
                        label: groupLabel,
                        value: null,
                        isHeader: true,
                    }
                    const options =
                        topics?.data.map((topic) => ({
                            label: topic.attributes.label,
                            value: topic,
                        })) || []
                    return [header, ...options]
                })

            setOptions(flatOptions)
        })
    }, [])

    return (
        <div className={`relative ${className}`}>
            <OSSelect
                label={label}
                direction="column"
                value={value}
                onChange={handleChange}
                options={options}
                placeholder={label}
                searchable={true}
                searchPlaceholder="Search topics..."
                maxHeight="max-h-[300px]"
                className=""
            />
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
    formType,
    autoFocus = true,
    isInForum = false,
}: QuestionFormMainProps) {
    const posthog = usePostHog()
    const { user, logout } = useUser()
    const { status } = useAppStatus()

    return (
        <div className={`flex-1 mb-1`}>
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
                            <div className="w-[40px] h-[40px] float-left rounded-full overflow-hidden">
                                <Avatar
                                    className="w-[40px] aspect-fill"
                                    image={getAvatarURL(user?.profile)}
                                    color={user?.profile?.color}
                                />
                            </div>

                            <div data-scheme="primary" className="pl-[55px] space-y-2">
                                {status && status !== 'operational' && (
                                    <div data-scheme="secondary" className="p-4 bg-primary border border-primary">
                                        <h5 className="m-0">Heads up!</h5>
                                        <p className="m-0 text-sm">
                                            We're currently experiencing an incident. Check{' '}
                                            <Link
                                                className="text-red dark:text-yellow font-bold"
                                                to="https://www.posthogstatus.com"
                                                externalNoIcon
                                            >
                                                here
                                            </Link>{' '}
                                            for the latest info.
                                        </p>
                                    </div>
                                )}

                                {showTopicSelector && <Select value={values.topic} setFieldValue={setFieldValue} />}
                                {subject && (
                                    <>
                                        <Input
                                            label="Subject"
                                            autoFocus={autoFocus}
                                            className="text-primary"
                                            onBlur={(e) => e.preventDefault()}
                                            required
                                            id="subject"
                                            name="subject"
                                            placeholder="Subject"
                                            maxLength="140"
                                            showLabel={false}
                                            value={values.subject}
                                            onChange={(e) => setFieldValue('subject', e.target.value)}
                                        />
                                    </>
                                )}
                                <RichText
                                    onSubmit={submitForm}
                                    autoFocus={!subject}
                                    setFieldValue={setFieldValue}
                                    initialValue={initialValues?.body}
                                    values={values}
                                    mentions={formType === 'reply'}
                                    loading={loading}
                                    isValid={isValid}
                                    user={user}
                                    cta={() => (
                                        <OSButton disabled={loading || !isValid} type="submit" variant="primary">
                                            {loading ? 'Posting...' : user ? 'Post' : 'Login & post'}
                                        </OSButton>
                                    )}
                                />
                                <Field
                                    className="opacity-0 absolute left-0 top-0 h-0 w-0 -z-[50] border-0 p-0"
                                    name="url"
                                    id="url"
                                    type="text"
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </div>

                            {disclaimer && (
                                <p className="text-xs text-center mt-4 ml-[50px] [text-wrap:_balance] opacity-60 mb-0 text-primary">
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
    formType?: 'question' | 'reply'
    questionId?: number
    reply?: (body: string) => Promise<void>
    onSubmit?: (values: any, formType: string) => void
    initialView?: string
    topicID?: number
    archived?: boolean
    showTopicSelector?: boolean
    parentName?: string
    buttonText?: React.ReactNode | string
    subject?: boolean
    disclaimer?: boolean
    autoFocus?: boolean
    isInForum?: boolean
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
    autoFocus,
    isInForum = false,
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
            (parentName &&
                (await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/topics?${topicQuery}`)
                    .then((res) => res.json())
                    .then((topic) => topic?.data && topic?.data[0]?.id)))

        const data = {
            subject,
            body,
            resolved: false,
            slugs: [] as { slug: string }[],
            permalink: '',
            topics: {
                // 346 is uncategorized topic
                connect: [topicID || 346],
            },
        }

        if (slug) {
            data.slugs = [
                {
                    slug,
                },
            ]
        }

        const { data: questionData } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                data,
            }),
        }).then((res) => res.json())
        return questionData
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
            let data
            if (formType === 'question') {
                data = await createQuestion(transformedValues)
            }

            if (formType === 'reply' && questionId) {
                data = await reply(transformedValues.body)
            }

            setLoading(false)
            setView(null)
            setFormValues(null)

            if (onSubmit) {
                await onSubmit(transformedValues, formType, data)
            }
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
                            formType={formType}
                            autoFocus={autoFocus}
                            isInForum={isInForum}
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
                    <div className="rounded-full overflow-hidden aspect-square w-[40px] shrink-0">
                        <Avatar
                            className="w-full rounded-full"
                            image={getAvatarURL(user?.profile)}
                            color={user?.profile?.color}
                        />
                    </div>
                    <OSButton
                        id="question-form-button"
                        disabled={archived}
                        onClick={() => setView('question-form')}
                        // variant={formType === 'reply' ? 'secondary' : 'primary'}
                        size="md"
                        width="full"
                        align="left"
                        variant="underlineOnHover"
                        className={`border border-primary bg-accent !p-2 ${
                            formType === 'reply' ? 'min-h-4' : 'min-h-8'
                        }`}
                    >
                        {buttonText}
                    </OSButton>
                </div>
            )}
        </div>
    )
}
