import React, { useEffect, useRef, useState } from 'react'
import { apps, productLinks } from '.'
import { AppItem, AppLink } from 'components/OSIcons/AppIcon'
import { motion } from 'framer-motion'
import { useApp } from '../../context/App'

const Folder = ({
    items,
    label,
    onOpen,
    open,
}: {
    items: AppItem[]
    label: string
    onOpen: (label: string | null) => void
    open: boolean
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const updatePosition = () => {
            if (!ref.current) return
            setPosition({
                x: ref.current.getBoundingClientRect().left + ref.current.getBoundingClientRect().width / 2,
                y: ref.current.getBoundingClientRect().height,
            })
        }
        updatePosition()
        window.addEventListener('resize', updatePosition)
        return () => window.removeEventListener('resize', updatePosition)
    }, [])

    return (
        <button onClick={() => onOpen(open ? null : label)}>
            <div
                ref={ref}
                className={`aspect-square rounded-md border ${
                    open ? 'border-blue' : 'border-primary'
                } bg-white relative flex items-center justify-center`}
            >
                <ul className="m-0 list-none grid grid-cols-2  p-1">
                    {items.slice(0, 4).map((item) => (
                        <li key={item.label} className="aspect-square size-full flex items-center justify-center">
                            {item.Icon}
                        </li>
                    ))}
                </ul>
            </div>
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0,
                    translateY: '-100%',
                }}
                animate={{
                    opacity: open ? 1 : 0,
                    scale: open ? 1 : 0,
                    translateY: open ? '-100%' : 0,
                    transformOrigin: `${position.x}px ${position.y}px`,
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-full px-2 py-1"
            >
                <ul className="m-0 list-none grid grid-cols-3 gap-4 rounded-md border border-primary bg-white p-4">
                    {items.map((item) => (
                        <li key={item.label}>
                            <AppLink {...item} />
                        </li>
                    ))}
                </ul>
            </motion.div>
            <h3 className={`text-xs text-secondary mt-0.5 ${open ? 'font-semibold' : 'font-normal'} m-0`}>{label}</h3>
        </button>
    )
}

export default function Dock() {
    const [openFolder, setOpenFolder] = useState<string | null>(null)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpenFolder(null)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    return (
        <div ref={ref} data-scheme="primary" className="w-full p-1 z-10 relative z-50">
            <div className="bg-accent w-full rounded-md border border-primary p-2 grid grid-cols-5 gap-2">
                <Folder label="Products" items={productLinks} onOpen={setOpenFolder} open={openFolder === 'Products'} />
                <Folder label="Apps" items={apps} onOpen={setOpenFolder} open={openFolder === 'Apps'} />
            </div>
        </div>
    )
}
