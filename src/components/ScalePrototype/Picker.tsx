import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './picker.css'

type PickerProps = {
    names: string[]
    current: number
    onSelect: (index: number) => void
    onReplay: () => void
}

export default function Picker({ names, current, onSelect, onReplay }: PickerProps): JSX.Element | null {
    const [mounted, setMounted] = useState(false)
    const [ready, setReady] = useState(false)
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
    const highlightRef = useRef<HTMLSpanElement>(null)

    useEffect(() => setMounted(true), [])

    useLayoutEffect(() => {
        const place = () => {
            const item = itemRefs.current[current]
            const highlight = highlightRef.current
            if (!item || !highlight) {
                return
            }
            highlight.style.width = `${item.offsetWidth}px`
            highlight.style.transform = `translateX(${item.offsetLeft}px)`
        }
        place()
        window.addEventListener('resize', place)
        return () => window.removeEventListener('resize', place)
    }, [current, mounted])

    useEffect(() => {
        if (!mounted) {
            return
        }
        const frame = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
        return () => cancelAnimationFrame(frame)
    }, [mounted])

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement
            if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) {
                return
            }
            if (event.metaKey || event.ctrlKey || event.altKey) {
                return
            }
            const number = parseInt(event.key, 10)
            if (number >= 1 && number <= names.length) {
                onSelect(number - 1)
            } else if (event.key === 'ArrowRight') {
                onSelect((current + 1) % names.length)
            } else if (event.key === 'ArrowLeft') {
                onSelect((current - 1 + names.length) % names.length)
            } else if (event.key === 'r' || event.key === 'R') {
                onReplay()
            }
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [current, names.length, onSelect, onReplay])

    if (!mounted) {
        return null
    }

    return createPortal(
        <nav className="proto-picker" aria-label="Prototype variants" data-ready={ready ? '' : undefined}>
            <span ref={highlightRef} className="proto-picker-highlight" aria-hidden="true" />
            {names.map((name, index) => (
                <button
                    key={name}
                    ref={(element) => {
                        itemRefs.current[index] = element
                    }}
                    className="proto-picker-item"
                    data-active={index === current ? '' : undefined}
                    aria-current={index === current ? 'true' : undefined}
                    onClick={() => onSelect(index)}
                >
                    {name}
                </button>
            ))}
            <span className="proto-picker-divider" aria-hidden="true" />
            <button
                className="proto-picker-item proto-picker-replay"
                aria-label="Replay animation (R)"
                onClick={onReplay}
            >
                ↻
            </button>
        </nav>,
        document.body
    )
}
