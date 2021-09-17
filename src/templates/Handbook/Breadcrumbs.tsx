import React from 'react'
import { Link } from 'gatsby'

interface BreadcrumbEntry {
    name: string
    url?: string
}

const Crumb = ({ crumb: { name, url } }: { crumb: BreadcrumbEntry }): JSX.Element => {
    const classes = 'mr-1 md:mr-2'
    return (
        <li className="flex items-center text-xs md:text-base">
            {url ? (
                <Link
                    className={`${classes} dark:text-[#765494] text-gray-accent-dark hover:text-almost-black `}
                    to={url}
                >
                    {name}
                </Link>
            ) : (
                <div className={classes}>{name}</div>
            )}
        </li>
    )
}

interface BreadcrumbsProps {
    crumbs: BreadcrumbEntry[]
    base: BreadcrumbEntry
}

export default function Breadcrumbs({ crumbs, base }: BreadcrumbsProps): JSX.Element {
    return (
        <ul className="dark:text-[#765494] text-gray-2 list-none p-0 m-0 flex font-semibold space-x-2 mb-2 md:absolute -top-7 breadcrumbs-container">
            {base && <Crumb crumb={base} />}
            {crumbs.map((crumb, index) => {
                return <Crumb key={index} crumb={crumb} />
            })}
        </ul>
    )
}
