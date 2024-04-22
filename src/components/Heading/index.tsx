import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from '@reach/router'

const CopyAnchor = ({ id = '', hovered }: { id: string; hovered: boolean }) => {
    const [visible, setVisible] = useState(false)
    const { href } = useLocation()
    const handleClick = () => {
        const url = `${href.replace(/#.*/, '')}#${id}`
        navigator.clipboard.writeText(url)
        setVisible(true)
        setTimeout(() => {
            setVisible(false)
        }, 1000)
    }

    return (
        <span
            style={{ opacity: hovered || visible ? '1' : '0' }}
            className="absolute left-0 top-1/2 -translate-x-full pr-2 -translate-y-1/2 hidden xl:flex justify-center transition-opacity"
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                </svg>
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
