import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import InkeepEmbeddedChat from './Inkeep'
import { useChat } from 'hooks/useChat'
import { IconChevronDown, IconX } from '@posthog/icons'
import usePostHog from 'hooks/usePostHog'
import { defaultQuickQuestions } from 'hooks/useInkeepSettings'

export default function Chat(): JSX.Element | null {
    const posthog = usePostHog()
    const { chatOpen, closeChat, chatting, setQuickQuestions } = useChat()
    const [height, setHeight] = useState<string | number>('100%')
    const [showDisclaimer, setShowDisclaimer] = useState(false)
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
                        <InkeepEmbeddedChat />
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}
