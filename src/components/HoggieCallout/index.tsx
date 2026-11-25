/**
 * Callout with a hoggie breaking out of the top border, copy on the left, and a button on the right.
 * The wrapper is a size container, so the row stacks on the callout's width.
 * `variant="yellow"` renders `YellowHoggieCallout` instead.
 */
import React from 'react'
import OSButton from 'components/OSButton'
import YellowHoggieCallout from './YellowHoggieCallout'

type Hoggie = React.ComponentType<{ title?: string; className?: string }>

/**
 * - `breakout`: the hoggie breaks out of the top border.
 * - `inset`: a smaller hoggie stands on the bottom border, inside the callout.
 */
type HoggiePlacement = 'breakout' | 'inset'

const placements: Record<HoggiePlacement, { box: string; hoggie: string }> = {
    breakout: { box: 'pl-28 @xl:pl-40', hoggie: '-top-4 left-2 w-24 @xl:left-3 @xl:w-32' },
    inset: { box: 'pl-28 @xl:pl-32', hoggie: 'bottom-0 left-4 w-20 @xl:w-24' },
}

interface BaseHoggieCalloutProps {
    /** A component from `@posthog/brand/hoggies` */
    hoggie: Hoggie
    /** Describes what the art shows, for screen readers */
    hoggieTitle: string
    ariaLabel: string
    title: string
    description: React.ReactNode
    buttonLabel: string
    to: string
    className?: string
}

export interface DefaultHoggieCalloutProps extends BaseHoggieCalloutProps {
    variant?: 'default'
    /** Where the hoggie sits. Defaults to `breakout`. */
    hoggiePlacement?: HoggiePlacement
}

export interface YellowHoggieCalloutProps extends BaseHoggieCalloutProps {
    /** Turns on the yellow layout and the hog interactions. */
    variant: 'yellow'
    /** The side the hog sits on in a medium or wide container. Defaults to `left`. */
    hoggieSide?: 'left' | 'right'
    /** Turns on the hover nudge and the poke. Defaults to `true` for `yellow`. */
    interactive?: boolean
    /** Extra speech bubble lines, added to the standard lines. */
    hoggieLines?: string[]
}

/** The props of one variant are not valid on the other variant. */
export type HoggieCalloutProps = DefaultHoggieCalloutProps | YellowHoggieCalloutProps

export default function HoggieCallout(props: HoggieCalloutProps): JSX.Element {
    if (props.variant === 'yellow') {
        return <YellowHoggieCallout {...props} />
    }
    return <DefaultHoggieCallout {...props} />
}

function DefaultHoggieCallout({
    hoggie: Hoggie,
    hoggieTitle,
    hoggiePlacement = 'breakout',
    ariaLabel,
    title,
    description,
    buttonLabel,
    to,
    className = '',
}: DefaultHoggieCalloutProps): JSX.Element {
    const placement = placements[hoggiePlacement]
    return (
        <aside aria-label={ariaLabel} className={`@container not-prose my-6 ${className}`}>
            <div className={`relative border rounded bg-accent border-primary p-4 ${placement.box}`}>
                <Hoggie title={hoggieTitle} className={`absolute ${placement.hoggie}`} />
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
