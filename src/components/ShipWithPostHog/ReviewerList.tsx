import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { IconCheckCircle, IconPlus } from '@posthog/icons'
import Link from 'components/Link'
import { Popover } from 'components/RadixUI/Popover'
import { Hint } from './prose'
import type { Reviewer } from './inboxData'

interface ProfileNode {
    squeakId?: string
    firstName: string
    lastName?: string
    companyRole?: string
    avatar?: { formats?: { thumbnail?: { url?: string } } }
}

/**
 * Strapi stores a straight apostrophe; authored copy tends to carry a typographic
 * one. Without this, a name like "Paul D'Ambra" silently fails to match and the row
 * falls back to a monogram for no visible reason.
 */
const normalizeName = (name: string): string => name.toLowerCase().replace(/[‘’]/g, "'").trim()

// Rows offered by the "Add" menu. Chrome – the replica doesn't assign anyone.
const SUGGESTED_ADDITIONS = ['Ben White', 'Tom Owers', 'Robbie Coomber']

const Monogram = ({ name, className = 'size-6' }: { name: string; className?: string }): JSX.Element => (
    <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full border border-primary bg-accent text-xs font-semibold text-secondary ${className}`}
    >
        {name.charAt(0)}
    </span>
)

/**
 * Suggested reviewers on a report, with the rationale for each.
 *
 * Names are matched against the real team directory at build time via
 * `allSqueakProfile`, so avatars and profile links are genuine. The commits and the
 * rationale beside them come from the report's own `suggested_reviewers` artefact –
 * see the note on `Reviewer` in `inboxData.tsx`.
 */
export default function ReviewerList({ reviewers }: { reviewers: Reviewer[] }): JSX.Element {
    const {
        profiles: { nodes },
    } = useStaticQuery(graphql`
        {
            profiles: allSqueakProfile(filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }) {
                nodes {
                    squeakId
                    firstName
                    lastName
                    companyRole
                    avatar {
                        formats {
                            thumbnail {
                                url
                            }
                        }
                    }
                }
            }
        }
    `)

    // Restricted to current team members above, so a name can't collide with an
    // ex-employee or a community profile.
    const profileFor = (name: string): ProfileNode | undefined =>
        nodes.find(
            ({ firstName, lastName }: ProfileNode) =>
                normalizeName([firstName, lastName].filter(Boolean).join(' ')) === normalizeName(name)
        )

    return (
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {reviewers.map((reviewer) => {
                const profile = profileFor(reviewer.name)
                const avatarUrl = profile?.avatar?.formats?.thumbnail?.url

                const avatar = avatarUrl ? (
                    <img src={avatarUrl} alt="" className="size-6 shrink-0 rounded-full bg-accent object-cover" />
                ) : (
                    <Monogram name={reviewer.name} />
                )

                return (
                    <li key={reviewer.name}>
                        <div className="flex items-center gap-2">
                            <Hint trigger={avatar}>
                                {profile?.companyRole
                                    ? `${reviewer.name} – ${profile.companyRole}`
                                    : `${reviewer.name} isn't in the team directory, so this falls back to an initial.`}
                            </Hint>
                            <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
                                {/* An unmatched name still renders, just without a link. */}
                                {profile?.squeakId ? (
                                    <Link
                                        to={`/community/profiles/${profile.squeakId}`}
                                        state={{ newWindow: true }}
                                        className="text-sm font-bold text-primary hover:underline"
                                    >
                                        {reviewer.name}
                                    </Link>
                                ) : (
                                    <strong className="text-sm text-primary">{reviewer.name}</strong>
                                )}
                                {/*
                                 * `externalNoIcon`, not `external`: the latter wraps children in
                                 * its own bold-underlined span with an arrow glyph, which at this
                                 * size wrapped onto a second line under every sha.
                                 */}
                                <span className="font-mono text-xs text-secondary">
                                    {reviewer.commits.map((commit, index) => (
                                        <React.Fragment key={commit.sha}>
                                            {index > 0 && ', '}
                                            <Hint
                                                trigger={
                                                    <Link
                                                        to={commit.url}
                                                        externalNoIcon
                                                        className="text-secondary hover:text-primary hover:underline"
                                                    >
                                                        {commit.sha}
                                                    </Link>
                                                }
                                            >
                                                The commit the blame walk landed on. Opens the real diff on GitHub.
                                            </Hint>
                                        </React.Fragment>
                                    ))}
                                </span>
                                {reviewer.approved && (
                                    <Hint
                                        trigger={
                                            <span className="inline-flex items-center gap-1 rounded-full border border-green/40 bg-green/10 px-1.5 py-0.5 text-xs font-semibold text-green">
                                                <IconCheckCircle className="size-3" />
                                                Approved it
                                            </span>
                                        }
                                    >
                                        PostHog suggested this person, and they went on to actually approve the pull
                                        request.
                                    </Hint>
                                )}
                            </div>
                        </div>
                        {/* Indented to sit under the name, not the avatar. */}
                        <p className="m-0 mt-1 pl-8 text-xs leading-snug text-secondary">{reviewer.reason}</p>
                    </li>
                )
            })}
        </ul>
    )
}

/** The "Add" control in the Reviewers card header. */
export const AddReviewerMenu = (): JSX.Element => (
    <Popover
        dataScheme="secondary"
        contentClassName="border border-primary"
        trigger={
            <button
                type="button"
                title="Add someone the blame walk missed"
                className="inline-flex items-center gap-1 rounded border border-primary bg-primary px-1.5 py-0.5 text-xs font-semibold text-secondary transition-colors hover:text-primary"
            >
                <IconPlus className="size-3" />
                Add
            </button>
        }
    >
        <div className="w-48">
            <p className="m-0 px-2 py-1 text-xs text-secondary">Also touched these lines</p>
            {SUGGESTED_ADDITIONS.map((name) => (
                <button
                    key={name}
                    type="button"
                    className="flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm text-primary transition-colors hover:bg-accent"
                >
                    <Monogram name={name} className="size-5" />
                    {name}
                </button>
            ))}
        </div>
    </Popover>
)
