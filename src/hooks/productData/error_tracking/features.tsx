import React from 'react'
import {
    IconWarning,
    IconBell,
    IconPulse,
    IconList,
    IconPeople,
    IconRewindPlay,
    IconToggle,
    IconPlug,
} from '@posthog/icons'
import MCPInstall from 'components/Products/MCPInstall'

export const features = {
    stack_traces: {
        title: 'Stack traces',
        headline: 'Stack traces',
        description:
            "Get code context automatically with PostHog's server-side libraries, or upload source maps for front-end frameworks",
        icon: <IconWarning />,
        color: 'orange',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_trace_3fc569059c.png',
                alt: 'Stack traces',
                stylize: true,
                shadow: true,
            },
        ],
    },
    alerts: {
        title: 'Alerts',
        headline: 'Alerts',
        description: 'Get notified in real time by email, Slack, or webhook when issues occur',
        icon: <IconBell />,
        color: 'red',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_04_08_at_11_53_54_2x_81605f7812.png',
                alt: 'Alert',
                stylize: true,
                shadow: true,
            },
        ],
    },
    monitor_issues: {
        title: 'Monitor issues',
        headline: 'Monitor issues',
        description: 'Stay on top of issues as they happen based on event triggers, filters, and trends',
        icon: <IconPulse />,
        color: 'orange',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/SCR_20250728_sgre_98426bdbdb.png',
                alt: 'Triage',
                stylize: true,
                shadow: true,
            },
        ],
    },
    manage_organize: {
        title: 'Manage and organize',
        headline: 'Manage and organize',
        description: 'Merge issues, sort by frequency or recency, and group issues with custom rules',
        icon: <IconList />,
        color: 'blue',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_organize_94b4d00ea2.png',
                alt: 'Organize and prioritize',
                stylize: true,
                shadow: true,
            },
        ],
    },
    assign_triage: {
        title: 'Assign and triage',
        headline: 'Assign and triage',
        description: 'Auto-assign issues to individuals or groups',
        icon: <IconPeople />,
        color: 'purple',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_assign_4c9bb9ee60.png',
                alt: 'Assign and triage',
                stylize: true,
                shadow: true,
            },
        ],
    },
    investigate_resolve: {
        title: 'Investigate and resolve',
        headline: 'Investigate and resolve',
        description:
            'Use PostHog session replay to investigate and resolve issues with the complete customer context an agent needs to ship the fix',
        icon: <IconRewindPlay />,
        color: 'yellow',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/error_tracking_session_replay_investigate_da4ee40642.gif',
                alt: 'Investigate and resolve',
                stylize: true,
                shadow: true,
            },
        ],
    },
    target_affected_users: {
        title: 'Target affected users',
        headline: 'Target affected users',
        description: 'Revert feature flag roll out to users who are affected by an issue',
        icon: <IconToggle />,
        color: 'seagreen',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/SCR_20250728_sirw_4622f2f7d0.png',
                alt: 'Target affected users',
                stylize: true,
                shadow: true,
            },
        ],
    },
    mcp: {
        title: 'MCP',
        headline: 'Debug errors from your editor',
        description:
            'Triage issues, inspect stack traces, and generate fixes from Cursor, Claude Code, VS Code, or any MCP-compatible agent.',
        icon: <IconPlug />,
        color: 'blue',
        features: [
            {
                title: 'Inspect error details',
                description: 'Give your agent access to full stack traces, error messages, and relevant metadata.',
            },
            {
                title: 'Reproduce errors',
                description:
                    'Identify failure points and perform root cause analysis using the captured stack trace context.',
            },
            {
                title: 'Debug and create fixes',
                description: 'Prompt your agent to generate code fixes based on the error details.',
            },
            {
                title: 'Update issue status',
                description:
                    'Mark issues as resolved, archived, suppressed, or pending release directly from your code editor.',
            },
        ],
        children: <MCPInstall />,
    },
}
