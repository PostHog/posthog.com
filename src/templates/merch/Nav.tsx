import { Listbox, Transition } from '@headlessui/react'
import { IconCheck, IconChevronDown } from '@posthog/icons'
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
    const defaultItem: NavItem = { url: '', title: 'All products', handle: '' }
    const [currentCollection, setCurrentCollection] = useState<NavItem>(
        items.find((item: NavItem) => item.handle === currentCollectionHandle) || defaultItem
    )

    function handleChange(value: NavItem) {
        setCurrentCollection(value)
        navigate(value.url)
    }

    return (
        <div className="mb-6 px-2 sticky top-[57px] md:top-[-1px] md:reasonable:top-[107px] z-50 bg-accent dark:bg-accent-dark border-b border-light dark:border-dark">
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-3 py-1">
                <div>
                    <Listbox value={currentCollection} onChange={handleChange}>
                        <Listbox.Button
                            className="group relative inline-flex w-full cursor-pointer rounded-l py-1 pl-2 pr-1 
                        hover:top-[-0.5px] hover:scale-[1.025] active:top-[.5px] active:scale-[.99] 
                        [data-headlessui-state='open']:border [data-headlessui-state='open']:border-b-3
                        rounded-sm text-left border border-transparent border-b-3 hover:border-light dark:hover:border-dark focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                        >
                            <span className="block truncate font-semibold">{currentCollection.title}</span>
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
                            <Listbox.Options className="absolute z-10 list-none mt-1 max-h-60 overflow-auto rounded-md bg-white text-sm shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm p-0">
                                {items.map((collection, i) => (
                                    <Listbox.Option
                                        key={i}
                                        className={({ active }) =>
                                            `relative select-none py-2 px-4 text-sm hover:bg-accent dark:hover:bg-accent-dark ${
                                                active ? 'font-bold' : 'opacity-75'
                                            }`
                                        }
                                        value={collection}
                                    >
                                        {({ currentCollection }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        currentCollection ? 'font-bold' : 'font-normal'
                                                    }`}
                                                >
                                                    {collection.title}
                                                </span>
                                                {currentCollection ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                        <IconCheck className="h-5 w-5" aria-hidden="true" />
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
                <div>
                    <div className="group flex px-2 py-0.5 items-center gap-1 cursor-pointer relative border border-transparent hover:border-light dark:hover:border-dark hover:border-b-3 rounded-sm hover:top-[-0.5px] hover:scale-[1.025] active:top-[.5px] active:scale-[.99]">
                        {/* switch to this we merge master and update the icon package: <IconCart className="h-5 w-5" aria-hidden="true" /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                            <path
                                fillRule="evenodd"
                                d="M1 2.75A.75.75 0 0 1 1.75 2h.93a1.75 1.75 0 0 1 1.716 1.407L4.715 5h15.553a1.75 1.75 0 0 1 1.712 2.11l-1.579 7.5A1.75 1.75 0 0 1 18.69 16H6.819a1.75 1.75 0 0 1-1.715-1.407L2.925 3.701A.25.25 0 0 0 2.68 3.5h-.93A.75.75 0 0 1 1 2.75ZM5.015 6.5l1.56 7.799a.25.25 0 0 0 .245.201h11.869a.25.25 0 0 0 .244-.198l1.58-7.5a.25.25 0 0 0-.245-.302H5.015ZM8 18.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1ZM6 19a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm11-.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm-2 .5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="font-semibold text-[15px] opacity-75 group-hover:opacity-100">0</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
