import React from 'react'
import Link from 'components/Link'
import { CircleArrow } from 'components/Icons/Icons'

export type SectionLinkProps = {
    link?: {
        url: string
        name: string
    }
    previous?: boolean
    className?: string
}

export default function SectionLink({ link, previous = false, className }: SectionLinkProps) {
    const linkClasses = previous ? 'flex-row-reverse space-x-reverse' : 'flex-row'
    const iconClasses = previous ? 'rotate-180' : ''
    return (
        <div className={className}>
            {link && (
                <Link
                    className={`whitespace-normal md:whitespace-nowrap text-[15px] flex items-center space-x-2 text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark font-bold ${linkClasses}`}
                    to={link.url}
                >
                    <span className={`w-1/2 flex-grow`}>{link.name}</span>
                    <CircleArrow className={iconClasses} />
                </Link>
            )}
        </div>
    )
}
