import React from 'react'
import { Progress as BaseProgress } from '@base-ui/react/progress'
import { cn } from '../../../utils'
import { barIndicator, barLabel, barRoot, barTrack, barValue } from '../styles'
import { colorFill, colorShimmer } from '../colors'
import type { ColorName } from '../colors'
import { mergeClassName, withClassName } from '../utils'

const ColorContext = React.createContext<ColorName>('brand')

const Root = React.forwardRef<HTMLDivElement, Omit<BaseProgress.Root.Props, 'ref' | 'color'> & { color?: ColorName }>(
    function ProgressRoot({ color = 'brand', className, ...props }, ref) {
        return (
            <ColorContext.Provider value={color}>
                <BaseProgress.Root ref={ref} className={mergeClassName(barRoot, className)} {...props} />
            </ColorContext.Provider>
        )
    }
)

const Label = withClassName(BaseProgress.Label, barLabel)

const Value = withClassName(BaseProgress.Value, barValue)

const Track = withClassName(BaseProgress.Track, barTrack)

const Indicator = React.forwardRef<HTMLDivElement, Omit<BaseProgress.Indicator.Props, 'ref'>>(
    function ProgressIndicator({ className, ...props }, ref) {
        const color = React.useContext(ColorContext)
        const fill = colorFill[color]
        return (
            <BaseProgress.Indicator
                ref={ref}
                className={mergeClassName(
                    cn(
                        barIndicator,
                        fill,
                        colorShimmer[color],
                        'data-[indeterminate]:w-full data-[indeterminate]:animate-[shimmer_1.5s_linear_infinite] data-[indeterminate]:bg-transparent data-[indeterminate]:bg-gradient-to-r data-[indeterminate]:bg-[length:200%_100%] motion-reduce:data-[indeterminate]:animate-none'
                    ),
                    className
                )}
                {...props}
            />
        )
    }
)

export const Progress = { Root, Label, Value, Track, Indicator }
