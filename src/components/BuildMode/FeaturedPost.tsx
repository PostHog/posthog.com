import React from 'react'
import Link from 'components/Link'
import PostImage from './PostImage'
import Tape from './Tape'
import { BuildModePost } from './types'
import { getByline, getSubtitle } from './utils'

/** The newest post, taped up: image left, title, dek, and byline right. */
export default function FeaturedPost({ post }: { post: BuildModePost }): JSX.Element {
    return (
        <div className="min-w-0">
            {/* Hand-drawn-style annotation pointing down at the newest post */}
            <div className="mb-6 flex items-start gap-2 pl-1">
                <span className="-rotate-2 text-lg font-bold italic text-red-2-dark @2xl:text-xl">
                    Hot off the press
                </span>
                <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    aria-hidden="true"
                    className="mt-3.5 size-9 text-red-2-dark @2xl:size-10"
                >
                    <path d="M6 3 C 20 6, 25 16, 22 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path
                        d="M15.5 23.5 L22 28.5 L27 22.5"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <Link
                to={post.fields.slug}
                state={{ newWindow: true }}
                className="group flex flex-col gap-5 no-underline text-primary @2xl:flex-row @2xl:items-start @2xl:gap-8"
            >
                {/* Image keeps its own aspect ratio — no fixed frame, no cropping */}
                <div className="relative shrink-0 @2xl:w-[46%]">
                    <Tape className="absolute -left-5 -top-3 z-10 w-16 -rotate-[28deg] @2xl:w-20" />
                    <Tape className="absolute -right-5 -top-3 z-10 w-16 rotate-[24deg] @2xl:w-20" />
                    <div className="overflow-hidden rounded-sm border border-primary bg-white shadow-[0_14px_28px_rgba(0,0,0,0.25)]">
                        <PostImage post={post} className="w-full" imgClassName="block h-auto w-full" width={1000} />
                    </div>
                </div>
                <div className="min-w-0 max-w-xl flex-1">
                    {/* Underline is always on but transparent — text-decoration-color transitions where a bare `underline` toggle can't */}
                    <h2 className="m-0 text-2xl font-bold leading-tight underline decoration-transparent transition-colors duration-200 group-hover:decoration-current @2xl:text-3xl">
                        {post.frontmatter.title}
                    </h2>
                    <p className="m-0 mt-3 text-lg text-secondary">{getSubtitle(post)}</p>
                    <p className="m-0 mt-4 text-sm font-medium uppercase tracking-wide text-muted">
                        {getByline(post, post.frontmatter.shortDate)}
                    </p>
                </div>
            </Link>
        </div>
    )
}
