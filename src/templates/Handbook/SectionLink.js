import React from 'react'
import Link from 'components/Link'
import { CircleArrow } from 'components/Icons/Icons'

export default function SectionLink({ link, iconClass, className }) {
    return (
        <div className={className}>
            {link && (
                <Link
                    className={`text-[15px] space-x-2 flex items-center text-almost-black hover:text-almost-black dark:text-white dark:hover:text-white font-bold ${className}`}
                    to={link.url}
                >
                    <span>{link.name}</span>
                    <CircleArrow className={iconClass} />
                </Link>
            )}
        </div>
    )
}
