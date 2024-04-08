import React from 'react'
import { Combobox as HeadlessCombobox, Transition } from '@headlessui/react'
import { SelectorIcon, CheckIcon } from '@heroicons/react/outline'
import { classNames } from 'lib/utils'

type ComboboxProps = {
    label?: string
    placeholder?: string
    options: any[]
    value: any | undefined
    onChange: (option: any | undefined) => void
    display?: (option: any) => string
    description?: string
}

export const Combobox = (props: ComboboxProps) => {
    const [query, setQuery] = React.useState<string>('')
    const [focused, setFocused] = React.useState<boolean>(false)

    const filteredOptions =
        query === ''
            ? props.options
            : props.options.filter((option) =>
                  option.toLowerCase().replace(/\s+/g, '').includes(query.replace(/\s+/g, '').toLowerCase())
              )

    const currentValue = props.display ? props.display(props.value) : props.value

    return (
        <HeadlessCombobox
            as="div"
            className="relative focus:outline-none"
            value={props.value}
            onChange={(value) => {
                props.onChange(value)
                setQuery('')
            }}
            nullable
        >
            {({ open }) => (
                <>
                    {props.label && <HeadlessCombobox.Label className="text-sm">{props.label}</HeadlessCombobox.Label>}
                    <HeadlessCombobox.Button
                        as="div"
                        className="flex items-center relative w-full focus:outline-none shadow-sm mt-1.5"
                    >
                        <HeadlessCombobox.Input
                            autoComplete="off"
                            onBlur={() => setFocused(false)}
                            onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
                                event.target.value = ''
                                setFocused(true)
                            }}
                            onClick={(event: React.MouseEvent<HTMLInputElement>) =>
                                ((event.target as HTMLInputElement).value = '')
                            }
                            onChange={(event) => setQuery(event.target.value)}
                            displayValue={props.display}
                            placeholder={currentValue || props.placeholder || 'Select a value'}
                            className={`relative block w-full text-left bg-white dark:bg-accent-dark px-2.5 py-1.5 rounded border border-black/10 dark:border-dark text-sm select-none focus-visible:outline-none focus:ring-1 focus:ring-orange focus:border-orange placeholder:text-primary/50 dark:placeholder:text-primary-dark/50 ${
                                focused ? '' : 'cursor-pointer'
                            }`}
                        />

                        <span className="ml-3 absolute right-0 pr-2 pointer-events-none">
                            <SelectorIcon className="h-4 w-4 text-gray-accent-light" aria-hidden="true" />
                        </span>
                    </HeadlessCombobox.Button>
                    {props.description && (
                        <p className="m-0 mt-1.5 text-sm text-black/50 dark:text-white/50">{props.description}</p>
                    )}
                    <Transition
                        show={open}
                        as={React.Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <HeadlessCombobox.Options className="absolute top-full mt-1 w-full bg-white dark:bg-gray-accent-dark rounded p-0 z-[50] text-sm max-h-[12rem] overflow-y-scroll py-1 focus:outline-none space-y-1 shadow-xl border border-black/10">
                            {filteredOptions.length === 0 && query !== '' ? (
                                <div className="px-2.5 py-1 text-sm text-gray">No results</div>
                            ) : (
                                filteredOptions.map((option) => (
                                    <HeadlessCombobox.Option
                                        value={option}
                                        key={option}
                                        className={({ active }) => `
                                            list-none px-2.5 cursor-pointer focus:outline-none text-sm py-1
                                            ${active ? 'bg-orange text-white' : ''}
                                        `}
                                    >
                                        {({ selected, active }) => (
                                            <div className="flex justify-between items-center">
                                                <span
                                                    className={classNames(
                                                        selected ? 'font-semibold' : 'font-normal',
                                                        'ml-1 block truncate text-sm'
                                                    )}
                                                >
                                                    {props.display ? props.display(option) : option}
                                                </span>

                                                {selected && (
                                                    <span
                                                        className={classNames(
                                                            'flex items-center',
                                                            active ? 'text-white' : 'text-orange'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </HeadlessCombobox.Option>
                                ))
                            )}
                        </HeadlessCombobox.Options>
                    </Transition>
                </>
            )}
        </HeadlessCombobox>
    )
}

export default Combobox
