import cntl from 'cntl'
import { DarkModeToggle } from 'components/DarkModeToggle'
import { Link } from 'gatsby'
import React from 'react'

export interface CrumbProps {
    url?: string
    title: string
    className?: string
    truncate?: boolean
}

interface BreadcrumbsProps {
    crumbs?: CrumbProps[]
    darkModeToggle?: boolean
    children?: JSX.Element | JSX.Element[]
    className?: string
}

const crumbText = (classes = '') => cntl`
    font-bold
    py-2
    px-3
    block
    text-xs
    ${classes}
`

export function Crumb({ url, title, className = '', truncate }: CrumbProps): JSX.Element {
    // If crumbs get more complex, create a conditional wrapper component to keep code DRY
    const truncateStyles: React.CSSProperties = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 200,
    }
    return (
        <li
            className={`border-r border-gray-accent-light dark:border-gray-accent-dark border-dashed text-primary dark:text-primary-dark ${className}`}
        >
            {url ? (
                <Link style={truncate ? truncateStyles : {}} className={crumbText(`text-red hover:text-red`)} to={url}>
                    {title}
                </Link>
            ) : (
                <span style={truncate ? truncateStyles : {}} className={crumbText()}>
                    {title}
                </span>
            )}
        </li>
    )
}

export default function Breadcrumbs({
    crumbs,
    darkModeToggle,
    children,
    className = '',
}: BreadcrumbsProps): JSX.Element {
    return (
        <ul
            className={`list-none p-0 m-0 flex border-gray-accent-light dark:border-gray-accent-dark border-dashed border-t border-b ${className}`}
        >
            {children ||
                (crumbs &&
                    crumbs.map((crumb, index) => {
                        return <Crumb key={index} {...crumb} />
                    }))}
            {darkModeToggle && (
                <li className="flex ml-auto border-l border-gray-accent-light dark:border-gray-accent-dark border-dashed">
                    <DarkModeToggle />
                </li>
            )}
        </ul>
    )
}
