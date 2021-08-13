import React from 'react'
import SearchBar from './SearchBar'
import MainSidebar from './MainSidebar'
import InternalSidebar from './InternalSidebar'
import Breadcrumbs from './Breadcrumbs'
import NextArticle from './NextArticle'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import planets from '../../images/planets.svg'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'

const A = (props) => <a {...props} className="text-yellow hover:text-yellow font-bold" />
const Iframe = (props) => (
    <div style={{ position: 'relative', height: 0, paddingBottom: '56.25%' }}>
        <iframe {...props} className="absolute top-0 left-0 w-full h-full" />
    </div>
)

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
}) {
    const components = {
        a: A,
        iframe: Iframe,
    }
    const breakpoints = useBreakpoint()
    const showToc = !hideAnchor && tableOfContents?.length
    return (
        <div className="relative px-4">
            <div className="dark:text-white pt-8 md:pt-20 flex max-w-screen-2xl mx-auto items-start relative z-10">
                <MainSidebar
                    menu={menu}
                    slug={slug}
                    className="hidden md:block flex-shrink-0 xl:flex-1 sticky top-4 mb-14 w-full max-w-[224px] transition-opacity md:opacity-40 hover:opacity-100"
                />
                <main className="relative md:pl-16 xl:px-16 2xl:px-32">
                    <article className="2xl:max-w-[800px] xl:max-w-[650px] max-w-full pb-14">
                        <section className="mb-8 xl:mb-14 relative">
                            {breadcrumb && <Breadcrumbs crumbs={breadcrumb} base={breadcrumbBase} />}
                            <h1 className="dark:text-white text-5xl mt-0 mb-2">{title}</h1>
                            <p className="dark:text-light-purple mt-1 mb-0">
                                Last updated: <time>{lastUpdated}</time>
                            </p>
                        </section>
                        {breakpoints.lg && showToc && (
                            <InternalSidebar
                                className="bg-[#e4e0e9] dark:bg-white p-4 rounded dark:bg-opacity-10 mb-10"
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
                                style={{ height: 'calc(100% - 35vh)' }}
                                className="w-[1px] absolute bottom-0  right-0 bg-[#765494] hidden xl:flex justify-center"
                            />
                        )}
                        {next && <NextArticle next={next} hideAnchor={hideAnchor} breakpoints={breakpoints} />}
                    </article>
                </main>
                {!breakpoints.lg && showToc && (
                    <InternalSidebar
                        className="flex-shrink-0 xl:flex-1 sticky top-4 mt-[35vh] mb-14"
                        tableOfContents={tableOfContents}
                    />
                )}
            </div>
            <img className="absolute top-0 right-0 w-[35vw] hidden lg:block" src={planets} />
        </div>
    )
}
