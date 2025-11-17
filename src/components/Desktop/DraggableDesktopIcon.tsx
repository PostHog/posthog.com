import React, { useEffect, useState, useRef } from 'react'
import { motion, useDragControls } from 'framer-motion'
import { AppLink, AppItem } from 'components/OSIcons/AppIcon'
import ZoomHover from 'components/ZoomHover'
import { useApp } from '../../context/App'

interface DraggableDesktopIconProps {
    app: AppItem
    initialPosition: { x: number; y: number }
    onPositionChange: (position: { x: number; y: number }) => void
}

export default function DraggableDesktopIcon({ app, initialPosition, onPositionChange }: DraggableDesktopIconProps) {
    const [position, setPosition] = useState(initialPosition)
    const [isDragging, setIsDragging] = useState(false)
    const [hasDragged, setHasDragged] = useState(false)
    const controls = useDragControls()
    const { constraintsRef, isMobile } = useApp()

    useEffect(() => {
        setPosition(initialPosition)
    }, [initialPosition])

    const handleDragStart = () => {
        setIsDragging(true)
        setHasDragged(false)
    }

    const handleDrag = (_event: any, info: any) => {
        if (!isDragging) setIsDragging(true)
        // Mark that we've actually dragged (not just started)
        if (Math.abs(info.offset.x) > 5 || Math.abs(info.offset.y) > 5) {
            setHasDragged(true)
        }
    }

    const handleDragEnd = (_event: any, info: any) => {
        setIsDragging(false)
        if (!constraintsRef.current) return

        const bounds = constraintsRef.current.getBoundingClientRect()
        const newX = position.x + info.offset.x
        const newY = position.y + info.offset.y

        // Keep icon within bounds
        const iconWidth = 112 // w-28 = 112px
        const iconHeight = 90 // approximate height
        const maxX = bounds.width - iconWidth
        const maxY = bounds.height - iconHeight

        const constrainedPosition = {
            x: Math.max(0, Math.min(maxX, newX)),
            y: Math.max(0, Math.min(maxY, newY)),
        }

        setPosition(constrainedPosition)
        onPositionChange(constrainedPosition)

        // Reset drag state after a short delay to prevent click
        setTimeout(() => {
            setHasDragged(false)
        }, 100)
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        // Prevent default to avoid text selection
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <motion.li
            className={`absolute w-28 flex justify-center items-center ${isDragging ? 'z-50' : 'z-10'}`}
            animate={{
                x: position.x,
                y: position.y,
                scale: 1,
                opacity: 1,
            }}
            drag={!isMobile}
            dragControls={!isMobile ? controls : undefined}
            dragListener={false}
            dragMomentum={false}
            dragConstraints={constraintsRef}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onMouseDown={handleMouseDown}
            whileDrag={{ scale: 1.1, rotate: 2 }}
            initial={{ x: position.x, y: position.y }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            <div
                className="relative cursor-move"
                onPointerDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    controls.start(e)
                }}
            >
                <ZoomHover>
                    <AppLink {...app} hasDragged={hasDragged} />
                </ZoomHover>
            </div>
        </motion.li>
    )
}
