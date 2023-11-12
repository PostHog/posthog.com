import Logo from 'components/Logo'
import { useActions, useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'
import Link from 'components/Link'
import { useSearch } from 'components/Search/SearchContext'
import { IconApp, IconBrightness, IconChat, IconChevronDown, IconSearch, IconTextWidth, IconUser } from '@posthog/icons'
import { Placement } from '@popperjs/core'
import React, { useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { useLayoutData } from 'components/Layout/hooks'
import { useLocation } from '@reach/router'
import Toggle from 'components/Toggle'
import usePostHog from 'hooks/usePostHog'
import HoverTooltip from 'components/Tooltip'
import { SignupCTA } from 'components/SignupCTA'
import { CallToAction } from 'components/CallToAction'
import { useInView } from 'react-intersection-observer'
import * as icons from '@posthog/icons'

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
                <IconBrightness className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
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

const ActiveBackground = ({ mobile = false }) => {
    return (
        <span
            className={`bg-light dark:bg-dark absolute w-full h-[calc(100%+1px)] left-0 inset-0
                before:absolute before:border-r before:top-0 before:h-full before:border-light dark:before:border-dark before:w-[10px] before:left-0 before:bg-accent dark:before:bg-accent-dark before:z-10
                after:absolute after:border-l after:top-0 after:h-full after:border-light dark:after:border-dark after:w-[10px] after:right-0 after:bg-accent dark:after:bg-accent-dark ${
                    mobile
                        ? 'before:rounded-tr-lg after:rounded-tl-lg top-[-1px] before:border-t after:border-t'
                        : 'before:rounded-br-lg after:rounded-bl-lg before:border-b after:border-b'
                }`}
        >
            <span
                className={`absolute ${
                    mobile ? 'top-0' : 'bottom-0'
                } left-0 border-b border-bg-light dark:border-bg-dark w-full`}
            />
        </span>
    )
}

export const InternalMenu = ({ className = '', mobile = false, menu, activeIndex, scrollOnRender = true }) => {
    const ref = useRef<HTMLUListElement>(null)
    const [firstRef, firstInView] = useInView({ threshold: 1 })
    const [lastRef, lastInView] = useInView({ threshold: 1 })
    const [overflowing, setOverflowing] = useState(false)
    const menuItemsRef = useRef(null)

    const scrollToIndex = (index) => {
        const map = getMap()
        const node = map.get(index)
        node?.scrollIntoView({
            block: 'nearest',
            inline: 'center',
        })
    }

    const getMap = () => {
        if (!menuItemsRef.current) {
            menuItemsRef.current = new Map()
        }
        return menuItemsRef.current
    }

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

    useEffect(() => {
        if (scrollOnRender && overflowing) scrollToIndex(activeIndex)
    }, [overflowing])

    return menu?.length > 0 ? (
        <div className="relative">
            {overflowing && (
                <button
                    onDoubleClick={(e) => e.preventDefault()}
                    onClick={() => ref.current?.scrollBy({ left: -75, behavior: 'smooth' })}
                    className={`absolute top-0 left-0 h-[calc(100%-2px)] flex justify-end items-center w-10 pl-2 bg-gradient-to-l from-transparent to-light via-light dark:via-dark dark:to-dark ${
                        firstInView ? '-z-10' : 'z-10'
                    }`}
                >
                    <IconChevronDown className="w-8 h-8 rounded-sm text-primary/60 hover:text-primary/100 dark:text-primary-dark/60 dark:hover:text-primary-dark/100 rotate-90 hover:bg-accent/25 dark:hover:bg-accent-dark/25 hover:backdrop-blur-sm active:backdrop-blur-sm border-transparent hover:border hover:border-light dark:hover:border-dark relative hover:scale-[1.02] active:top-[.5px] active:scale-[.99]" />
                </button>
            )}
            <ul
                style={{ justifyContent: overflowing ? 'start' : 'center' }}
                ref={ref}
                className={`flex space-x-4 list-none m-0 pt-1 px-4 border-b border-light dark:border-dark relative snap-x snap-mandatory overflow-x-auto overflow-y-hidden ${className}`}
            >
                {menu.map((menuItem, index) => {
                    const { url, color, icon, name, onClick } = menuItem
                    const Icon = icons[icon]
                    const active = menu[activeIndex]?.name === menuItem.name
                    return (
                        <li
                            key={menuItem.name}
                            ref={(node) => {
                                const map = getMap()
                                if (node) {
                                    map.set(index, node)
                                } else {
                                    map.delete(index)
                                }
                            }}
                        >
                            <div ref={index === 0 ? firstRef : index === menu.length - 1 ? lastRef : null}>
                                <Link
                                    onClick={() => {
                                        scrollToIndex(index)
                                        onClick?.()
                                    }}
                                    to={url}
                                    className={`snap-center group flex items-center relative px-2 pt-1.5 pb-1 mb-1 rounded hover:bg-light/50 hover:dark:bg-dark/50 ${
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
                                            active
                                                ? 'font-bold opacity-100'
                                                : 'font-semibold opacity-60 group-hover:opacity-100'
                                        }`}
                                    >
                                        {name}
                                    </span>
                                    <span
                                        className={`absolute ${
                                            mobile ? 'top-[-4px]' : '-bottom-2'
                                        } left-0 w-full border-b-[1.5px] rounded-full transition-colors ${
                                            active ? `border-${color}` : `border-transparent`
                                        }`}
                                    />
                                </Link>
                            </div>
                        </li>
                    )
                })}
            </ul>
            {overflowing && (
                <button
                    onDoubleClick={(e) => e.preventDefault()}
                    onClick={() => ref.current?.scrollBy({ left: 75, behavior: 'smooth' })}
                    className={`absolute top-0 right-0 h-[calc(100%-2px)] flex justify-end items-center w-10 pr-2 bg-gradient-to-r from-transparent to-light via-light dark:via-dark dark:to-dark ${
                        lastInView ? '-z-10' : 'z-10'
                    }`}
                >
                    <IconChevronDown className="w-8 h-8 rounded-sm text-primary/60 hover:text-primary/100 dark:text-primary-dark/60 dark:hover:text-primary-dark/100 -rotate-90 hover:bg-accent/25 dark:hover:bg-accent-dark/25 hover:backdrop-blur-sm active:backdrop-blur-sm border-transparent hover:border hover:border-light dark:hover:border-dark relative hover:scale-[1.02] active:top-[.5px] active:scale-[.99]" />
                </button>
            )}
        </div>
    ) : null
}

const keyboardShortcut =
    'box-content p-[5px] border border-b-2 border-gray-accent-light dark:border-gray-accent-light/40 rounded-[3px] inline-flex text-black/35 dark:text-white/40 text-code text-xs'

export const Main = () => {
    const { open } = useSearch()
    const { menu, parent, internalMenu, activeInternalMenu, fullWidthContent, setFullWidthContent } = useLayoutData()
    const { pathname } = useLocation()
    const { websiteTheme } = useValues(layoutLogic)
    const { setWebsiteTheme } = useActions(layoutLogic)
    const [posthogInstance, setPosthogInstance] = useState<string>()
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
            const instanceCookie = document.cookie
                .split('; ')
                ?.filter((row) => row.startsWith('ph_current_instance='))
                ?.map((c) => c.split('=')?.[1])?.[0]
            if (instanceCookie) {
                setPosthogInstance(instanceCookie)
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
                    className={`flex mx-auto px-2 md:px-0 mdlg:px-5 justify-between transition-all ${
                        fullWidthContent ? 'max-w-full' : 'max-w-screen-3xl box-content'
                    }`}
                >
                    <div className="flex-1 flex">
                        <Link className="py-4 grow-0 shrink-0 basis-[auto] dark:text-primary-dark relative" to="/">
                            {pathname === '/' && <ActiveBackground />}
                            <Logo
                                color={websiteTheme === 'dark' && 'white'}
                                className="h-[24px] fill-current relative px-2 box-content"
                            />
                        </Link>
                    </div>
                    <ul className="md:flex hidden list-none m-0 p-0">
                        {menu.map((menuItem) => {
                            const active = menuItem.name === parent?.name
                            const { name, url } = menuItem
                            return (
                                <li className="h-full" key={name}>
                                    <Link
                                        to={url}
                                        className={`text-[13.5px] font-medium flex h-full items-center relative px-3 py-4 mdlg:p-4 ${
                                            active
                                                ? 'px-[calc(.75rem_+_10px)] mdlg:px-[calc(1rem_+_10px)] mx-[-10px]'
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
                    <div className="flex items-center justify-end flex-1">
                        {posthogInstance ? (
                            <CallToAction
                                type={'outline'}
                                className={'hidden sm:flex mr-2'}
                                to={posthogInstance.replace(/"/g, '')}
                                size={'sm'}
                                event={'clicked Dashboard in main nav'}
                            >
                                Dashboard
                            </CallToAction>
                        ) : (
                            <SignupCTA size="sm" type="outline" className="hidden sm:flex mr-2" text="Get started" />
                        )}
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
                                <IconSearch className="opacity-50 inline-block w-6 group-hover:opacity-75" />
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
                                                <IconApp className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
                                                PostHog app
                                            </Link>
                                        </li>
                                        <li className="px-1">
                                            <Link
                                                className="group/item text-sm px-2 py-2 rounded-sm hover:bg-border dark:hover:bg-border-dark block"
                                                to="/questions"
                                            >
                                                <IconChat className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
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
                                                    <IconTextWidth className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
                                                    <span>Wide mode</span>
                                                </div>
                                                <Toggle checked={fullWidthContent} />
                                            </button>
                                        </li>
                                    </ul>
                                )
                            }}
                        >
                            <IconUser className="opacity-50 inline-block w-6 group-hover/parent:opacity-75" />
                        </Tooltip>
                    </div>
                </div>
            </div>
            <InternalMenu
                menu={internalMenu}
                activeIndex={internalMenu?.findIndex((menu) => menu === activeInternalMenu)}
                className="md:flex hidden"
            />
        </div>
    )
}

export const Mobile = () => {
    const { menu, parent, internalMenu, activeInternalMenu } = useLayoutData()

    return (
        <div className="fixed bottom-0 w-full md:hidden z-[9999999]">
            <InternalMenu
                mobile
                className="bg-light dark:bg-dark border-t mb-[-1px]"
                menu={internalMenu}
                activeIndex={internalMenu?.findIndex((menu) => menu === activeInternalMenu)}
            />
            <ul className="grid grid-cols-5 gap-[2px] list-none m-0 px-2 bg-accent dark:bg-accent-dark border-t border-border dark:border-dark">
                {menu.map((menuItem) => {
                    const active = menuItem.name === parent?.name
                    const { name, url, icon } = menuItem
                    const Icon = icons[icon]
                    return (
                        <li className="h-full" key={name}>
                            <Link
                                to={url}
                                className={`text-[12.5px] font-medium relative px-4 py-4 flex flex-col space-y-1 items-center ${
                                    active
                                        ? 'bg-light dark:bg-dark font-bold px-[calc(1rem_+_10px)] mx-[-10px]'
                                        : 'opacity-70 hover:opacity-100'
                                }`}
                            >
                                {active && <ActiveBackground mobile />}
                                <span className={`w-5 h-5 inline-block relative !m-0`}>
                                    <Icon />
                                </span>
                                <span className="relative">{name}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
