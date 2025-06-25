import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import InkeepEmbeddedChat from './Inkeep'
import { useChat } from 'hooks/useChat'
import { IconDocument, IconRewind, IconX } from '@posthog/icons'
import usePostHog from 'hooks/usePostHog'
import { groupBy } from 'lodash'
import dayjs from 'dayjs'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'

const ConversationHistoryButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <motion.div>
            <motion.button
                onClick={(e) => {
                    e.stopPropagation()
                    onClick()
                }}
                className="border border-light-7 rounded p-1.5 flex items-center space-x-1 click overflow-hidden group h-[28px]"
                whileHover={{ width: 'auto' }}
                initial={{ width: '28px' }}
            >
                <IconRewind className="size-3.5 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs whitespace-nowrap group-hover:opacity-100 opacity-0 transition-opacity font-semibold">
                    Conversation history
                </span>
            </motion.button>
        </motion.div>
    )
}

const Context = () => {
    return null
}

export default function Chat(): JSX.Element | null {
    const posthog = usePostHog()
    const { conversationHistory, renderChat, resetConversationHistory, context, setContext, firstResponse } = useChat()
    const { setWindowTitle } = useApp()
    const { appWindow } = useWindow()
    const [showDisclaimer, setShowDisclaimer] = useState(false)
    const [historyOpen, setHistoryOpen] = useState(false)

    const handleHideDisclaimer = () => {
        setShowDisclaimer(false)
        localStorage.setItem('showDisclaimer', 'false')
    }

    useEffect(() => {
        if (localStorage.getItem('showDisclaimer') !== 'false') {
            setShowDisclaimer(true)
        }
    }, [])

    useEffect(() => {
        if (firstResponse && appWindow) {
            setWindowTitle(appWindow, firstResponse)
        }
    }, [firstResponse])

    return (
        <div className="h-full relative" onClick={() => setHistoryOpen(false)}>
            <div data-scheme="secondary">
                <div className="flex items-center space-x-1 bg-primary p-1 border-y border-light-7 justify-end">
                    {conversationHistory?.length > 0 && (
                        <ConversationHistoryButton onClick={() => setHistoryOpen(!historyOpen)} />
                    )}
                </div>
                {context?.length > 0 && (
                    <ul className="m-0 list-none p-2 flex space-x-1 overflow-auto snap-x snap-mandatory absolute top-[40px] left-0 w-full z-10">
                        {context.map((c) => {
                            const {
                                type,
                                value: { label, path },
                            } = c
                            return (
                                <li
                                    key={path}
                                    className={`font-semibold p-1.5 border border-light-7 rounded flex justify-between bg-primary ${
                                        context.length === 1 ? 'w-full' : ' w-[80%]'
                                    } flex-shrink-0 transition-all`}
                                >
                                    <div>
                                        <p className="text-xs opacity-70 m-0">Context</p>
                                        <span className="flex items-center space-x-1">
                                            <span>{type === 'page' ? <IconDocument className="size-4" /> : null}</span>
                                            <p className="m-0 text-sm line-clamp-1">{label || path}</p>
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setContext(context.filter((c) => c.value.path !== path))
                                        }}
                                        className="opacity-60 hover:opacity-100 transition-opacity pr-1"
                                    >
                                        <IconX className="size-4" />
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>

            <AnimatePresence>
                {showDisclaimer && (
                    <motion.div
                        initial={{ opacity: 0, translateY: '-100%' }}
                        animate={{ opacity: 1, translateY: 0, transition: { duration: 0.2 } }}
                        exit={{ opacity: 0, translateY: '-100%', transition: { duration: 0.2 } }}
                        className="absolute top-0 left-0 w-full z-10"
                    >
                        <div className="m-2 p-2 flex items-center justify-between bg-[#feedd5] dark:bg-dark border border-primary rounded overflow-hidden flex-shrink-0">
                            <p className="m-0 pl-4 text-sm opacity-70 flex-1">
                                Use{' '}
                                <kbd
                                    className={`box-content p-[5px] border border-b-2 border-input rounded-[3px] inline-flex text-black/35 dark:text-white/40 text-code text-xs py-0 bg-white dark:bg-accent-dark`}
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
            <AnimatePresence>
                {conversationHistory?.length > 0 && historyOpen && (
                    <motion.div
                        initial={{ opacity: 0, translateY: '-100%' }}
                        animate={{ opacity: 1, translateY: 0, transition: { duration: 0.2 } }}
                        exit={{ opacity: 0, translateY: '-100%', transition: { duration: 0.2 } }}
                        data-scheme="secondary"
                        className="text-sm absolute top-0 left-0 w-full z-10 p-3 pb-2 bg-primary border-y border-primary"
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <div className="mb-3 flex justify-between items-center">
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
                                                    className="bg-light dark:bg-dark font-semibold w-full text-left border border-black/20 dark:border-white/20 hover:border-black/30 dark:hover:border-white/30 transition-colors p-1 px-2 rounded text-sm"
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
            <Context />
            <InkeepEmbeddedChat />
        </div>
    )
}
