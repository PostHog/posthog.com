import React, { useState } from 'react'
import { useLocation } from '@reach/router'
import { IconLink } from '../OSIcons'
import { useToast } from '../../context/Toast'
import { createUrlWithHash } from '../../lib/utils'

export const CopyAnchor = ({ id = '', hovered }: { id: string; hovered: boolean }): JSX.Element => {
    const { addToast } = useToast()
    const { href } = useLocation()

    const handleClick = () => {
        const url = createUrlWithHash(href, id)
        navigator.clipboard.writeText(url)
        window.history.replaceState(null, '', url)
        addToast({ description: 'Copied to clipboard!' })
    }

    return (
        <span
            style={{ opacity: hovered ? '1' : '0' }}
            className="absolute left-0 top-2 -translate-x-4 @md/reader-content:-translate-x-5 @lg/reader-content:-translate-x-full pr-2 hidden xl:flex justify-center transition-opacity"
        >
            <button className="hover:opacity-100 opacity-20 transition-opacity" onClick={handleClick}>
                <IconLink className="size-4" />
            </button>
        </span>
    )
}

export const Heading = ({
    as = 'h1',
    children,
    className = '',
    id,
    hideCopy = false,
    ...other
}: {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    children: JSX.Element | string
    className: string
    id: string
    hideCopy?: boolean
}): JSX.Element => {
    const [hovered, setHovered] = useState(false)
    const Heading = as
    return (
        <Heading
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            id={id}
            className={`relative group scroll-mt-[108px] ${className}`}
            {...other}
        >
            {!hideCopy && <CopyAnchor hovered={hovered} id={id} />}
            {children}
        </Heading>
    )
}
