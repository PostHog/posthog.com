import React from 'react'
import WistiaCustomPlayer from 'components/WistiaCustomPlayer'

export interface DemoVideoHighlight {
    title: string
    description: string
}

interface DemoVideoProps {
    wistia: string
    highlights?: DemoVideoHighlight[]
    className?: string
}

export default function DemoVideo({ wistia, highlights, className = '' }: DemoVideoProps) {
    if (!wistia) return null

    return (
        <div className={`@container ${className}`}>
            <div className="rounded overflow-hidden">
                <WistiaCustomPlayer mediaId={wistia} />
            </div>

            {highlights && highlights.length > 0 && (
                <>
                    <h3>In this video...</h3>
                    <ul className="mt-6 grid grid-cols-1 @md:grid-cols-2 gap-x-6 gap-y-3 marker:text-yellow m-0">
                        {highlights.map((highlight, index) => (
                            <li key={index} className="leading-snug">
                                <strong className="text-primary">{highlight.title}</strong>{' '}
                                <span className="text-secondary">{highlight.description}</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}
