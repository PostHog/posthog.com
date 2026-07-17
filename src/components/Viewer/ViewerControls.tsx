import React, { useState } from 'react'
import { IconSearch } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { Popover } from 'components/RadixUI/Popover'
import { ViewerSearchBar } from './SearchBar'

interface ViewerControlsProps {
    /**
     * Where the control strip renders:
     * - `rail`: vertical left column on `@md`+ containers, collapsing to a top row below `@md`.
     * - `header`: horizontal top row at every width (mirrors the window's top-right controls).
     */
    placement: 'rail' | 'header'
    showSearch: boolean
    toggleSearch: () => void
    closeSearch: () => void
    /** Article content to highlight matches in (mark.js). Omitted when `onSearchChange` is provided. */
    searchContentRef: React.RefObject<HTMLElement>
    onSearchChange?: (query: string) => void
    /**
     * Additional controls (content-width gear, share, bookmark, caller-provided menu items).
     * When non-empty, search + these collapse into a single combo button that opens a Popover.
     */
    otherControls?: React.ReactNode[]
}

/**
 * Viewer's control strip. Renders search (and any `otherControls`) as either a vertical left
 * rail or a horizontal header row, collapsing to a top row on narrow (`< @md`) containers.
 *
 * Layout is driven entirely by `@container` CSS — the only JS branch is the control *count*:
 * a single search control reveals an inline input, while 2+ controls collapse into one combo
 * button backed by a `Popover` (which "cascades downward" in header/mobile, or opens to the
 * side in rail mode). There is exactly one `<ViewerSearchBar>` per render path so mark.js
 * never clones the article twice.
 */
export function ViewerControls({
    placement,
    showSearch,
    toggleSearch,
    closeSearch,
    searchContentRef,
    onSearchChange,
    otherControls = [],
}: ViewerControlsProps) {
    const [comboOpen, setComboOpen] = useState(false)
    const hasOthers = otherControls.length > 0
    const popoverSide = placement === 'rail' ? 'right' : 'bottom'
    const contentRef = onSearchChange ? undefined : searchContentRef

    // rail: horizontal row that becomes a 48px vertical column at @md (expanding to 320px while
    // searching, in the single-control case). header: a left-aligned horizontal row at all widths.
    const stripClassName =
        placement === 'rail'
            ? [
                  'flex flex-row flex-wrap items-center justify-start gap-1 shrink-0 overflow-hidden p-1',
                  'bg-dark/10 dark:bg-light/10 border-b border-secondary transition-[flex-basis] duration-300',
                  '@md:flex-col @md:flex-nowrap @md:gap-0 @md:p-0 @md:border-b-0 @md:border-r @md:basis-12',
                  !hasOthers && showSearch ? '@md:basis-80' : '',
              ].join(' ')
            : 'flex flex-row flex-wrap items-center justify-start gap-1 shrink-0 p-1'

    // Single search control: an icon that reveals one input. The wrapper drops the input
    // full-width below the row on narrow containers and sits it inline on wide ones; in rail
    // mode the wide case is the expanded 320px panel.
    const searchReveal = showSearch && (
        <div
            className={
                placement === 'rail'
                    ? 'order-last basis-full min-w-0 @md:order-none @md:basis-auto @md:w-72 @md:p-3'
                    : 'order-last basis-full min-w-0 @md:order-none @md:basis-auto @md:flex-1'
            }
        >
            <ViewerSearchBar
                visible={showSearch}
                onClose={closeSearch}
                contentRef={contentRef}
                dataScheme="secondary"
                onSearch={onSearchChange}
            />
        </div>
    )

    return (
        <div className={stripClassName}>
            {hasOthers ? (
                <Popover
                    title="Search & tools"
                    dataScheme="secondary"
                    side={popoverSide}
                    open={comboOpen}
                    onOpenChange={setComboOpen}
                    contentClassName="w-80 p-2"
                    trigger={
                        <span>
                            <OSButton
                                active={comboOpen}
                                icon={<IconSearch className="size-5 text-primary" />}
                                size="md"
                                tooltip="Search & tools"
                            />
                        </span>
                    }
                >
                    <div className="flex flex-col gap-2">
                        <ViewerSearchBar
                            visible={comboOpen}
                            // The Popover owns open/close here; keep the searchbar from closing it.
                            onClose={() => undefined}
                            contentRef={contentRef}
                            dataScheme="secondary"
                            onSearch={onSearchChange}
                        />
                        <div className="flex flex-col gap-1">
                            {otherControls.map((control, i) => (
                                <React.Fragment key={i}>{control}</React.Fragment>
                            ))}
                        </div>
                    </div>
                </Popover>
            ) : (
                <>
                    <OSButton
                        onClick={toggleSearch}
                        active={showSearch}
                        icon={<IconSearch className="size-5 text-primary" />}
                        size="md"
                        tooltip="Search this page"
                    />
                    {searchReveal}
                </>
            )}
        </div>
    )
}

export default ViewerControls
