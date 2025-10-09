import React, { useEffect, useRef, useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useQuestions } from 'hooks/useQuestions'
import HeaderBar from 'components/OSChrome/HeaderBar'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { TreeMenu } from 'components/TreeMenu'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Question, QuestionForm } from 'components/Squeak'
import { useLocation } from '@reach/router'
import OSButton from 'components/OSButton'
import { IconSidePanel, IconBottomPanel, IconChevronDown, IconNotification, IconSearch } from '@posthog/icons'
import Switch from 'components/RadixUI/Switch'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { useToast } from '../../context/Toast'
import { QuestionData, StrapiRecord } from 'lib/strapi'
import { useUser } from 'hooks/useUser'
import { navigate } from 'gatsby'
import Lottie from 'lottie-react'
import hourglassAnimation from 'images/icons8-hourglass.json'
import { useInView } from 'react-intersection-observer'
import useTopicsNav from '../../navs/useTopicsNav'
import { useWindow } from '../../context/Window'
import Tooltip from 'components/RadixUI/Tooltip'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import { useSubscribedQuestions } from 'hooks/useSubscribedQuestions'
import { flattenStrapiResponse } from '../../utils'
import { CallToAction } from 'components/CallToAction'
import { useApp } from '../../context/App'
import Link from 'components/Link'
import { Select } from 'components/RadixUI/Select'
import SEO from 'components/seo'
dayjs.extend(relativeTime)

const Menu = ({ onValueChange }: { onValueChange: (value: string) => void }) => {
    const { user } = useUser()
    const topicsNav = useTopicsNav()
    const { appWindow } = useWindow()

    const filteredTopicsNav = useMemo(() => {
        return [
            ...(user
                ? [
                      {
                          name: 'My subscriptions',
                          url: '/questions/subscriptions',
                          icon: <IconNotification />,
                      },
                  ]
                : []),
            ...topicsNav,
        ]
    }, [topicsNav])

    const defaultValue = useMemo(() => {
        return filteredTopicsNav.find((topic) => topic.url === appWindow?.path)?.url || filteredTopicsNav[0]?.url
    }, [appWindow?.path])

    useEffect(() => {
        onValueChange(defaultValue)
    }, [])

    return (
        <>
            <div className="@2xl:hidden">
                <Select
                    className="w-full border-none rounded-none"
                    placeholder="Navigate to a topic"
                    defaultValue={defaultValue}
                    onValueChange={(value) => {
                        onValueChange(value)
                        navigate(value)
                    }}
                    groups={[
                        {
                            label: 'Topics',
                            items: filteredTopicsNav.map((topic) => ({
                                label: topic.name,
                                value: topic.url,
                            })),
                        },
                    ]}
                />
            </div>

            <div className="hidden @2xl:block">
                <ScrollArea className="p-2">
                    <TreeMenu key={user?.id} watchPath={false} items={filteredTopicsNav} />
                </ScrollArea>
            </div>
        </>
    )
}

const SIDE_WIDTH_DEFAULT = 600

const layoutOptions = [
    {
        label: 'Stacked view',
        value: 'stacked',
        icon: <IconBottomPanel className="size-5" />,
    },
    {
        label: 'Side-by-side view',
        value: 'side-by-side',
        icon: <IconSidePanel className="size-5" />,
    },
]

const AskAQuestion = ({ onSubmit }: { onSubmit: () => void }) => {
    const { addToast } = useToast()
    const { appWindow } = useWindow()
    const { closeWindow, setWindowTitle } = useApp()

    useEffect(() => {
        setWindowTitle(appWindow, 'Ask a question')
    }, [])

    return (
        <div data-scheme="secondary" className="bg-primary size-full p-4">
            <QuestionForm
                showTopicSelector
                onSubmit={(_values, _type, data) => {
                    onSubmit()
                    addToast({
                        title: 'Question posted',
                        description: (
                            <>
                                Your question has been posted.
                                <br />
                                <Link
                                    className="text-red dark:text-yellow font-semibold"
                                    to={`/questions/${data.attributes.permalink}`}
                                >
                                    View it here
                                </Link>
                            </>
                        ),
                    })
                    closeWindow(appWindow)
                }}
                initialView="question-form"
                slug="/questions"
            />
        </div>
    )
}

