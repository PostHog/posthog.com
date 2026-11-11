import React from 'react'
import { Meter as BaseMeter } from '@base-ui/react/meter'
import { barIndicator, barRoot, barTrack, barValue, controlLabel } from '../styles'
import { colorFill } from '../colors'
import type { ColorName } from '../colors'
import { mergeClassName, withClassName } from '../utils'

const ColorContext = React.createContext<ColorName>('brand')

const Root = React.forwardRef<HTMLDivElement, Omit<BaseMeter.Root.Props, 'ref' | 'color'> & { color?: ColorName }>(
    function MeterRoot({ color = 'brand', className, ...props }, ref) {
        return (
            <ColorContext.Provider value={color}>
                <BaseMeter.Root ref={ref} className={mergeClassName(barRoot, className)} {...props} />
            </ColorContext.Provider>
        )
    }
)

const Label = withClassName(BaseMeter.Label, controlLabel)

const Value = withClassName(BaseMeter.Value, barValue)

const Track = withClassName(BaseMeter.Track, barTrack)

const Indicator = React.forwardRef<HTMLDivElement, Omit<BaseMeter.Indicator.Props, 'ref'>>(function MeterIndicator(
    { className, ...props },
    ref
) {
    const color = React.useContext(ColorContext)
    const fill = colorFill[color]
    return <BaseMeter.Indicator ref={ref} className={mergeClassName(`${barIndicator} ${fill}`, className)} {...props} />
})

export const Meter = { Root, Label, Value, Track, Indicator }
