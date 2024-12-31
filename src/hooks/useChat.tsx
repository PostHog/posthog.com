import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react'

interface ChatContextType {
    chatOpen: boolean
    setChatOpen: (open: boolean) => void
    chatting: boolean
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }): JSX.Element {
    const [chatting, setChatting] = useState(false)
    const [chatOpen, setChatOpen] = useState(false)

    useEffect(() => {
        if (chatOpen && !chatting) {
            setChatting(true)
        }
    }, [chatOpen])

    return <ChatContext.Provider value={{ chatOpen, setChatOpen, chatting }}>{children}</ChatContext.Provider>
}

export function useChat(): ChatContextType {
    const context = useContext(ChatContext)
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider')
    }
    return context
}
