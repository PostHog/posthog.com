import React from 'react'

// Where the tail sits, which is the side the speaker is on.
export type SpeechBubbleTail = 'bottom' | 'left' | 'right'

const TAIL_CLASSES: Record<SpeechBubbleTail, string> = {
    bottom: 'left-1/2 top-full -translate-x-1/2 -translate-y-1/2 border-b border-r',
    left: 'right-full top-1/2 translate-x-1/2 -translate-y-1/2 border-l border-b',
    right: 'left-full top-1/2 -translate-x-1/2 -translate-y-1/2 border-r border-t',
}

// A speech bubble for a hedgehog or another speaker: a squared, bordered box with a small tail that
// points at the speaker. Pass padding, width, and text styles in `className`. Borders are set to
// solid explicitly, because docs prose styles can reset the border style.
export default function SpeechBubble({
    children,
    tail = 'bottom',
    className = '',
}: {
    children: React.ReactNode
    tail?: SpeechBubbleTail
    className?: string
}): JSX.Element {
    return (
        <div
            className={`relative rounded-sm shadow-sm bg-primary border border-solid border-primary text-primary ${className}`}
        >
            {children}
            <span
                aria-hidden
                className={`absolute size-2 rotate-45 bg-primary border-solid border-primary ${TAIL_CLASSES[tail]}`}
            />
        </div>
    )
}
