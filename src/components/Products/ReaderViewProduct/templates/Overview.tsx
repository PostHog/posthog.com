import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import { SectionComponentProps } from '../types'
import OSTable from 'components/OSTable'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

const Overview = ({ id, productData }: SectionComponentProps) => {
    const { name, Icon, overview, screenshots, status } = productData ?? {}

    const columns = [
        { name: 'Role', width: 'minmax(auto,1fr)', align: 'left' as const },
        { name: 'Use cases', width: 'minmax(auto,1fr)', align: 'left' as const },
    ]

    const rows = [
        {
            cells: [
                {
                    content: 'Product Engineers',
                },
                {
                    content: "Debug production issues that can't be reproduced locally",
                },
                {
                    content: 'Support',
                },
                {
                    content: 'Pinpoint the source of issues with visual verification and console logs',
                },
                {
                    content: 'PMs & designers',
                },
                {
                    content: 'Spot friction, dead ends, and rage clicks',
                },
                {
                    content: 'Growth',
                },
                {
                    content: 'Investigate funnel drop-off and onboarding bleed',
                },
                {
                    content: 'QA',
                },
                {
                    content: 'Validating releases by watching real users instead of staged flows',
                },
            ],
        },
    ]

    return (
        <section id={id} className="scroll-mt-20 not-prose flex flex-col gap-12">
            <DebugContainerQuery name="reader-content" />
            <header className="">
                {screenshots?.home?.src && (
                    <div className="@3xl/reader-content:max-w-lg @3xl/reader-content:float-right @3xl/reader-content:-mr-8 @3xl/reader-content:ml-8">
                        <CloudinaryImage
                            src={screenshots.home.src as `https://res.cloudinary.com/${string}`}
                            alt={screenshots.home.alt || name}
                            className="w-full"
                            imgClassName="h-auto rounded-lg @3xl/reader-content:rounded-r-none"
                        />
                    </div>
                )}

                <div>
                    <div className="inline-flex items-center gap-2 mb-3 text-secondary">
                        {Icon && <Icon className="size-6" />}
                        <span className="text-sm font-semibold uppercase tracking-wider">{name}</span>
                        {status === 'beta' && (
                            <span className="font-bold uppercase border-2 border-current px-1 rounded text-xs">
                                Beta
                            </span>
                        )}
                    </div>
                    <h2 className="text-4xl font-bold text-primary leading-tight">{overview?.title || name}</h2>
                    <p className="text-secondary leading-relaxed">{overview?.description}</p>
                </div>

                <div>Just like... customer logos here!</div>
            </header>

            <div>
                <h2>Who uses it?</h2>
                <OSTable
                    columns={columns}
                    rows={rows}
                    size="sm"
                    rowAlignment="top"
                    // className="bg-white dark:bg-dark"
                    // shadow
                />
            </div>

            <div>
                <h2>Details</h2>
                <p className="leading-relaxed">{overview?.eli5}</p>
            </div>
        </section>
    )
}

export default Overview
