import { RadioGroup } from '@headlessui/react'
import React from 'react'
import { cn } from '../../utils'
import { ProductVariantOption, ProductVariantSelection } from './types'

const colorClasses: Record<string, string> = {
    white: 'bg-[#FFF]',
    navy: 'bg-[#363646]',
}

type ProductOptionSelectProps = {
    onChange: (val: string) => void
    className?: string
    option: ProductVariantOption
    value: string | null
    selections: ProductVariantSelection[]
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
        <RadioGroup value={value} onChange={onChange} className={classes}>
            <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
            <div className="flex flex-wrap gap-2">
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
                                    active ? 'font-bold' : 'font-medium',
                                    'flex-0 group relative border border-b-3 border-light dark:border-dark hover:top-[-1px] hover:scale-[1.005] active:top-[.5px] active:scale-[.99] rounded-md py-2 px-3 flex items-center justify-center text-xs  uppercase hover:bg-primary-100 focus:outline-none'
                                )
                            }
                        >
                            {({ active, checked }) => {
                                return (
                                    <>
                                        <RadioGroup.Label as="span" className="z-10">
                                            {optionValue.replace(/\(.*?\)/g, '')}
                                        </RadioGroup.Label>
                                        {!isDisabled ? (
                                            <span
                                                className={cn(
                                                    active ? 'border' : 'border',
                                                    checked ? 'bg-white dark:bg-accent-dark ' : 'border-transparent',
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
    )
}
