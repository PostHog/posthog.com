import { IconArrowLeft, IconPencil, IconSpinner, IconTrash } from '@posthog/icons'
import Editor from 'components/Editor'
import Link from 'components/Link'
import { Markdown } from 'components/Markdown'
import ExhibitCard, { ExhibitFrame } from 'components/Museum/ExhibitCard'
import { useExhibitForm } from 'components/Museum/ExhibitForm'
import ExhibitGallery from 'components/Museum/ExhibitGallery'
import { formatExhibitDate } from 'components/Museum/utils'
import OSButton from 'components/OSButton'
import SEO from 'components/seo'
import { ZoomImage } from 'components/ZoomImage'
import { navigate, PageProps } from 'gatsby'
import { getRelatedExhibits, museumRequest, useMuseumExhibit, useMuseumExhibits } from 'hooks/useMuseum'
import { useUser } from 'hooks/useUser'
import React from 'react'
import { useToast } from '../../context/Toast'

const MetaRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt>
        <dd className="m-0 mt-0.5 text-sm">{children}</dd>
    </div>
)

// Client-only route: exhibits live in Strapi and change without a site rebuild
export default function MuseumExhibitPage({ params }: PageProps): JSX.Element {
    const slug = params.slug
    const { exhibit, isLoading, error, refresh } = useMuseumExhibit(slug)
    const { refresh: refreshExhibits } = useMuseumExhibits()
    const { isModerator, getJwt } = useUser()
    const { addToast } = useToast()
    const openExhibitForm = useExhibitForm()

    const deleteExhibit = async () => {
        if (!exhibit || !confirm(`Delete "${exhibit.title}" from the museum?`)) {
            return
        }
        try {
            const jwt = await getJwt()
            if (!jwt) {
                throw new Error('Sign in to your community profile first')
            }
            await museumRequest(`museum-exhibits/${exhibit.id}`, jwt, 'DELETE')
            addToast({ title: 'Exhibit deleted', description: exhibit.title })
            refreshExhibits()
            navigate('/museum')
        } catch (deleteError) {
            addToast({
                title: 'Failed to delete exhibit',
                description: deleteError instanceof Error ? deleteError.message : 'An unexpected error occurred.',
                error: true,
            })
        }
    }

    const related = exhibit ? getRelatedExhibits(exhibit) : []
    const date = exhibit ? formatExhibitDate(exhibit.date, exhibit.datePrecision) : ''

    return (
        <>
            <SEO
                title={exhibit ? `${exhibit.title} - Marketing museum - PostHog` : 'Marketing museum - PostHog'}
                description={exhibit?.plaque || "A piece of PostHog's marketing history"}
                image={exhibit?.heroImage?.url || '/images/og/default.png'}
            />
            <Editor
                hideToolbar
                hasPadding={false}
                type="museum"
                proseSize="base"
                maxWidth="100%"
                bookmark={{
                    title: exhibit?.title || 'Marketing museum',
                    description: exhibit?.plaque || "A piece of PostHog's marketing history",
                }}
            >
                <div
                    data-scheme="primary"
                    className="@container not-prose mx-auto flex min-h-full max-w-6xl flex-col gap-6 bg-transparent p-4 text-primary @xl:p-6"
                >
                    <div className="flex flex-wrap items-center justify-between gap-2 px-2">
                        <Link to="/museum" className="flex items-center gap-1 text-sm font-semibold text-secondary">
                            <IconArrowLeft className="size-4" />
                            All exhibits
                        </Link>
                        {exhibit && isModerator && (
                            <div className="flex gap-2">
                                <OSButton
                                    size="sm"
                                    icon={<IconPencil />}
                                    onClick={() =>
                                        openExhibitForm(exhibit, (savedSlug) => {
                                            refresh()
                                            refreshExhibits()
                                            if (savedSlug !== exhibit.slug) {
                                                navigate(`/museum/${savedSlug}`)
                                            }
                                        })
                                    }
                                >
                                    Edit
                                </OSButton>
                                <OSButton size="sm" icon={<IconTrash />} onClick={deleteExhibit}>
                                    Delete
                                </OSButton>
                            </div>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-16">
                            <IconSpinner className="size-8 animate-spin opacity-50" />
                        </div>
                    ) : !exhibit ? (
                        <div className="py-12 text-center">
                            <p className="m-0 text-secondary">
                                {error
                                    ? "Couldn't load this exhibit – check your connection and try again."
                                    : "This exhibit isn't in the museum (any more)."}
                            </p>
                            <OSButton
                                size="md"
                                className="mt-2"
                                onClick={() => (error ? refresh() : navigate('/museum'))}
                            >
                                {error ? 'Try again' : 'Back to the museum'}
                            </OSButton>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-8 px-2 @3xl:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]">
                                <div className="min-w-0 space-y-8">
                                    <ExhibitFrame alt={exhibit.title}>
                                        {exhibit.heroImage?.url ? (
                                            <ZoomImage>
                                                <img
                                                    src={exhibit.heroImage.url}
                                                    alt={exhibit.heroImage.alternativeText || exhibit.title}
                                                    className="block max-h-[70vh] w-full object-contain"
                                                />
                                            </ZoomImage>
                                        ) : undefined}
                                    </ExhibitFrame>
                                    <ExhibitGallery
                                        images={exhibit.gallery}
                                        videos={exhibit.videos}
                                        title={exhibit.title}
                                    />
                                    {exhibit.context && (
                                        <section>
                                            <h2 className="m-0 mb-3 text-xl">The story</h2>
                                            <div className="prose max-w-none dark:prose-invert">
                                                <Markdown>{exhibit.context}</Markdown>
                                            </div>
                                        </section>
                                    )}
                                </div>

                                <aside className="min-w-0 space-y-6">
                                    <div className="rounded-sm border border-primary bg-primary p-4 shadow-[0_6px_12px_rgba(0,0,0,0.12)]">
                                        <h1 className="m-0 text-xl leading-snug">{exhibit.title}</h1>
                                        {date && <p className="m-0 mt-1 text-sm text-secondary">{date}</p>}
                                        {exhibit.plaque && (
                                            <p className="m-0 mt-3 text-sm leading-relaxed">{exhibit.plaque}</p>
                                        )}
                                        <dl className="m-0 mt-4 space-y-3 border-t border-primary pt-4">
                                            {exhibit.category && (
                                                <MetaRow label="Category">
                                                    <Link
                                                        to={`/museum?category=${exhibit.category.slug}`}
                                                        className="underline"
                                                    >
                                                        {exhibit.category.name}
                                                    </Link>
                                                    {exhibit.type && (
                                                        <>
                                                            {' › '}
                                                            <Link
                                                                to={`/museum?category=${exhibit.category.slug}&type=${exhibit.type.slug}`}
                                                                className="underline"
                                                            >
                                                                {exhibit.type.name}
                                                            </Link>
                                                        </>
                                                    )}
                                                </MetaRow>
                                            )}
                                            {exhibit.collections.length > 0 && (
                                                <MetaRow label="Collections">
                                                    <span className="flex flex-wrap gap-1.5">
                                                        {exhibit.collections.map((collection) => (
                                                            <Link
                                                                key={collection.id}
                                                                to={`/museum?collection=${collection.slug}`}
                                                                className="rounded-full border border-primary px-2 py-0.5 text-xs text-secondary hover:text-primary"
                                                            >
                                                                {collection.name}
                                                            </Link>
                                                        ))}
                                                    </span>
                                                </MetaRow>
                                            )}
                                            {exhibit.credits.length > 0 && (
                                                <MetaRow label="Credits">
                                                    {exhibit.credits
                                                        .map((credit) =>
                                                            `${credit.firstName || ''} ${credit.lastName || ''}`.trim()
                                                        )
                                                        .filter(Boolean)
                                                        .join(', ')}
                                                </MetaRow>
                                            )}
                                            {exhibit.links.length > 0 && (
                                                <MetaRow label="Links">
                                                    <ul className="m-0 list-none space-y-1 p-0">
                                                        {exhibit.links.map((link) => (
                                                            <li key={link.url}>
                                                                <Link
                                                                    to={link.url}
                                                                    state={
                                                                        link.url.startsWith('/')
                                                                            ? { newWindow: true }
                                                                            : undefined
                                                                    }
                                                                    className="underline"
                                                                >
                                                                    {link.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </MetaRow>
                                            )}
                                        </dl>
                                    </div>
                                    {exhibit.curatorNotes && (
                                        <div className="border-l-2 border-primary pl-3">
                                            <p className="m-0 text-xs font-semibold uppercase tracking-wide text-muted">
                                                Notes from the curator
                                            </p>
                                            <p className="m-0 mt-1 whitespace-pre-line text-sm italic text-secondary">
                                                {exhibit.curatorNotes}
                                            </p>
                                        </div>
                                    )}
                                </aside>
                            </div>

                            {related.length > 0 && (
                                <section className="border-t border-primary px-2 pt-6">
                                    <h2 className="m-0 mb-6 text-xl">Related exhibits</h2>
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 @md:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
                                        {related.map((relatedExhibit) => (
                                            <ExhibitCard key={relatedExhibit.id} exhibit={relatedExhibit} />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    )}
                </div>
            </Editor>
        </>
    )
}
