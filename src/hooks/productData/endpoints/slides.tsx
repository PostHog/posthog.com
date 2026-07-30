import React, { useState } from 'react'
import { IconBrowser, IconChevronDown, IconDashboard, IconPlay, IconTerminal, IconTrends } from '@posthog/icons'
import { AnimatePresence, motion } from 'framer-motion'
import CloudinaryImage from 'components/CloudinaryImage'
import Glow from 'components/Glow'
import EndpointsPlayground, { scenarios } from 'components/Docs/EndpointsPlayground'
import PlatformInstall from 'components/PlatformInstall'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { features as f } from './features'

/**
 * Applications = workflows / ways you show up to the product.
 * Only slides with existing content – more applications need product copy.
 */
const PlaygroundSlideBody = () => {
    const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0].id)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const selectedScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0]

    return (
        <>
            <div className="text-center mb-6">
                <p className="text-lg inline">
                    <span>Create an endpoint for</span>{' '}
                    <span className="relative inline-block">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="inline-flex items-center font-semibold underline"
                        >
                            <span>{selectedScenario.name.toLowerCase()}</span>
                            <IconChevronDown
                                className={`size-6 transition-transform mt-1 ${dropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.1 }}
                                    className="absolute top-full left-0 mt-2 bg-primary border border-primary rounded-md shadow-lg z-50 overflow-hidden min-w-[220px]"
                                >
                                    {scenarios.map((scenario) => (
                                        <button
                                            key={scenario.id}
                                            onClick={() => {
                                                setSelectedScenarioId(scenario.id)
                                                setDropdownOpen(false)
                                            }}
                                            className={`w-full text-left px-3 py-2 hover:bg-accent ${
                                                scenario.id === selectedScenarioId
                                                    ? 'text-red dark:text-yellow'
                                                    : 'text-primary'
                                            }`}
                                        >
                                            <div className="text-sm font-medium">{scenario.name}</div>
                                            <div className="text-xs text-muted">{scenario.description}</div>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </span>
                </p>
            </div>
            <div className="w-full max-w-3xl mx-auto">
                <EndpointsPlayground scenarioId={selectedScenarioId} />
            </div>
        </>
    )
}

export const applications: CarouselSlide[] = [
    {
        slug: 'editor-mcp',
        label: 'Editor / MCP',
        icon: <IconBrowser className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-teal',
        layout: 'stack',
        heading: f.mcp.headline,
        description: (
            <>
                <aside className="my-4 @lg/reader-content:mt-2 @lg/reader-content:float-right max-w-[100%_+_1rem] @lg/reader-content:max-w-[300px] @xl/reader-content:max-w-[360px] @3xl/reader-content:max-w-[440px] @lg/reader-content:ml-8 -mr-4 @2xl/reader-content:-mr-8 @4xl/reader-content:-mr-10">
                    <Glow color="black" intensity="gentle" rounded="lg">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/mcp_example_light_cf355dbe0d.png"
                            className="dark:hidden w-full"
                            imgClassName="w-full"
                        />
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/mcp_example_dark_c535f2d8b4.png"
                            className="hidden dark:inline-block w-full"
                            imgClassName="w-full"
                        />
                    </Glow>
                </aside>
                <p>{f.mcp.description}</p>
                <div className="@container">
                    <LabeledList
                        className="mb-8"
                        items={f.mcp.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                    <PlatformInstall />
                </div>
            </>
        ),
    },
    {
        slug: 'playground',
        label: 'Playground',
        icon: <IconPlay className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'From HogQL to URL',
        description: <PlaygroundSlideBody />,
    },
    // TODO: more applications slides (web app, API client, Desktop, etc.) need product copy
]

export const topFeatures: CarouselSlide[] = [
    {
        slug: 'dashboards',
        label: 'Dashboards',
        icon: <IconDashboard className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-teal',
        layout: 'float',
        heading: f.dashboards.headline,
        description: (
            <>
                <p>{f.dashboards.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.dashboards.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.dashboards.images[0].src,
            alt: f.dashboards.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'feeds',
        label: 'Custom feeds',
        icon: <IconTrends className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'float',
        heading: f.use_cases.headline,
        description: (
            <>
                <p>{f.use_cases.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.use_cases.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.use_cases.images[0].src,
            alt: f.use_cases.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'sql-endpoints',
        label: 'SQL endpoints',
        icon: <IconTerminal className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-seagreen',
        layout: 'stack',
        heading: f.sql_endpoints.headline,
        description: (
            <>
                <p>{f.sql_endpoints.description}</p>
                {f.sql_endpoints.children}
            </>
        ),
    },
]
