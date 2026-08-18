import React, { useLayoutEffect, useRef, useState } from 'react'
import { IconChevronDown } from '@posthog/icons'
import { Popover } from 'components/RadixUI/Popover'
import { Accent, accents } from './accents'

const TagPill = ({
    label,
    active,
    activeClassName,
    onClick,
    dataTag,
}: {
    label: string
    active: boolean
    activeClassName: string
    onClick: () => void
    dataTag?: string
}) => (
    <button
        onClick={onClick}
        data-tag={dataTag}
        className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-[13px] font-medium transition-colors ${
            active ? activeClassName : 'border-transparent text-secondary hover:border-primary hover:text-primary'
        }`}
    >
        {label}
    </button>
)

type TagFilterProps = {
    tags: string[]
    /** `null` means "All". */
    activeTag: string | null
    onChange: (tag: string | null) => void
    accent?: Accent
}

/**
 * A single row of tag pills, with an "All" reset — clicking the active tag clears it.
 * Pills that don't fit the row are clipped (max-h + overflow-hidden) and collected
 * into a "more" popover; a ResizeObserver re-measures as the window resizes.
 */
export default function TagFilter({ tags, activeTag, onChange, accent = 'red' }: TagFilterProps): JSX.Element {
    const rowRef = useRef<HTMLDivElement>(null)
    const [overflowTags, setOverflowTags] = useState<string[]>([])
    const [menuOpen, setMenuOpen] = useState(false)

    useLayoutEffect(() => {
        const row = rowRef.current
        if (!row) return

        const measure = () => {
            const children = Array.from(row.children) as HTMLElement[]
            if (children.length === 0) return
            const firstRowTop = children[0].offsetTop
            // Anything that wrapped past the first row is clipped — surface it in the menu
            const hidden = children
                .filter((child) => child.dataset.tag && child.offsetTop > firstRowTop)
                .map((child) => child.dataset.tag as string)
            setOverflowTags((prev) =>
                prev.length === hidden.length && prev.every((tag, i) => tag === hidden[i]) ? prev : hidden
            )
        }

        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(row)

        // The row's own box is fixed by its flex parent and clamped height, so it doesn't
        // resize when only the pills inside it reflow — re-measure once the web font swaps
        // in, which changes pill widths (and so which of them wrap) after the first paint.
        let cancelled = false
        document.fonts?.ready.then(() => {
            if (!cancelled) measure()
        })

        return () => {
            cancelled = true
            observer.disconnect()
        }
    }, [tags])

    const activeIsHidden = activeTag !== null && overflowTags.includes(activeTag)
    const { pillActive, pillOverflowActive } = accents[accent]

    return (
        <div className="my-3 flex items-start gap-1 @2xl:my-4">
            <div ref={rowRef} className="flex max-h-8 min-w-0 flex-1 flex-wrap gap-1 overflow-hidden">
                <TagPill label="All" active={!activeTag} activeClassName={pillActive} onClick={() => onChange(null)} />
                {tags.map((tag) => (
                    <TagPill
                        key={tag}
                        label={tag}
                        dataTag={tag}
                        active={activeTag === tag}
                        activeClassName={pillActive}
                        onClick={() => onChange(activeTag === tag ? null : tag)}
                    />
                ))}
            </div>
            {overflowTags.length > 0 && (
                <Popover
                    dataScheme="primary"
                    open={menuOpen}
                    onOpenChange={setMenuOpen}
                    align="end"
                    trigger={
                        <button
                            className={`flex shrink-0 grow-0 items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1 text-[13px] font-medium transition-colors ${
                                activeIsHidden
                                    ? pillOverflowActive
                                    : 'border-transparent text-secondary hover:border-primary hover:text-primary'
                            }`}
                        >
                            +{overflowTags.length} more <IconChevronDown className="size-3.5" />
                        </button>
                    }
                >
                    <div className="flex max-w-xs flex-wrap gap-1 p-1">
                        {overflowTags.map((tag) => (
                            <TagPill
                                key={tag}
                                label={tag}
                                active={activeTag === tag}
                                activeClassName={pillActive}
                                onClick={() => {
                                    onChange(activeTag === tag ? null : tag)
                                    setMenuOpen(false)
                                }}
                            />
                        ))}
                    </div>
                </Popover>
            )}
        </div>
    )
}
