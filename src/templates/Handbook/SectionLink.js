import React from 'react'
import Link from 'components/Link'
import { CircleArrow } from 'components/Icons/Icons'

export default function SectionLink({ link, previous, className }) {
    const linkClasses = previous ? 'flex-row-reverse space-x-reverse' : 'flex-row'
    const iconClasses = previous ? 'transform rotate-180' : ''
    return (
        <div className={className}>
            {link && (
                <Link
                    className={`whitespace-normal md:whitespace-nowrap text-[15px] flex items-center space-x-2 text-almost-black hover:text-almost-black dark:text-white dark:hover:text-white font-bold ${linkClasses}`}
                    to={link.url}
                >
                    <span className={`w-1/2 flex-grow`}>{link.name}</span>
                    <CircleArrow className={iconClasses} />
                </Link>
            )}
        </div>
    )
}
