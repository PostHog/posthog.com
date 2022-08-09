import React from 'react'
import { IMenu } from './types'

import { useLocation } from '@reach/router'
import Link from 'components/Link'
import { replacePath } from '../../../gatsby/utils'
import { motion, AnimatePresence } from 'framer-motion'

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

const Menu = ({ name, url, children, className = '', handleLinkClick, topLevel }: IMenu) => {
    const location = useLocation()
    const pathname = replacePath(location?.pathname)
    const [isActive, setIsActive] = React.useState(false)
    const [open, setOpen] = React.useState<boolean | undefined>(false)
    const buttonClasses = `mb-[1px] text-left flex justify-between items-center relative text-primary hover:text-primary dark:text-white dark:hover:text-white pl-3 pr-2 py-1 inline-block w-full rounded-sm text-[15px] relative active:top-[0.5px] active:scale-[.99] ${
        children || topLevel
            ? 'hover:bg-gray-accent-light active:bg-[#DBDCD6] dark:hover:bg-gray-accent-dark transition min-h-[36px]'
            : ''
    } ${children && open ? 'bg-gray-accent-light dark:bg-gray-accent-dark font-bold' : ''}`

    React.useEffect(() => {
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

    return (
        <ul className={`list-none m-0 p-0 text-lg font-semibold overflow-hidden ml-4 ${className}`}>
            <li>
                {name && url ? (
                    <Link
                        onClick={() => {
                            handleLinkClick && handleLinkClick()
                            if (isWithChild) {
                                setOpen(!open)
                            }
                        }}
                        className={`${buttonClasses} ${
                            !topLevel ? 'opacity-50' : ''
                        } hover:opacity-100 transition-opacity ${isActive || isWithChild ? 'opacity-100' : ''}`}
                        to={url}
                    >
                        <AnimatePresence>
                            {isActive && (
                                <motion.span
                                    variants={variants}
                                    className="absolute w-[4px] bg-red rounded-[2px] h-[65%] left-0"
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                />
                            )}
                        </AnimatePresence>
                        <span>{name}</span>

                        {isWithChild && <Chevron open={open ?? false} />}
                    </Link>
                ) : (
                    <button className={`${buttonClasses} !p-0`} onClick={() => setOpen(!open)}>
                        {isWithChild ? (
                            <>
                                <Link
                                    className="text-inherit hover:text-inherit flex-grow pl-3 py-1"
                                    to={children[0]?.url || ''}
                                >
                                    {name}
                                </Link>
                                <Chevron className="mr-2" open={open ?? false} />
                            </>
                        ) : (
                            <span className="inline-block pl-3 pr-2 py-1">name</span>
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

const TableOfContents = ({ menu, handleLinkClick }: { menu: IMenu[]; handleLinkClick?: () => void }) => {
    return menu ? (
        <>
            <p className="text-black dark:text-white font-semibold opacity-25 m-0 mb-2 ml-3 text-[15px]">
                Table of contents
            </p>
            <nav>
                {menu.map((menuItem) => {
                    return (
                        <Menu
                            topLevel
                            handleLinkClick={handleLinkClick}
                            className="ml-0"
                            key={menuItem.name}
                            {...menuItem}
                        />
                    )
                })}
            </nav>
        </>
    ) : null
}

export default TableOfContents
