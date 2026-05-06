import React, { useMemo, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { IconCheck, IconCopy } from '@posthog/icons'
import { useApp } from '../../context/App'
import { useToast } from '../../context/Toast'
import { cn } from '../../utils'

/** Portaled confetti must paint above `AppWindow` (`motion.div` z-index) and taskbar chrome. */
function useCopyConfettiZIndex(): number {
    const { windows } = useApp()
    return useMemo(() => {
        const maxWindowZ = windows.reduce((max, w) => Math.max(max, w.zIndex ?? 0), 0)
        return Math.max(maxWindowZ + 5000, 200_000)
    }, [windows])
}

/**
 * Viewport-scoped burst anchored to a real element. `react-confetti-explosion` measured a 0×0
 * node and misaligned inside nested scroll/transform (OS windows); canvas-confetti uses normalized
 * viewport coordinates from the button’s bounding rect.
 */
function fireCopyConfetti(originEl: HTMLElement | null, zIndex: number): void {
    if (!originEl || typeof window === 'undefined') return

    const shoot = (): void => {
        const rect = originEl.getBoundingClientRect()
        const vw = window.innerWidth || 1
        const vh = window.innerHeight || 1
        const x = (rect.left + rect.width / 2) / vw
        const y = (rect.top + rect.height / 2) / vh

        /** Wide `spread` (degrees) widens the cone; extra burst + staggered angles reduce a single tight cluster. */
        const base = {
            origin: { x, y },
            zIndex,
            disableForReducedMotion: true,
        }

        confetti({
            ...base,
            angle: 76,
            particleCount: 72,
            spread: 92,
            startVelocity: 26,
            ticks: 260,
            gravity: 1.16,
        })
        confetti({
            ...base,
            angle: 80,
            particleCount: 64,
            spread: 138,
            startVelocity: 22,
            ticks: 250,
            decay: 0.92,
            gravity: 1.1,
        })
        confetti({
            ...base,
            angle: 78,
            particleCount: 98,
            spread: 198,
            startVelocity: 18,
            ticks: 240,
            scalar: 0.85,
            decay: 0.87,
            gravity: 1.1,
        })
        confetti({
            ...base,
            angle: 78,
            particleCount: 48,
            spread: 220,
            startVelocity: 14,
            ticks: 220,
            scalar: 0.78,
            decay: 0.86,
            gravity: 1.08,
        })
    }

    requestAnimationFrame(() => {
        requestAnimationFrame(shoot)
    })
}

export type CopyableCommandProps = {
    command: string
    className?: string
    /** Apply the wizard gradient text effect to the command */
    animate?: boolean
}

export function CopyableCommand({ command, className = '', animate = false }: CopyableCommandProps): JSX.Element {
    const { addToast } = useToast()
    const confettiZIndex = useCopyConfettiZIndex()
    const copyButtonRef = useRef<HTMLButtonElement>(null)
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(command)
        setCopied(true)
        fireCopyConfetti(copyButtonRef.current, confettiZIndex)
        window.setTimeout(() => setCopied(false), 1500)
        addToast({
            description: (
                <span className="inline-flex items-center gap-1.5">
                    <IconCheck className="size-4 text-green" />
                    Copied to clipboard
                </span>
            ),
            duration: 2000,
        })
    }

    const isMultiline = command.includes('\n')

    return (
        <div
            className={cn(
                'group flex items-start gap-2 bg-primary border border-primary rounded px-2 py-1.5',
                className
            )}
        >
            <pre className="flex-1 m-0 p-0 bg-transparent text-[13px] leading-[1.45] font-mono text-primary whitespace-pre-wrap break-all">
                <code className={cn('!bg-transparent !p-0 !border-0', animate && 'text-gradient-wizard')}>
                    {command}
                </code>
            </pre>
            <span
                className={cn(
                    'inline-flex shrink-0 items-center justify-center',
                    isMultiline ? 'self-start' : 'self-center'
                )}
            >
                <button
                    ref={copyButtonRef}
                    type="button"
                    onClick={handleCopy}
                    aria-label="Copy to clipboard"
                    className={cn(
                        'inline-flex items-center justify-center size-5 rounded text-primary opacity-60 hover:opacity-100 cursor-pointer'
                    )}
                >
                    {copied ? <IconCheck className="size-4 text-green" /> : <IconCopy className="size-4" />}
                </button>
            </span>
        </div>
    )
}
