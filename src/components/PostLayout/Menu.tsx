import { IMenu } from './types'
import { useLocation } from '@reach/router'
import { replacePath } from '../../../gatsby/utils'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'components/Link'
import { Link as ScrollLink } from 'react-scroll'
import { AnimatePresence, motion } from 'framer-motion'
import * as NotProductIcons from '../NotProductIcons'
import * as NewIcons from '@posthog/icons'
import { usePost } from './hooks'
import { IconArrowLeft, IconArrowRight, IconChevronDown } from '@posthog/icons'

const getIcon = (name: string) => {
    const Icon = NewIcons[name] || NotProductIcons[name]
    return Icon && <Icon className="w-5" />
}

export const Icon = ({ color, icon }: { color?: string; icon: string | React.ReactNode }) => {
    return (
        <span
            className={`icon flex items-center justify-center shrink-0 ${
                color
                    ? `text-primary/50 dark:text-primary-dark/50 group-hover:text-primary/80 dark:group-hover:text-primary-dark/80 bg-primary/10 dark:bg-primary-dark/10 rounded-sm w-6 h-6 basis-6`
                    : 'w-4 h-4 basis-4 opacity-70'
            }`}
        >
            {typeof icon === 'string' ? getIcon(icon) : icon}
        </span>
    )
}
export const badgeClasses = `bg-gray-accent/50 text-primary/75 dark:text-primary-dark/60 dark:bg-gray-accent-dark text-xs m-[-2px] font-medium rounded-sm px-1 py-0.5 inline-block`

export const MenuItem = ({ icon, color, badge, name }) => {
    return icon ? (
        <span
            className={`cursor-pointer w-full flex space-x-2 text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark leading-tight ${
                color ? 'items-center' : 'items-center'
            }`}
        >
            <Icon icon={icon} color={color} />
            <span className={`${color ? '' : 'opacity-100'} group-hover:opacity-100 ${badge?.title ? 'mr-1.5' : ''}`}>
                {name}
            </span>
            {badge?.title && <span className={`${badgeClasses} ${badge.className || ''}`}> {badge.title}</span>}
        </span>
    ) : (
        <>
            <span>
                <span
                    className={`${color ? '' : 'opacity-50'} group-hover:opacity-100 ${badge?.title ? 'mr-1.5' : ''}`}
                >
                    {name}
                </span>
                {badge?.title && <span className={`${badgeClasses} ${badge.className || ''}`}> {badge.title}</span>}
            </span>
        </>
    )
}

export const menuVariants = {
    hidden: {
        translateX: '100%',
        opacity: 0,
    },
    visible: {
        transition: {
            delay: 0.3,
        },
        translateX: 0,
        opacity: '100%',
    },
}

