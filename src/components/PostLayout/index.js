import { useLocation } from '@reach/router'
import Chip from 'components/Chip'
import { Edit, ExpandDocument, Facebook, Issue, LinkedIn, Mail, MobileMenu, Twitter } from 'components/Icons/Icons'
import Link from 'components/Link'
import { motion, AnimatePresence } from 'framer-motion'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import Scrollspy from 'react-scrollspy'
import InternalSidebarLink from 'components/Docs/InternalSidebarLink'
import SearchBar from 'components/Docs/SearchBar'
import { DarkModeToggle } from 'components/DarkModeToggle'
import { push as PushMenu } from 'react-burger-menu'
import Tooltip from 'components/Tooltip'
import Toggle from 'components/Toggle'
import { ArrowsExpandIcon } from '@heroicons/react/outline'

const Iframe = (props) => {
    if (props.src && props.src.indexOf('youtube.com') !== -1) {
        return (
            <div style={{ position: 'relative', height: 0, paddingBottom: '56.25%' }}>
                <iframe {...props} className="absolute top-0 left-0 w-full h-full" />
            </div>
        )
    } else {
        return <iframe {...props} />
    }
}

const ShareLink = ({ children, url }) => {
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

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

export const SidebarSection = ({ title, children, className = '' }) => {
    return (
        <div className={`py-4 px-5 lg:px-8 ${className}`}>
            {title && <h3 className="text-[13px] opacity-40 font-semibold mb-3">{title}</h3>}
            {children}
        </div>
    )
}

export const Topics = ({ topics }) => {
    return (
        <ul className="list-none p-0 flex items-start flex-wrap -m-1">
            {topics.map(({ name, url, state }) => {
                return (
                    <li className="m-1" key={name}>
                        <Chip state={state} className="text-red hover:text-red" href={url} size="xs">
                            {name}
                        </Chip>
                    </li>
                )
            })}
        </ul>
    )
}

export const PageViews = ({ pageViews }) => {
    return <p className="m-0 opacity-50 font-semibold">{pageViews} views</p>
}

export const ShareLinks = ({ title, href }) => {
    return (
        <div className="opacity-50 flex space-x-3 items-center">
            <ShareLink url={`https://www.facebook.com/sharer/sharer.php?u=${href}`}>
                <Facebook />
            </ShareLink>
            <ShareLink
                url={`https://twitter.com/intent/tweet?url=${href}&text=Check%20out%20this%20article%20from%20%40poshog%0A%0A`}
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
        </div>
    )
}

export const Contributor = ({ image, name }) => {
    return (
        <>
            <div className="w-[38px] h-[38px] relative rounded-full overflow-hidden">
                {image ? (
                    <GatsbyImage image={getImage(image)} />
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
            <span className="author text-[14px] font-semibold">{name}</span>
        </>
    )
}

export const Contributors = ({ contributors, className = '' }) => {
    const classes = 'flex space-x-2 items-center no-underline'
    return (
        <ul className={`list-none m-0 p-0 ${className}`}>
            {contributors.slice(0, 3).map(({ image, id, name, url, state }) => {
                return (
                    <li key={name}>
                        {url ? (
                            <Link state={state} className={classes} to={url}>
                                <Contributor image={image} name={name} />
                            </Link>
                        ) : (
                            <span className={classes}>
                                <Contributor image={image} name={name} />
                            </span>
                        )}
                    </li>
                )
            })}
        </ul>
    )
}

export const Text = ({ children }) => {
    return <p className="m-0 opacity-50 font-semibold flex items-center space-x-2 text-[14px]">{children}</p>
}

const Chevron = ({ open }) => {
    return (
        <div className="bg-tan dark:bg-primary rounded-full h-[28px] w-[28px] flex justify-center items-center text-black dark:text-white">
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

const Menu = ({ name, url, children, className = '', handleLinkClick, topLevel }) => {
    const { pathname } = useLocation()
    const isActive = url === pathname
    const [open, setOpen] = useState(false)
    const buttonClasses = `mb-[3px] text-left flex justify-between items-center relative text-primary hover:text-primary dark:text-white dark:hover:text-white px-3 py-[5px] inline-block w-full rounded-md ${
        children || topLevel ? 'hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark transition-all' : ''
    } ${children && open ? 'bg-gray-accent-light dark:bg-gray-accent-dark' : ''}`
    useEffect(() => {
        const isOpen = (children) => {
            return (
                children &&
                children.some((child) => {
                    return child.url === pathname || isOpen(child.children)
                })
            )
        }
        setOpen(isActive || (children && isOpen(children)))
    }, [url])

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

    return (
        <ul className={`list-none m-0 p-0 text-base font-semibold overflow-hidden ml-4 ${className}`}>
            <li>
                {name && url ? (
                    <Link
                        onClick={() => {
                            handleLinkClick && handleLinkClick()
                            if (children && children.length > 0) {
                                setOpen(!open)
                            }
                        }}
                        className={`${buttonClasses} ${
                            !topLevel ? 'opacity-50' : ''
                        } hover:opacity-100 transition-opacity`}
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
                        {children && children.length > 0 && <Chevron open={open} />}
                    </Link>
                ) : (
                    <button className={buttonClasses} onClick={() => setOpen(!open)}>
                        <span>{name}</span>
                        {children && children.length > 0 && <Chevron open={open} />}
                    </button>
                )}
                {children && children.length > 0 && (
                    <motion.div initial={{ height: 0 }} animate={{ height: open ? 'auto' : 0 }}>
                        {children.map((child, index) => {
                            return <Menu handleLinkClick={handleLinkClick} key={child.name} {...child} />
                        })}
                    </motion.div>
                )}
            </li>
        </ul>
    )
}

const TableOfContents = ({ menu, handleLinkClick }) => {
    return (
        <>
            <p className="text-black dark:text-white font-semibold opacity-25 m-0 mb-3 ml-3">Table of contents</p>
            <nav>
                {menu.map((menuItem, index) => {
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
    )
}

const Breadcrumb = ({ crumbs }) => {
    return (
        <ul className="list-none flex m-0 p-0 mb-2 whitespace-nowrap overflow-auto">
            {crumbs.map(({ name, url, next }, index) => {
                const hasNext = !!crumbs[index + 1]?.next
                return (
                    <li
                        key={url}
                        className={`after:mx-1 after:text-gray-accent-light last:after:hidden ${
                            hasNext ? 'crumb-has-next' : 'after:content-["/"]'
                        }`}
                    >
                        <Link className={next ? 'opacity-70 hover:opacity-100 transition-opacity' : ''} to={url}>
                            {name}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

const SidebarAction = ({ children, title, width, className = '', href, onClick }) => {
    const buttonClasses =
        'hover:bg-gray-accent-light rounded-[3px] h-8 w-8 flex justify-center items-center hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark m-1 transition-colors text-gray dark:text-[#999] hover:text-gray dark:hover:text-[#999]'

    return (
        <li style={width ? { width } : {}} className={`flex items-center justify-center ${className}`}>
            <Tooltip className="flex" title={title}>
                <span className="relative flex">
                    {href ? (
                        <Link className={buttonClasses} to={href}>
                            {children}
                        </Link>
                    ) : onClick ? (
                        <button className={buttonClasses} onClick={onClick}>
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

export default function PostLayout({
    tableOfContents,
    children,
    sidebar,
    contentWidth = 650,
    questions,
    menu,
    article = true,
    title,
    filePath,
    breadcrumb,
    hideSidebar,
}) {
    const { hash } = useLocation()
    const breakpoints = useBreakpoint()
    const [view, setView] = useState('Article')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [fullWidthContent, setFullWidthContent] = useState(hideSidebar || !sidebar)

    const handleMobileMenuClick = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    useEffect(() => {
        if (hash) {
            scroll.scrollMore(-50)
        }
    }, [])

    const handleFullWidthContentChange = () => {
        setFullWidthContent(!fullWidthContent)
        localStorage.setItem('full-width-content', fullWidthContent)
    }

    useEffect(() => {
        if (!hideSidebar && sidebar) {
            setFullWidthContent(localStorage.getItem('full-width-content') === 'true')
        } else {
            setFullWidthContent(true)
        }
    }, [sidebar, hideSidebar])

    const toc = tableOfContents?.filter((item) => item.depth > -1 && item.depth <= 2)
    const contentContainerClasses = `w-full transition-all ${
        hideSidebar ? 'lg:max-w-5xl' : !fullWidthContent ? 'lg:max-w-[650px]' : 'lg:max-w-full'
    } ${menu ? 'mx-auto' : 'lg:ml-auto'}`

    return (
        <div id="menu-wrapper">
            <div className="py-2 px-4 border-y border-dashed border-gray-accent-light dark:border-gray-accent-dark flex justify-between sticky top-[-2px] bg-tan dark:bg-primary z-10">
                {menu && (
                    <button onClick={handleMobileMenuClick} className="py-2 px-3 block lg:hidden">
                        <MobileMenu style={{ transform: `rotate(${mobileMenuOpen ? '180deg' : '0deg'})` }} />
                    </button>
                )}
                <SearchBar />
            </div>
            {menu && (
                <PushMenu
                    width="calc(100vw - 80px)"
                    customBurgerIcon={false}
                    customCrossIcon={false}
                    styles={{
                        bmOverlay: {
                            background: 'transparent',
                        },
                        bmMenuWrap: {
                            height: '80%',
                        },
                    }}
                    onClose={() => setMobileMenuOpen(false)}
                    pageWrapId="content-menu-wrapper"
                    outerContainerId="menu-wrapper"
                    overlayClassName="backdrop-blur"
                    isOpen={mobileMenuOpen}
                >
                    <div className="h-full border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark pt-6 px-5">
                        <TableOfContents handleLinkClick={() => setMobileMenuOpen(false)} menu={menu} />
                    </div>
                </PushMenu>
            )}
            <div
                style={{
                    gridAutoColumns: menu
                        ? `265px 1fr 1fr 265px`
                        : `1fr minmax(auto, ${contentWidth}px) minmax(max-content, 1fr)`,
                }}
                className="w-full relative lg:grid lg:grid-flow-col items-start -mb-20"
            >
                {menu && (
                    <div className="h-full border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark lg:block hidden">
                        <aside className="lg:sticky top-10 flex-shrink-0 w-full lg:max-w-[265px] justify-self-end px-2 lg:box-border my-10 lg:my-0 lg:pt-10 pb-20 mr-auto overflow-y-auto lg:h-[calc(100vh-7.5rem)]">
                            <TableOfContents menu={menu} />
                        </aside>
                    </div>
                )}
                <article
                    id="content-menu-wrapper"
                    className="col-span-2 px-5 lg:px-12 lg:border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark mt-10 lg:mt-0 lg:pt-10 lg:pb-20 ml-auto w-full h-full box-border"
                >
                    <div className={contentContainerClasses}>
                        {breadcrumb && <Breadcrumb crumbs={breadcrumb} />}
                        <div className="article-content">{children}</div>
                    </div>
                    {questions && <div className={contentContainerClasses}>{questions}</div>}
                </article>
                {!hideSidebar && sidebar && (
                    <aside className="flex-shrink-0 w-full justify-self-end my-10 lg:my-0 mr-auto h-full lg:px-0 px-5 box-border">
                        <div className="h-full flex flex-col divide-y divide-gray-accent-light dark:divide-gray-accent-dark divide-dashed">
                            <div className="relative h-full">
                                <div className="pt-6 top-10 sticky">{sidebar}</div>
                            </div>

                            <div className="lg:pt-6 !border-t-0 mt-auto sticky bottom-0">
                                {view === 'Article' && !breakpoints.md && toc?.length > 1 && (
                                    <div className="px-5 lg:px-8 max-h-72 overflow-auto">
                                        <h4 className="text-[13px] mb-2">On this page</h4>
                                        <Scrollspy
                                            key={title}
                                            offset={-50}
                                            className="list-none m-0 p-0 flex flex-col space-y-[10px]"
                                            items={tableOfContents?.map((navItem) => navItem.url)}
                                            currentClassName="active-product"
                                        >
                                            {toc.map((navItem, index) => (
                                                <li className="relative leading-none" key={navItem.url}>
                                                    <InternalSidebarLink
                                                        url={navItem.url}
                                                        name={navItem.value}
                                                        depth={navItem.depth}
                                                        className="hover:opacity-100 opacity-60 text-[14px]"
                                                    />
                                                </li>
                                            ))}
                                        </Scrollspy>
                                    </div>
                                )}
                                <ul className="list-none px-5 flex mt-0 lg:mt-10 mb-10 lg:mb-0 border-t border-gray-accent-light border-dashed dark:border-gray-accent-dark items-center">
                                    {filePath && (
                                        <>
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
                                        </>
                                    )}
                                    <SidebarAction
                                        className="!ml-auto"
                                        title="Toggle content width"
                                        onClick={handleFullWidthContentChange}
                                    >
                                        <ExpandDocument expanded={fullWidthContent} />
                                    </SidebarAction>
                                    <SidebarAction className="ml-1" width="auto" title="Toggle dark mode">
                                        <DarkModeToggle />
                                    </SidebarAction>
                                </ul>
                            </div>
                        </div>
                    </aside>
                )}
            </div>
        </div>
    )
}
