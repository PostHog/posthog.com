import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { navigate } from 'gatsby'
import React, { Fragment, useState } from 'react'

type NavItem = {
    url: string
    title: string
    handle: string
}
type NavProps = {
    className?: string
    items: NavItem[]
    currentCollectionHandle: string
}

export function Nav(props: NavProps): React.ReactElement {
    console.log('🚀 ~ props:', props)
    const { currentCollectionHandle, items } = props

    // Fall back to the default page if there's a problem with items
    const defaultItem: NavItem = { url: '', title: 'All Products', handle: '' }
    const [currentCollection, setCurrentCollection] = useState<NavItem>(
        items.find((item: NavItem) => item.handle === currentCollectionHandle) || defaultItem
    )

    function handleChange(value: NavItem) {
        setCurrentCollection(value)
        navigate(value.url)
    }

    return (
        <div className="inline-block">
            <Listbox value={currentCollection} onChange={handleChange}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-l py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate font-semibold">{currentCollection.title}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute z-10 list-none mt-1 max-h-60 overflow-auto rounded-md bg-white p-2 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {items.map((collection, i) => (
                                <Listbox.Option
                                    key={i}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 px-4 ${
                                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={collection}
                                >
                                    {({ currentCollection }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    currentCollection ? 'font-medium' : 'font-normal'
                                                }`}
                                            >
                                                {collection.title}
                                            </span>
                                            {currentCollection ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
