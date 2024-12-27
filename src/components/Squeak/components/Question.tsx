import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState, createContext, useEffect, useContext, useMemo, useRef } from 'react'
import { Replies } from './Replies'
import { Profile } from './Profile'
import { QuestionData, StrapiData, StrapiRecord, TopicData } from 'lib/strapi'
import Days from './Days'
import Markdown from './Markdown'
import { QuestionForm } from './QuestionForm'
import { useQuestion } from '../hooks/useQuestion'
import QuestionSkeleton from './QuestionSkeleton'
import SubscribeButton from './SubscribeButton'
import Link from 'components/Link'
import { useUser } from 'hooks/useUser'
import { IconArchive, IconPencil, IconPin, IconSparkles, IconTrash, IconUndo } from '@posthog/icons'
import Tooltip from 'components/Tooltip'
import { Listbox } from '@headlessui/react'
import { fetchTopicGroups, topicGroupsSorted } from '../../../pages/questions'
import { Check2, Close } from 'components/Icons'
import Modal from 'components/Modal'
import Checkbox from 'components/Checkbox'
import { CallToAction } from 'components/CallToAction'
import { navigate } from 'gatsby'
import Logomark from 'components/Home/images/Logomark'
import Avatar from './Avatar'
import { DotLottiePlayer } from '@dotlottie/react-player'
import EditWrapper from './EditWrapper'

type QuestionProps = {
    // TODO: Deal with id possibly being undefined at first
    id: number | string
    question?: StrapiRecord<QuestionData>
    expanded?: boolean
    showSlug?: boolean
    buttonText?: string
    showActions?: boolean
    askMax?: boolean
}

export const CurrentQuestionContext = createContext<any>({})

