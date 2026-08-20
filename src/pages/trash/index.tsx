import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import { AppIcon, AppIconName, AppLink } from 'components/OSIcons/AppIcon'
import { Accordion } from 'components/RadixUI/Accordion'
import ZoomHover from 'components/shared/animation/ZoomHover'
import { explorerGridColumns } from '../../constants'

export default function Trash(): JSX.Element {
    return (
        <>
            <SEO
                title="Trash - PostHog"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <ReaderView
                className="border-t border-primary"
                hideAppOptions
                hideRightSidebar
                hideLeftSidebar
                showQuestions={false}
            >
                {(() => {
                    // Static data for trash items
                    const trashData = {
                        recently_deleted: [
                            {
                                name: 'Copy of whitepaper (2) - final FINAL.docx.pdf',
                                slug: 'copy-of-whitepaper-final',
                                url: '/Copy of whitepaper (2) - final LATEST.docx.pdf',
                                extension: 'pdf',
                                color: 'red',
                                icon: 'pdf' as AppIconName,
                            },
                            {
                                name: 'quick calls script.txt',
                                slug: 'quick-calls-script',
                                url: '/quick calls script.txt',
                                extension: 'txt',
                                color: 'blue',
                                icon: 'doc' as AppIconName,
                            },
                            {
                                name: 'employee feet pics',
                                slug: 'feet-pics',
                                url: '/feet-pics',
                                extension: 'folder',
                                color: 'yellow',
                                icon: 'folder' as AppIconName,
                            },
                            {
                                name: 'spicy.mov',
                                slug: 'spicy-mov',
                                url: '/spicy.mov',
                                extension: 'mov',
                                color: 'red',
                                icon: 'video' as AppIconName,
                            },
                            {
                                name: 'Long Term Contract Template.docx',
                                slug: 'long-term-contract-template',
                                url: '/long-term-contract-template', // placeholder link
                                extension: 'docx',
                                color: 'blue',
                                icon: 'doc' as AppIconName,
                            },
                        ],
                        archive: [
                            {
                                name: 'Synergy Framework.canvas',
                                icon: 'canvas' as AppIconName,
                            },
                            {
                                name: 'Sync Meeting Invite.ics',
                                icon: 'invite' as AppIconName,
                            },
                            {
                                name: 'GA3',
                                icon: 'ga' as AppIconName,
                            },
                            {
                                name: 'PIP.doc',
                                icon: 'doc' as AppIconName,
                            },
                            {
                                name: 'website easter eggs.md',
                                slug: 'website-easter-eggs',
                                url: undefined,
                                extension: 'md',
                                color: 'blue',
                                icon: 'doc' as AppIconName,
                            },
                            {
                                name: '[GATEKEEP] state of the industry report.pdf',
                                icon: 'pdf_locked' as AppIconName,
                            },
                            {
                                name: 'ai slop.tsx',
                                slug: 'ai-slop-tsx',
                                url: undefined,
                                extension: 'tsx',
                                color: 'blue',
                                icon: 'doc' as AppIconName,
                            },
                        ],
                    }

                    const categoryOrder = ['recently_deleted', 'archive']

                    // Category display names
                    const categoryDisplayNames: Record<string, string> = {
                        recently_deleted: 'Recently deleted',
                        archive: 'Archive (cannot be recovered)',
                    }

                    return (
                        <div className="@container not-prose space-y-2">
                            {categoryOrder.map((category) => {
                                const items = trashData[category as keyof typeof trashData]
                                if (!items || items.length === 0) return null

                                const count = items.length

                                return (
                                    <Accordion
                                        key={category}
                                        triggerClassName="flex-row-reverse [&>svg]:!-rotate-90 [&[data-state=open]>svg]:!rotate-0 [&>span]:gap-2 [&>span]:after:h-0.5 [&>span]:after:flex-1 [&>span]:after:bg-border [&>span]:after:content-['']"
                                        items={[
                                            {
                                                value: category,
                                                trigger: (
                                                    <span>
                                                        {categoryDisplayNames[category] ||
                                                            category.charAt(0).toUpperCase() + category.slice(1)}{' '}
                                                        ({count})
                                                    </span>
                                                ),
                                                content: (
                                                    <div
                                                        className={`@md:pl-4 grid ${explorerGridColumns} gap-y-4 items-start justify-items-center gap-x-1 @md:gap-x-4 relative [&>div]:mx-auto [&_figure]:text-center`}
                                                    >
                                                        {items.map((item) => {
                                                            const appLink = (
                                                                <AppLink
                                                                    label={item.name}
                                                                    url={item.url}
                                                                    Icon={<AppIcon name={item.icon} />}
                                                                    className={`size-12 [&_.bg-front]:fill-${item.color} [&_.bg-rear]:fill-${item.color}`}
                                                                ></AppLink>
                                                            )

                                                            // Only wrap clickable items (with URLs) in ZoomHover
                                                            if (item.url) {
                                                                return (
                                                                    <ZoomHover
                                                                        key={item.slug}
                                                                        className="w-28 justify-center"
                                                                    >
                                                                        {appLink}
                                                                    </ZoomHover>
                                                                )
                                                            }

                                                            // Non-clickable items without ZoomHover
                                                            return (
                                                                <div
                                                                    key={item.slug}
                                                                    className="w-28 justify-center mx-auto"
                                                                >
                                                                    {appLink}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                ),
                                            },
                                        ]}
                                        defaultValue={category}
                                    />
                                )
                            })}
                        </div>
                    )
                })()}
            </ReaderView>
        </>
    )
}
