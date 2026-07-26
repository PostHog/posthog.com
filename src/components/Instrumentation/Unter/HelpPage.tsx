import React, { useEffect, useRef, useState } from 'react'

interface Message {
    from: 'user' | 'bot'
    text: string
}

const INITIAL_MESSAGES: Message[] = [
    { from: 'user', text: 'Is there a hedgehog highway in Toronto?' },
    {
        from: 'bot',
        text: 'Not yet. We cover Greater London and four postcodes in Bristol. Toronto has raccoons, which is a different product.',
    },
]

const CANNED_REPLIES = [
    'Crossings are charged per route, and the first one is free. Nobody has ever been billed twice.',
    "Badgers make their own arrangements. I'd rather not be quoted on this.",
    'Your driver is 4 minutes away. Drivers are always 4 minutes away. Nobody has explained why.',
    'I can see your last three crossings. Two were the compost heap. No judgement.',
]

const SUGGESTIONS = ['Can I bring a hoglet?', 'What if a badger is using the gap?', 'Why was my crossing cancelled?']

/**
 * AI support gets a whole page rather than a floating widget: a chat panel pinned
 * over the demo fought with the instrumentation markers for the same corner, and
 * the LLM annotations had nothing to point at while it was closed.
 *
 * Every reply is canned; the LLM analytics annotations describe what the real
 * pipeline would capture.
 */
export default function HelpPage(): JSX.Element {
    const [messages, setMessages] = useState(INITIAL_MESSAGES)
    const [draft, setDraft] = useState('')
    const [replyIndex, setReplyIndex] = useState(0)
    const threadRef = useRef<HTMLDivElement | null>(null)

    // Keep the newest reply in view, the way a real thread would.
    useEffect(() => {
        const thread = threadRef.current
        if (thread) thread.scrollTop = thread.scrollHeight
    }, [messages])

    const ask = (text: string) => {
        const question = text.trim()
        if (!question) return
        setMessages((current) => [
            ...current,
            { from: 'user', text: question },
            { from: 'bot', text: CANNED_REPLIES[replyIndex % CANNED_REPLIES.length] },
        ])
        setReplyIndex((i) => i + 1)
        setDraft('')
    }

    return (
        <div className="un-shell">
            <section className="un-help">
                <div className="un-help-intro">
                    <h1 className="un-h1">AI support</h1>
                    <p className="un-lede">
                        Ask about routes, gap sizes, or a crossing that didn't happen. It can see your recent trips and
                        answers in about a second.
                    </p>
                    {/* Not buttons: these are examples of what people ask, not a
                        second way to drive the thread. The input below is the
                        interactive part. */}
                    <ul className="un-help-suggestions">
                        {SUGGESTIONS.map((suggestion) => (
                            <li key={suggestion}>{suggestion}</li>
                        ))}
                    </ul>
                </div>

                <div className="un-chat-card" data-unter-id="chat-widget">
                    <div className="un-chat-head">
                        <span className="un-status" /> Unter AI support
                        <span className="un-chat-meta">replies instantly</span>
                    </div>
                    <div className="un-chat-body" ref={threadRef}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`un-msg ${message.from}`}
                                {...(index === 1 ? { 'data-unter-id': 'chat-bot-msg' } : {})}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <form
                        className="un-chat-input"
                        onSubmit={(e) => {
                            e.preventDefault()
                            ask(draft)
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Ask a question"
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                        />
                        <button type="submit" aria-label="Send">
                            ↑
                        </button>
                    </form>
                </div>
            </section>

            <section className="un-help-escalate" data-unter-id="help-escalate">
                <div>
                    <h2 className="un-h2">Still stuck?</h2>
                    <p className="un-lede">
                        A human will read your message eventually. Margaret volunteers on Tuesdays and is very thorough.
                    </p>
                </div>
                <button className="un-btn-black">Email support</button>
            </section>
        </div>
    )
}
