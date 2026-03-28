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
        <div ref={ref} className={`border border-primary rounded-sm p-4 @2xl:p-5 ${className}`}>
            <div className="flex flex-col @xl:flex-row @xl:items-start @xl:justify-between gap-2 @xl:gap-0">
                {steps.map((step, i) => (
                    <React.Fragment key={step.label}>
                        <div
                            className="flex @xl:flex-col items-center @xl:items-center gap-2 @xl:gap-1.5 text-center"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                                transition: `opacity 0.3s ease ${i * 100}ms, transform 0.3s ease ${i * 100}ms`,
                            }}
                        >
                            <step.icon className="size-5 text-primary shrink-0" />
                            <span className="text-sm text-primary whitespace-pre-line leading-tight">{step.label}</span>
                            <span className={`text-xs font-bold ${actorColors[step.actor]}`}>{step.actor}</span>
                        </div>
                        {i < steps.length - 1 && (
                            <div
                                className="hidden @xl:flex items-center self-center text-secondary px-1 pt-0"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transition: `opacity 0.3s ease ${i * 100 + 50}ms`,
                                }}
                            >
                                <span className="text-lg">&rarr;</span>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}
