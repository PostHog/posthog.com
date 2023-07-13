import cntl from 'cntl'
import { DarkModeToggle } from 'components/DarkModeToggle'
import Logo from 'components/Logo'
import { Link } from 'gatsby'
import React from 'react'

export interface CrumbProps {
    url?: string
    title: string | JSX.Element
    className?: string
    truncate?: boolean
    linkColor?: string
    onClick?: () => void
    state?: any
}

interface BreadcrumbsProps {
    crumbs?: CrumbProps[]
    darkModeToggle?: boolean
    children?: JSX.Element | JSX.Element[]
    className?: string
    linkColor?: string
    logo?: boolean
}

const crumbText = (classes = '') => cntl`
    font-bold
    py-2
    px-3
    block
    text-sm
    ${classes}
`

export function Crumb({ url, title, className = '', truncate, onClick, linkColor, state }: CrumbProps): JSX.Element {
    // If crumbs get more complex, create a conditional wrapper component to keep code DRY
    const truncateStyles: React.CSSProperties = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 200,
    }
    const style: React.CSSProperties = {
        ...(truncate ? truncateStyles : {}),
        ...((url || onClick) && linkColor ? { color: linkColor } : {}),
    }
    return (
        <li className={`text-primary dark:text-primary-dark ${className}`}>
            {url ? (
                <Link style={style} className={crumbText(`text-red hover:text-red`)} to={url} state={state}>
                    {title}
                </Link>
            ) : onClick ? (
                <button onClick={onClick} style={style} className={crumbText(`text-yellow hover:text-yellow`)}>
                    {title}
                </button>
            ) : (
                <span style={style} className={crumbText()}>
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
    linkColor,
    logo,
}: BreadcrumbsProps): JSX.Element {
    return (
        <ul className={`list-none p-0 m-0 flex ${className}`}>
            {logo && <Crumb url="/" title={<Logo className="w-5 h-4" color={linkColor} noText />} />}
            {children ||
                (crumbs &&
                    crumbs.map((crumb, index) => {
                        return <Crumb linkColor={linkColor} key={index} {...crumb} />
                    }))}
            {darkModeToggle && (
                <li className="flex ml-auto">
                    <DarkModeToggle />
                </li>
            )}
        </ul>
    )
}
