import React from 'react'
import { Button } from 'components/UI/Button'
import { AlertDialog } from 'components/UI/AlertDialog'

const flags = [
    'new-onboarding-flow',
    'billing-v2',
    'replay-mobile-beta',
    'sql-editor-tabs',
    'dark-mode-default',
    'survey-branching',
    'web-vitals-panel',
    'error-grouping-v3',
    'cohort-export',
    'notebook-sql-insights',
    'experiment-holdouts',
    'dashboard-templates',
    'warehouse-joins',
    'batch-exports-hourly',
    'flag-dependencies',
    'max-ai-sidebar',
]

export default function AlertDialogLongContent(): JSX.Element {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger render={<Button />}>Delete stale flags</AlertDialog.Trigger>
            <AlertDialog.Popup>
                <AlertDialog.Header>Delete {flags.length} feature flags?</AlertDialog.Header>
                <AlertDialog.Body>
                    <AlertDialog.Description>
                        These flags had no evaluations in the last 30 days. Code that checks them gets false.
                    </AlertDialog.Description>
                    <ul className="m-0 flex list-none flex-col gap-1.5 p-0 font-code text-[13px]">
                        {flags.map((flag) => (
                            <li key={flag}>{flag}</li>
                        ))}
                    </ul>
                </AlertDialog.Body>
                <AlertDialog.Footer separator>
                    <AlertDialog.Close render={<Button />}>Cancel</AlertDialog.Close>
                    <AlertDialog.Close render={<Button variant="danger" />}>
                        Delete {flags.length} flags
                    </AlertDialog.Close>
                </AlertDialog.Footer>
            </AlertDialog.Popup>
        </AlertDialog.Root>
    )
}
