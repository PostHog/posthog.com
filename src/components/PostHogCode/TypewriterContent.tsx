import React, { useState, useEffect } from 'react'

type Segment = { type: 'text'; value: string } | { type: 'node'; value: React.ReactNode }

interface TypewriterContentProps {
    segments: Segment[]
    trigger: boolean
    onComplete?: () => void
    charDelayMs?: number
}

export default function TypewriterContent({ segments, trigger, onComplete, charDelayMs = 18 }: TypewriterContentProps) {
    const [visibleLength, setVisibleLength] = useState(0)
    const [phase, setPhase] = useState<'idle' | 'typing' | 'done'>('idle')
    const totalChars = segments.reduce((sum, s) => (s.type === 'text' ? sum + s.value.length : sum), 0)

    useEffect(() => {
        if (trigger && phase === 'idle') {
            setPhase('typing')
        }
    }, [trigger, phase])

    useEffect(() => {
        if (phase !== 'typing' || visibleLength >= totalChars) {
            if (phase === 'typing' && visibleLength >= totalChars) {
                setPhase('done')
                onComplete?.()
            }
            return
        }

        const t = setTimeout(() => {
            setVisibleLength((v) => Math.min(v + 1, totalChars))
        }, charDelayMs)

        return () => clearTimeout(t)
    }, [phase, visibleLength, totalChars, charDelayMs, onComplete])

    if (!trigger) {
        return (
            <span>
                {segments.map((seg, i) => (
                    <React.Fragment key={i}>{seg.type === 'text' ? seg.value : seg.value}</React.Fragment>
                ))}
            </span>
        )
    }

    if (phase === 'done') {
        return (
            <span>
                {segments.map((seg, i) => (
                    <React.Fragment key={i}>{seg.type === 'text' ? seg.value : seg.value}</React.Fragment>
                ))}
            </span>
        )
    }

    let remaining = visibleLength
    const out: React.ReactNode[] = []

    for (const seg of segments) {
        if (remaining <= 0) break
        if (seg.type === 'node') {
            out.push(seg.value)
        } else {
            const take = Math.min(remaining, seg.value.length)
            out.push(seg.value.slice(0, take))
            remaining -= take
        }
    }

    return (
        <span>
            {out}
            {phase === 'typing' && visibleLength < totalChars && (
                <span className="animate-pulse" style={{ marginLeft: 1 }}>
                    |
                </span>
            )}
        </span>
    )
}
