import React, { useRef, useState, useEffect } from 'react'
import { IconMessage, IconStack, IconBolt, IconGraph, IconCode2 } from '@posthog/icons'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'

const nodes = [
    { label: '#auto-reports\n(silent since April)', icon: IconMessage, color: 'text-red', x: '15%', y: '20%' },
    { label: 'Notion template\n("DO NOT DELETE")', icon: IconStack, color: 'text-blue', x: '65%', y: '12%' },
    { label: 'Zapier flow\n(unmaintained, 2022)', icon: IconBolt, color: 'text-yellow', x: '40%', y: '50%' },
    { label: 'KPIs_v3_FINAL\n.xlsx', icon: IconGraph, color: 'text-green', x: '80%', y: '55%' },
    { label: "Python script\n(on someone's laptop)", icon: IconCode2, color: 'text-orange', x: '10%', y: '72%' },
]

const chaosLines = [
    { x1: '15%', y1: '20%', x2: '40%', y2: '50%' },
    { x1: '65%', y1: '12%', x2: '40%', y2: '50%' },
    { x1: '40%', y1: '50%', x2: '80%', y2: '55%' },
    { x1: '40%', y1: '50%', x2: '10%', y2: '72%' },
    { x1: '10%', y1: '72%', x2: '65%', y2: '12%' },
    { x1: '80%', y1: '55%', x2: '15%', y2: '20%' },
]

interface WorkFragmentDiagramProps {
    className?: string
}

export function WorkFragmentDiagram({ className = '' }: WorkFragmentDiagramProps) {
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
            { threshold: 0.3 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [prefersReducedMotion])

    return (
        <div ref={ref} className={`border border-primary rounded-sm overflow-hidden ${className}`}>
            <div className="py-1.5 flex items-center justify-between border-b border-secondary mx-4">
                <span className="text-[13px] uppercase text-primary font-mono">Product ops</span>
                <span className="text-[13px] uppercase text-primary font-mono">(cir. last Tuesday)</span>
            </div>
            <div className="relative h-48 p-2">
                <svg className="absolute inset-0 w-full h-full" aria-hidden>
                    {chaosLines.map((line, i) => (
                        <line
                            key={i}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeDasharray="4 3"
                            className="text-muted"
                            style={{
                                opacity: isVisible ? 0.5 : 0,
                                transition: `opacity 0.4s ease ${i * 80}ms`,
                            }}
                        />
                    ))}
                </svg>
                {nodes.map((node, i) => {
                    const Icon = node.icon
                    return (
                        <div
                            key={node.label}
                            className="absolute flex flex-col items-center text-center"
                            style={{
                                left: node.x,
                                top: node.y,
                                transform: 'translate(-50%, -50%)',
                                opacity: isVisible ? 1 : 0,
                                transition: `opacity 0.3s ease ${i * 120 + 200}ms`,
                            }}
                        >
                            <Icon className={`size-5 mb-1 ${node.color}`} />
                            <span className="text-[10px] leading-tight text-secondary whitespace-pre-line">
                                {node.label}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
