import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { IconChat, IconArrowRight } from '@posthog/icons'
import InkeepEmbeddedChat from './Inkeep'

export default function ChatWrapper({ children }: { children: React.ReactNode }): JSX.Element {
    const [chatOpen, setChatOpen] = useState(false)
    const chatRef = useRef<HTMLDivElement>(null)
    const [iconType, setIconType] = useState('chat')
    const Icon = iconType === 'chat' ? IconChat : IconArrowRight

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
        <>
            <motion.div
                ref={chatRef}
                initial={{ translateX: '100%' }}
                animate={{ translateX: chatOpen ? 0 : '100%', transition: { type: 'tween' } }}
                className="fixed bottom-0 right-0 h-full bg-white z-[999999] border-l border-border w-[400px]"
                onAnimationComplete={() => {
                    if (!chatOpen) {
                        setIconType('chat')
                    }
                }}
            >
                <motion.button
                    onClick={() => {
                        setChatOpen(!chatOpen)
                        setIconType('arrow')
                    }}
                    className={`absolute top-[7px] left-0 -translate-x-full z-10 rounded-tl-full rounded-bl-full border-l border-t border-b p-2 border-border group transition-colors bg-white ${
                        chatOpen ? 'pr-0' : 'pr-2'
                    }`}
                >
                    <Icon className="size-6 opacity-70 group-hover:opacity-100 text-primary" />
                </motion.button>
                <InkeepEmbeddedChat />
            </motion.div>
            {children}
        </>
    )
}
