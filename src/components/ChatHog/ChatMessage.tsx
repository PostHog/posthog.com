import React from 'react'

export const ChatAvatar = ({ role }: { role: 'system' | 'assistant' | 'user' }): JSX.Element => {
    return (
        <div>
            <div className="rounded-full bg-red h-8 w-8"></div>
        </div>
    )
}

export interface ChatMessage {
    role: 'system' | 'assistant' | 'user'
    content: string
}

export const ChatMessage = ({ role, content }: ChatMessage): JSX.Element => {
    const offsetSide = role === 'assistant' ? 'r' : 'l'
    return (
        <div className={`bg-tan rounded-t rounded-bl p-4 flex gap-x-2 mb-4 m${offsetSide}-8`}>
            {role === 'assistant' && <ChatAvatar role={'assistant'} />}
            <p className="flex-shrink mb-0">{content}</p>
            {role === 'user' && <ChatAvatar role={'user'} />}
        </div>
    )
}
