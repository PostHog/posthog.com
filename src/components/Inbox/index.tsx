import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useQuestions } from 'hooks/useQuestions'
import HeaderBar from 'components/OSChrome/HeaderBar'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { TreeMenu } from 'components/TreeMenu'
import useProduct from 'hooks/useProduct'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Question } from 'components/Squeak'
import { useLocation } from '@reach/router'
import OSButton from 'components/OSButton'
import { IconCheck, IconCornerDownRight, IconSidePanel, IconBottomPanel } from '@posthog/icons'
import Switch from 'components/RadixUI/Switch'
import { useToast } from '../../context/Toast'
import { QuestionData, StrapiRecord } from 'lib/strapi'
import { useUser } from 'hooks/useUser'
import { navigate } from 'gatsby'
import Lottie from 'lottie-react'
import hourglassAnimation from 'images/icons8-hourglass.json'
import { useInView } from 'react-intersection-observer'
import Tooltip from 'components/Tooltip'

dayjs.extend(relativeTime)

const Menu = () => {
    const products = useProduct()
    const { user } = useUser()
    return (
        <TreeMenu
            items={[
                {
                    name: 'My subscriptions',
                    url: '/questions/subscriptions',
                },
                {
                    name: 'Products',
                    children: products.map((product) => {
                        return {
                            name: product.name,
                            url: `/questions/topic${product.slug}`,
                        }
                    }),
                },
            ]}
        />
    )
}

