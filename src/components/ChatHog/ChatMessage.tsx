import Avatar from 'components/CommunityQuestions/Avatar'
import { StaticImage } from 'gatsby-plugin-image'
import { useUser } from 'hooks/useUser'
import React, { useEffect } from 'react'

export const ChatAvatar = ({ role }: { role: 'system' | 'assistant' | 'user' }): JSX.Element => {
    const { user } = useUser()
    return role === 'user' ? (
        <Avatar image={user?.profile?.avatar} />
    ) : (
        <div>
            <div className="h-8 w-8 rounded-full bg-orange">
                <StaticImage
                    placeholder="none"
                    loading="eager"
                    alt="Chat hog avatar"
                    src="./images/chat-hog-circle.png"
                    width={32}
                />
            </div>
        </div>
    )
}

const TypingIndicator = (): JSX.Element => {
    return (
        <div className="typing-indicator">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
        </div>
    )
}

export interface ChatMessage {
    role: 'system' | 'assistant' | 'user'
    content?: string
    loading?: boolean
}

export const ChatMessage = ({ role, content, loading }: ChatMessage): JSX.Element => {
    return (
        <div className="flex gap-x-2 items-end mb-4">
            {role === 'assistant' && <ChatAvatar role={'assistant'} />}
            {content && (
                <div className={`w-20 bg-${role === 'assistant' ? 'tan' : 'gray-accent'} rounded p-4 flex-grow`}>
                    <p className="flex-shrink mb-0 text-sm">
                        {content.split('\n').map((item, idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    {item}
                                    <br />
                                </React.Fragment>
                            )
                        })}
                    </p>
                </div>
            )}
            {loading && <TypingIndicator />}
            {role === 'user' && <ChatAvatar role={'user'} />}
        </div>
    )
}
