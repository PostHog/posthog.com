import React from 'react'
import Link from 'components/Link'
import PostImage from './PostImage'
import { PostSummary } from './types'
import { getByline, getSubtitle } from './utils'

/** One tile in the all-posts grid. */
export default function GalleryCard({ post }: { post: PostSummary }): JSX.Element {
    return (
        <Link to={post.fields.slug} state={{ newWindow: true }} className="group block no-underline text-primary">
            <div className="relative aspect-video overflow-hidden rounded-sm border border-primary bg-white shadow-[0_6px_12px_rgba(0,0,0,0.18)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.25)]">
                <PostImage
                    post={post}
                    className="!absolute inset-0 h-full w-full"
                    imgClassName="h-full w-full object-cover object-left-top"
                />
            </div>
            <div className="mt-3">
                <h3 className="m-0 text-sm font-bold leading-snug underline decoration-transparent transition-colors duration-200 line-clamp-2 group-hover:decoration-current">
                    {post.frontmatter.title}
                </h3>
                <p className="m-0 mt-1 text-xs text-secondary line-clamp-2">{getSubtitle(post)}</p>
                <p className="m-0 mt-1.5 text-[11px] font-medium uppercase tracking-wide text-muted">
                    {getByline(post, post.frontmatter.fullDate)}
                </p>
            </div>
        </Link>
    )
}
