import { Listbox } from '@headlessui/react'
import { Chevron } from 'components/Icons'
import React from 'react'

type Option = {
    label?: string
    value: any
}

type Props = {
    value?: any
    onChange: (value: any) => void
    options: Option[]
    placeholder?: string
}

export default function Select({ value, onChange, options, placeholder = '' }: Props): JSX.Element {
    const activeOption = options.find((option) => option.value === value)
    return (
        <div className="relative border-b border-border dark:border-dark">
            <Listbox value={value} onChange={onChange}>
                <Listbox.Button
                    className={`font-semibold text-black dark:text-primary-dark text-base w-full py-3 px-4 outline-none rounded-none text-left flex items-center justify-between ${
                        !value ? 'opacity-60' : ''
                    }`}
                >
                    <span>{activeOption?.label || activeOption?.value || placeholder}</span>
                    <Chevron className="w-2.5" />
                </Listbox.Button>
                {options?.length > 0 && (
                    <Listbox.Options className="list-none p-0 m-0 absolute z-20 bg-white dark:bg-gray-accent-dark-hover w-full max-h-[247px] overflow-auto shadow-md rounded-br-md rounded-bl-md border-t divide-y border-black/30 dark:border-primary-dark/30 divide-black/30 dark:divide-primary-dark/30">
                        {options.map((option, index) => {
                            return (
                                <Listbox.Option key={`${option.label}-${index}`} value={option.value}>
                                    {({ selected }) => (
                                        <div
                                            className={`${
                                                selected
                                                    ? 'bg-gray-accent-light text-black dark:bg-gray-accent-dark dark:text-primary-dark'
                                                    : 'bg-white text-black hover:bg-gray-accent-light/30 dark:bg-gray-accent-dark-hover dark:hover:bg-gray-accent-dark/30 dark:text-primary-dark'
                                            } py-2 px-4 cursor-pointer transition-all`}
                                        >
                                            {option.label || option.value}
                                        </div>
                                    )}
                                </Listbox.Option>
                            )
                        })}
                    </Listbox.Options>
                )}
            </Listbox>
        </div>
    )
}
