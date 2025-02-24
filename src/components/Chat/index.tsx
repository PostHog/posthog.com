import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import InkeepEmbeddedChat from './Inkeep'
import { useChat } from 'hooks/useChat'
import { IconChevronDown, IconRewind, IconX } from '@posthog/icons'
import usePostHog from 'hooks/usePostHog'
import { defaultQuickQuestions } from 'hooks/useInkeepSettings'
import { groupBy } from 'lodash'
import dayjs from 'dayjs'

const ConversationHistoryButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <motion.div className="absolute top-2 right-2 z-10">
            <motion.button
                onClick={(e) => {
                    e.stopPropagation()
                    onClick()
                }}
                className="border border-b-2 border-light dark:border-dark rounded p-1.5 bg-accent dark:bg-accent-dark flex items-center space-x-1 click overflow-hidden group h-[28px]"
                whileHover={{ width: 'auto' }}
                initial={{ width: '28px' }}
            >
                <IconRewind className="size-3.5 opacity-80 flex-shrink-0" />
                <span className="text-xs whitespace-nowrap group-hover:opacity-100 opacity-0 transition-opacity font-semibold">
                    Conversation history
                </span>
            </motion.button>
        </motion.div>
    )
}

export default function Chat(): JSX.Element | null {
    const posthog = usePostHog()
    const {
        chatOpen,
        closeChat,
        chatting,
        setQuickQuestions,
        conversationHistory,
        renderChat,
        resetConversationHistory,
    } = useChat()
    const [height, setHeight] = useState<string | number>('100%')
    const [showDisclaimer, setShowDisclaimer] = useState(false)
    const [historyOpen, setHistoryOpen] = useState(false)
    const chatRef = useRef<HTMLDivElement>(null)

    const handleAnimationComplete = () => {
        if (!chatOpen) {
            setQuickQuestions(defaultQuickQuestions)
        }
    }

    const handleHideDisclaimer = () => {
        setShowDisclaimer(false)
        localStorage.setItem('showDisclaimer', 'false')
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
                closeChat()
            }
        }

        if (chatOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [chatOpen])

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && chatOpen) {
                closeChat()
            }
        }

        document.addEventListener('keydown', handleEscKey)
        return () => document.removeEventListener('keydown', handleEscKey)
    }, [chatOpen])

    useEffect(() => {
        const mobileNav = document?.getElementById('mobile-nav')
        const height = mobileNav?.clientHeight
        setHeight(`calc(100% - ${height ?? 0}px)`)
    }, [chatOpen])

    useEffect(() => {
        if (localStorage.getItem('showDisclaimer') !== 'false') {
            setShowDisclaimer(true)
        }
    }, [])

    return (
        <AnimatePresence>
            {chatting ? (
                <motion.div
                    ref={chatRef}
                    initial={{ translateX: '110%' }}
                    animate={{ translateX: chatOpen ? 0 : '110%', transition: { type: 'tween' } }}
                    className="fixed bottom-0 right-0 h-full bg-white dark:bg-dark z-[999999] border-l border-border dark:border-dark w-[350px] sm:w-[400px]"
                    onAnimationComplete={handleAnimationComplete}
                    onClick={() => setHistoryOpen(false)}
                >
                    <button
                        onClick={() => {
                            closeChat()
                            posthog?.capture('Closed MaxAI chat')
                        }}
                        className={`absolute left-0 -translate-x-full z-10 rounded-tl rounded-bl py-1 border-l border-t border-b border-border dark:border-dark group transition-colors bg-white dark:bg-[#1c1c1c] pr-0.5 top-[35px]`}
                    >
                        <IconChevronDown className="size-8 opacity-60 group-hover:opacity-100 transition-opacity -rotate-90 relative left-1" />
                    </button>
                    <div style={{ height }}>
                        <AnimatePresence>
                            {showDisclaimer && (
                                <motion.div
                                    initial={{ opacity: 0, translateY: '-100%' }}
                                    animate={{ opacity: 1, translateY: 0, transition: { duration: 0.2 } }}
                                    exit={{ opacity: 0, translateY: '-100%', transition: { duration: 0.2 } }}
                                    className="absolute top-0 left-0 w-full z-10"
                                >
                                    <div className="m-2 p-2 flex items-center justify-between bg-[#feedd5] dark:bg-dark border border-light dark:border-dark rounded overflow-hidden flex-shrink-0">
                                        <p className="m-0 pl-4 text-sm opacity-70 flex-1">
                                            Use{' '}
                                            <kbd
                                                className={`box-content p-[5px] border border-b-2 border-border dark:border-dark rounded-[3px] inline-flex text-black/35 dark:text-white/40 text-code text-xs py-0 bg-white dark:bg-accent-dark`}
                                            >
                                                /
                                            </kbd>{' '}
                                            to search PostHog.com
                                        </p>
                                        <button className="" onClick={handleHideDisclaimer}>
                                            <IconX className="size-4 opacity-60 hover:opacity-100 transition-opacity" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {conversationHistory?.length > 0 && (
                            <ConversationHistoryButton onClick={() => setHistoryOpen(!historyOpen)} />
                        )}
                        <AnimatePresence>
                            {conversationHistory?.length > 0 && historyOpen && (
                                <motion.div
                                    initial={{ opacity: 0, translateY: '-100%' }}
                                    animate={{ opacity: 1, translateY: 0, transition: { duration: 0.2 } }}
                                    exit={{ opacity: 0, translateY: '-100%', transition: { duration: 0.2 } }}
                                    className="text-sm absolute top-0 left-0 w-full z-10 p-3 pb-2 bg-accent dark:bg-accent-dark border-b border-light dark:border-dark"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                    }}
                                >
                                    <div className="mb-3 flex justify-between items-center pb-2 border-b border-light dark:border-dark">
                                        <h3 className="text-sm m-0 leading-none">Conversation history</h3>
                                        <button
                                            className="opacity-80 hover:opacity-100 transition-opacity"
                                            onClick={() => setHistoryOpen(false)}
                                        >
                                            <IconX className="size-4" />
                                        </button>
                                    </div>
                                    <ul className="list-none m-0 p-0 space-y-3 max-h-[200px] overflow-y-auto">
                                        {Object.entries(
                                            groupBy(conversationHistory, (conversation) =>
                                                dayjs(conversation.date).format('MMM D, YYYY')
                                            )
                                        ).map(([date, conversations]) => {
                                            return (
                                                <li key={date}>
                                                    <h4 className="text-xs text-black/50 dark:text-white/50 m-0 leading-none mb-2">
                                                        {date}
                                                    </h4>
                                                    <ul className="list-none m-0 p-0 space-y-1">
                                                        {conversations.map((conversation) => (
                                                            <button
                                                                key={conversation.id}
                                                                onClick={() => {
                                                                    renderChat('#embedded-chat-target', conversation.id)
                                                                    setHistoryOpen(false)
                                                                }}
                                                                className="bg-white dark:bg-dark font-semibold w-full text-left border border-black/20 dark:border-white/20 hover:border-black/30 dark:hover:border-white/30 transition-colors p-1 px-2 rounded text-sm"
                                                            >
                                                                {conversation.question}
                                                            </button>
                                                        ))}
                                                    </ul>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <div className="mt-2 flex justify-end">
                                        <button
                                            onClick={() => {
                                                setHistoryOpen(false)
                                                resetConversationHistory()
                                            }}
                                            className="text-xs text-red dark:text-yellow font-bold"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <InkeepEmbeddedChat />
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}
