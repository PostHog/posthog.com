import { MDXProvider } from '@mdx-js/react'
import { Blockquote } from 'components/BlockQuote'
import Breadcrumbs, { Crumb } from 'components/Breadcrumbs'
import { Calendar, Edit, Issue } from 'components/Icons/Icons'
import { InlineCode } from 'components/InlineCode'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { H1, H2, H3, H4, H5, H6 } from 'components/MdxAnchorHeaders'
import PostLayout from 'components/PostLayout'
import Text from 'components/PostLayout/Text'
import Topics from 'components/PostLayout/Topics'
import ShareLinks from 'components/PostLayout/ShareLinks'
import SidebarSection from 'components/PostLayout/SidebarSection'
import PageViews from 'components/PostLayout/PageViews'
import Contributors, { Contributor } from 'components/PostLayout/Contributors'
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
    return (
        <h1 className={`text-3xl md:text-4xl lg:text-4xl mb-1 mt-6 lg:mt-1 lg:text-white text-primary ${className}`}>
            {children}
        </h1>
    )
}

export const Intro = ({
    featuredImage,
    featuredVideo,
    title,
    featuredImageType,
    contributors,
    titlePosition = 'bottom',
    date,
    tags,
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
                        <>
                            {tags?.length > 0 && (
                                <ul className="m-0 p-0 flex space-x-2 absolute top-4 right-4 list-none">
                                    {tags.map((tag) => {
                                        return (
                                            <li key={tag}>
                                                <Link
                                                    className="bg-white/80 rounded-full px-2 py-1"
                                                    to={`/blog/tags/${slugify(tag, { lower: true })}`}
                                                >
                                                    {tag}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )}
                            <div
                                className={`lg:absolute flex flex-col lg:px-8 lg:py-4 ${
                                    titlePosition === 'bottom' ? 'bottom-0' : 'top-0'
                                }`}
                            >
                                <p className="m-0 opacity-70 order-last lg:order-first">{date}</p>
                                <Title>{title}</Title>
                            </div>
                        </>
                    )}
                </div>
            )}
            {(featuredVideo || featuredImageType !== 'full') && <Title className="lg:mt-7 mt-4">{title}</Title>}
            {contributors && (
                <div className="lg:hidden my-3">
                    {contributors.map((contributor) => (
                        <Contributor image={contributor.image} name={contributor.name} key={contributor.name} text />
                    ))}
                </div>
            )}
        </div>
    )
}

const BlogPostSidebar = ({ contributors, date, filePath, title, tags, location, pageViews }) => {
    return (
        <>
            {contributors && (
                <SidebarSection>
                    <Contributors contributors={contributors} />
                </SidebarSection>
            )}
            {pageViews?.length > 0 && (
                <SidebarSection>
                    <PageViews pageViews={pageViews.toLocaleString()} />
                </SidebarSection>
            )}
            <SidebarSection>
                <NewsletterForm sidebar />
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
                    date={date}
                    tags={tags}
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
