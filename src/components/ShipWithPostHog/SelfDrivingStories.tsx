import React from 'react'
import { IconArrowRight } from '@posthog/icons'
import { GatsbyImage, getImage, type ImageDataLike } from 'gatsby-plugin-image'
import slugify from 'slugify'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import OSButton2 from 'components/OSButton/OSButton2'

/**
 * The frontmatter tag that puts a blog post in this section. Nothing else marks these
 * posts – "self-driving" is a prose motif across dozens of posts, and the on-topic ones
 * only share `AI` and `Engineering`, which far too much unrelated writing also carries.
 * So the tag *is* the filter: tagging a post is the whole integration step, and the
 * section picks it up on the next build with no code change here.
 */
export const SELF_DRIVING_TAG = 'Self-driving'

/*
 * Blog tag pages are generated for every tag that appears in any post, slugified the
 * same way (see `gatsby/createPages.ts` – `slugify(tag, { lower: true })`). Deriving the
 * URL rather than hardcoding it means the "read them all" link can't drift from the page
 * Gatsby actually built if the tag is ever renamed.
 */
const TAG_URL = `/blog/tags/${slugify(SELF_DRIVING_TAG, { lower: true })}`

/**
 * One post, shaped by `BlogFragment` (`components/Blog`). `featuredImage` is loose
 * because the two sources disagree: a locally-sourced image is a real sharp node, while
 * a Cloudinary URL is rewritten by `gatsby/onCreateNode.ts` into a synthetic
 * `{ publicURL, childImageSharp }` object whose `gatsbyImageData` comes from the
 * vendored `gatsby-transformer-cloudinary` plugin. Both have to render.
 *
 * The fragment also returns `authors`, which this section deliberately doesn't use – see
 * the note on the row below.
 */
export interface SelfDrivingPost {
    id: string
    excerpt: string
    fields: { slug: string }
    frontmatter: {
        title: string
        date: string
        featuredImage?: (ImageDataLike & { publicURL?: string }) | null
    }
}

/**
 * Row thumbnail. `getImage` handles both node shapes above, but it returns undefined
 * when the Cloudinary transformer has no cached dimensions for an asset (which happens
 * locally, where Cloudinary credentials aren't configured) – so fall back to the plain
 * URL instead of leaving a hole in the row.
 *
 * Decorative: `alt=""` because the post title sits immediately beside it and a repeated
 * label is noise for a screen reader.
 */
const Thumbnail = ({ post }: { post: SelfDrivingPost }): JSX.Element => {
    const { featuredImage, title } = post.frontmatter
    const image = featuredImage && getImage(featuredImage)
    const className = 'hidden aspect-video w-32 shrink-0 overflow-hidden rounded bg-accent @md:block @xl:w-40'

    if (image) {
        return <GatsbyImage alt="" aria-hidden image={image} className={className} />
    }
    if (featuredImage?.publicURL) {
        return (
            <CloudinaryImage
                alt=""
                aria-hidden
                width={320}
                src={featuredImage.publicURL as `https://res.cloudinary.com/${string}`}
                className={className}
                imgClassName="h-full w-full object-cover"
            />
        )
    }
    return <div className={className} aria-hidden title={title} />
}

/**
 * "The stories behind the pull requests" – sits below the walkthroughs and points at the
 * long-form write-ups in the blog.
 *
 * Centered heading over a full-width list rather than two columns: the intro copy is four
 * lines and the list is five tall rows, so side-by-side left most of the left column
 * empty. This also matches the heading treatment `SignalsToInbox` uses directly above.
 *
 * Presentational only: the page owns the GraphQL query so this stays testable with a
 * plain array. Renders nothing when `posts` is empty, so untagging every post degrades
 * to an absent section rather than a heading over a void.
 */
export default function SelfDrivingStories({ posts }: { posts: SelfDrivingPost[] }): JSX.Element | null {
    if (!posts?.length) return null

    return (
        <section className="@container">
            <div className="mx-auto mb-6 max-w-3xl text-center">
                <h2 className="text-2xl font-bold @md:text-3xl">The stories behind the pull requests</h2>
                <p className="mt-3 text-secondary @2xl:text-lg">
                    Every walkthrough above is a real merged PR, and most of them got written up properly – what the
                    agent caught, what it got wrong on the first pass, and what we changed as a result.
                </p>
            </div>

            <div className="mx-auto max-w-4xl">
                <ul className="m-0 list-none p-0">
                    {posts.map((post) => {
                        const { title, date } = post.frontmatter
                        return (
                            <li key={post.id} className="border-b border-primary first:border-t last:border-b">
                                <Link to={post.fields.slug} state={{ newWindow: true }} className="group block py-4">
                                    {/*
                                     * No author avatar. At this row height a 30px circle floating in
                                     * the right margin reads as a stray dot rather than attribution,
                                     * and the byline is on the post itself anyway.
                                     */}
                                    <div className="flex items-center gap-4 @md:gap-5">
                                        <Thumbnail post={post} />
                                        <div className="min-w-0 flex-1">
                                            {/* line-clamp on both title and excerpt so one long
                                                entry can't tower over the rest of the list. */}
                                            <h3 className="m-0 !text-base font-semibold leading-snug text-primary line-clamp-2 group-hover:underline @md:!text-lg">
                                                {title}
                                            </h3>
                                            <p className="m-0 mt-1 text-sm text-secondary">{date}</p>
                                            <p className="m-0 mt-1 text-sm leading-snug text-secondary line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                {/* Auto width, centered – a button stretched across the full list reads as a
                    banner rather than a control. */}
                <div className="mt-6 flex justify-center">
                    <OSButton2 to={TAG_URL} state={{ newWindow: true }} width="auto" className="px-4">
                        Read all self-driving posts
                        <IconArrowRight className="size-4" />
                    </OSButton2>
                </div>
            </div>
        </section>
    )
}
