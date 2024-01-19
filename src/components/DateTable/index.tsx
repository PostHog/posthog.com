import React from 'react'
import dayjs from 'dayjs'
import slugify from 'slugify'
import * as icons from '@posthog/icons'
import { Heading } from 'components/Heading'
import { ZoomImage } from 'components/ZoomImage'
import Markdown from 'components/Squeak/components/Markdown'
import { CallToAction } from 'components/CallToAction'

type Props = {
    dataByDate: {
        [key: string]: {
            label: string
            title: string
            description: string
            icon: string
            media?: {
                data: {
                    attributes: {
                        url: string
                        mime: string
                    }
                }
            }
            cta?: {
                label: string
                url: string
            }
            teamName?: string
        }[]
    }
}

export default function DateTable({ dataByDate }: Props): JSX.Element {
    return (
        <>
            {Object.keys(dataByDate).map((date) => {
                const data = dataByDate[date]
                return (
                    <div key={date} className="flex gap-4">
                        <div className="shrink-0 basis-[50px] relative after:w-[1px] after:absolute after:top-0 after:bottom-0 after:left-[25px] after:bg-border dark:after:bg-border-dark after:content-['']">
                            <div className="inline-flex flex-col items-center rounded bg-light dark:bg-dark border border-light dark:border-dark py-1 px-2 relative z-30">
                                <h2 className="!text-sm font-bold uppercase !m-0">{dayjs(date).format('MMM')}</h2>
                                <div className="text-xs font-semibold">{dayjs(date).format('YYYY')}</div>
                            </div>
                        </div>
                        <ul className="list-none m-0 p-0 grid gap-y-12 flex-1 pb-12">
                            {data.map(({ description, title, icon, media, label, cta, teamName }) => {
                                const mediaURL = media?.data?.attributes?.url
                                const Icon = icons[icon?.toLowerCase()]
                                return (
                                    <li key={title}>
                                        {label && (
                                            <p className="font-bold flex mt-3 !-mb-4 opacity-80 relative after:absolute after:border-t after:border-light dark:after:border-dark content-[''] after:top-3 after:left-[calc(-25px_-_1rem)] after:right-0">
                                                <span className="inline-flex space-x-2 bg-light dark:bg-dark px-2 z-20">
                                                    {Icon && <Icon className="w-5" />}
                                                    <span>{label}</span>
                                                </span>
                                            </p>
                                        )}
                                        <Heading as="h3" id={slugify(title, { lower: true })} className="m-0">
                                            {title}
                                        </Heading>
                                        {teamName && (
                                            <p className="m-0 text-sm opacity-60 font-semibold">{teamName} Team</p>
                                        )}
                                        {mediaURL && (
                                            <div className="my-4">
                                                {media?.data?.attributes?.mime === 'video/mp4' ? (
                                                    <ZoomImage>
                                                        <video
                                                            className="max-w-2xl w-full"
                                                            src={mediaURL}
                                                            autoPlay
                                                            loop
                                                            muted
                                                            playsInline
                                                        />
                                                    </ZoomImage>
                                                ) : (
                                                    <ZoomImage>
                                                        <img src={mediaURL} className="max-w-2xl w-full" />
                                                    </ZoomImage>
                                                )}
                                            </div>
                                        )}
                                        <div className="mt-2">
                                            <Markdown>{description}</Markdown>
                                        </div>
                                        {cta && (
                                            <CallToAction type="secondary" size="md" to={cta.url}>
                                                {cta.label}
                                            </CallToAction>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </>
    )
}
