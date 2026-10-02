import Link from 'components/Link'
import React from 'react'

export default function MuseumCard({
    to,
    image,
    title,
    meta,
    newWindow = false,
    children,
}: {
    to: string
    image?: string
    title: string
    meta?: string
    newWindow?: boolean
    children?: React.ReactNode
}): JSX.Element {
    return (
        <Link
            to={to}
            state={newWindow ? { newWindow: true } : undefined}
            data-scheme="secondary"
            className="group flex h-full flex-col overflow-hidden rounded-md border border-primary bg-primary text-primary no-underline transition-transform duration-200 hover:-translate-y-0.5 hover:-rotate-1 hover:shadow-lg"
        >
            {/* Absolute so tall images crop to 16:9 instead of stretching the box */}
            <div className="relative aspect-video border-b border-primary bg-accent">
                {image && <img src={image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />}
            </div>
            <div className="p-3">
                <h3 className="m-0 text-base font-semibold leading-snug line-clamp-2">{title}</h3>
                {meta && <p className="m-0 mt-1 text-sm text-secondary">{meta}</p>}
                {children}
            </div>
        </Link>
    )
}
