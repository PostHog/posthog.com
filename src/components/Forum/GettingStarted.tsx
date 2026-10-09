import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconCheck, IconChevronRight, IconX } from '@posthog/icons'
import { HedgehogHeart } from '@posthog/brand/hoggies'
import { navigate } from 'gatsby'
import OSButton from 'components/OSButton'
import usePostHog from 'hooks/usePostHog'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../context/App'
import { fireConfettiInCanvas } from 'components/PlatformInstall/confetti'
import { useForumProgress, useForumTopics } from './hooks'

type Task = {
    key: 'introduced' | 'replied' | 'shared' | 'subscribed'
    title: string
    description: string
    topic: string
    // New post: open the composer in the topic. Otherwise open the topic's feed.
    newPost?: boolean
}

const tasks: Task[] = [
    {
        key: 'introduced',
        title: 'Introduce yourself',
        description: 'Say hello, and tell us what you are building.',
        topic: 'introductions',
        newPost: true,
    },
    {
        key: 'replied',
        title: 'Add your two cents',
        description: 'Find a post that interests you and reply to it.',
        topic: 'thinking-out-loud',
    },
    {
        key: 'shared',
        title: 'Share what you are learning',
        description: 'Tell us about something that you shipped, and what you learned.',
        topic: 'shipped-and-learned',
        newPost: true,
    },
    {
        key: 'subscribed',
        title: 'Subscribe to a topic',
        description: "Press the bell beside a topic's name to get a daily digest of its new posts.",
        topic: 'introductions',
    },
]

const MEMBER_DISMISSED_KEY = 'forum-getting-started-dismissed'
const MEMBER_GREETED_KEY = 'forum-getting-started-greeted'
const VISITOR_DISMISSED_KEY = 'forum-welcome-dismissed'
const HOG_ARRIVAL_MS = 700
const CONFETTI_VELOCITY_SCALE = 1.8
const BUBBLE_SHADOW = 'shadow-[0_16px_48px_-8px_rgba(0,0,0,0.35),0_4px_12px_-4px_rgba(0,0,0,0.2)]'
const BUBBLE = `bg-primary border border-input rounded-lg rounded-br-sm ${BUBBLE_SHADOW}`

const MESSAGE_REVEAL_MS = [300, 1000]

const messageArrival = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    transition: { type: 'spring', stiffness: 380, damping: 34 },
} as const

const useStoredFlag = (key: string) => {
    const [flag, setFlag] = useState<boolean>()

    useEffect(() => {
        setFlag(localStorage.getItem(key) === '1')
    }, [key])

    const set = () => {
        localStorage.setItem(key, '1')
        setFlag(true)
    }

    return [flag, set] as const
}

type HogChatProps = {
    visible: boolean
    greeting: ReactNode
    celebrateOnceKey?: string
    children: ReactNode
}

