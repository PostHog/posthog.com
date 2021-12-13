import { MDXProvider } from '@mdx-js/react'
import { useLocation } from '@reach/router'
import { Blockquote } from 'components/BlockQuote'
import Breadcrumbs from 'components/Breadcrumbs'
import Chip from 'components/Chip'
import { DocsPageSurvey } from 'components/DocsPageSurvey'
import { Heading } from 'components/Heading'
import { Facebook, LinkedIn, Mail, Twitter } from 'components/Icons/Icons'
import { InlineCode } from 'components/InlineCode'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import { ZoomImage } from 'components/ZoomImage'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React, { useEffect, useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import Scrollspy from 'react-scrollspy'
import slugify from 'slugify'
import { CodeBlock } from '../components/CodeBlock'
import { shortcodes } from '../mdxGlobalComponents'
import InternalSidebarLink from './Handbook/InternalSidebarLink'
import MobileSidebar from './Handbook/MobileSidebar'

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

const SidebarSection = ({ title, children }) => {
    return (
        <div className="py-4">
            {title && <h3 className="text-[13px] opacity-40 font-semibold mb-3">{title}</h3>}
            {children}
        </div>
    )
}

const SocialLink = ({ children, url }) => {
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

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

export default function Tutorial({ data, pageContext: { pageViews, tableOfContents }, location }) {
    const { pageData } = data
    const { body, excerpt } = pageData
    const { title, featuredImage, description, contributors, categories, featuredVideo } = pageData?.frontmatter
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
    const { hash } = useLocation()
    const breakpoints = useBreakpoint()
    const [view, setView] = useState('Article')

    useEffect(() => {
        if (hash) {
            scroll.scrollMore(-50)
        }
    }, [])

    return (
        <Layout>
            <SEO
                title={title + ' - PostHog'}
                description={description || excerpt}
                article
                image={featuredImage?.publicURL}
            />
            <Breadcrumbs
                crumbs={[
                    { title: 'Tutorials', url: '/tutorials' },
                    { title: title, truncate: true },
                ]}
                darkModeToggle
                className="px-4 mt-4 sticky top-[-2px] z-10 bg-tan dark:bg-primary"
            />
            <div
                style={{ gridAutoColumns: '1fr minmax(auto, 650px) minmax(max-content, 1fr)' }}
                className="w-full relative lg:grid lg:grid-flow-col items-start -mb-20"
            >
                <article className="col-span-2 px-5 lg:px-8 border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark mt-10 lg:mt-0 lg:pt-10 lg:pb-20 ml-auto">
                    <div className="lg:max-w-[650px] w-full">
                        <h1 className="text-2xl mb-6">{title}</h1>
                        <GatsbyImage className="mb-6" image={getImage(featuredImage)} />
                        {featuredVideo && (
                            <div className="mb-6 flex space-x-2">
                                <ViewButton view={view} title="Article" setView={setView} />
                                <ViewButton view={view} title="Video" setView={setView} />
                            </div>
                        )}
                        {view === 'Article' && breakpoints.md && <MobileSidebar tableOfContents={tableOfContents} />}
                        {view === 'Article' ? (
                            <div className="article-content">
                                <MDXProvider components={components}>
                                    <MDXRenderer>{body}</MDXRenderer>
                                </MDXProvider>
                            </div>
                        ) : (
                            <Iframe src={featuredVideo} />
                        )}
                        <div className="bg-primary dark:bg-gray-accent-dark rounded-lg px-6 py-8 mt-8">
                            <DocsPageSurvey />
                        </div>
                    </div>
                </article>
                <aside className="lg:sticky top-10 flex-shrink-0 w-full lg:w-[229px] justify-self-end px-5 lg:px-8 lg:box-content my-10 lg:my-0 lg:pt-10 pb-20 mr-auto overflow-y-auto lg:h-[calc(100vh-7.5rem)]">
                    <div className="grid divide-y divide-gray-accent-light dark:divide-gray-accent-dark divide-dashed">
                        <SidebarSection title={`Contributor${contributors.length > 1 ? 's' : ''}`}>
                            <ul className="list-none m-0 p-0 flex flex-col space-y-2">
                                {contributors.map(({ image, id, name }) => {
                                    return (
                                        <li key={id}>
                                            <Link
                                                state={{ openFilter: 'Contributor' }}
                                                className="flex space-x-2 items-center"
                                                to={`/tutorials/contributors/${slugify(name, { lower: true })}`}
                                            >
                                                <div className="w-[32px] h-[32px] relative rounded-full overflow-hidden">
                                                    <img
                                                        className="absolute w-full h-full inset-0 object-cover"
                                                        src={image}
                                                    />
                                                </div>
                                                <span className="author text-[14px] font-semibold">{name}</span>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </SidebarSection>
                        <SidebarSection title="Share">
                            <div className="opacity-50 flex space-x-3 items-center">
                                <SocialLink url={`https://www.facebook.com/sharer/sharer.php?u=${location.href}`}>
                                    <Facebook />
                                </SocialLink>
                                <SocialLink url={`https://twitter.com/intent/tweet?url=${location.href}`}>
                                    <Twitter className="w-[32px] h-[32px]" />
                                </SocialLink>
                                <SocialLink url={`https://www.linkedin.com/shareArticle?url=${location.href}`}>
                                    <LinkedIn className="w-[32px] h-[32px]" />
                                </SocialLink>
                                <a
                                    className="text-primary hover:text-primary dark:text-white dark:hover:text-white"
                                    href={`mailto:?subject=${title}&body=${location.href}`}
                                >
                                    <Mail />
                                </a>
                            </div>
                        </SidebarSection>
                        {pageViews && (
                            <SidebarSection>
                                <p className="m-0 opacity-50 font-semibold">{pageViews} views</p>
                            </SidebarSection>
                        )}
                        {categories?.length > 0 && (
                            <SidebarSection title="Filed under...">
                                <ul className="list-none p-0 flex items-start flex-wrap -m-1">
                                    {categories.map((category) => {
                                        return (
                                            <li className="m-1" key={category}>
                                                <Chip
                                                    state={{ openFilter: 'Category' }}
                                                    className="text-red hover:text-red"
                                                    href={`/tutorials/categories/${slugify(category, { lower: true })}`}
                                                    size="xs"
                                                >
                                                    {category}
                                                </Chip>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </SidebarSection>
                        )}
                        {view === 'Article' && !breakpoints.md && (
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
        </Layout>
    )
}

export const query = graphql`
    query TutorialLayout($id: String!) {
        pageData: mdx(id: { eq: $id }) {
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            frontmatter {
                title
                description
                categories: topics
                contributors: authorData {
                    id
                    image
                    name
                }
                featuredVideo
                featuredImage {
                    publicURL
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
    }
`
