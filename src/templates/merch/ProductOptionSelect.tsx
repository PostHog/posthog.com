import { RadioGroup } from '@headlessui/react'
import React, { type Dispatch, type SetStateAction } from 'react'
import { cn } from '../../utils'
import { ProductVariantOption } from './types'

const colorClasses: Record<string, string> = {
    white: 'bg-[#FFF]',
    navy: 'bg-[#363646]',
}

type ProductOptionSelectProps = {
    onChange: Dispatch<SetStateAction<string | null>>
    className?: string
    option: ProductVariantOption
    value: string | null
}

export function ProductOptionSelect(props: ProductOptionSelectProps): React.ReactElement | null {
    const { className, option, onChange, value } = props

    if (!option) return null

    let isColor = false
    if (option.name.toLowerCase() === 'color') {
        isColor = true
    }

    const classes = cn('', className)

    return (
        <div className={classes}>
            <RadioGroup value={value} onChange={onChange} className="mt-4">
                <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                <div className="flex flex-wrap gap-4">
                    {option.values.map((optionValue, i) => {
                        const isDisabled = false
                        return (
                            <RadioGroup.Option
                                key={i}
                                value={optionValue}
                                disabled={isDisabled}
                                className={({ active }) =>
                                    cn(
                                        isColor && colorClasses[optionValue.toLowerCase() as string],
                                        isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
                                        active ? 'ring-accent-500 ring-2' : '',
                                        'flex-0 group relative border rounded-md py-2 px-3 flex items-center justify-center text-xs font-medium uppercase hover:bg-primary-100 focus:outline-none'
                                    )
                                }
                            >
                                {({ active, checked }) => {
                                    return (
                                        <>
                                            <RadioGroup.Label as="span" className="z-10">
                                                {optionValue}
                                            </RadioGroup.Label>
                                            {!isDisabled ? (
                                                <span
                                                    className={cn(
                                                        active ? 'border' : 'border-2',
                                                        checked
                                                            ? 'border-accent-500 border-black'
                                                            : 'border-transparent',
                                                        'pointer-events-none absolute -inset-px rounded-md'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <span
                                                    aria-hidden="true"
                                                    className="border-form-200 pointer-events-none absolute -inset-px rounded-md border-2"
                                                >
                                                    <svg
                                                        className="text-form-200 absolute inset-0 h-full w-full stroke-2"
                                                        viewBox="0 0 100 100"
                                                        preserveAspectRatio="none"
                                                        stroke="currentColor"
                                                    >
                                                        <line
                                                            x1={0}
                                                            y1={100}
                                                            x2={100}
                                                            y2={0}
                                                            vectorEffect="non-scaling-stroke"
                                                        />
                                                    </svg>
                                                </span>
                                            )}
                                        </>
                                    )
                                }}
                            </RadioGroup.Option>
                        )
                    })}
                </div>
            </RadioGroup>
        </div>
    )
}
