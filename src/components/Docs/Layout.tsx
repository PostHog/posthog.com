import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { animateScroll as scroll } from 'react-scroll'
import { useLocation } from '@reach/router'

import { shortcodes } from '../../mdxGlobalComponents'
import MainSidebar from './MainSidebar'
import MobileSidebar from './MobileSidebar'
import SectionLinks, { SectionLinksProps } from 'components/SectionLinks'
import StickySidebar from './StickySidebar'
import { Blockquote } from 'components/BlockQuote'
import { MdxCodeBlock } from 'components/CodeBlock'
import CommunityQuestions from 'components/CommunityQuestions'
import { Heading } from 'components/Heading'
import { push as Menu } from 'react-burger-menu'
import { InlineCode } from 'components/InlineCode'
import Team from 'components/People'
import TestimonialsTable from 'components/TestimonialsTable'
import { ZoomImage } from 'components/ZoomImage'
import Layout from 'components/Layout'
import Navigation from './Navigation'
import Footer from './Footer'

const Iframe = (props: React.IframeHTMLAttributes<HTMLIFrameElement>) => {
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

const SectionLinksBottom = ({ previous, next }: SectionLinksProps) => {
    return (
        <>
            <hr className="w-[calc(100vw-2rem)] m-0 bg-transparent" />
            <SectionLinks
                className="mb-16 2xl:max-w-[800px] xl:max-w-[650px] max-w-full mx-auto mt-9"
                previous={previous}
                next={next}
            />
        </>
    )
}

const SectionLinksTop = ({ previous, next }: SectionLinksProps) => {
    return <SectionLinks className="mt-9" previous={previous} next={next} />
}

type DocsLayoutProps = {
    title: string
    titleElement?: React.ReactNode
    filePath: string
    lastUpdated: string
    menu: any
    slug: string
    body: string
    breadcrumb: any
    breadcrumbBase: any
    tableOfContents: any
    next: {
        name: string
        url: string
    }
    previous: {
        name: string
        url: string
    }
    hideLastUpdated: boolean
    hideAnchor: boolean
    contributors: any[]
    children: React.ReactNode
}

export default function DocsLayout({
    title,
    titleElement,
    filePath,
    lastUpdated,
    menu,
    slug,
    hideAnchor,
    breadcrumb,
    breadcrumbBase,
    tableOfContents,
    body,
    next,
    previous,
    hideLastUpdated,
    contributors,
    children,
}: DocsLayoutProps) {
    const components = {
        Team,
        iframe: Iframe,
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: MdxCodeBlock,
        h1: (props) => Heading({ as: 'h1', ...props }),
        h2: (props) => Heading({ as: 'h2', ...props }),
        h3: (props) => Heading({ as: 'h3', ...props }),
        h4: (props) => Heading({ as: 'h4', ...props }),
        h5: (props) => Heading({ as: 'h5', ...props }),
        h6: (props) => Heading({ as: 'h6', ...props }),
        img: ZoomImage,
        TestimonialsTable,
        ...shortcodes,
    }

    const showToc = !hideAnchor && tableOfContents?.length > 0
    const mainEl = React.useRef(null)

    const [menuOpen, setMenuOpen] = React.useState<boolean>(false)

    return (
        <Layout>
            <div className="handbook-container px-4">
                <div id="handbook-menu-wrapper">
                    <Menu
                        width="calc(100vw - 80px)"
                        onClose={() => setMenuOpen(false)}
                        customBurgerIcon={false}
                        customCrossIcon={false}
                        styles={{
                            bmOverlay: {
                                background: 'transparent',
                            },
                        }}
                        pageWrapId="handbook-content-menu-wrapper"
                        outerContainerId="handbook-menu-wrapper"
                        overlayClassName="backdrop-blur"
                        isOpen={menuOpen}
                    >
                        <MainSidebar height={'auto'} menu={menu} slug={slug} className="p-5 pb-32 md:hidden" />
                    </Menu>

                    <Navigation
                        title={title}
                        filePath={filePath}
                        next={next}
                        previous={previous}
                        breadcrumb={breadcrumb}
                        breadcrumbBase={breadcrumbBase}
                        menuOpen={menuOpen}
                        handleMobileMenuClick={() => setMenuOpen((open) => !open)}
                    />
                    <div id="handbook-content-menu-wrapper">
                        <div className="relative">
                            <SectionLinksTop next={next} previous={previous} />
                            <div className="dark:text-white flex max-w-screen-3xl mx-auto items-start relative z-10 mt-8">
                                <MainSidebar
                                    sticky
                                    top={90}
                                    height={undefined}
                                    mainEl={mainEl}
                                    menu={menu}
                                    slug={slug}
                                    className="hidden md:block w-full transition-opacity md:opacity-60 hover:opacity-100 mb-14 flex-1"
                                />
                                <article
                                    ref={mainEl}
                                    style={!showToc ? { maxWidth: '100%', paddingRight: 0 } : {}}
                                    className="w-full 2xl:max-w-[800px] xl:max-w-[650px] max-w-full pb-14 relative md:pl-16 xl:px-16 2xl:px-32 box-content overflow-auto"
                                >
                                    <section className="mb-8 relative">
                                        <div className="dark:text-white text-3xl sm:text-5xl mt-0">
                                            {titleElement || <h1 className="mb-2">{title}</h1>}
                                        </div>
                                        {!hideLastUpdated && (
                                            <p className="mt-1 mb-0 opacity-50">
                                                Last updated: <time>{lastUpdated}</time>
                                            </p>
                                        )}
                                    </section>

                                    {showToc && <MobileSidebar tableOfContents={tableOfContents} />}

                                    <section className="article-content handbook-docs-content">
                                        {children}
                                        <MDXProvider components={components}>
                                            <MDXRenderer>{body}</MDXRenderer>
                                        </MDXProvider>
                                    </section>
                                    <CommunityQuestions />
                                </article>

                                {showToc && <StickySidebar top={90} tableOfContents={tableOfContents} />}
                            </div>
                            {next && <SectionLinksBottom next={next} previous={previous} />}
                        </div>
                    </div>
                </div>
                <Footer title={title} filePath={filePath} contributors={contributors} />
            </div>
        </Layout>
    )
}
