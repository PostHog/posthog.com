import { IconImage } from '@posthog/icons'
import Link from 'components/Link'
import type { MuseumExhibitSummary, MuseumMedia } from 'hooks/useMuseum'
import React from 'react'
import { formatExhibitDate } from './utils'

// An artwork frame: a thick border with a mat around the image. Used for grid tiles and the detail hero.
export const ExhibitFrame = ({
    image,
    alt,
    className = '',
    imageClassName = 'aspect-[4/3] object-contain',
    children,
}: {
    image?: MuseumMedia | null
    alt: string
    className?: string
    imageClassName?: string
    children?: React.ReactNode
}): JSX.Element => (
    <div
        className={`rounded-sm border-[6px] border-primary bg-primary p-2 shadow-[0_6px_12px_rgba(0,0,0,0.18)] @md:p-3 ${className}`}
    >
        <div className="border border-primary bg-accent">
            {children ||
                (image?.url ? (
                    <img
                        src={image.url}
                        alt={image.alternativeText || alt}
                        loading="lazy"
                        className={`block w-full ${imageClassName}`}
                    />
                ) : (
                    <div className={`flex w-full items-center justify-center text-muted ${imageClassName}`}>
                        <IconImage className="size-10" />
                    </div>
                ))}
        </div>
    </div>
)

// The small placard next to an artwork: title, date, and what kind of thing it is
export const ExhibitPlaque = ({
    exhibit,
    className = '',
}: {
    exhibit: MuseumExhibitSummary
    className?: string
}): JSX.Element => {
    const kind = exhibit.type?.name || exhibit.category?.name
    const date = formatExhibitDate(exhibit.date, exhibit.datePrecision)
    return (
        <div className={`rounded-sm border border-primary bg-primary px-3 py-2 text-left ${className}`}>
            <h3 className="m-0 text-sm font-bold leading-snug line-clamp-2 underline decoration-transparent transition-colors duration-200 group-hover:decoration-current">
                {exhibit.title}
            </h3>
            <p className="m-0 mt-1 text-xs text-secondary">{[date, kind].filter(Boolean).join(' · ')}</p>
        </div>
    )
}

export default function ExhibitCard({ exhibit }: { exhibit: MuseumExhibitSummary }): JSX.Element {
    return (
        <Link
            to={`/museum/${exhibit.slug}`}
            state={{ newWindow: true }}
            className="group block no-underline text-primary"
        >
            <ExhibitFrame
                image={exhibit.heroImage}
                alt={exhibit.title}
                className="transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.25)]"
            />
            <ExhibitPlaque exhibit={exhibit} className="mx-auto mt-3 w-[85%]" />
        </Link>
    )
}
