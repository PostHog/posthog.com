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

const TutorialSidebar = ({ contributors, location, title, categories }) => {
    return (
        <>
            {contributors?.length > 0 && (
                <SidebarSection>
                    <Contributors
                        contributors={contributors.map((contributor) => ({
                            ...contributor,
                        }))}
                    />
                </SidebarSection>
            )}
            <SidebarSection title="Share">
                <ShareLinks title={title} href={location.href} />
            </SidebarSection>
            {categories?.length > 0 && (
                <SidebarSection title="Filed under...">
                    <Topics
                        topics={categories?.map((category) => ({
                            name: category,
                            url: `/tutorials/categories/${slugify(category, { lower: true })}`,
                        }))}
                    />
                </SidebarSection>
            )}
        </>
    )
}

export default function Tutorial({ data, pageContext: { tableOfContents, menu }, location }) {
    const { pageData } = data
    const { body, excerpt, fields } = pageData
    const { title, featuredImage, description, contributors, categories, featuredVideo, date } = pageData?.frontmatter
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
                image={`/og-images/${fields.slug.replace(/\//g, '')}.jpeg`}
            />
            <PostLayout
                questions={<CommunityQuestions />}
                body={body}
                featuredImage={featuredImage}
                featuredVideo={featuredVideo}
                tableOfContents={tableOfContents}
                title={title}
                menu={menu}
                sidebar={
                    <TutorialSidebar
                        contributors={contributors}
                        location={location}
                        title={title}
                        categories={categories}
                    />
                }
            >
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
                {view === 'Article' && breakpoints.md && <MobileSidebar tableOfContents={tableOfContents} />}
                {view === 'Article' ? (
                    <div className="article-content">
                        <MDXProvider components={components}>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                ) : (
                    <iframe src={featuredVideo} />
                )}
            </PostLayout>
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
        }
    }
`