function Item(menuItem: IMenu & { onOpen?: (submenu: IMenu, ref: HTMLUListElement) => void }): JSX.Element | null {
    const {
        name,
        url,
        children,
        className = '',
        topLevel,
        icon,
        badge,
        color,
        hidden,
        tag,
        handleLinkClick,
        onOpen,
        ...other
    } = menuItem
    if (hidden) return null
    const { isMenuItemActive, isMenuItemOpen } = usePost()
    const ref = useRef<HTMLLIElement>(null)
    const location = useLocation()
    const pathname = replacePath(location?.pathname)
    const menuType = other.menuType === 'scroll' && !url?.includes(pathname) ? 'standard' : other.menuType ?? 'standard'
    const [isActive, setIsActive] = useState(false)
    const [open, setOpen] = useState<boolean | undefined>(false)
    const buttonClasses = `group text-left text-primary hover:text-primary dark:text-primary-dark hover:dark:text-primary-dark flex w-full items-center relative text-sm px-1 rounded border border-b-3 border-transparent cursor-pointer font-semibold ${
        children || topLevel
            ? 'hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all min-h-[34px]'
            : ''
    } ${
        children && open
            ? 'font-bold border border-b-3 !border-light dark:!border-dark bg-white dark:bg-accent-dark hover:translate-y-[0px] active:translate-y-[0px] [&_.icon]:!text-primary/75 dark:[&_.icon]:!text-primary-dark/75'
            : ''
    }`
    useEffect(() => {
        const isOpen = (children?: IMenu[]): boolean | undefined => {
            return (
                children &&
                children.some((child: IMenu) => {
                    return (
                        isMenuItemActive?.({ name: child.name, url: child.url }) ||
                        child.url === pathname ||
                        isOpen(child.children)
                    )
                })
            )
        }
        setOpen(
            isMenuItemOpen?.({ name, url }) ||
                isMenuItemActive?.({ name, url }) ||
                url === pathname ||
                (children && isOpen(children))
        )
        setIsActive(isMenuItemActive?.({ name, url }) || url?.split('?')[0] === pathname)
    }, [pathname])

    useEffect(() => {
        if (open) {
            onOpen && onOpen(menuItem, ref.current)
        }
    }, [open])

    const isWithChild = children && children.length > 0
    const MenuLink = { standard: Link, scroll: ScrollLink }[menuType]
    const menuLinkProps = {
        standard: {},
        scroll: {
            offset: -50,
            smooth: true,
            duration: 300,
            hashSpy: true,
            spy: true,
            onSetActive: () => setIsActive(true),
            onSetInactive: () => setIsActive(false),
        },
    }[menuType]

    return (
        <>
            <li ref={ref}>
                {(url === undefined || url === null) && name ? (
                    <p className="flex gap-2 items-baseline text-[13px] font-semibold mt-3 mx-1 mb-1">
                        <span className="opacity-50">{name}</span>

                        {badge?.title && (
                            <span className={`${badgeClasses} ${badge.className || ''}`}> {badge.title}</span>
                        )}
                    </p>
                ) : name && url ? (
                    <MenuLink
                        onClick={() => {
                            handleLinkClick && handleLinkClick(menuItem)
                            if (isWithChild) {
                                setOpen(!open)
                            }
                        }}
                        className={`${buttonClasses} ${!topLevel ? 'group py-0.5' : ''} ${color ? ' ' : ''} ${
                            isActive || isWithChild ? 'active ' : ''
                        } ${
                            isActive && topLevel
                                ? 'font-bold border border-b-3 !border-light dark:!border-dark bg-white dark:bg-accent-dark hover:translate-y-[0px] active:translate-y-[0px]'
                                : ''
                        } ${isActive && !topLevel ? 'font-bold' : ''}`}
                        to={menuType === 'scroll' ? url.replace(pathname + '#', '') : url}
                        {...menuLinkProps}
                    >
                        <AnimatePresence>
                            {isActive && !isWithChild && (
                                <motion.span
                                    variants={menuVariants}
                                    className=""
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                />
                            )}
                        </AnimatePresence>
                        <MenuItem badge={badge} color={color} icon={icon} name={name} />
                        {isWithChild && <IconChevronDown className="size-8 -rotate-90" />}
                    </MenuLink>
                ) : (
                    <button className={`${buttonClasses} !p-0`} onClick={() => setOpen(!open)}>
                        {isWithChild ? (
                            <>
                                <Link
                                    className="text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark flex-grow pl-3 py-1 leading-tight"
                                    to={children[0]?.url || ''}
                                >
                                    <span>
                                        <span className={badge?.title ? 'mr-1.5' : ''}>{name}</span>
                                        {badge?.title && (
                                            <span className={`${badgeClasses} ${badge.className || ''}`}>
                                                {' '}
                                                {badge.title}
                                            </span>
                                        )}
                                    </span>
                                </Link>
                                <IconChevronDown />
                            </>
                        ) : (
                            <span className="inline-block pl-3 pr-2 py-1">{name}</span>
                        )}
                    </button>
                )}
                {/* {isWithChild && (
                    <motion.div
                        className={`${icon ? 'pl-[25px] -ml-2' : ''} overflow-hidden`}
                        initial={{ height: 0 }}
                        animate={{ height: open ? 'auto' : 0 }}
                    >
                        <Menu menuItems={children} handleLinkClick={handleLinkClick} {...other} />
                    </motion.div>
                )} */}
            </li>
        </>
    )
}

