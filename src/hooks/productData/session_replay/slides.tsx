import React from 'react'
import { IconBrowser, IconCode, IconExpand, IconList, IconPlaylist, IconRecord, IconSearch } from '@posthog/icons'
import CodeBlock from 'components/Home/CodeBlock'
import CloudinaryImage from 'components/CloudinaryImage'
import Glow from 'components/Glow'
import OSTable from 'components/OSTable'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { features as f } from './features'
import { LabeledList, FilterTag, InlineCode } from 'components/Products/ReaderViewProduct/helpers'
import PlatformInstall from 'components/PlatformInstall'

export const applications: CarouselSlide[] = [
    {
        slug: 'research',
        label: 'Editor / MCP',
        icon: <IconBrowser className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Debug or research without leaving your product editor',
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
                <p>
                    PostHog AI can find, watch, and summarize session recordings and you can do it from Cursor, Claude
                    Code, VS Code, or any MCP-compatible agent.
                </p>

                <div className="@container">
                    <LabeledList
                        className="mb-8"
                        items={[
                            {
                                label: 'Investigate bug reports',
                                description:
                                    'Find session replays where users encountered errors to feed your agent with context.',
                            },
                            {
                                label: 'Research before coding',
                                description: 'Summarize current user behavior before making code changes.',
                            },
                            {
                                label: 'Validate after deploying',
                                description: 'Monitor how users interact with newly deployed updates.',
                            },
                            {
                                label: 'Search session recordings',
                                description:
                                    'Filter recordings by events, user properties, time ranges, and specific user behaviors.',
                            },
                        ]}
                    />
                    <PlatformInstall />
                </div>
            </>
        ),
    },
    {
        slug: 'filter',
        label: 'Search',
        icon: <IconSearch className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Find something specific',
        description: (
            <>
                <p>You can search for sessions based on specific filtering criteria like a user's:</p>
                <aside>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/detective_01aca25481.png"
                        className="float-right w-36 @xl/reader-content:w-48 ml-8 @4xl/reader-content:w-60 @4xl/reader-content:-mt-16"
                    />
                </aside>
                <div className="@container max-w-6xl">
                    <LabeledList
                        items={[
                            { label: 'Activity data', description: 'Page views, clicks, scrolls, form submissions' },
                            { label: 'Session data', description: 'Device type, browser, OS' },
                            { label: 'Personal properties', description: 'Email address, initial UTM source' },
                            {
                                label: 'Errors',
                                description: 'JavaScript errors, network failures, captured exceptions',
                            },
                            {
                                label: 'Custom event properties',
                                description: 'Plan name, organization name, tier, etc.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: 'filters',
    },
    {
        slug: 'explore',
        label: 'Browse',
        icon: <IconPlaylist className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'Browse recent sessions',
        description: (
            <>
                <p>
                    Crack open the PostHog Session Replay app and you'll see a list of recent sessions. Click through
                    them like you're watching TV. Scrub around to look for interesting points in the timeline.
                </p>
                <p>
                    Save any filter criteria as a playlist that automatically updates with new sessions as they meet the
                    criteria.
                </p>
            </>
        ),
        image: {
            ref: 'recordings',
            maxWidth: 'max-w-none',
            containerClassName: 'pb-0 leading-[0]',
            imgClassName: 'border-b-0 rounded-b-none',
        },
    },
]

export const topFeatures: CarouselSlide[] = [
    {
        slug: 'event-timeline',
        label: 'Event timeline',
        icon: <IconList className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'float',
        heading: f.event_timeline.headline,
        description: (
            <>
                <p>
                    Scrub through an activity log of a user's session to jump directly to parts you want to watch. The
                    timeline shows you a full list of autocapture events (like page views, clicks, scrolling activity),
                    custom events, form interactions, and errors the user may have encountered during their session.
                </p>
                <ul className="space-y-4 mb-4">
                    <li>
                        <strong>{f.event_properties.title}</strong>
                        <br /> {f.event_properties.description}
                    </li>
                    <li>
                        <strong>{f.error_details.title}</strong>
                        <br /> {f.error_details.description}
                    </li>
                    <li>
                        <strong>{f.web_vitals.title}</strong>
                        <br /> {f.web_vitals.description}
                    </li>
                </ul>
                <p>
                    Click on any row to jump to that point in the session, or click{' '}
                    <span className="inline-block">
                        the
                        <IconExpand className="size-5 inline-block" aria-label="Expand" /> icon
                    </span>{' '}
                    view the associated metadata.
                </p>
            </>
        ),
        image: { ref: 'overview', glow: true },
    },
    {
        slug: 'analyze-behavior',
        label: 'Analyze behavior',
        icon: <IconSearch className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: "See when users did (or didn't do) almost anything",
        description: (
            <>
                <p>
                    Powerful filters let you find behavior you can use to improve your product. Aside from searching by
                    event data or properties, you can also get "frustration signals" from built-in PostHog events like
                    rage clicks, dead clicks, and errors.
                </p>
                <p>
                    And you don't need to remember the syntax for your filters – you can use natural language with
                    PostHog AI (or with our MCP) to describe the behavior you're looking for.
                </p>
                <p>Here are some examples of what you can find:</p>
                {/* <ul className="space-y-4 my-4">
                    <li>
                        <strong>{f.event_filters.title}</strong>
                        <br /> {f.event_filters.description}
                    </li>
                    <li>
                        <strong>{f.person_properties.title}</strong>
                        <br /> {f.person_properties.description}
                    </li>
                    <li>
                        <strong>{f.frustration_signals.title}</strong>
                        <br /> {f.frustration_signals.description}
                    </li>
                    <li>
                        <strong>{f.ai_search.title}</strong>
                        <br /> {f.ai_search.description}
                    </li>
                </ul> */}

                <OSTable
                    columns={[
                        { name: 'User behavior', width: 'minmax(200px,1fr)', align: 'left' },
                        { name: 'Filter criteria', width: 'minmax(220px,1fr)', align: 'left' },
                    ]}
                    rows={[
                        {
                            cells: [
                                {
                                    content: (
                                        <>
                                            <div>Users who signed up but never got started</div>
                                            <FilterTag>Events (inclusion + exclusion)</FilterTag>
                                        </>
                                    ),
                                },
                                {
                                    content: (
                                        <>
                                            Did <InlineCode>signup_completed</InlineCode>, skipped{' '}
                                            <InlineCode>project_created</InlineCode>
                                        </>
                                    ),
                                },
                            ],
                        },
                        {
                            cells: [
                                {
                                    content: (
                                        <>
                                            <div>Users who bailed before checkout</div>
                                            <FilterTag>Events + URL</FilterTag>
                                        </>
                                    ),
                                },
                                {
                                    content: (
                                        <>
                                            Visited <InlineCode>/checkout</InlineCode>, never hit{' '}
                                            <InlineCode>purchase_completed</InlineCode>
                                        </>
                                    ),
                                },
                            ],
                        },
                        {
                            cells: [
                                {
                                    content: (
                                        <>
                                            <div>Frustration on a specific page</div>
                                            <FilterTag>Frustration signal + URL</FilterTag>
                                        </>
                                    ),
                                },
                                {
                                    content: (
                                        <>
                                            Rage clicks {'>'} 0 on <InlineCode>/pricing</InlineCode>
                                        </>
                                    ),
                                },
                            ],
                        },
                        {
                            cells: [
                                {
                                    content: (
                                        <>
                                            <div>What one specific customer is doing</div>
                                            <FilterTag>Person property</FilterTag>
                                        </>
                                    ),
                                },
                                {
                                    content: (
                                        <>
                                            Email matches <InlineCode>@acme.com</InlineCode>
                                        </>
                                    ),
                                },
                            ],
                        },
                        {
                            cells: [
                                {
                                    content: (
                                        <>
                                            <div>How enterprise users behaved this week</div>
                                            <FilterTag>Person property + date</FilterTag>
                                        </>
                                    ),
                                },
                                {
                                    content: (
                                        <>
                                            Plan = <InlineCode>enterprise</InlineCode>, last 7 days
                                        </>
                                    ),
                                },
                            ],
                        },
                        {
                            cells: [
                                {
                                    content: (
                                        <>
                                            <div>Sessions where someone hit a JS error</div>
                                            <FilterTag>Console logs</FilterTag>
                                        </>
                                    ),
                                },
                                {
                                    content: (
                                        <>
                                            Console level = <InlineCode>error</InlineCode>
                                        </>
                                    ),
                                },
                            ],
                        },
                        {
                            cells: [
                                {
                                    content: (
                                        <>
                                            <div>iOS users on slow connections</div>
                                            <FilterTag>Device + performance</FilterTag>
                                        </>
                                    ),
                                },
                                {
                                    content: (
                                        <>
                                            OS = <InlineCode>iOS</InlineCode>, FCP {'>'} 3s
                                        </>
                                    ),
                                },
                            ],
                        },
                        {
                            cells: [
                                {
                                    content: (
                                        <>
                                            <div>Who saw a specific A/B test variant</div>
                                            <FilterTag>Feature flag</FilterTag>
                                        </>
                                    ),
                                },
                                {
                                    content: (
                                        <>
                                            Flag <InlineCode>pricing-test</InlineCode> ={' '}
                                            <InlineCode>variant_b</InlineCode>
                                        </>
                                    ),
                                },
                            ],
                        },
                    ]}
                    size="sm"
                    rowAlignment="top"
                    width="full"
                />

                <p>
                    Once you've found interesting behavior, you can save a set of filters as a dynamic playlist that
                    automatically updates as new sessions are recorded.
                </p>
            </>
        ),
    },
    {
        slug: 'technical-context',
        label: 'Technical context',
        icon: <IconCode className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'stack',
        heading: f.technical_context.headline,
        description: (
            <>
                <p>{f.technical_context.description}</p>
                <div className="@container">
                    <LabeledList
                        columns={[1, 3]}
                        items={[
                            { label: f.network_monitor.title, description: f.network_monitor.description },
                            { label: f.console_logs.title, description: f.console_logs.description },
                            { label: f.dom_explorer.title, description: f.dom_explorer.description },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            ref: 'technical-context',
            maxWidth: 'max-w-none',
            srcMobileBreakpoint: '3xl',
            frameless: true,
            framePadding: '@3xl/reader-content:pt-4 @3xl/reader-content:px-4',
            containerClassName:
                '@3xl/reader-content:bg-tan dark:@3xl/reader-content:bg-dark @3xl/reader-content:border-t @3xl/reader-content:border-primary pb-0 leading-[0]',
            imgClassName: 'w-full !border-0 !rounded-none',
        },
    },
    {
        slug: 'recording-rules',
        label: 'Recording rules',
        icon: <IconRecord className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Limit recordings based on your needs',
        description: (
            <>
                <p>
                    You can opt to record every session, or only capture sessions that meet certain criteria, like when
                    an error is triggered, or based on a user's enrollment in an experiment or feature flag.
                </p>
                <p>
                    Recording rules are useful for apps with sensitive data or legal requirements, as well as for cost
                    management.
                </p>
                <div className="@container my-8">
                    <h3 className="mb-4">Recording rules</h3>
                    <LabeledList
                        columns={[1, 3]}
                        items={[
                            { label: f.sampling.title, description: f.sampling.description },
                            { label: f.url_event_triggers.title, description: f.url_event_triggers.description },
                            {
                                label: f.feature_flag_targeting.title,
                                description: f.feature_flag_targeting.description,
                            },
                            { label: f.privacy_masking.title, description: f.privacy_masking.description },
                        ]}
                    />
                </div>
                <p>
                    You can also disable recording by default and conditionally enable it in code when conditions are
                    met:
                </p>
                <CodeBlock
                    code={f.recording_rules.codeExample}
                    language="js"
                    hideNumbers={undefined}
                    lineNumberStart={undefined}
                    tooltips={undefined}
                />
            </>
        ),
    },
]
