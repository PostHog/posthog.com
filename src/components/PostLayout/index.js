import React, { useState, useEffect } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import MobileSidebar from '../../templates/Handbook/MobileSidebar'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { DocsPageSurvey } from 'components/DocsPageSurvey'
import Scrollspy from 'react-scrollspy'
import InternalSidebarLink from '../../templates/Handbook/InternalSidebarLink'
import { useLocation } from '@reach/router'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { animateScroll as scroll } from 'react-scroll'
import { InlineCode } from 'components/InlineCode'
import { Blockquote } from 'components/BlockQuote'
import { CodeBlock } from 'components/CodeBlock'
import { ZoomImage } from 'components/ZoomImage'
import Link from 'components/Link'
import { shortcodes } from '../../mdxGlobalComponents'
import { Heading } from 'components/Heading'
import Chip from 'components/Chip'
import { Facebook, LinkedIn, Mail, Twitter } from 'components/Icons/Icons'

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

const ViewButton = ({ title, view, setView }) => {
    return (
        <button
            onClick={() => setView(title)}
            style={{
                background: view === title ? '#F54E00' : '#E5E7E0',
                color: view === title ? 'white' : 'black',
            }}
            className="py-2 px-4 rounded-md w-1/2 transition-colors"
        >
            {title}
        </button>
    )
}

const SidebarSection = ({ title, children }) => {
    return (
        <div className="py-4">
            {title && <h3 className="text-[13px] opacity-40 font-semibold mb-3">{title}</h3>}
            {children}
        </div>
    )
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
            <ShareLink url={`https://twitter.com/intent/tweet?url=${href}`}>
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

export const Contributors = ({ contributors }) => {
    return (
        <ul className="list-none m-0 p-0 flex flex-col space-y-2">
            {contributors.map(({ image, id, name, url, state }) => {
                return (
                    <li key={id}>
                        <Link state={state} className="flex space-x-2 items-center" to={url}>
                            <div className="w-[32px] h-[32px] relative rounded-full overflow-hidden">
                                <img className="absolute w-full h-full inset-0 object-cover" src={image} />
                            </div>
                            <span className="author text-[14px] font-semibold">{name}</span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default function PostLayout({ tableOfContents, children, sidebarComponents }) {
    const { hash } = useLocation()
    const breakpoints = useBreakpoint()
    const [view, setView] = useState('Article')
    const components = {
        iframe: Iframe,
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: CodeBlock,
        img: ZoomImage,
        h1: (props) => Heading({ as: 'h1', ...props }),
        h2: (props) => Heading({ as: 'h2', ...props }),
        h3: (props) => Heading({ as: 'h3', ...props }),
        h4: (props) => Heading({ as: 'h4', ...props }),
        h5: (props) => Heading({ as: 'h5', ...props }),
        h6: (props) => Heading({ as: 'h6', ...props }),
        a: A,
        ...shortcodes,
    }

    useEffect(() => {
        if (hash) {
            scroll.scrollMore(-50)
        }
    }, [])

    return (
        <div
            style={{ gridAutoColumns: '1fr minmax(auto, 650px) minmax(max-content, 1fr)' }}
            className="w-full relative lg:grid lg:grid-flow-col items-start -mb-20"
        >
            <article className="col-span-2 px-5 lg:px-8 border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark mt-10 lg:mt-0 lg:pt-10 lg:pb-20 ml-auto">
                <div className="lg:max-w-[650px] w-full">{children}</div>
            </article>
            <aside className="lg:sticky top-10 flex-shrink-0 w-full lg:w-[229px] justify-self-end px-5 lg:px-8 lg:box-content my-10 lg:my-0 lg:pt-10 pb-20 mr-auto overflow-y-auto lg:h-[calc(100vh-7.5rem)]">
                <div className="grid divide-y divide-gray-accent-light dark:divide-gray-accent-dark divide-dashed">
                    {sidebarComponents?.map(({ title, component }, index) => {
                        return (
                            component && (
                                <SidebarSection key={index} title={title}>
                                    {component}
                                </SidebarSection>
                            )
                        )
                    })}
                    {view === 'Article' && !breakpoints.md && tableOfContents && (
                        <div className="pt-12">
                            <h4 className="text-[13px] mb-2">On this page</h4>
                            <Scrollspy
                                offset={-50}
                                className="list-none m-0 p-0 flex flex-col space-y-[10px]"
                                items={tableOfContents?.map((navItem) => navItem.url)}
                                currentClassName="active-product"
                            >
                                {tableOfContents?.map((navItem, index) => (
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
