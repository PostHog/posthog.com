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

const TAG_ORDER_OVERRIDE = ['Comparisons', 'Alternatives', 'Roundups']

/** Copies the RSS feed URL — same stand-in as the blog footer. */
function CopyRSSButton({ placement }: { placement: string }): JSX.Element {
    const posthog = usePostHog()
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(RSS_URL)
        posthog?.capture('compare_rss_link_copied', { placement })
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

/** The PostHog logomark (light/dark pair) with "Compare" beside it. */
function CompareWordmark({ asHeading = false }: { asHeading?: boolean }): JSX.Element {
    const labelClass = 'text-3xl font-bold leading-none m-0'
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
            {asHeading ? <h1 className={labelClass}>Compare</h1> : <span className={labelClass}>Compare</span>}
        </div>
    )
}

function CompareHeader({
    placement,
    includeCTA = true,
    asHeading = false,
}: {
    placement?: string
    includeCTA?: boolean
    asHeading?: boolean
}): JSX.Element {
    return (
        <div className="flex flex-row items-center justify-between gap-4 py-2 flex-wrap">
            <CompareWordmark asHeading={asHeading} />
            {includeCTA && placement ? <CopyRSSButton placement={placement} /> : null}
        </div>
    )
}

export default function ComparePage({ data }: { data: { posts: { nodes: PostSummary[] } } }): JSX.Element {
    const posts = data.posts.nodes.filter((post) => post.frontmatter?.title)
    const featured = posts[0]

    return (
        <>
            <SEO
                title="Compare - PostHog"
                description="Head-to-head comparisons, alternatives, and best-of roundups. See how PostHog stacks up against other product and analytics tools."
            />
            <ReaderView
                hideLeftSidebar
                hideRightSidebar
                showQuestions={false}
                hideMobileTableOfContents
                hideMarkdownActions
            >
                <div className="@container not-prose text-pretty text-primary">
                    <CompareHeader placement="compare-header" includeCTA={false} asHeading />
                    <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 @2xl:pb-20 @xl:px-8">
                        <div className="mt-2 @lg:mt-10 flex @2xl:flex-row flex-col items-center gap-8 @2xl:gap-16">
                            {featured && (
                                <header className="mt-12 @2xl:mt-0">
                                    <FeaturedPost calloutPosition="right" post={featured} accent="purple" />
                                </header>
                            )}
                        </div>
                        <div className="mt-8 @2xl:mt-16">
                            <PostsGallery
                                posts={posts.slice(1)}
                                accent="purple"
                                tagOrderOverride={TAG_ORDER_OVERRIDE}
                            />
                        </div>
                        <hr className="my-10 h-px border-none bg-purple/40 @2xl:my-16" />
                        <CompareHeader placement="compare-footer" />
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
                fields: { slug: { regex: "/^/compare/" } }
                frontmatter: { date: { ne: null } }
            }
            sort: { order: DESC, fields: [frontmatter___date] }
        ) {
            nodes {
                id
                fields {
                    slug
                    pageViews
                    wordCount
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
