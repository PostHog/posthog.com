import React from 'react'
import Link from 'components/Link'
import { CircleArrow } from 'components/Icons/Icons'

type LinkType = { url: string; name: string }

interface SectionLinkProps {
    link?: LinkType
    previous?: boolean
    className?: string
}

export default function SectionLink({ link, previous = false, className }: SectionLinkProps): JSX.Element {
    const linkClasses = previous ? 'flex-row-reverse space-x-reverse' : 'flex-row'
    const iconClasses = previous ? 'transform rotate-180' : ''
    return (
        <div className={className}>
            {link && (
                <Link
                    className={`whitespace-nowrap text-[15px] flex items-center space-x-2 text-almost-black hover:text-almost-black dark:text-white dark:hover:text-white font-bold ${linkClasses}`}
                    to={link.url}
                >
                    <span>{link.name}</span>
                    <CircleArrow className={iconClasses} />
                </Link>
            )}
        </div>
    )
}
