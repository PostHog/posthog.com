import { MDXProvider } from '@mdx-js/react'
import { useLocation } from '@reach/router'
import { Blockquote } from 'components/BlockQuote'
import CommunityQuestions from 'components/CommunityQuestions'
import { Heading } from 'components/Heading'
import { InlineCode } from 'components/InlineCode'
import Layout from 'components/Layout'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import Contributors from 'components/PostLayout/Contributors'
import ShareLinks from 'components/PostLayout/ShareLinks'
import SidebarSection from 'components/PostLayout/SidebarSection'
import Topics from 'components/PostLayout/Topics'
import { SEO } from 'components/seo'
import { ZoomImage } from 'components/ZoomImage'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'
import React, { useEffect, useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import { shortcodes } from '../../mdxGlobalComponents'
import slugify from 'slugify'
import { MdxCodeBlock } from 'components/CodeBlock'
import MobileSidebar from 'components/Docs/MobileSidebar'
import { Intro } from '../../templates/BlogPost'
import TutorialsSlider from 'components/TutorialsSlider'
import { communityMenu, docsMenu } from '../../navs'
import { useLayoutData } from 'components/Layout/hooks'

export const ViewButton = ({ title, view, setView }) => {
    return (
        <button
            onClick={() => setView(title)}
            className={`py-2 px-4 text-sm transition-colors border-b-2 font-medium relative after:absolute after:top-[100%] after:left-0 after:right-0 after:rounded-full after:h-[2px] ${
                view === title
                    ? 'font-bold after:bg-red'
                    : 'font-semibold border-transparent opacity-50 hover:opacity-75 hover:after:bg-gray-accent'
            }`}
        >
            {title}
        </button>
    )
}

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

export default function Tutorial({ data, pageContext: { tableOfContents, menu }, location }) {
    const { pageData } = data
    const { body, excerpt, fields } = pageData
    const { title, featuredImage, description, contributors, categories, featuredVideo, date } = pageData?.frontmatter
    const filePath = pageData?.parent?.relativePath
    const components = {
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: MdxCodeBlock,
        MultiLanguage: MdxCodeBlock,
        img: ZoomImage,
        h1: (props) => Heading({ as: 'h1', ...props }),
        h2: (props) => Heading({ as: 'h2', ...props }),
        h3: (props) => Heading({ as: 'h3', ...props }),
        h4: (props) => Heading({ as: 'h4', ...props }),
        h5: (props) => Heading({ as: 'h5', ...props }),
        h6: (props) => Heading({ as: 'h6', ...props }),
        a: A,
        TutorialsSlider,
        ...shortcodes,
    }
    const breakpoints = useBreakpoint()
    const [view, setView] = useState('Article')
    const { fullWidthContent } = useLayoutData()

    return (
        <article className="@container">
            <SEO
                title={title + ' - PostHog'}
                description={description || excerpt}
                article
                image={`/og-images/${fields.slug.replace(/\//g, '')}.jpeg`}
            />
            <div className="flex flex-col-reverse items-start @3xl:flex-row gap-8 2xl:gap-12">
                <div className="flex-1 transition-all pt-8 w-full">
                    <div className={`mx-auto transition-all ${fullWidthContent ? 'max-w-full' : 'max-w-2xl px-0'}`}>
                        <Intro
                            contributors={contributors}
                            featuredImage={featuredImage}
                            title={title}
                            featuredImageType="full"
                            titlePosition="top"
                            date={date}
                        />
                        {featuredVideo && (
                            <div className="mb-6 flex space-x-2">
                                <ViewButton view={view} title="Article" setView={setView} />
                                <ViewButton view={view} title="Video" setView={setView} />
                            </div>
                        )}
                        {view === 'Article' ? (
                            <div className="article-content">
                                <MDXProvider components={components}>
                                    <MDXRenderer>{body}</MDXRenderer>
                                </MDXProvider>
                            </div>
                        ) : (
                            <iframe src={featuredVideo} />
                        )}
                    </div>
                </div>
                {view === 'Article' && (
                    <aside className="shrink-0 basis-72 @3xl:reasonable:sticky @3xl:reasonable:overflow-auto max-h-64 overflow-auto @3xl:max-h-[calc(100vh_-_108px)] @3xl:top-[108px] w-full block border-x border-border dark:border-dark pt-4">
                        <MobileSidebar tableOfContents={tableOfContents} mobile={false} />
                    </aside>
                )}
            </div>
        </article>
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
                date(formatString: "MMM DD, YYYY")
                description
                categories: tags
                contributors: authorData {
                    id
                    image {
                        childImageSharp {
                            gatsbyImageData(width: 38, height: 38)
                        }
                    }
                    name
                }
                featuredVideo
                featuredImage {
                    publicURL
                    childImageSharp {
                        gatsbyImageData(placeholder: NONE)
                    }
                }
            }
            parent {
                ... on File {
                    relativePath
                }
            }
        }
    }
`
