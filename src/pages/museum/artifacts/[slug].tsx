import React from 'react'
import { navigate, PageProps } from 'gatsby'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { Markdown } from 'components/Markdown'
import { ZoomImage } from 'components/ZoomImage'
import WistiaEmbed from 'components/WistiaEmbed'
import { IconPencil, IconSpinner, IconTrash } from '@posthog/icons'
import MuseumCard from 'components/Museum/MuseumCard'
import { useArtifactForm } from 'components/Museum/ArtifactForm'
import MuseumMenu from 'components/Museum/MuseumMenu'
import { formatDate, parseVideo, personName } from 'components/Museum/utils'
import { getRelatedArtifacts, museumRequest, useArtifact } from 'hooks/useMuseum'
import { useUser } from 'hooks/useUser'
import { useToast } from '../../../context/Toast'

export default function Artifact({ params }: PageProps): JSX.Element {
    const { artifact, exhibits, isLoading, mutate } = useArtifact(params.slug)
    const { isModerator, getJwt } = useUser()
    const { addToast } = useToast()
    const openArtifactForm = useArtifactForm()
    const attributes = artifact?.attributes

    const handleDelete = async () => {
        if (!artifact || !confirm(`Delete "${artifact.attributes.title}"?`)) return
        try {
            await museumRequest(`museum-artifacts/${artifact.id}`, (await getJwt()) || '', 'DELETE')
            navigate('/museum')
        } catch (error) {
            addToast({ title: 'Failed to delete artifact', description: (error as Error).message, error: true })
        }
    }

    const credits = attributes?.credits?.data?.map(({ attributes }) => personName(attributes)).filter(Boolean)

    return (
        <>
            <SEO
                title={`${attributes?.title || 'Museum'} - PostHog`}
                description={attributes?.plaque}
                image={attributes?.heroImage?.data?.attributes.url}
            />
            <ReaderView
                body={{ type: 'plain' }}
                title={attributes?.title}
                hideTitle
                hideRightSidebar
                hideAppOptions
                showQuestions={false}
                leftSidebar={<MuseumMenu activeUrl={`/museum/artifacts/${params.slug}`} />}
                rightActionButtons={
                    isModerator && artifact ? (
                        <div className="flex gap-1">
                            <OSButton
                                size="sm"
                                icon={<IconPencil />}
                                onClick={() => openArtifactForm(artifact, () => mutate())}
                            >
                                Edit
                            </OSButton>
                            <OSButton size="sm" icon={<IconTrash />} onClick={handleDelete}>
                                Delete
                            </OSButton>
                        </div>
                    ) : undefined
                }
            >
                <div className="prose mx-auto max-w-3xl dark:prose-invert">
                    {isLoading ? (
                        <IconSpinner className="size-6 animate-spin opacity-50" />
                    ) : !artifact || !attributes ? (
                        <p>
                            This artifact isn't in the museum. <Link to="/museum">Back to the museum</Link>
                        </p>
                    ) : (
                        <>
                            <h1 className="!mb-1">{attributes.title}</h1>
                            <p className="!mt-0 text-sm text-secondary">
                                {[
                                    formatDate(attributes.date, attributes.datePrecision),
                                    attributes.category?.data?.attributes.name,
                                    attributes.type?.data?.attributes.name,
                                ]
                                    .filter(Boolean)
                                    .join(' · ')}
                            </p>
                            {attributes.plaque && <p className="text-lg">{attributes.plaque}</p>}
                            {attributes.heroImage?.data && (
                                <ZoomImage>
                                    <img
                                        src={attributes.heroImage.data.attributes.url}
                                        alt={attributes.heroImage.data.attributes.alternativeText || attributes.title}
                                        className="w-full rounded-md border border-primary"
                                    />
                                </ZoomImage>
                            )}
                            {attributes.videos?.map(({ url }) => {
                                const video = parseVideo(url)
                                if (video?.source === 'wistia') return <WistiaEmbed key={url} mediaId={video.videoId} />
                                if (video?.source === 'youtube')
                                    return (
                                        <iframe
                                            key={url}
                                            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0`}
                                            title={attributes.title}
                                            className="aspect-video w-full rounded"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            loading="lazy"
                                        />
                                    )
                                return (
                                    <p key={url}>
                                        <Link to={url}>{url}</Link>
                                    </p>
                                )
                            })}
                            {attributes.context && <Markdown>{attributes.context}</Markdown>}
                            {attributes.curatorNotes && (
                                <blockquote>
                                    <strong>Notes from the curator</strong>
                                    <p className="whitespace-pre-line">{attributes.curatorNotes}</p>
                                </blockquote>
                            )}
                            {!!attributes.gallery?.data?.length && (
                                <div className="not-prose grid grid-cols-2 gap-2 @xl:grid-cols-3">
                                    {attributes.gallery.data?.map(({ id, attributes: image }) => (
                                        <ZoomImage key={id}>
                                            <img
                                                src={image.url}
                                                alt={image.alternativeText || attributes.title}
                                                className="aspect-square w-full rounded border border-primary object-cover"
                                            />
                                        </ZoomImage>
                                    ))}
                                </div>
                            )}
                            {(!!attributes.links?.length || !!credits?.length) && (
                                <ul>
                                    {attributes.links?.map(({ label, url }) => (
                                        <li key={url}>
                                            <Link
                                                to={url}
                                                state={url.startsWith('/') ? { newWindow: true } : undefined}
                                            >
                                                {label || url}
                                            </Link>
                                        </li>
                                    ))}
                                    {!!credits?.length && <li>Credits: {credits.join(', ')}</li>}
                                </ul>
                            )}
                            {exhibits.length > 0 && (
                                <>
                                    <h2>On view in</h2>
                                    <div className="not-prose grid gap-4 @md:grid-cols-2">
                                        {exhibits.map(({ id, attributes: exhibit }) => (
                                            <MuseumCard
                                                key={id}
                                                to={`/museum/exhibits/${exhibit.slug}`}
                                                image={exhibit.coverImage?.data?.attributes.url}
                                                title={exhibit.title}
                                                meta={`${exhibit.stops?.length || 0} artifacts`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                            {getRelatedArtifacts(artifact).length > 0 && (
                                <>
                                    <h2>Related</h2>
                                    <div className="not-prose grid gap-4 @md:grid-cols-2">
                                        {getRelatedArtifacts(artifact).map(({ id, attributes: related }) => (
                                            <MuseumCard
                                                key={id}
                                                to={`/museum/artifacts/${related.slug}`}
                                                image={related.heroImage?.data?.attributes.url}
                                                title={related.title}
                                                meta={formatDate(related.date, related.datePrecision)}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </ReaderView>
        </>
    )
}
