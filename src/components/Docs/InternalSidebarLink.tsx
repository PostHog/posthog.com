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
        <span className="block" style={{ marginLeft: `${depth / 1.5}rem` }}>
            <Link
                offset={breakpoints.md ? -56 : -108}
                style={style}
                smooth
                duration={300}
                to={url}
                hashSpy
                className={`text-primary dark:text-primary-dark leading-tight font-medium hover:text-red dark:hover:text-red cursor-pointer ${className}`}
                spy
                onClick={(e) => onClick && onClick(e)}
                onSetActive={() => {
                    reportScrollUpdated(url)
                }}
            >
                {name}
            </Link>
        </span>
    )
}
