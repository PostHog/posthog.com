import { useActions } from 'kea'
import { scrollspyCaptureLogic } from 'logic/scrollspyCaptureLogic'
import React from 'react'
import { Link } from 'react-scroll'

export default function InternalSidebarLink({ url, name, depth, onClick, className = '', style = {} }) {
    const key = typeof window !== 'undefined' ? window.location.pathname : 'gatsby-ssr-context'
    const { reportScrollUpdated } = useActions(scrollspyCaptureLogic({ key }))
    // Remove HTML tags from the name and trim
    const cleanName = name.replace(/<[^>]*>[\w\d\s]*<\/[^>]*>/gm, '').trim()

    if (cleanName !== name) {
        console.warn('Sidebar link name contains HTML tags. These will be stripped from the final heading.', url, name)
    }

    return (
        <span className="block" style={{ marginLeft: `${depth / 1.5}rem` }}>
            <Link
                style={style}
                offset={-50}
                smooth
                duration={300}
                to={url}
                hashSpy
                className={`text-almost-black leading-tight font-medium hover:text-red dark:text-white dark:hover:text-red cursor-pointer ${className}`}
                spy
                onClick={(e) => onClick && onClick(e)}
                onSetActive={() => {
                    reportScrollUpdated(url)
                }}
            >
                {cleanName}
            </Link>
        </span>
    )
}
