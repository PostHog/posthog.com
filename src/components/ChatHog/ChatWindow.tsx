import { Close } from 'components/Icons'
import { Input } from 'components/Input'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { ChatMessage } from './ChatMessage'

export const ChatWindow = ({
    setIsChatActive,
}: {
    setIsChatActive: (isChatActive: boolean) => void | undefined
}): JSX.Element => {
    const [messages, setMessages] = React.useState<ChatMessage[]>([])

    const getMessagesFromStorage = () => {
        const messagesInStorage = JSON.parse(localStorage.getItem('max-ai-messages') || '[]')
        console.log(messagesInStorage, 'messages from storage')
        if (messagesInStorage || messagesInStorage.length < 1) {
            console.log('this thinks i has messages')
            setMessages(messagesInStorage)
        } else {
            setMessages([
                {
                    role: 'assistant',
                    content: "Hi there! I'm Max, your friendly AI hedgehog. How can I help you today?",
                },
            ])
        }
    }

    const handleCloseClick = () => {
        setIsChatActive(false)
    }

    const handleSubmit = async (inputContent?: string) => {
        console.log('setting submit', inputContent)
        setMessages([
            ...messages,
            {
                role: 'user',
                content: inputContent || 'yo',
            },
        ])
    }

    useEffect(() => {
        console.log(messages, 'messages')
        const getResponse = async () => {
            const res = await fetch('https://max.posthog.cc/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messages),
            })
                .then((res) => res.json())
                .then((res) => {
                    // add the response to the messages
                    setMessages([
                        ...messages,
                        {
                            role: 'assistant',
                            content: res,
                        },
                    ])
                })
        }
        if (messages?.[messages.length - 1]?.role === 'user') {
            getResponse()
        }
        // save the messages to local storage with a key and expiration date or 24 hours
        // if the user comes back, load the messages from local storage
        // localStorage.setItem('max-ai-messages', JSON.stringify(messages))
        if (!messages || messages.length === 0) {
            // getMessagesFromStorage()
        }
    }, [messages])

    return (
        <div className="bg-white rounded h-[600px] max-h-screen w-[350px] flex flex-col overflow-hidden">
            <div className="flex rounded-t w-full bg-red justify-between items-center p-4 z-20">
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
            <div className="h-8 mr-3 bg-gradient-to-b from-white to-transparent z-10" />
            <div className="-mt-8 overflow-y-scroll overflow-x-hidden">
                <div className="pt-8 pb-4 px-4">
                    {messages?.map((message, index) => (
                        <ChatMessage key={`message-${index}`} role={message.role} content={message.content} />
                    ))}
                </div>
            </div>
            <div className="h-8 -mt-6 mr-3 bg-gradient-to-t from-white to-transparent" />
            <div className="bg-white z-20">
                <Input name="htyy" showSubmit onSubmit={handleSubmit} />
            </div>
        </div>
    )
}
