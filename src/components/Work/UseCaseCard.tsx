import React from 'react'

interface UseCaseCardProps {
    title: string
    badge: string
    badgeColor?: string
    before: string
    after: string
    rotation?: string
}

export function UseCaseCard({
    title,
    badge,
    badgeColor = 'bg-accent',
    before,
    after,
    rotation = 'rotate-0',
}: UseCaseCardProps) {
    return (
        <div
            className={`relative bg-primary border border-primary shadow-md p-3 pb-4 ${rotation} hover:rotate-0 hover:shadow-xl transition-all duration-200 ease-out h-full flex flex-col`}
        >
            {/* Sticky tape at top */}
            <div
                aria-hidden
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-yellow/60 dark:bg-yellow/40 rotate-1 shadow-sm pointer-events-none"
            />

            <div className="mb-3">
                <span
                    className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-sm inline-block mb-2 ${badgeColor}`}
                >
                    {badge}
                </span>
                <h3 className="text-base font-bold m-0 leading-snug">{title}</h3>
            </div>

            <div className="flex-1 flex flex-col gap-3 text-left">
                <div>
                    <p className="text-[10px] uppercase font-mono text-muted m-0 mb-1 tracking-wider">Before</p>
                    <p className="text-sm text-secondary leading-snug m-0">{before}</p>
                </div>
                <div className="relative">
                    {/* Hand-drawn-looking divider with arrow */}
                    <svg
                        aria-hidden
                        viewBox="0 0 100 12"
                        preserveAspectRatio="none"
                        className="w-full h-3 text-muted mb-1"
                    >
                        <path
                            d="M2,6 Q25,2 50,6 T98,6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeDasharray="2 2"
                        />
                        <path
                            d="M93,3 L98,6 L93,9"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <p className="text-[10px] uppercase font-mono text-green m-0 mb-1 tracking-wider">After</p>
                    <p className="text-sm text-primary leading-snug m-0 font-medium">{after}</p>
                </div>
            </div>
        </div>
    )
}
