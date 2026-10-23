import React from 'react'
import { Button } from 'components/UI/Button'
import { Dialog } from 'components/UI/Dialog'

const releases = [
    {
        date: 'Oct 14',
        title: 'SQL insights in notebooks',
        body: 'Add a SQL insight to a notebook and edit it in place.',
    },
    { date: 'Oct 10', title: 'Replay filters', body: 'Filter recordings by console errors and network requests.' },
    { date: 'Oct 7', title: 'Flag dependencies', body: 'A feature flag can now depend on another flag.' },
    { date: 'Oct 3', title: 'Survey branching', body: 'Send each respondent to a different question.' },
    { date: 'Sep 30', title: 'Web vitals', body: 'Track LCP, INP, and CLS for each page in web analytics.' },
    { date: 'Sep 26', title: 'Error grouping', body: 'Merge two issues into one in error tracking.' },
    { date: 'Sep 22', title: 'Cohort exports', body: 'Export a cohort as a CSV file.' },
    { date: 'Sep 18', title: 'Experiment holdouts', body: 'Keep a group of users out of every experiment.' },
    { date: 'Sep 15', title: 'Dashboard templates', body: 'Start a dashboard from a template for your product type.' },
    { date: 'Sep 11', title: 'Data warehouse joins', body: 'Join Stripe and HubSpot data to your events.' },
    { date: 'Sep 8', title: 'Mobile replay', body: 'Record sessions in React Native and Flutter apps.' },
    { date: 'Sep 4', title: 'Batch exports', body: 'Send events to S3, BigQuery, and Snowflake every hour.' },
]

export default function DialogLongContent(): JSX.Element {
    return (
        <Dialog.Root>
            <Dialog.Trigger render={<Button />}>Show changelog</Dialog.Trigger>
            <Dialog.Popup>
                <Dialog.Header>Changelog</Dialog.Header>
                <Dialog.Body>
                    <Dialog.Description>The newest release is at the top.</Dialog.Description>
                    <ul className="m-0 flex list-none flex-col gap-3 p-0">
                        {releases.map((release) => (
                            <li key={release.title} className="grid grid-cols-[3.5rem_1fr] gap-x-3 text-sm">
                                <span className="tabular-nums text-muted">{release.date}</span>
                                <span>
                                    <strong className="block font-semibold">{release.title}</strong>
                                    <span className="text-secondary">{release.body}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </Dialog.Body>
                <Dialog.Footer separator>
                    <Dialog.Close render={<Button variant="secondary" />}>Done</Dialog.Close>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog.Root>
    )
}
