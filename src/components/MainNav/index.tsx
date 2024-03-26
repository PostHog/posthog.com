import Link from 'components/Link'
import Logo from 'components/Logo'
import { useSearch } from 'components/Search/SearchContext'
import { useActions, useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'

import {
    IconApp,
    IconBrightness,
    IconChat,
    IconChevronDown,
    IconSearch,
    IconTextWidth,
    IconUser,
    IconTie,
    IconMessage,
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
import { StaticImage } from 'gatsby-plugin-image'

export const Avatar = (props: { className?: string; src?: string }) => {
    return (
        <div className={`overflow-hidden rounded-full ${props.className}`}>
            {props.src ? (
                <img className="w-full object-cover" alt="" src={props.src} />
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
    const { user } = useUser()
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
            {user?.profile ? (
                <button
                    ref={setReferenceElement}
                    onClick={() => setOpen(!open)}
                    className={`ml-2 flex items-center rounded-full border border-light dark:border-dark relative active:scale-[.99] ${
                        open
                            ? 'border-primary/50 dark:border-primary-dark/50'
                            : 'hover:border-primary/25 hover:dark:border-primary-dark/25 hover:scale-[1.05]'
                    }`}
                >
                    {children}
                </button>
            ) : (
                <button
                    ref={setReferenceElement}
                    onClick={() => setOpen(!open)}
                    className={`ml-2 flex items-center p-2 rounded hover:bg-border dark:hover:bg-border-dark relative active:top-[1px] active:scale-[.99] ${
                        open ? 'bg-border dark:bg-border-dark' : ' hover:scale-[1.05]'
                    }`}
                >
                    {children}
                </button>
            )}
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

const enterpiseModeNames = {
    Products: 'Solutions',
    Pricing: 'Plans',
    Docs: 'Developer resources',
    Community: 'Press releases/Newsroom',
    Company: 'Investor relations',
}

export const Main = () => {
    const { user } = useUser()

    const { open } = useSearch()
    const {
        menu,
        parent,
        internalMenu,
        activeInternalMenu,
        fullWidthContent,
        setFullWidthContent,
        enterpriseMode,
        setEnterpriseMode,
    } = useLayoutData()
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
                            {enterpriseMode ? (
                                <StaticImage src="./posthog-tm.png" className="h-6 mx-6" />
                            ) : (
                                <Logo
                                    color={websiteTheme === 'dark' && 'white'}
                                    className="h-[24px] fill-current relative px-2 box-content"
                                />
                            )}
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
                                        <span className="relative">
                                            {enterpriseMode ? enterpiseModeNames[name] : name}
                                        </span>
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
                        ) : enterpriseMode ? (
                            <CallToAction size="sm" type="outline" className="hidden sm:flex mr-2" to="/book-a-demo">
                                Talk to sales
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
                                        {pathname === '/' && (
                                            <li className="px-1 whitespace-nowrap">
                                                <button
                                                    onClick={() => setEnterpriseMode(!enterpriseMode)}
                                                    className="group/item text-sm px-2 py-2 rounded-sm hover:bg-border dark:hover:bg-border-dark flex justify-between items-center w-full"
                                                >
                                                    <div className="text-left">
                                                        <svg
                                                            className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6"
                                                            width="22"
                                                            height="22"
                                                            viewBox="0 0 22 22"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M19.7312 18.962C19.598 19.2714 19.3634 19.3848 19.0282 19.3762C18.3751 19.3599 17.722 19.3719 17.068 19.3711C16.6718 19.3702 16.4552 19.1553 16.4552 18.7609C16.4544 15.9603 16.4544 13.1586 16.4552 10.358C16.4552 9.96269 16.6709 9.74957 17.068 9.74871C17.7211 9.74785 18.3751 9.75988 19.0282 9.74356C19.3634 9.73496 19.598 9.84754 19.7312 10.1578V18.962Z"
                                                                fill="black"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M19.7311 6.91636C19.652 7.02464 19.5927 7.15957 19.4905 7.2369C19.1562 7.48869 18.6895 7.26268 18.6397 6.83643C18.5804 6.32253 18.5228 5.80861 18.4291 5.26464C18.4162 5.293 18.4059 5.32308 18.3887 5.34886C16.5677 8.18642 14.0937 10.2903 11.1142 11.8268C9.47711 12.6715 7.7722 13.3341 5.96666 13.7208C5.01963 13.9236 4.06315 14.0491 3.09214 14.0414C2.95636 14.0396 2.818 14.0336 2.68479 14.0087C2.4605 13.9675 2.34361 13.8007 2.26025 13.6048V13.3324C2.40893 13.0118 2.65643 12.925 3.00533 12.9379C3.95837 12.9714 4.90025 12.8425 5.82573 12.6217C9.65329 11.7056 12.9902 9.91634 15.705 7.03324C16.3968 6.29848 17.0036 5.49753 17.5389 4.64162C17.5716 4.58919 17.6008 4.53419 17.6455 4.45599C17.5811 4.46802 17.5398 4.47318 17.5003 4.48435C16.9322 4.64591 16.3659 4.81263 15.797 4.96817C15.3776 5.08247 15.0236 4.77567 15.088 4.3606C15.1224 4.13631 15.259 3.98849 15.473 3.92746C16.5421 3.61896 17.6111 3.313 18.6828 3.0131C19.0068 2.92201 19.3179 3.14459 19.3574 3.48489C19.4734 4.48349 19.5851 5.48379 19.7003 6.48239C19.7046 6.52622 19.7218 6.56833 19.7321 6.6113C19.7312 6.71184 19.7311 6.8141 19.7311 6.91636Z"
                                                                fill="black"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M2.25928 16.096C2.39162 15.7858 2.62538 15.6724 2.96139 15.6818C3.61967 15.699 4.27881 15.6861 4.9371 15.687C5.31695 15.6878 5.53523 15.9113 5.53523 16.2945C5.53523 17.1178 5.53609 17.9411 5.53437 18.7645C5.53437 19.1555 5.31523 19.3721 4.91991 19.3729C4.26678 19.3738 3.61366 19.3617 2.96141 19.3772C2.62712 19.385 2.39165 19.2741 2.2593 18.963L2.25928 16.096Z"
                                                                fill="black"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M14.9962 16.164V18.7233C14.9962 19.1702 14.7968 19.3713 14.3542 19.3713C13.683 19.3713 13.0119 19.3721 12.3407 19.3704C11.9359 19.3695 11.7202 19.1547 11.7202 18.7474C11.7194 17.0191 11.7185 15.2892 11.7202 13.5611C11.7202 13.1795 11.9454 12.9552 12.3235 12.9552C13.0059 12.9544 13.6882 12.9535 14.3705 12.9552C14.7891 12.9561 14.9953 13.164 14.9962 13.586C14.997 14.4445 14.9962 15.3039 14.9962 16.1624C14.997 16.1641 14.9962 16.164 14.9962 16.164Z"
                                                                fill="black"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M6.99355 17.1668C6.99355 16.6383 6.99269 16.1089 6.99355 15.5804C6.99441 15.198 7.21355 14.9788 7.59769 14.978C8.27401 14.9763 8.95034 14.9763 9.62668 14.978C10.0546 14.9797 10.2695 15.1937 10.2695 15.6173C10.2695 16.652 10.2695 17.6867 10.2686 18.7204C10.2678 19.1639 10.0624 19.371 9.62497 19.371C8.94864 19.371 8.27232 19.3718 7.59597 19.3701C7.20926 19.3693 6.9944 19.1544 6.99355 18.7685C6.99269 18.2349 6.99355 17.7013 6.99355 17.1668Z"
                                                                fill="black"
                                                            />
                                                            <path
                                                                d="M10.553 7.54532C10.553 7.91657 10.4292 8.23711 10.1817 8.50696C9.93421 8.77681 9.6025 8.94353 9.18656 9.00796C9.19688 9.13171 9.20118 9.25032 9.20118 9.36461C9.20118 9.61725 9.11438 9.7436 8.94078 9.7436C8.76719 9.7436 8.68039 9.61727 8.68039 9.36461L8.68812 9.02257C8.30656 8.99765 7.96452 8.89968 7.65945 8.72953C7.35523 8.55852 7.20312 8.39438 7.20312 8.23539C7.20312 8.16578 7.22289 8.11078 7.26242 8.06781C7.30195 8.0257 7.35438 8.00508 7.41883 8.00508C7.48328 8.00508 7.56492 8.04461 7.66376 8.12367C7.98601 8.38149 8.33236 8.52242 8.70361 8.54735C8.71306 7.85384 8.71822 7.09414 8.71822 6.26661C8.31689 6.03886 8.0015 5.81114 7.77118 5.5834C7.54086 5.35565 7.42572 5.0944 7.42572 4.79965C7.42572 4.50489 7.54173 4.24964 7.77461 4.03479C8.00751 3.81909 8.31172 3.6919 8.68812 3.65237V3.36276C8.68812 3.11011 8.77234 2.98376 8.94077 2.98376C9.1092 2.98376 9.19342 3.11009 9.19342 3.36276V3.65237C9.50967 3.68245 9.77521 3.75635 9.98834 3.87494C10.2015 3.99353 10.308 4.12501 10.308 4.26854C10.308 4.32268 10.29 4.37167 10.2522 4.41292C10.2152 4.45503 10.1611 4.47565 10.0889 4.47565C10.0167 4.47565 9.88779 4.41979 9.70217 4.30893C9.51654 4.19722 9.34209 4.13964 9.17795 4.13448C9.16764 4.72831 9.16334 5.32558 9.16334 5.92456C9.56466 6.1626 9.85858 6.36799 10.0468 6.54073C10.235 6.71432 10.3665 6.88019 10.4404 7.03831C10.516 7.19815 10.553 7.36657 10.553 7.54532ZM7.96796 4.8039C7.96796 5.066 8.21804 5.35647 8.71821 5.67272C8.71821 4.99897 8.71305 4.48679 8.7036 4.13529C8.49047 4.16021 8.31431 4.22983 8.17595 4.34326C8.03759 4.45756 7.96796 4.61052 7.96796 4.8039ZM9.75804 8.19498C9.91702 8.01451 9.99522 7.81169 9.99522 7.58569C9.99522 7.36054 9.92389 7.1689 9.77952 7.0099C9.636 6.85178 9.43062 6.69022 9.16334 6.52694C9.16334 7.52725 9.16592 8.19326 9.17021 8.52498C9.40396 8.48544 9.5999 8.37544 9.75804 8.19498Z"
                                                                fill="black"
                                                            />
                                                        </svg>

                                                        <span>Enterprise mode</span>
                                                    </div>
                                                    <Toggle checked={enterpriseMode} />
                                                </button>
                                            </li>
                                        )}
                                        <Orders />
                                    </ul>
                                )
                            }}
                        >
                            {user?.profile ? (
                                <div className="p-px bg-accent dark:bg-accent-dark rounded-full inline-flex">
                                    <Avatar
                                        src={getAvatarURL(user?.profile)}
                                        className="w-9 h-9 inline-block bg-tan rounded-full dark:bg-dark"
                                    />
                                </div>
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
