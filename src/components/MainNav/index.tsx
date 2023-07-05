import Logo from 'components/Logo'
import { useActions, useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'
import Link from 'components/Link'
import { useSearch } from 'components/Search/SearchContext'

import { App, Brightness, Chat, Search, TextWidth, User } from 'components/NewIcons'

import { Placement } from '@popperjs/core'
import React, { useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { useLayoutData } from 'components/Layout/hooks'
import { useLocation } from '@reach/router'
import Toggle from 'components/Toggle'
import usePostHog from 'hooks/usePostHog'
import * as icons from 'components/NewIcons'
import HoverTooltip from 'components/Tooltip'
import { SignupCTA } from 'components/SignupCTA'

const DarkModeToggle = () => {
    const { websiteTheme } = useValues(layoutLogic)

    const handleClick = () => {
        window.__setPreferredTheme(websiteTheme === 'light' ? 'dark' : 'light')
    }

    return (
        <button
            onClick={handleClick}
            className="group/item text-sm px-2 py-2 rounded-sm hover:bg-border dark:hover:bg-border-dark flex justify-between items-center w-full"
        >
            <div>
                <Brightness className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
                <span>Dark mode</span>
            </div>
            <Toggle checked={websiteTheme === 'dark'} />
        </button>
    )
}

function Tooltip({
    className = '',
    children,
    content,
    tooltipClassName = '',
    placement = 'bottom',
}: {
    children: JSX.Element
    content: string | ((setOpen: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode)
    tooltipClassName?: string
    placement?: Placement
    className?: string
}) {
    const [open, setOpen] = useState(false)
    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
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
                className={`my-1 p-2 rounded hover:bg-border dark:hover:bg-border-dark ${
                    open ? 'bg-border dark:bg-border-dark' : ''
                }`}
            >
                {children}
            </button>
            {open && (
                <div
                    className="z-[10000] pt-1"
                    role="tooltip"
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    <div
                        className={`rounded-md border-light dark:border-dark border overflow-hidden ${tooltipClassName}`}
                    >
                        <div
                            className={`bg-accent dark:bg-accent-dark text-primary dark:text-primary-dark text-sm z-20`}
                        >
                            {content && (typeof content === 'string' ? content : content(setOpen))}
                        </div>
                    </div>
                </div>
            )}
        </span>
    )
}

const ActiveBackground = () => {
    return (
        <span
            className={`bg-light dark:bg-dark absolute w-full h-[calc(100%+1px)] left-0 inset-0
                before:absolute before:border-r before:top-0 before:h-full before:border-light dark:before:border-dark before:w-[10px] before:rounded-br-lg before:border-b before:left-0 before:bg-accent dark:before:bg-accent-dark before:z-10
                after:absolute after:border-l after:top-0 after:h-full after:border-light dark:after:border-dark after:w-[10px] after:rounded-bl-lg after:border-b after:right-0 after:bg-accent dark:after:bg-accent-dark`}
        >
            <span className="absolute bottom-0 left-0 border-b border-bg-light dark:border-bg-dark w-full" />
        </span>
    )
}

const MenuItem = ({ url, color, icon, name, initialScrollTo, overflowing, mobile }) => {
    const ref = useRef<HTMLLIElement>(null)
    const { activeInternalMenu } = useLayoutData()
    const active = activeInternalMenu?.name === name
    const Icon = icons[icon]

    useEffect(() => {
        if (initialScrollTo) ref?.current?.scrollIntoView({ block: 'center', inline: 'center' })
    }, [overflowing])

    return (
        <li ref={ref}>
            <Link
                onClick={() => ref?.current?.scrollIntoView({ block: 'center', inline: 'center' })}
                to={url}
                className={`snap-center group flex items-center relative px-2 pt-1.5 pb-1 mb-1 rounded ${
                    active
                        ? ''
                        : 'border border-b-3 border-transparent md:hover:border-light dark:md:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all'
                }`}
            >
                <span className={`w-6 h-6 mr-2 text-${color}`}>
                    <Icon />
                </span>
                <span
                    className={`text-sm whitespace-nowrap ${
                        active ? 'font-bold opacity-100' : 'font-semibold opacity-60 group-hover:opacity-100'
                    }`}
                >
                    {name}
                </span>
                <span
                    className={`absolute ${
                        mobile ? 'top-[-4px]' : 'bottom-[calc(-.5rem_-_1px)]'
                    } left-0 w-full border-b-[1.5px] rounded-full transition-colors ${
                        active ? `border-${color}` : `border-transparent`
                    }`}
                />
            </Link>
        </li>
    )
}

export const InternalMenu = ({ className = '', mobile = false }) => {
    const ref = useRef<HTMLUListElement>(null)
    const { internalMenu, activeInternalMenu } = useLayoutData()
    const [overflowing, setOverflowing] = useState(false)
    const activeIndex = internalMenu?.findIndex((menu) => menu === activeInternalMenu)

    function handleResize() {
        setOverflowing((ref?.current && ref?.current.scrollWidth > ref?.current.clientWidth) || false)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return internalMenu?.length > 0 ? (
        <ul
            style={{ justifyContent: overflowing ? 'start' : 'center' }}
            ref={ref}
            className={`flex space-x-4 list-none m-0 pt-1 px-4 border-b border-light dark:border-dark relative snap-x overflow-x-auto overflow-y-hidden ${className}`}
        >
            {internalMenu.map((menuItem, index) => {
                return (
                    <MenuItem
                        key={menuItem.name}
                        {...menuItem}
                        initialScrollTo={activeIndex === index}
                        overflowing={overflowing}
                        mobile={mobile}
                    />
                )
            })}
        </ul>
    ) : null
}

const keyboardShortcut =
    'box-content p-[5px] border border-b-2 border-gray-accent-light dark:border-gray-accent-light/40 rounded-[3px] inline-flex text-black/35 dark:text-white/40 text-code text-xs'

export const Main = () => {
    const { open } = useSearch()
    const { menu, parent, internalMenu, fullWidthContent, setFullWidthContent } = useLayoutData()
    const { pathname } = useLocation()
    const { websiteTheme } = useValues(layoutLogic)
    const { setWebsiteTheme } = useActions(layoutLogic)
    const posthog = usePostHog()

    useEffect(() => {
        if (window) {
            setWebsiteTheme(window.__theme)
            window.__onThemeChange = () => {
                setWebsiteTheme(window.__theme)
                if (posthog) {
                    posthog.people.set({ preferred_theme: window.__theme })
                }
            }
        }
    }, [])

    const toggleWideMode = () => {
        const wideMode = !fullWidthContent
        setFullWidthContent(wideMode)
        if (posthog) {
            posthog.people.set({ preferred_viewing_mode: wideMode ? 'wide' : 'standard' })
        }
    }

    return (
        <div>
            <div className="border-b border-light dark:border-dark bg-accent dark:bg-accent-dark mb-1">
                <div
                    className={`flex mx-auto px-2 md:px-5 justify-between transition-all ${
                        fullWidthContent ? 'max-w-full' : 'max-w-screen-2xl box-content'
                    }`}
                >
                    <Link className="py-4 grow-0 shrink-0 basis-[auto] dark:text-primary-dark relative" to="/">
                        {pathname === '/' && <ActiveBackground />}
                        <Logo
                            color={websiteTheme === 'dark' && 'white'}
                            className="h-[24px] fill-current relative px-2 box-content"
                        />
                    </Link>

                    <ul className="lg:flex hidden list-none m-0 p-0">
                        {menu.map((menuItem) => {
                            const active = menuItem.name === parent?.name
                            const { name, url } = menuItem
                            return (
                                <li className="h-full" key={name}>
                                    <Link
                                        to={url}
                                        className={`text-[13.5px] font-medium flex h-full items-center relative p-4 ${
                                            active
                                                ? 'px-[calc(1rem_+_10px)] mx-[-10px]'
                                                : 'opacity-70 hover:opacity-100'
                                        }`}
                                    >
                                        {active && <ActiveBackground />}
                                        <span className="relative">{name}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="flex items-center justify-end">
                        <SignupCTA size="sm" type="outline" className="hidden sm:flex mr-2" text="Get started" />
                        <HoverTooltip
                            content={() => (
                                <div className="text-xs">
                                    Open with <kbd className={`${keyboardShortcut} py-0`}>/</kbd>
                                </div>
                            )}
                        >
                            <button
                                className="group my-1mr-[1px] p-2 hover:bg-border dark:hover:bg-border-dark rounded"
                                onClick={() => open('header')}
                            >
                                <Search className="opacity-50 inline-block w-6 group-hover:opacity-75" />
                            </button>
                        </HoverTooltip>

                        <Tooltip
                            placement="bottom-end"
                            className="group/parent relative text-primary dark:text-primary-dark"
                            content={() => {
                                return (
                                    <ul className="list-none text-left m-0 p-0 pb-[3px] space-y-[2px] w-[200px]">
                                        <li className="bg-border/20 dark:bg-border-dark/20 border-b border-light dark:border-dark text-[13px] px-2 py-1.5 text-primary/50 dark:text-primary-dark/60 z-20 m-0 !mb-[3px] font-semibold">
                                            Go to...
                                        </li>
                                        <li className="px-1">
                                            <Link
                                                className="group/item text-sm px-2 py-2 rounded-sm hover:bg-border dark:hover:bg-border-dark block"
                                                to="https://app.posthog.com"
                                            >
                                                <App className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
                                                PostHog app
                                            </Link>
                                        </li>
                                        <li className="px-1">
                                            <Link
                                                className="group/item text-sm px-2 py-2 rounded-sm hover:bg-border dark:hover:bg-border-dark block"
                                                to="/questions"
                                            >
                                                <Chat className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
                                                Community
                                            </Link>
                                        </li>
                                        <li className="bg-border/20 dark:bg-border-dark/20 border-y border-light dark:border-dark text-[13px] px-2 py-1.5 !my-1 text-primary/50 dark:text-primary-dark/60 z-20 m-0 font-semibold">
                                            Site settings
                                        </li>
                                        <li className="px-1">
                                            <DarkModeToggle />
                                        </li>
                                        <li className="hidden md:block px-1">
                                            <button
                                                onClick={toggleWideMode}
                                                className="group/item text-sm px-2 py-2 rounded-sm hover:bg-border dark:hover:bg-border-dark flex justify-between items-center w-full"
                                            >
                                                <div>
                                                    <TextWidth className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
                                                    <span>Wide mode</span>
                                                </div>
                                                <Toggle checked={fullWidthContent} />
                                            </button>
                                        </li>
                                    </ul>
                                )
                            }}
                        >
                            <User className="opacity-50 inline-block w-6 group-hover/parent:opacity-75" />
                        </Tooltip>
                    </div>
                </div>
            </div>
            <InternalMenu className="lg:flex hidden" />
        </div>
    )
}

export const Mobile = () => {
    const { menu, parent } = useLayoutData()

    return (
        <div className="fixed bottom-0 w-full lg:hidden z-[9999]">
            <InternalMenu mobile className="bg-accent dark:bg-accent-dark border-t" />
            <ul className="grid grid-cols-5 gap-[2px] list-none m-0 py-1 px-2 bg-accent dark:bg-accent-dark">
                {menu.map((menuItem) => {
                    const active = menuItem.name === parent?.name
                    const { name, url, icon } = menuItem
                    const Icon = icons[icon]
                    return (
                        <li className="h-full" key={name}>
                            <Link
                                to={url}
                                className={`text-[12.5px] font-medium relative px-4 py-3 flex flex-col space-y-1 items-center ${
                                    active
                                        ? 'bg-accent-dark/10 dark:bg-accent/10 rounded font-bold'
                                        : 'opacity-70 hover:opacity-100'
                                }`}
                            >
                                <span className={`w-5 h-5 inline-block`}>
                                    <Icon />
                                </span>
                                <span>{name}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
