import { useLocation } from '@reach/router'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'
import { animateScroll as scroll, Link as ScrollLink } from 'react-scroll'
import Scrollspy from 'react-scrollspy'
import { flattenMenu, replacePath } from '../../../gatsby/utils'
import { IContributor, ICrumb, INextPost, IProps, ISidebarAction, ITopic } from './types'

import Chip from 'components/Chip'
import {
    Bookmark,
    Edit,
    ExpandDocument,
    Issue,
    LinkedIn,
    LinkIcon,
    Mail,
    RightArrow,
    Twitter,
    TableOfContents as TOCIcon,
    Info,
    InfoOutlined,
} from 'components/Icons/Icons'
import Link from 'components/Link'
import InternalSidebarLink from 'components/Docs/InternalSidebarLink'
import { DarkModeToggle } from 'components/DarkModeToggle'
import Tooltip from 'components/Tooltip'
import { CallToAction } from 'components/CallToAction'
import { DocsPageSurvey } from 'components/DocsPageSurvey'
import SidebarSearchBox from 'components/Search/SidebarSearchBox'
import { navigate as gatsbyNavigate } from 'gatsby'

const ShareLink = ({ children, url }: { children: React.ReactNode; url: string }) => {
    const width = 626
    const height = 436
    const handleClick = () => {
        if (typeof window !== 'undefined') {
            const left = window.innerWidth / 2 - width / 2
            const top = window.innerHeight / 2 - height / 2
            window.open(url, '', `left=${left},top=${top},width=${width},height=${height}`)
        }
    }
    return (
        <button
            className="flex text-primary hover:text-primary dark:text-white dark:hover:text-white"
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

export const SidebarSection = ({
    title,
    children,
    className = '',
}: {
    title?: string
    children: React.ReactNode
    className?: string
}) => {
    return (
        <div
            className={`py-4 px-6 border-b border-gray-accent-light dark:border-gray-accent-dark border-dashed ${className}`}
        >
            {title && <h3 className="text-black dark:text-white font-semibold opacity-25 m-0 mb-2 text-sm">{title}</h3>}
            {children}
        </div>
    )
}

export const Topics = ({ topics }: { topics: ITopic[] }) => {
    const buttonClasses = `px-4 py-2 inline-block bg-gray-accent-light border-black/80 rounded-sm font-semibold text-sm leading-none`
    return (
        <ul className="list-none p-0 flex items-start flex-wrap -m-1">
            {topics.map(({ name, url, state }: ITopic) => {
                return (
                    <li className="m-1" key={name}>
                        {url ? (
                            <Link className={`${buttonClasses} text-red dark:text-red`} to={url} state={state}>
                                {name}
                            </Link>
                        ) : (
                            <span className={`${buttonClasses} dark:text-black`}>{name}</span>
                        )}
                    </li>
                )
            })}
        </ul>
    )
}

export const PageViews = ({ pageViews }: { pageViews: string | number }) => {
    return <p className="m-0 opacity-50 font-semibold">{pageViews} views</p>
}

export const ShareLinks = ({ title, href }: { title: string; href: string }) => {
    const [copied, setCopied] = useState(false)
    const handleCopyClick = () => {
        const url = `${href.replace(/#.*/, '')}`
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 5000)
    }
    return (
        <div className="opacity-50 flex space-x-3 items-center">
            <ShareLink
                url={`https://twitter.com/intent/tweet?url=${href}&text=Check%20out%20this%20article%20from%20%40posthog%0A%0A`}
            >
                <Twitter className="w-[32px] h-[32px]" />
            </ShareLink>
            <ShareLink url={`https://www.linkedin.com/shareArticle?url=${href}`}>
                <LinkedIn className="w-[32px] h-[32px]" />
            </ShareLink>
            <a
                className="text-primary hover:text-primary dark:text-white dark:hover:text-white"
                href={`mailto:?subject=${title}&body=${href}`}
            >
                <Mail />
            </a>
            <button className="relative" onClick={handleCopyClick}>
                <Tooltip
                    placement="top-end"
                    content={<p className="m-0 font-semibold text-sm">{copied ? 'Copied!' : 'Copy page URL'}</p>}
                >
                    <span className="relative">
                        <LinkIcon className="w-[25px] h-[25px]" />
                    </span>
                </Tooltip>
            </button>
        </div>
    )
}

export const ContributorImage = ({ image, name, className = '', imgClassName = '' }) => {
    const gatsbyImage = image && getImage(image)
    return (
        <div
            className={`w-[32px] h-[32px] relative rounded-full overflow-hidden border-2 border-tan dark:border-primary transition-all ${className}`}
        >
            {gatsbyImage ? (
                <GatsbyImage
                    imgClassName={`rounded-full ${imgClassName}`}
                    image={gatsbyImage}
                    alt={name}
                    className="bg-gray-accent dark:bg-gray-accent-dark"
                />
            ) : (
                <svg width="38" height="38" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export const Contributor = ({
    image,
    name,
    url,
    state,
    text = false,
}: IContributor & { text?: boolean; url?: string }) => {
    const Container = url ? Link : 'div'
    return (
        <Container {...(url ? { to: url, state } : {})} className="flex space-x-2 items-center no-underline">
            <ContributorImage
                className={url ? 'hover:border-red hover:z-10 dark:hover:border-red' : ''}
                image={image}
                name={name}
            />
            {text && <span className="author text-[14px] font-semibold">{name}</span>}
        </Container>
    )
}

export const Contributors = ({
    contributors,
    className = '',
}: {
    contributors: IContributor[]
    className?: string
}) => {
    const multiple = contributors?.length > 1
    const maxContributorsToShow = 4
    return (
        <div className="flex space-x-2 items-center justify-between">
            {multiple && (
                <h3 className="text-black dark:text-white font-semibold opacity-25 m-0 text-sm flex space-x-1 items-center">
                    <span>Contributors</span>
                    <span
                        className={`w-[20px] h-[20px] bg-black/40 dark:bg-white/40 flex items-center justify-center rounded-full ${
                            contributors.length > maxContributorsToShow ? 'text-xs' : ''
                        }`}
                    >
                        {contributors.length > maxContributorsToShow
                            ? `${maxContributorsToShow}+`
                            : contributors.length}
                    </span>
                </h3>
            )}
            <ul className={`list-none m-0 p-0 flex ${className}`}>
                {contributors.slice(0, maxContributorsToShow).map(({ image, name, url, state }) => {
                    return (
                        <li className="first:-ml-0 -ml-2" key={name}>
                            {multiple ? (
                                <Tooltip
                                    placement="top-end"
                                    className="whitespace-nowrap"
                                    content={
                                        <div className="flex space-x-1 items-center">
                                            <span className="text-xs font-semibold">{name}</span>
                                        </div>
                                    }
                                >
                                    <span className="relative">
                                        <Contributor image={image} name={name} url={url} state={state} />
                                    </span>
                                </Tooltip>
                            ) : (
                                <Contributor image={image} name={name} url={url} state={state} text />
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export const Text = ({ children }: { children: React.ReactNode }) => {
    return <p className="m-0 opacity-50 font-semibold flex items-center space-x-2 text-[14px]">{children}</p>
}

const Chevron = ({ open, className = '' }: { open: boolean; className: string }) => {
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

const Menu = ({
    name,
    url,
    children,
    className = '',
    handleLinkClick,
    topLevel,
    menuType = 'standard',
    icon,
    badge,
}: IMenu) => {
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
                            <span className="cursor-pointer flex items-center space-x-2 text-[17px] font-semibold text-black hover:text-black">
                                <span className="w-[25px]">{icon}</span>
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

export const TableOfContents = ({
    menu,
    handleLinkClick,
    menuType = 'standard',
}: {
    menu: IMenu[]
    handleLinkClick?: () => void
    title?: string | boolean
    menuType?: 'scroll' | 'standard'
}) => {
    const Wrapper = {
        standard: React.Fragment,
        scroll: Scrollspy,
    }[menuType]

    const wrapperProps = {
        standard: {},
        scroll: {
            componentTag: 'div',
            offset: -50,
            items: flattenMenu(menu)?.map((navItem) => navItem.url),
            currentClassName: 'bg-gray-accent-light',
        },
    }[menuType]

    return (
        <nav>
            <Wrapper {...wrapperProps}>
                {menu.map((menuItem) => {
                    return (
                        <Menu
                            menuType={menuType}
                            topLevel
                            handleLinkClick={handleLinkClick}
                            className="ml-0"
                            key={menuItem.name}
                            {...menuItem}
                        />
                    )
                })}
            </Wrapper>
        </nav>
    )
}

const Crumbs = ({ crumbs, className = '' }) => {
    return (
        <ul className={`list-none p-0 m-0 whitespace-nowrap overflow-auto flex ${className}`}>
            {crumbs.map(({ name, url }, index) => {
                return (
                    <li
                        key={index}
                        className={`after:mx-2 after:text-gray-accent-light last:after:hidden after:content-["/"]`}
                    >
                        <Link to={url}>{name}</Link>
                    </li>
                )
            })}
        </ul>
    )
}

const Breadcrumb = ({ crumbs }: { crumbs: ICrumb[] }) => {
    const last = crumbs[crumbs.length - 1]
    return (
        <>
            <Crumbs crumbs={crumbs} className="sm:flex hidden" />
            <Link className="sm:hidden flex space-x-1 items-center" to={last.url}>
                <span>
                    <RightArrow className="transform -scale-x-1 w-5 h-5" />
                </span>
                <span>{last.name}</span>
            </Link>
        </>
    )
}

export const sidebarButtonClasses =
    'hover:bg-gray-accent-light rounded-[3px] h-8 w-8 flex justify-center items-center hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark my-1 mx-1 space-x-[1px] transition-colors dark:text-white/50 dark:hover:text-white/100 text-black/50 hover:text-black/100 transition active:top-[0.5px] active:scale-[.9]'

const SidebarAction = ({ children, title, width, className = '', href, onClick }: ISidebarAction) => {
    return (
        <li style={width ? { width } : {}} className={`flex items-center justify-center ${className}`}>
            <Tooltip className="flex" content={title}>
                <span className="relative flex">
                    {href ? (
                        <Link className={sidebarButtonClasses} to={href}>
                            {children}
                        </Link>
                    ) : onClick ? (
                        <button className={sidebarButtonClasses} onClick={onClick}>
                            {children}
                        </button>
                    ) : (
                        children
                    )}
                </span>
            </Tooltip>
        </li>
    )
}

const NextPost = ({ contentContainerClasses = '', excerpt, frontmatter, fields }: INextPost) => {
    return (
        <div className="py-8 border-t border-gray-accent-light dark:border-gray-accent-dark border-dashed">
            <div className={contentContainerClasses}>
                <p className="text-lg text-black/40 dark:text-white/40 m-0 font-bold">Next article</p>
                <h3 className="text-xl font-bold m-0 my-1">{frontmatter?.title}</h3>
                <p className="relative max-h-24 overflow-hidden">
                    {excerpt}
                    <span className="bg-gradient-to-t from-tan dark:from-primary to-transparent absolute w-full h-full inset-0" />
                </p>
                <CallToAction to={fields?.slug}>Read next article</CallToAction>
            </div>
        </div>
    )
}

const Survey = ({ contentContainerClasses = '' }) => {
    return (
        <div className="py-8 border-t border-gray-accent-light dark:border-gray-accent-dark border-dashed">
            <div className={contentContainerClasses}>
                <DocsPageSurvey />
            </div>
        </div>
    )
}

interface IMenu {
    name: string
    url?: string
    children?: IMenu[]
}

interface IGetActiveMenu {
    menu: IMenu[]
    parent?: {
        name: string
        menu: IMenu[]
    }
}

const getActiveMenu = ({
    menu,
    url = location.pathname,
    ...other
}: {
    menu: IMenu[]
    url?: string
    parent?: { menu: IMenu[]; name: string }
}): IGetActiveMenu | undefined => {
    let parent = other.parent
    for (const menuItem of menu) {
        if (menuItem.url === url) return { menu, parent }
        if (menuItem.children) parent = { menu, name: menuItem.name }
        const activeMenu =
            menuItem?.children &&
            getActiveMenu({
                menu: menuItem?.children,
                url,
                parent,
            })
        if (activeMenu) return activeMenu
        continue
    }
}

const MenuContainer = ({
    children,
    setOpen,
}: {
    children: React.ReactNode
    setOpen: (open: null | string) => void
}) => {
    const y = useMotionValue(0)
    const input = [0, 200]
    const output = [1, 0]
    const opacity = useTransform(y, input, output)
    const [yState, setYState] = useState(y.get())

    const handleClose = () => {
        setOpen(null)
    }

    const handleDragEnd = () => {
        if (yState < 200) {
            y.stop()
            y.set(0)
        } else {
            setOpen(null)
        }
    }

    useEffect(() => {
        const unsubscribe = y.onChange(setYState)
        return unsubscribe
    }, [])

    return (
        <motion.div
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed w-full h-full bg-white/70 dark:bg-black/70 top-0 left-0"
        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ translateY: '100%', opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: '100%', opacity: 0 }}
                className="px-4 fixed bottom-0 w-full left-0"
            >
                <motion.div
                    dragConstraints={{ top: 0 }}
                    style={{ y, opacity }}
                    onDragEnd={handleDragEnd}
                    drag="y"
                    className="bg-white dark:bg-gray-accent-dark py-4 px-4 rounded-tr-md rounded-tl-md shadow-lg"
                >
                    {children}
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.01,
        },
    },
}

const motionListContainer = {
    initial: 'hidden',
    animate: 'show',
    variants: container,
}

const MobileMenu = ({
    crumbs,
    setOpen,
    ...other
}: {
    crumbs: [ICrumb]
    menu: IMenu[]
    setOpen: (open: null | string) => void
}) => {
    const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward')
    const [menu, setMenu] = useState(getActiveMenu({ menu: other.menu }) || { menu: other.menu })
    const handleClick = ({ url, menu }: { url?: string; menu?: IMenu[] }) => {
        if (menu) {
            const newMenu = getActiveMenu({
                menu: other.menu,
                url: menu.find((menuItem) => !!menuItem.url)?.url,
            })
            setMenu(newMenu)
        } else if (url) {
            gatsbyNavigate(url)
        }
    }

    const item = {
        hidden: {
            translateX: animationDirection === 'forward' ? '-50%' : '50%',
            opacity: 0,
        },
        show: { translateX: 0, opacity: 1 },
    }

    return (
        <MenuContainer setOpen={setOpen}>
            {crumbs && (
                <div className="pb-4 mb-4 border-b border-dashed border-gray-accent-light/50 ">
                    <Crumbs crumbs={crumbs} />
                </div>
            )}

            <motion.ul
                key={menu?.parent?.name}
                {...motionListContainer}
                className="list-none m-0 p-0 pl-6 mt-2 h-[40vh] overflow-auto"
            >
                {menu?.parent?.menu && (
                    <motion.li
                        initial={{ translateX: '100%', opacity: 0 }}
                        animate={{ translateX: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mb-3 flex items-center relative"
                    >
                        <button
                            className="transform -scale-x-1 text-red -translate-x-full absolute"
                            onClick={() => {
                                setAnimationDirection('backward')
                                handleClick({ menu: menu?.parent?.menu })
                            }}
                        >
                            <RightArrow className="w-6 h-6" />
                        </button>
                        <h5 className="m-0 text-base font-semibold opacity-40">{menu?.parent?.name}</h5>
                    </motion.li>
                )}
                {menu?.menu?.map(({ name, url, children }, index) => {
                    return (
                        <motion.li
                            variants={item}
                            exit={{ opacity: 0 }}
                            className={`${url === undefined ? 'mt-5' : ''} relative last:mb-0 mb-3 first:mt-0`}
                            key={name + index + url}
                        >
                            <div className={`text-base`}>
                                {url === undefined ? (
                                    <h5 className="m-0 text-base">{name}</h5>
                                ) : (
                                    <button
                                        className={`${
                                            url === location.pathname ? 'active-product opacity-90' : 'opacity-50'
                                        } hover:opacity-100 font-semibold`}
                                        onClick={() => {
                                            setAnimationDirection('forward')
                                            handleClick({ url, menu: children })
                                        }}
                                    >
                                        <span className="text-left">{name}</span>
                                    </button>
                                )}
                            </div>
                        </motion.li>
                    )
                })}
            </motion.ul>
        </MenuContainer>
    )
}

const MobileTOC = ({ setOpen, toc }) => {
    const item = {
        hidden: {
            translateX: '50%',
            opacity: 0,
        },
        show: { translateX: 0, opacity: 1 },
    }
    return (
        <MenuContainer setOpen={setOpen}>
            <p className="opacity-40 text-base mt-0 mb-3 font-semibold">On this page</p>
            <motion.ul
                {...motionListContainer}
                className="list-none m-0 p-0 flex flex-col space-y-1 max-h-[40vh] overflow-auto"
            >
                {toc?.map((navItem, index) => {
                    return (
                        <motion.li variants={item} exit={{ opacity: 0 }} key={index}>
                            <InternalSidebarLink
                                onClick={() => setOpen(null)}
                                url={navItem.url}
                                name={navItem.value}
                                depth={navItem.depth}
                                className="jumpTo text-[15px] pl-6"
                            />
                        </motion.li>
                    )
                })}
            </motion.ul>
        </MenuContainer>
    )
}

const MobileSidebar = ({ sidebar, setOpen }: { sidebar: React.ReactNode }) => {
    return (
        <MenuContainer setOpen={setOpen}>
            <div className="h-[40vh] overflow-auto">{sidebar}</div>
        </MenuContainer>
    )
}

const menuButtonClasses = `bg-white flex space-x-2 items-center font-semibold active:top-[0.5px]
active:scale-[.98] transition-transform text-black shadow-md`

const MobileNav = ({ crumbs, menu, toc, sidebar }: { crumbs: [ICrumb]; menu: IMenu[] }) => {
    const [open, setOpen] = useState<null | string>(null)

    return (
        <div className="sticky bottom-0 px-4 pb-4 z-[99999999] block lg:hidden">
            <div className="flex">
                <button onClick={() => setOpen('menu')} className={`py-2 px-4 rounded-full ${menuButtonClasses}`}>
                    <Bookmark />
                    <span>Menu</span>
                </button>
                <div className="ml-auto flex justify-end divide-x divide-dashed divide-gray-accent-light">
                    <button
                        onClick={() => setOpen('toc')}
                        className={`aspect-square h-full flex items-center justify-center rounded-tl-full rounded-bl-full ${menuButtonClasses}`}
                    >
                        <TOCIcon />
                    </button>
                    <button
                        onClick={() => setOpen('sidebar')}
                        className={`aspect-square h-full flex items-center justify-center rounded-tr-full rounded-br-full  ${menuButtonClasses}`}
                    >
                        <InfoOutlined />
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {open === 'menu' && <MobileMenu setOpen={setOpen} menu={menu} crumbs={crumbs} />}
                {open === 'toc' && <MobileTOC toc={toc} setOpen={setOpen} />}
                {open === 'sidebar' && <MobileSidebar sidebar={sidebar} setOpen={setOpen} />}
            </AnimatePresence>
        </div>
    )
}

const defaultMenuWidth = { left: 265, right: 265 }

export default function PostLayout({
    tableOfContents,
    children,
    sidebar,
    contentWidth = 650,
    menuWidth = defaultMenuWidth,
    questions,
    menu,
    article = true,
    title,
    filePath,
    breadcrumb,
    hideSidebar,
    nextPost,
    hideSurvey,
    hideSearch,
    contentContainerClassName,
    menuType = 'standard',
    mobileMenu = true,
    searchFilter,
}: IProps) {
    const { hash } = useLocation()
    const [view, setView] = useState('Article')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [fullWidthContent, setFullWidthContent] = useState(hideSidebar || !sidebar)
    const crumbsFiltered = breadcrumb

    const handleMobileMenuClick = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    useEffect(() => {
        if (hash && !hideSearch) {
            scroll.scrollMore(-50)
        }
    }, [])

    const handleFullWidthContentChange = () => {
        localStorage.setItem('full-width-content', !fullWidthContent + '')
        setFullWidthContent(!fullWidthContent)
    }

    useEffect(() => {
        if (!hideSidebar && sidebar) {
            setFullWidthContent(localStorage.getItem('full-width-content') === 'true')
        } else {
            setFullWidthContent(true)
        }
    }, [sidebar, hideSidebar])

    const toc = tableOfContents?.filter((item) => item.depth > -1 && item.depth < 2)
    const contentContainerClasses =
        contentContainerClassName ||
        `px-5 lg:px-6 xl:px-12 w-full transition-all ${
            hideSidebar ? 'lg:max-w-5xl' : !fullWidthContent ? 'lg:max-w-3xl' : 'lg:max-w-full'
        } ${menu ? 'mx-auto' : 'lg:ml-auto'}`

    return (
        <div className="sm:border-t border-dashed border-gray-accent-light dark:border-gray-accent-dark">
            <div
                style={{
                    gridAutoColumns: menu ? `${menuWidth?.left ?? defaultMenuWidth?.left}px 1fr` : `1fr 1fr`,
                }}
                className="w-full relative lg:grid lg:grid-flow-col"
            >
                {menu && (
                    <div className="h-full border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark lg:block hidden relative z-20">
                        <aside
                            className={`lg:sticky bg-tan dark:bg-primary top-0 flex-shrink-0 w-full justify-self-end px-4 lg:box-border my-10 lg:my-0 mr-auto overflow-y-auto lg:h-screen pb-10 ${
                                hideSearch ? 'pt-5' : ''
                            }`}
                        >
                            {!hideSearch && (
                                <div className="lg:sticky top-0 z-20 pt-4 -mx-2 px-1 bg-tan dark:bg-primary relative">
                                    <SidebarSearchBox />
                                </div>
                            )}
                            <TableOfContents menuType={menuType} menu={menu} />
                        </aside>
                    </div>
                )}
                <div className="flex flex-col">
                    <section
                        style={{
                            gridAutoColumns: menu
                                ? `1fr ${menuWidth?.right ?? defaultMenuWidth?.right}px`
                                : `minmax(auto, ${contentWidth}px) minmax(max-content, 1fr)`,
                        }}
                        className={
                            'sm:pt-4 sm:pb-4 pb-0 sm:border-b border-gray-accent-light dark:border-gray-accent-dark border-dashed lg:grid lg:grid-flow-col items-center'
                        }
                    >
                        {crumbsFiltered?.length > 0 && (
                            <div className={`${contentContainerClasses} grid-cols-1`}>
                                <Breadcrumb crumbs={crumbsFiltered} />
                            </div>
                        )}
                        <div className="ml-auto px-6 lg:mt-0 mt-4 lg:block hidden">
                            <ShareLinks href={location.href} title={title} />
                        </div>
                    </section>

                    <div
                        className="lg:grid lg:grid-flow-col items-start flex-grow"
                        style={{
                            gridAutoColumns: menu
                                ? `1fr ${menuWidth?.right ?? defaultMenuWidth?.right}px`
                                : `minmax(auto, ${contentWidth}px) minmax(max-content, 1fr)`,
                        }}
                    >
                        <article
                            key={`${title}-article`}
                            id="content-menu-wrapper"
                            className="lg:border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark lg:py-12 py-4 ml-auto w-full h-full box-border"
                        >
                            <div className={contentContainerClasses}>
                                <div>{children}</div>
                                {questions}
                            </div>
                            {!hideSurvey && <Survey contentContainerClasses={contentContainerClasses} />}
                            {nextPost && <NextPost {...nextPost} contentContainerClasses={contentContainerClasses} />}
                            {menu && mobileMenu && (
                                <MobileNav menu={menu} toc={toc} crumbs={crumbsFiltered} sidebar={sidebar} />
                            )}
                        </article>
                        {!hideSidebar && sidebar && (
                            <aside
                                key={`${title}-sidebar`}
                                className="flex-shrink-0 w-full justify-self-end my-10 lg:my-0 mr-auto h-full lg:px-0 px-4 box-border lg:flex hidden flex-col"
                            >
                                <div>{sidebar}</div>
                                <div className="flex flex-grow items-end">
                                    <div className="lg:pt-6 !border-t-0 sticky bottom-0 w-full">
                                        {view === 'Article' && toc?.length > 1 && (
                                            <div className="px-4 lg:px-8 lg:pb-4 lg:block hidden">
                                                <h4 className="text-black dark:text-white font-semibold opacity-25 m-0 mb-1 text-sm">
                                                    Jump to:
                                                </h4>
                                                <Scrollspy
                                                    offset={-50}
                                                    className="list-none m-0 p-0 flex flex-col"
                                                    items={tableOfContents?.map((navItem) => navItem.url)}
                                                    currentClassName="active-product"
                                                >
                                                    {toc.map((navItem, index) => (
                                                        <li className="relative leading-none m-0" key={navItem.url}>
                                                            <InternalSidebarLink
                                                                url={navItem.url}
                                                                name={navItem.value}
                                                                depth={navItem.depth}
                                                                className="hover:opacity-100 opacity-60 text-[14px] py-1 block relative active:top-[0.5px] active:scale-[.99]"
                                                            />
                                                        </li>
                                                    ))}
                                                </Scrollspy>
                                            </div>
                                        )}
                                        <ul className="list-none p-0 flex mt-0 mb-10 lg:mb-0 border-t border-gray-accent-light border-dashed dark:border-gray-accent-dark items-center bg-tan/40 dark:bg-primary/40 backdrop-blur">
                                            {filePath && (
                                                <div className="flex divide-x divide-dashed divide-gray-accent-light dark:divide-gray-accent-dark border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark">
                                                    <SidebarAction
                                                        href={`https://github.com/PostHog/posthog.com/tree/master/contents/${filePath}`}
                                                        title="Edit this page"
                                                    >
                                                        <Edit />
                                                    </SidebarAction>
                                                    <SidebarAction
                                                        title="Raise an issue"
                                                        href={`https://github.com/PostHog/posthog.com/issues/new?title=Feedback on: ${title}&body=**Issue with: /${filePath}**\n\n`}
                                                    >
                                                        <Issue />
                                                    </SidebarAction>
                                                </div>
                                            )}
                                            <div className="ml-auto flex divide-x divide-dashed divide-gray-accent-light dark:divide-gray-accent-dark border-l border-dashed border-gray-accent-light dark:border-gray-accent-dark">
                                                <SidebarAction
                                                    className="hidden xl:block"
                                                    title="Toggle content width"
                                                    onClick={handleFullWidthContentChange}
                                                >
                                                    <ExpandDocument expanded={fullWidthContent} />
                                                </SidebarAction>
                                                <SidebarAction
                                                    className="pl-2 pr-2"
                                                    width="auto"
                                                    title="Toggle dark mode"
                                                >
                                                    <DarkModeToggle />
                                                </SidebarAction>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
