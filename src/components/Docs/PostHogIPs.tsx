import React from 'react'
import { InlineCode } from 'components/InlineCode'
import { POSTHOG_IPS } from 'constants/posthogIPs'

// Inline form: bold EU/US labels followed by comma-separated inline code chips.
// Uses the InlineCode component so the chips render identically to the markdown
// backticks that were previously hardcoded in posthog-ips.mdx. Renders two
// paragraphs to match the original markdown output.
export const PostHogIPsInline = () => {
    const renderIPs = (ips: string[]) =>
        ips.map((ip, index) => (
            <React.Fragment key={ip}>
                {index > 0 ? ', ' : ''}
                <InlineCode>{ip}</InlineCode>
            </React.Fragment>
        ))

    return (
        <>
            <p>
                <strong>EU</strong>: {renderIPs(POSTHOG_IPS.EU)}
            </p>
            <p>
                <strong>US</strong>: {renderIPs(POSTHOG_IPS.US)}
            </p>
        </>
    )
}

// Table form: US | EU columns. Emits a plain <table> so it inherits the
// `.article-content` prose table styling. Cells are plain text (no code chips)
// to match the markdown table that was previously hardcoded in
// inbound-ip-addresses.mdx.
export const PostHogIPsTable = () => {
    const { US, EU } = POSTHOG_IPS
    const rowCount = Math.max(US.length, EU.length)

    return (
        <table>
            <thead>
                <tr>
                    <th>US</th>
                    <th>EU</th>
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: rowCount }).map((_, index) => (
                    <tr key={index}>
                        <td>{US[index] ?? ''}</td>
                        <td>{EU[index] ?? ''}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
