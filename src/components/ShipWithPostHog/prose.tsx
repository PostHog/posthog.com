import React from 'react'

/**
 * Presentational helpers shared by the report detail view and the copy authored in
 * `inboxData.tsx`. They live in their own module so the data file can import them
 * without importing a component that imports the data file back.
 */

/**
 * Inline code inside detail-view prose – file paths, function names, line numbers.
 *
 * Deliberately quieter than `components/InlineCode`, whose red/yellow tint plus
 * border reads as a link. A paragraph here carries half a dozen of these, and at
 * that density the tinted version turns the summary into a wall of false links.
 */
export const Code = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <code className="rounded border border-primary bg-accent px-1 py-0.5 font-mono text-xs text-primary">
        {children}
    </code>
)
