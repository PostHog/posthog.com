import React from 'react'
import * as Icons from '@posthog/icons'

const columnStyles: Record<number, string> = {
    2: 'grid-cols-1 @md:grid-cols-2',
    3: 'grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3',
}

interface SurfaceCardProps {
    icon: string
    color?: string
    title: string
    badge?: string
    url: string
    cta: string
    children: React.ReactNode
}

export const SurfaceCard = ({ icon, color = 'primary', title, badge, url, cta, children }: SurfaceCardProps) => {
    const Icon = Icons[icon] || Icons.IconInfo

    return (
        <div className="flex items-start gap-3 rounded border border-primary p-5 bg-primary">
            <Icon className={`size-6 shrink-0 text-${color} mt-0.5`} />
            <div>
                <p className="m-0 font-bold text-primary flex items-center gap-1.5">
                    {title}
                    {badge && (
                        <span className="text-2xs font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-yellow/20 text-orange">
                            {badge}
                        </span>
                    )}
                </p>
                <p className="m-0 mt-0.5 text-sm text-secondary">{children}</p>
                <a href={url} className="inline-flex items-center gap-1 mt-1.5 text-sm font-semibold">
                    {cta} →
                </a>
            </div>
        </div>
    )
}

interface SurfaceCardsProps {
    columns?: 2 | 3
    children: React.ReactNode
}

export const SurfaceCards = ({ columns = 3, children }: SurfaceCardsProps) => (
    <div className={`not-prose grid ${columnStyles[columns] || columnStyles[3]} gap-x-6 gap-y-6 my-6`}>{children}</div>
)

export default SurfaceCards
