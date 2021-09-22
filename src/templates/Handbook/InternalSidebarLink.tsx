import React from 'react'
import { useActions } from 'kea'
import { scrollspyCaptureLogic } from 'logic/scrollspyCaptureLogic'
import { Link } from 'react-scroll'

interface InternalSidebarLinkProps {
    url: string
    name: string
    className?: string
    style?: React.CSSProperties
}

export default function InternalSidebarLink({
    url,
    name,
    className = '',
    style = {},
}: InternalSidebarLinkProps): JSX.Element {
    const key = typeof window !== 'undefined' ? window.location.pathname : 'gatsby-ssr-context'
    const { reportScrollUpdated } = useActions(scrollspyCaptureLogic({ key }))
    return (
        <Link
            style={style}
            offset={-50}
            smooth
            duration={300}
            to={url}
            hashSpy
            className={`text-almost-black hover:text-orange dark:text-white dark:hover:text-orange ${className}`}
            spy
            onSetActive={() => {
                reportScrollUpdated(url)
            }}
        >
            {name}
        </Link>
    )
}