const TopicSelect = (props: { selectedTopics: StrapiData<TopicData[]> }) => {
    const { pinTopics } = useContext(CurrentQuestionContext)
    const [topicGroups, setTopicGroups] = useState([])
    const [selectedTopics, setSelectedTopics] = useState<StrapiRecord<TopicData>[]>([])

    const handleChange = async (topics: StrapiRecord<TopicData>[]) => {
        setSelectedTopics(topics)
        await pinTopics(topics.map((topic) => topic.id))
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
        <div className="relative">
            <Listbox value={selectedTopics} onChange={handleChange} multiple>
                <Listbox.Button className="flex items-center leading-none rounded-sm p-1 relative bg-accent dark:bg-accent-dark border border-light dark:border-dark text-primary/50 hover:text-primary/75 dark:text-primary-dark/50 dark:hover:text-primary-dark/75 hover:scale-[1.05] hover:top-[-.5px] active:scale-[1] active:top-[0px] font-bold">
                    <Tooltip content={() => <div style={{ maxWidth: 320 }}>Pin thread</div>}>
                        <span className="flex items-center h-6 justify-center">
                            <IconPin className="w-5 h-5" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                                />
                            </svg>
                        </span>
                    </Tooltip>
                </Listbox.Button>
                {topicGroups?.length > 0 && (
                    <Listbox.Options
                        className={`list-none p-0 m-0 absolute z-20 bg-white dark:bg-gray-accent-dark-hover max-h-[500px] overflow-auto shadow-md rounded-md divide-y divide-light dark:divide-dark mt-2`}
                    >
                        {topicGroups
                            .sort(
                                (a, b) =>
                                    topicGroupsSorted.indexOf(a?.attributes?.label) -
                                    topicGroupsSorted.indexOf(b?.attributes?.label)
                            )
                            .map(({ attributes: { label, topics } }) => {
                                return (
                                    <div key={label}>
                                        <h5 className="!m-0 py-2 px-4 text-sm sticky top-0 bg-white dark:bg-gray-accent-dark-hover whitespace-nowrap">
                                            {label}
                                        </h5>
                                        {topics?.data.map((topic) => {
                                            const active = selectedTopics.some(
                                                (selectedTopic) => selectedTopic.id === topic.id
                                            )
                                            return (
                                                <Listbox.Option key={topic.id} value={topic}>
                                                    <div
                                                        className={`${
                                                            active ? 'font-semibold' : ''
                                                        } py-1 px-2 text-sm cursor-pointer transition-all whitespace-nowrap flex items-center space-x-2 bg-white text-black hover:bg-gray-accent-light/30 dark:bg-gray-accent-dark-hover dark:hover:bg-black/50 dark:text-primary-dark`}
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
                    </Listbox.Options>
                )}
            </Listbox>
        </div>
    )
}

const EscalateButton = ({ escalate, escalated }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [showResponse, setShowResponse] = useState(false)
    const [response, setResponse] = useState(
        "Howdy! We've escalated your question to our support desk. An engineer will be in touch soon."
    )

    const handleConfirm = () => {
        escalate(showResponse && response)
        setModalOpen(false)
    }

    return (
        <>
            <Modal open={modalOpen} setOpen={setModalOpen}>
                <div className="border-border dark:border-dark border absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent dark:bg-accent-dark max-w-lg w-full rounded-md">
                    <button onClick={() => setModalOpen(false)} className="absolute top-3 right-3">
                        <Close className="w-4 h-4" />
                    </button>

                    <div className="p-4 pb-0">
                        <h3 className="mb-2 mt-0">Escalate thread</h3>
                        <p className="text-base mt-2 mb-4">
                            Please confirm that you'd like to escalate this thread to Zendesk
                        </p>
                        <Checkbox
                            className="!text-base"
                            value="Notify subscribers"
                            checked={showResponse}
                            onChange={(e) => setShowResponse(e.target.checked)}
                        />
                        {showResponse && (
                            <>
                                <p className="text-sm p-2 mt-4 mb-3 border border-border dark:border-border text-center rounded-md bg-light dark:bg-dark font-semibold">
                                    Response will come from Max, the support hog
                                </p>
                                <div className="flex space-x-2 items-start mb-6">
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Squeak/images/max.png"
                                        width={40}
                                        height={40}
                                        className="rounded-full flex-shrink-0 bg-light dark:bg-dark border border-border dark:border-dark"
                                    />
                                    <textarea
                                        rows={5}
                                        placeholder="Message from Max"
                                        className="w-full p-2 rounded-md border border-border dark:border-dark text-black bg-white"
                                        value={response}
                                        onChange={(e) => setResponse(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <div className="p-4 mt-4 border-t border-border dark:border-dark flex justify-end">
                        <CallToAction onClick={handleConfirm} size="sm" type="outline">
                            {showResponse ? 'Escalate and notify' : 'Escalate'}
                        </CallToAction>
                    </div>
                </div>
            </Modal>
        </>
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
        <button
            onClick={handleClick}
            className="flex items-center leading-none rounded-sm p-1 relative bg-accent dark:bg-accent-dark border border-light dark:border-dark text-primary/50 hover:text-primary/75 dark:text-primary-dark/50 dark:hover:text-primary-dark/75 hover:scale-[1.05] hover:top-[-.5px] active:scale-[1] active:top-[0px] font-bold"
        >
            <Tooltip content={() => <div style={{ maxWidth: 320 }}>Delete thread</div>}>
                <span className="flex w-6 h-6">
                    <IconTrash />
                </span>
            </Tooltip>
        </button>
    )
}

const MaxReply = ({ children }: { children: React.ReactNode }) => {
    return (
        <ul className="ml-5 !mb-0 p-0 list-none">
            <li
                className={`pr-[5px] pl-[30px] pb-2 !mb-0 border-l border-solid border-light dark:border-dark squeak-left-border relative before:border-l-0`}
            >
                <Tooltip
                    content={() => (
                        <div className="text-sm max-w-64">
                            Max AI is our resident AI assistant. Double-check responses for accuracy.
                        </div>
                    )}
                    placement="top"
                >
                    <div className="relative inline-block">
                        <div className="flex items-center !text-black dark:!text-white">
                            <div className="mr-2 relative">
                                <Avatar
                                    className="w-[25px] h-[25px] rounded-full"
                                    image="https://res.cloudinary.com/dmukukwp6/image/upload/v1688579513/thumbnail_max_c5dd553db8.png"
                                />
                                <span className="absolute -right-1.5 -bottom-2 h-[20px] w-[20px] flex items-center justify-center rounded-full bg-white dark:bg-gray-accent-dark text-primary dark:text-primary-dark">
                                    <Logomark className="w-[16px]" />
                                </span>
                            </div>
                            <strong>Max AI</strong>
                        </div>
                    </div>
                </Tooltip>
                <div className="ml-[33px] mt-1 py-2 px-4 bg-accent dark:bg-accent-dark rounded-md border border-light dark:border-dark">
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

const AskMaxLoading = () => {
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
        <MaxReply>
            <div className="flex gap-1">
                <div>
                    <Loading />
                </div>
                <div className="flex-1 font-normal question-content community-post-markdown !p-0">
                    <p className="!mt-1 !mb-0 !pb-0">
                        <strong>Hang tight, checking to see if we can find an answer for you...</strong>
                    </p>
                    <p
                        className={`text-primary/75 dark:text-primary-dark/75 !mb-0 !pb-1 transition-opacity duration-500 ${
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
        <button
            disabled={alreadyAsked}
            onClick={handleClick}
            className="flex items-center leading-none rounded-sm p-1 relative bg-accent dark:bg-accent-dark border border-light dark:border-dark text-primary/50 hover:text-primary/75 dark:text-primary-dark/50 dark:hover:text-primary-dark/75 hover:scale-[1.05] hover:top-[-.5px] active:scale-[1] active:top-[0px] font-bold disabled:!scale-[1] disabled:!top-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:!text-primary/50 dark:disabled:!text-primary-dark/50"
        >
            <Tooltip content={() => <div style={{ maxWidth: 320 }}>Ask Max</div>}>
                <span className="flex w-6 h-6">
                    <IconSparkles />
                </span>
            </Tooltip>
        </button>
    )
}

const AskMax = ({
    question,
    refresh,
    manual = false,
    withContext = false,
}: {
    question: any
    refresh: () => void
    manual?: boolean
    withContext?: boolean
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
        <AskMaxLoading />
    ) : !confident ? (
        <MaxReply>
            <div className="text-primary/75 dark:text-primary-dark/75 font-normal question-content community-post-markdown !p-0">
                <p>Dang, we couldn’t find anything this time. A community member will hopefully respond soon!</p>
            </div>
        </MaxReply>
    ) : null
}

export const Question = (props: QuestionProps) => {
    const { id, question, showSlug, buttonText, showActions = true, ...other } = props
    const [expanded, setExpanded] = useState(props.expanded || false)
    const { user, notifications, setNotifications } = useUser()
    const [maxQuestions, setMaxQuestions] = useState(other.askMax ? [{ manual: false, withContext: false }] : [])

    useEffect(() => {
        if (
            notifications?.length > 0 &&
            notifications.some(
                (notification) => notification.question.id === id || notification.question.permalink === id
            )
        ) {
            const newNotifications = notifications.filter(
                (notification) => notification.question.id !== id && notification.question.permalink !== id
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
        archive,
        pinTopics,
        escalate,
        mutate,
    } = useQuestion(id, { data: question })

    if (isLoading) {
        return <QuestionSkeleton />
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

    const archived = questionData?.attributes.archived
    const slugs = questionData?.attributes?.slugs
    const escalated = questionData?.attributes.escalated
    const isQuestionAuthor = questionData?.attributes.profile?.data?.id === user?.profile?.id

    return (
        <CurrentQuestionContext.Provider
            value={{
                question: { id, ...(questionData?.attributes ?? {}) },
                handlePublishReply,
                handleResolve,
                handleReplyDelete,
                pinTopics,
                mutate,
            }}
        >
            <div>
                {archived && (
                    <div className="font-medium text-sm m-0 mb-6 bg-accent dark:bg-accent-dark border border-light dark:border-dark p-4 rounded text-center">
                        <p className="font-bold !m-0 !p-0">The following thread has been archived.</p>
                        <p className="!text-sm !m-0">
                            It's likely out of date, no longer relevant, or the answer has been added to our{' '}
                            <Link to="/docs">documentation</Link>.
                        </p>
                    </div>
                )}
                <div className={`flex flex-col w-full`}>
                    <div
                        className={`flex items-center space-x-2 w-full ${!questionData.attributes.subject && '-mb-2'}`}
                    >
                        <Profile
                            profile={questionData.attributes.profile?.data}
                            className={archived ? 'opacity-50' : ''}
                        />
                        <Days
                            created={questionData.attributes.createdAt}
                            profile={questionData.attributes.profile?.data}
                            edits={questionData.attributes.edits}
                        />
                        <div className="!ml-auto flex space-x-2">
                            {user?.role?.type === 'moderator' && showActions && (
                                <>
                                    {!archived && <TopicSelect selectedTopics={questionData.attributes.pinnedTopics} />}
                                    <EscalateButton escalate={escalate} escalated={escalated} />
                                    <button
                                        onClick={() => archive(!archived)}
                                        className="flex items-center leading-none rounded-sm p-1 relative bg-accent dark:bg-accent-dark border border-light dark:border-dark text-primary/50 hover:text-primary/75 dark:text-primary-dark/50 dark:hover:text-primary-dark/75 hover:scale-[1.05] hover:top-[-.5px] active:scale-[1] active:top-[0px] font-bold"
                                    >
                                        {!archived ? (
                                            <Tooltip
                                                content={() => <div style={{ maxWidth: 320 }}>Archive thread</div>}
                                            >
                                                <span className="flex w-6 h-6">
                                                    <IconArchive />
                                                </span>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip
                                                content={() => <div style={{ maxWidth: 320 }}>Restore thread</div>}
                                            >
                                                <span className="flex w-6 h-6">
                                                    <IconUndo />
                                                </span>
                                            </Tooltip>
                                        )}
                                    </button>
                                    <DeleteButton questionID={questionData.id} />
                                    <AskMaxButton
                                        onClick={() =>
                                            setMaxQuestions([...maxQuestions, { manual: true, withContext: true }])
                                        }
                                        askedMax={questionData?.attributes.askedMax}
                                    />
                                </>
                            )}
                            {!archived && (
                                <SubscribeButton contentType="question" id={questionData?.id} show={showActions} />
                            )}
                        </div>
                    </div>

                    <div className={archived ? 'opacity-50' : ''}>
                        <div className="ml-5 pl-[30px] pb-4 border-l border-light dark:border-dark">
                            {questionData.attributes.subject && (
                                <h3 className="text-base font-semibold !m-0 pb-1 leading-5">
                                    <Link
                                        to={`/questions/${questionData.attributes.permalink}`}
                                        className="no-underline font-semibold text-black dark:text-white hover:text-black dark:hover:text-white"
                                    >
                                        {questionData.attributes.subject}
                                    </Link>
                                </h3>
                            )}
                            <EditWrapper data={questionData} type="question" onSubmit={() => mutate()}>
                                {({ setEditing }) => {
                                    return (
                                        <>
                                            <Markdown className="question-content">
                                                {questionData.attributes.body}
                                            </Markdown>
                                            {isQuestionAuthor && (
                                                <div className="mt-2">
                                                    <button
                                                        onClick={() => setEditing(true)}
                                                        className="text-red dark:text-yellow font-semibold text-sm flex items-center py-1 px-1.5 rounded hover:bg-accent dark:hover:bg-border-dark/50"
                                                    >
                                                        <IconPencil className="size-4 mr-1 text-primary/70 dark:text-primary-dark/70 inline-block" />
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )
                                }}
                            </EditWrapper>
                            {showSlug && slugs?.length > 0 && slugs[0]?.slug !== '/questions' && (
                                <p className="text-xs text-primary/60 dark:text-primary-dark/60 pb-4 mb-0 mt-1">
                                    <span>Originally posted on</span>{' '}
                                    <Link
                                        to={slugs[0]?.slug}
                                        className="text-primary/60 dark:text-primary-dark/60 font-medium"
                                    >
                                        https://posthog.com{slugs[0]?.slug}
                                    </Link>
                                </p>
                            )}
                        </div>
                        <Replies expanded={expanded} setExpanded={setExpanded} />
                        {maxQuestions.map((question, index) => {
                            return (
                                <AskMax
                                    key={`ask-max-${index}`}
                                    question={questionData}
                                    refresh={mutate}
                                    manual={question.manual}
                                    withContext={question.withContext}
                                />
                            )
                        })}
                    </div>
                    <div
                        className={`ml-5 pr-5 pb-1 pl-8 relative w-full squeak-left-border ${
                            archived ? 'opacity-25' : ''
                        }`}
                    >
                        <QuestionForm
                            archived={archived}
                            questionId={questionData.id}
                            buttonText={buttonText}
                            formType="reply"
                            reply={reply}
                            onSubmit={handleReply}
                        />
                    </div>
                </div>
            </div>
        </CurrentQuestionContext.Provider>
    )
}
