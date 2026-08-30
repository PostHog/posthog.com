import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { navigate } from 'gatsby'
import useInkeepSettings, { defaultQuickQuestions } from './useInkeepSettings'
import usePostHog from './usePostHog'
import { ChatFrame } from 'components/Chat'
import { useApp } from '../context/App'

interface ChatContextType {
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
    addContext: (newContext: { type: 'page'; value: { path: string; label: string } }) => void
    firstResponse: string | null
    initialQuestion?: string
    codeSnippet?: { code: string; language: string; sourceUrl: string }
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({
    context: initialContext,
    quickQuestions: initialQuickQuestions,
    chatId,
    date,
    initialQuestion,
    codeSnippet,
}: {
    context?: { type: 'page'; value: { path: string; label: string } }[]
    quickQuestions?: string[]
    chatId?: string
    date?: string
    initialQuestion?: string
    codeSnippet?: { code: string; language: string; sourceUrl: string }
}): JSX.Element {
    const { baseSettings, aiChatSettings, setBaseSettings, setAiChatSettings } = useInkeepSettings()
    const posthog = usePostHog()
    const [hasUnread, setHasUnread] = useState(false)
    const [loading, setLoading] = useState(true)
    const [hasFirstResponse, setHasFirstResponse] = useState(false)
    const [quickQuestions, setQuickQuestions] = useState(initialQuickQuestions || defaultQuickQuestions)
    const [conversationHistory, setConversationHistory] = useState<{ id: string; question: number; date: string }[]>([])
    const [context, setContext] = useState<{ type: 'page'; value: { path: string; label: string } }[]>([])
    const [EmbeddedChat, setEmbeddedChat] = useState<any>()
    const [firstResponse, setFirstResponse] = useState<string | null>(null)
    const conversationStartedDate = useMemo(() => date || new Date().toISOString(), [])
    const removeLinkListenerRef = useRef<(() => void) | null>(null)

    const logConversation = async (event: any) => {
        const conversationId = event?.properties?.conversation?.id
        if (conversationId) {
            try {
                const newConversation = {
                    id: conversationId,
                    question: event?.properties?.conversation?.messages[0]?.content,
                    date: conversationStartedDate,
                }
                const conversations = JSON.parse(localStorage.getItem('conversations') || '[]')
                localStorage.setItem(
                    'conversations',
                    JSON.stringify([
                        ...conversations.filter((c: any) => c.date !== conversationStartedDate),
                        newConversation,
                    ])
                )
            } catch (error) {
                console.error('Error adding conversation to history:', error)
            }
        }
    }

    const logEventCallback = useCallback(
        async (event: any) => {
            if (event?.eventName === 'user_message_submitted' && !firstResponse) {
                setFirstResponse(
                    event.properties.conversation.messages.filter((m: any) => m.role === 'user')[0].content
                )
                posthog?.capture('chat question submitted', { conversation_id: event?.properties?.conversation?.id })
            }
            if (event?.eventName === 'assistant_message_received') {
                if (!hasFirstResponse) {
                    setHasFirstResponse(true)
                }
            }
            if (event?.eventName === 'assistant_answer_displayed') {
                posthog?.capture('chat answer displayed', { conversation_id: event?.properties?.conversation?.id })
                const target = document.getElementById('embedded-chat-target')
                // Attach one delegated listener on the stable container, not on the
                // Inkeep shadow root. React replaces that shadow host whenever the
                // viewport crosses the mobile breakpoint (`Container` swaps between
                // `ScrollArea` and `React.Fragment`), which would leave the old
                // handler on a detached root and, because of the ref guard below,
                // block re-attachment. `composedPath()` still reaches anchors inside
                // the shadow tree from a listener on the light-DOM container.
                if (target && !removeLinkListenerRef.current) {
                    const handleLinkClick = (e: Event) => {
                        const link = e
                            .composedPath()
                            .find((el): el is HTMLAnchorElement => el instanceof HTMLElement && el.tagName === 'A')
                        if (!link) return
                        const href = link.getAttribute('href')
                        if (!href) return
                        e.preventDefault()
                        e.stopPropagation()
                        try {
                            const url = new URL(href, window.location.origin)
                            if (url.origin === 'https://posthog.com' || href.startsWith('/')) {
                                navigate(url.pathname, { state: { newWindow: true } })
                            } else {
                                window.open(href, '_blank', 'noopener,noreferrer')
                            }
                        } catch {
                            window.open(href, '_blank', 'noopener,noreferrer')
                        }
                    }
                    target.addEventListener('click', handleLinkClick, true)
                    removeLinkListenerRef.current = () => target.removeEventListener('click', handleLinkClick, true)
                }
            }
            logConversation(event)
        },
        [hasFirstResponse, firstResponse, posthog]
    )

    const addContext = (newContext: { type: 'page'; value: { path: string; label: string } }) => {
        if (newContext && !context.some((c) => c.value.path === newContext.value.path)) {
            setContext((prev) => [...prev, newContext])
        }
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
        renderChat()
        const conversations = JSON.parse(localStorage.getItem('conversations') || '[]')
        setConversationHistory(conversations)
        return () => {
            removeLinkListenerRef.current?.()
        }
    }, [])

