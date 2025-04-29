import React, { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react'
import useInkeepSettings, { defaultQuickQuestions } from './useInkeepSettings'
import Chat from 'components/Chat'

interface ChatContextType {
    chatOpen: boolean
    closeChat: () => void
    openChat: ({ context }: { context?: { type: 'page'; value: string } }) => void
    chatting: boolean
    hasUnread: boolean
    setHasUnread: (unread: boolean) => void
    loading: boolean
    renderChat: () => void
    setQuickQuestions: (questions: string[]) => void
    conversationHistory: { id: string; question: number; date: string }[]
    resetConversationHistory: () => void
    EmbeddedChat: any
    aiChatSettings: any
    baseSettings: any
    context: { type: 'page'; value: { path: string; label: string } }[]
    setContext: (context: { type: 'page'; value: { path: string; label: string } }[]) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }): JSX.Element {
    const { baseSettings, aiChatSettings, setBaseSettings, setAiChatSettings } = useInkeepSettings()
    const [chatting, setChatting] = useState(false)
    const [chatOpen, setChatOpen] = useState(false)
    const [hasUnread, setHasUnread] = useState(false)
    const [loading, setLoading] = useState(true)
    const [hasFirstResponse, setHasFirstResponse] = useState(false)
    const [quickQuestions, setQuickQuestions] = useState(defaultQuickQuestions)
    const [conversationHistory, setConversationHistory] = useState<{ id: string; question: number; date: string }[]>([])
    const [context, setContext] = useState<{ type: 'page'; value: { path: string; label: string } }[]>([])
    const [EmbeddedChat, setEmbeddedChat] = useState<any>()

    const logEventCallback = useCallback(
        (event: any) => {
            if (event?.eventName === 'assistant_message_received') {
                if (!hasFirstResponse) {
                    setHasFirstResponse(true)
                    try {
                        const newConversation = {
                            id: event.properties.conversation.id,
                            question: event.properties.conversation.messages[0].content,
                            date: new Date().toISOString(),
                        }
                        const conversations = JSON.parse(localStorage.getItem('conversations') || '[]')
                        conversations.push(newConversation)
                        localStorage.setItem('conversations', JSON.stringify(conversations))
                    } catch (error) {
                        console.error('Error adding conversation to history:', error)
                    }
                }
                if (!chatOpen) {
                    setHasUnread(true)
                }
            }
        },
        [hasFirstResponse, chatOpen]
    )

    const openChat = ({
        context: newContext,
    }: { context?: { type: 'page'; value: { path: string; label: string } } } = {}) => {
        if (newContext && !context.some((c) => c.value.path === newContext.value.path)) {
            setContext((prev) => [...prev, newContext])
        }

        setChatOpen(true)
    }

    const closeChat = () => {
        setChatOpen(false)
    }

    const renderChat = async () => {
        try {
            const { InkeepEmbeddedChat } = await import('@inkeep/cxkit-react')
            setEmbeddedChat(() => InkeepEmbeddedChat)
        } catch (error) {
            console.error('Failed to load EmbeddedChat:', error)
        }
    }

    const resetConversationHistory = () => {
        setConversationHistory([])
        localStorage.removeItem('conversations')
    }

    useEffect(() => {
        // Open chat on ?chat=open
        const params = new URLSearchParams(window.location.search)
        if (params.get('chat') === 'open') {
            openChat()
        }
        const conversations = JSON.parse(localStorage.getItem('conversations') || '[]')
        setConversationHistory(conversations)
    }, [])

    useEffect(() => {
        setAiChatSettings({
            ...aiChatSettings,
            exampleQuestions: quickQuestions,
        })
    }, [quickQuestions])

    useEffect(() => {
        // Add community suggestion to chat
        if (hasFirstResponse) {
            const shadowRoot = document.querySelector('#embedded-chat-target>div')?.shadowRoot
            if (shadowRoot) {
                const chatBubbleActions = shadowRoot.querySelector('.ikp-ai-chat-message-sources')
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
            // Don't trigger if user is typing in an input, textarea (including shadow DOM)
            if (
                event.target instanceof HTMLElement &&
                (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.shadowRoot)
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

    useEffect(() => {
        setBaseSettings({
            ...baseSettings,
            onEvent: logEventCallback,
        })
    }, [])

    useEffect(() => {
        const prompts = context.map((c) =>
            c.type === 'page' ? `The user is currently viewing the page ${c.value.label} at ${c.value.path}` : ``
        )
        setAiChatSettings({
            ...aiChatSettings,
            prompts,
        })
    }, [context])

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
                setQuickQuestions,
                conversationHistory,
                resetConversationHistory,
                EmbeddedChat,
                aiChatSettings,
                baseSettings,
                context,
                setContext,
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
