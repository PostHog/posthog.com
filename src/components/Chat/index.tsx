import React, { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import InkeepEmbeddedChat from './Inkeep'
import { useChat } from 'hooks/useChat'
import { IconX } from '@posthog/icons'

export default function Chat(): JSX.Element | null {
    const { chatOpen, setChatOpen, chatting } = useChat()
    const chatRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
                setChatOpen(false)
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
                setChatOpen(false)
            }
        }

        document.addEventListener('keydown', handleEscKey)
        return () => document.removeEventListener('keydown', handleEscKey)
    }, [chatOpen])

    return (
        <AnimatePresence>
            {chatting ? (
                <motion.div
                    ref={chatRef}
                    initial={{ translateX: '110%' }}
                    animate={{ translateX: chatOpen ? 0 : '110%', transition: { type: 'tween' } }}
                    className="fixed bottom-0 right-0 h-full bg-white dark:bg-dark z-[999999] border-l border-border dark:border-dark w-[400px]"
                >
                    <button
                        onClick={() => {
                            setChatOpen(!chatOpen)
                        }}
                        className={`absolute top-[37px] left-0 -translate-x-full z-10 rounded-tl-full rounded-bl-full border-l border-t border-b p-2 border-border dark:border-dark group transition-colors bg-white dark:bg-[#1c1c1c] pr-0`}
                    >
                        <IconX className="size-5 opacity-60 group-hover:opacity-100" />
                    </button>
                    <div className="flex flex-col h-full">
                        <div className="px-6 py-2 flex items-center justify-center bg-light dark:bg-dark  border-b border-border dark:border-dark">
                            <p className="m-0 text-sm opacity-70">
                                Use{' '}
                                <kbd
                                    className={`box-content p-[5px] border border-b-2 border-border dark:border-dark rounded-[3px] inline-flex text-black/35 dark:text-white/40 text-code text-xs py-0`}
                                >
                                    /
                                </kbd>{' '}
                                to search specific sections of PostHog.com
                            </p>
                        </div>
                        <div className="flex-grow h-full">
                            <InkeepEmbeddedChat />
                        </div>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}
