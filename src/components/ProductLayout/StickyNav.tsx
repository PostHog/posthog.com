import React, { useState } from 'react'
import { IMenuItem } from './types'
import { Menu } from '@headlessui/react'
import { Chevron } from 'components/Icons'
import { Link as ScrollLink } from 'react-scroll'

export function StickyNav({ menuItems }: { menuItems: IMenuItem[] }) {
    const [activeItem, setActiveItem] = useState(menuItems[0].title)
    return (
        <div className="z-[9999999] sticky bottom-0 text-center mt-12 pb-2">
            <Menu>
                {({ open }) => (
                    <>
                        <Menu.Button className="px-4 py-2 bg-white rounded-md shadow-md font-semibold">
                            <div className="flex space-x-2 justify-center items-baseline">
                                <span>{activeItem}</span>
                                <span>
                                    <Chevron />
                                </span>
                            </div>
                        </Menu.Button>
                        <Menu.Items
                            static
                            as="ul"
                            className={`list-none m-0 bg-white p-4 rounded-md absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full shadow-md ${
                                open ? 'visible' : 'invisible'
                            }`}
                        >
                            {menuItems.map(({ title, id }) => {
                                return (
                                    <Menu.Item key={id} as="li" className="cursor-pointer mt-3 first:mt-0">
                                        {({ active, close }) => {
                                            return (
                                                <ScrollLink
                                                    onClick={() => {
                                                        close()
                                                        setActiveItem(title)
                                                    }}
                                                    offset={-50}
                                                    spy
                                                    smooth
                                                    onSetActive={() => setActiveItem(title)}
                                                    to={id}
                                                    className={`py-2 px-4 rounded-md font-semibold transition-all text-black hover:text-black ${
                                                        activeItem === title ? 'bg-gray-accent-light/80' : ''
                                                    } ${active ? 'bg-gray-accent-light/40' : ''}`}
                                                >
                                                    {title}
                                                </ScrollLink>
                                            )
                                        }}
                                    </Menu.Item>
                                )
                            })}
                        </Menu.Items>
                    </>
                )}
            </Menu>
        </div>
    )
}
