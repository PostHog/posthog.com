import { useLocation } from '@reach/router'
import Chip from 'components/Chip'
import { Facebook, LinkedIn, Mail, Twitter } from 'components/Icons/Icons'
import Link from 'components/Link'
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
        <div className={`py-4 ${className}`}>
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
            {contributors.map(({ image, id, name, url, state }) => {
                return (
                    <li key={id}>
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

export default function PostLayout({ tableOfContents, children, sidebar, contentWidth = 650 }) {
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
            style={{ gridAutoColumns: `1fr minmax(auto, ${contentWidth}px) minmax(max-content, 1fr)` }}
            className="w-full relative lg:grid lg:grid-flow-col items-start -mb-20"
        >
            <article className="article-content col-span-2 px-5 lg:px-8 lg:border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark mt-10 lg:mt-0 lg:pt-10 lg:pb-20 ml-auto">
                <div style={{ maxWidth: contentWidth }} className="w-full">
                    {children}
                </div>
            </article>
            <aside className="lg:sticky top-10 flex-shrink-0 w-full lg:w-[229px] justify-self-end px-5 lg:px-8 lg:box-content my-10 lg:my-0 lg:mt-10 pb-20 mr-auto overflow-y-auto lg:h-[calc(100vh-7.5rem)]">
                <div className="grid divide-y divide-gray-accent-light dark:divide-gray-accent-dark divide-dashed">
                    {sidebar && sidebar}
                    {view === 'Article' && !breakpoints.md && toc?.length > 1 && (
                        <div className="pt-12 !border-t-0">
                            <h4 className="text-[13px] mb-2">On this page</h4>
                            <Scrollspy
                                offset={-50}
                                className="list-none m-0 p-0 flex flex-col space-y-[10px]"
                                items={tableOfContents?.map((navItem) => navItem.url)}
                                currentClassName="active-product"
                            >
                                {toc.map((navItem, index) => (
                                    <li className="relative leading-none" key={index}>
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
