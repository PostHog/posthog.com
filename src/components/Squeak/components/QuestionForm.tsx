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
    forumTopic?: number
    draft?: boolean
}

// A forum post picks a forum topic instead of a legacy topic. The Forum app renders that field. The server
// chooses a post's tags when it goes live.
export type ForumFormOptions = {
    initialValues: { forumTopic?: number; subject?: string; body?: string }
    // Shows "Save draft" next to the post button.
    allowDraft?: boolean
    // Editing this draft: saving updates it, and posting publishes it.
    draftId?: number
    fields: (props: {
        values: QuestionFormValues
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
    }) => React.ReactNode
}

const DEFAULT_FORUM_TOPIC_SLUG = 'questions'

const COMMENT_THREAD_SECTIONS = [
    'blog',
    'newsletter',
    'founders',
    'product-engineers',
    'data-stack',
    'posts',
    'customers',
    'spotlight',
]

const isCommentThreadPage = (pageSlug?: string) =>
    COMMENT_THREAD_SECTIONS.includes(pageSlug?.split('/').filter(Boolean)[0] ?? '')

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
    disclaimer?: boolean
    autoFocus?: boolean
    isInForum?: boolean
    forum?: ForumFormOptions
    // A forum save that failed, shown next to the buttons.
    error?: string
    // What a forum save is doing now, shown on the button while it runs.
    loadingLabel?: string
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
    const [options, setOptions] = useState([])

    const handleChange = (selectedValue: any) => {
        setFieldValue('topic', selectedValue)
    }

    useEffect(() => {
        const topicsQuery = qs.stringify(
            { fields: ['label', 'slug'], sort: ['label:asc'], pagination: { pageSize: 100 } },
            { encodeValuesOnly: true }
        )
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/topics?${topicsQuery}`)
            .then((res) => res.json())
            .then(({ data }) =>
                setOptions((data ?? []).map((topic) => ({ label: topic.attributes.label, value: topic })))
            )
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
    disclaimer = true,
    formType,
    autoFocus = true,
    isInForum = false,
    forum,
    error,
    loadingLabel,
}: QuestionFormMainProps) {
    const posthog = usePostHog()
    const { user, logout } = useUser()
    const { status } = useAppStatus()
    // Which forum button submitted the form. A ref, so the click and the submit agree.
    const saveAsDraft = useRef(false)

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
                    ...forum?.initialValues,
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
                    // 0 is "Choose for me", which the server resolves when the post is saved.
                    if (forum && values.forumTopic == null) {
                        errors.forumTopic = 'Required'
                    }
                    return errors
                }}
                onSubmit={(values) => {
                    if (values.url) {
                        posthog?.capture('community honeypot rejection')
                        return navigate('/')
                    }
                    onSubmit(forum ? { ...values, draft: saveAsDraft.current } : values, user)
                }}
            >
                {({ setFieldValue, isValid, values, submitForm }) => {
                    return (
                        <Form className="mb-0">
                            {/* The forum composer is a full page, so it skips the avatar beside the fields. */}
                            {!forum && (
                                <div className="w-[40px] h-[40px] float-left rounded-full overflow-hidden">
                                    <Avatar
                                        className="w-[36px]"
                                        image={getAvatarURL(user?.profile)}
                                        color={user?.profile?.color}
                                    />
                                </div>
                            )}

                            <div data-scheme="primary" className={`${forum ? '' : 'pl-[55px]'} space-y-2`}>
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

                                {forum?.fields({ values, setFieldValue })}
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
                                            onKeyDown={(e) => {
                                                if (e.key !== 'Tab' || e.shiftKey) return
                                                const body = e.currentTarget.form?.elements.namedItem('body')
                                                if (!(body instanceof HTMLTextAreaElement)) return
                                                e.preventDefault()
                                                body.focus()
                                            }}
                                        />
                                    </>
                                )}
                                <RichText
                                    onSubmit={submitForm}
                                    autoFocus={!subject}
                                    setFieldValue={setFieldValue}
                                    initialValue={initialValues?.body ?? forum?.initialValues?.body}
                                    values={values}
                                    mentions={formType === 'reply'}
                                    // Forum posts also suggest topics, tags, and posts after `#`.
                                    references={!!forum}
                                    loading={loading}
                                    isValid={isValid}
                                    user={user}
                                    cta={() => (
                                        <div className="flex items-center gap-2">
                                            {forum?.allowDraft && (
                                                <OSButton
                                                    disabled={loading || !isValid}
                                                    type="submit"
                                                    onClick={() => (saveAsDraft.current = true)}
                                                >
                                                    Save draft
                                                </OSButton>
                                            )}
                                            <OSButton
                                                disabled={loading || !isValid}
                                                type="submit"
                                                variant="primary"
                                                onClick={() => (saveAsDraft.current = false)}
                                            >
                                                {loading
                                                    ? loadingLabel || 'Posting...'
                                                    : !user
                                                    ? 'Login & post'
                                                    : forum?.draftId
                                                    ? 'Publish'
                                                    : 'Post'}
                                            </OSButton>
                                            {error && (
                                                <span className="text-sm text-red dark:text-yellow">{error}</span>
                                            )}
                                        </div>
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
                                    Troubleshooting an issue or not sure how something works? Try{' '}
                                    <Link
                                        to="https://app.posthog.com#panel=support"
                                        externalNoIcon
                                        className="font-semibold underline"
                                    >
                                        asking PostHog AI or creating a ticket
                                    </Link>{' '}
                                    instead.
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
    onSubmit?: (values: any, formType: string, data?: any) => void
    initialView?: string
    topicID?: number
    archived?: boolean
    parentName?: string
    buttonText?: React.ReactNode | string
    subject?: boolean
    disclaimer?: boolean
    autoFocus?: boolean
    isInForum?: boolean
    forum?: ForumFormOptions
}

export const QuestionForm = ({
    slug,
    formType = 'question',
    questionId,
    initialView,
    reply,
    onSubmit,
    archived,
    subject,
    disclaimer,
    autoFocus,
    isInForum = false,
    forum,
    ...other
}: QuestionFormProps) => {
    const { user, getJwt, logout } = useUser()
    const posthog = usePostHog()
    const [formValues, setFormValues] = useState<QuestionFormValues | null>(null)
    const [view, setView] = useState<string | null>(initialView || null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [loadingLabel, setLoadingLabel] = useState('')
    const containerRef = useRef<HTMLDivElement>(null)

    const buttonText =
        other.buttonText ??
        (formType === 'question' ? (
            <span className="font-bold">Ask a question</span>
        ) : (
            <span className="squeak-reply-label">Reply</span>
        ))

    // The forum routes accept only these fields. A new post sends the empty permalink that the server replaces; a
    // draft is created with publishedAt null and published by setting publishedAt.
    // forumTopic 0 is "Choose for me": Jev picks the topic from the subject and body before the save.
    const chooseForumTopic = async (subject: string, body: string) => {
        const res = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/suggest-forum-topic`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${await getJwt()}` },
            body: JSON.stringify({ subject, body }),
        })
            .then((res) => res.json())
            .catch(() => null)
        if (!res?.data?.id) throw new Error('We could not choose a topic for this post. Please choose one.')
        return res.data as { id: number; slug: string; label: string }
    }

    const saveForumPost = async ({ subject, body, forumTopic, draft }: QuestionFormValues) => {
        const draftId = forum?.draftId
        if (!forumTopic) setLoadingLabel('Choosing a topic…')
        const chosenForumTopic = forumTopic ? null : await chooseForumTopic(subject, body)
        setLoadingLabel(draft ? 'Saving…' : 'Posting…')
        const topicId = chosenForumTopic?.id ?? forumTopic
        const fields = { subject, body, forumTopic: topicId }
        const data = draftId
            ? { ...fields, ...(draft ? {} : { publishedAt: new Date().toISOString() }) }
            : { ...fields, permalink: '', ...(draft ? { publishedAt: null } : {}) }
        const res = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions${draftId ? `/${draftId}` : ''}`, {
            method: draftId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getJwt()}`,
            },
            body: JSON.stringify({ data }),
        }).then((res) => res.json())
        const questionData = res?.data
        if (!questionData?.id) {
            // Strapi's rate limit answers with a top-level message and no error object.
            throw new Error(res?.error?.message || res?.message || 'The post could not be saved. Please try again.')
        }

        if (!draft) {
            posthog?.capture('squeak question created', {
                questionId: questionData.id,
                forumTopicId: topicId,
                subject,
            })
        }

        // The composer says which topic Jev chose.
        return chosenForumTopic ? { ...questionData, chosenForumTopic } : questionData
    }

    const suggestedForumTopicId = async (subject: string, body: string) => {
        const suggestion = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/suggest-forum-topic`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${await getJwt()}` },
            body: JSON.stringify({ subject, body }),
        })
            .then((res) => res.json())
            .catch(() => null)
        return (suggestion?.data?.id as number | undefined) ?? null
    }

    const defaultForumTopicId = async () => {
        const query = qs.stringify(
            { filters: { slug: { $eq: DEFAULT_FORUM_TOPIC_SLUG } }, fields: ['id'] },
            { encodeValuesOnly: true }
        )
        const topics = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/forum-topics?${query}`).then((res) =>
            res.json()
        )
        return (topics?.data?.[0]?.id as number | undefined) ?? null
    }

    const createQuestion = async ({ subject, body }: QuestionFormValues) => {
        const token = await getJwt()
        const pageSlugs = slug ? [{ slug }] : []
        const forumTopicId = isCommentThreadPage(slug)
            ? null
            : (await suggestedForumTopicId(subject, body)) ?? (await defaultForumTopicId())
        const data = forumTopicId
            ? { subject, body, permalink: '', forumTopic: forumTopicId, slugs: pageSlugs }
            : { subject, body, resolved: false, permalink: '', slugs: pageSlugs }

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

        // Fires only for new questions (replies use a separate `reply()` path), and only
        // after the API confirms creation — a reliable count of new questions asked.
        if (questionData?.id) {
            posthog?.capture('squeak question created', {
                questionId: questionData.id,
                forumTopicId,
                slug,
                subject,
            })
        }

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
        if (!user) {
            setFormValues(values)
            setView('auth')
            return
        }

        setLoading(true)
        const transformedValues = await transformValues(values, user)

        if (formType === 'question') {
            const create = forum ? saveForumPost : createQuestion
            setError('')
            create(transformedValues)
                .then((data) => {
                    setLoading(false)
                    setView(null)
                    setFormValues(null)
                    onSubmit?.(transformedValues, formType, data)
                })
                .catch((err) => {
                    // Keep the form and what was typed, and say what went wrong.
                    setLoading(false)
                    setError((err as Error).message)
                })
        } else if (formType === 'reply' && questionId && reply) {
            setLoading(false)
            setView(null)
            setFormValues(null)
            reply(transformedValues.body).then((data) => {
                onSubmit?.(transformedValues, formType, data)
            })
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
                            formType={formType}
                            autoFocus={autoFocus}
                            isInForum={isInForum}
                            forum={forum}
                            error={error}
                            loadingLabel={loadingLabel}
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
