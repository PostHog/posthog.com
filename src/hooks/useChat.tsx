import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react'

interface ChatContextType {
    chatOpen: boolean
    setChatOpen: (open: boolean) => void
    chatting: boolean
    hasUnread: boolean
    setHasUnread: (unread: boolean) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }): JSX.Element {
    const [chatting, setChatting] = useState(false)
    const [chatOpen, setChatOpen] = useState(false)
    const [hasUnread, setHasUnread] = useState(false)

    useEffect(() => {
        if (chatOpen && !chatting) {
            setChatting(true)
        }
    }, [chatOpen])

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (!chatOpen && event.key === '?') {
                setChatOpen(true)
                event.preventDefault()
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [chatOpen])

    return (
        <ChatContext.Provider value={{ chatOpen, setChatOpen, chatting, hasUnread, setHasUnread }}>
            {children}
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
