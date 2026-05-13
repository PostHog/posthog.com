import React from 'react'

interface UseCaseCardProps {
    title: string
    badge: string
    badgeColor?: string
    description: string
    taskSnippet: string
}

export function UseCaseCard({ title, badge, badgeColor = 'bg-accent', description, taskSnippet }: UseCaseCardProps) {
    return (
        <div className="border border-primary rounded-sm p-4 flex flex-col gap-3 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md bg-primary h-full">
            <div>
                <span
                    className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-sm inline-block mb-2 ${badgeColor}`}
                >
                    {badge}
                </span>
                <h3 className="text-base font-bold mb-1 leading-snug">{title}</h3>
                <p className="text-sm text-secondary leading-snug m-0">{description}</p>
            </div>
            <pre className="text-xs font-mono bg-accent border border-primary rounded-sm p-3 leading-relaxed whitespace-pre-wrap m-0 flex-1 text-secondary">
                {taskSnippet}
            </pre>
        </div>
    )
}
