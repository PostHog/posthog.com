import { useLocation } from '@reach/router'
import Chip from 'components/Chip'
import { Facebook, LinkedIn, Mail, Twitter } from 'components/Icons/Icons'
import Link from 'components/Link'
import { motion } from 'framer-motion'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import React, { useEffect, useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import Scrollspy from 'react-scrollspy'
import InternalSidebarLink from '../../templates/Handbook/InternalSidebarLink'

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
        <a className="text-primary hover:text-primary dark:text-white dark:hover:text-white" onClick={handleClick}>
            {children}
        </a>
    )
}

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

export const SidebarSection = ({ title, children, className = '' }) => {
    return (
        <div className={`py-4 first:pt-0 px-5 lg:px-6 ${className}`}>
            {title && <h3 className="text-[13px] opacity-40 font-semibold mb-3">{title}</h3>}
            {children}
        </div>
    )
}

export const Topics = ({ topics }) => {
    return (
        <ul className="list-none p-0 flex items-start flex-wrap -m-1">
            {topics.map(({ title, url, state }) => {
                return (
                    <li className="m-1" key={title}>
                        <Chip state={state} className="text-red hover:text-red" href={url} size="xs">
                            {title}
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
                <img className="absolute w-full h-full inset-0 object-cover" src={image} />
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

const Menu = ({ title, url, children, className = '' }) => {
    const { pathname } = useLocation()
    const isActive = url === pathname
    const [open, setOpen] = useState(false)
    const buttonClasses = `text-left flex justify-between items-center relative text-primary hover:text-primary dark:text-white dark:hover:text-white px-3 py-[6px] inline-block w-full rounded-md ${
        children && open ? 'bg-gray-accent-light dark:bg-gray-accent-dark' : ''
    }`
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
    }, [])
    return (
        <ul className={`list-none m-0 p-0 text-base font-semibold overflow-hidden ml-4 ${className}`}>
            <li>
                {title && url ? (
                    <Link className={buttonClasses} to={url}>
                        <span className={isActive ? 'active-link' : 'opacity-50 hover:opacity-100 transition-opacity'}>
                            {title}
                        </span>
                        {children && children.length > 0 && <Chevron open={open} />}
                    </Link>
                ) : (
                    <button className={buttonClasses} onClick={() => setOpen(!open)}>
                        <span>{title}</span>
                        {children && children.length > 0 && <Chevron open={open} />}
                    </button>
                )}
                {children && children.length > 0 && (
                    <motion.div initial={{ height: 0 }} animate={{ height: open ? 'auto' : 0 }}>
                        {children.map((child, index) => {
                            return <Menu key={child.title} {...child} />
                        })}
                    </motion.div>
                )}
            </li>
        </ul>
    )
}

export default function PostLayout({ tableOfContents, children, sidebar, contentWidth = 650, questions, menu }) {
    const { hash } = useLocation()
    const breakpoints = useBreakpoint()
    const [view, setView] = useState('Article')

    useEffect(() => {
        if (hash) {
            scroll.scrollMore(-50)
        }
    }, [])

    const toc = tableOfContents?.filter((item) => item.depth <= 2)

    return (
        <div
            style={{
                gridAutoColumns: menu
                    ? `265px 1fr 1fr min-content`
                    : `1fr minmax(auto, ${contentWidth}px) minmax(max-content, 1fr)`,
            }}
            className="w-full relative lg:grid lg:grid-flow-col items-start -mb-20"
        >
            {menu && (
                <div className="h-full border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark">
                    <aside className="lg:sticky top-20 flex-shrink-0 w-full lg:max-w-[265px] justify-self-end px-2 lg:box-border my-10 lg:my-0 lg:mt-10 pb-20 mr-auto overflow-y-auto lg:h-[calc(100vh-7.5rem)]">
                        <p className="text-black dark:text-white font-semibold opacity-25 m-0 mb-3 ml-3">
                            Table of contents
                        </p>
                        <nav>
                            {menu.map((menuItem, index) => {
                                return <Menu className="ml-0" key={menuItem.title} {...menuItem} />
                            })}
                        </nav>
                    </aside>
                </div>
            )}
            <article className="col-span-2 px-5 lg:px-8 lg:border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark mt-10 lg:mt-0 lg:pt-10 lg:pb-20 ml-auto w-full">
                <div style={{ maxWidth: contentWidth }} className="w-full article-content">
                    {children}
                </div>
                {questions && questions}
            </article>
            <aside className="lg:sticky top-20 flex-shrink-0 w-full lg:w-[300px] justify-self-end lg:box-content my-10 lg:my-0 lg:mt-10 pb-20 mr-auto overflow-y-auto lg:h-[calc(100vh-7.5rem)]">
                <div className="h-full flex flex-col divide-y divide-gray-accent-light dark:divide-gray-accent-dark divide-dashed">
                    {sidebar && sidebar}
                    {view === 'Article' && !breakpoints.md && toc?.length > 1 && (
                        <div className="pt-12 !border-t-0 mt-auto px-5 lg:px-6">
                            <h4 className="text-[13px] mb-2">On this page</h4>
                            <Scrollspy
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
                </div>
            </aside>
        </div>
    )
}
