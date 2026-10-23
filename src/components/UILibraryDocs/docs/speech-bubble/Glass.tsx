import React from 'react'
import { SpeechBubble } from 'components/UI/SpeechBubble'

export default function Glass(): JSX.Element {
    return (
        <div className="@container rounded-lg bg-blue/10 p-4">
            <div className="grid gap-8 rounded-lg bg-white/20 p-6 backdrop-blur-sm dark:bg-white/[0.05] @sm:grid-cols-2">
                <SpeechBubble tail="top" tailAlign="start">
                    Your product data has a story to tell.
                </SpeechBubble>
                <SpeechBubble tail="bottom" tailAlign="end">
                    Find the moment that made someone return.
                </SpeechBubble>
                <SpeechBubble tail="left" tailAlign="end">
                    Replay the session. See what happened.
                </SpeechBubble>
                <SpeechBubble tail="right" tailAlign="start">
                    Ship the fix. Check the result.
                </SpeechBubble>
            </div>
        </div>
    )
}
