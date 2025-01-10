import React, { createContext, useContext, ReactNode, useState, useEffect, useRef, useCallback } from 'react'
import useInkeepSettings, { defaultQuickQuestions } from './useInkeepSettings'
import { layoutLogic } from 'logic/layoutLogic'
import { useValues } from 'kea'
import { AIChatFunctions } from '@inkeep/uikit'
import Chat from 'components/Chat'

interface ChatContextType {
    chatOpen: boolean
    closeChat: () => void
    openChat: () => void
    chatting: boolean
    hasUnread: boolean
    setHasUnread: (unread: boolean) => void
    loading: boolean
    renderChat: (target: string) => void
    inkeep: AIChatFunctions | null
    setQuickQuestions: (questions: string[]) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }): JSX.Element {
    const { websiteTheme } = useValues(layoutLogic)
    const { baseSettings, aiChatSettings } = useInkeepSettings()
    const embeddedChatRef = useRef<AIChatFunctions | null>(null)
    const [chatting, setChatting] = useState(false)
    const [chatOpen, setChatOpen] = useState(false)
    const [hasUnread, setHasUnread] = useState(false)
    const [loading, setLoading] = useState(true)
    const [hasFirstResponse, setHasFirstResponse] = useState(false)
    const [quickQuestions, setQuickQuestions] = useState(defaultQuickQuestions)

    const logEventCallback = useCallback(
        (event: any) => {
            if (event?.eventName === 'chat_message_bot_response_received') {
                if (!hasFirstResponse) {
                    setHasFirstResponse(true)
                }
                if (!chatOpen) {
                    setHasUnread(true)
                }
            }
        },
        [hasFirstResponse, chatOpen]
    )

    const openChat = () => {
        setChatOpen(true)
    }

    const closeChat = () => {
        setChatOpen(false)
    }

    const renderChat = (target: string) => {
        // Render chat (usually after the target element is mounted)
        import('@inkeep/uikit-js').then((inkeepJS) => {
            const inkeep = inkeepJS.Inkeep(baseSettings)
            embeddedChatRef.current = inkeep.embed({
                componentType: 'EmbeddedChat',
                targetElement: target,
                properties: {
                    baseSettings: {
                        ...baseSettings,
                        logEventCallback,
                    },
                    aiChatSettings: {
                        ...aiChatSettings,
                        quickQuestions,
                    },
                },
            })
            setLoading(false)
        })
    }

    useEffect(() => {
        // Open chat on ?chat=open
        const params = new URLSearchParams(window.location.search)
        if (params.get('chat') === 'open') {
            openChat()
        }
    }, [])

    useEffect(() => {
        // Update quick questions
        if (quickQuestions.length > 0) {
            if (embeddedChatRef.current) {
                // Remove old quick questions first because they're not removed automatically
                embeddedChatRef.current.render({
                    aiChatSettings: {
                        quickQuestions: false,
                    },
                })
                // Add new quick questions
                embeddedChatRef.current.render({
                    aiChatSettings: {
                        quickQuestions,
                    },
                })
            }
        }
    }, [quickQuestions])

    useEffect(() => {
        // Add community suggestion to chat
        if (hasFirstResponse && embeddedChatRef.current) {
            const shadowRoot = document.querySelector('#embedded-chat-target>div')?.shadowRoot
            if (shadowRoot) {
                const chatBubbleActions = shadowRoot.querySelector('.ikp-chat-bubble__message-actions')
                if (chatBubbleActions) {
                    const el = document.createElement('p')
                    el.classList.add('community-suggestion')
                    el.innerHTML = `<strong style="display: block; font-size: .933rem;">Not the answer you were looking for?</strong> Try <a target="_blank" style="text-decoration: underline;" href="/questions"><strong>posting a community question</strong></a> and humans may respond!`
                    chatBubbleActions.insertAdjacentElement('beforebegin', el)
                }
            }
        }
    }, [hasFirstResponse])

    useEffect(() => {
        // Update dark/light theme
        if (embeddedChatRef.current) {
            embeddedChatRef.current.render({
                baseSettings: {
                    colorMode: {
                        forcedColorMode: websiteTheme === 'dark' ? 'dark' : 'light',
                    },
                },
            })
        }
    }, [websiteTheme])

    useEffect(() => {
        // Update event callback (sets unread messages and detects first response)
        if (embeddedChatRef.current) {
            embeddedChatRef.current.render({
                baseSettings: {
                    logEventCallback,
                },
            })
        }
        // Reset unread messages when chat is opened
        if (chatOpen) {
            setHasUnread(false)
        }
        // Start chatting when chat is opened (keeps chat from rendering more than once)
        if (chatOpen && !chatting) {
            setChatting(true)
        }
    }, [chatOpen, hasFirstResponse])

    useEffect(() => {
        // Open chat on ? key press
        const handleKeyPress = (event: KeyboardEvent) => {
            // Don't trigger if user is typing in an input or textarea
            if (
                event.target instanceof HTMLElement &&
                (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA')
            ) {
                return
            }

            if (!chatOpen && event.key === '?') {
                openChat()
                event.preventDefault()
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [chatOpen])

    return (
        <ChatContext.Provider
            value={{
                chatOpen,
                closeChat,
                openChat,
                chatting,
                hasUnread,
                setHasUnread,
                loading,
                renderChat,
                inkeep: embeddedChatRef.current,
                setQuickQuestions,
            }}
        >
            {children}
            <Chat />
        </ChatContext.Provider>
    )
}

export function useChat(): ChatContextType {
    const context = useContext(ChatContext)
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider')
    }
    return context
}
