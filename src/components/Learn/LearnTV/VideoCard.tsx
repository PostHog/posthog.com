import React from 'react'
import { IconPlayFilled } from '@posthog/icons'
import Link from 'components/Link'
import { learnVideoUrl, type LearnVideo } from './videos'

/** A poster card for a video. By default it opens the Learn TV window; pass `to` to link somewhere else. */
export default function VideoCard({
    video,
    to = learnVideoUrl(video),
    onOpen,
}: {
    video: LearnVideo
    to?: string
    onOpen?: () => void
}): JSX.Element {
    return (
        <Link
            to={to}
            onClick={onOpen}
            className="group block overflow-hidden rounded-md border border-primary bg-primary !text-primary !no-underline hover:border-secondary"
        >
            <div className="relative aspect-video bg-black">
                <img src={video.poster} alt="" loading="lazy" className="block size-full object-cover" />
                <span
                    aria-hidden="true"
                    className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full border-2 border-primary bg-primary text-secondary transition-transform group-hover:scale-110 group-hover:text-primary"
                >
                    <IconPlayFilled className="size-7" />
                </span>
            </div>
            <div className="p-3">
                <p className="m-0 text-xs font-bold text-secondary">{video.series}</p>
                <p className="m-0 mt-0.5 font-bold">
                    <span className="sr-only">Watch: </span>
                    {video.title}
                </p>
                <p className="m-0 mt-1 text-sm leading-relaxed text-secondary">{video.description}</p>
            </div>
        </Link>
    )
}