export default function Inbox(props) {
    const { data, params } = props
    const initialTopicID = data?.topic?.squeakId
    const permalink = params?.permalink
    const defaultFilters = {
        subject: {
            $ne: '',
        },
        slugs: {
            slug: {
                $notContainsi: '/community/profiles',
            },
        },
        topics: { id: { $eq: initialTopicID } },
    }
    const [ready, setReady] = useState(props.path !== '/questions/subscriptions')
    const [filters, setFilters] = useState(defaultFilters)
    const { addToast } = useToast()
    const { user, setSubscription, isSubscribed, isValidating } = useUser()
    const { questions, isLoading, fetchMore, hasMore, refresh } = useQuestions({
        limit: 20,
        sortBy: 'activity',
        filters,
    })
    const { addWindow, openSearch } = useApp()
    const { appWindow } = useWindow()
    const bottomHeightDefault = useMemo(() => ((appWindow?.size.height || 0) * 3) / 5, [appWindow?.size.height])
    const [bottomHeight, setBottomHeight] = useState(bottomHeightDefault)
    const [sideWidth, setSideWidth] = useState(SIDE_WIDTH_DEFAULT)
    const [notificationsEnabled, setNotificationsEnabled] = useState(false)
    const [question, setQuestion] = useState<StrapiRecord<QuestionData>>()
    const containerRef = useRef<HTMLDivElement>(null)
    const bottomContainerRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStartHeight, setDragStartHeight] = useState(0)
    const [dragStartWidth, setDragStartWidth] = useState(0)
    const [lastQuestionRef, inView] = useInView({ threshold: 0.1 })
    const [sideBySide, setSideBySide] = useState(false)
    const [showSubscribedQuestions, setShowSubscribedQuestions] = useState(false)
    const { questions: subscribedQuestions } = useSubscribedQuestions()
    const [menuValue, setMenuValue] = useState('')
    const isMobile = useMemo(() => appWindow?.size.width < 896, [appWindow?.size.width])

    const expandable = useMemo(() => {
        if (!containerRef.current) return true
        const containerRect = containerRef.current.getBoundingClientRect()
        if (sideBySide) {
            return isMobile ? sideWidth <= 0 : sideWidth <= 400
        } else {
            return bottomHeight <= containerRect.height / 2
        }
    }, [bottomHeight, sideWidth, sideBySide, containerRef.current, isMobile])

    const handleSideBySide = (sideBySide: boolean) => {
        setSideBySide(sideBySide)
        localStorage.setItem('sideBySide', sideBySide.toString())
    }

    const expandOrCollapse = (expandable: boolean) => {
        if (!containerRef.current) return
        if (sideBySide) {
            const containerWidth = containerRef.current.getBoundingClientRect().width
            const minWidth = isMobile ? 0 : 400
            setSideWidth(expandable ? containerWidth : minWidth)
        } else {
            const containerHeight = containerRef.current.getBoundingClientRect().height
            const minHeight = 45
            setBottomHeight(expandable ? containerHeight : minHeight)
        }
    }

    const handleVerticalDrag = (_event, info) => {
        if (!containerRef.current) return
        const containerHeight = containerRef.current.getBoundingClientRect().height
        const newBottomHeight = Math.min(Math.max(dragStartHeight - info.offset.y, 45), containerHeight)
        setBottomHeight(newBottomHeight)
    }

    const handleHorizontalDrag = (_event, info) => {
        if (!containerRef.current) return
        const containerWidth = containerRef.current.getBoundingClientRect().width
        const newSideWidth = Math.min(Math.max(dragStartWidth - info.offset.x, 400), containerWidth)
        setSideWidth(newSideWidth)
    }

    useEffect(() => {
        if (inView && hasMore) {
            fetchMore()
        }
    }, [inView, hasMore])

    useEffect(() => {
        if (initialTopicID && initialTopicID !== filters.topics?.id?.$eq) {
            const { id, ...newFilters } = filters
            setFilters({ ...newFilters, topics: { id: { $eq: initialTopicID } } })
        }
    }, [initialTopicID])

    useEffect(() => {
        if (user && question?.id) {
            isSubscribed('question', question.id).then((subscribed) => setNotificationsEnabled(subscribed))
        }
    }, [question, user])

    useEffect(() => {
        if (props.path === '/questions/subscriptions') {
            if (user) {
                setShowSubscribedQuestions(true)
            } else {
                navigate('/questions')
            }
            setReady(true)
        } else if (props.path === '/questions' || initialTopicID) {
            setShowSubscribedQuestions(false)
            setFilters(defaultFilters)
        }
    }, [isValidating, props.path])

    useEffect(() => {
        const sideBySide = localStorage.getItem('sideBySide')
        if (sideBySide) {
            setSideBySide(sideBySide === 'true')
        }
    }, [])

    useEffect(() => {
        if (!containerRef.current) return
        const containerRect = containerRef.current.getBoundingClientRect()

        if (sideBySide) {
            setSideWidth(Math.max(400, SIDE_WIDTH_DEFAULT))
        } else {
            setBottomHeight(Math.max(containerRect.height / 2, bottomHeightDefault))
        }
    }, [sideBySide])

    useEffect(() => {
        if (isMobile && sideBySide && containerRef.current) {
            setSideWidth(containerRef.current.getBoundingClientRect().width)
        }
    }, [isMobile, sideBySide, containerRef.current, appWindow?.size.width])

    return (
        <>
            <SEO title={(permalink && question?.attributes.subject) || data?.topic?.label || 'Forums'} />
            {ready ? (
                <div className="@container w-full h-full flex flex-col">
                    <HeaderBar
                        homeURL="/questions"
                        showBack
                        showForward
                        showSearch
                        rightActionButtons={
                            <div className="flex items-center gap-2 flex-wrap">
                                <OSButton icon={<IconSearch />} onClick={() => openSearch('questions')} />
                                <CallToAction
                                    size="sm"
                                    onClick={() =>
                                        addWindow(
                                            <AskAQuestion
                                                newWindow
                                                location={{ pathname: `ask-a-question` }}
                                                key={`ask-a-question`}
                                                onSubmit={refresh}
                                            />
                                        )
                                    }
                                >
                                    Ask a question
                                </CallToAction>
                                {permalink ? (
                                    <ToggleGroup
                                        title="Layout"
                                        hideTitle={true}
                                        options={layoutOptions}
                                        onValueChange={(value) => handleSideBySide(value === 'side-by-side')}
                                        value={sideBySide ? 'side-by-side' : 'stacked'}
                                        className="-my-1"
                                    />
                                ) : null}
                            </div>
                        }
                    />

                    <div
                        data-scheme="secondary"
                        className="flex @2xl:flex-row flex-col flex-grow border-t border-primary min-h-0"
                    >
                        <aside
                            data-scheme="secondary"
                            className="w-full @2xl:w-64 bg-primary @2xl:border-r border-primary @2xl:h-full flex-shrink-0"
                        >
                            <ScrollArea className="h-full">
                                <Menu onValueChange={setMenuValue} />
                            </ScrollArea>
                        </aside>
                        <main
                            data-scheme="primary"
                            className="flex-1 bg-primary overflow-hidden @2xl:border-none border-t border-primary"
                        >
                            <div
                                ref={containerRef}
                                className={`flex flex-row h-full ${sideBySide ? 'flex-row' : 'flex-col'}`}
                            >
                                <div className={`@container flex-1 min-h-0 text-sm ${sideBySide ? 'w-0' : 'w-full'}`}>
                                    <ScrollArea className="h-full">
                                        <div className="flex items-center pl-2.5 pr-4 py-2 border-b border-primary font-medium bg-accent text-sm bg-accent-2 sticky top-0 text-primary z-10 whitespace-nowrap">
                                            <div className="hidden @3xl:block w-48">Author</div>
                                            <div className="flex-1">
                                                <span className="@3xl:hidden">Author / Replies</span>
                                                <span className="hidden @3xl:block">Subject</span>
                                            </div>
                                            <div className="hidden @3xl:block w-24 text-center">Replies</div>
                                            <div className="w-60 text-right @3xl:text-left">Last activity</div>
                                        </div>
                                        <div className="px-1 py-1 space-y-px">
                                            {(showSubscribedQuestions
                                                ? subscribedQuestions
                                                : flattenStrapiResponse(questions.data)
                                            )?.map((question) => {
                                                const { subject, numReplies, activeAt, replies, profile, permalink } =
                                                    question
                                                const latestAuthor =
                                                    replies?.data?.[replies.data.length - 1]?.profile || profile
                                                const active = `/questions/${permalink}` === appWindow?.path
                                                return (
                                                    <div key={question.id} ref={lastQuestionRef}>
                                                        <OSButton
                                                            asLink
                                                            to={`/questions/${permalink}`}
                                                            align="left"
                                                            width="full"
                                                            hover="background"
                                                            size="md"
                                                            key={question.id}
                                                            className={` 
                                                        flex-wrap @3xl:flex-nowrap !gap-0 @3xl:!gap-1 !items-start
                                                        ${active ? 'font-bold bg-accent' : ''}
                                                    `}
                                                            onClick={() => {
                                                                if (!containerRef.current) return
                                                                if (bottomHeight <= 45) {
                                                                    setBottomHeight(
                                                                        containerRef.current.getBoundingClientRect()
                                                                            .height * 0.8
                                                                    )
                                                                }
                                                            }}
                                                        >
                                                            <div className="basis-9/12 @3xl:basis-auto order-1 @3xl:order-none @3xl:w-48 @3xl:block">
                                                                {profile?.firstName} {profile?.lastName}
                                                                <span className="text-muted text-sm ml-1 @3xl:hidden">
                                                                    {numReplies}
                                                                </span>
                                                            </div>
                                                            <div
                                                                className={`order-3 @3xl:order-none flex-[1_0_100%] @3xl:flex-1 ${
                                                                    active
                                                                        ? 'font-medium @3xl:font-bold'
                                                                        : 'font-medium'
                                                                }`}
                                                            >
                                                                {subject}
                                                            </div>
                                                            <div className="hidden @3xl:block w-24 text-center">
                                                                {numReplies}
                                                            </div>
                                                            <div className="order-2 basis-3/12 text-right @3xl:text-left @3xl:basis-auto @3xl:w-60 ">
                                                                <Tooltip trigger={dayjs(activeAt).fromNow()}>
                                                                    {dayjs(activeAt).format('dddd, MMMM D, YYYY')} at{' '}
                                                                    {dayjs(activeAt).format('h:mm A')}
                                                                </Tooltip>{' '}
                                                                <span className="hidden @3xl:inline-block">
                                                                    by {latestAuthor?.firstName}{' '}
                                                                    {latestAuthor?.lastName}
                                                                </span>
                                                            </div>
                                                        </OSButton>
                                                    </div>
                                                )
                                            })}
                                            {!isLoading && (!questions.data || questions.data.length === 0) && (
                                                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                                                    <div className="text-lg mb-2 font-semibold">No questions found</div>
                                                    <div className="text-secondary text-sm">
                                                        {props.path === '/questions/subscriptions'
                                                            ? "You haven't subscribed to any questions yet."
                                                            : 'There are no questions in this topic yet.'}
                                                    </div>
                                                </div>
                                            )}
                                            {isLoading && (
                                                <div className="flex items-center justify-center py-8 h-full">
                                                    <Lottie
                                                        animationData={hourglassAnimation}
                                                        className="size-6 opacity-75"
                                                        title="Loading questions..."
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </ScrollArea>
                                </div>
                                <AnimatePresence>
                                    {permalink && (
                                        <motion.div
                                            ref={bottomContainerRef}
                                            className={`flex-none relative min-h-0 min-w-0 ${
                                                !isDragging ? 'transition-all duration-200 ease-out' : ''
                                            } ${sideBySide ? '@4xl:border-l border-primary' : ''}`}
                                            initial={{
                                                width: 0,
                                            }}
                                            animate={{
                                                height: sideBySide ? '100%' : bottomHeight,
                                                width: sideBySide ? sideWidth : '100%',
                                            }}
                                            exit={{
                                                width: 0,
                                            }}
                                            transition={{
                                                type: 'tween',
                                                ...(isDragging ? { duration: 0 } : {}),
                                            }}
                                        >
                                            {sideBySide ? (
                                                <motion.div
                                                    data-scheme="tertiary"
                                                    className="w-1.5 cursor-ew-resize top-0 left-0 !transform-none absolute z-20 h-full hover:bg-accent active:bg-accent @4xl:block hidden"
                                                    drag="x"
                                                    dragMomentum={false}
                                                    dragConstraints={{ left: 0, right: 0 }}
                                                    onMouseDown={() => {
                                                        setIsDragging(true)
                                                        setDragStartWidth(sideWidth)
                                                    }}
                                                    onDragEnd={() => setIsDragging(false)}
                                                    onDrag={handleHorizontalDrag}
                                                    onDoubleClick={() => expandOrCollapse(expandable)}
                                                />
                                            ) : (
                                                <motion.div
                                                    data-scheme="tertiary"
                                                    className="h-1.5 cursor-ns-resize top-0 left-0 !transform-none absolute z-20 w-full hover:bg-accent active:bg-accent @4xl:block hidden"
                                                    drag="y"
                                                    dragMomentum={false}
                                                    dragConstraints={{ top: 0, bottom: 0 }}
                                                    onDragStart={() => {
                                                        setIsDragging(true)
                                                        setDragStartHeight(bottomHeight)
                                                    }}
                                                    onDragEnd={() => setIsDragging(false)}
                                                    onDrag={handleVerticalDrag}
                                                    onDoubleClick={() => expandOrCollapse(expandable)}
                                                />
                                            )}

                                            <div
                                                className={`bg-accent border-y border-primary px-4 py-2 flex gap-2 items-center sticky top-0 z-10 ${
                                                    sideBySide ? 'border-t-0' : ''
                                                }`}
                                            >
                                                <OSButton
                                                    variant="secondary"
                                                    size="xs"
                                                    onClick={() => {
                                                        if (!containerRef.current) return
                                                        const containerHeight =
                                                            containerRef.current.getBoundingClientRect().height
                                                        setBottomHeight(containerHeight)
                                                        document.getElementById('question-form-button')?.click()
                                                        setTimeout(() => {
                                                            const viewport = bottomContainerRef.current?.querySelector(
                                                                '[data-radix-scroll-area-viewport]'
                                                            )
                                                            viewport?.scrollTo({
                                                                top: viewport.scrollHeight,
                                                                behavior: 'smooth',
                                                            })
                                                        }, 300)
                                                    }}
                                                >
                                                    Reply
                                                </OSButton>
                                                <div className="ml-auto flex space-x-4">
                                                    {question?.id && user && (
                                                        <Switch
                                                            checked={notificationsEnabled}
                                                            onChange={(checked) => {
                                                                setNotificationsEnabled(checked)
                                                                setSubscription({
                                                                    contentType: 'question',
                                                                    id: question.id,
                                                                    subscribe: checked,
                                                                })
                                                                addToast({
                                                                    description: checked
                                                                        ? "You'll be notified of replies by email."
                                                                        : "You won't receive notifications for this thread.",
                                                                    title: checked
                                                                        ? 'Thread notifications enabled'
                                                                        : 'Thread notifications disabled',
                                                                    onUndo: () => {
                                                                        setNotificationsEnabled(!checked)
                                                                        setSubscription({
                                                                            contentType: 'question',
                                                                            id: question.id,
                                                                            subscribe: !checked,
                                                                        })
                                                                    },
                                                                })
                                                            }}
                                                            label="Thread notifications"
                                                        />
                                                    )}

                                                    <div className="ml-1 pl-1 border-l border-primary">
                                                        <Tooltip
                                                            trigger={
                                                                <span>
                                                                    <OSButton
                                                                        size="sm"
                                                                        className="relative"
                                                                        style={{ width: 26, height: 26 }}
                                                                        icon={
                                                                            <IconChevronDown
                                                                                className={`w-6 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ${
                                                                                    sideBySide
                                                                                        ? expandable
                                                                                            ? 'rotate-90'
                                                                                            : '-rotate-90'
                                                                                        : expandable
                                                                                        ? 'rotate-180'
                                                                                        : ''
                                                                                }`}
                                                                            />
                                                                        }
                                                                        onClick={() => {
                                                                            if (isMobile && sideBySide) {
                                                                                navigate(menuValue)
                                                                            } else {
                                                                                expandOrCollapse(expandable)
                                                                            }
                                                                        }}
                                                                    />
                                                                </span>
                                                            }
                                                        >
                                                            {expandable ? 'Expand' : 'Collapse'}
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                            <ScrollArea>
                                                <div className="p-5 pb-[64px]">
                                                    <Question
                                                        id={permalink}
                                                        onQuestionReady={(question) => setQuestion(question)}
                                                        subscribeButton={false}
                                                        showSlug
                                                    />
                                                </div>
                                            </ScrollArea>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </main>
                    </div>
                </div>
            ) : null}
        </>
    )
}
