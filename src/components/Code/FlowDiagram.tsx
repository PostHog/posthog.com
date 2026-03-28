import React, { useRef, useState, useEffect } from 'react'
import { IconSearch, IconLightBulb, IconMessage, IconMagicWand, IconRocket } from '@posthog/icons'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const steps = [
    { label: 'Analyze\nusage', icon: IconSearch, actor: 'Human' as const },
    { label: 'Decide what\nto build', icon: IconLightBulb, actor: 'Human' as const },
    { label: 'Prompt &\ncontext', icon: IconMessage, actor: 'Human' as const },
    { label: 'Build', icon: IconMagicWand, actor: 'Machine' as const },
    { label: 'Ship', icon: IconRocket, actor: 'Human' as const },
]

const actorColors: Record<string, string> = {
    Human: 'text-red',
    Machine: 'text-green',
}

interface FlowDiagramProps {
    className?: string
}

export function FlowDiagram({ className = '' }: FlowDiagramProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const prefersReducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        if (prefersReducedMotion) {
            setIsVisible(true)
            return
        }
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.4 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [prefersReducedMotion])

    return (
        <div ref={ref} className={`@container border border-primary rounded-sm overflow-hidden ${className}`}>
            {/* Mobile: stacked list */}
            <div className="flex flex-col gap-2 p-4 @xl:hidden">
                {steps.map((step, i) => (
                    <div
                        key={step.label}
                        className="flex items-center gap-2"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                            transition: `opacity 0.3s ease ${i * 100}ms, transform 0.3s ease ${i * 100}ms`,
                        }}
                    >
                        <step.icon className="size-5 text-primary shrink-0" />
                        <span className="text-sm text-primary whitespace-pre-line leading-tight">
                            {step.label.replace('\n', ' ')}
                        </span>
                        <span className={`text-xs font-bold ml-auto ${actorColors[step.actor]}`}>{step.actor}</span>
                    </div>
                ))}
            </div>

            {/* Desktop: 5-col grid, arrows absolutely positioned between cells */}
            <div className="hidden @xl:block">
                {/* Icons + labels row */}
                <div
                    className="relative grid items-end justify-items-center p-4 @xl:p-5 pb-3"
                    style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
                >
                    {steps.map((step, i) => (
                        <div
                            key={step.label}
                            className="flex flex-col items-center gap-1.5 text-center px-2"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                                transition: `opacity 0.3s ease ${i * 100}ms, transform 0.3s ease ${i * 100}ms`,
                            }}
                        >
                            <step.icon className="size-5 text-primary" />
                            <span className="text-sm text-primary whitespace-pre-line leading-tight">{step.label}</span>
                        </div>
                    ))}
                    {/* Arrows positioned at column boundaries */}
                    {steps.slice(0, -1).map((_, i) => (
                        <span
                            key={`arrow-${i}`}
                            className="absolute text-lg text-secondary -translate-x-1/2 -translate-y-1/2"
                            style={{
                                left: `${((i + 1) / steps.length) * 100}%`,
                                top: '50%',
                                opacity: isVisible ? 1 : 0,
                                transition: `opacity 0.3s ease ${i * 100 + 50}ms`,
                            }}
                        >
                            &rarr;
                        </span>
                    ))}
                </div>

                {/* Actor labels row — same column count, full-bleed gray background */}
                <div
                    className="grid justify-items-center bg-accent border-t border-primary py-2 px-4 @xl:px-5"
                    style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
                >
                    {steps.map((step, i) => (
                        <div
                            key={`actor-${step.label}`}
                            className="text-center"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transition: `opacity 0.3s ease ${i * 100 + 150}ms`,
                            }}
                        >
                            <span className={`text-xs font-bold ${actorColors[step.actor]}`}>{step.actor}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
