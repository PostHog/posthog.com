import Link from 'components/Link'
import React, { useEffect, useRef } from 'react'
import { useLocation } from '@reach/router'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isToday from 'dayjs/plugin/isToday'
import { useLayoutData } from 'components/Layout/hooks'
import LikeButton from './LikeButton'
dayjs.extend(relativeTime)
dayjs.extend(isToday)

export default function Post({
    id,
    title,
    featuredImage,
    date,
    publishedAt,
    post_category,
    authors,
    slug,
    fetchMore,
    articleView,
}) {
    const containerRef = useRef()
    const { pathname } = useLocation()
    const category = post_category?.data?.attributes?.label
    const active = pathname === slug
    const breakpoints = useBreakpoint()
    const day = dayjs(date || publishedAt)
    const { fullWidthContent } = useLayoutData()

    useEffect(() => {
        if (active && typeof window !== 'undefined' && !breakpoints.sm) {
            containerRef?.current?.scrollIntoView({ block: 'center', inline: 'nearest' })
            window.scrollTo({ top: 0 })
        }
    }, [articleView])

    const imageURL = featuredImage?.image?.data?.attributes?.url || featuredImage?.url
    const defaultImage = post_category?.data?.attributes?.defaultImage?.data?.attributes?.url

    return (
        <li
            ref={containerRef}
            className={`snap-start last:pb-24 ${!articleView ? 'grid grid-cols-[35px_1fr] items-center' : ''}`}
        >
            {!articleView && <LikeButton postID={id} />}
            <span className={`flex items-center ${articleView ? 'py-px' : ''}`}>
                <Link
                    className={`inline m-0 font-semibold border-t border-b !leading-tight line-clamp-2 text-inherit hover:text-primary dark:hover:text-primary-dark hover:text-inherit dark:text-inherit dark:hover:text-inherit hover:transition-transform flex-grow hover:bg-accent dark:hover:bg-accent-dark relative 
                    ${
                        active
                            ? 'bg-accent dark:bg-accent-dark font-bold border-border dark:border-dark'
                            : 'border-transparent hover:scale-[1.01] hover:top-[-.5px] active:top-[.5px] active:scale-[.99]'
                    } 
                    ${fullWidthContent ? 'p-2 ' : 'p-2 lg:px-4'}
                    ${articleView ? 'text-[.933rem]' : 'text-base mr-1.5'}
                    ${fullWidthContent && articleView ? 'lg:px-6' : ''} 
                    `}
                    to={slug}
                >
                    {pathname === '/posts' && category && (
                        <p className="m-0 text-sm font-medium opacity-60 flex-shrink-0">{category}</p>
                    )}
                    <div
                        className={`items-baseline ${active ? 'flex  gap-1' : ''} ${
                            articleView ? 'flex gap-4' : 'inline'
                        }`}
                    >
                        <span className="mr-1 flex-1">{title}</span>
                        <span className={`${articleView ? 'text-right flex-0 basis-22' : 'inline-flex gap-1'}`}>
                            <span
                                className={`font-medium leading-none opacity-60 ${
                                    articleView ? 'text-[.813rem]' : 'text-[.933rem]'
                                }`}
                            >
                                {day.isToday() ? 'Today' : day.fromNow()}
                            </span>
                        </span>
                    </div>
                    <div className="hidden sm:w-[100px] sm:h-[85px] w-[50px] h-[50px] flex-shrink-0 bg-accent dark:bg-accent-dark rounded-sm overflow-hidden md:self-start self-center relative z-10">
                        <span
                            className={`text-inherit hover:text-inherit dark:text-inherit dark:hover:text-inherit flex-grow`}
                        >
                            {imageURL?.endsWith('.mp4') ? (
                                <video className="object-cover w-full h-full" src={imageURL} />
                            ) : (
                                <img
                                    className={`w-full h-full ${
                                        !imageURL && defaultImage ? 'object-contain' : 'object-cover'
                                    }`}
                                    src={imageURL || defaultImage || '/banner.png'}
                                />
                            )}
                        </span>
                    </div>
                </Link>
            </span>
        </li>
    )
}
