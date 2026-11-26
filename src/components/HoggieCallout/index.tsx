/**
 * Callout with a hoggie breaking out of the top border, copy on the left, and a button on the right.
 * The wrapper is a size container, so the row stacks on the callout's width.
 * `layout="featured"` renders `FeaturedHoggieCallout` instead.
 */
import React from 'react'
import OSButton from 'components/OSButton'
import FeaturedHoggieCallout from './FeaturedHoggieCallout'

type Hoggie = React.ComponentType<{ title?: string; className?: string }>

/** The height the hoggie sits at. */
export type HoggieAlign = 'top' | 'center' | 'bottom'

/** `md` is the size the callouts had before this prop. */
export type HoggieSize = 'sm' | 'md' | 'lg'

type HoggieMode = 'inside' | 'breakout'

// A hoggie that breaks out can be larger, because the box does not have to hold all of it.
const WIDTHS: Record<HoggieMode, Record<HoggieSize, string>> = {
    inside: { sm: 'w-16 @xl:w-20', md: 'w-20 @xl:w-24', lg: 'w-24 @xl:w-32' },
    breakout: { sm: 'w-20 @xl:w-24', md: 'w-24 @xl:w-32', lg: 'w-28 @xl:w-40' },
}

// For each mode and height: where the hoggie goes, and the box classes for each size. The left padding
// keeps the copy out from under the hoggie. A minimum height keeps the hoggie from going past a border
// that it must not cross. Breakout goes 16px past one border: the top, the bottom, or (for `center`) the
// left. Two cases have no minimum height, so they render as before this prop: breakout at the top, and
// inside at the bottom, where a short box lets the hoggie go over the top border.
const LAYOUTS: Record<HoggieMode, Record<HoggieAlign, { hoggie: string; box: Record<HoggieSize, string> }>> = {
    inside: {
        top: {
            hoggie: 'left-4 top-4',
            box: {
                sm: 'pl-24 @xl:pl-28 min-h-[96px] @xl:min-h-[112px]',
                md: 'pl-28 @xl:pl-32 min-h-[112px] @xl:min-h-[128px]',
                lg: 'pl-32 @xl:pl-40 min-h-[128px] @xl:min-h-[160px]',
            },
        },
        center: {
            hoggie: 'left-4 top-1/2 -translate-y-1/2',
            box: {
                sm: 'pl-24 @xl:pl-28 min-h-[96px] @xl:min-h-[112px]',
                md: 'pl-28 @xl:pl-32 min-h-[112px] @xl:min-h-[128px]',
                lg: 'pl-32 @xl:pl-40 min-h-[128px] @xl:min-h-[160px]',
            },
        },
        bottom: {
            hoggie: 'left-4 bottom-0',
            box: { sm: 'pl-24 @xl:pl-28', md: 'pl-28 @xl:pl-32', lg: 'pl-32 @xl:pl-40' },
        },
    },
    breakout: {
        top: {
            hoggie: '-top-4 left-2 @xl:left-3',
            box: { sm: 'pl-24 @xl:pl-32', md: 'pl-28 @xl:pl-40', lg: 'pl-32 @xl:pl-48' },
        },
        center: {
            hoggie: '-left-4 top-1/2 -translate-y-1/2',
            box: {
                sm: 'pl-20 @xl:pl-24 min-h-[96px] @xl:min-h-[112px]',
                md: 'pl-24 @xl:pl-32 min-h-[112px] @xl:min-h-[144px]',
                lg: 'pl-28 @xl:pl-40 min-h-[128px] @xl:min-h-[176px]',
            },
        },
        bottom: {
            hoggie: '-bottom-4 left-2 @xl:left-3',
            box: {
                sm: 'pl-24 @xl:pl-32 min-h-[80px] @xl:min-h-[96px]',
                md: 'pl-28 @xl:pl-40 min-h-[96px] @xl:min-h-[128px]',
                lg: 'pl-32 @xl:pl-48 min-h-[112px] @xl:min-h-[160px]',
            },
        },
    },
}

interface BaseHoggieCalloutProps {
    /** A component from `@posthog/brand/hoggies` */
    hoggie: Hoggie
    /** Describes what the art shows, for screen readers */
    hoggieTitle: string
    /** The height the hoggie sits at. Defaults to `top` (compact layout) or `bottom` (featured layout). */
    hoggieAlign?: HoggieAlign
    /** Lets the hoggie go 16px past the border it is aligned to. Defaults to `true` (compact layout) or `false` (featured layout). */
    hoggieBreakout?: boolean
    /** The size of the hoggie. Defaults to `md`. */
    hoggieSize?: HoggieSize
    ariaLabel: string
    title: string
    description: React.ReactNode
    buttonLabel: string
    to: string
    className?: string
}

export interface CompactHoggieCalloutProps extends BaseHoggieCalloutProps {
    /** The layout of the live callouts on /mcp-analytics and /docs/ai-evals. Defaults to `compact`. */
    layout?: 'compact'
}

export interface FeaturedHoggieCalloutProps extends BaseHoggieCalloutProps {
    /** A larger callout with a hog column and the hog interactions. Use one per page at most. */
    layout: 'featured'
    /** The side the hog sits on in a medium or wide container. Defaults to `left`. */
    hoggieSide?: 'left' | 'right'
    /** Turns on the hover nudge and the poke. Defaults to `true`. */
    interactive?: boolean
    /** Extra speech bubble lines, added to the standard lines. */
    hoggieLines?: string[]
}

/** The props of one layout are not valid on the other layout. */
export type HoggieCalloutProps = CompactHoggieCalloutProps | FeaturedHoggieCalloutProps

export default function HoggieCallout(props: HoggieCalloutProps): JSX.Element {
    if (props.layout === 'featured') {
        return <FeaturedHoggieCallout {...props} />
    }
    return <CompactHoggieCallout {...props} />
}

function CompactHoggieCallout({
    hoggie: Hoggie,
    hoggieTitle,
    hoggieAlign = 'top',
    hoggieBreakout = true,
    hoggieSize = 'md',
    ariaLabel,
    title,
    description,
    buttonLabel,
    to,
    className = '',
}: CompactHoggieCalloutProps): JSX.Element {
    const mode: HoggieMode = hoggieBreakout ? 'breakout' : 'inside'
    const placement = LAYOUTS[mode][hoggieAlign]
    return (
        <aside aria-label={ariaLabel} className={`@container not-prose my-6 ${className}`}>
            <div className={`relative border rounded bg-accent border-primary p-4 ${placement.box[hoggieSize]}`}>
                <Hoggie title={hoggieTitle} className={`absolute ${placement.hoggie} ${WIDTHS[mode][hoggieSize]}`} />
                <div className="flex flex-col @xl:flex-row @xl:items-center gap-3 @xl:gap-4">
                    <div className="flex-1 min-w-0">
                        <strong className="block text-lg mb-0.5">{title}</strong>
                        <p className="m-0 text-[15px] !leading-relaxed">{description}</p>
                    </div>
                    <OSButton asLink to={to} variant="primary" size="md" state={{ newWindow: true }}>
                        {buttonLabel}
                    </OSButton>
                </div>
            </div>
        </aside>
    )
}
