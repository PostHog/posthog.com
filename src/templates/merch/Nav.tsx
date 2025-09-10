import { Listbox, Transition } from '@headlessui/react'
import { IconCheck, IconChevronDown } from '@posthog/icons'
import Link from 'components/Link'
import { navigate } from 'gatsby'
import React, { Fragment, useState } from 'react'
import type { ShopifyCollection } from './types'

type NavItem = {
    url: string
    title: string
    handle: string
}
type NavProps = {
    className?: string
    items?: NavItem[]
    currentCollectionHandle?: string
}

export function Nav(props: NavProps): React.ReactElement {
    const { currentCollectionHandle, items = [] } = props

    // Fall back to the default page if there's a problem with items
    const defaultItem: NavItem = { url: '', title: 'All products', handle: '' }
    const [currentCollection, setCurrentCollection] = useState<NavItem>(
        items.find((item: NavItem) => item.handle === currentCollectionHandle) || defaultItem
    )

    function handleChange(value: NavItem) {
        setCurrentCollection(value)
        navigate(value.url)
    }

    return (
        <>
            <div className="px-2 z-[50] bg-accent border-b border-primary">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-3 py-1 min-h-[40px]">
                    {/**
                     * If you're on a product page
                     */}
                    {!currentCollectionHandle && <Link to="/merch">&lt; Collections</Link>}

                    {/**
                     * If you're on a collection page
                     */}
                    {items.length > 1 ? (
                        <>
                            {currentCollectionHandle && (
                                <div>
                                    <Listbox value={currentCollection} onChange={handleChange}>
                                        <Listbox.Button
                                            className="group relative inline-flex w-full cursor-pointer rounded-l py-1 pl-2 pr-1 
                            hover:top-[-0.5px] hover:scale-[1.025] active:top-[.5px] active:scale-[.99] 
                            [data-headlessui-state='open']:border [data-headlessui-state='open']:border-b-3
                            rounded-sm text-left border border-transparent border-b-3 hover:border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                                        >
                                            <span className="block truncate font-semibold">
                                                {currentCollection.title}
                                            </span>
                                            <span className="pointer-events-none flex items-center">
                                                <IconChevronDown
                                                    className="h-5 w-5 opacity-60 group-hover:opacity-75"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-10 list-none mt-1 max-h-60 overflow-auto rounded-md bg-white dark:bg-accent-dark dark:text-primary-dark text-sm shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm p-0">
                                                {items.map((collection, i) => (
                                                    <Listbox.Option
                                                        key={i}
                                                        className={({ active }) =>
                                                            `relative select-none py-2 px-4 text-sm cursor-pointer hover:bg-accent ${active ? 'font-bold' : 'opacity-75'
                                                            }`
                                                        }
                                                        value={collection}
                                                    >
                                                        {({
                                                            currentCollection,
                                                        }: {
                                                            currentCollection: ShopifyCollection
                                                        }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${currentCollection ? 'font-bold' : 'font-normal'
                                                                        }`}
                                                                >
                                                                    {collection.title}
                                                                </span>
                                                                {currentCollection ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                        <IconCheck
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </Listbox>
                                </div>
                            )}
                        </>
                    ) : (
                        <span className="text-sm font-medium opacity-75">Merch store</span>
                    )}
                </div>
            </div>
        </>
    )
}
