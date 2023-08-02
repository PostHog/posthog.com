import { CallToAction } from 'components/CallToAction'
import Markdown from 'components/Squeak/components/Markdown'
import { ZoomImage } from 'components/ZoomImage'
import SEO from 'components/seo'
import dayjs from 'dayjs'
import React from 'react'

export default function ClientPost({
    title,
    featuredImage,
    date,
    body,
    CTA,
    publishedAt,
}: {
    title: string
    featuredImage?: { url: string }
    date: string
    body: string
    CTA?: { url: string; label: string }
    publishedAt: string
}) {
    return (
        <>
            <SEO title={title + ' - PostHog'} />
            {featuredImage?.url && (
                <div className="max-w-lg">
                    <ZoomImage>
                        {featuredImage?.url?.endsWith('.mp4') ? (
                            <video className="w-full rounded-md" autoPlay src={featuredImage?.url} />
                        ) : (
                            <img className="w-full rounded-md" src={featuredImage?.url} />
                        )}
                    </ZoomImage>
                </div>
            )}
            <div className={`flex flex-col py-4`}>
                <p className="m-0 opacity-70 order-last lg:order-first">
                    {dayjs(date || publishedAt).format('MMM DD, YYYY')}
                </p>
                <h1 className={`text-3xl md:text-4xl lg:text-4xl mb-1 mt-6 lg:mt-1`}>{title}</h1>
            </div>
            <div className="my-2 article-content">
                <Markdown>{body}</Markdown>
            </div>
            {CTA?.label && CTA?.url && <CallToAction to={CTA.url}>{CTA.label}</CallToAction>}
        </>
    )
}
