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
    const imageURL = featuredImage?.image?.data?.attributes?.url || featuredImage?.url
    return (
        <>
            <SEO title={title + ' - PostHog'} />
            {imageURL && (
                <div className="max-w-lg">
                    <ZoomImage>
                        {imageURL?.endsWith('.mp4') ? (
                            <video className="w-full rounded-md" autoPlay src={imageURL} />
                        ) : (
                            <img className="w-full rounded-md" src={imageURL} />
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
            {CTA?.label && CTA?.url && (
                <CallToAction size="md" type="outline" to={CTA.url}>
                    {CTA.label}
                </CallToAction>
            )}
        </>
    )
}
