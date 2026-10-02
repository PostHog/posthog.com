import React from 'react'
import { navigate, PageProps } from 'gatsby'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { Markdown } from 'components/Markdown'
import { IconPencil, IconSpinner, IconTrash } from '@posthog/icons'
import { useExhibitForm } from 'components/Museum/ExhibitForm'
import MuseumMenu from 'components/Museum/MuseumMenu'
import { formatDate, personName } from 'components/Museum/utils'
import { museumRequest, useExhibit } from 'hooks/useMuseum'
import { useUser } from 'hooks/useUser'
import { useToast } from '../../../context/Toast'

export default function Exhibit({ params }: PageProps): JSX.Element {
    const { exhibit, isLoading, mutate } = useExhibit(params.slug)
    const { isModerator, getJwt } = useUser()
    const { addToast } = useToast()
    const openExhibitForm = useExhibitForm()
    const attributes = exhibit?.attributes

    const handleDelete = async () => {
        if (!exhibit || !confirm(`Delete "${exhibit.attributes.title}"? Its artifacts stay in the museum.`)) return
        try {
            await museumRequest(`museum-exhibits/${exhibit.id}`, (await getJwt()) || '', 'DELETE')
            navigate('/museum')
        } catch (error) {
            addToast({ title: 'Failed to delete exhibit', description: (error as Error).message, error: true })
        }
    }

    const curators = attributes?.curators?.data?.map(({ attributes }) => personName(attributes)).filter(Boolean)

    return (
        <>
            <SEO
                title={`${attributes?.title || 'Museum'} - PostHog`}
                description={attributes?.summary}
                image={attributes?.coverImage?.data?.attributes.url}
            />
            <ReaderView
                body={{ type: 'plain' }}
                title={attributes?.title}
                hideTitle
                hideRightSidebar
                hideAppOptions
                showQuestions={false}
                leftSidebar={<MuseumMenu activeUrl={`/museum/exhibits/${params.slug}`} />}
                rightActionButtons={
                    isModerator && exhibit ? (
                        <div className="flex gap-1">
                            <OSButton
                                size="sm"
                                icon={<IconPencil />}
                                onClick={() => openExhibitForm(exhibit, () => mutate())}
                            >
                                Curate
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
                    ) : !exhibit || !attributes ? (
                        <p>
                            This exhibit isn't in the museum. <Link to="/museum">Back to the museum</Link>
                        </p>
                    ) : (
                        <>
                            <h1 className="!mb-1">{attributes.title}</h1>
                            <p className="!mt-0 text-sm text-secondary">
                                {[
                                    curators?.length && `Curated by ${curators.join(', ')}`,
                                    formatDate(attributes.openedAt),
                                ]
                                    .filter(Boolean)
                                    .join(' · ')}
                            </p>
                            {attributes.summary && <p className="text-lg">{attributes.summary}</p>}
                            {attributes.statement && <Markdown>{attributes.statement}</Markdown>}
                            <ol className="not-prose m-0 list-none space-y-6 p-0">
                                {attributes.stops?.map(({ id, label, artifact }, index) => {
                                    if (!artifact.data) return null
                                    const stop = artifact.data.attributes
                                    return (
                                        <li
                                            key={id}
                                            data-scheme="secondary"
                                            className={`grid gap-4 rounded-md border border-primary bg-primary p-4 ${
                                                stop.heroImage?.data
                                                    ? '@xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]'
                                                    : ''
                                            }`}
                                        >
                                            {stop.heroImage?.data && (
                                                <Link to={`/museum/artifacts/${stop.slug}`}>
                                                    <img
                                                        src={stop.heroImage.data.attributes.url}
                                                        alt={stop.title}
                                                        className="w-full rounded border border-primary"
                                                    />
                                                </Link>
                                            )}
                                            <div>
                                                <p className="m-0 text-sm font-semibold text-muted">{index + 1}</p>
                                                <Link
                                                    to={`/museum/artifacts/${stop.slug}`}
                                                    className="text-lg font-semibold text-primary"
                                                >
                                                    {stop.title}
                                                </Link>
                                                <p className="m-0 text-sm text-secondary">
                                                    {formatDate(stop.date, stop.datePrecision)}
                                                </p>
                                                {(label || stop.plaque) && (
                                                    <p className="mb-0 mt-3">{label || stop.plaque}</p>
                                                )}
                                            </div>
                                        </li>
                                    )
                                })}
                            </ol>
                        </>
                    )}
                </div>
            </ReaderView>
        </>
    )
}