    useEffect(() => {
        // Add community suggestion to chat
        if (hasFirstResponse) {
            const shadowRoot = document.querySelector('#embedded-chat-target>div')?.shadowRoot
            if (shadowRoot) {
                const chatBubbleActions = shadowRoot.querySelector('.ikp-ai-chat-message-toolbar')
                if (chatBubbleActions) {
                    const el = document.createElement('p')
                    el.classList.add('community-suggestion')
                    el.innerHTML = `<strong style="display: block; font-size: .933rem;">Not the answer you were looking for?</strong> Try <a id="inkeep-community-question-link" target="_blank" style="text-decoration: underline;" href="/questions"><strong>posting a community question</strong></a> and humans may respond!`
                    chatBubbleActions.insertAdjacentElement('afterend', el)
                    const communityQuestionLink = shadowRoot.querySelector('#inkeep-community-question-link')
                    if (communityQuestionLink) {
                        communityQuestionLink.addEventListener('click', (e: Event) => {
                            e.preventDefault()
                            e.stopPropagation()
                            navigate('/questions', { state: { newWindow: true } })
                        })
                    }
                }
            }
        }
    }, [hasFirstResponse])

    useEffect(() => {
        // Reinstall when the callback identity changes so `onEvent` keeps a fresh
        // view of `firstResponse` and `hasFirstResponse` instead of the mount-time one.
        setBaseSettings((prev) => ({
            ...prev,
            onEvent: logEventCallback,
        }))
    }, [logEventCallback])

    useEffect(() => {
        const contextPrompts = context.map((c) =>
            c.type === 'page' ? `The user is currently viewing the page ${c.value.label} at ${c.value.path}` : ``
        )
        // codePrompt is now handled in Chat/index.tsx and passed through Inkeep.tsx
        // Each write merges into the latest settings, so these three effects no
        // longer clobber each other's fields on mount.
        setAiChatSettings((prev) => ({
            ...prev,
            prompts: contextPrompts,
        }))
    }, [context])

    useEffect(() => {
        setAiChatSettings((prev) => ({
            ...prev,
            exampleQuestions: quickQuestions,
        }))
    }, [quickQuestions])

    useEffect(() => {
        if (chatId) {
            setAiChatSettings((prev) => ({
                ...prev,
                chatId,
            }))
        }
    }, [chatId])

    useEffect(() => {
        if (initialContext) {
            initialContext.forEach((c) => addContext(c))
        }
    }, [initialContext])

    return (
        <ChatContext.Provider
            value={{
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
                addContext,
                firstResponse,
                initialQuestion,
                codeSnippet,
            }}
        >
            <ChatFrame />
        </ChatContext.Provider>
    )
}

// Global chat overlay. Rendered once (in the desktop wrapper) and toggled via the
// app-level `chatOpen` flag instead of being managed as a draggable window. A fresh
// set of `chatParams` remounts the provider (keyed by chat id / path) so switching
// conversations reinitializes the embedded chat.
export function ChatOverlay(): JSX.Element | null {
    const { chatOpen, chatParams } = useApp()

    if (!chatOpen || !chatParams) {
        return null
    }

    return (
        <ChatProvider
            key={chatParams.chatId || chatParams.path}
            context={chatParams.context}
            quickQuestions={chatParams.quickQuestions}
            chatId={chatParams.chatId}
            date={chatParams.date}
            initialQuestion={chatParams.initialQuestion}
            codeSnippet={chatParams.codeSnippet}
        />
    )
}

export function useChat(): ChatContextType {
    const context = useContext(ChatContext)
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider')
    }
    return context
}
