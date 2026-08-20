import React from 'react'
import Link from 'components/shared/ui/Link'
import {
    IconBrackets,
    IconDatabase,
    IconDecisionTree,
    IconDownload,
    IconGraph,
    IconNotebook,
    IconShuffle,
    IconSparkles,
    IconTerminal,
    IconUpload,
} from '@posthog/icons'

type IconComponent = React.ComponentType<{ className?: string }>

const catalogSections: {
    title: string
    items: { name: string; description: string; url: string; Icon: IconComponent; iconColor: string }[]
}[] = [
    {
        title: 'Data Sources',
        items: [
            {
                name: 'Sources & Import (ELT)',
                description:
                    'Regularly sync or bulk import data into your warehouse from databases, ad platforms, SaaS tools, and more.',
                url: '/context-warehouse/sources',
                Icon: IconDownload,
                iconColor: 'text-blue',
            },
            {
                name: 'Managed Warehouse',
                description:
                    'Store, query, and join your product and business data in one place without maintaining any infrastructure.',
                url: '/context-warehouse/managed-warehouse',
                Icon: IconDatabase,
                iconColor: 'text-purple',
            },
            {
                name: 'CDP',
                description:
                    'Ingest, transform, and route data between PostHog and the rest of your stack in real time.',
                url: '/cdp',
                Icon: IconShuffle,
                iconColor: 'text-red',
            },
            {
                name: 'Batch Exports',
                description: 'Send PostHog data to your existing warehouse or data lake on a schedule you control.',
                url: '/context-warehouse/reverse-etl-export',
                Icon: IconUpload,
                iconColor: 'text-green',
            },
        ],
    },
    {
        title: 'Data Modeling',
        items: [
            {
                name: 'Models',
                description:
                    'Define your metrics to keep them consistent across PostHog products, update them on a schedule.',
                url: '/context-warehouse/data-modeling',
                Icon: IconDecisionTree,
                iconColor: 'text-blue',
            },
            {
                name: 'Endpoints',
                description: 'Take any insight or SQL query and expose it as a stable API endpoint.',
                url: '/docs/api/endpoints',
                Icon: IconBrackets,
                iconColor: 'text-purple',
            },
        ],
    },
    {
        title: 'Data Tools',
        items: [
            {
                name: 'PostHog AI',
                description:
                    'Ask questions about your data in plain English. Generates SQL, builds dashboards, and surfaces insights.',
                url: '/context-warehouse/posthog-ai',
                Icon: IconSparkles,
                iconColor: 'text-red',
            },
            {
                name: 'SQL Editor',
                description:
                    'Write and run HogQL or standard SQL directly against your data. For when you know exactly what you want and just need to ask for it properly.',
                url: '/context-warehouse/sql-editor',
                Icon: IconTerminal,
                iconColor: 'text-green',
            },
            {
                name: 'Notebooks',
                description:
                    "Combine insights, replays, flags, experiment results, and SQL into a single document. For when your analysis has a story and a dashboard isn't the right way to tell it.",
                url: '/docs/notebooks',
                Icon: IconNotebook,
                iconColor: 'text-blue',
            },
            {
                name: 'Reverse ETL',
                description:
                    'Send data back to the tools that need it. Keep your CRM, support tools, and marketing platforms in sync.',
                url: '/context-warehouse/reverse-etl-export',
                Icon: IconShuffle,
                iconColor: 'text-purple',
            },
            {
                name: 'Business Intelligence',
                description: 'Visualize your data with interactive dashboards and ad-hoc analyses right in PostHog.',
                url: '/context-warehouse/business-intelligence',
                Icon: IconGraph,
                iconColor: 'text-orange',
            },
        ],
    },
]

type CatalogItem = (typeof catalogSections)[number]['items'][number]

const CatalogItemBody = ({ name, description, Icon, iconColor }: CatalogItem) => (
    <>
        <p className="m-0 flex items-center gap-2 text-base font-bold text-primary group-hover:underline">
            <Icon className={`size-5 shrink-0 ${iconColor}`} />
            {name}
        </p>
        <p className="m-0 mt-1.5 text-sm text-secondary">{description}</p>
    </>
)

/**
 * Layered catalog of context warehouse capabilities (sources, modeling, tools).
 * Shared by `/data-stack` and `/self-driving`.
 *
 * One object rather than three cards: each category is a shaded strip over its own items,
 * so the catalog reads as a single stack of layers. Within a layer the 1px grid gap lets
 * the grid's background show through as the rule between items, and an odd last item spans
 * the row so there's no empty cell for that colour to pool in.
 */
export const CatalogLayers = (): JSX.Element => (
    <div className="not-prose overflow-hidden rounded-md border border-primary shadow-sm">
        {catalogSections.map((section) => (
            <React.Fragment key={section.title}>
                <p className="m-0 border-y border-primary bg-accent px-4 py-2 text-sm font-bold uppercase tracking-wide text-secondary first:border-t-0">
                    {section.title}
                </p>
                <div className="grid grid-cols-1 gap-px bg-border @xl/reader-content:grid-cols-2">
                    {section.items.map((item, index) => (
                        <Link
                            key={item.name}
                            to={item.url}
                            state={{ newWindow: true }}
                            // Link puts className on the anchor and wraps it in a context-menu
                            // element, so the column span has to go on that wrapper instead.
                            wrapperClassName={
                                index === section.items.length - 1 && section.items.length % 2 === 1
                                    ? '@xl/reader-content:col-span-2'
                                    : ''
                            }
                            className="group flex min-h-full flex-col bg-primary p-4 transition-colors duration-150 hover:bg-accent"
                        >
                            <CatalogItemBody {...item} />
                        </Link>
                    ))}
                </div>
            </React.Fragment>
        ))}
    </div>
)

export default CatalogLayers
