import React, { useRef } from 'react'
import MainSidebar from './MainSidebar'
import InternalSidebar from './InternalSidebar'
import SectionLinks from './SectionLinks'
import SectionLink from './SectionLink'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { shortcodes } from '../../mdxGlobalComponents'
import { CodeBlock } from 'components/CodeBlock'

const A = (props) => <a {...props} className="text-yellow hover:text-yellow font-bold" />
const Iframe = (props) => (
    <div style={{ position: 'relative', height: 0, paddingBottom: '56.25%' }}>
        <iframe {...props} className="absolute top-0 left-0 w-full h-full" />
    </div>
)
const InlineCode = (props) => (
    <code
        {...props}
        className="dark:bg-gray-accent-dark dark:text-white bg-gray-accent-light text-inherit p-1 rounded"
    />
)
const Blockquote = (props) => (
    <blockquote {...props} className="p-6 rounded bg-gray-accent-light dark:bg-gray-accent-dark" />
)

const SectionLinksBottom = ({ previous, next }) => {
    return (
        <>
            <hr className="w-[calc(100vw-2rem)] m-0 bg-transparent border-t border-r-0 border-l-0 border-b-0 border-dashed border-gray-accent-light dark:border-gray-accent-dark" />
            <SectionLinks
                className="mb-16 2xl:max-w-[800px] xl:max-w-[650px] max-w-full mx-auto mt-9"
                previous={previous}
                next={next}
            />
        </>
    )
}

const SectionLinksTop = ({ previous, next }) => {
    return <SectionLinks className="mt-9" previous={previous} next={next} />
}

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
    hideLastUpdated,
}) {
    const components = {
        iframe: Iframe,
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: CodeBlock,
        ...shortcodes,
    }
    const breakpoints = useBreakpoint()
    const showToc = !hideAnchor && tableOfContents?.length
    const mainEl = useRef()
    return (
        <div className="relative">
            <SectionLinksTop next={next} previous={previous} />
            <div className="dark:text-white flex max-w-screen-3xl mx-auto items-start relative z-10 mt-8">
                <div className="sticky top-20 flex-1">
                    <MainSidebar
                        mainEl={mainEl}
                        menu={menu}
                        slug={slug}
                        className="hidden md:block w-full transition-opacity md:opacity-60 hover:opacity-100 mb-14"
                    />
                </div>
                <article
                    ref={mainEl}
                    style={!showToc ? { maxWidth: '100%', paddingRight: 0 } : {}}
                    className="2xl:max-w-[800px] xl:max-w-[650px] max-w-full pb-14 relative md:pl-16 xl:px-16 2xl:px-32 box-content overflow-auto"
                >
                    <section className="mb-8 xl:mb-14 relative">
                        <h1 className="dark:text-white text-3xl sm:text-5xl mt-0 mb-2">{title}</h1>
                        {!hideLastUpdated && (
                            <p className="mt-1 mb-0 opacity-50">
                                Last updated: <time>{lastUpdated}</time>
                            </p>
                        )}
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
                </article>

                <div className="sticky top-20 flex-1">
                    {!breakpoints.lg && showToc && (
                        <InternalSidebar
                            className="mt-[20vh] mb-14 hidden xl:block"
                            tableOfContents={tableOfContents}
                        />
                    )}
                </div>
            </div>
            {next && <SectionLinksBottom next={next} previous={previous} />}
        </div>
    )
}
