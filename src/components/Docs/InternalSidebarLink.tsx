import { useActions } from 'kea'
import { scrollspyCaptureLogic } from 'logic/scrollspyCaptureLogic'
import React from 'react'
import { Link } from 'react-scroll'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'

export default function InternalSidebarLink({ url, name, depth, onClick, className = '', style = {} }) {
    const key = typeof window !== 'undefined' ? window.location.pathname : 'gatsby-ssr-context'
    const { reportScrollUpdated } = useActions(scrollspyCaptureLogic({ key }))
    const breakpoints = useBreakpoint()

    return (
        <span>
            <Link
                offset={breakpoints.md ? -56 : -108}
                style={style}
                smooth
                duration={300}
                to={url}
                hashSpy
                className={`relative block py-1 pl-[calc(1rem_+_${depth}rem)] pr-4 text-primary dark:text-primary-dark hover:bg-accent dark:hover:bg-accent-dark leading-tight font-medium hover:text-primary dark:hover:text-primary-dark cursor-pointer ${className} ${
                    depth === 0 && 'font-bold'
                } ${depth === 2 && 'opacity-75 hover:opacity-100'}`}
                spy
                onClick={(e) => onClick && onClick(e)}
                onSetActive={() => {
                    reportScrollUpdated(url)
                }}
                activeClass="active-sidebar-item"
            >
                {name}
            </Link>
        </span>
    )
}
