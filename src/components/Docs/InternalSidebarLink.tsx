import { useActions } from 'kea'
import { scrollspyCaptureLogic } from 'logic/scrollspyCaptureLogic'
import React from 'react'
import { Link } from 'react-scroll'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { useLayoutData } from 'components/Layout/hooks'

export default function InternalSidebarLink({ url, name, depth, onClick, className = '', style = {} }) {
    const key = typeof window !== 'undefined' ? window.location.pathname : 'gatsby-ssr-context'
    const { reportScrollUpdated } = useActions(scrollspyCaptureLogic({ key }))
    const breakpoints = useBreakpoint()
    const { compact } = useLayoutData()

    return (
        <span>
            <Link
                offset={compact ? -70 : breakpoints.md ? -56 : -108}
                style={{ ...style, ...{ paddingLeft: `${(depth || 0) + 1}rem` } }}
                smooth
                duration={300}
                to={url}
                hashSpy
                className={`relative block py-1 pr-4 text-primary dark:text-primary-dark hover:bg-accent dark:hover:bg-accent-dark leading-tight font-medium hover:text-primary dark:hover:text-primary-dark cursor-pointer ${className} ${
                    depth === 0 ? 'font-semibold' : ''
                }`}
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
