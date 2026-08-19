import React, { useMemo, useState } from 'react'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import OSTable from 'components/OSTable'
import subprocessors from '../data/subprocessors.json'

type TabKey = 'all' | 'core' | 'ai' | 'internal'

type DeploymentKey = 'all' | 'us' | 'eu'

type SubprocessorRecord = {
    name: string
    type: 'cloud' | 'ai' | 'internal'
    reason: string
    duration?: string
    location: string
    details: string[]
    regions: string[]
}

const internalSubprocessors: SubprocessorRecord[] = [
    {
        name: 'Hiberly Ltd.',
        type: 'internal',
        reason: 'Provision of the PostHog services',
        duration: 'Duration of the agreement',
        location: 'United Kingdom',
        details: [],
        regions: ['United Kingdom'],
    },
    {
        name: 'PostHog GmbH',
        type: 'internal',
        reason: 'Provision of the PostHog services',
        duration: 'Duration of the agreement',
        location: 'Germany',
        details: [],
        regions: ['Germany'],
    },
]

const tabs: { key: TabKey; label: string }[] = [
    { key: 'all', label: 'All Subprocessors' },
    { key: 'core', label: 'Third-Party Subprocessors (Core Services)' },
    { key: 'ai', label: 'Third-Party AI Subprocessors (Only if AI Features are Enabled)' },
    { key: 'internal', label: 'Internal Subprocessors' },
]

// Maps each PostHog Cloud deployment to the data regions its data reaches.
// A vendor that operates worldwide ("Global") applies to every deployment.
const deployments: { key: DeploymentKey; label: string; regions: string[] | null }[] = [
    { key: 'all', label: 'All regions', regions: null },
    { key: 'us', label: 'PostHog US Cloud', regions: ['USA'] },
    { key: 'eu', label: 'PostHog EU Cloud', regions: ['Germany', 'France'] },
]

// Each vendor's `details` array lists their trust center first and their own subprocessor
// list second. Prefer the URL's own wording, but fall back to that ordering for opaque links
// (e.g. Microsoft's servicetrust DocumentPage URL) that name neither document in the path.
function detailLabel(url: string, index: number): string {
    const namesSubprocessorList =
        url.toLowerCase().includes('subprocessor') || url.toLowerCase().includes('sub-processor')
    return namesSubprocessorList || index > 0 ? "Vendor's own subprocessor list" : 'Trust center'
}

function SubprocessorsPage(): JSX.Element {
    const [activeTab, setActiveTab] = useState<TabKey>('all')
    const [activeDeployment, setActiveDeployment] = useState<DeploymentKey>('all')

    const coreSubprocessors = useMemo(
        () => subprocessors.filter((subprocessor) => subprocessor.type === 'cloud') as unknown as SubprocessorRecord[],
        []
    )
    const aiSubprocessors = useMemo(
        () => subprocessors.filter((subprocessor) => subprocessor.type === 'ai') as unknown as SubprocessorRecord[],
        []
    )

    const matchesDeployment = (record: SubprocessorRecord): boolean => {
        const regions = deployments.find((deployment) => deployment.key === activeDeployment)?.regions
        if (!regions) {
            return true
        }
        // "Global" vendors process data in every region, so they apply to every deployment.
        if (record.regions.includes('Global')) {
            return true
        }
        return record.regions.some((region) => regions.includes(region))
    }

    const activeRows = useMemo(() => {
        const thirdParty =
            activeTab === 'all'
                ? [...coreSubprocessors, ...aiSubprocessors]
                : activeTab === 'core'
                ? coreSubprocessors
                : activeTab === 'ai'
                ? aiSubprocessors
                : []
        // Internal subprocessors are PostHog's own legal entities, so they apply to every deployment.
        const internal = activeTab === 'all' || activeTab === 'internal' ? internalSubprocessors : []
        return [...thirdParty.filter(matchesDeployment), ...internal]
    }, [activeTab, activeDeployment, aiSubprocessors, coreSubprocessors])

    const tableColumns = useMemo(
        () => [
            { name: 'Subprocessor', align: 'left' as const, width: 'minmax(180px,1.1fr)' },
            { name: 'Nature and purpose of processing', align: 'left' as const, width: 'minmax(220px,1.4fr)' },
            { name: 'Location of processing', align: 'left' as const, width: 'minmax(200px,1.1fr)' },
            { name: 'Additional information', align: 'left' as const, width: 'minmax(220px,1.6fr)' },
        ],
        []
    )

    const tableRows = useMemo(
        () =>
            activeRows.map((subprocessor) => ({
                key: `${subprocessor.type}:${subprocessor.name}`,
                cells: [
                    {
                        content: <span className="font-semibold">{subprocessor.name}</span>,
                    },
                    {
                        content: (
                            <div>
                                <div>{subprocessor.reason}</div>
                                {subprocessor.duration && (
                                    <div className="text-sm opacity-70 mt-1">{subprocessor.duration}</div>
                                )}
                            </div>
                        ),
                    },
                    {
                        content: <div dangerouslySetInnerHTML={{ __html: subprocessor.location }} />,
                    },
                    {
                        content:
                            subprocessor.details.length > 0 ? (
                                <div className="space-y-1">
                                    {subprocessor.details.map((detail, index) => (
                                        <div key={detail}>
                                            <a
                                                href={detail}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title={detail}
                                                className="[overflow-wrap:anywhere]"
                                            >
                                                {detailLabel(detail, index)}
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
                <p className="text-sm opacity-70 m-0">Last updated: June 12, 2026</p>
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

                <p>
                    Use the filters below to show only the Subprocessors that apply to your setup. Select your PostHog
                    Cloud region to hide vendors that do not process your data, and note that AI Subprocessors apply only
                    while AI Features are enabled. The <strong>Additional information</strong> column links to each
                    vendor's own subprocessor list and trust center.
                </p>

                <div className="not-prose mt-6 space-y-3">
                    {activeTab !== 'internal' && (
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold mr-1">Deployment region:</span>
                            {deployments.map((deployment) => (
                                <OSButton
                                    key={deployment.key}
                                    onClick={() => setActiveDeployment(deployment.key)}
                                    active={activeDeployment === deployment.key}
                                    className="border border-primary"
                                >
                                    {deployment.label}
                                </OSButton>
                            ))}
                        </div>
                    )}
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
                        No subprocessors matched your selected category and region.
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
