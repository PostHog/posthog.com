import React from 'react'
import { Slider as BaseSlider } from '@base-ui/react/slider'
import { controlLabel, grainSurface, trackSurface } from '../styles'
import { mergeClassName, withClassName } from '../utils'

const RANGE_SEPARATOR = ' – '

const Root = withClassName(
    BaseSlider.Root,
    'flex w-full touch-none select-none flex-col gap-1.5 data-[orientation=vertical]:w-auto data-[orientation=vertical]:items-center'
)

const Label = withClassName(BaseSlider.Label, controlLabel)

const digitColumn =
    "block w-min break-all transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] before:content-['0123456789'] motion-reduce:transition-none"

function Odometer({ text }: { text: string }) {
    const characters = text.split('')
    return (
        <span aria-hidden className="inline-flex select-none align-top">
            {characters.map((character, index) => {
                const place = characters.length - index
                if (!/\d/.test(character)) {
                    return <span key={`symbol-${place}`}>{character}</span>
                }
                return (
                    <span key={`digit-${place}`} className="inline-block h-[1lh] overflow-hidden">
                        <span
                            className={digitColumn}
                            style={{ transform: `translateY(-${Number(character) * 10}%)` }}
                        />
                    </span>
                )
            })}
        </span>
    )
}

const renderOdometers = (formattedValues: readonly string[]): React.ReactNode => (
    <>
        <span className="sr-only">{formattedValues.join(RANGE_SEPARATOR)}</span>
        {formattedValues.map((formattedValue, index) => (
            <React.Fragment key={index}>
                {index > 0 && <span aria-hidden>{RANGE_SEPARATOR}</span>}
                <Odometer text={formattedValue} />
            </React.Fragment>
        ))}
    </>
)

const Value = React.forwardRef<HTMLOutputElement, Omit<BaseSlider.Value.Props, 'ref'>>(function SliderValue(
    { className, children = renderOdometers, ...props },
    ref
) {
    return (
        <BaseSlider.Value
            ref={ref}
            className={mergeClassName('text-sm tabular-nums text-secondary', className)}
            {...props}
        >
            {children}
        </BaseSlider.Value>
    )
})

const Control = withClassName(
    BaseSlider.Control,
    'flex w-full items-center py-1.5 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:px-1.5 data-[orientation=vertical]:py-0 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
)

const Track = withClassName(
    BaseSlider.Track,
    `relative h-2 w-full rounded-full data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-32 data-[orientation=vertical]:w-2 ${trackSurface}`
)

const Indicator = withClassName(BaseSlider.Indicator, 'rounded-full bg-orange')

const Thumb = withClassName(
    BaseSlider.Thumb,
    `${grainSurface} size-4 rounded-full border border-button bg-orange shadow-[0_1px_0_rgb(0_0_0/0.18)] dark:border-button-dark has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[rgb(var(--text-primary))]`
)

export const Slider = { Root, Label, Value, Control, Track, Indicator, Thumb }
