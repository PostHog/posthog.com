import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import useSWR from 'swr'
import { Popover } from 'components/RadixUI/Popover'
import { Dialog as RadixDialog } from 'radix-ui'
import { IconX } from '@posthog/icons'
import KeyboardShortcut from 'components/KeyboardShortcut'
import { useUser } from 'hooks/useUser'
import PeelSticker from './PeelSticker'
import { Sticker, StickerArtwork } from './stickers'
import { Laptop, PlacementRequest, laptopRequest } from './api'
import {
    constrainPlacement,
    fitLaptopWidth,
    getPeelStack,
    getPeelBounds,
    LAPTOP_ASPECT_RATIO,
    LID_ASPECT_RATIO,
    MAX_STICKERS,
    moveStickerPointer,
    Placement,
} from './layout'

type HeldSticker = {
    placement: Placement
    phase: 'peeling' | 'holding' | 'pressing' | 'saving' | 'failed'
}

export default function LaptopMode({ active, profileId }: { active: boolean; profileId: number }) {
    const { user, getJwt } = useUser()
    const isOwner = user?.profile?.id === profileId
    const {
        data: laptop,
        error: loadError,
        mutate: refreshLaptop,
    } = useSWR<Laptop>(active ? ['laptop', profileId] : null, () =>
        laptopRequest<Laptop>(`profiles/${profileId}/laptop`)
    )
    const {
        data: library,
        error: libraryError,
        mutate: refreshLibrary,
    } = useSWR<Sticker[]>(active && isOwner ? ['stickers', user.id] : null, async () =>
        laptopRequest<Sticker[]>('me/stickers', await getJwt())
    )
    const placements = laptop?.placements || []
    const stickerCount = placements.filter((placement) => !placement.removedAt).length
    const maxStickers = laptop?.maxStickers || MAX_STICKERS
    const [lidWidth, setLidWidth] = useState(700)
    const [viewWidth, setViewWidth] = useState(0)
    const [rotating, setRotating] = useState(false)
    const [saveError, setSaveError] = useState('')
    const [viewedStickerId, setViewedStickerId] = useState<number | null>(null)
    const pendingSave = useRef<PlacementRequest | null>(null)
    const saving = useRef(false)
    const mounted = useRef(true)
    const [held, setHeld] = useState<HeldSticker | null>(null)
    const [removing, setRemoving] = useState<{ id: number; phase: 'peeling' | 'saving' | 'failed' } | null>(null)
    const peelStack = useMemo(() => (removing ? getPeelStack(placements, removing.id) : []), [laptop, removing?.id])
    const peelBounds = peelStack.length ? getPeelBounds(peelStack) : null
    const peelLayers = useMemo(() => {
        if (!peelBounds) return []
        return peelStack
            .filter((p) => p.sticker)
            .map((p) => ({
                sticker: p.sticker!,
                x: 0.5 + (p.x - peelBounds.x) / peelBounds.size,
                y: 0.5 + (p.y - peelBounds.y) / LID_ASPECT_RATIO / peelBounds.size,
                size: p.size / peelBounds.size,
                rotation: p.rotation,
            }))
    }, [peelStack])
    const peelingIds = new Set(peelStack.map((p) => p.id))
    const [removalError, setRemovalError] = useState('')
    const pendingRemoval = useRef<number | null>(null)
    const pressClick = useRef(false)
    const pressAnimation = useRef<{ stop: () => void } | null>(null)
    const [pressPosition, setPressPosition] = useState({ x: 0, y: 0 })
    const pressProgress = useMotionValue(0)
    const pressRotateX = useTransform(pressProgress, [0, 1], [18, 0])
    const pressRotateY = useTransform(pressProgress, [0, 1], [-12, 0])
    const pressLift = useTransform(pressProgress, [0, 1], [-10, 0])
    const pressScale = useTransform(pressProgress, [0, 1], [1.08, 1])
    const pressShadow = useTransform(
        pressProgress,
        [0, 1],
        ['drop-shadow(8px 14px 6px rgba(0,0,0,0.25))', 'drop-shadow(0px 1px 1px rgba(0,0,0,0.18))']
    )
    const lid = useRef<HTMLDivElement>(null)
    const viewport = useRef<HTMLElement>(null)
    const workspace = useRef<HTMLDivElement>(null)
    const lastPointer = useRef({ x: 0, y: 0 })
    const returnFocus = useRef<HTMLDivElement | null>(null)
    const cursorX = useMotionValue(0)
    const cursorY = useMotionValue(0)
    const reducedMotion = useReducedMotion()
    const pinned = held && ['pressing', 'saving', 'failed'].includes(held.phase)
    const heldWidth = lidWidth * (held?.placement.size || 0)
    const groups = Array.from(new Set(library?.map((sticker) => sticker.collection?.id)))
        .map((id) => ({
            collection: library?.find((sticker) => sticker.collection?.id === id)?.collection,
            stickers: library?.filter((sticker) => sticker.collection?.id === id) || [],
        }))
        .sort((a, b) => (a.collection?.position || 0) - (b.collection?.position || 0))

    useEffect(() => {
        const element = lid.current
        if (!element) return
        const observer = new ResizeObserver(() => {
            if (element.clientWidth > 0) setLidWidth(element.clientWidth)
        })
        observer.observe(element)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const element = workspace.current
        if (!element || isOwner) return
        const resize = () => setViewWidth(fitLaptopWidth(element.clientWidth, element.clientHeight))
        const observer = new ResizeObserver(resize)
        resize()
        observer.observe(element)
        return () => observer.disconnect()
    }, [isOwner])

    const cancel = () => {
        if (pendingSave.current || pendingRemoval.current) return
        setHeld(null)
        setRemoving(null)
        pressAnimation.current?.stop()
        pressAnimation.current = null
        pressProgress.set(0)
        window.requestAnimationFrame(() => {
            if (removing) lid.current?.focus({ preventScroll: true })
            else returnFocus.current?.querySelector('button')?.focus({ preventScroll: true })
        })
    }

    useEffect(() => {
        if (!isOwner) {
            pendingSave.current = null
            pendingRemoval.current = null
            setSaveError('')
            setRemovalError('')
        }
        if ((!active || !isOwner) && !pendingRemoval.current) setRemoving(null)
        if ((!active || !isOwner) && !pendingSave.current) {
            setHeld(null)
            pressAnimation.current?.stop()
            pressAnimation.current = null
            pressProgress.set(0)
        }
    }, [active, isOwner])

    useEffect(() => {
        mounted.current = true
        return () => {
            mounted.current = false
            pressAnimation.current?.stop()
        }
    }, [])

    const finishPeel = (keyboard: boolean) => {
        if (keyboard && held && lid.current) {
            const bounds = lid.current.getBoundingClientRect()
            cursorX.set(bounds.left + bounds.width * held.placement.x)
            cursorY.set(bounds.top + bounds.height * held.placement.y)
        }
        setHeld((current) => (current ? { ...current, phase: 'holding' } : null))
        window.requestAnimationFrame(() => lid.current?.focus({ preventScroll: true }))
    }

    const releasePress = () => {
        if (!pressAnimation.current) return
        pressAnimation.current.stop()
        pressAnimation.current = null
        pressProgress.set(0)
        setHeld((current) => (current?.phase === 'pressing' ? { ...current, phase: 'holding' } : current))
    }

    useEffect(() => {
        setRotating(false)
        if (!held && !removing) return
        const move = (event: PointerEvent) => {
            if (!held) return
            const pointer = { x: event.clientX, y: event.clientY }
            const previous = lastPointer.current
            lastPointer.current = pointer
            if (held.phase === 'peeling') {
                cursorX.set(pointer.x)
                cursorY.set(pointer.y)
                return
            }
            if (held.phase !== 'holding') return
            const next = moveStickerPointer({ x: cursorX.get(), y: cursorY.get() }, previous, pointer, event.shiftKey)
            setRotating(event.shiftKey)
            if (next.rotationDelta) {
                setHeld((current) =>
                    current?.phase === 'holding'
                        ? {
                              ...current,
                              placement: {
                                  ...current.placement,
                                  rotation: current.placement.rotation + next.rotationDelta,
                              },
                          }
                        : current
                )
            }
            cursorX.set(next.x)
            cursorY.set(next.y)
        }
        const key = (event: KeyboardEvent) => {
            if (event.key === 'Shift' && held?.phase === 'holding') setRotating(true)
            if (event.key === 'Escape') {
                event.preventDefault()
                event.stopPropagation()
                cancel()
            }
        }
        const keyUp = (event: KeyboardEvent) => {
            if (event.key === 'Shift') setRotating(false)
        }
        const blur = () => {
            setRotating(false)
            releasePress()
        }
        window.addEventListener('blur', blur)
        window.addEventListener('pointermove', move)
        window.addEventListener('keydown', key, true)
        window.addEventListener('keyup', keyUp)
        return () => {
            window.removeEventListener('blur', blur)
            window.removeEventListener('pointermove', move)
            window.removeEventListener('keydown', key, true)
            window.removeEventListener('keyup', keyUp)
        }
    }, [held?.phase, Boolean(removing)])

    const pickUp = (event: React.MouseEvent<HTMLButtonElement>, sticker: Sticker) => {
        event.stopPropagation()
        if (
            !isOwner ||
            !sticker.unlocked ||
            !laptop ||
            loadError ||
            held ||
            removing ||
            stickerCount >= maxStickers ||
            !lid.current
        )
            return
        const source = event.currentTarget.querySelector('svg, img') || event.currentTarget
        const bounds = source.getBoundingClientRect()
        const keyboard = event.detail === 0
        cursorX.set(keyboard ? bounds.left + bounds.width / 2 : event.clientX)
        cursorY.set(keyboard ? bounds.top + bounds.height / 2 : event.clientY)
        lastPointer.current = { x: cursorX.get(), y: cursorY.get() }
        returnFocus.current = event.currentTarget.parentElement as HTMLDivElement
        if (viewport.current) viewport.current.scrollTop = 0
        setSaveError('')
        pressProgress.set(0)
        setHeld({
            placement: {
                id: 0,
                sticker,
                x: 0.5,
                y: 0.5,
                rotation: 0,
                size: sticker.size,
            },
            phase: 'peeling',
        })
    }

    const removePlacement = async () => {
        if (!isOwner || !removing || saving.current) return
        const id = removing.id
        pendingRemoval.current = id
        saving.current = true
        setRemovalError('')
        setRemoving({ id, phase: 'saving' })
        try {
            const token = await getJwt()
            if (!token) throw Object.assign(new Error('Sign in again to remove this sticker.'), { status: 401 })
            const removed = await laptopRequest<Placement>(`me/laptop/stickers/${id}/remove`, token, {})
            await refreshLaptop(
                (current) =>
                    current && {
                        ...current,
                        placements: current.placements.map((placement) =>
                            peelingIds.has(placement.id) ? { ...placement, removedAt: removed.removedAt } : placement
                        ),
                    },
                false
            )
            void refreshLaptop()
            pendingRemoval.current = null
            if (mounted.current) {
                setRemoving(null)
                lid.current?.focus({ preventScroll: true })
            }
        } catch (error) {
            if (mounted.current) {
                const status = (error as { status?: number }).status
                const rejected = status && status >= 400 && status < 500
                setRemovalError(
                    error instanceof Error && !(error instanceof TypeError) && error.name !== 'TimeoutError'
                        ? error.message
                        : 'Check your connection and try again.'
                )
                if (rejected) {
                    pendingRemoval.current = null
                    setRemoving(null)
                    void refreshLaptop()
                } else setRemoving({ id, phase: 'failed' })
            }
        } finally {
            saving.current = false
        }
    }

    const savePlacement = async () => {
        const request = pendingSave.current
        if (!request || saving.current) return
        saving.current = true
        setSaveError('')
        setHeld((current) => (current ? { ...current, phase: 'saving' } : null))
        try {
            const token = await getJwt()
            if (!token) throw new Error('Sign in again to save this sticker.')
            const saved = await laptopRequest<Placement>('me/laptop/stickers', token, request)
            await refreshLaptop(
                (current) => ({
                    placements: [
                        ...(current?.placements || []).filter((placement) => placement.id !== saved.id),
                        saved,
                    ].sort((a, b) => (a.position || 0) - (b.position || 0)),
                    maxStickers: current?.maxStickers || MAX_STICKERS,
                }),
                false
            )
            pendingSave.current = null
            if (mounted.current) {
                setHeld(null)
                lid.current?.focus({ preventScroll: true })
            }
        } catch (error) {
            if (mounted.current) {
                const status = (error as { status?: number }).status
                const rejected = status && status >= 400 && status < 500
                setSaveError(
                    error instanceof Error && !(error instanceof TypeError) && error.name !== 'TimeoutError'
                        ? error.message
                        : 'Check your connection and try again.'
                )
                if (rejected) {
                    pendingSave.current = null
                    pressProgress.set(0)
                    void refreshLaptop()
                    void refreshLibrary()
                }
                setHeld((current) => (current ? { ...current, phase: rejected ? 'holding' : 'failed' } : null))
            }
        } finally {
            saving.current = false
        }
    }

    const startPress = (clientX: number, clientY: number) => {
        if (!isOwner || held?.phase !== 'holding' || !held.placement.sticker || !lid.current || pressAnimation.current)
            return
        const bounds = lid.current.getBoundingClientRect()
        const placement = constrainPlacement({
            ...held.placement,
            x: (clientX - bounds.left) / bounds.width,
            y: (clientY - bounds.top) / bounds.height,
        })
        setPressPosition({ x: bounds.left + placement.x * bounds.width, y: bounds.top + placement.y * bounds.height })
        pressProgress.set(0)
        setHeld({ ...held, phase: 'pressing' })
        pressAnimation.current = animate(pressProgress, 1, {
            duration: 0.65,
            ease: 'easeInOut',
            onComplete: () => {
                pressAnimation.current = null
                pendingSave.current = {
                    stickerId: placement.sticker!.id,
                    x: placement.x,
                    y: placement.y,
                    rotation: placement.rotation,
                    requestId: crypto.randomUUID(),
                }
                void savePlacement()
            },
        })
    }

    return (
        <section
            ref={viewport}
            aria-label="Laptop mode"
            className={`@container relative h-full min-h-0 p-4 ${isOwner ? 'overflow-y-auto' : 'overflow-hidden'}`}
        >
            <div
                ref={workspace}
                className={`mx-auto max-w-[1376px] ${
                    isOwner
                        ? 'grid content-start gap-6 p-2 @3xl:grid-cols-[minmax(200px,280px)_minmax(0,1fr)] @3xl:gap-10 @3xl:p-6'
                        : 'flex h-full min-h-0 items-center justify-center'
                }`}
            >
                <div
                    className={`w-full min-w-0 ${
                        isOwner
                            ? '@3xl:col-start-2 @3xl:row-start-1 @3xl:max-w-[780px] @3xl:justify-self-center @3xl:self-start @3xl:sticky @3xl:top-0'
                            : 'max-w-5xl'
                    }`}
                    style={{ perspective: 1200, width: isOwner ? undefined : viewWidth }}
                >
                    <motion.div
                        initial={false}
                        animate={
                            active
                                ? { opacity: 1, rotateX: 0, scale: 1 }
                                : { opacity: 0, rotateX: reducedMotion ? 0 : 25, scale: reducedMotion ? 1 : 0.94 }
                        }
                        transition={{ duration: reducedMotion ? 0 : 0.45 }}
                        className="relative"
                        style={{ aspectRatio: LAPTOP_ASPECT_RATIO }}
                    >
                        <img
                            src="/images/light_mode_laptop.png"
                            alt=""
                            draggable={false}
                            className="absolute inset-0 w-full h-full pointer-events-none select-none dark:hidden"
                        />
                        <img
                            src="/images/dark_mode_laptop.png"
                            alt=""
                            draggable={false}
                            className="absolute hidden dark:block max-w-none h-auto pointer-events-none select-none"
                            style={{ left: '7.94%', top: '-1.49%', width: '84.97%' }}
                        />
                        <div
                            ref={lid}
                            tabIndex={0}
                            aria-label="Laptop lid"
                            aria-describedby={isOwner ? 'laptop-sticker-help' : undefined}
                            className={`absolute overflow-hidden rounded-[2.5%] focus-visible:outline-orange ${
                                held && held.phase !== 'peeling' ? 'cursor-none' : ''
                            }`}
                            style={{
                                left: '9%',
                                top: '1.37%',
                                width: '82.32%',
                                aspectRatio: LID_ASPECT_RATIO,
                            }}
                            onClickCapture={(event) => {
                                if (!pressClick.current) return
                                pressClick.current = false
                                event.preventDefault()
                                event.stopPropagation()
                            }}
                            onPointerDown={(event) => {
                                pressClick.current = false
                                if (event.button !== 0 || held?.phase !== 'holding') return
                                pressClick.current = true
                                event.preventDefault()
                                event.currentTarget.setPointerCapture(event.pointerId)
                                if (event.pointerType === 'touch') {
                                    cursorX.set(event.clientX)
                                    cursorY.set(event.clientY)
                                    lastPointer.current = { x: event.clientX, y: event.clientY }
                                }
                                startPress(cursorX.get(), cursorY.get())
                            }}
                            onPointerUp={releasePress}
                            onPointerCancel={releasePress}
                            onLostPointerCapture={releasePress}
                            onKeyDown={(event) => {
                                if (event.target !== event.currentTarget || !held || held.phase === 'peeling') return
                                if (held.phase !== 'holding') {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    return
                                }
                                if (event.shiftKey && ['ArrowUp', 'ArrowDown'].includes(event.key)) {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    setHeld({
                                        ...held,
                                        placement: {
                                            ...held.placement,
                                            rotation: held.placement.rotation + (event.key === 'ArrowUp' ? -5 : 5),
                                        },
                                    })
                                    return
                                }
                                const step = 5
                                const moves: Record<string, [number, number]> = {
                                    ArrowLeft: [-step, 0],
                                    ArrowRight: [step, 0],
                                    ArrowUp: [0, -step],
                                    ArrowDown: [0, step],
                                }
                                const move = moves[event.key]
                                if (move || event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    if (move) {
                                        const bounds = event.currentTarget.getBoundingClientRect()
                                        cursorX.set(
                                            Math.min(bounds.right, Math.max(bounds.left, cursorX.get() + move[0]))
                                        )
                                        cursorY.set(
                                            Math.min(bounds.bottom, Math.max(bounds.top, cursorY.get() + move[1]))
                                        )
                                    } else if (!event.repeat) startPress(cursorX.get(), cursorY.get())
                                }
                            }}
                            onKeyUp={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') releasePress()
                            }}
                        >
                            {placements
                                .filter((placement) => placement.removedAt || peelingIds.has(placement.id))
                                .map(({ id, sticker, x, y, rotation, size }) =>
                                    sticker ? (
                                        <div
                                            key={id}
                                            data-sticker-stain={id}
                                            role="img"
                                            aria-label={`Stain left by ${sticker.name} sticker`}
                                            className="absolute aspect-square pointer-events-none"
                                            style={{
                                                left: `${x * 100}%`,
                                                top: `${y * 100}%`,
                                                width: `${size * 100}%`,
                                                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                                                opacity: 0.28,
                                                filter: 'brightness(0) invert(0.78) sepia(0.22) drop-shadow(0 0 1px rgba(20,15,5,0.7))',
                                            }}
                                        >
                                            <StickerArtwork
                                                sticker={sticker}
                                                className="w-full h-full"
                                                finish={false}
                                            />
                                        </div>
                                    ) : null
                                )}
                            {placements
                                .filter((placement) => !placement.removedAt && !peelingIds.has(placement.id))
                                .map((placement) => {
                                    const { id, sticker, x, y, rotation, size } = placement
                                    if (!sticker) return null
                                    return (
                                        <div
                                            key={id}
                                            data-sticker-placement={id}
                                            className="absolute aspect-square"
                                            style={{
                                                left: `${x * 100}%`,
                                                top: `${y * 100}%`,
                                                width: `${size * 100}%`,
                                                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                                                pointerEvents: held || removing ? 'none' : undefined,
                                            }}
                                        >
                                            <Popover
                                                dataScheme="primary"
                                                header
                                                title={sticker.name}
                                                open={active && !held && !removing && viewedStickerId === id}
                                                onOpenChange={(open) => setViewedStickerId(open ? id : null)}
                                                contentClassName="z-[2147483646] w-64 !p-3 border border-primary"
                                                trigger={
                                                    <button
                                                        type="button"
                                                        aria-label={`${sticker.name} sticker — view details`}
                                                        disabled={Boolean(held || removing)}
                                                        className="block w-full h-full p-0 border-0 bg-transparent select-none cursor-pointer focus-visible:outline-orange"
                                                    >
                                                        <StickerArtwork
                                                            sticker={sticker}
                                                            className="w-full h-full pointer-events-none"
                                                            style={{
                                                                filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.18))',
                                                            }}
                                                        />
                                                    </button>
                                                }
                                            >
                                                <div className="space-y-2 text-sm">
                                                    {sticker.description && (
                                                        <p className="m-0">{sticker.description}</p>
                                                    )}
                                                    {sticker.collection && (
                                                        <p className="m-0 text-secondary">
                                                            From {sticker.collection.name}
                                                        </p>
                                                    )}
                                                    <p className="m-0">
                                                        {sticker.requiredAchievement
                                                            ? `Unlocked by earning “${sticker.requiredAchievement.title}”.`
                                                            : 'Available to every community member.'}
                                                    </p>
                                                    {isOwner && (
                                                        <div className="pt-2 border-t border-primary">
                                                            <button
                                                                type="button"
                                                                className="underline font-semibold focus-visible:outline-orange"
                                                                onClick={() => {
                                                                    setViewedStickerId(null)
                                                                    setRemovalError('')
                                                                    setRemoving({ id, phase: 'peeling' })
                                                                }}
                                                            >
                                                                Peel off sticker
                                                            </button>
                                                            <p className="mt-1 mb-0 text-xs text-secondary">
                                                                {getPeelStack(placements, id).length > 1
                                                                    ? `Peels off ${
                                                                          getPeelStack(placements, id).length
                                                                      } overlapping stickers. Each leaves a permanent stain.`
                                                                    : 'Leaves a permanent stain in its shape.'}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </Popover>
                                        </div>
                                    )
                                })}
                            {removing?.phase === 'peeling' &&
                                active &&
                                isOwner &&
                                peelBounds &&
                                peelLayers.length > 0 && (
                                    <div
                                        className="absolute aspect-square"
                                        style={{
                                            left: `${peelBounds.x * 100}%`,
                                            top: `${peelBounds.y * 100}%`,
                                            width: `${peelBounds.size * 100}%`,
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                    >
                                        <PeelSticker
                                            sticker={peelLayers[0].sticker}
                                            layers={peelLayers}
                                            width={lidWidth * peelBounds.size}
                                            attached
                                            onComplete={() => void removePlacement()}
                                        />
                                    </div>
                                )}
                        </div>
                    </motion.div>
                    {isOwner && (
                        <p className="mt-5 mb-0 flex flex-wrap items-center justify-center gap-1.5 text-xs text-secondary">
                            <KeyboardShortcut
                                text="Shift"
                                size="sm"
                                className={rotating ? '!border-orange !text-primary bg-accent' : ''}
                            />
                            <span>{rotating ? 'Rotating in place' : 'Hold and move up/down to rotate'}</span>
                            {held?.phase === 'holding' && (
                                <>
                                    <span className="mx-1">·</span>
                                    <KeyboardShortcut text="Esc" size="sm" />
                                    <span>Cancel</span>
                                </>
                            )}
                        </p>
                    )}
                </div>
                {loadError ? (
                    <p
                        role="alert"
                        className={
                            isOwner
                                ? 'text-sm text-center @3xl:col-span-2'
                                : 'absolute bottom-2 inset-x-4 text-sm text-center m-0'
                        }
                    >
                        Could not load this laptop.{' '}
                        <button type="button" className="underline" onClick={() => void refreshLaptop()}>
                            Try again
                        </button>
                    </p>
                ) : !laptop ? (
                    <p
                        role="status"
                        className={
                            isOwner
                                ? 'text-sm text-secondary text-center @3xl:col-span-2'
                                : 'absolute bottom-2 inset-x-4 text-sm text-secondary text-center m-0'
                        }
                    >
                        Loading stickers…
                    </p>
                ) : null}
                {isOwner ? (
                    <div data-scheme="primary" className="min-w-0 @3xl:col-start-1 @3xl:row-start-1 @3xl:self-start">
                        <div className="flex flex-wrap justify-between gap-2 items-baseline mb-3">
                            <h1 className="text-lg m-0">Library</h1>
                            <div className="flex items-center gap-3 text-xs">
                                {((held && !pendingSave.current) || (removing && !pendingRemoval.current)) && (
                                    <button
                                        type="button"
                                        onClick={cancel}
                                        className="underline focus-visible:outline-orange"
                                    >
                                        Cancel
                                    </button>
                                )}
                                <span className="text-secondary" aria-live="polite">
                                    {stickerCount} / {maxStickers} stickers
                                </span>
                            </div>
                        </div>
                        {removalError && (
                            <div role="alert" className="text-sm mb-3">
                                <p className="mb-1">
                                    {removing?.phase === 'failed'
                                        ? 'Could not confirm the sticker was removed.'
                                        : 'Could not remove this sticker.'}{' '}
                                    {removalError}
                                </p>
                                {removing?.phase === 'failed' && (
                                    <button
                                        type="button"
                                        onClick={() => void removePlacement()}
                                        className="underline focus-visible:outline-orange"
                                    >
                                        Retry removal
                                    </button>
                                )}
                            </div>
                        )}
                        {saveError && (
                            <div role="alert" className="text-sm mt-3">
                                <p className="mb-1">
                                    {held?.phase === 'failed'
                                        ? 'Could not confirm your sticker was saved.'
                                        : 'Could not save your sticker.'}{' '}
                                    {saveError}
                                </p>
                                {held?.phase === 'failed' && (
                                    <button
                                        type="button"
                                        onClick={() => void savePlacement()}
                                        className="underline focus-visible:outline-orange"
                                    >
                                        Retry save
                                    </button>
                                )}
                            </div>
                        )}
                        {libraryError ? (
                            <p role="alert" className="text-sm">
                                Could not load your sticker library.{' '}
                                <button type="button" className="underline" onClick={() => void refreshLibrary()}>
                                    Try again
                                </button>
                            </p>
                        ) : !library ? (
                            <p role="status" className="text-sm text-secondary">
                                Loading your sticker library…
                            </p>
                        ) : library.length === 0 ? (
                            <p className="text-sm text-secondary">No stickers are available yet.</p>
                        ) : (
                            groups.map(({ collection, stickers }) => (
                                <div key={collection?.id || 'ungrouped'} className="mb-4">
                                    <h3 className="text-sm mb-1">{collection?.name || 'Stickers'}</h3>
                                    <div
                                        className="grid gap-2"
                                        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}
                                    >
                                        {stickers.map((sticker) => (
                                            <div key={sticker.id} className="relative min-w-0">
                                                <button
                                                    type="button"
                                                    aria-label={`${
                                                        sticker.unlocked ? 'Pick up' : 'Locked'
                                                    } ${sticker.name.toLowerCase()} sticker`}
                                                    disabled={
                                                        !sticker.unlocked ||
                                                        !laptop ||
                                                        Boolean(loadError) ||
                                                        Boolean(held) ||
                                                        Boolean(removing) ||
                                                        stickerCount >= maxStickers
                                                    }
                                                    onClick={(event) => pickUp(event, sticker)}
                                                    className="w-full flex flex-col items-center gap-2 rounded py-2 border border-transparent enabled:hover:border-primary enabled:hover:bg-accent focus-visible:outline-orange disabled:cursor-default"
                                                >
                                                    <StickerArtwork
                                                        sticker={sticker}
                                                        className={`w-[72px] h-[72px] ${
                                                            !sticker.unlocked ||
                                                            held?.placement.sticker?.id === sticker.id
                                                                ? 'opacity-30'
                                                                : ''
                                                        }`}
                                                    />
                                                    <span className="text-xs break-words max-w-full line-clamp-2 min-h-[2rem]">
                                                        {sticker.name}
                                                    </span>
                                                </button>
                                                {!sticker.unlocked && (
                                                    <p className="text-xs text-secondary text-center mt-1 mb-0">
                                                        Earn “{sticker.requiredAchievement?.title}” to unlock
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                        <p id="laptop-sticker-help" className="text-xs text-secondary mt-3 mb-0" role="status">
                            {removing?.phase === 'peeling'
                                ? 'Click and drag the sticker on your laptop to peel it off. Release early or press Escape to cancel.'
                                : removing?.phase === 'saving'
                                ? 'Saving removal… The stain will stay.'
                                : removing?.phase === 'failed'
                                ? 'Retry removal to confirm the stain was saved.'
                                : held?.phase === 'saving'
                                ? 'Saving your sticker…'
                                : held?.phase === 'failed'
                                ? 'Retry to confirm the placement without adding a second sticker.'
                                : held?.phase === 'peeling'
                                ? 'Click and drag the sticker on its paper backing to peel it. Keep pulling until it lifts free.'
                                : held?.phase === 'pressing'
                                ? 'Keep holding to stick it down…'
                                : stickerCount >= maxStickers
                                ? 'Your laptop is full. Peel off a sticker to make room; its stain will stay.'
                                : held?.phase === 'holding'
                                ? 'Click and hold on the laptop to stick it down.'
                                : 'Choose a sticker, then drag to peel it off its backing.'}
                        </p>
                        <p className="text-xs text-secondary mt-2 mb-0">
                            Stickers stay where you place them. Click one to peel it off and leave a permanent stain.
                        </p>
                        <span className="sr-only">
                            Keyboard: Enter selects a sticker. Enter again peels it, or use arrow keys to peel
                            gradually. Once peeled, arrow keys move it over the laptop. Shift and Up or Down rotates it.
                            Hold Enter or Space to stick it down. Escape cancels before saving.
                        </span>
                    </div>
                ) : null}
            </div>
            <RadixDialog.Root
                open={active && held?.phase === 'peeling'}
                onOpenChange={(open) => {
                    if (!open) cancel()
                }}
            >
                <RadixDialog.Portal>
                    <RadixDialog.Overlay className="fixed inset-0 bg-black/20 z-[2147483645]" />
                    <RadixDialog.Content
                        data-peel-widget
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[2147483646] max-w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-sm bg-light text-black p-6 shadow-2xl focus:outline-none"
                        style={{ width: Math.max(320, heldWidth + 96) }}
                        onCloseAutoFocus={(event) => event.preventDefault()}
                    >
                        <RadixDialog.Title className="sr-only">Peel {held?.placement.sticker?.name}</RadixDialog.Title>
                        <RadixDialog.Close asChild>
                            <button
                                type="button"
                                aria-label="Cancel peeling"
                                className="absolute right-2 top-2 p-1 text-black/60 hover:text-black focus-visible:outline-orange"
                            >
                                <IconX className="w-4 h-4" />
                            </button>
                        </RadixDialog.Close>
                        {held?.phase === 'peeling' && held.placement.sticker && (
                            <div className="py-6">
                                <PeelSticker
                                    sticker={held.placement.sticker}
                                    width={heldWidth}
                                    onComplete={finishPeel}
                                />
                            </div>
                        )}
                        <RadixDialog.Description className="text-center text-sm m-0 text-black/70">
                            Click and drag to peel it off.
                        </RadixDialog.Description>
                    </RadixDialog.Content>
                </RadixDialog.Portal>
            </RadixDialog.Root>
            {active &&
                held &&
                held.phase !== 'peeling' &&
                held.placement.sticker &&
                createPortal(
                    <motion.div
                        aria-hidden="true"
                        data-held-sticker={held.phase}
                        className="fixed pointer-events-none"
                        style={{
                            left: pinned ? pressPosition.x : cursorX,
                            top: pinned ? pressPosition.y : cursorY,
                            x: '-50%',
                            y: '-50%',
                            width: heldWidth,
                            zIndex: 2147483647,
                            perspective: 600,
                        }}
                    >
                        <motion.div
                            className="relative aspect-square"
                            style={{
                                transformOrigin: 'center',
                                rotate: held.placement.rotation,
                                rotateX: reducedMotion ? 0 : pressRotateX,
                                rotateY: reducedMotion ? 0 : pressRotateY,
                                y: reducedMotion ? 0 : pressLift,
                                scale: reducedMotion ? 1 : pressScale,
                                filter: pressShadow,
                            }}
                        >
                            <StickerArtwork sticker={held.placement.sticker} className="w-full h-full" />
                        </motion.div>
                        {held.phase === 'pressing' && (
                            <div className="absolute top-full inset-x-0 mt-3 h-1.5 rounded bg-accent border border-primary overflow-hidden">
                                <motion.div
                                    className="h-full bg-orange origin-left"
                                    style={{ scaleX: pressProgress }}
                                />
                            </div>
                        )}
                    </motion.div>,
                    document.body
                )}
        </section>
    )
}
