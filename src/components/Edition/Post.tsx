import Link from 'components/Link'
import React, { useEffect, useRef } from 'react'
import { useLocation } from '@reach/router'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isToday from 'dayjs/plugin/isToday'
import { useLayoutData } from 'components/Layout/hooks'
import LikeButton from './LikeButton'
import { StaticImage } from 'gatsby-plugin-image'
import { CallToAction } from 'components/CallToAction'

dayjs.extend(relativeTime)
dayjs.extend(isToday)

export default function Post({
    id,
    title,
    description,
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
        <li ref={containerRef} className={`snap-start mt-6 md:last:pb-24 ${!articleView ? 'index-view' : ''}`}>
            {authors?.data?.map(({ id, attributes: { firstName, lastName, avatar } }) => {
                const name = [firstName, lastName].filter(Boolean).join(' ')
                return (
                    <div className="flex gap-2" key={id}>
                        <div className="shrink-0 basis-14">
                            <div className="inline-block h-12 w-12 bg-accent dark:bg-accent-dark rounded-full border border-light dark:border-dark" />
                            <StaticImage src={avatar} className="h-12 w-12" />
                        </div>
                        <div>
                            <Link className="text-[.933rem]" to={`/community/profiles/${id}`}>
                                {name}
                            </Link>
                            <br />
                            <span className="text-60">
                                Posted{' '}
                                <Link to={slug} className="">
                                    {day.isToday() ? 'Today' : day.fromNow()}
                                </Link>
                            </span>
                        </div>
                    </div>
                )
            })}

            {authors?.data?.length === 0 && (
                <div className="flex gap-2">
                    <div className="shrink-0 basis-14">
                        <div className="inline-block h-12 w-12 bg-accent dark:bg-accent-dark rounded-full border border-light dark:border-dark" />
                    </div>
                    <div>
                        <Link className="text-[.933rem]" to={`/community/profiles/${id}`}>
                            PostHog team
                        </Link>
                        <br />
                        <span className="text-60">
                            Posted{' '}
                            <Link to={slug} className="">
                                {day.isToday() ? 'Today' : day.fromNow()}
                            </Link>
                        </span>
                    </div>
                </div>
            )}

            <div className="ml-16 flex flex-col gap-2">
                <Link
                    to={slug}
                    className=" bg-white dark:bg-accent-dark border border-light dark:border-dark rounded p-4 flex gap-4"
                >
                    <figure>
                        {imageURL?.endsWith('.mp4') ? (
                            <video className="object-cover w-full h-full" src={imageURL} />
                        ) : (
                            <img
                                className={`w-full h-full max-w-[80px] ${
                                    !imageURL && defaultImage ? 'object-contain' : 'object-cover'
                                }`}
                                src={imageURL || defaultImage || '/banner.png'}
                            />
                        )}
                    </figure>
                    <div>
                        {pathname === '/posts' && category && (
                            <p className="m-0 text-sm font-medium opacity-60 flex-shrink-0">{category}</p>
                        )}
                        {title} <br />
                        {description}
                    </div>
                </Link>
                <div>
                    <CallToAction type="secondary">
                        <div className="flex">
                            <LikeButton slug={slug} postID={id} /> <span className="flex-1">Like post</span>
                        </div>
                    </CallToAction>

                    <CallToAction type="secondary">Read later</CallToAction>
                </div>
            </div>

            <div className="hidden">
                {!articleView && <LikeButton slug={slug} postID={id} />}
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
                            {!articleView && authors?.data?.length > 0 && (
                                <span className={`ml-1 inline-flex items-center space-x-1 font-medium leading-none`}>
                                    <span className="text-[.933rem]">by</span>
                                    <ul className={`m-0 p-0 list-none flex`}>
                                        {authors?.data?.map(({ id, attributes: { firstName, lastName } }) => {
                                            const name = [firstName, lastName].filter(Boolean).join(' ')
                                            return (
                                                <li className='even:before:content-[","] even:before:mr-1' key={id}>
                                                    <Link className="text-[.933rem]" to={`/community/profiles/${id}`}>
                                                        {name}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </span>
                            )}
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
            </div>
        </li>
    )
}
