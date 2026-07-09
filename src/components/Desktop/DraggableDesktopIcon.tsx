import React, { useEffect, useState, useRef } from 'react'
import { motion, useDragControls } from 'framer-motion'
import { AppLink, AppItem } from 'components/OSIcons/AppIcon'
import ZoomHover from 'components/ZoomHover'
import { useApp } from '../../context/App'

type Box = { left: number; top: number; right: number; bottom: number }

const toBox = (r: DOMRect | null): Box | null =>
    r ? { left: r.left, top: r.top, right: r.right, bottom: r.bottom } : null

const rectsIntersect = (a: Box, b: Box, pad = 0): boolean =>
    a.left < b.right + pad && a.right > b.left - pad && a.top < b.bottom + pad && a.bottom > b.top - pad

// How much slack to give the trash rect so dropping "near enough" still counts.
const DROP_PAD = 12

interface DraggableDesktopIconProps {
    app: AppItem
    initialPosition: { x: number; y: number }
    onPositionChange: (position: { x: number; y: number }) => void
    // This icon is the Trash: it's the drop target and can never be trashed itself.
    isTrash?: boolean
    // Trash-only: an icon is currently hovering over me → render the drop highlight.
    isDropActive?: boolean
    // The Desktop attaches its trashRef here so it can read the live trash rect.
    innerRef?: React.Ref<HTMLLIElement>
    // Non-trash icons: read the live trash rect for hit-testing.
    getTrashRect?: () => DOMRect | null
    // Non-trash icons: report when the dragged icon starts/stops overlapping the trash.
    onTrashHoverChange?: (isOver: boolean) => void
    // Non-trash icons: report a drop onto the trash.
    onDropOnTrash?: (app: AppItem) => void
}

export default function DraggableDesktopIcon({
    app,
    initialPosition,
    onPositionChange,
    isTrash = false,
    isDropActive = false,
    innerRef,
    getTrashRect,
    onTrashHoverChange,
    onDropOnTrash,
}: DraggableDesktopIconProps) {
    const [position, setPosition] = useState(initialPosition)
    const [isDragging, setIsDragging] = useState(false)
    const [hasDragged, setHasDragged] = useState(false)
    const controls = useDragControls()
    const { constraintsRef, isMobile } = useApp()

    const localRef = useRef<HTMLLIElement>(null)
    const startRectRef = useRef<Box | null>(null)
    const trashRectRef = useRef<Box | null>(null)
    const overTrashRef = useRef(false)

    useEffect(() => {
        setPosition(initialPosition)
    }, [initialPosition])

    const handleDragStart = () => {
        setIsDragging(true)
        setHasDragged(false)
        overTrashRef.current = false
        // Cache both rects once at drag start: reconstructing the moved rect from
        // info.offset avoids per-frame reflows and stays correct despite whileDrag
        // scale/rotate. The trash can't move while another icon is being dragged.
        if (!isTrash && !isMobile) {
            startRectRef.current = toBox(localRef.current?.getBoundingClientRect() ?? null)
            trashRectRef.current = toBox(getTrashRect?.() ?? null)
        }
    }

    const handleDrag = (_event: any, info: any) => {
        if (!isDragging) setIsDragging(true)
        // Mark that we've actually dragged (not just started)
        if (Math.abs(info.offset.x) > 5 || Math.abs(info.offset.y) > 5) {
            setHasDragged(true)
        }

        if (isTrash || isMobile) return
        const start = startRectRef.current
        const trash = trashRectRef.current
        if (!start || !trash) return

        const moved: Box = {
            left: start.left + info.offset.x,
            top: start.top + info.offset.y,
            right: start.right + info.offset.x,
            bottom: start.bottom + info.offset.y,
        }
        const over = rectsIntersect(moved, trash, DROP_PAD)
        // Only fire on a flip — this ref-guard is the "throttle" that avoids a
        // parent re-render on every pointer move.
        if (over !== overTrashRef.current) {
            overTrashRef.current = over
            onTrashHoverChange?.(over)
        }
    }

    const handleDragEnd = (_event: any, info: any) => {
        setIsDragging(false)

        // Dropped onto the trash: hand off to the Desktop and skip the position
        // update — the icon is about to unmount, so there's no settle animation
        // that could leave it hiding behind the bin (the original bug).
        if (!isTrash && overTrashRef.current) {
            overTrashRef.current = false
            onTrashHoverChange?.(false)
            onDropOnTrash?.(app)
            // Keep the click-vs-drag guard behavior consistent.
            setTimeout(() => {
                setHasDragged(false)
            }, 100)
            return
        }

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
            ref={isTrash ? innerRef : localRef}
            className={`absolute w-28 flex justify-center items-center ${isDragging ? 'z-50' : 'z-10'}`}
            animate={{
                x: position.x,
                y: position.y,
                scale: 1,
                opacity: 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
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
                className={`relative cursor-move transition-transform duration-150 ${isDropActive ? 'scale-110' : ''}`}
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
