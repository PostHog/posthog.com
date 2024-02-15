import Link from 'components/Link'
import Logo from 'components/Logo'
import { useSearch } from 'components/Search/SearchContext'
import { useActions, useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'

import {
    IconApp,
    IconBrightness,
    IconChat,
    IconMessage,
    IconSearch,
    IconTextWidth,
    IconUser,
    IconChevronDown,
} from '@posthog/icons'

import { Placement } from '@popperjs/core'
import * as icons from '@posthog/icons'
import { IconExternal } from '@posthog/icons'
import { useLocation } from '@reach/router'
import { CallToAction } from 'components/CallToAction'
import { useLayoutData } from 'components/Layout/hooks'
import { SignupCTA } from 'components/SignupCTA'
import Toggle from 'components/Toggle'
import HoverTooltip from 'components/Tooltip'
import dayjs from 'dayjs'
import usePostHog from 'hooks/usePostHog'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { usePopper } from 'react-popper'
import getAvatarURL from 'components/Squeak/util/getAvatar'

export const Avatar = (props: { className?: string; src?: string }) => {
    return (
        <div className={`overflow-hidden rounded-full ${props.className}`}>
            {props.src ? (
                <img className="w-full h-full" alt="" src={props.src} />
            ) : (
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.0782 41.0392H5.42978C4.03134 41.0392 3.1173 40.1642 3.09386 38.7736C3.07823 37.7814 3.07042 36.797 3.10948 35.8048C3.15636 34.6329 3.72668 33.7345 4.74228 33.1798C8.0782 31.3595 11.4299 29.5783 14.7659 27.7658C15.0081 27.633 15.1565 27.758 15.3362 27.8517C18.1878 29.3439 21.0942 29.4689 24.0626 28.2267C24.1485 28.1955 24.2423 28.1721 24.3126 28.1096C24.9298 27.5861 25.4845 27.7971 26.1251 28.1486C29.1173 29.7971 32.1331 31.4143 35.1487 33.0238C36.4534 33.7191 37.094 34.766 37.0706 36.2426C37.0549 37.0785 37.0706 37.9067 37.0706 38.7426C37.0628 40.1254 36.1409 41.0395 34.7659 41.0395H20.0783L20.0782 41.0392Z"
                        fill="#BFBFBC"
                    />
                    <path
                        d="M19.8359 27.0625C17.0859 26.9687 14.8047 25.6094 13.1251 23.1953C10.3751 19.2344 10.7032 13.6093 13.8516 10.0001C17.2735 6.08599 22.9452 6.10943 26.336 10.0469C29.9376 14.2345 29.711 20.8437 25.8126 24.6405C24.2188 26.1952 22.3126 27.0312 19.8362 27.0624L19.8359 27.0625Z"
                        fill="#BFBFBC"
                    />
                </svg>
            )}
        </div>
    )
}

export default function Orders() {
    const { user, getJwt } = useUser()
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        const { data } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/orders`, {
            headers: {
                Authorization: `Bearer ${await getJwt()}`,
            },
        }).then((res) => res.json())
        setOrders(data)
    }

    useEffect(() => {
        if (user) {
            fetchOrders()
        }
    }, [user])

    return user && orders?.length > 0 ? (
        <>
            <li className="bg-border/20 dark:bg-border-dark/20 border-y border-light dark:border-dark text-[13px] px-2 py-1.5 !my-1 text-primary/50 dark:text-primary-dark/60 z-20 m-0 font-semibold">
                Merch orders
            </li>
            <li className="px-1">
                <ul className="m-0 p-0 list-none px-1 max-h-[130px] overflow-auto">
                    {orders.map(({ id, orderNumber, date, statusURL }) => {
                        return (
                            <li key={id}>
                                <Link
                                    externalNoIcon
                                    className="group/item text-sm px-2 py-2 rounded-sm hover:bg-border dark:hover:bg-border-dark flex justify-between items-center"
                                    to={statusURL}
                                >
                                    <span>
                                        <p className="m-0 text-sm font-bold opacity-60">#{orderNumber}</p>
                                        <p className="m-0 text-xs">{dayjs(date).format('MM/DD/YYYY')}</p>
                                    </span>
                                    <IconExternal className="w-4 opacity-50" />
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </li>
        </>
    ) : null
}

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
                className={`my-1 p-2 flex items-center rounded hover:bg-border dark:hover:bg-border-dark ${
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
    const { user } = useUser()

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
                                        <li className="bg-border/20 dark:bg-border-dark/20 border-y border-light dark:border-dark text-[13px] px-2 py-1.5 !my-1 text-primary/50 dark:text-primary-dark/60 z-20 m-0 font-semibold">
                                            Community
                                        </li>
                                        <li className="px-1">
                                            <Link
                                                className="group/item text-sm px-2 py-2 rounded-sm hover:bg-border dark:hover:bg-border-dark block"
                                                to="/questions"
                                            >
                                                <IconMessage className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
                                                Forums
                                            </Link>
                                        </li>
                                        {user?.profile && (
                                            <>
                                                <li className="px-1">
                                                    <Link
                                                        className="group/item flex items-center text-sm px-2 py-2 rounded-sm hover:bg-border dark:hover:bg-border-dark"
                                                        to="/community/dashboard"
                                                    >
                                                        <IconChat className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
                                                        My discussions
                                                    </Link>
                                                </li>
                                                <li className="px-1">
                                                    <Link
                                                        className="group/item flex items-center text-sm px-2 py-2 rounded-sm hover:bg-border dark:hover:bg-border-dark"
                                                        to={`/community/profiles/${user?.profile.id}`}
                                                    >
                                                        <IconUser className="opacity-50 inline-block w-6 group-hover/parent:opacity-75 mr-2" />
                                                        My profile
                                                    </Link>
                                                </li>
                                            </>
                                        )}
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
                                        <Orders />
                                    </ul>
                                )
                            }}
                        >
                            {user?.profile ? (
                                <Avatar
                                    src={getAvatarURL(user?.profile)}
                                    className="w-6 h-6 inline-block bg-tan border border-light dark:border-dark p-px rounded-full dark:bg-dark"
                                />
                            ) : (
                                <IconUser className="opacity-50 inline-block w-6 group-hover/parent:opacity-75" />
                            )}
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
