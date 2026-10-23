import React from 'react'
import { Meter as BaseMeter } from '@base-ui/react/meter'
import { barIndicator, barLabel, barRoot, barTrack, barValue, toneSolid } from '../styles'
import type { Tone } from '../styles'
import { mergeClassName, withClassName } from '../utils'

const ToneContext = React.createContext<Tone>('brand')

const Root = React.forwardRef<HTMLDivElement, Omit<BaseMeter.Root.Props, 'ref'> & { tone?: Tone }>(function MeterRoot(
    { tone = 'brand', className, ...props },
    ref
) {
    return (
        <ToneContext.Provider value={tone}>
            <BaseMeter.Root ref={ref} className={mergeClassName(barRoot, className)} {...props} />
        </ToneContext.Provider>
    )
})

const Label = withClassName(BaseMeter.Label, barLabel)

const Value = withClassName(BaseMeter.Value, barValue)

const Track = withClassName(BaseMeter.Track, barTrack)

const Indicator = React.forwardRef<HTMLDivElement, Omit<BaseMeter.Indicator.Props, 'ref'>>(function MeterIndicator(
    { className, ...props },
    ref
) {
    const tone = React.useContext(ToneContext)
    const fill = tone === 'neutral' ? 'bg-[rgb(var(--text-primary)/0.5)]' : toneSolid[tone]
    return <BaseMeter.Indicator ref={ref} className={mergeClassName(`${barIndicator} ${fill}`, className)} {...props} />
})

export const Meter = { Root, Label, Value, Track, Indicator }
