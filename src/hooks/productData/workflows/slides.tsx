import React from 'react'
import { IconClock, IconDecisionTree, IconPlug, IconSend } from '@posthog/icons'
import { IconEnvelope } from 'components/OSIcons'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { features as f } from './features'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'

/**
 * Key features carousel — restructured from the previous features array only.
 */
export const keyFeatures: CarouselSlide[] = [
    {
        slug: 'workflow-builder',
        label: 'Builder',
        icon: <IconDecisionTree className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-teal',
        layout: 'float',
        heading: f.workflow_builder.headline,
        description: (
            <>
                <p>{f.workflow_builder.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.workflow_builder.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.workflow_builder.images[0].src,
            alt: f.workflow_builder.images[0].alt,
        },
    },
    {
        slug: 'messaging',
        label: 'Messaging',
        icon: <IconEnvelope className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'float',
        heading: f.messaging.headline,
        description: (
            <>
                <p>{f.messaging.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.messaging.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.messaging.images[0].src,
            alt: f.messaging.images[0].alt,
        },
    },
    {
        slug: 'flow-logic',
        label: 'Flow logic',
        icon: <IconClock className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-orange',
        layout: 'float',
        heading: f.flow_logic.headline,
        description: (
            <>
                <p>{f.flow_logic.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.flow_logic.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.flow_logic.images[0].src,
            alt: f.flow_logic.images[0].alt,
        },
    },
    {
        slug: 'channels',
        label: 'Channels',
        icon: <IconSend className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'float',
        heading: f.channels.headline,
        description: (
            <>
                <p>{f.channels.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.channels.features.map((item) => ({
                            label: item.title,
                            description: item.description ?? '',
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.channels.images[0].src,
            alt: f.channels.images[0].alt,
        },
    },
    {
        slug: 'mcp',
        label: 'MCP',
        icon: <IconPlug className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: f.mcp.headline,
        description: (
            <>
                <p>{f.mcp.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.mcp.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                    {f.mcp.children}
                </div>
            </>
        ),
    },
]
