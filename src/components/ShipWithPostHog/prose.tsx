import React from 'react'
import Tooltip from 'components/RadixUI/Tooltip'

/**
 * Presentational helpers shared by the report detail view and the copy authored in
 * `inboxData.tsx`. They live in their own module so the data file can import them
 * without importing a component that imports the data file back.
 */

/**
 * Inline code inside detail-view prose – file paths, function names, line numbers.
 *
 * Plain monospace, no pill: the app renders these as prose, and at the density this
 * copy reaches (half a dozen per paragraph) bordered, tinted chips turn the summary
 * into a wall of boxes.
 *
 * The overrides have to be `!`-prefixed and exhaustive because `global.css` styles the
 * bare `code` element with a border, background, padding and `inline-block` – dropping
 * classes here doesn't help, the element is styled globally. `inline` matters as much
 * as the border: `inline-block` on a mid-sentence span pushes the line height around.
 */
export const Code = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <code className="!inline !border-0 !bg-transparent !px-0 !py-0 text-primary">{children}</code>
)

/**
 * A hover annotation. Wraps the shared Tooltip purely to cap its width – these explain
 * the loop rather than label a control, so they run a sentence or two and would
 * otherwise render as one very long line.
 *
 * The overrides are `!`-prefixed on purpose: Tooltip's own content class sets
 * `max-w-full` and `leading-none`, and appending a plain `max-w-sm` just leaves two
 * competing utilities in the same layer with the winner decided by stylesheet order.
 */
export const Hint = ({ trigger, children }: { trigger: React.ReactNode; children: React.ReactNode }): JSX.Element => (
    <Tooltip trigger={trigger} contentClassName="!max-w-sm !text-sm !leading-snug">
        {children}
    </Tooltip>
)
