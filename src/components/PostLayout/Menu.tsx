import { IMenu } from './types'
import { useLocation } from '@reach/router'
import { replacePath } from '../../../gatsby/utils'
import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import { Link as ScrollLink } from 'react-scroll'
import { AnimatePresence, motion } from 'framer-motion'

const Chevron = ({ open, className = '' }: { open: boolean; className?: string }) => {
    return (
        <div
            className={`bg-tan dark:bg-primary rounded-full h-[28px] w-[28px] flex justify-center items-center text-black dark:text-white ${className}`}
        >
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

export default function Menu({
    name,
    url,
    children,
    className = '',
    handleLinkClick,
    topLevel,
    menuType = 'standard',
    icon,
    badge,
}: IMenu): JSX.Element | null {
    const location = useLocation()
    const pathname = replacePath(location?.pathname)
    const [isActive, setIsActive] = useState(false)
    const [open, setOpen] = useState<boolean | undefined>(false)
    const buttonClasses = `mb-[1px] text-left flex justify-between items-center relative text-primary hover:text-primary dark:text-white dark:hover:text-white pl-3 pr-2 py-1.5 inline-block w-full rounded-sm text-[15px] leading-tight relative active:top-[0.5px] active:scale-[.99] cursor-pointer ${
        children || topLevel
            ? 'hover:bg-gray-accent-light active:bg-[#DBDCD6] dark:hover:bg-gray-accent-dark transition min-h-[36px]'
            : ''
    } ${children && open ? 'bg-gray-accent-light dark:bg-gray-accent-dark font-bold' : ''}`
    const badgeClasses = `bg-gray-accent/50 text-primary/75 dark:text-primary-dark/60 dark:bg-gray-accent-dark text-xs m-[-2px] font-medium rounded-sm px-1 py-0.5 inline-block`

    useEffect(() => {
        const isOpen = (children?: IMenu[]): boolean | undefined => {
            return (
                children &&
                children.some((child: IMenu) => {
                    return child.url === pathname || isOpen(child.children)
                })
            )
        }
        setOpen(url === pathname || (children && isOpen(children)))
        setIsActive(url === pathname)
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
        scroll: { offset: -50, smooth: true, duration: 300, hashSpy: true, spy: true },
    }[menuType]
    return (
        <ul className={`list-none m-0 p-0 text-lg font-semibold overflow-hidden mb-[1px] ml-4 ${className}`}>
            <li>
                {(url === undefined || url === null) && name ? (
                    <p className="text-black dark:text-white font-semibold opacity-25 m-0 mt-3 mb-1 ml-3 text-[15px]">
                        {name}
                    </p>
                ) : name && url ? (
                    <MenuLink
                        onClick={() => {
                            handleLinkClick && handleLinkClick()
                            if (isWithChild) {
                                setOpen(!open)
                            }
                        }}
                        className={`${buttonClasses} ${!topLevel ? 'group' : ''} ${
                            isActive || isWithChild ? 'active' : ''
                        }`}
                        to={url}
                        {...menuLinkProps}
                    >
                        <AnimatePresence>
                            {isActive && (
                                <motion.span
                                    variants={variants}
                                    className="absolute w-[4px] bg-red rounded-[2px] top-[2px] h-[calc(100%_-_4px)] left-0"
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                />
                            )}
                        </AnimatePresence>
                        {icon ? (
                            <span className="cursor-pointer flex items-center space-x-2 text-black hover:text-black">
                                <img className="w-5 h-5 opacity-40" src={icon} />
                                <span>{name}</span>
                            </span>
                        ) : (
                            <>
                                <span>
                                    <span
                                        className={`opacity-50 group-hover:opacity-100 ${badge?.title ? 'mr-1.5' : ''}`}
                                    >
                                        {name}
                                    </span>
                                    {badge?.title && (
                                        <span className={`${badgeClasses} ${badge.className || ''}`}>
                                            {' '}
                                            {badge.title}
                                        </span>
                                    )}
                                </span>
                            </>
                        )}
                        {isWithChild && <Chevron open={open ?? false} />}
                    </MenuLink>
                ) : (
                    <button className={`${buttonClasses} !p-0`} onClick={() => setOpen(!open)}>
                        {isWithChild ? (
                            <>
                                <Link
                                    className="text-inherit hover:text-inherit flex-grow pl-3 py-1 leading-tight"
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
                                <Chevron className="mr-2" open={open ?? false} />
                            </>
                        ) : (
                            <span className="inline-block pl-3 pr-2 py-1">{name}</span>
                        )}
                    </button>
                )}
                {isWithChild && (
                    <motion.div initial={{ height: 0 }} animate={{ height: open ? 'auto' : 0 }}>
                        {children.map((child) => {
                            return <Menu handleLinkClick={handleLinkClick} key={child.name} {...child} />
                        })}
                    </motion.div>
                )}
            </li>
        </ul>
    )
}
