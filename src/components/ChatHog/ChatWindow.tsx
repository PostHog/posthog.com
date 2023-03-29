import { Close } from 'components/Icons'
import { Input } from 'components/Input'
import { motion } from 'framer-motion'
import React from 'react'
import { ChatMessage } from './ChatMessage'

export const ChatWindow = ({
    setIsChatActive,
}: {
    setIsChatActive: (isChatActive: boolean) => void | undefined
}): JSX.Element => {
    const [messages, setMessages] = React.useState<ChatMessage[]>([
        {
            role: 'assistant',
            content: "Hey! I'm Max AI, your helpful hedgehog assistant.",
        },
        {
            role: 'user',
            content: 'Does PostHog feature flags have multivariant flags?',
        },
    ])

    const handleCloseClick = () => {
        setIsChatActive(false)
    }

    return (
        <div className="bg-white rounded h-[600px] max-h-screen w-[350px] flex flex-col">
            <div className="flex rounded-t w-full bg-red justify-between items-center p-4">
                <div>
                    <h3 className="font-bold text-base text-white m-0">Max AI</h3>
                    <p className="text-xs opacity-80 text-white mb-0">PostHog's AI support assistant</p>
                </div>
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.2 } }}
                    onClick={handleCloseClick}
                >
                    <Close className="text-white opacity-70 hover:opacity-90 transition-opacity h-4 w-4" opacity="1" />
                </motion.button>
            </div>
            <div className="flex flex-col flex-grow justify-end overflow-hidden mb-2">
                <div className="h-8 mr-3 bg-gradient-to-b from-white to-transparent z-10" />
                <div className="overflow-y-scroll overflow-x-hidden p-4 -mt-6 flex-grow flex flex-col justify-end">
                    {messages?.map((message, index) => (
                        <ChatMessage key={`message-${index}`} role={message.role} content={message.content} />
                    ))}
                </div>
                <div className="h-8 -mt-6 mr-3 bg-gradient-to-t from-white to-transparent" />
                <Input name="htyy" showSubmit />
            </div>
        </div>
    )
}
