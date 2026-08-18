import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Logo } from '@posthog/brand/logo'
import { IconCheck, IconCopy } from '@posthog/icons'
import OSButton from 'components/OSButton'
import FeaturedPost from 'components/PostsIndex/FeaturedPost'
import PostsGallery from 'components/PostsIndex/PostsGallery'
import { PostSummary } from 'components/PostsIndex/types'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import usePostHog from 'hooks/usePostHog'

const RSS_URL = 'https://posthog.com/rss.xml'

/** Copies the RSS feed URL — the blog's stand-in for the newsletter's subscribe form. */
function CopyRSSButton({ placement }: { placement: string }): JSX.Element {
    const posthog = usePostHog()
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(RSS_URL)
        posthog?.capture('blog_rss_link_copied', { placement })
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <OSButton
            variant="secondary"
            size="md"
            icon={copied ? <IconCheck className="text-green" /> : <IconCopy />}
            onClick={handleCopy}
            aria-label="Copy the RSS feed link"
            tooltip={RSS_URL}
        >
            {copied ? 'Copied' : 'Copy RSS link'}
        </OSButton>
    )
}

/** The PostHog logomark (light/dark pair) with "Blog" beside it. */
function BlogWordmark(): JSX.Element {
    return (
        <div className="flex items-center gap-3">
            <Logo layout="logomark" className="h-8 w-[59px] dark:hidden" width="auto" title="PostHog" />
            <Logo
                layout="logomark"
                variant="mono"
                color="white"
                className="hidden h-8 w-[59px] dark:block"
                width="auto"
                title="PostHog"
            />
            <span className="text-3xl font-bold leading-none">Blog</span>
        </div>
    )
}

/**
 * Wordmark row, plus an optional RSS CTA. Used as the page header (wordmark only)
 * and again as the footer (wordmark + CTA). `placement` tags the copy event so
 * header and footer convert separately.
 */
function BlogHeader({ placement }: { placement?: string }): JSX.Element {
    return (
        <div className="flex flex-col items-start gap-4 py-2 @2xl:flex-row @2xl:items-center @2xl:justify-between @2xl:gap-8 @2xl:py-4">
            <BlogWordmark />
            {placement ? <CopyRSSButton placement={placement} /> : null}
        </div>
    )
}

/** The statement hero: headline as display type, the pitch as its deck, then the RSS CTA. */
function BlogHero({ className = '' }: { className?: string }): JSX.Element {
    return (
        <div className={`flex flex-col items-start gap-3 @2xl:gap-5 ${className}`}>
            <h1 className="m-0 max-w-4xl text-4xl font-bold leading-[1.05] @2xl:text-5xl @4xl:text-6xl">
                Lessons, opinions, and updates from the{' '}
                <span className="box-decoration-clone rounded-xs bg-blue/20 px-2 text-blue dark:text-blue-2">
                    team behind PostHog.
                </span>
            </h1>
            <p className="m-0 max-w-2xl text-lg text-secondary">
                How we build products, what we get wrong, and what we're shipping next – straight from the people doing
                the work.
            </p>
            <CopyRSSButton placement="blog-hero" />
        </div>
    )
}

export default function BlogPage({ data }: { data: { posts: { nodes: PostSummary[] } } }): JSX.Element {
    const posts = data.posts.nodes.filter((post) => post.frontmatter?.title)
    const featured = posts[0]

    return (
        <>
            <SEO
                title="Blog – PostHog"
                description="Lessons, opinions, and updates from the team behind PostHog. How we build products, what we get wrong, and what we're shipping next."
            />
            <ReaderView
                hideLeftSidebar
                hideRightSidebar
                showQuestions={false}
                hideMobileTableOfContents
                hideMarkdownActions
            >
                <div className="@container not-prose text-pretty text-primary">
                    <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 @2xl:pb-20 @xl:px-8">
                        <BlogHeader />
                        <BlogHero className="mt-2 @2xl:mt-4" />
                        {featured && (
                            <header className="mt-8 @2xl:mt-16">
                                <FeaturedPost post={featured} accent="blue" />
                            </header>
                        )}
                        <div className="mt-8 @2xl:mt-16">
                            <PostsGallery posts={posts.slice(1)} accent="blue" />
                        </div>
                        <hr className="my-10 h-px border-none bg-blue/40 @2xl:my-16" />
                        <BlogHeader placement="blog-footer" />
                    </div>
                </div>
            </ReaderView>
        </>
    )
}

export const query = graphql`
    {
        posts: allMdx(
            filter: {
                isFuture: { eq: false }
                fields: { slug: { regex: "/^/blog/" } }
                frontmatter: { date: { ne: null } }
            }
            sort: { order: DESC, fields: [frontmatter___date] }
        ) {
            nodes {
                id
                fields {
                    slug
                    pageViews
                }
                excerpt(pruneLength: 200)
                frontmatter {
                    title
                    shortDate: date(formatString: "MMM D")
                    fullDate: date(formatString: "MMM D, YYYY")
                    tags
                    seo {
                        metaDescription
                    }
                    featuredImage {
                        publicURL
                        childImageSharp {
                            gatsbyImageData(width: 800)
                        }
                    }
                    authors: authorData {
                        name
                    }
                }
            }
        }
    }
`
