import React, { useState, createContext, useEffect, useContext, useRef } from 'react'
import { Replies } from './Replies'
import { Profile } from './Profile'
import { QuestionData, StrapiData, StrapiRecord, TopicData } from 'lib/strapi'
import LevelBadge from './LevelBadge'
import Days from './Days'
import Markdown from './Markdown'
import { QuestionForm } from './QuestionForm'
import { useQuestion } from '../hooks/useQuestion'
import QuestionSkeleton from './QuestionSkeleton'
import SubscribeButton from './SubscribeButton'
import Link from 'components/Link'
import { useUser } from 'hooks/useUser'
import usePostHog from 'hooks/usePostHog'
import {
    IconArchive,
    IconPencil,
    IconPin,
    IconSparkles,
    IconTrash,
    IconUndo,
    IconExpand,
    IconShieldLock,
} from '@posthog/icons'
import Tooltip from 'components/RadixUI/Tooltip'
import { Listbox } from '@headlessui/react'
import { fetchTopicGroups, topicGroupsSorted } from '../util/topicGroups'
import { Check2 } from 'components/Icons'
import { navigate } from 'gatsby'
import { Logo } from '@posthog/brand/logo'
import Avatar from './Avatar'
import { DotLottiePlayer } from '@dotlottie/react-player'
import EditWrapper from './EditWrapper'
import ReportSpamButton from './ReportSpamButton'
import OSButton from 'components/OSButton'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { TopicSelector } from './TopicSelector'
import { XIcon } from 'lucide-react'
import { useToast } from '../../../context/Toast'
import { useWindow } from '../../../context/Window'

type QuestionProps = {
    // TODO: Deal with id possibly being undefined at first
    id: number | string
    question?: StrapiRecord<QuestionData>
    expanded?: boolean
    showSlug?: boolean
    buttonText?: string
    showActions?: boolean
    askMax?: boolean
    onQuestionReady?: (question: StrapiRecord<QuestionData>) => void
    subscribeButton?: boolean
    isInForum?: boolean
    onPinTopics?: (topics: StrapiRecord<TopicData>[]) => void
    refreshList?: () => void
}

export const CurrentQuestionContext = createContext<any>({})

const createSupportTicket = async (
    posthog: NonNullable<ReturnType<typeof usePostHog>>,
    message: string,
    traits: { name: string | null; email: string | null }
) => {
    if (!posthog.conversations?.isAvailable?.()) {
        throw new Error('Conversations are not available')
    }
    // newTicket=true so each escalate creates a fresh support ticket
    const ticket = await posthog.conversations.sendMessage(message, traits, true)
    if (!ticket) throw new Error('Failed to create support ticket')
    return ticket
}

