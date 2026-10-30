import React, { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { IconArrowLeft, IconArrowRight } from '@posthog/icons'
import { Dialog } from '../Dialog'
import { IconButton } from '../Button'
import { cardLevels, insetFocusRing } from '../styles'
import { cn } from '../../../utils'

export type GalleryItem = {
    imageLight: string
    imageDark?: string
    alt: string
    caption?: ReactNode
    width?: number
    height?: number
}

export type GalleryProps = {
    items: GalleryItem[]
    label: string
    layout?: 'grid' | 'columns'
    columns?: 1 | 2 | 3 | 4
    className?: string
    renderThumbnail?: (item: GalleryItem) => ReactNode
    frame?: boolean
    showThumbnailCaptions?: boolean
}

const gridColumns = {
    1: '',
    2: '@md/gallery:grid-cols-2',
    3: '@md/gallery:grid-cols-2 @3xl/gallery:grid-cols-3',
    4: '@md/gallery:grid-cols-2 @3xl/gallery:grid-cols-3 @5xl/gallery:grid-cols-4',
}

const masonryColumns = {
    1: '',
    2: '@md/gallery:columns-2',
    3: '@md/gallery:columns-2 @3xl/gallery:columns-3',
    4: '@md/gallery:columns-2 @3xl/gallery:columns-3 @5xl/gallery:columns-4',
}

function Image({ item, enlarged = false }: { item: GalleryItem; enlarged?: boolean }): JSX.Element {
    const classes = enlarged ? 'mx-auto max-h-[65vh] w-auto max-w-full object-contain' : 'w-full object-contain'
    return (
        <>
            <img
                src={item.imageLight}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
                className={cn(classes, item.imageDark && 'dark:hidden')}
            />
            {item.imageDark && (
                <img
                    src={item.imageDark}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                    className={cn(classes, 'hidden dark:block')}
                />
            )}
        </>
    )
}

export function Gallery({
    items,
    label,
    layout = 'grid',
    columns = 3,
    className,
    renderThumbnail,
    frame = true,
    showThumbnailCaptions = true,
}: GalleryProps): JSX.Element | null {
    const [selected, setSelected] = useState<number | null>(null)
    const opener = useRef<HTMLButtonElement | null>(null)
    const activeIndex = Math.min(selected ?? 0, items.length - 1)
    const active = items[activeIndex]
    const columnCount = Math.min(columns, items.length) as 1 | 2 | 3 | 4
    const navigate = (direction: number) => setSelected((activeIndex + direction + items.length) % items.length)
    if (!items.length) return null

    return (
        <div className={cn('@container/gallery not-prose min-w-0 text-primary', className)}>
            <Dialog.Root
                open={selected !== null}
                onOpenChange={(open) => {
                    if (!open) setSelected(null)
                }}
            >
                <div
                    role="group"
                    aria-label={label}
                    className={
                        layout === 'grid'
                            ? cn('grid grid-cols-1 items-start gap-4', gridColumns[columnCount])
                            : cn('columns-1 gap-4', masonryColumns[columnCount])
                    }
                >
                    {items.map((item, index) => (
                        <figure
                            key={`${item.imageLight}-${index}`}
                            className={cn(
                                'm-0 min-w-0 break-inside-avoid overflow-hidden',
                                frame && cardLevels[1],
                                layout === 'columns' && 'mb-4'
                            )}
                        >
                            <button
                                type="button"
                                aria-haspopup="dialog"
                                aria-label={`Enlarge ${item.alt}`}
                                className={cn(
                                    'block w-full cursor-zoom-in rounded-t-[8px] p-0 text-left',
                                    insetFocusRing
                                )}
                                onClick={(event) => {
                                    opener.current = event.currentTarget
                                    setSelected(index)
                                }}
                            >
                                {renderThumbnail ? renderThumbnail(item) : <Image item={item} />}
                            </button>
                            {showThumbnailCaptions && item.caption && (
                                <figcaption className="px-3 py-2 text-sm text-secondary">{item.caption}</figcaption>
                            )}
                        </figure>
                    ))}
                </div>
                <Dialog.Popup
                    className="w-[min(960px,calc(100vw-2rem))] max-w-none"
                    finalFocus={() => opener.current}
                    onKeyDown={(event) => {
                        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
                        const target = event.target as HTMLElement
                        if (target.closest('input, textarea, select, [contenteditable=true]')) return
                        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
                        event.preventDefault()
                        navigate(event.key === 'ArrowRight' ? 1 : -1)
                    }}
                >
                    <Dialog.Header>{label}</Dialog.Header>
                    <Dialog.Body>
                        <figure className="m-0 min-w-0">
                            <Image key={activeIndex} item={active} enlarged />
                            {active.caption && (
                                <figcaption className="mt-3 text-sm text-secondary">{active.caption}</figcaption>
                            )}
                        </figure>
                        <Dialog.Description className="sr-only">
                            Use the left and right arrow keys to change images. Press Escape to close.
                        </Dialog.Description>
                    </Dialog.Body>
                    <Dialog.Footer className="items-center justify-between">
                        <span
                            role="status"
                            aria-live="polite"
                            aria-atomic="true"
                            className="text-sm tabular-nums text-secondary"
                        >
                            <span aria-hidden="true">
                                {activeIndex + 1} / {items.length}
                            </span>
                            <span className="sr-only">
                                Image {activeIndex + 1} of {items.length}: {active.alt}
                            </span>
                        </span>
                        {items.length > 1 && (
                            <div className="flex gap-2">
                                <IconButton
                                    type="button"
                                    appearance="raised"
                                    aria-label="Previous image"
                                    icon={<IconArrowLeft />}
                                    onClick={() => navigate(-1)}
                                />
                                <IconButton
                                    type="button"
                                    appearance="raised"
                                    aria-label="Next image"
                                    icon={<IconArrowRight />}
                                    onClick={() => navigate(1)}
                                />
                            </div>
                        )}
                    </Dialog.Footer>
                </Dialog.Popup>
            </Dialog.Root>
        </div>
    )
}
