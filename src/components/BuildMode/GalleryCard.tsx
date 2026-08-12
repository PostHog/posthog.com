import React from 'react'
import Link from 'components/Link'
import PostImage from './PostImage'
import { BuildModePost } from './types'
import { getByline, getSubtitle } from './utils'

/** One tile in the all-posts grid. */
export default function GalleryCard({ post }: { post: BuildModePost }): JSX.Element {
    return (
        <Link
            to={post.fields.slug}
            state={{ newWindow: true }}
            className="group flex h-full flex-col overflow-hidden rounded border border-primary bg-accent no-underline text-primary transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
        >
            <div className="relative aspect-video shrink-0 overflow-hidden bg-white">
                <PostImage
                    post={post}
                    className="!absolute inset-0 h-full w-full"
                    imgClassName="h-full w-full object-contain"
                />
            </div>
            <div className="flex flex-1 flex-col p-4">
                <h3 className="m-0 mb-1 text-sm font-bold leading-snug line-clamp-2 group-hover:underline">
                    {post.frontmatter.title}
                </h3>
                <p className="m-0 mb-2 text-xs text-secondary line-clamp-2">{getSubtitle(post)}</p>
                <p className="m-0 mt-auto text-[11px] font-medium uppercase tracking-wide text-muted">
                    {getByline(post, post.frontmatter.fullDate)}
                </p>
            </div>
        </Link>
    )
}
