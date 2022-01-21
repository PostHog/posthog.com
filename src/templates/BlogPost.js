import { MDXProvider } from '@mdx-js/react'
import { Blockquote } from 'components/BlockQuote'
import Breadcrumbs, { Crumb } from 'components/Breadcrumbs'
import { Calendar, Edit, Issue } from 'components/Icons/Icons'
import { InlineCode } from 'components/InlineCode'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { H1, H2, H3, H4, H5, H6 } from 'components/MdxAnchorHeaders'
import PostLayout, { Contributors, ShareLinks, SidebarSection, Text, Topics } from 'components/PostLayout'
import { SEO } from 'components/seo'
import { ZoomImage } from 'components/ZoomImage'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { CodeBlock } from '../components/CodeBlock'
import { shortcodes } from '../mdxGlobalComponents'

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

const Title = ({ children, className = '' }) => {
    return <h1 className={`lg:px-[50px] text-2xl lg:text-3xl mt-3 mb-0 lg:mb-5 lg:mt-0 ${className}`}>{children}</h1>
}

const Intro = ({ featuredImage, title, featuredImageType, contributors }) => {
    return (
        <div className="lg:mb-7 mb-4 overflow-hidden">
            {featuredImage && (
                <div className="relative">
                    <GatsbyImage
                        className={`rounded-lg z-0 relative ${
                            featuredImageType === 'full'
                                ? 'before:h-1/2 before:left-0 before:right-0 before:bottom-0 before:z-[1] before:absolute before:bg-gradient-to-t before:from-black/75'
                                : ''
                        }`}
                        image={getImage(featuredImage)}
                    />
                    {featuredImageType === 'full' && (
                        <Title className="lg:absolute bottom-0 lg:text-white text-primary">{title}</Title>
                    )}
                </div>
            )}
            {featuredImageType !== 'full' && <Title className="lg:mt-7 mt-4">{title}</Title>}
            {contributors && (
                <Contributors
                    contributors={contributors}
                    className="flex lg:hidden flex-row space-y-0 space-x-4 my-3 lg:px-[50px]"
                />
            )}
        </div>
    )
}

const BlogPostSidebar = ({ contributors, date, filePath, title, categories, location }) => {
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
            {categories?.length > 0 && (
                <SidebarSection title="Topic(s)">
                    <Topics topics={categories} />
                </SidebarSection>
            )}
            <SidebarSection>
                <Text>
                    <Calendar className="h-[20px] w-[20px]" /> <time>{date}</time>
                </Text>
            </SidebarSection>
            <SidebarSection>
                <Link
                    href={`https://github.com/PostHog/posthog.com/tree/master/contents/${filePath}`}
                    className="text-primary hover:text-primary dark:text-white dark:hover:text-white"
                >
                    <Text>
                        <Edit className="h-[20px] w-[20px]" /> <span>Edit post</span>
                    </Text>
                </Link>
                <Link
                    href={`https://github.com/PostHog/posthog.com/issues/new?title=Blog feedback on: ${title}&body=**Issue with: /${filePath}**\n\n`}
                    className="text-primary hover:text-primary dark:text-white dark:hover:text-white mt-2 inline-block"
                >
                    <Text>
                        <Issue className="h-[20px] w-[20px]" /> <span>Raise an issue</span>
                    </Text>
                </Link>
            </SidebarSection>
        </>
    )
}

export default function BlogPost({ data, pageContext, location }) {
    const { postData, questions } = data
    const { body, excerpt, fields } = postData
    const { date, title, featuredImage, featuredImageType, contributors, description } = postData?.frontmatter
    const lastUpdated = postData?.parent?.fields?.gitLogLatestDate
    const filePath = postData?.parent?.relativePath
    const components = {
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        pre: CodeBlock,
        inlineCode: InlineCode,
        blockquote: Blockquote,
        img: ZoomImage,
        a: A,
        ...shortcodes,
    }
    const { categories } = pageContext

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
            <Breadcrumbs className="px-4 mt-4 sticky top-[-2px] z-10 bg-tan dark:bg-primary" darkModeToggle>
                <Crumb title="Blog" url="/blog" />
                {categories && (
                    <li>
                        <ul className="list-none p-0 m-0 flex ">
                            {categories.map((category, index) => {
                                const { title, url } = category
                                return (
                                    <Crumb
                                        key={index}
                                        title={title}
                                        url={url}
                                        className="whitespace-nowrap border-r-0 items-baseline"
                                    />
                                )
                            })}
                        </ul>
                    </li>
                )}
                <Crumb className="whitespace-nowrap" title={title} truncate />
            </Breadcrumbs>
            <PostLayout
                contentWidth={790}
                sidebar={
                    <BlogPostSidebar
                        categories={categories}
                        contributors={contributors}
                        date={lastUpdated || date}
                        filePath={filePath}
                        title={title}
                        location={location}
                    />
                }
            >
                <Intro
                    title={title}
                    featuredImage={featuredImage}
                    featuredImageType={featuredImageType}
                    contributors={contributors}
                />
                <div className="lg:px-[50px]">
                    <MDXProvider components={components}>
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                </div>
            </PostLayout>
        </Layout>
    )
}

export const query = graphql`
    query BlogPostLayout($id: String!, $slug: String!) {
        postData: mdx(id: { eq: $id }) {
            id
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            frontmatter {
                date(formatString: "MMM DD, YYYY")
                title
                sidebar
                showTitle
                tags
                hideAnchor
                description
                featuredImageType
                featuredImage {
                    publicURL
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                contributors: authorData {
                    id
                    image
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
        questions: allQuestion(filter: { slug: { in: [$slug] } }) {
            nodes {
                avatar
                body
                name
                slug
                replies {
                    avatar
                    body
                    name
                    authorData {
                        name
                        role
                        image
                        link_url
                    }
                }
            }
        }
    }
`
