import React, { useState } from 'react'

interface Message {
    from: 'user' | 'bot'
    text: string
}

const INITIAL_MESSAGES: Message[] = [
    { from: 'user', text: 'is my hedgehog too wide for a standard gap' },
    {
        from: 'bot',
        text: "Send a photo of him next to a CD case. The standard gap is 13×13cm. If he's wider than the case, book Snuffl XL and nobody has to say anything.",
    },
]

const CANNED_REPLIES = [
    'Slugs are legal tender on the network, yes. Snails are considered a luxury import.',
    "Badgers make their own arrangements. I'd rather not be quoted on this.",
    "Colin is 4 minutes away. Colin is always 4 minutes away. It's part of his charm.",
]

// "Prickles", the fake AI concierge. Every reply here is canned — the LLM
// analytics annotations describe what the real pipeline would capture.
export default function ChatWidget(): JSX.Element {
    const [open, setOpen] = useState(true)
    const [messages, setMessages] = useState(INITIAL_MESSAGES)
    const [draft, setDraft] = useState('')
    const [replyIndex, setReplyIndex] = useState(0)

    const send = (e: React.FormEvent) => {
        e.preventDefault()
        const text = draft.trim()
        if (!text) return
        setMessages((current) => [
            ...current,
            { from: 'user', text },
            { from: 'bot', text: CANNED_REPLIES[replyIndex % CANNED_REPLIES.length] },
        ])
        setReplyIndex((i) => i + 1)
        setDraft('')
    }

    return (
        <div className="snuffl-root sn-chat" data-snuffl-id="chat-widget">
            <div className="sn-chat-card">
                <button className="sn-chat-head" onClick={() => setOpen((o) => !o)}>
                    <span className="sn-status" /> Prickles · AI concierge
                    <span className="sn-collapse">{open ? '▾' : '▸'}</span>
                </button>
                {open && (
                    <>
                        <div className="sn-chat-body">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`sn-msg ${message.from}`}
                                    {...(index === 1 ? { 'data-snuffl-id': 'chat-bot-msg' } : {})}
                                >
                                    {message.text}
                                </div>
                            ))}
                        </div>
                        <form className="sn-chat-input" onSubmit={send}>
                            <input
                                type="text"
                                placeholder="Ask about gaps, slugs, badgers…"
                                value={draft}
                                onChange={(e) => setDraft(e.target.value)}
                            />
                            <button type="submit" aria-label="Send">
                                ↑
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}
