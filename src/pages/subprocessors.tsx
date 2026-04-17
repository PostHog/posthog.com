import React, { useMemo, useState } from 'react'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import OSTable from 'components/OSTable'
import subprocessors from '../data/subprocessors.json'

type TabKey = 'all' | 'core' | 'ai' | 'internal'

type SubprocessorRecord = {
    name: string
    reason: string
    location: string
    details: string[]
    regions: string[]
}

const internalSubprocessors: SubprocessorRecord[] = [
    {
        name: 'Hiberly Ltd.',
        reason: 'Provision of the PostHog services',
        location: 'United Kingdom',
        details: [],
        regions: ['United Kingdom'],
    },
    {
        name: 'PostHog GmbH',
        reason: 'Provision of the PostHog services',
        location: 'Germany',
        details: [],
        regions: ['Germany'],
    },
]

const tabs: { key: TabKey; label: string }[] = [
    { key: 'core', label: 'Third-Party Subprocessors (Core Services)' },
    { key: 'ai', label: 'Third-Party AI Subprocessors (Only if AI Features are Enabled)' },
    { key: 'internal', label: 'Internal Subprocessors' },
]

function SubprocessorsPage(): JSX.Element {
    const [activeTab, setActiveTab] = useState<TabKey>('core')

    const coreSubprocessors = useMemo(
        () => subprocessors.filter((subprocessor) => subprocessor.type === 'cloud') as unknown as SubprocessorRecord[],
        []
    )
    const aiSubprocessors = useMemo(
        () => subprocessors.filter((subprocessor) => subprocessor.type === 'ai') as unknown as SubprocessorRecord[],
        []
    )

    const activeRows = useMemo(() => {
        if (activeTab === 'all') {
            return [...coreSubprocessors, ...aiSubprocessors, ...internalSubprocessors]
        }

        if (activeTab === 'core') {
            return coreSubprocessors
        }

        if (activeTab === 'ai') {
            return aiSubprocessors
        }

        return internalSubprocessors
    }, [activeTab, aiSubprocessors, coreSubprocessors])

    const tableColumns = useMemo(
        () => [
            { name: 'Subprocessor', align: 'left' as const, width: 'minmax(260px,1.1fr)' },
            { name: 'Nature and purpose of processing', align: 'left' as const, width: 'minmax(320px,1.4fr)' },
            { name: 'Location of processing', align: 'left' as const, width: 'minmax(300px,1.1fr)' },
            { name: 'Additional information', align: 'left' as const, width: 'minmax(460px,1.6fr)' },
        ],
        []
    )

    const tableRows = useMemo(
        () =>
            activeRows.map((subprocessor) => ({
                key: subprocessor.name,
                cells: [
                    {
                        content: <span className="font-semibold">{subprocessor.name}</span>,
                    },
                    {
                        content: subprocessor.reason,
                    },
                    {
                        content: <div dangerouslySetInnerHTML={{ __html: subprocessor.location }} />,
                    },
                    {
                        content:
                            subprocessor.details.length > 0 ? (
                                <div className="space-y-1">
                                    {subprocessor.details.map((detail) => (
                                        <div key={detail}>
                                            <a
                                                href={detail}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="[overflow-wrap:anywhere]"
                                            >
                                                {detail}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <span className="opacity-70">N/A</span>
                            ),
                    },
                ],
            })),
        [activeRows]
    )

    return (
        <>
            <SEO title="Subprocessors - PostHog" description="Subprocessors for PostHog Cloud and AI features." />

            <div className="max-w-6xl mx-auto px-4 py-8 mb-4 prose dark:prose-invert @container">
                <h1 className="mb-2">Subprocessors</h1>
                <p className="text-sm opacity-70 m-0">Last updated: March 10, 2026</p>
                <p>
                    PostHog, Inc. together with any of its affiliates and/or subsidiaries (“<strong>PostHog</strong>”, “
                    <strong>we</strong>” or “<strong>us</strong>”) engages certain third-party vendors listed below as
                    Subprocessors to help us operate, provide, improve, integrate, customize, and support our Services
                    when we process Company Personal Data (as defined in the applicable{' '}
                    <Link to="/dpa" state={{ newWindow: true }}>
                        Data Processing Agreement
                    </Link>{' '}
                    that may be entered into between us and a Customer (“<strong>DPA</strong>”)) on behalf of our
                    Customers.
                </p>
                <p>
                    The table below identifies PostHog’s Subprocessors, details the nature and purpose of their
                    services, and location of the processing. The Subprocessors we engage may change from time to time,
                    and we may add or remove Subprocessors in the future. We will post updates to our Subprocessors on
                    this page and provide notice, if applicable, in accordance with the terms of the DPA.
                </p>
                <p>
                    Terms used on this page but not otherwise defined shall have the meaning set forth in the DPA or in
                    the applicable contract for services between us and Customer.
                </p>

                <div className="not-prose mt-6 flex justify-between items-end">
                    <div>
                        <div className="flex flex-wrap gap-2">
                            {tabs.map((tab) => (
                                <OSButton
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    active={activeTab === tab.key}
                                    className="border border-primary"
                                >
                                    {tab.label}
                                </OSButton>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="not-prose mt-4 [&_a]:underline [&_a]:font-semibold">
                    {activeTab === 'internal' && (
                        <div className="mb-2 border border-primary rounded bg-accent px-3 py-2 text-sm">
                            PostHog may also engage one or more of the following PostHog subsidiaries as internal
                            subprocessors to deliver some or all of the PostHog services provided to Customer.
                        </div>
                    )}
                    <div className="-mx-4 @5xl:mx-0">
                        <OSTable
                            columns={tableColumns}
                            rows={tableRows}
                            rowAlignment="top"
                            size="sm"
                            width="full"
                            editable={false}
                        />
                    </div>
                </div>

                {activeRows.length === 0 && (
                    <p className="not-prose mt-3 text-sm opacity-70">
                        No subprocessors matched your selected category.
                    </p>
                )}

                <p>
                    We value the trust our customers put in us to keep their information safe and secure. Visit{' '}
                    <Link to="https://trust.posthog.com">PostHog’s Trust Center</Link> to learn more.
                </p>
            </div>
        </>
    )
}

export default SubprocessorsPage
