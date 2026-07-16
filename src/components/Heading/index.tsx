import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from '@reach/router'
import { IconLink } from '../OSIcons'

export const CopyAnchor = ({ id = '', hovered }: { id: string; hovered: boolean }): JSX.Element => {
    const [visible, setVisible] = useState(false)
    const { href } = useLocation()
    const handleClick = () => {
        const url = `${href.replace(/#.*/, '')}#${id}`
        window.history.replaceState(null, '', `#${id}`)
        navigator.clipboard.writeText(url)
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
            <button className="hover:opacity-100 opacity-20 transition-opacity" onClick={handleClick}>
                <IconLink className="size-4" />
            </button>
        </span>
    )
}

export const AdvisoryAnchor = ({ id = '' }: { id: string }): JSX.Element => {
    const [copied, setCopied] = useState(false)
    const { href } = useLocation()
    // Copy the shareable link without toggling the parent <details>. Stopping propagation and
    // the default action keeps the surrounding <summary> from opening/closing on click.
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        const url = `${href.replace(/#.*/, '')}#${id}`
        window.history.replaceState(null, '', `#${id}`)
        navigator.clipboard?.writeText(url)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }

    return (
        <span className="inline-flex items-center align-middle">
            <button
                type="button"
                onClick={handleClick}
                aria-label="Copy link to this advisory"
                title="Copy link to this advisory"
                className="inline-flex opacity-40 hover:opacity-100 transition-opacity ml-2"
            >
                <IconLink className="size-4" />
            </button>
            {copied && <span className="ml-1.5 text-sm font-normal">Copied!</span>}
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
