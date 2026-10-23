import React from 'react'
import { SpeechBubble } from 'components/UI/SpeechBubble'

export default function Sizes(): JSX.Element {
    return (
        <div className="flex flex-wrap items-start gap-8 p-4">
            <SpeechBubble size="sm">One more question…</SpeechBubble>
            <SpeechBubble size="md">What did people do after signup?</SpeechBubble>
            <SpeechBubble size="lg" className="max-w-72 font-squeak">
                Less guesswork. More product data.
            </SpeechBubble>
        </div>
    )
}
