import React from 'react'
import { IconClock, IconDecisionTree, IconMessage, IconPlug, IconSend } from '@posthog/icons'
import { IconEnvelope, IconLink, IconMessages } from 'components/OSIcons'
import MCPInstall from 'components/Products/MCPInstall'

/**
 * Feature content reshaped from the previous workflows.tsx features array.
 * MCP bullets reshaped from contents/docs/workflows/surfaces/mcp.mdx
 * ("What you can do here") – no invented blurbs.
 */
export const features = {
    workflow_builder: {
        title: 'Workflow automation builder',
        headline: 'Workflow automation builder',
        description: 'No YAML, no syncing, no API juggling.',
        icon: <IconDecisionTree />,
        color: 'teal',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Group_10157_1_3d5bffb9a5.png',
                alt: 'Workflow automation builder',
            },
        ],
        features: [
            {
                title: 'Drag-and-drop steps',
                description: 'Build onboarding, activation, and retention flows in minutes',
            },
            {
                title: 'Event and cohort triggers',
                description: 'Start workflows from real product behavior',
            },
            {
                title: 'Data-native',
                description: 'Use the events, actions, and properties already tracked in PostHog',
            },
            {
                title: 'Testing & execution logs',
                description: 'Preview how a workflow behaves for a real user and view detailed run history',
            },
        ],
    },
    messaging: {
        title: 'Behavior-triggered messaging',
        headline: 'Behavior-triggered messaging',
        description: 'Send emails, Slack posts, or webhook messages based on product activity.',
        icon: <IconEnvelope />,
        color: 'blue',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Group_10158_1_5b25e98912.png',
                alt: 'Behavior-triggered messaging',
            },
        ],
        features: [
            {
                title: 'Built-in email editor',
                description: 'Create onboarding, activation, and transactional emails directly in PostHog',
            },
            {
                title: 'Behavior-triggered delivery',
                description: 'Messages fire the moment users perform key actions',
            },
            {
                title: 'Cohort & property personalization',
                description: 'Tailor content using user properties, segments, and experiment variants',
            },
            {
                title: 'Unified with your product data',
                description: 'No syncing, all context comes from PostHog natively',
            },
        ],
    },
    flow_logic: {
        title: 'Flow logic & timing controls',
        headline: 'Flow logic & timing controls',
        description: 'Shape user journeys with conditions, splits, delays, and lifecycle-based steps.',
        icon: <IconClock />,
        color: 'orange',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Group_10159_1_2ff0d42149.png',
                alt: 'Flow logic & timing controls',
            },
        ],
        features: [
            {
                title: 'Smart branching',
                description: 'Route users with conditions based on properties, events, or random splits',
            },
            {
                title: 'Precise timing',
                description: 'Add delays or scheduled waits to build multi-step journeys',
            },
            {
                title: 'Conditional waits',
                description: 'Continue only when a user completes a specific action',
            },
            {
                title: 'Step-level error handling',
                description: 'Build resilient automations with fallback paths',
            },
        ],
    },
    channels: {
        title: 'Channels',
        headline: 'Channels',
        description:
            'Reach users wherever they are. Pick from the standard channels or connect to one of the 35+ integrations (and counting) that we have.',
        icon: <IconSend />,
        color: 'purple',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_channels_2_1f26ef04dd.png',
                alt: 'Channels',
            },
        ],
        features: [
            {
                icon: <IconEnvelope />,
                title: 'Email',
            },
            {
                icon: <IconMessage />,
                title: 'SMS',
            },
            {
                icon: <IconMessages />,
                title: 'Slack',
            },
            {
                icon: <IconLink />,
                title: 'Webhook',
            },
            {
                icon: <IconPlug />,
                title: '35+ integrations',
                description: 'ClickUp, Discord, GitHub, GitLab, Google Ads, Google Cloud Storage, and more',
            },
        ],
    },
    // Reshaped from contents/docs/workflows/surfaces/mcp.mdx ("What you can do here").
    mcp: {
        title: 'MCP',
        // Headline/description reshaped from contents/docs/workflows/surfaces/mcp.mdx
        headline: 'Build and ship a workflow without leaving your editor',
        description:
            'Create a draft, edit its graph, test it, publish it, and read its stats and logs from Claude Code, Cursor, and other AI tools.',
        icon: <IconPlug />,
        color: 'blue',
        features: [
            {
                title: 'Create and edit workflows',
                description:
                    'workflows-create makes a draft; workflows-patch-graph and workflows-update change it; workflows-discard-draft throws the draft away.',
            },
            {
                title: 'Test and publish',
                description:
                    'workflows-test-run runs a workflow without sending to real recipients; workflows-publish makes the draft live.',
            },
            {
                title: 'Debug a run',
                description:
                    'workflows-list-invocations, workflows-get-invocation, workflows-logs, and workflows-list-batch-jobs show what happened on a given run.',
            },
            {
                title: 'Check performance',
                description: 'workflows-stats reports on one workflow and workflows-global-stats across all of them.',
            },
        ],
        children: <MCPInstall />,
    },
}
