import Logo from 'components/Logo'
import { graphql, useStaticQuery } from 'gatsby'
import { useActions, useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import { useSearch } from 'components/Search/SearchContext'

import { App, Brightness, Chat, Search, TextWidth, User } from 'components/NewIcons'

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
                className={`my-1 p-2 rounded hover:bg-border dark:hover:bg-border-dark ${
                    open ? 'rounded-br-none rounded-bl-none bg-border dark:bg-border-dark' : ''
                }`}
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
                    <div
                        className={`mt-[-4px] rounded-md border-light dark:border-dark border overflow-hidden ${tooltipClassName}`}
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

export default function MainNav() {
    const { open } = useSearch()
    const { menu, parent, internalMenu, activeInternalMenu } = useLayoutData()
    return (
        <div>
            <div className="border-b border-light dark:border-dark bg-accent dark:bg-accent-dark mb-2">
                <div className="flex max-w-screen-3xl mx-auto px-5 justify-between">
                    <Link className="py-4 grow-0 shrink-0 basis-[auto] dark:text-primary-dark" to="/">
                        <Logo className="h-[24px] fill-current " />
                    </Link>
                    <ul className="flex list-none m-0 p-0">
                        {menu.map((menuItem) => {
                            const active = menuItem.name === parent.name
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
                        <CallToAction size="sm" type="secondary" className="mr-2">
                            Get started
                        </CallToAction>

                        <button
                            className="group my-1mr-[1px] p-2 hover:bg-border dark:hover:bg-border-dark rounded"
                            onClick={() => open('header')}
                        >
                            <Search className="opacity-50 inline-block w-6 group-hover:opacity-75" />
                        </button>
                        <Tooltip
                            placement="bottom-end"
                            tooltipClassName="!rounded-tr-none"
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
                                            <button className="group/item text-sm px-2 py-2 rounded-sm hover:bg-border dark:hover:bg-border-dark flex justify-between items-center w-full">
                                                <div>
                                                    <Brightness className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
                                                    <span>Dark mode</span>
                                                </div>
                                                <DarkModeToggle />
                                            </button>
                                        </li>
                                        <li className="px-1">
                                            <button className="group/item text-sm px-2 py-2 rounded-sm hover:bg-border dark:hover:bg-border-dark block w-full text-left">
                                                <TextWidth className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
                                                Wide mode
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
            {internalMenu?.length > 0 && (
                <ul className="flex justify-center space-x-4 list-none m-0 p-0 mb-8 border-b border-light dark:border-dark relative">
                    {internalMenu.map(({ name, url, Icon, color }) => {
                        const active = activeInternalMenu?.name === name
                        return (
                            <li key={name}>
                                <Link
                                    to={url}
                                    className={`group flex items-center relative px-2 pt-1.5 pb-1 mb-2 rounded ${
                                        active ? '' : 'hover:bg-border/50 dark:hover:bg-border-dark/50'
                                    }`}
                                >
                                    <span className={`w-6 h-6 mr-2 text-${color}`}>
                                        <Icon />
                                    </span>
                                    <span
                                        className={`text-sm ${
                                            active
                                                ? 'font-bold opacity-100'
                                                : 'font-semibold opacity-60 group-hover:opacity-100'
                                        }`}
                                    >
                                        {name}
                                    </span>
                                    {active && (
                                        <span
                                            className={`absolute bottom-[calc(-.5rem_-_1px)] left-0 w-full border-b-[1.5px] rounded-full border-${color}`}
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
