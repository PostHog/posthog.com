import React from 'react'
import { Progress as BaseProgress } from '@base-ui/react/progress'
import { cn } from '../../../utils'
import { barIndicator, barLabel, barRoot, barTrack, barValue, toneSolid } from '../styles'
import type { Tone } from '../styles'
import { mergeClassName, withClassName } from '../utils'

const ToneContext = React.createContext<Tone>('brand')

const Root = React.forwardRef<HTMLDivElement, Omit<BaseProgress.Root.Props, 'ref'> & { tone?: Tone }>(
    function ProgressRoot({ tone = 'brand', className, ...props }, ref) {
        return (
            <ToneContext.Provider value={tone}>
                <BaseProgress.Root ref={ref} className={mergeClassName(barRoot, className)} {...props} />
            </ToneContext.Provider>
        )
    }
)

const Label = withClassName(BaseProgress.Label, barLabel)

const Value = withClassName(BaseProgress.Value, barValue)

const Track = withClassName(BaseProgress.Track, barTrack)

const shimmerTone: Record<Tone, string> = {
    brand: 'data-[indeterminate]:via-orange',
    success: 'data-[indeterminate]:via-green',
    warning: 'data-[indeterminate]:via-yellow',
    error: 'data-[indeterminate]:via-salmon',
    info: 'data-[indeterminate]:via-blue',
    neutral: 'data-[indeterminate]:via-[rgb(var(--text-primary)/0.5)]',
}

const Indicator = React.forwardRef<HTMLDivElement, Omit<BaseProgress.Indicator.Props, 'ref'>>(
    function ProgressIndicator({ className, ...props }, ref) {
        const tone = React.useContext(ToneContext)
        const fill = tone === 'neutral' ? 'bg-[rgb(var(--text-primary)/0.5)]' : toneSolid[tone]
        return (
            <BaseProgress.Indicator
                ref={ref}
                className={mergeClassName(
                    cn(
                        barIndicator,
                        fill,
                        shimmerTone[tone],
                        'data-[indeterminate]:w-full data-[indeterminate]:animate-[shimmer_1.5s_linear_infinite] data-[indeterminate]:bg-transparent data-[indeterminate]:bg-gradient-to-r data-[indeterminate]:from-transparent data-[indeterminate]:to-transparent data-[indeterminate]:bg-[length:200%_100%] motion-reduce:data-[indeterminate]:animate-none'
                    ),
                    className
                )}
                {...props}
            />
        )
    }
)

export const Progress = { Root, Label, Value, Track, Indicator }
