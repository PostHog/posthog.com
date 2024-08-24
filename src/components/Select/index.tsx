import { Listbox } from '@headlessui/react'
import { Chevron } from 'components/Icons'
import React, { useEffect, useRef, useState } from 'react'

type Option = {
    label?: string
    value: any
    subtext?: string
}

type Props = {
    value?: any
    onChange: (value: any) => void
    options: Option[]
    placeholder?: string
    className?: string
    search?: boolean
}

export default function Select({
    value,
    onChange,
    placeholder = '',
    className = '',
    search,
    ...other
}: Props): JSX.Element {
    const ref = useRef<HTMLDivElement>(null)
    const [options, setOptions] = useState(other.options)
    const [searchValue, setSearchValue] = useState('')
    const [open, setOpen] = useState(false)
    const activeOption = other.options.find((option) => option.value === value)

    useEffect(() => {
        if (search) {
            const filteredOptions = other.options.filter((option) => {
                return option.label?.toLowerCase().includes(searchValue.toLowerCase())
            })
            setOptions(filteredOptions)
        }
    }, [searchValue])

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    useEffect(() => {
        setOptions(other.options)
    }, [other.options])

    return (
        <div ref={ref} className="relative">
            <Listbox value={value} onChange={onChange}>
                <Listbox.Button
                    onClick={() => {
                        setOpen(!open)
                    }}
                    className={`font-semibold text-black dark:text-primary-dark text-base w-full py-3 px-4 outline-none rounded-none text-left ${
                        !value ? 'opacity-60' : ''
                    } ${className}`}
                >
                    {placeholder && !!activeOption && (
                        <label className="text-sm opacity-60 -mb-0.5 block">{placeholder}</label>
                    )}
                    <div className="flex items-center justify-between">
                        <span>{activeOption?.label || activeOption?.value || placeholder}</span>
                        <Chevron className="w-2.5" />
                    </div>
                </Listbox.Button>
                {search && open && (
                    <input
                        autoFocus
                        className="w-full p-2 text-primary"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                )}
                {options?.length > 0 && open && (
                    <Listbox.Options
                        static
                        className="list-none p-0 m-0 absolute z-50 bg-white dark:bg-gray-accent-dark-hover w-full max-h-[247px] overflow-auto shadow-md rounded-br-md rounded-bl-md border-t divide-y border-black/30 dark:border-primary-dark/30 divide-black/30 dark:divide-primary-dark/30"
                    >
                        {options?.map((option, index) => {
                            return (
                                <Listbox.Option
                                    key={`${option.label}-${index}`}
                                    value={option.value}
                                    onClick={() => setOpen(false)}
                                >
                                    {({ selected }) => (
                                        <div
                                            className={`${
                                                selected
                                                    ? 'bg-gray-accent-light text-black dark:bg-gray-accent-dark dark:text-primary-dark'
                                                    : 'bg-white text-black hover:bg-gray-accent-light/30 dark:bg-gray-accent-dark-hover dark:hover:bg-gray-accent-dark/30 dark:text-primary-dark'
                                            } py-2 px-4 cursor-pointer transition-all`}
                                        >
                                            <div>{option.label || option.value}</div>
                                            {option?.subtext && (
                                                <div className="text-sm opacity-70 leading-none mb-1">
                                                    {option.subtext}
                                                </div>
                                            )}
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