const TopicSelect = (props: {
    selectedTopics: StrapiData<TopicData[]>
    onPinTopics?: (topics: StrapiRecord<TopicData>[]) => void
}) => {
    const { pinTopics } = useContext(CurrentQuestionContext)
    const [topicGroups, setTopicGroups] = useState([])
    const [selectedTopics, setSelectedTopics] = useState<StrapiRecord<TopicData>[]>([])
    const { addToast } = useToast()

    const handleChange = async (topics: StrapiRecord<TopicData>[]) => {
        setSelectedTopics(topics)
        await pinTopics(topics.map((topic) => topic.id))
        props.onPinTopics?.(topics)
        const topicsAdded = topics.length - selectedTopics.length
        const action = topicsAdded > 0 ? 'pinned' : 'unpinned'
        addToast({
            title: `Topic ${action}`,
            description: `The topic has been ${action} successfully.`,
        })
    }

    useEffect(() => {
        fetchTopicGroups().then((topicGroups) => {
            setTopicGroups(topicGroups)
            const selectedTopics: StrapiRecord<TopicData>[] = []
            topicGroups.forEach(({ attributes: { topics } }) => {
                topics.data.forEach((topic) => {
                    if (props.selectedTopics.data.some((selectedTopic) => selectedTopic.id === topic.id)) {
                        selectedTopics.push(topic)
                    }
                })
            })
            setSelectedTopics(selectedTopics)
        })
    }, [])

    return (
        <div className="relative [&>*]:inline-flex [&>*]:items-center">
            <Listbox value={selectedTopics} onChange={handleChange} multiple>
                <Listbox.Button as={React.Fragment}>
                    <OSButton
                        hover="border"
                        icon={<IconPin />}
                        tooltip={
                            <>
                                <IconShieldLock className="size-5 relative -top-px inline-block text-secondary" /> Pin
                                thread
                            </>
                        }
                        size="md"
                    >
                        <IconExpand className="size-4 inline-block" />
                    </OSButton>
                </Listbox.Button>
                {topicGroups?.length > 0 && (
                    <Listbox.Options
                        data-scheme="primary"
                        className={`list-none p-0 m-0 absolute z-20 max-h-[500px] divide-y divide-primary mt-2 bg-primary shadow-xl border border-primary rounded min-w-52`}
                    >
                        <div className="relative w-full">
                            <ScrollArea className="min-h-0 h-[500px] max-h-[500px]">
                                {topicGroups
                                    .sort(
                                        (a, b) =>
                                            topicGroupsSorted.indexOf(a?.attributes?.label) -
                                            topicGroupsSorted.indexOf(b?.attributes?.label)
                                    )
                                    .map(({ attributes: { label, topics } }) => {
                                        return (
                                            <div key={label}>
                                                <div className="py-1 px-2 text-[13px] border-b border-primary whitespace-nowrap text-secondary">
                                                    {label}
                                                </div>
                                                {topics?.data.map((topic) => {
                                                    const active = selectedTopics.some(
                                                        (selectedTopic) => selectedTopic.id === topic.id
                                                    )
                                                    return (
                                                        <Listbox.Option key={topic.id} value={topic}>
                                                            <div
                                                                data-scheme="primary"
                                                                className={`${
                                                                    active ? 'font-semibold' : ''
                                                                } prose-invert py-1 px-2 text-sm cursor-pointer transition-all whitespace-nowrap flex items-center space-x-2 text-primary hover:bg-accent bg-primary`}
                                                            >
                                                                <span className="flex-shrink-0 w-3">
                                                                    {active && <Check2 />}
                                                                </span>

                                                                <span>{topic.attributes.label}</span>
                                                            </div>
                                                        </Listbox.Option>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                            </ScrollArea>
                        </div>
                    </Listbox.Options>
                )}
            </Listbox>
        </div>
    )
}

const DeleteButton = ({ questionID }: { questionID: number }) => {
    const { getJwt } = useUser()
    const handleClick = async () => {
        if (confirm('Are you sure you want to delete this thread?')) {
            await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/${questionID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await getJwt()}`,
                },
                body: JSON.stringify({ data: { publishedAt: null } }),
            })
            await navigate('/questions')
        }
    }
    return (
        <OSButton
            onClick={handleClick}
            icon={<IconTrash />}
            size="md"
            tooltip={
                <>
                    <IconShieldLock className="size-5 relative -top-px inline-block text-secondary" /> Delete thread
                </>
            }
        />
    )
}

const MaxReply = ({ children, isInForum }: { children: React.ReactNode; isInForum: boolean }) => {
    return (
        <ul className="list-none">
            <li
                className={`pb-2 !mb-0 ${
                    isInForum
                        ? 'px-5'
                        : 'pr-[5px] pl-[30px] border-l border-solid border-primary squeak-left-border relative before:border-l-0'
                }`}
            >
                <Tooltip
                    delay={0}
                    trigger={
                        <div className="relative inline-block">
                            <div className="flex items-center !text-black dark:!text-white">
                                <div className="mr-2 relative">
                                    <Avatar
                                        className={` ${isInForum ? 'size-[40px]' : 'w-[25px] h-[25px]'} rounded-full`}
                                        image="https://res.cloudinary.com/dmukukwp6/image/upload/v1688579513/thumbnail_max_c5dd553db8.png"
                                    />
                                    <span className="absolute -right-1.5 -bottom-2 h-[20px] w-[20px] flex items-center justify-center rounded-full bg-white  text-primary dark:text-primary-dark">
                                        <Logo layout="logomark" className="w-[16px]" />
                                    </span>
                                </div>
                                <strong>PostHog AI</strong>
                            </div>
                        </div>
                    }
                >
                    <div className="text-sm max-w-64">
                        PostHog AI is our resident AI assistant. Double-check responses for accuracy.
                    </div>
                </Tooltip>
                <div
                    className={` mt-1 py-2 px-4 bg-accent rounded-md border border-primary ${
                        isInForum ? 'ml-[calc(44px_+_.5rem)]' : 'ml-[calc(44px_+_.5rem)]'
                    }`}
                >
                    {children}
                </div>
            </li>
        </ul>
    )
}

const Loading = () => {
    const lottieRef = useRef(null)
    return (
        <div className="size-12">
            <DotLottiePlayer loop lottieRef={lottieRef} src="/lotties/loading.lottie" autoplay />
        </div>
    )
}

const AskMaxLoading = ({ isInForum }: { isInForum: boolean }) => {
    const messages = [
        'This usually takes less than 30 seconds.',
        'Searching docs, tutorials, GitHub issues, blogs, community answers...',
        "We'll only show an answer if we're confident it's right!",
        'Thanks for your patience! Should be done shortly...',
        'P.S. Have you checked out our merch store?',
    ]

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
    const [fadeState, setFadeState] = useState('in')

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFadeState('out')
            setTimeout(() => {
                setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length)
                setFadeState('in')
            }, 500) // Wait for fade out before changing message
        }, 5000)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <MaxReply isInForum={isInForum}>
            <div className="flex gap-1">
                <div>
                    <Loading />
                </div>
                <div className="flex-1 font-normal question-content community-post-markdown !p-0">
                    <p>
                        <strong>Hang tight, checking to see if we can find an answer for you...</strong>
                    </p>
                    <p
                        className={`text-secondary !mb-0 !pb-1 transition-opacity duration-500 ${
                            fadeState === 'out' ? 'opacity-0' : 'opacity-100'
                        }`}
                    >
                        {messages[currentMessageIndex]}
                    </p>
                </div>
            </div>
        </MaxReply>
    )
}

const AskMaxButton = ({ onClick, askedMax }: { askedMax: boolean; onClick: () => void }) => {
    const [alreadyAsked, setAlreadyAsked] = useState(askedMax)

    const handleClick = () => {
        setAlreadyAsked(true)
        onClick()
    }

    return (
        <OSButton
            disabled={alreadyAsked}
            onClick={handleClick}
            icon={<IconSparkles />}
            size="md"
            tooltip={
                <>
                    <IconShieldLock className="size-5 relative -top-px inline-block text-secondary" />{' '}
                    {alreadyAsked ? 'Max has already been asked in this thread' : 'Ask Max'}
                </>
            }
        />
    )
}

const AskMax = ({
    question,
    refresh,
    manual = false,
    withContext = false,
    isInForum = false,
}: {
    question: any
    refresh: () => void
    manual?: boolean
    withContext?: boolean
    isInForum?: boolean
}) => {
    const [loading, setLoading] = useState(true)
    const [confident, setConfident] = useState(false)
    const { getJwt } = useUser()

    useEffect(() => {
        const askMax = async () => {
            try {
                const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/ask-max`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${await getJwt()}`,
                    },
                    body: JSON.stringify({
                        question,
                        manual,
                        withContext,
                    }),
                }).then((res) => res.json())
                setConfident(response.confident)
                setLoading(false)
                refresh()
            } catch (error) {
                console.error(error)
            }
        }
        askMax()
        window.history.replaceState({ ...window.history.state, askMax: false }, '')
    }, [])

    return loading ? (
        <AskMaxLoading isInForum={isInForum} />
    ) : !confident ? (
        <MaxReply isInForum={isInForum}>
            <div className="text-secondary font-normal question-content community-post-markdown !p-0">
                <p className="!mb-0">
                    Dang, we couldn't find anything this time. A community member will hopefully respond soon!
                </p>
            </div>
        </MaxReply>
    ) : null
}

export function Question(props: QuestionProps) {
    const {
        id,
        question,
        showSlug,
        buttonText,
        showActions = true,
        isInForum = false,
        onPinTopics,
        refreshList,
    } = props
    const [expanded, setExpanded] = useState(props.expanded || false)
    const [isEditingQuestion, setIsEditingQuestion] = useState(false)
    const { user, notifications, setNotifications, isModerator, isChampion, canModerate } = useUser()
    const { appWindow } = useWindow()
    const { addToast } = useToast()
    const posthog = usePostHog()
    const [escalateState, setEscalateState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
    const [conversationsAvailable, setConversationsAvailable] = useState(false)
    const [maxQuestions, setMaxQuestions] = useState(
        appWindow?.location?.state?.askMax ? [{ manual: false, withContext: false }] : []
    )

    // posthog-js and its conversations widget load asynchronously, so a single
    // isAvailable() check at render time can miss it — poll briefly instead
    useEffect(() => {
        if (!isModerator || !isInForum) return
        const isAvailable = () => !!window?.posthog?.conversations?.isAvailable?.()
        if (isAvailable()) {
            setConversationsAvailable(true)
            return
        }
        let attempts = 0
        const interval = setInterval(() => {
            attempts++
            if (isAvailable()) {
                setConversationsAvailable(true)
                clearInterval(interval)
            } else if (attempts >= 20) {
                clearInterval(interval)
            }
        }, 500)
        return () => clearInterval(interval)
    }, [isModerator, isInForum])

    useEffect(() => {
        if (
            notifications?.length > 0 &&
            notifications.some(
                (notification) => notification.question?.id === id || notification.question?.permalink === id
            )
        ) {
            const newNotifications = notifications.filter(
                (notification) => notification.question?.id !== id && notification.question?.permalink !== id
            )
            setNotifications(newNotifications)
        }
    }, [notifications])

    // TODO: Default to question data if passed in
    const {
        question: questionData,
        isLoading,
        isError,
        error,
        reply,
        handlePublishReply,
        handleResolve,
        handleReplyDelete,
        voteReply,
        archive,
        pinTopics,
        mutate,
        removeTopic,
        escalate,
    } = useQuestion(id, { data: question, onResolve: refreshList })

    useEffect(() => {
        if (questionData) {
            props.onQuestionReady?.(questionData)
        }
    }, [questionData])

    if (isLoading) {
        return <QuestionSkeleton isInForum={isInForum} />
    }

    if (isError) {
        return <div>Error: {JSON.stringify(error)}</div>
    }

    if (!questionData) {
        return null
    }

    const handleReply = async (_values, _formData, data) => {
        if (data.askMax) {
            setMaxQuestions([...maxQuestions, { manual: false, withContext: true }])
        }
    }

    const handleEscalateToSupport = async () => {
        if (escalateState === 'sending' || escalateState === 'sent') return
        setEscalateState('sending')

        // Champions take a different path. Opening a support ticket attributes it to the
        // question author, which needs their email — and champions aren't allowed to read
        // it. Escalating through Strapi lets the server attach the email and post it to
        // Slack, where a moderator decides whether it becomes a ticket.
        if (isChampion) {
            try {
                await escalate()
                setEscalateState('sent')
                addToast({
                    title: 'Escalated',
                    description: 'A PostHog moderator has been notified in Slack and will take a look.',
                })
            } catch (error) {
                setEscalateState('error')
                addToast({
                    title: 'Escalation failed',
                    description: "The moderators couldn't be notified. Please try again.",
                    error: true,
                })
                posthog?.captureException?.(error)
            }
            return
        }

        const authorProfile = questionData.attributes.profile?.data
        const authorName =
            [authorProfile?.attributes?.firstName, authorProfile?.attributes?.lastName].filter(Boolean).join(' ') ||
            'Anonymous'
        const authorEmail = authorProfile?.attributes?.user?.data?.attributes?.email
        const moderatorName = [user?.profile?.firstName, user?.profile?.lastName].filter(Boolean).join(' ')
        const topics = questionData.attributes.topics?.data?.map((topic) => topic.attributes.label).join(', ')
        const message = [
            'Community question escalated by a moderator',
            `Title: ${questionData.attributes.subject}`,
            `Link: https://posthog.com/questions/${questionData.attributes.permalink}`,
            `Author: ${authorName}${authorEmail ? ` (${authorEmail})` : ''}`,
            topics ? `Topics: ${topics}` : null,
            `Escalated by: ${moderatorName || 'Moderator'} (${user?.email})`,
            // Widget tickets only deliver replies to the widget session that created them,
            // which is a throwaway here — make sure support contacts the author directly
            `Note: replies in this thread won't reach the author. Reply on the community question above (they'll be notified there)${
                authorEmail ? `, or email them directly at ${authorEmail}` : ''
            }.`,
        ]
            .filter(Boolean)
            .join('\n')
        try {
            if (!posthog) throw new Error('PostHog is not loaded')
            // Attribute the ticket to the question author so support replies reach them
            const ticket = await createSupportTicket(posthog, message, {
                name: authorName,
                email: authorEmail || null,
            })
            setEscalateState('sent')
            addToast({
                title: 'Escalated to support',
                // Default 3s is too short to read and click the ticket link
                duration: 10000,
                description: (
                    <>
                        A support ticket was created for this question.{' '}
                        {ticket?.ticket_id && (
                            <Link
                                // Tickets live in the posthog.com project (id 2) on US Cloud
                                to={`${
                                    process.env.GATSBY_POSTHOG_UI_HOST || 'https://us.posthog.com'
                                }/project/2/support/tickets/${ticket.ticket_id}`}
                                external
                                className="font-semibold underline"
                            >
                                View the ticket
                            </Link>
                        )}
                    </>
                ),
            })
        } catch (error) {
            setEscalateState('error')
            addToast({
                title: 'Escalation failed',
                description: "The support ticket couldn't be created. Please try again.",
                error: true,
            })
            posthog?.captureException?.(error)
        }
    }

    const archived = questionData?.attributes.archived
    const slugs = questionData?.attributes?.slugs
    const isQuestionAuthor = questionData?.attributes.profile?.data?.id === user?.profile?.id
    const publishedAt = questionData?.attributes?.publishedAt

    return (
        <CurrentQuestionContext.Provider
            value={{
                question: { id, ...(questionData?.attributes ?? {}) },
                handlePublishReply,
                handleResolve,
                handleReplyDelete,
                voteReply,
                pinTopics,
                mutate,
            }}
        >
            <div className={`text-primary ${isModerator && !publishedAt ? '' : ''}`}>
                {archived && (
                    <div
                        data-scheme="secondary"
                        className="m-4 mb-0 bg-primary border border-primary p-4 rounded text-center"
                    >
                        <p className="font-bold text-base !m-0 !p-0">The following thread has been archived.</p>
                        <p className="!text-sm !m-0 text-balance">
                            It's likely out of date, no longer relevant, or the answer has been added to our{' '}
                            <Link to="/docs">documentation</Link>.
                        </p>
                    </div>
                )}
                <div className={`flex flex-col w-full`}>
                    {!publishedAt && isModerator && (
                        <p className="font-bold text-sm m-0 mb-4 italic p-2 bg-accent border border-primary rounded">
                            This thread is unpublished and only visible to moderators
                        </p>
                    )}
                    <div
                        className={`flex items-center space-x-2 w-full ${isInForum ? 'pt-5 pl-5 pr-8' : ''} ${
                            !questionData.attributes.subject && '-mb-2'
                        }`}
                    >
                        <Profile
                            profile={questionData.attributes.profile?.data}
                            className={archived ? 'opacity-50' : ''}
                        />
                        <LevelBadge points={questionData.attributes.profile?.data?.attributes?.reputation} />
                        <Days
                            created={questionData.attributes.createdAt}
                            profile={questionData.attributes.profile?.data}
                            edits={questionData.attributes.edits}
                        />
                        <div className="!ml-auto flex items-center space-x-px [&>*]:inline-flex">
                            {user?.role?.type === 'moderator' && showActions && (
                                <>
                                    {!archived && (
                                        <TopicSelect
                                            onPinTopics={onPinTopics}
                                            selectedTopics={questionData.attributes.pinnedTopics}
                                        />
                                    )}
                                    {!archived ? (
                                        <OSButton
                                            onClick={() => archive(!archived)}
                                            icon={<IconArchive />}
                                            size="md"
                                            tooltip={
                                                <>
                                                    <IconShieldLock className="size-5 relative -top-px inline-block text-secondary" />{' '}
                                                    Archive thread
                                                </>
                                            }
                                        />
                                    ) : (
                                        <OSButton
                                            onClick={() => archive(!archived)}
                                            icon={<IconUndo />}
                                            size="md"
                                            tooltip={
                                                <>
                                                    <IconShieldLock className="size-5 relative -top-px inline-block text-secondary" />{' '}
                                                    Restore thread
                                                </>
                                            }
                                        />
                                    )}
                                    <DeleteButton questionID={questionData.id} />
                                    <AskMaxButton
                                        onClick={() =>
                                            setMaxQuestions([...maxQuestions, { manual: true, withContext: true }])
                                        }
                                        askedMax={questionData?.attributes.askedMax}
                                    />
                                </>
                            )}
                            {!isQuestionAuthor && <ReportSpamButton type="question" id={questionData.id} />}
                            {!archived && (props.subscribeButton ?? true) && (
                                <SubscribeButton contentType="question" id={questionData?.id} show={showActions} />
                            )}
                            {isQuestionAuthor && !isEditingQuestion && (
                                <OSButton
                                    onClick={() => setIsEditingQuestion(true)}
                                    icon={<IconPencil />}
                                    size="md"
                                    tooltip="Edit post"
                                />
                            )}
                        </div>
                    </div>

                    <div className={archived ? 'opacity-50' : ''}>
                        <div
                            className={`pb-4 ${
                                isInForum ? 'pl-[calc(2.5rem_+_30px)] pr-8' : 'border-l border-primary ml-5 pl-[30px]'
                            }`}
                        >
                            {questionData.attributes.subject && (
                                <h3 className="text-base font-semibold !m-0 pb-1 leading-5">
                                    <Link
                                        to={`/questions/${questionData.attributes.permalink}`}
                                        className="!no-underline hover:!underline font-semibold"
                                    >
                                        {questionData.attributes.subject}
                                    </Link>
                                </h3>
                            )}
                            <EditWrapper
                                data={questionData}
                                type="question"
                                onSubmit={() => mutate()}
                                onEditingChange={setIsEditingQuestion}
                                editing={isEditingQuestion}
                            >
                                <Markdown className="question-content">{questionData.attributes.body}</Markdown>
                            </EditWrapper>

                            {!isEditingQuestion && showSlug && slugs?.length > 0 && slugs[0]?.slug !== '/questions' && (
                                <p className="text-xs text-secondary pb-4 mb-0 mt-2">
                                    <span>Originally posted on</span>{' '}
                                    <Link
                                        to={slugs[0]?.slug}
                                        className="text-secondary hover:underline hover:text-primary"
                                        state={{ newWindow: true }}
                                    >
                                        posthog.com{slugs[0]?.slug}
                                    </Link>
                                </p>
                            )}
                        </div>
                        <Replies expanded={expanded} setExpanded={setExpanded} isInForum={isInForum} />
                        {maxQuestions.map((question, index) => {
                            return (
                                <AskMax
                                    key={`ask-max-${index}`}
                                    question={questionData}
                                    refresh={mutate}
                                    manual={question.manual}
                                    withContext={question.withContext}
                                    isInForum={isInForum}
                                />
                            )
                        })}
                    </div>
                    <div
                        {...(isInForum && { 'data-scheme': 'primary' })}
                        className={` pb-1 relative w-full ${
                            isInForum
                                ? 'bg-primary border-t border-primary pt-4 px-4'
                                : 'ml-5 pl-8 pr-5 squeak-left-border'
                        } ${archived ? 'opacity-25' : ''}`}
                    >
                        <QuestionForm
                            archived={archived}
                            questionId={questionData.id}
                            buttonText={buttonText}
                            formType="reply"
                            reply={reply}
                            onSubmit={handleReply}
                            isInForum={isInForum}
                        />
                    </div>
                    {/*
                     * Shared by moderators and community champions. Champions are not
                     * PostHog employees, so anything identifying or admin-only stays
                     * behind isModerator inside — see the gates below.
                     */}
                    {canModerate && isInForum && (
                        <div className="p-4 pb-0">
                            <div className="bg-accent rounded-md p-6 text-primary border border-border">
                                <h4 className="text-xs opacity-70 mb-2 -mt-2 p-0 font-semibold uppercase">
                                    Moderation tools
                                </h4>
                                <div className="grid grid-cols-2">
                                    <div>
                                        <Link
                                            to={`/community/profiles/${questionData?.attributes?.profile?.data?.id}`}
                                            className="text-yellow font-bold"
                                        >
                                            {questionData?.attributes?.profile?.data?.attributes?.firstName
                                                ? `${questionData?.attributes?.profile?.data?.attributes?.firstName} ${questionData?.attributes?.profile?.data?.attributes?.lastName}`
                                                : 'Anonymous'}
                                        </Link>
                                        {/* Author's email — staff only. The API also withholds it from champions. */}
                                        {isModerator && (
                                            <input
                                                className="w-full m-0 font-normal text-sm text-primary border-none p-0 bg-transparent focus:ring-0"
                                                type="text"
                                                value={
                                                    questionData?.attributes?.profile?.data?.attributes?.user?.data
                                                        ?.attributes?.email
                                                }
                                                readOnly
                                                onFocus={(e) => e.target.select()}
                                            />
                                        )}
                                    </div>
                                    <div className="w-full relative">
                                        <p className="!text-sm pt-0.5 pb-0 mb-0 flex flex-col items-end space-y-1.5">
                                            {/* Internal tooling links — staff only. */}
                                            {isModerator && (
                                                <>
                                                    <Link
                                                        className="font-bold"
                                                        to={questionData.attributes.permalink}
                                                        externalNoIcon
                                                    >
                                                        View in PostHog
                                                    </Link>
                                                    <Link
                                                        to={`${process.env.GATSBY_SQUEAK_API_HOST}/admin/content-manager/collection-types/api::question.question/${questionData.id}`}
                                                        externalNoIcon
                                                        className="font-bold"
                                                    >
                                                        View in Strapi
                                                    </Link>
                                                </>
                                            )}
                                            {/*
                                             * Moderators need the conversations widget to open a
                                             * support ticket. Champions escalate through Strapi
                                             * instead, so they don't wait on it.
                                             */}
                                            {(isChampion || conversationsAvailable) && (
                                                <OSButton
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={handleEscalateToSupport}
                                                    disabled={escalateState === 'sending' || escalateState === 'sent'}
                                                >
                                                    {escalateState === 'sending'
                                                        ? 'Escalating…'
                                                        : escalateState === 'sent'
                                                        ? 'Escalated ✓'
                                                        : 'Escalate to support'}
                                                </OSButton>
                                            )}
                                            {escalateState === 'error' && (
                                                <span className="text-red text-xs font-semibold">
                                                    {isChampion
                                                        ? "Couldn't notify moderators. Try again?"
                                                        : "Couldn't create ticket. Try again?"}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 border-t border-border">
                                    <div className="pt-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-xs text-primary opacity-70 p-0 m-0 font-semibold uppercase">
                                                Forum topics
                                            </h4>
                                            <TopicSelector
                                                questionId={questionData.id}
                                                permalink={questionData.attributes.permalink}
                                            />
                                        </div>
                                        <ul className="flex items-center list-none p-0 flex-wrap">
                                            {questionData.attributes?.topics?.data.map((topic) => (
                                                <li
                                                    key={topic.id}
                                                    className="bg-white dark:bg-white/10 py-0.5 px-2 rounded-sm whitespace-nowrap mr-2 my-2 inline-flex items-center space-x-1.5"
                                                >
                                                    <Link
                                                        to={`/questions/topic/${topic.attributes.slug}`}
                                                        className="text-yellow text-sm"
                                                    >
                                                        {topic.attributes.label}
                                                    </Link>

                                                    <button onClick={() => removeTopic(topic)}>
                                                        <XIcon className="h-4 w-4 text-primary" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CurrentQuestionContext.Provider>
    )
}
