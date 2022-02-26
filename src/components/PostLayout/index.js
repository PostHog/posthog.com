import { useLocation } from '@reach/router'
import Chip from 'components/Chip'
import Avatar from 'components/CommunityQuestions/Avatar'
import { Facebook, LinkedIn, Mail, Twitter } from 'components/Icons/Icons'
import Link from 'components/Link'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
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
        <div className={`py-4 px-5 lg:px-8 ${className}`}>
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

export const Contributor = ({ image, name, imageURL }) => {
    return (
        <>
            <div className="w-[38px] h-[38px] relative rounded-full overflow-hidden">
                {imageURL ? (
                    <Avatar image={imageURL} />
                ) : image ? (
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
            {contributors.map(({ image, imageURL, id, name, url, state }) => {
                return (
                    <li key={id}>
                        {url ? (
                            <Link state={state} className={classes} to={url}>
                                <Contributor image={image} name={name} />
                            </Link>
                        ) : (
                            <span className={classes}>
                                <Contributor imageURL={imageURL} image={image} name={name} />
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

export default function PostLayout({
    tableOfContents,
    children,
    sidebar,
    contentWidth = 650,
    questions,
    article = true,
}) {
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
            <article
                style={{ maxWidth: contentWidth }}
                className="col-span-2 px-5 lg:px-8 lg:border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark mt-10 lg:mt-0 lg:pt-10 lg:pb-20 ml-auto w-full"
            >
                <div style={{ maxWidth: contentWidth }} className={`w-full ${article ? 'article-content' : ''}`}>
                    {children}
                </div>
                {questions && questions}
            </article>
            <aside className="lg:sticky top-10 flex-shrink-0 w-full justify-self-end lg:box-content my-10 lg:my-0 lg:mt-10 pb-20 mr-auto overflow-y-auto lg:h-[calc(100vh-7.5rem)]">
                <div className="grid divide-y divide-gray-accent-light dark:divide-gray-accent-dark divide-dashed">
                    {sidebar && sidebar}
                    {view === 'Article' && !breakpoints.md && toc?.length > 1 && (
                        <div className="pt-12 px-5 lg:px-8 !border-t-0">
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
