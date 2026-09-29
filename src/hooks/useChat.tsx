import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { navigate } from 'gatsby'
import useInkeepSettings, { defaultQuickQuestions } from './useInkeepSettings'
import { ChatFrame } from 'components/Chat'
import { useApp } from '../context/App'

interface ChatContextType {
    hasUnread: boolean
    setHasUnread: (unread: boolean) => void
    loading: boolean
    renderChat: () => void
    setQuickQuestions: (questions: string[]) => void
    conversationHistory: { id: string; question: string; date: string }[]
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
    const { baseSettings, aiChatSettings } = useInkeepSettings()
    const [hasUnread, setHasUnread] = useState(false)
    const [loading, setLoading] = useState(true)
    const [hasFirstResponse, setHasFirstResponse] = useState(false)
    const [quickQuestions, setQuickQuestions] = useState(initialQuickQuestions || defaultQuickQuestions)
    const [conversationHistory, setConversationHistory] = useState<{ id: string; question: string; date: string }[]>([])
    const [context, setContext] = useState(initialContext || [])
    const [EmbeddedChat, setEmbeddedChat] = useState<any>()
    const [firstResponse, setFirstResponse] = useState<string | null>(null)
    const conversationStartedDate = useMemo(() => date || new Date().toISOString(), [])

    const logConversation = async (event: any) => {
        const conversationId = event?.properties?.conversation?.id
        const question = event?.properties?.conversation?.messages?.find(
            (m: { role: string }) => m.role === 'user'
        )?.content
        if (conversationId && question) {
            try {
                const newConversation = {
                    id: conversationId,
                    question,
                    date: conversationStartedDate,
                }
                const conversations = JSON.parse(localStorage.getItem('conversations') || '[]')
                const history = [...conversations.filter((c: any) => c.id !== conversationId), newConversation]
                localStorage.setItem('conversations', JSON.stringify(history))
                setConversationHistory(history)
            } catch (error) {
                console.error('Error adding conversation to history:', error)
            }
        }
    }

    const logEventCallback = useCallback(
        async (event: any) => {
            if (event?.eventName === 'user_message_submitted') {
                setFirstResponse(
                    (previous) =>
                        previous ||
                        event.properties.conversation.messages.find((m: any) => m.role === 'user')?.content ||
                        null
                )
            }
            if (event?.eventName === 'assistant_message_received') {
                if (!hasFirstResponse) {
                    setHasFirstResponse(true)
                }
            }
            if (event?.eventName === 'assistant_answer_displayed') {
                const shadowRoot = document.querySelector('#embedded-chat-target>div')?.shadowRoot
                if (shadowRoot) {
                    const links = Array.from(shadowRoot.querySelectorAll('a'))
                    for (const link of links) {
                        link.addEventListener('click', (e: Event) => {
                            e.preventDefault()
                            e.stopPropagation()
                            const href = link.getAttribute('href')
                            if (!href) return
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
                        })
                    }
                }
            }
            logConversation(event)
        },
        [hasFirstResponse]
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
                aiChatSettings: {
                    ...aiChatSettings,
                    chatId,
                    exampleQuestions: quickQuestions,
                    prompts: context.map(
                        (c) => `The user is currently viewing the page ${c.value.label} at ${c.value.path}`
                    ),
                },
                baseSettings: { ...baseSettings, onEvent: logEventCallback },
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
// set of `chatParams` remounts the provider (keyed by request) so switching
// conversations reinitializes the embedded chat.
export function ChatOverlay(): JSX.Element | null {
    const { chatOpen, chatParams } = useApp()

    if (!chatOpen || !chatParams) {
        return null
    }

    return (
        <ChatProvider
            key={chatParams.sessionKey}
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
