import React from 'react'
import Tooltip from 'components/RadixUI/Tooltip'
import { TOOLS } from './tools'
import { MarkerPosition } from './useAnnotationPositions'

interface MarkerLayerProps {
    positions: MarkerPosition[]
    /**
     * Stacking level for the whole layer. It sets a `z-index`, so it creates a
     * stacking context and everything inside is contained within that band,
     * which is how the layer sits either side of the demo's sticky nav.
     */
    className?: string
    /** Numbers shown on the markers, keyed by annotation id, so they match the sidebar. */
    numbers: Record<string, number>
    selectedId: string | null
    dimmed: (annotationId: string) => boolean
    onSelect: (annotationId: string) => void
}

/**
 * Numbered markers drawn over the demo, keyed to the sidebar list.
 *
 * This layer is rendered *inside* the element its positions were measured
 * against, so it scrolls with the content and stays locked to its targets.
 * Hovering a marker summarises it in place, so you can skim the page without
 * reading the sidebar for every single one.
 */
export default function MarkerLayer({
    positions,
    className = '',
    numbers,
    selectedId,
    dimmed,
    onSelect,
}: MarkerLayerProps): JSX.Element {
    const selected = positions.find((p) => p.annotation.id === selectedId)

    return (
        <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden={positions.length === 0}>
            {/* Inspect-style outline around the selected element. Under the markers,
                but both are bounded by the layer's own stacking level. */}
            {selected && (
                <div
                    className="absolute z-0 rounded border-2 transition-all duration-150"
                    style={{
                        left: selected.box.left - 4,
                        top: selected.box.top - 4,
                        width: selected.box.width + 8,
                        height: selected.box.height + 8,
                        borderColor: TOOLS[selected.annotation.tool].color,
                        backgroundColor: `${TOOLS[selected.annotation.tool].color}14`,
                    }}
                />
            )}
            {positions.map(({ annotation, x, y }) => {
                const tool = TOOLS[annotation.tool]
                const { Icon } = tool
                const isSelected = annotation.id === selectedId
                const isDimmed = dimmed(annotation.id)
                return (
                    // The wrapper carries the position so the tooltip anchors to the
                    // marker itself rather than to the top of the layer.
                    <div
                        key={annotation.id}
                        className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                        style={{ left: x, top: y }}
                    >
                        <Tooltip
                            delay={120}
                            contentClassName="max-w-xs !leading-snug"
                            trigger={
                                <button
                                    type="button"
                                    onClick={() => onSelect(annotation.id)}
                                    aria-label={`${annotation.title} (${tool.name})`}
                                    className={`flex items-center justify-center size-6 rounded-full text-xs font-semibold ring-2 ring-white shadow-md transition-all duration-150 hover:scale-110 ${
                                        isSelected ? 'scale-110 shadow-lg' : ''
                                    } ${isDimmed ? 'opacity-25' : ''}`}
                                    style={{ background: tool.color, color: tool.textOnColor }}
                                >
                                    {numbers[annotation.id]}
                                </button>
                            }
                        >
                            <span className="block">
                                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-secondary">
                                    <Icon className="size-4" style={{ color: tool.color }} />
                                    {tool.name}
                                </span>
                                <span className="block mt-1 font-bold">{annotation.title}</span>
                                <span className="block mt-1.5 text-xs text-secondary">
                                    {isSelected ? 'Shown in the sidebar' : 'Click for the code'}
                                </span>
                            </span>
                        </Tooltip>
                    </div>
                )
            })}
        </div>
    )
}
