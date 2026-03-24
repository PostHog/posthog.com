import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'
import OSTable from 'components/OSTable'
import DuckDBWaitlistSurvey from 'components/DuckDBWaitlistSurvey'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

type DuckDBBenefit = {
    title: string
    description: string
}

const duckDBBenefits: DuckDBBenefit[] = [
    {
        title: 'Exceptionally fast',
        description: 'Parallel query execution, vectorized processing, OLAP storage',
    },
    {
        title: 'Open source',
        description: 'Large extension ecosystem, active community, wide adoption',
    },
    {
        title: 'Amazing developer experience',
        description: 'Easy local prototyping, beautiful query language',
    },
    {
        title: 'Managed DuckLake metadata store',
        description: 'DuckLake catalog for open table format data',
    },
    {
        title: 'Single tenant instances',
        description: 'Dedicated resources, isolated performance, enhanced security',
    },
    {
        title: 'Seamless PostHog integration',
        description: 'Automated (free) data import, optimized schema, built for analytics',
    },
]

export default function ManagedWarehouse(): JSX.Element {
    // Define table columns
    const columns = [
        { name: 'Benefit', width: 'minmax(150px, 1fr)', align: 'left' as const },
        { name: 'Description', width: 'minmax(300px, 2fr)', align: 'left' as const },
        { name: '', width: '60px', align: 'center' as const },
    ]

    // Create table rows from duckDBBenefits
    const benefitRows = duckDBBenefits.map((benefit) => ({
        cells: [
            { content: <span className="font-bold">{benefit.title}</span> },
            { content: benefit.description, className: 'text-sm' },
            { content: '✅', className: 'text-xl' },
        ],
    }))

    return (
        <>
            <SEO
                title="Managed DuckDB warehouse - PostHog data stack"
                description="Learn about our managed warehouse solution powered by DuckDB"
                image="images/og/cdp.jpg"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Managed DuckDB warehouse">
                <p>
                    <Link to="https://duckdb.org/" external={true}>
                        DuckDB
                    </Link>{' '}
                    is <span className="italic">all the rage</span>. And we make it incredibly easy to start using it
                    for your analytics workloads.
                </p>
                <div className="dark:bg-dark bg-accent border border-input p-4 rounded">
                    <p className="!mt-0">
                        <strong>Note:</strong> PostHog managed DuckDB warehouse is in{' '}
                        <span className="rounded-sm bg-highlight py-0.5 px-1 text-xs font-bold text-red dark:text-yellow">
                            Beta
                        </span>
                        . Join the waitlist to get early access.
                    </p>
                    <div className="max-w-md">
                        <DuckDBWaitlistSurvey />
                    </div>
                </div>
                <p>
                    Each warehouse customer receives a <span className="font-bold">dedicated data store</span> and
                    flexible compute, managed by PostHog. This means you get the performance, reliability, and
                    simplicity of a DuckDB-powered warehouse without the operational overhead.
                </p>
                <p>
                    And it's not a locked box, either. We give you the credentials so you have{' '}
                    <span className="font-bold">direct access to your data</span>, which means you can bring your
                    favorite tools for BI, modeling, and more. Or, use our built-in tools to get started quickly.
                </p>
                <h2>All your PostHog data, loaded in for free</h2>
                <p>
                    We automatically import all your PostHog data (events, persons, groups, etc) into your DuckDB
                    warehouse, so it's ready for side-by-side analysis with your other business data.
                </p>
                <p>This import is free - which means zero cost to move your largest and most expensive data around.</p>

                <h2>Why DuckDB?</h2>
                <OSTable columns={columns} rows={benefitRows} editable={false} />
            </ReaderView>
        </>
    )
}
