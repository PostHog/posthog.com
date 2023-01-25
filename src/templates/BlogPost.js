import { MDXProvider } from '@mdx-js/react'
import { Blockquote } from 'components/BlockQuote'
import Breadcrumbs, { Crumb } from 'components/Breadcrumbs'
import { Calendar, Edit, Issue } from 'components/Icons/Icons'
import { InlineCode } from 'components/InlineCode'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { H1, H2, H3, H4, H5, H6 } from 'components/MdxAnchorHeaders'
import PostLayout, { Contributors, PageViews, ShareLinks, SidebarSection, Text, Topics } from 'components/PostLayout'
import { SEO } from 'components/seo'
import { ZoomImage } from 'components/ZoomImage'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { MdxCodeBlock } from '../components/CodeBlock'
import { shortcodes } from '../mdxGlobalComponents'
import { NewsletterForm } from 'components/NewsletterForm'
import blogMenu from 'components/Blog/blogMenu'
import blog from 'sidebars/blog.json'
import slugify from 'slugify'

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

const Title = ({ children, className = '' }) => {
    return <h1 className={`text-3xl md:text-4xl lg:text-4xl mt-3 mb-0 lg:my-5 ${className}`}>{children}</h1>
}

export const Intro = ({
    featuredImage,
    featuredVideo,
    title,
    featuredImageType,
    contributors,
    titlePosition = 'bottom',
}) => {
    return (
        <div className="lg:mb-7 mb-4 overflow-hidden">
            {featuredVideo && <iframe src={featuredVideo} />}
            {!featuredVideo && featuredImage && (
                <div className="relative">
                    <GatsbyImage
                        className={`rounded-md z-0 relative ${
                            featuredImageType === 'full'
                                ? `before:h-3/4 before:left-0 before:right-0 ${
                                      titlePosition === 'bottom' ? 'before:bottom-0' : 'before:top-0'
                                  } before:z-[1] before:absolute ${
                                      titlePosition === 'bottom' ? 'before:bg-gradient-to-t' : 'before:bg-gradient-to-b'
                                  } before:from-black/75 [text-shadow:0_2px_10px_rgba(0,0,0,0.4)] lg:before:block before:hidden`
                                : ''
                        }`}
                        image={getImage(featuredImage)}
                    />
                    {featuredImageType === 'full' && (
                        <Title
                            className={`lg:absolute ${
                                titlePosition === 'bottom' ? 'bottom-0' : 'top-0'
                            } lg:text-white text-primary lg:px-8`}
                        >
                            {title}
                        </Title>
                    )}
                </div>
            )}
            {(featuredVideo || featuredImageType !== 'full') && <Title className="lg:mt-7 mt-4">{title}</Title>}
            {contributors && (
                <Contributors
                    contributors={contributors}
                    className="flex lg:hidden flex-row space-y-0 space-x-4 my-3"
                />
            )}
        </div>
    )
}

const BlogPostSidebar = ({ contributors, date, filePath, title, tags, location, pageViews }) => {
    return (
        <>
            {contributors && (
                <SidebarSection className="lg:block hidden" title={`Author${contributors?.length > 1 ? 's' : ''}`}>
                    <Contributors className="flex flex-col space-y-2" contributors={contributors} />
                </SidebarSection>
            )}
            <SidebarSection title="Share">
                <ShareLinks title={title} href={location.href} />
            </SidebarSection>
            {pageViews?.length > 0 && (
                <SidebarSection>
                    <PageViews pageViews={pageViews.toLocaleString()} />
                </SidebarSection>
            )}
            {tags && (
                <SidebarSection title="Tag(s)">
                    <Topics
                        topics={tags.map((tag) => ({ name: tag, url: `/blog/tags/${slugify(tag, { lower: true })}` }))}
                    />
                </SidebarSection>
            )}
            <SidebarSection>
                <Text>
                    <Calendar className="h-[20px] w-[20px]" /> <time>{date}</time>
                </Text>
            </SidebarSection>
            <SidebarSection>
                <div className="bg-gray-accent-light dark:bg-gray-accent-dark rounded max-w-xs">
                    <NewsletterForm sidebar />
                </div>
            </SidebarSection>
        </>
    )
}

export default function BlogPost({ data, pageContext, location }) {
    const { postData } = data
    const { body, excerpt, fields } = postData
    const { date, title, featuredImage, featuredVideo, featuredImageType, contributors, description, tags, category } =
        postData?.frontmatter
    const lastUpdated = postData?.parent?.fields?.gitLogLatestDate
    const filePath = postData?.parent?.relativePath
    const components = {
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        pre: MdxCodeBlock,
        inlineCode: InlineCode,
        blockquote: Blockquote,
        img: ZoomImage,
        a: A,
        ...shortcodes,
    }
    const { tableOfContents } = pageContext

    return (
        <Layout>
            <SEO
                title={title + ' - PostHog'}
                description={description || excerpt}
                article
                image={
                    featuredImageType === 'full'
                        ? `/og-images/${fields.slug.replace(/\//g, '')}.jpeg`
                        : featuredImage?.publicURL
                }
            />
            <PostLayout
                title={title}
                contentWidth={790}
                filePath={filePath}
                tableOfContents={tableOfContents}
                breadcrumb={[
                    { name: 'Blog', url: '/blog' },
                    ...(category
                        ? [{ name: category, url: `/blog/categories/${slugify(category, { lower: true })}` }]
                        : [{}]),
                ]}
                menu={blog}
                hideSurvey
                sidebar={
                    <BlogPostSidebar
                        tags={tags}
                        contributors={contributors}
                        date={date}
                        filePath={filePath}
                        title={title}
                        location={location}
                        pageViews={fields?.pageViews}
                    />
                }
            >
                <Intro
                    title={title}
                    featuredImage={featuredImage}
                    featuredVideo={featuredVideo}
                    featuredImageType={featuredImageType}
                    contributors={contributors}
                />
                <div className="article-content">
                    <MDXProvider components={components}>
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                </div>
            </PostLayout>
        </Layout>
    )
}

export const query = graphql`
    query BlogPostLayout($id: String!) {
        postData: mdx(id: { eq: $id }) {
            id
            body
            excerpt(pruneLength: 150)
            fields {
                slug
                pageViews
            }
            frontmatter {
                date(formatString: "MMM DD, YYYY")
                title
                sidebar
                showTitle
                tags
                category
                hideAnchor
                description
                featuredImageType
                featuredVideo
                featuredImage {
                    publicURL
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                contributors: authorData {
                    id
                    image {
                        childImageSharp {
                            gatsbyImageData(width: 38, height: 38)
                        }
                    }
                    name
                }
            }
            parent {
                ... on File {
                    relativePath
                    fields {
                        gitLogLatestDate(formatString: "MMM DD, YYYY")
                    }
                }
            }
        }
    }
`
