import React, { useRef } from 'react'
import MainSidebar from './MainSidebar'
import InternalSidebar from './InternalSidebar'
import SectionLinks from './SectionLinks'
import SectionLink from './SectionLink'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { shortcodes } from '../../mdxGlobalComponents'

const A = (props) => <a {...props} className="text-yellow hover:text-yellow font-bold" />
const Iframe = (props) => (
    <div style={{ position: 'relative', height: 0, paddingBottom: '56.25%' }}>
        <iframe {...props} className="absolute top-0 left-0 w-full h-full" />
    </div>
)
const InlineCode = (props) => (
    <code {...props} className="dark:bg-[#4c3e62] dark:text-white bg-[#e8e8e8] text-inherit p-1 rounded" />
)
const Blockquote = (props) => <blockquote {...props} className="p-6 rounded bg-[#f0f0f0] dark:bg-[#371A51]" />

export default function Main({
    handleMobileMenuClick,
    filePath,
    title,
    lastUpdated,
    menu,
    slug,
    breadcrumb,
    breadcrumbBase,
    hideAnchor,
    tableOfContents,
    body,
    next,
    previous,
}) {
    const components = {
        a: A,
        iframe: Iframe,
        inlineCode: InlineCode,
        blockquote: Blockquote,
        ...shortcodes,
    }
    const breakpoints = useBreakpoint()
    const showToc = !hideAnchor && tableOfContents?.length
    const mainEl = useRef()
    return (
        <div className="relative">
            <div className="dark:text-white flex max-w-screen-3xl mx-auto items-start relative z-10 mt-8">
                <div className="sticky top-20 flex-1">
                    <SectionLink link={previous} previous className="hidden md:flex mb-8" />
                    <MainSidebar
                        mainEl={mainEl}
                        menu={menu}
                        slug={slug}
                        className="hidden md:block w-full transition-opacity md:opacity-60 hover:opacity-100"
                    />
                </div>
                <main ref={mainEl} className={`relative md:pl-16 xl:px-16 2xl:px-32 ${showToc ? '' : 'flex-grow'}`}>
                    <article className="2xl:max-w-[800px] xl:max-w-[650px] max-w-full pb-14">
                        <section className="mb-8 xl:mb-14 relative">
                            <h1 className="dark:text-white text-5xl mt-0 mb-2">{title}</h1>
                            <p className="mt-1 mb-0 opacity-50">
                                Last updated: <time>{lastUpdated}</time>
                            </p>
                        </section>
                        {breakpoints.lg && showToc && (
                            <InternalSidebar
                                className="py-4 mb-10 border-gray-accent-light dark:border-gray-accent-dark border-dashed border-t border-b"
                                tableOfContents={tableOfContents}
                            />
                        )}
                        <section className="article-content">
                            <MDXProvider components={components}>
                                <MDXRenderer>{body}</MDXRenderer>
                            </MDXProvider>
                        </section>
                        {showToc && (
                            <div
                                style={{ height: 'calc(100% - 22vh)' }}
                                className="border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark absolute bottom-0  right-0 hidden xl:flex justify-center"
                            />
                        )}
                        {next && (
                            <SectionLinks
                                previous={previous}
                                next={next}
                                hideAnchor={!showToc}
                                breakpoints={breakpoints}
                            />
                        )}
                    </article>
                </main>

                <div className="sticky top-20 flex-1">
                    <SectionLink className="hidden md:flex justify-end absolute top-0 right-0" link={next} />
                    {!breakpoints.lg && showToc && (
                        <InternalSidebar
                            className="mt-[20vh] mb-14 hidden xl:block"
                            tableOfContents={tableOfContents}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
