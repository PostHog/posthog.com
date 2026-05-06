import React, { useEffect, useState } from 'react'
import { RoughAnnotation } from '../Code/RoughAnnotation'
import OSButton from '../OSButton'

const HIGHLIGHT_COLOR = 'rgba(247, 165, 1, 0.35)' // PostHog yellow (#F7A501) at 35% alpha
const STRONG_REGEX = /<strong>([\s\S]*?)<\/strong>/g
/** After the stack finishes moving (~380ms), draw highlights so rough-notation measures an un-rotated box */
const HIGHLIGHT_DELAY_MS = 240
/** Rough-notation draw speed once `show` becomes true */
const HIGHLIGHT_ANIMATION_MS = 1600

type ContentPart = { text: string; highlight: boolean }

function parseContent(content: string): ContentPart[] {
    const parts: ContentPart[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null
    const regex = new RegExp(STRONG_REGEX.source, STRONG_REGEX.flags)
    while ((match = regex.exec(content)) !== null) {
        if (match.index > lastIndex) {
            parts.push({ text: content.slice(lastIndex, match.index), highlight: false })
        }
        parts.push({ text: match[1], highlight: true })
        lastIndex = match.index + match[0].length
    }
    if (lastIndex < content.length) {
        parts.push({ text: content.slice(lastIndex), highlight: false })
    }
    return parts
}

export type SignupQuoteCardProps = {
    content: string
    isActive: boolean
}

export function SignupQuoteCard({ content, isActive }: SignupQuoteCardProps) {
    const parts = parseContent(content)
    const [highlightReady, setHighlightReady] = useState(false)

    // Only the centered card should run rough-notation (side cards are transformed; measuring there causes pops).
    // Each time we land on center: reset, wait for stack motion to finish, then show with a fresh annotation instance.
    useEffect(() => {
        if (!isActive) {
            setHighlightReady(false)
            return
        }
        setHighlightReady(false)
        const t = window.setTimeout(() => setHighlightReady(true), HIGHLIGHT_DELAY_MS)
        return () => clearTimeout(t)
    }, [isActive])

    return (
        <div className="bg-white dark:bg-dark border border-primary rounded shadow-2xl p-4 @md:p-5 w-full text-left">
            <h3 className="text-lg @md:text-xl font-bold text-center text-primary !mt-0 !mb-3">
                How did you hear about us?
            </h3>
            <div className="border border-primary bg-white dark:bg-accent rounded p-3 @md:p-4 h-48 mb-3">
                <p className="!m-0 text-sm @md:text-base leading-relaxed text-secondary">
                    {parts.map((part, i) =>
                        part.highlight ? (
                            isActive ? (
                                <RoughAnnotation
                                    key={`${i}-rough`}
                                    type="highlight"
                                    color={HIGHLIGHT_COLOR}
                                    strokeWidth={1}
                                    iterations={2}
                                    multiline
                                    animateOnScroll={false}
                                    show={highlightReady}
                                    animationDuration={HIGHLIGHT_ANIMATION_MS}
                                >
                                    <strong className="font-semibold text-primary">{part.text}</strong>
                                </RoughAnnotation>
                            ) : (
                                <strong key={i} className="font-semibold text-primary">
                                    {part.text}
                                </strong>
                            )
                        ) : (
                            <React.Fragment key={i}>{part.text}</React.Fragment>
                        )
                    )}
                </p>
            </div>
            <OSButton variant="primary" size="lg" width="full" disabled tabIndex={-1} aria-hidden="true">
                Create account
            </OSButton>
        </div>
    )
}

export default SignupQuoteCard
