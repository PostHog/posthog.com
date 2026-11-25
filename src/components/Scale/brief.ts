import { displayLabel } from '../MCPLeaderboard/data'
import { average, formatCount, lines, logBands } from './data'
import type { ScaleData } from './data'

const SITE = 'https://posthog.com'
const STATUS_SITE = 'https://www.posthogstatus.com'
const TERABYTE = 1e12

const percent = (share: number): string => `${(share * 100).toFixed(1)}%`

function latencySection(status: NonNullable<ScaleData['status']>): string {
    const eventLag = Math.round(average(status.eventLag.median))
    const flagResponse = Math.round(average(status.flagResponse.median))
    return `## Latency

US Cloud, the 24 hours before ${status.polledAt}, from the [status page](${STATUS_SITE}).

- Time from ingestion to query visibility: about ${eventLag} seconds (median). Hourly p99 peaked at ${Math.round(
        Math.max(...status.eventLag.p99)
    )} seconds.
- Feature flag evaluation: about ${flagResponse} ms (median). Hourly p99 peaked at ${Math.ceil(
        Math.max(...status.flagResponse.p99)
    )} ms.

`
}

export function buildScaleBrief(data: ScaleData | null): string {
    const header = `# PostHog at scale

> For AI agents. This is the plain version of ${SITE}/scale. The numbers cover one complete UTC day of PostHog Cloud (US and EU) and change when the site deploys. They include PostHog's own organizations.

`
    if (!data) {
        return `${header}The numbers for this page are not available in this build. See ${SITE}/scale.\n`
    }
    const { dayLabel, totals, logBytes, queryDurations, logOrgSizes, mcpClients, status } = data
    const receipt = lines
        .map((line) => `- ${line.item}: ${formatCount(totals[line.key])} (${line.note(data)})`)
        .join('\n')
    const logSizes = logOrgSizes.shares.map((share, band) => `${logBands[band]} lines: ${share}%`).join(', ')
    const clients = mcpClients.map((client) => `- ${displayLabel('client', client.label)}: ${client.share}%`).join('\n')

    return `${header}## ${dayLabel}

${receipt}

## Query speed

Half of ${formatCount(queryDurations.queries)} successful database queries finished in ${
        queryDurations.medianMs
    } ms. ${percent(
        queryDurations.shareUnderOneSecond
    )} finished in under one second. Source: ClickHouse query logs, US and EU.

## Logs

${logOrgSizes.orgs.toLocaleString('en-US')} organizations sent ${formatCount(totals.logs)} log records (${(
        logBytes / TERABYTE
    ).toFixed(1)} TB). Organizations by the number of lines they sent: ${logSizes}.

${status ? latencySection(status) : ''}## MCP tool calls by client

${clients}

## Reliability

The uptime and incidents on the page load live, so they are not in this file.

- Status page: ${STATUS_SITE}
- Uptime per component and region for the last 90 days, and the latest notices, as JSON: ${SITE}/api/scale-status

## Next steps

- Sign up free: https://app.posthog.com/signup
- Enterprise: ${SITE}/enterprise
- Pricing: ${SITE}/pricing.md
`
}
