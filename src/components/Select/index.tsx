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
    onBlur?: () => void
}

export default function Select({
    value,
    onChange,
    placeholder = '',
    className = '',
    search,
    onBlur,
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
        <div ref={ref} className="relative" onBlur={onBlur}>
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
                    <div className="flex items-center justify-between space-x-2">
                        <span>{activeOption?.label || activeOption?.value || placeholder}</span>
                        <Chevron className="w-2.5" />
                    </div>
                </Listbox.Button>
                {open && (
                    <div className="absolute z-50 bg-white dark:bg-gray-accent-dark-hover w-full max-h-[247px] overflow-auto shadow-m border rounded-bl-md rounded-br-md border-border dark:border-dark">
                        {search && (
                            <input
                                className="w-full p-2 text-primary border-b border-border dark:border-dark sticky top-0"
                                placeholder="Search..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        )}
                        {options?.length > 0 && (
                            <Listbox.Options
                                static
                                className="list-none p-0 !m-0 divide-y divide-black/30 dark:divide-primary-dark/30"
                            >
                                {options?.map((option, index) => {
                                    return (
                                        <Listbox.Option
                                            key={`${option.label}-${index}`}
                                            value={option.value}
                                            onClick={() => {
                                                setSearchValue('')
                                                setOpen(false)
                                            }}
                                        >
                                            {({ selected, active }) => (
                                                <div
                                                    className={`${
                                                        selected
                                                            ? 'bg-gray-accent-light text-black dark:bg-gray-accent-dark dark:text-primary-dark'
                                                            : active
                                                            ? 'bg-gray-accent-light/60 dark:bg-gray-accent-dark/60'
                                                            : 'bg-white text-black hover:bg-gray-accent-light/30 dark:bg-gray-accent-dark-hover dark:hover:bg-gray-accent-dark/30 dark:text-primary-dark'
                                                    } py-2 px-4 cursor-pointer transition-all text-sm`}
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
                    </div>
                )}
            </Listbox>
        </div>
    )
}
