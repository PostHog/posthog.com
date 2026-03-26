import React from 'react'
import {
    IconPulse,
    IconSparkles,
    IconTerminal,
    IconCode,
    IconEye,
    IconArrowRight,
    IconGear,
    IconLightBulb,
} from '@posthog/icons'

type PipelineColor = 'orange' | 'yellow' | 'blue' | 'green' | 'red' | 'purple' | 'seagreen'

/** Staggered delays for connector shimmer (matches former inline `animation-delay: ${i * 0.4}s`). */
const PIPELINE_CONNECTOR_DELAY_CLASS: readonly string[] = [
    '[animation-delay:0ms]',
    '[animation-delay:400ms]',
    '[animation-delay:800ms]',
    '[animation-delay:1200ms]',
]

type PipelineStep = {
    icon: React.ComponentType<{ className?: string }>
    title: string
    subtitle: string
    color: PipelineColor
}

const colorMap: Record<PipelineColor, { dot: string; text: string }> = {
    orange: { dot: 'bg-orange', text: 'text-orange' },
    yellow: { dot: 'bg-yellow', text: 'text-yellow' },
    blue: { dot: 'bg-blue', text: 'text-blue' },
    green: { dot: 'bg-green', text: 'text-green' },
    red: { dot: 'bg-red', text: 'text-red' },
    purple: { dot: 'bg-purple', text: 'text-purple' },
    seagreen: { dot: 'bg-seagreen', text: 'text-seagreen' },
}

const MAINTENANCE_PIPELINE_STEPS: PipelineStep[] = [
    {
        icon: IconPulse,
        title: 'Signals',
        subtitle: 'Data surfaces issues',
        color: 'orange',
    },
    {
        icon: IconSparkles,
        title: 'Prioritize',
        subtitle: 'Ranked by impact',
        color: 'yellow',
    },
    {
        icon: IconTerminal,
        title: 'Task',
        subtitle: 'Scoped with context',
        color: 'blue',
    },
    {
        icon: IconCode,
        title: 'Execute',
        subtitle: 'Agent ships code',
        color: 'green',
    },
    {
        icon: IconEye,
        title: 'Review',
        subtitle: 'You approve',
        color: 'red',
    },
]

const BUILD_PIPELINE_STEPS: PipelineStep[] = [
    {
        icon: IconLightBulb,
        title: 'Ideas',
        subtitle: 'Engineers already have them',
        color: 'purple',
    },
    {
        icon: IconGear,
        title: 'Shape',
        subtitle: 'Plans, specs, slices',
        color: 'seagreen',
    },
    {
        icon: IconTerminal,
        title: 'Task',
        subtitle: 'Ready to run',
        color: 'blue',
    },
    {
        icon: IconCode,
        title: 'Execute',
        subtitle: 'Agent ships code',
        color: 'green',
    },
    {
        icon: IconEye,
        title: 'Review',
        subtitle: 'You approve',
        color: 'red',
    },
]

function ModePipelineProgressHeader({ steps, className = '' }: { steps: PipelineStep[]; className?: string }) {
    return (
        <div
            className={`overflow-hidden rounded-md border border-primary px-4 py-3 @md/reader-content:px-5 ${className}`}
        >
            <div className="flex min-w-0 items-center gap-0.5 @md/reader-content:gap-1">
                {steps.map((step, i) => (
                    <React.Fragment key={step.title}>
                        <div className="flex min-w-0 items-center gap-1.5 @md/reader-content:gap-2">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-sm border border-input bg-accent">
                                <step.icon className={`size-4 ${colorMap[step.color].text}`} aria-hidden />
                            </span>
                            <div className="hidden min-w-0 @md/reader-content:block">
                                <p className="m-0 text-[11px] font-semibold leading-none text-primary">{step.title}</p>
                                <p className="m-0 mt-0.5 text-[10px] leading-none text-secondary">{step.subtitle}</p>
                            </div>
                        </div>
                        {i < steps.length - 1 && (
                            <div className="flex min-w-0 flex-1 items-center px-0.5 @md/reader-content:px-1">
                                <div className="relative h-px flex-1 overflow-hidden bg-input">
                                    <div
                                        className={`absolute inset-y-0 left-0 w-1/3 animate-[shimmer-across_2s_ease-in-out_infinite] ${
                                            PIPELINE_CONNECTOR_DELAY_CLASS[i] ?? '[animation-delay:0ms]'
                                        }`}
                                    />
                                </div>
                                <IconArrowRight className="size-3 shrink-0 text-muted" aria-hidden />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

/** Reactive loop: product signals in, triage, then same ship rails as build mode. */
export function MaintenanceModePipelineHeader({ className = '' }: { className?: string }) {
    return <ModePipelineProgressHeader steps={MAINTENANCE_PIPELINE_STEPS} className={className} />
}

/** Proactive loop: your backlog and scope first, then the same task → ship → review rails. */
export function BuildModePipelineHeader({ className = '' }: { className?: string }) {
    return <ModePipelineProgressHeader steps={BUILD_PIPELINE_STEPS} className={className} />
}
