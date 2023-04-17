import { RightArrow } from 'components/Icons'
import Link from 'components/Link'
import { usePost } from './hooks'
import React from 'react'
import { ICrumb } from './types'

export const Crumbs = ({ crumbs, className = '' }: { crumbs: ICrumb[]; className?: string }) => {
    return (
        <ul className={`list-none p-0 m-0 whitespace-nowrap overflow-auto flex ${className}`}>
            {crumbs.map(({ name, url }, index) => {
                return (
                    <li
                        key={index}
                        className={`after:mx-2 after:text-gray-accent-light last:after:hidden after:content-["/"]`}
                    >
                        <Link to={url}>{name}</Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default function Breadcrumb() {
    const { breadcrumb: crumbs } = usePost()
    if (!crumbs) return null
    const last = crumbs[crumbs.length - 1]
    return (
        <>
            <Crumbs crumbs={crumbs} className="sm:flex hidden" />
            <Link className="sm:hidden flex space-x-1 items-center" to={last.url}>
                <span>
                    <RightArrow className="transform -scale-x-1 w-5 h-5" />
                </span>
                <span>{last.name}</span>
            </Link>
        </>
    )
}
