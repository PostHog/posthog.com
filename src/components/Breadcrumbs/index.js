import cntl from 'cntl'
import { DarkModeToggle } from 'components/DarkModeToggle'
import { Link } from 'gatsby'
import React from 'react'

const crumbText = (classes = '') => cntl`
    font-bold
    py-2
    px-3
    block
    text-xs
    ${classes}
`

function Crumb({ url, title, className }) {
    // If crumbs get more complex, create a conditional wrapper component to keep code DRY
    return (
        <li
            className={`border-r border-gray-accent-light dark:border-gray-accent-dark border-dashed text-primary dark:text-primary-dark ${className}`}
        >
            {url ? (
                <Link className={crumbText(`text-yellow hover:text-yellow`)} to={url}>
                    {title}
                </Link>
            ) : (
                <span className={crumbText()}>{title}</span>
            )}
        </li>
    )
}

export default function Breadcrumbs({ crumbs, darkModeToggle }) {
    return (
        <ul className="list-none p-0 m-0 flex border-gray-accent-light dark:border-gray-accent-dark border-dashed border-t border-b">
            {crumbs &&
                crumbs.map((crumb, index) => {
                    return <Crumb key={index} {...crumb} />
                })}
            {darkModeToggle && (
                <li className="flex ml-auto border-l border-gray-accent-light dark:border-gray-accent-dark border-dashed">
                    <DarkModeToggle />
                </li>
            )}
        </ul>
    )
}
