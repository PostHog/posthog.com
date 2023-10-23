import { IMenu } from './types'
import { useLocation } from '@reach/router'
import { replacePath } from '../../../gatsby/utils'
import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import { Link as ScrollLink } from 'react-scroll'
import { AnimatePresence, motion } from 'framer-motion'
import * as NotProductIcons from '../NotProductIcons'
import * as NewIcons from '@posthog/icons'
import { usePost } from './hooks'

const Chevron = ({ open, className = '' }: { open: boolean; className?: string }) => {
    return (
        <div className={`h-8 w-8 flex justify-center items-center text-primary dark:text-primary-dark ${className}`}>
            <svg
                className="transition-transform w-"
                style={{ transform: `rotate(${open ? 0 : 180}deg)` }}
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g opacity="0.3">
                    <path
                        d="M3.59608 9.74106L6.99976 6.33626L10.4034 9.74106C10.8595 10.1972 11.5984 10.1972 12.0545 9.74106C12.51 9.28551 12.51 8.54613 12.0545 8.0906L7.82492 3.86106C7.36937 3.40606 6.6311 3.40606 6.17558 3.86106L1.9466 8.09004V8.09059C1.4905 8.54613 1.4905 9.28441 1.94605 9.74049C2.40159 10.1966 3.13987 10.1966 3.59595 9.74103L3.59608 9.74106Z"
                        fill="currentColor"
                    />
                </g>
            </svg>
        </div>
    )
}

const getIcon = (name: string) => {
    return NewIcons[name]
        ? NewIcons[name]({ className: 'w-5' })
        : NotProductIcons[name]
        ? NotProductIcons[name]({ className: 'w-5' })
        : null
}

export const Icon = ({ color, icon }: { color?: string; icon: string | React.ReactNode }) => {
    return (
        <span
            className={`flex items-center justify-center shrink-0 ${
                color
                    ? `text-${color} bg-${color} bg-opacity-10 rounded-sm w-[30px] h-[30px] basis-[30px]`
                    : 'w-[25px] h-[25px] basis-[25px] opacity-70'
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
            className={`cursor-pointer w-full flex space-x-2 font-semibold text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark leading-tight ${
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

export default function Menu({
    name,
    url,
    children,
    className = '',
    handleLinkClick,
    topLevel,
    icon,
    badge,
    color,
    hidden,
    ...other
}: IMenu): JSX.Element | null {
    if (hidden) return null
    const { isMenuItemActive, isMenuItemOpen } = usePost()
    const location = useLocation()
    const pathname = replacePath(location?.pathname)
    const menuType = other.menuType === 'scroll' && !url?.includes(pathname) ? 'standard' : other.menuType ?? 'standard'
    const [isActive, setIsActive] = useState(false)
    const [open, setOpen] = useState<boolean | undefined>(false)
    const buttonClasses = `group text-left text-primary hover:text-primary dark:text-primary-dark hover:dark:text-primary-dark flex w-full justify-between items-center relative text-[15px] pl-3 py-0.5 rounded border border-b-3 border-transparent cursor-pointer ${
        children || topLevel
            ? 'hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all min-h-[34px]'
            : ''
    } ${children && open ? 'bg-accent dark:bg-accent-dark font-bold !border-light dark:!border-dark' : ''}`
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

    const variants = {
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
        <ul className={`list-none m-0 p-0 text-lg font-semibold overflow-hidden py-[1px] ml-4 ${className}`}>
            <li>
                {(url === undefined || url === null) && name ? (
                    <p className="text-sm font-semibold opacity-25 mt-3 mx-3 mb-1">{name}</p>
                ) : name && url ? (
                    <MenuLink
                        onClick={() => {
                            handleLinkClick && handleLinkClick({ name, url, topLevel })
                            if (isWithChild) {
                                setOpen(!open)
                            }
                        }}
                        className={`${buttonClasses} ${!topLevel ? 'group' : ''} ${color ? '!py-1' : ''} ${
                            isActive || isWithChild ? 'active' : ''
                        }`}
                        to={menuType === 'scroll' ? url.replace(pathname + '#', '') : url}
                        {...menuLinkProps}
                    >
                        <AnimatePresence>
                            {isActive && !isWithChild && (
                                <motion.span
                                    variants={variants}
                                    className="absolute w-[4px] bg-red rounded-[2px] top-[2px] h-[calc(100%_-_4px)] left-0"
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                />
                            )}
                        </AnimatePresence>
                        <MenuItem badge={badge} color={color} icon={icon} name={name} />
                        {isWithChild && <Chevron open={open ?? false} />}
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
                                <Chevron open={open ?? false} />
                            </>
                        ) : (
                            <span className="inline-block pl-3 pr-2 py-1">{name}</span>
                        )}
                    </button>
                )}
                {isWithChild && (
                    <motion.div
                        className={icon ? 'pl-[25px] -ml-2' : ''}
                        initial={{ height: 0 }}
                        animate={{ height: open ? 'auto' : 0 }}
                    >
                        {children.map((child) => {
                            return (
                                <Menu
                                    handleLinkClick={handleLinkClick}
                                    key={child.name}
                                    menuType={menuType}
                                    {...child}
                                />
                            )
                        })}
                    </motion.div>
                )}
            </li>
        </ul>
    )
}
