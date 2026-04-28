import React, { useRef } from 'react'
import WistiaCustomPlayer from 'components/WistiaCustomPlayer'
import { IconCopy } from '@posthog/icons'
import { useStaticQuery, graphql } from 'gatsby'
import { useToast } from '../../../context/Toast'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import SmallTeam from 'components/SmallTeam'

interface VideoChapter {
    title: string
    time: number
    copyable?: boolean
}

interface Video {
    title?: string
    author?: string
    wistia: string
    chapters?: VideoChapter[]
}

interface VideoEmbedProps {
    video?: Video
}

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function VideoEmbed({ video }: VideoEmbedProps) {
    const playerRef = useRef<any>(null)
    const { addToast } = useToast()

    if (!video?.wistia) return null

    const handleChapterClick = (time: number) => {
        if (!playerRef.current) return
        if (typeof playerRef.current.time === 'function') {
            playerRef.current.time(time)
        }
        if (typeof playerRef.current.play === 'function') {
            playerRef.current.play()
        }
    }

    const handleCopyChapter = (title: string) => {
        navigator.clipboard.writeText(title)
        addToast({ description: 'Copied to clipboard', duration: 2000 })
    }

    const hasChapters = (video.chapters?.length ?? 0) > 0
    const hasAuthor = !!video.author
    const hasFooter = hasChapters || hasAuthor

    return (
        <div className="flex flex-col gap-6">
            <div className="aspect-video bg-black rounded overflow-hidden">
                <WistiaCustomPlayer key={video.wistia} mediaId={video.wistia} ref={playerRef} />
            </div>

            {hasFooter && (
                <div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
                    {hasChapters && (
                        <div>
                            <h4 className="text-base font-semibold text-secondary mb-3">
                                Jump to a prompt in this video
                            </h4>
                            <ul className="space-y-2 m-0 p-0 list-none">
                                {video.chapters!.map((chapter, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm group">
                                        <button
                                            type="button"
                                            onClick={() => handleChapterClick(chapter.time)}
                                            className="flex-1 text-left hover:text-red flex items-start gap-2"
                                        >
                                            <span className="inline-block pt-0.5 font-mono text-xs text-secondary shrink-0 pr-2">
                                                {formatTime(chapter.time)}
                                            </span>
                                            <span
                                                className={`flex-1 ${
                                                    chapter.copyable ? 'before:content-["“"] after:content-["”"]' : ''
                                                }`}
                                            >
                                                {chapter.title}
                                            </span>
                                        </button>
                                        {chapter.copyable && (
                                            <OSButton
                                                variant="default"
                                                hover="border"
                                                size="xs"
                                                onClick={() => handleCopyChapter(chapter.title)}
                                                className="opacity-50 group-hover:opacity-100"
                                                aria-label="Copy prompt"
                                                tooltip="Copy prompt"
                                                tooltipDelay={0}
                                            >
                                                <IconCopy className="size-4" />
                                            </OSButton>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {hasAuthor && (
                        <div>
                            <fieldset>
                                <legend className="bg-transparent text-base">In this video</legend>
                                <AuthorInfo name={video.author!} />
                            </fieldset>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

function AuthorInfo({ name }: { name: string }) {
    const {
        profiles: { nodes },
    } = useStaticQuery(graphql`
        {
            profiles: allSqueakProfile {
                nodes {
                    firstName
                    lastName
                    squeakId
                    avatar {
                        formats {
                            thumbnail {
                                url
                            }
                        }
                    }
                    color
                    pineappleOnPizza
                    teams {
                        data {
                            attributes {
                                slug
                            }
                        }
                    }
                }
            }
        }
    `)

    const person = nodes.find(
        ({ firstName, lastName }: { firstName: string; lastName: string }) =>
            `${firstName} ${lastName}`.toLowerCase() === name.toLowerCase()
    )

    if (!person) return null

    const teamSlug = person.teams?.data?.[0]?.attributes?.slug
    const avatarUrl = person.avatar?.formats?.thumbnail?.url
    const fullName = `${person.firstName} ${person.lastName}`
    const color = person.color || 'red'

    return (
        <div className="flex items-start gap-3">
            <Link to={`/community/profiles/${person.squeakId}`} state={{ newWindow: true }}>
                <CloudinaryImage
                    src={
                        (avatarUrl ||
                            'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages-content/images/hog-9.png') as `https://res.cloudinary.com/${string}`
                    }
                    alt={fullName}
                    className={`size-12 rounded-full overflow-hidden border-2 border-${color} p-[1.5px]`}
                    imgClassName={`object-cover rounded-full bg-${color}`}
                    width={64}
                />
            </Link>
            <div className="text-left">
                <div className="text-lg font-semibold">
                    <Link
                        to={`/community/profiles/${person.squeakId}`}
                        state={{ newWindow: true }}
                        className="hover:underline"
                    >
                        {fullName}
                    </Link>
                </div>
                {teamSlug && (
                    <div className="text-secondary text-sm">
                        <SmallTeam slug={teamSlug} inline />
                    </div>
                )}
                {person.pineappleOnPizza !== null && person.pineappleOnPizza !== undefined && (
                    <p className="italic text-secondary text-sm mt-1 mb-0">
                        {person.pineappleOnPizza === true && 'Believes pineapple belongs on pizza'}
                        {person.pineappleOnPizza === false && 'Does not believe pineapple belongs on pizza'}
                    </p>
                )}
            </div>
        </div>
    )
}
