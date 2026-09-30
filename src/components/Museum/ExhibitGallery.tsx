import Link from 'components/Link'
import WistiaEmbed from 'components/WistiaEmbed'
import { ZoomImage } from 'components/ZoomImage'
import type { MuseumMedia, MuseumVideo } from 'hooks/useMuseum'
import React from 'react'
import { ExhibitFrame } from './ExhibitCard'
import { parseVideo } from './utils'

const ExhibitVideo = ({ video }: { video: MuseumVideo }): JSX.Element => {
    const embed = parseVideo(video)
    if (embed.source === 'wistia') {
        return <WistiaEmbed mediaId={embed.id} />
    }
    if (embed.source === 'youtube') {
        return (
            <iframe
                src={`https://www.youtube-nocookie.com/embed/${embed.id}`}
                title={video.title || 'Video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video w-full border-0"
            />
        )
    }
    return (
        <Link to={video.url} externalNoIcon className="block p-4 text-sm font-semibold underline">
            {video.title || video.url}
        </Link>
    )
}

// Every extra image and video for an exhibit. Images open full-size on click.
export default function ExhibitGallery({
    images,
    videos,
    title,
}: {
    images: MuseumMedia[]
    videos: MuseumVideo[]
    title: string
}): JSX.Element | null {
    if (images.length === 0 && videos.length === 0) {
        return null
    }
    return (
        <div className="space-y-6">
            {videos.map((video) => (
                <ExhibitFrame key={video.url} alt={video.title || title}>
                    <ExhibitVideo video={video} />
                </ExhibitFrame>
            ))}
            {images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 @2xl:grid-cols-3">
                    {images.map((image) => (
                        <ExhibitFrame key={image.id} alt={title} className="!border-4 !p-1.5">
                            <ZoomImage>
                                <img
                                    src={image.url}
                                    alt={image.alternativeText || title}
                                    loading="lazy"
                                    className="block aspect-square w-full object-cover"
                                />
                            </ZoomImage>
                        </ExhibitFrame>
                    ))}
                </div>
            )}
        </div>
    )
}