export default function Menu({ menuItems, ...other }) {
    const [activeSubmenu, setActiveSubmenu] = useState<number>(0)
    const [submenus, setSubmenus] = useState<IMenu[]>([{ children: menuItems, name: 'root', hidden: true }])
    const submenusRef = useRef<Map<number, HTMLUListElement>>(new Map())
    const containerRef = useRef<HTMLDivElement>(null)

    const scrollToIndex = (index: number) => {
        const map = getMap()
        const node = map.get(index)
        if (node && containerRef.current) {
            containerRef.current.scrollTo({
                behavior: 'smooth',
                left: node.offsetLeft,
            })
        }
    }

    const getMap = () => {
        return submenusRef.current
    }

    const handleSubmenuBack = () => {
        if (activeSubmenu !== null) {
            const newActiveSubmenu = activeSubmenu - 1
            if (newActiveSubmenu >= 0) {
                setActiveSubmenu(newActiveSubmenu)
            }
        }
    }

    const handleSubmenuForward = () => {
        if (activeSubmenu !== null) {
            const newActiveSubmenu = activeSubmenu + 1
            if (newActiveSubmenu < submenus.length) {
                setActiveSubmenu(newActiveSubmenu)
            }
        }
    }

    const handleSubmenuOpen = (submenu: IMenu, ref: HTMLUListElement) => {
        const map = getMap()
        if (activeSubmenu > 0 && map.get(activeSubmenu) && map.get(activeSubmenu)?.contains(ref as Node)) {
            return
        }
        if (submenu.children) {
            const newSubmenus = [{ children: menuItems, name: 'root', hidden: true }, submenu]
            if (!submenus.some((s) => s.children === submenu.children)) {
                setSubmenus(newSubmenus)
                setActiveSubmenu(newSubmenus.length - 1)
            } else {
                scrollToIndex(submenus.length - 1)
            }
        } else {
            setActiveSubmenu(0)
            setSubmenus([{ children: menuItems, name: 'root', hidden: true }])
        }
    }

    useEffect(() => {
        scrollToIndex(activeSubmenu)
    }, [activeSubmenu])

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return

            const container = containerRef.current
            const map = getMap()
            let maxVisibleArea = 0
            let mostVisibleIndex = activeSubmenu

            map.forEach((element, index) => {
                const elementRect = element.getBoundingClientRect()
                const containerRect = container.getBoundingClientRect()
                const visibleWidth =
                    Math.min(elementRect.right, containerRect.right) - Math.max(elementRect.left, containerRect.left)

                if (visibleWidth > maxVisibleArea) {
                    maxVisibleArea = visibleWidth
                    mostVisibleIndex = index
                }
            })

            setActiveSubmenu(mostVisibleIndex)
        }
        containerRef.current?.addEventListener('scrollend', handleScroll)
        return () => {
            containerRef.current?.removeEventListener('scrollend', handleScroll)
        }
    }, [])

    return (
        <div>
            <div className="flex space-x-1 items-center pl-2 py-2 border-b border-border dark:border-border-dark ">
                <button
                    disabled={activeSubmenu === 0}
                    onClick={handleSubmenuBack}
                    className="p-0.5 border border-border dark:border-border-dark border-b-2 active:translate-y-[1px] disabled:active:translate-y-[0px] disabled:opacity-50 rounded-sm"
                >
                    <IconArrowLeft className="size-4 opacity-60" />
                </button>
                <button
                    disabled={activeSubmenu === submenus.length - 1}
                    onClick={handleSubmenuForward}
                    className="p-0.5 border border-border dark:border-border-dark border-b-2 active:translate-y-[1px] disabled:active:translate-y-[0px] disabled:opacity-50 rounded-sm"
                >
                    <IconArrowRight className="size-4 opacity-60" />
                </button>
            </div>

            <div ref={containerRef} className="flex overflow-auto snap-x snap-mandatory">
                {submenus.map((submenu, index) => (
                    <ul
                        key={submenu.name}
                        ref={(node) => {
                            const map = getMap()
                            if (node) {
                                map.set(index, node)
                            } else {
                                map.delete(index)
                            }
                        }}
                        className={`list-none m-0 p-0 text-lg font-semibold overflow-hidden py-px px-2 w-full flex-shrink-0 max-h-screen h-[calc(100vh_-_93px)] overflow-y-auto snap-start`}
                    >
                        {!submenu.hidden && (
                            <h5 className="flex gap-2 items-baseline text-[13px] font-semibold opacity-50 m-0 mt-3 mx-1 mb-1">
                                {submenu.name}
                            </h5>
                        )}
                        {submenu.children?.map((item) => (
                            <Item key={item.name} {...item} {...other} onOpen={handleSubmenuOpen} />
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    )
}
