import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from '@reach/router'
import { IconLink } from '../OSIcons'
import Link from 'components/Link'

export const CopyAnchor = ({ id = '', hovered }: { id: string; hovered: boolean }): JSX.Element => {
    const [visible, setVisible] = useState(false)
    const location = useLocation()
    const relativeUrl = `${location.pathname}#${id}`
    const absoluteUrl =
        typeof window !== 'undefined'
            ? `${window.location.origin}${location.pathname}#${id}`
            : `${location.pathname}#${id}`

    const handleClick = (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        navigator.clipboard.writeText(absoluteUrl)
        setVisible(true)
        setTimeout(() => {
            setVisible(false)
        }, 1000)
    }

    return (
        <span
            style={{ opacity: hovered || visible ? '1' : '0' }}
            className="absolute left-0 top-2 -translate-x-4 @md/reader-content:-translate-x-5 @lg/reader-content:-translate-x-full pr-2 hidden xl:flex justify-center transition-opacity"
        >
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ position: 'absolute', translateY: '-50%', opacity: 0 }}
                        animate={{ translateY: '-120%', opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <span className="text-sm">Copied!</span>
                    </motion.div>
                )}
            </AnimatePresence>
            <Link to={relativeUrl} className="hover:opacity-100 opacity-20 transition-opacity" onClick={handleClick}>
                <IconLink className="size-4" />
            </Link>
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
