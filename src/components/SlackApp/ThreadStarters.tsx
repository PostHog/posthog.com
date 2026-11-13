import React from 'react'
import { IconBell, IconComment, IconFlag, IconTelescope } from '@posthog/icons'
import ThreadDemo, { type Demo } from './ThreadDemo'

// The four ways a thread with PostHog starts. Paul's scout thread is based on his real one. Each thread has a short `title` for analytics. Every number is sample data.
const starters: Demo[] = [
    {
        Icon: IconComment,
        color: 'text-blue',
        title: 'Start: Ask anything',
        label: 'Ask anything, or pull it into a thread',
        detail: 'Tag @PostHog anywhere. It reads the thread, so skip the recap.',
        scene: {
            channel: 'team-surfaces',
            endAt: 7400,
            messages: [
                {
                    from: 'person',
                    at: 600,
                    time: '2:02 PM',
                    name: 'Vojta Bartos',
                    text: 'Suggested replies work in DMs now',
                },
                {
                    from: 'person',
                    at: 1800,
                    time: '2:04 PM',
                    name: 'Cleo Lant',
                    text: 'Nice! Do people click them, or do they type their own replies?',
                },
                {
                    from: 'person',
                    at: 3000,
                    time: '2:04 PM',
                    name: 'Cleo Lant',
                    text: '@PostHog can you check?',
                    reactedAt: 3600,
                },
                {
                    from: 'bot',
                    at: 3600,
                    time: '2:05 PM',
                    blocks: [
                        {
                            at: 4800,
                            type: 'text',
                            text: "@Cleo People click one in 1 of 4 threads that show them. In DMs it's 1 in 3, up from none before Vojta's fix.",
                        },
                    ],
                    replies: { at: 6600, labels: ['Which replies get clicked most?', 'Break it down by team'] },
                },
            ],
            summary:
                'Illustrative thread: Vojta says suggested replies now work in DMs. Cleo asks if people click them, then tags PostHog in the thread. PostHog answers from the context above. All data is sample data.',
        },
    },
    {
        Icon: IconBell,
        color: 'text-yellow',
        title: 'Start: Reply to an alert',
        label: 'Reply to an alert or subscription',
        detail: "Tag @PostHog in a report's thread to ask why the numbers moved.",
        scene: {
            channel: 'marketing-reports',
            endAt: 7600,
            messages: [
                {
                    from: 'bot',
                    at: 600,
                    time: '9:00 AM',
                    blocks: [
                        {
                            at: 600,
                            type: 'insight',
                            label: 'Trends • Last 14 days',
                            title: 'Paid signups by day (last 14 days)',
                            description: 'Signups from paid campaigns, by source.',
                            series: [
                                {
                                    label: 'Google Ads',
                                    values: [42, 45, 44, 47, 46, 43, 48, 46, 45, 49, 47, 44, 46, 24],
                                },
                                { label: 'LinkedIn', values: [12, 14, 13, 15, 13, 14, 12, 15, 14, 13, 15, 14, 13, 14] },
                            ],
                            dates: ['Oct 30', 'Nov 5', 'Nov 12'],
                            subscription: true,
                        },
                    ],
                },
                {
                    from: 'person',
                    at: 2600,
                    time: '9:09 AM',
                    name: 'Natalia Amorim',
                    text: '@PostHog why did Google Ads signups drop yesterday?',
                    reactedAt: 3200,
                },
                {
                    from: 'bot',
                    at: 3200,
                    time: '9:09 AM',
                    blocks: [
                        {
                            at: 4400,
                            type: 'text',
                            text: '@Natalia The search campaign ran out of budget at 10:40 AM yesterday. LinkedIn and every other source are normal.',
                        },
                    ],
                    replies: { at: 6400, labels: ['Show me the campaign', 'Compare with last week'] },
                },
            ],
            summary:
                'Illustrative thread: a daily subscription posts a chart of paid signups by source in a marketing channel. Natalia asks PostHog in its thread why Google Ads signups dropped, and PostHog finds the campaign that ran out of budget. All data is sample data.',
        },
    },
    {
        Icon: IconTelescope,
        color: 'text-red',
        title: 'Start: Reply to a scout report',
        label: 'Reply to a scout report',
        detail: "Reply to a scout's post to change the scout, like when it runs.",
        scene: {
            channel: 'papercuts',
            endAt: 7400,
            messages: [
                {
                    from: 'bot',
                    at: 600,
                    time: '9:00 AM',
                    blocks: [
                        {
                            at: 600,
                            type: 'report',
                            kind: 'scout',
                            label: 'Papercuts PR roundup',
                            title: "This week's open papercut PRs",
                        },
                    ],
                },
                {
                    from: 'person',
                    at: 2600,
                    time: '1:33 PM',
                    name: "Paul D'Ambra",
                    text: "@PostHog the scout that's sending this doesn't need to send it on Saturdays or Sundays",
                    reactedAt: 3200,
                },
                {
                    from: 'bot',
                    at: 3200,
                    time: '1:33 PM',
                    blocks: [
                        {
                            at: 4400,
                            type: 'text',
                            text: "@Paul Done. It now runs on weekdays only, at the same time. That's a settings change, so there's no PR.",
                        },
                    ],
                },
            ],
            summary:
                "Illustrative thread, based on a real one: a scout posts its weekly papercuts roundup on a Saturday. Paul tells PostHog it doesn't need to post on weekends, and PostHog changes the scout's schedule to weekdays only.",
        },
    },
    {
        Icon: IconFlag,
        color: 'text-blue',
        title: 'Start: Reply to a Self-driving report',
        label: 'Reply to a Self-driving report',
        detail: 'One click on the report opens a PR that fixes the problem.',
        scene: {
            channel: 'posthog-inbox',
            endAt: 7800,
            messages: [
                {
                    from: 'bot',
                    at: 600,
                    time: '8:15 AM',
                    blocks: [
                        {
                            at: 600,
                            type: 'report',
                            kind: 'self-driving',
                            label: 'P1 report',
                            title: 'The signup form rejects emails with a plus sign',
                            buttons: ['Fix it, make no mistakes'],
                        },
                    ],
                },
                {
                    from: 'person',
                    at: 2600,
                    time: '8:31 AM',
                    name: 'Vojta Bartos',
                    text: 'Fix it, make no mistakes. Implement this report and open a pull request.',
                    reactedAt: 3200,
                },
                {
                    from: 'bot',
                    at: 3200,
                    time: '8:31 AM',
                    blocks: [
                        {
                            at: 4800,
                            type: 'pr',
                            state: 'opened',
                            repo: 'hogflix/web',
                            number: 2207,
                        },
                        {
                            at: 5200,
                            type: 'text',
                            text: '@Vojta The email check now accepts `+`, and a new test covers it.',
                        },
                    ],
                },
            ],
            summary:
                'Illustrative thread: a Self-driving report says the signup form rejects emails with a plus sign. Vojta clicks the button to fix it, and PostHog opens a draft pull request with a test. All data is sample data.',
        },
    },
]

export default function ThreadStarters(): JSX.Element {
    return <ThreadDemo demos={starters} variant="thread" placement="slack_page_starters" />
}