function HogChat({ visible, greeting, celebrateOnceKey, children }: HogChatProps) {
    const [chatOpen, setChatOpen] = useState(true)
    const [celebrating, setCelebrating] = useState(false)
    const [revealedCount, setRevealedCount] = useState(0)
    const hogRef = useRef<HTMLButtonElement>(null)
    const confettiCanvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!visible || !celebrateOnceKey || localStorage.getItem(celebrateOnceKey) === '1') return
        localStorage.setItem(celebrateOnceKey, '1')
        setCelebrating(true)
    }, [visible, celebrateOnceKey])

    useEffect(() => {
        if (!celebrating) return
        const timer = setTimeout(
            () =>
                fireConfettiInCanvas(hogRef.current, confettiCanvasRef.current, CONFETTI_VELOCITY_SCALE).then(() =>
                    setCelebrating(false)
                ),
            HOG_ARRIVAL_MS
        )
        return () => clearTimeout(timer)
    }, [celebrating])

    useEffect(() => {
        setRevealedCount(0)
        if (!visible || !chatOpen) return
        const timers = MESSAGE_REVEAL_MS.map((delay, index) => setTimeout(() => setRevealedCount(index + 1), delay))
        return () => timers.forEach(clearTimeout)
    }, [visible, chatOpen])

    if (!visible) return null

    return (
        <>
            {celebrating && (
                <canvas ref={confettiCanvasRef} className="absolute inset-0 size-full z-10 pointer-events-none" />
            )}
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-end pointer-events-none">
                <AnimatePresence>
                    {chatOpen && (
                        <motion.div
                            key="chat"
                            exit={{ opacity: 0, y: 16, scale: 0.96 }}
                            style={{ transformOrigin: 'bottom right' }}
                            className="pointer-events-auto w-[calc(100%-1.5rem)] max-w-80 mr-3 @xl:mr-5 flex flex-col items-end text-sm"
                        >
                            {revealedCount >= 1 && (
                                <motion.div {...messageArrival}>
                                    <div className="pt-1.5">
                                        <div className={`flex items-center gap-2 ${BUBBLE} pl-3 pr-1.5 py-1.5`}>
                                            <p className="m-0 font-semibold text-primary">{greeting}</p>
                                            <button
                                                type="button"
                                                onClick={() => setChatOpen(false)}
                                                aria-label="Hide for now"
                                                className="shrink-0 p-0.5 rounded text-muted hover:text-primary hover:bg-accent"
                                            >
                                                <IconX className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            {revealedCount >= 2 && (
                                <motion.div {...messageArrival} className="w-full">
                                    <div className="pt-1.5">
                                        <div className={`${BUBBLE} overflow-hidden`}>{children}</div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.button
                    ref={hogRef}
                    type="button"
                    onClick={() => setChatOpen(!chatOpen)}
                    aria-label={chatOpen ? 'Hide the forum hedgehog' : 'Show the forum hedgehog'}
                    aria-expanded={chatOpen}
                    initial={{ y: '100%' }}
                    animate={{ y: chatOpen ? '15%' : '55%' }}
                    whileHover={{ y: chatOpen ? '10%' : '40%' }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="pointer-events-auto -mt-3 mr-1 @xl:mr-3 w-28 @xl:w-36"
                >
                    <HedgehogHeart title="" className="w-full h-auto -scale-x-100" />
                </motion.button>
            </div>
        </>
    )
}

function ChatFooterButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full border-t border-primary px-3 py-1.5 text-left text-xs text-secondary hover:text-primary hover:bg-accent"
        >
            {children}
        </button>
    )
}

function MemberChecklist({ visible }: { visible: boolean }) {
    const { user } = useUser()
    const posthog = usePostHog()
    const [dismissed, dismiss] = useStoredFlag(MEMBER_DISMISSED_KEY)
    const { progress, isLoading } = useForumProgress(dismissed === false)
    const { getTopic } = useForumTopics()

    const available = tasks.filter((task) => getTopic(task.topic))
    const doneCount = available.filter((task) => progress?.[task.key]).length

    const start = (task: Task) => {
        const topic = getTopic(task.topic)
        if (!topic) return
        posthog?.capture('forum getting started task clicked', { task: task.key })
        if (task.newPost) navigate('/forum/new', { state: { topicId: topic.id } })
        else navigate(`/forum/t/${topic.attributes.slug}`)
    }

    const dismissForever = () => {
        posthog?.capture('forum getting started dismissed', { done: doneCount })
        dismiss()
    }

    const ready = !isLoading && !!progress && dismissed === false && doneCount < available.length

    return (
        <HogChat
            visible={visible && ready}
            greeting={`Welcome to the forum, ${user?.profile?.firstName}!`}
            celebrateOnceKey={MEMBER_GREETED_KEY}
        >
            <p className="m-0 px-3 py-2 text-primary">
                Here are a few things you can do to get going ({doneCount} of {available.length} done):
            </p>
            <ul className="list-none m-0 p-0">
                {available.map((task) => {
                    const done = progress?.[task.key]
                    return (
                        <li key={task.key} className="border-t border-primary">
                            <button
                                type="button"
                                disabled={done}
                                onClick={() => start(task)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-left enabled:hover:bg-accent disabled:cursor-default"
                            >
                                <span
                                    className={`shrink-0 size-5 rounded-full border flex items-center justify-center ${
                                        done ? 'bg-green border-green text-white' : 'border-primary'
                                    }`}
                                >
                                    {done && <IconCheck className="size-3.5" />}
                                </span>
                                <span className="flex-1 min-w-0">
                                    <span
                                        className={`block font-semibold ${
                                            done ? 'text-muted line-through' : 'text-primary'
                                        }`}
                                    >
                                        {task.title}
                                    </span>
                                    {!done && <span className="block text-xs text-secondary">{task.description}</span>}
                                </span>
                                {!done && <IconChevronRight className="shrink-0 size-4 text-muted" />}
                            </button>
                        </li>
                    )
                })}
            </ul>
            <ChatFooterButton onClick={dismissForever}>Skip ahead, don't show again</ChatFooterButton>
        </HogChat>
    )
}

function VisitorWelcome({ visible }: { visible: boolean }) {
    const posthog = usePostHog()
    const { openRegister, openSignIn } = useApp()
    const [dismissed, dismiss] = useStoredFlag(VISITOR_DISMISSED_KEY)

    const join = () => {
        posthog?.capture('forum welcome join clicked')
        openRegister()
    }

    const signIn = () => {
        posthog?.capture('forum welcome sign in clicked')
        openSignIn()
    }

    const lurk = () => {
        posthog?.capture('forum welcome dismissed')
        dismiss()
    }

    return (
        <HogChat visible={visible && dismissed === false} greeting="Welcome to the forum. Pull up a log.">
            <p className="m-0 px-3 py-2 text-primary">
                Chat about how you're using PostHog, industry news, or whatever else is on your mind.
            </p>
            <div className="flex gap-2 px-3 pb-3">
                <OSButton variant="primary" size="md" onClick={join}>
                    Join the forum
                </OSButton>
                <OSButton size="md" onClick={signIn}>
                    Sign in
                </OSButton>
            </div>
            <ChatFooterButton onClick={lurk}>I'm just lurking</ChatFooterButton>
        </HogChat>
    )
}

export default function GettingStarted({ visible }: { visible: boolean }): JSX.Element {
    const { user } = useUser()
    return user ? <MemberChecklist visible={visible} /> : <VisitorWelcome visible={visible} />
}
