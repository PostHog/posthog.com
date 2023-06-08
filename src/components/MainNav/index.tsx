import Logo from 'components/Logo'
import { graphql, useStaticQuery } from 'gatsby'
import { useActions, useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import { Chevron, Search } from 'components/Icons'
import { Person } from 'components/NotProductIcons'
import { useSearch } from 'components/Search/SearchContext'

import { Placement } from '@popperjs/core'
import React, { useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { DarkModeToggle } from 'components/DarkModeToggle'
import { useLayoutData } from 'components/Layout/hooks'

const getTailwindClasses = (color: string) => {
    return { text: `text-${color}`, border: `border-${color}` }
}

function Tooltip({
    className = '',
    children,
    content,
    tooltipClassName = '',
    placement = 'bottom',
    title,
}: {
    children: JSX.Element
    content: string | ((setOpen: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode)
    tooltipClassName?: string
    placement?: Placement
    title?: string
    className?: string
}) {
    const [open, setOpen] = useState(false)
    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
    const { setWebsiteTheme } = useActions(layoutLogic)

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement,
        modifiers: [
            {
                name: 'offset',
            },
        ],
    })
    const containerEl = useRef(null)

    useEffect(() => {
        function handleClick(e) {
            if (containerEl?.current && !containerEl?.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [containerEl])

    return (
        <span ref={containerEl} className={className}>
            <button
                ref={setReferenceElement}
                onClick={() => setOpen(!open)}
                className={`px-3 py-2 rounded-tr-md rounded-tl-md ${open ? 'dark:bg-[#484848]' : ''}`}
            >
                {children}
            </button>
            {open && (
                <div
                    className="z-[10000]"
                    role="tooltip"
                    ref={setPopperElement}
                    style={{ ...styles.popper, paddingTop: 0, paddingBottom: 0 }}
                    {...attributes.popper}
                >
                    <div className={`rounded-md shadow-lg overflow-hidden ${tooltipClassName}`}>
                        {title && (
                            <h5
                                className={`bg-white text-sm dark:bg-[#484848] text-black dark:text-white px-4 py-2 z-20 m-0 font-semibold`}
                            >
                                {title}
                            </h5>
                        )}
                        <div
                            className={`bg-white dark:bg-gray-accent-dark text-black dark:text-white px-2 py-2 text-sm z-20`}
                        >
                            {content && (typeof content === 'string' ? content : content(setOpen))}
                        </div>
                    </div>
                </div>
            )}
        </span>
    )
}

export default function MainNav() {
    const { open } = useSearch()
    const { menu, parent, internalMenu, activeInternalMenu } = useLayoutData()
    return (
        <div>
            <div className="border-b border-light dark:border-dark bg-accent dark:bg-accent-dark mb-5">
                <div className="flex max-w-screen-3xl mx-auto px-5 justify-between">
                    <Link className="py-4 grow-0 shrink-0 basis-[auto]" to="/">
                        <Logo color={'white'} className="h-[20px]" />
                    </Link>
                    <ul className="flex list-none m-0 p-0">
                        {menu.map((menuItem) => {
                            const active = menuItem === parent
                            const { name, url } = menuItem
                            return (
                                <li className="h-full" key={name}>
                                    <Link
                                        to={url}
                                        className={`text-sm flex h-full items-center relative p-4 ${
                                            active ? 'px-[calc(1rem_+_10px)] mx-[-10px]' : ''
                                        }`}
                                    >
                                        {active && (
                                            <span
                                                className={`bg-light dark:bg-dark absolute w-full h-[calc(100%+1px)] left-0 inset-0
                                            before:absolute before:border-r before:top-0 before:h-full before:border-light dark:before:border-dark before:w-[10px] before:rounded-br-lg before:border-b before:left-0 before:bg-accent dark:before:bg-accent-dark before:z-10
                                            after:absolute after:border-l after:top-0 after:h-full after:border-light dark:after:border-dark after:w-[10px] after:rounded-bl-lg after:border-b after:right-0 after:bg-accent dark:after:bg-accent-dark`}
                                            >
                                                <span className="absolute bottom-0 left-0 border-b border-bg-light dark:border-bg-dark w-full" />
                                            </span>
                                        )}
                                        <span className="relative">{name}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="flex items-center justify-end">
                        <CallToAction size="xs">Get started</CallToAction>
                        <button className="p-3" onClick={() => open('header')}>
                            <Search className="opacity-50" />
                        </button>
                        <Tooltip
                            placement="bottom-end"
                            title="Login"
                            tooltipClassName="!rounded-tr-none"
                            content={() => {
                                return (
                                    <ul className="list-none m-0 p-0 w-[200px]">
                                        <li>
                                            <Link
                                                className="text-sm px-2 py-2 rounded-sm hover:bg-black/50 block"
                                                to="https://app.posthog.com"
                                            >
                                                PostHog app
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="text-sm px-2 py-2 rounded-sm hover:bg-black/50 block"
                                                to="/community"
                                            >
                                                Community
                                            </Link>
                                        </li>
                                    </ul>
                                )
                            }}
                        >
                            <span className="relative">
                                <Person className="opacity-50" />
                            </span>
                        </Tooltip>
                        <Tooltip
                            className="border-l dark:border-white/20 border-black/20"
                            placement="bottom-end"
                            title="Site settings"
                            tooltipClassName="rounded-tr-none"
                            content={() => {
                                return (
                                    <ul className="list-none m-0 p-0 w-[200px]">
                                        <li>
                                            <button className="text-sm px-2 py-2 flex justify-between items-center rounded-sm hover:bg-black/50 w-full text-left">
                                                <span>Dark mode</span>
                                                <DarkModeToggle />
                                            </button>
                                        </li>
                                        <li>
                                            <button className="text-sm px-2 py-2 rounded-sm hover:bg-black/50 w-full text-left">
                                                Full-width text
                                            </button>
                                        </li>
                                    </ul>
                                )
                            }}
                        >
                            <span className="relative w-5 h-5 flex justify-center items-center">
                                <Chevron className="opacity-50 w-2" />
                            </span>
                        </Tooltip>
                    </div>
                </div>
            </div>
            {internalMenu?.length > 0 && (
                <ul className="flex justify-center space-x-12 list-none m-0 p-0  mb-8 border-b border-light dark:border-dark relative">
                    {internalMenu.map(({ name, url, Icon, color }) => {
                        const active = activeInternalMenu?.name === name
                        return (
                            <li key={name}>
                                <Link to={url} className={`flex relative pb-5`}>
                                    <span className={`w-6 h-6 mr-2 text-${color}`}>
                                        <Icon />
                                    </span>
                                    <span
                                        className={`text-sm ${
                                            active ? 'font-bold opacity-100' : 'font-semibold opacity-60'
                                        }`}
                                    >
                                        {name}
                                    </span>
                                    {active && (
                                        <span
                                            className={`absolute bottom-0 left-0 w-full border-b rounded-full border-${color}`}
                                        />
                                    )}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}
