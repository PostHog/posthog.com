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

export interface ChatMessage {
    role: 'system' | 'assistant' | 'user'
    content: string
}

export const ChatMessage = ({ role, content }: ChatMessage): JSX.Element => {
    const offsetSide = role === 'assistant' ? 'r' : 'l'

    return (
        <div className="flex gap-x-2 items-end mb-4">
            {role === 'assistant' && <ChatAvatar role={'assistant'} />}
            <div
                className={`bg-${
                    role === 'assistant' ? 'tan' : 'gray-accent'
                } rounded-t rounded-b${offsetSide} p-4 flex-grow`}
            >
                <p className="flex-shrink mb-0 text-sm">{content}</p>
            </div>
            {role === 'user' && <ChatAvatar role={'user'} />}
        </div>
    )
}