export default function Inbox(props) {
    const { data, params } = props
    const initialTopicID = data?.topic?.squeakId
    const permalink = params?.permalink
    const [ready, setReady] = useState(props.path !== '/questions/subscriptions')
    const [filters, setFilters] = useState({
        subject: {
            $ne: '',
        },
        slugs: {
            slug: {
                $notContainsi: '/community/profiles',
            },
        },
        topics: {
            id: {
                $eq: initialTopicID,
            },
        },
    })
    const { pathname } = useLocation()
    const { addToast } = useToast()
    const { user, setSubscription, isSubscribed, isValidating } = useUser()
    const { questions, isLoading, fetchMore, hasMore, refresh } = useQuestions({
        limit: 20,
        sortBy: 'activity',
        filters,
    })
    const [bottomHeight, setBottomHeight] = useState(300)
    const [sideWidth, setSideWidth] = useState(600)
    const [notificationsEnabled, setNotificationsEnabled] = useState(false)
    const [question, setQuestion] = useState<StrapiRecord<QuestionData>>()
    const containerRef = useRef<HTMLDivElement>(null)
    const bottomContainerRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [lastQuestionRef, inView] = useInView({ threshold: 0.1 })
    const [sideBySide, setSideBySide] = useState(false)

    const handleSideBySide = (sideBySide: boolean) => {
        setSideBySide(sideBySide)
        localStorage.setItem('sideBySide', sideBySide.toString())
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
        if (props.path === '/questions/subscriptions' && !isValidating) {
            if (user) {
                const { topics, ...newFilters } = filters
                setFilters({
                    ...newFilters,
                    id: { $in: user.profile.questionSubscriptions.map((question) => question.id) },
                })
            } else {
                navigate('/questions')
            }
            setReady(true)
        }
    }, [isValidating, props.path])

    useEffect(() => {
        const sideBySide = localStorage.getItem('sideBySide')
        if (sideBySide) {
            setSideBySide(sideBySide === 'true')
        }
    }, [])

    return (
        ready && (
            <div className="@container w-full h-full flex flex-col">
                <HeaderBar showHome showBack showForward showSearch />
                <div data-scheme="secondary" className="flex flex-grow border-t border-primary min-h-0">
                    <aside
                        data-scheme="secondary"
                        className="w-64 bg-primary border-r border-primary h-full p-2 flex-shrink-0"
                    >
                        <Menu />
                    </aside>
                    <main data-scheme="primary" className="flex-1 bg-primary">
                        <div
                            ref={containerRef}
                            className={`flex flex-row h-full ${sideBySide ? 'flex-row' : 'flex-col'}`}
                        >
                            <div className={`flex-1 min-h-0 ${sideBySide ? 'w-0' : 'w-full'}`}>
                                <ScrollArea className="h-full">
                                    <div className="flex items-center px-3.5 py-2 border-b border-primary font-medium bg-secondary text-sm bg-accent-2 sticky top-0">
                                        <div className="flex-1">Subject</div>
                                        <div className="w-24 text-center">Replies</div>
                                        <div className="w-36 text-center">Last updated</div>
                                        <div className="w-32 text-center">Latest activity</div>
                                    </div>
                                    <div className="px-2 py-1">
                                        {questions.data?.map((question) => {
                                            const {
                                                attributes: {
                                                    subject,
                                                    numReplies,
                                                    activeAt,
                                                    replies,
                                                    profile,
                                                    permalink,
                                                },
                                            } = question
                                            const latestAuthor =
                                                replies?.data?.[replies.data.length - 1]?.attributes?.profile || profile
                                            const active = `/questions/${permalink}` === pathname
                                            return (
                                                <span key={question.id} ref={lastQuestionRef}>
                                                    <OSButton
                                                        asLink
                                                        to={`/questions/${permalink}`}
                                                        variant="ghost"
                                                        align="left"
                                                        width="full"
                                                        key={question.id}
                                                        className={`!text-inherit font-normal ${
                                                            active ? 'bg-accent' : ''
                                                        }`}
                                                        onClick={() => {
                                                            if (!containerRef.current) return
                                                            if (bottomHeight <= 57) {
                                                                setBottomHeight(
                                                                    containerRef.current.getBoundingClientRect()
                                                                        .height * 0.8
                                                                )
                                                            }
                                                        }}
                                                    >
                                                        <div className="flex-1 font-medium">{subject}</div>
                                                        <div className="w-24 text-center">{numReplies}</div>
                                                        <div className="w-36 text-center">
                                                            {dayjs(activeAt).fromNow()}
                                                        </div>
                                                        <div className="w-32 text-center">
                                                            {latestAuthor?.data.attributes.firstName}
                                                        </div>
                                                    </OSButton>
                                                </span>
                                            )
                                        })}
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
                            {permalink && (
                                <div
                                    ref={bottomContainerRef}
                                    className={`flex-none relative min-h-0 min-w-[600px] ${
                                        !isDragging ? 'transition-all duration-200 ease-out' : ''
                                    } ${sideBySide ? 'border-l border-border' : ''}`}
                                    style={{
                                        height: sideBySide ? '100%' : bottomHeight,
                                        width: sideBySide ? sideWidth : '100%',
                                    }}
                                >
                                    {sideBySide ? (
                                        <motion.div
                                            data-scheme="tertiary"
                                            className="w-1.5 cursor-ew-resize top-0 left-0 !transform-none absolute z-20 h-full hover:bg-accent active:bg-accent"
                                            drag="x"
                                            dragMomentum={false}
                                            dragConstraints={{ left: 0, right: 0 }}
                                            onDragStart={() => setIsDragging(true)}
                                            onDragEnd={() => setIsDragging(false)}
                                            onDrag={(_event, info) => {
                                                if (!containerRef.current) return
                                                const containerWidth =
                                                    containerRef.current.getBoundingClientRect().width
                                                const newSideWidth = Math.min(
                                                    Math.max(sideWidth - info.delta.x, 300),
                                                    containerWidth
                                                )
                                                setSideWidth(newSideWidth)
                                            }}
                                            onDoubleClick={() => {
                                                if (!containerRef.current) return
                                                const containerWidth =
                                                    containerRef.current.getBoundingClientRect().width
                                                setSideWidth(
                                                    sideWidth <= containerWidth / 3
                                                        ? containerWidth
                                                        : containerWidth / 3
                                                )
                                            }}
                                        />
                                    ) : (
                                        <motion.div
                                            data-scheme="tertiary"
                                            className="h-1.5 cursor-ns-resize top-0 left-0 !transform-none absolute z-20 w-full hover:bg-accent active:bg-accent"
                                            drag="y"
                                            dragMomentum={false}
                                            dragConstraints={{ top: 0, bottom: 0 }}
                                            onDragStart={() => setIsDragging(true)}
                                            onDragEnd={() => setIsDragging(false)}
                                            onDrag={(_event, info) => {
                                                if (!containerRef.current) return
                                                const containerHeight =
                                                    containerRef.current.getBoundingClientRect().height
                                                const newBottomHeight = Math.min(
                                                    Math.max(bottomHeight - info.delta.y, 57),
                                                    containerHeight
                                                )
                                                setBottomHeight(newBottomHeight)
                                            }}
                                            onDoubleClick={() => {
                                                if (!containerRef.current) return
                                                const containerHeight =
                                                    containerRef.current.getBoundingClientRect().height
                                                setBottomHeight(
                                                    bottomHeight <= containerHeight / 1.5
                                                        ? containerHeight
                                                        : containerHeight / 1.5
                                                )
                                            }}
                                        />
                                    )}
                                    <ScrollArea className="h-full">
                                        <div className="bg-accent border-y border-border px-4 py-2 flex gap-2 items-center sticky top-0 z-10">
                                            <OSButton
                                                variant="secondary"
                                                size="sm"
                                                icon={<IconCornerDownRight className="scale-x-[-1]" />}
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
                                                <div>
                                                    <Tooltip
                                                        content={`${
                                                            sideBySide
                                                                ? 'Switch to stacked view'
                                                                : 'Switch to side-by-side view'
                                                        }`}
                                                    >
                                                        <span>
                                                            <OSButton
                                                                active={!sideBySide}
                                                                variant="ghost"
                                                                size="sm"
                                                                icon={<IconBottomPanel />}
                                                                onClick={() => handleSideBySide(false)}
                                                            />
                                                        </span>
                                                    </Tooltip>
                                                    <Tooltip content={`Side-by-side view`}>
                                                        <span>
                                                            <OSButton
                                                                active={sideBySide}
                                                                className={`${
                                                                    sideBySide
                                                                        ? '!skin-classic:bg-red-500 !skin-modern:bg-red-500'
                                                                        : ''
                                                                }`}
                                                                variant="ghost"
                                                                size="sm"
                                                                icon={<IconSidePanel />}
                                                                onClick={() => handleSideBySide(true)}
                                                            />
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <Question
                                                id={permalink}
                                                onQuestionReady={(question) => setQuestion(question)}
                                                subscribeButton={false}
                                            />
                                        </div>
                                    </ScrollArea>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        )
    )
}
