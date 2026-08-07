import React from 'react'
import Link from 'components/Link'
import PostImage from './PostImage'
import Tape from './Tape'
import { BuildModePost } from './types'
import { getByline, getSubtitle } from './utils'

/** The newest post, taped up at the top of the page. */
export default function FeaturedPost({ post }: { post: BuildModePost }): JSX.Element {
    return (
        <div className="min-w-0 flex-1">
            <Link
                to={post.fields.slug}
                state={{ newWindow: true }}
                className="group flex flex-col gap-5 no-underline text-primary @2xl:flex-row @2xl:items-center @2xl:gap-7"
            >
                {/* Image keeps its own aspect ratio — no fixed frame, no cropping */}
                <div className="relative shrink-0 @2xl:w-[56%]">
                    <Tape className="absolute -left-5 -top-3 z-10 w-16 -rotate-[28deg] @2xl:w-20" />
                    <Tape className="absolute -right-5 -top-3 z-10 w-16 rotate-[24deg] @2xl:w-20" />
                    <div className="overflow-hidden rounded-sm border border-primary bg-white shadow-[0_14px_28px_rgba(0,0,0,0.25)]">
                        <PostImage post={post} className="w-full" imgClassName="block h-auto w-full" width={1000} />
                    </div>
                </div>
                <div className="min-w-0 flex-1">
                    <h1 className="m-0 text-xl font-bold leading-tight group-hover:underline @2xl:text-2xl @4xl:text-3xl">
                        {post.frontmatter.title}
                    </h1>
                    <p className="m-0 mt-2 text-secondary @2xl:text-lg">{getSubtitle(post)}</p>
                    <p className="m-0 mt-3 text-sm font-medium uppercase text-muted">
                        {getByline(post, post.frontmatter.shortDate)}
                    </p>
                </div>
            </Link>
        </div>
    )
}
