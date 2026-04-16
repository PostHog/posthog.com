import React, { useRef } from 'react'
import { IconGitBranch, IconCommit, IconCode, IconPeople, IconDocument, IconComment } from '@posthog/icons'
import Tooltip from 'components/RadixUI/Tooltip'

export type GitHubPRMetadata = {
    html_url: string
    number: number
    user?: {
        login: string
        avatar_url: string
        html_url: string
    }
    reviewers?: Array<{
        login: string
        avatar_url: string
        html_url: string
    }>
    commenters?: Array<{
        login: string
        avatar_url: string
        html_url: string
    }>
    additions?: number
    deletions?: number
    commits?: number
    changed_files?: number
    comments?: number
    review_comments?: number
}

export const ChangelogPRMetadata = ({
    githubPRMetadata,
    truncated = false,
}: {
    githubPRMetadata: GitHubPRMetadata
    truncated?: boolean
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current
            const canScrollLeft = container.scrollLeft > 0
            const canScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth

            if ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft)) {
                e.preventDefault()
                container.scrollLeft += e.deltaY
            }
        }
    }

    const handleMouseLeave = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        }
    }

    return (
        <>
            <div className="flex flex-row items-center">
                <IconGitBranch className="w-4 h-4 opacity-50 mr-1" />
                <a href={githubPRMetadata.html_url} target="_blank" rel="noopener noreferrer" className="opacity-50">
                    #{githubPRMetadata.number}
                </a>
            </div>
            <div className="flex flex-row items-center overflow-hidden">
                <IconPeople className="w-4 h-4 opacity-50 shrink-0 mr-1" />
                <div
                    ref={scrollContainerRef}
                    onWheel={handleWheel}
                    onMouseLeave={handleMouseLeave}
                    className="flex flex-row items-center group overflow-x-auto scrollbar-hide"
                >
                    {[
                        githubPRMetadata.user,
                        ...(githubPRMetadata.reviewers || []),
                        ...(githubPRMetadata.commenters || []),
                    ]
                        .filter(Boolean)
                        .map((commenter, index, array) => (
                            <Tooltip
                                key={`avatar-${commenter?.login}`}
                                trigger={
                                    <div
                                        className={`relative transition-all duration-200 flex-none ${
                                            index > 0 ? '-ml-2 group-hover:ml-0.5' : ''
                                        }`}
                                        style={{ zIndex: array.length - index }}
                                    >
                                        <img
                                            src={commenter?.avatar_url}
                                            alt={`${commenter?.login} avatar`}
                                            loading="lazy"
                                            decoding="async"
                                            referrerPolicy="no-referrer"
                                            className="w-5 h-5 min-w-5 min-h-5 rounded-full border-primary border flex-none"
                                        />
                                    </div>
                                }
                                side="top"
                            >
                                <a
                                    href={commenter?.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="opacity-50 font-semibold underline"
                                >
                                    {commenter?.login}
                                </a>
                            </Tooltip>
                        ))}
                </div>
            </div>
            <div className="flex flex-row items-center">
                <IconCode className="w-4 h-4 opacity-50 shrink-0 mr-1" />
                <div className="flex flex-row gap-x-1">
                    <span className="text-green font-semibold">
                        +{(githubPRMetadata.additions ?? 0).toLocaleString()}
                    </span>{' '}
                    <span className="text-red font-semibold">
                        -{(githubPRMetadata.deletions ?? 0).toLocaleString()}
                    </span>
                </div>
            </div>
            {!truncated && (
                <>
                    <div className="flex flex-row items-center">
                        <IconCommit className="w-4 h-4 opacity-50 mr-1" />
                        <a
                            href={githubPRMetadata.html_url + '/commits'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-50"
                        >
                            {githubPRMetadata.commits}
                        </a>
                    </div>
                    <div className="flex flex-row items-center">
                        <IconDocument className="w-4 h-4 opacity-50 mr-1" />
                        <a
                            href={githubPRMetadata.html_url + '/files'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-50"
                        >
                            {githubPRMetadata.changed_files}
                        </a>
                    </div>
                    <div className="flex flex-row items-center">
                        <IconComment className="w-4 h-4 opacity-50 mr-1" />
                        <a
                            href={githubPRMetadata.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-50"
                        >
                            {(githubPRMetadata.comments ?? 0) + (githubPRMetadata.review_comments ?? 0)}
                        </a>
                    </div>
                </>
            )}
        </>
    )
}

export default ChangelogPRMetadata
