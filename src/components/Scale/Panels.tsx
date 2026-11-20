import React, { useEffect, useRef, useState } from 'react'
import { IconArrowRight } from '@posthog/icons'
import Link from 'components/Link'
import { LineChart } from 'components/UI/Chart'
import { Skeleton } from 'components/UI/Skeleton'
import { IconButton } from 'components/UI/Button'
import { Badge } from 'components/UI/Badge'
import { Card } from 'components/UI/Card'
import type { ColorName } from 'components/UI/colors'
import { Emphasis } from 'components/UI/Emphasis'
import BrandLogo from 'components/MCPLeaderboard/BrandLogo'
import { ShareBars } from 'components/MCPLeaderboard/charts'
import { clientMaker, displayLabel } from 'components/MCPLeaderboard/data'
import {
    commitParts,
    repositoryLabel,
    timeAgo,
    titleSummary,
    useSelfDrivingFeed,
} from 'components/Home/DataStory/SelfDrive/useSelfDrivingFeed'
import { formatCount, inSentence, lineByKey, useScaleData } from './data'
import type { LineKey } from './data'
import { PANEL_ID, tabId } from './Receipt'
import './panels.css'

const PULL_REQUESTS_SHOWN = 5

const placeholderRows = Array.from({ length: PULL_REQUESTS_SHOWN }, (_, row) => row)

const STATUS_PAGE_URL = 'https://www.posthogstatus.com'

function SourceLink({ to, children }: { to: string; children: React.ReactNode }): JSX.Element {
    return (
        <Link
            to={to}
            externalNoIcon
            className="text-secondary underline decoration-dotted underline-offset-2 hover:decoration-solid"
        >
            {children}
        </Link>
    )
}

function PanelHeader({ title, children }: { title: string; children?: React.ReactNode }): JSX.Element {
    return (
        <header className="flex flex-col gap-1">
            <h3 className="m-0 text-lg font-bold">{title}</h3>
            {children && <p className="m-0 text-sm text-secondary">{children}</p>}
        </header>
    )
}

const BINS_PER_DECADE = 10
const AXIS_START_MS = 10
const ONE_SECOND_BAR = 1 + BINS_PER_DECADE * 2
const BAR_STAGGER_MS = 12

function barTone(bar: number): string {
    if (bar === 0) {
        return 'bg-[color:color-mix(in_srgb,var(--scale-accent)_30%,transparent)] bg-hatch'
    }
    return bar < ONE_SECOND_BAR
        ? 'bg-[color:var(--scale-accent)]'
        : 'bg-[color:color-mix(in_srgb,var(--scale-accent)_35%,transparent)]'
}
const durationTicks = [
    { ms: 100, label: '100 ms' },
    { ms: 1000, label: '1 s' },
    { ms: 10_000, label: '10 s' },
    { ms: 100_000, label: '100 s' },
]

function durationPosition(ms: number, bars: number): string {
    const bar = 1 + BINS_PER_DECADE * Math.log10(ms / AXIS_START_MS)
    return `${(bar / bars) * 100}%`
}

function RowsReadPanel(): JSX.Element {
    const { dayLabel, relativeDay, queryDurations } = useScaleData()
    const { queries, medianMs, shareUnderOneSecond: underOneSecond, counts } = queryDurations
    const tallest = Math.max(...counts)
    return (
        <div className="flex h-full flex-col gap-4">
            <PanelHeader title={`Half of ${formatCount(queries)} queries finished in ${medianMs}\u00a0ms`}>
                Every database query we ran {inSentence(relativeDay)}, sorted by how long it took.{' '}
                {Math.round(underOneSecond * 10)} in 10 finished in under a second.
            </PanelHeader>
            <div
                role="img"
                aria-label={`Histogram of query time: median ${medianMs} ms, ${(underOneSecond * 100).toFixed(
                    1
                )}% under 1 second`}
                className="flex min-h-48 flex-1 flex-col"
            >
                <div className="relative flex-1">
                    <span
                        className="absolute inset-y-0 left-0 rounded-t bg-[rgb(var(--text-primary)/0.04)] px-2 py-1.5 text-xs text-secondary"
                        style={{ width: durationPosition(1000, counts.length) }}
                    >
                        {(underOneSecond * 100).toFixed(1)}% in under 1 s
                    </span>
                    <span
                        className="absolute bottom-0 top-8 border-l border-[rgb(var(--text-primary)/0.6)] pl-1.5 text-xs font-semibold"
                        style={{ left: durationPosition(medianMs, counts.length) }}
                    >
                        median {medianMs} ms
                    </span>
                    <div className="absolute inset-x-0 bottom-0 top-14 flex items-end gap-px">
                        {counts.map((count, bar) => (
                            <span
                                key={bar}
                                className={`scale-bar flex-1 rounded-t-[1px] ${barTone(bar)}`}
                                style={{
                                    height: `${(count / tallest) * 100}%`,
                                    animationDelay: `${bar * BAR_STAGGER_MS}ms`,
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div aria-hidden className="relative mt-2 h-4 border-t border-primary font-code text-xs text-secondary">
                    <span className="absolute left-0 top-1">&lt;10 ms</span>
                    {durationTicks.map((tick) => (
                        <span
                            key={tick.ms}
                            className={`absolute top-1 whitespace-nowrap ${
                                tick === durationTicks[durationTicks.length - 1]
                                    ? '-translate-x-full'
                                    : '-translate-x-1/2'
                            }`}
                            style={{ left: durationPosition(tick.ms, counts.length) }}
                        >
                            {tick.label}
                        </span>
                    ))}
                </div>
            </div>
            <p className="m-0 mt-2 text-xs text-secondary">
                ClickHouse query logs, US and EU, {dayLabel}. Includes background jobs and our own queries.
            </p>
        </div>
    )
}

const BAR_HEADROOM = 85
const COLUMN_STAGGER_MS = 60
const logBands = ['Under 100', '100–1K', '1K–10K', '10K–100K', '100K–1M', '1M+']

function LogsPanel(): JSX.Element {
    const { relativeDay, logOrgSizes } = useScaleData()
    const sizes = logOrgSizes.shares.map((share, band) => ({ label: logBands[band], share }))
    const tallest = Math.max(...logOrgSizes.shares)
    return (
        <div className="flex h-full flex-col gap-5">
            <PanelHeader title="Logs from teams of every size">
                {logOrgSizes.orgs.toLocaleString('en-US')} organizations sent us logs {inSentence(relativeDay)}. This is
                how many lines each one sent.
            </PanelHeader>
            <ol className="m-0 grid min-h-48 flex-1 list-none grid-cols-6 gap-2 p-0 @lg:gap-4">
                {sizes.map((size, column) => (
                    <li key={size.label} className="m-0 flex h-full flex-col gap-2">
                        <span className="relative flex-1">
                            <span
                                className="absolute inset-x-0 bottom-0"
                                style={{ height: `${(size.share / tallest) * BAR_HEADROOM}%` }}
                            >
                                <span
                                    className="scale-bar absolute inset-0 rounded-t-sm bg-[color:var(--scale-accent)]"
                                    style={{ animationDelay: `${column * COLUMN_STAGGER_MS}ms` }}
                                />
                                <span className="absolute inset-x-0 bottom-full mb-1 text-center font-code text-sm font-semibold tabular-nums">
                                    {size.share}%
                                </span>
                            </span>
                        </span>
                        <span className="h-[2lh] text-center font-code text-xs leading-tight text-secondary @lg:h-auto">
                            {size.label}
                        </span>
                    </li>
                ))}
            </ol>
            <p className="m-0 text-xs text-secondary">Lines per organization in one day, from PostHog usage reports.</p>
        </div>
    )
}

function average(values: number[]): number {
    return values.reduce((sum, value) => sum + value, 0) / values.length
}

function LatencyPanel({
    title,
    children,
    labels,
    unit,
    median,
    p99,
}: {
    title: string
    children: React.ReactNode
    labels: string[]
    unit: string
    median: number[]
    p99: number[]
}): JSX.Element {
    const { polledAt } = useScaleData().status
    return (
        <div className="flex h-full flex-col gap-4">
            <PanelHeader title={title}>{children}</PanelHeader>
            <LineChart
                className="min-h-56 flex-1 [--data-color-1:var(--scale-accent)] [--data-color-2:var(--scale-accent-2)]"
                labels={labels}
                series={[
                    { key: 'median', label: `Median (${unit})`, data: median },
                    { key: 'p99', label: `99th percentile (${unit})`, data: p99 },
                ]}
            />
            <p className="m-0 text-xs text-secondary">
                Source: <SourceLink to={STATUS_PAGE_URL}>PostHog status page</SourceLink>, {polledAt}
            </p>
        </div>
    )
}

function EventsPanel(): JSX.Element {
    const { eventLag, captureErrorPeakPercent } = useScaleData().status
    return (
        <LatencyPanel
            title={`Median time to query an event: about ${Math.round(average(eventLag.median))} seconds`}
            labels={eventLag.hours}
            unit="seconds"
            median={eventLag.median}
            p99={eventLag.p99}
        >
            The average of the hourly medians of the time from capture to queryable, over the last 24 hours on US Cloud.
            The chart also shows the hourly 99th percentile.{' '}
            {captureErrorPeakPercent === 0
                ? 'Capture had no errors in the same 24 hours.'
                : `Capture errors in the same 24 hours never went above ${captureErrorPeakPercent.toPrecision(1)}%.`}
        </LatencyPanel>
    )
}

function FlagsPanel(): JSX.Element {
    const { flagResponse } = useScaleData().status
    return (
        <LatencyPanel
            title={`Median flag response: about ${Math.round(average(flagResponse.median))} ms`}
            labels={flagResponse.hours}
            unit="ms"
            median={flagResponse.median}
            p99={flagResponse.p99}
        >
            The average of the hourly medians for remote evaluation, over the last 24 hours on US Cloud. The 99th
            percentile stayed under {Math.ceil(Math.max(...flagResponse.p99))} ms in every hour.
        </LatencyPanel>
    )
}

const makerColors: Record<string, string> = {
    Anthropic: 'var(--mcp-anthropic)',
    OpenAI: 'var(--mcp-openai)',
}

const OTHER_MAKER_COLOR = 'var(--mcp-other)'

function McpPanel(): JSX.Element {
    const { relativeDay, mcpClients } = useScaleData()
    const clients = mcpClients.map(({ label, share: value }) => ({
        label,
        value,
        color: makerColors[clientMaker(label)] ?? OTHER_MAKER_COLOR,
    }))
    return (
        <div className="flex h-full flex-col gap-4 [--mcp-anthropic:theme(colors.brand.tangerine.DEFAULT)] [--mcp-openai:theme(colors.brand.blue.DEFAULT)] [--mcp-other:theme(colors.brand.green.DEFAULT)]">
            <PanelHeader title="Which agents call our MCP server">
                Share of tool calls on the PostHog MCP server {inSentence(relativeDay)}, by the app the agent runs in.
            </PanelHeader>
            <ShareBars
                items={clients}
                icon={(item) => <BrandLogo name={item.label} fallback={clientMaker(item.label)} />}
                labelOf={(item) => displayLabel('client', item.label)}
            />
            <Link to="/mcp/leaderboard" state={{ newWindow: true }} className="mt-auto text-sm font-semibold">
                See the full MCP leaderboard →
            </Link>
        </div>
    )
}

const commitColors: Record<string, ColorName> = {
    feat: 'green',
    fix: 'coral',
    perf: 'purple',
    refactor: 'teal',
    docs: 'blue',
    test: 'yellow',
}

const SHADE_BORDER = '\u2591'.repeat(40)

function ShadeBorder(): JSX.Element {
    return (
        <span
            aria-hidden
            className={`absolute inset-y-0 left-0 w-[1ch] select-none overflow-hidden whitespace-nowrap font-code text-sm leading-none [text-orientation:upright] [writing-mode:vertical-lr] text-[rgb(var(--text-primary)/0.25)]`}
        >
            {SHADE_BORDER}
        </span>
    )
}

function ReportsPanel(): JSX.Element {
    const { feed, failed, now } = useSelfDrivingFeed()
    return (
        <div className="flex flex-col gap-4">
            <PanelHeader title="What self-driving shipped for us lately">
                We run PostHog on PostHog. PostHog wrote these pull requests from reports on our own product, and an
                engineer reviewed and merged each one.
            </PanelHeader>
            <ol className="relative m-0 flex list-none flex-col p-0 pl-6">
                <ShadeBorder />
                {feed
                    ? feed.pullRequests.slice(0, PULL_REQUESTS_SHOWN).map((pullRequest) => {
                          const { type, scope } = commitParts(pullRequest.title)
                          const color = (type && commitColors[type]) || 'gray'
                          return (
                              <li key={pullRequest.url} className="m-0">
                                  <a
                                      href={pullRequest.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="group flex min-w-0 py-2 text-primary"
                                  >
                                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                          <span className="flex min-w-0 items-center gap-2">
                                              {type && (
                                                  <Badge
                                                      color={color}
                                                      appearance="soft"
                                                      className="min-w-11 justify-center font-code"
                                                  >
                                                      {type}
                                                  </Badge>
                                              )}
                                              <span className="truncate font-semibold leading-snug group-hover:underline">
                                                  {titleSummary(pullRequest.title, pullRequest.number)}
                                              </span>
                                          </span>
                                          <span className="truncate font-code text-xs leading-5 text-secondary">
                                              {repositoryLabel(pullRequest.repository)} #{pullRequest.number}
                                              {scope && ` · ${scope}`}
                                              {now !== null && ` · ${timeAgo(pullRequest.mergedAt, now)}`}
                                          </span>
                                      </span>
                                  </a>
                              </li>
                          )
                      })
                    : placeholderRows.map((row) => (
                          <li key={row} className="m-0">
                              <span className="flex min-w-0 flex-col gap-0.5 py-2">
                                  {failed && row === 0 ? (
                                      <span className="leading-snug text-secondary">
                                          Could not load the latest pull requests.
                                      </span>
                                  ) : (
                                      <Skeleton width="75%" className="leading-snug" />
                                  )}
                                  <Skeleton width="33%" className="text-xs leading-5" />
                              </span>
                          </li>
                      ))}
            </ol>
        </div>
    )
}

const BORED_SALESPERSON = [
    '                     .._',
    "                   /<':_)L",
    "                 |^:/^' , '._",
    '                ;^:^  /:>:- ..              ._,.-.',
    "               ;^::'>' '   ^ .v       ,>^''.   -.'\\",
    "  .-<<(>'^-.   /:::'.      ''  ' _.-^' ./- . ...'.|:",
    " |^'    '<. ^-.^-_><^^.     .,-'L \\ .-.'.'. ,'. ' |",
    " J . . '-. v L ' '.'^ :. .:>^..:' '. ..':,<' ' . ./                                                                 ,/^v",
    " 'L . . ... .'. . .^=(:''^.    '/<^^^'''; .>  . .)'                                                                /''.|L",
    "  'v . . .<. . '^= .'.;:.       '.    ;^ \\ '.. . /                                                               .^::' |L",
    "   '\\_. . . < . . '>--<:_ .'   |''^/('-..-: > . /                                                               ;^'.'::|L",
    "     'Y_ . . '.. . : .'. ' - -./^<.:.^ .^.'-|. /                                                             ,=^-. .':;^|T",
    "       '. .'. '\\.'.'./-   '-''---.'.:^v . . './                                                          .;^^.-'.':::|\\ /|>",
    "         ) .'. .Y.'.\\'.- ... '-.   '\\.:'>'   |                                                        .,:>:'\\.-'::::-^'.-|>",
    "        |L::.:' .^. ' ' . . - . '    '.::^.   <.                                              ._.--;/^:::::::^::::.::::|:|",
    "        'L>::';':.'. . .|.^v   .      '.::'> . ^_                            ,:><^^<<<--><<^^^:::::::::::::::::::;:. ::^:/                            ./^''7.__. .",
    "         '/.:::'<.::.'.-.\\. '<, .'. . .'.:::\\.. 'L                       ,>^'::::::-::':::::::::::::':::::',,-''. ./../:|          ..,,___          ./'.;^''..._''.L",
    "          '/.::::'\\: . . '>. . '^-,. . .'L:::'..-.^.                  ;^^:::::'::-::'-::::::::::::::::::_;'::'::|... =:-^          = .   |/-_      ;^.;^::::::^/ -=",
    "           '/.: .::^.:' > ) \\ . . . '^-., \\::::<_  '>            .,<^'::::::::|:::-::::::::::::::::.Y:>':::::|::':J |::J           L.    J  =     |..|/:.>::^-..':L",
    "            '/.: .':'\\:.'... > - . . . . . \\::::'.'.'=_      ,>^^::::::::::::::::::'::::::::::::.:'::::::::::|:::'::/::J .......,, L .   |./\\_..;v'/''.''''.'.':::7",
    "             '/-: . ::'.::' -'. .''-..... . |::::'-'Y-',::>^^::::::::::::::::::|:/:::::::::::''::.:::::::::::'/^:_:::::>         -.\\,__,,/.   '>:...<---<<:>Y.--:^>'''''''''''':7T",
    "              'v\\::.':::^.:- < . . . . . .-^:<-..:'''^:::::::::::::::::::::::::):::..,.:----------'^^'<^^^'''^:'.:'^'''. .         > . . ' .   . . . . . . . . . .:       ,-''./>",
    "               '\\<::. ':::<.: \\ . ... . '7' ./::.''.::::::::::::::::::::::::::::::^':::::'''::: . . . . . . . : . . . . . .       . . . .'        . . . . . . . . .   .-''.'' 'L=",
    "                 \\'.'. ':::'\\::>'. . -<-(.,':::/:':::::::::::::::::::::::::::::::|;.---:----------::::................,______::)))))'''''''''''^^^^''''''''''''''''''. ' ,>./':>(",
    "                  T/.:- '.-'''. :::..:. . . ''^::'::::::::::::::::::::::::::::,>^' J. .|:______:::::::::::::::::::::::::::::::::::::::::::::::::''''''''''''''^'''' .,>^'   L::L(",
    "                   '/-:::.::''.,::'::,:.''^- .:':::::::::::::::::::::::::::./'     J . 'L       =''(|'''''''''''''''''^^^^^^^^^^^^^^^^^^^^^<<<<<<<<<<<>>------\\. . |        L::>7",
    "                    '_\\::<''::::'.:':.-::::.'^:.::::::::::::::::::::::::.;^        J. . L       L::)|                                                         | . :J        L::>7",
    "                     7'.::::::::::<.:>:::::.:::::::::::::::::::::::::.;^'          J . .=       L:::|                                                         |. .:|        L::>7",
    "                      L|::::::::::::':::::.::::::::::::::::::::::::-^              J. . =       L:::|                                                         | . >|        L::>7",
    "                      '.L:::::::::::::::::/:::..____________,:::::'^:'^v           J . .=       L:::|                                                         |. .>|        L::>7",
    "                       \\':::::::,:-'''''''::::::: . . .::::::::::::::::|>          |. . =       L:::|                                                         | . :|        L::>)",
    "                       'L\\::::/':::::::::::::>:::::: .-. .:::::::::::::/           | . .=       L:::|                                                         |. .:|        L: >)",
    "                         ^\\:'v:::::::::._::::::::::::::::::::::::::_,>^            |. . =       L::'|                                                         | . >|        L:.>7",
    "                           \\:::::''''':::..:::.:::::'''.;;;;>><^^^'                | . .=       L:::|                                                         |. .>|        L. >7",
    "                            '^^^'^^^^^''' .=..::::::::'L                           |. . =       L:::|                                                         | . >|        L .>)",
    "                                      ,;''    ''T'^):::J                           | . .=       L:::|                                                         |. .>|        L. :7",
    "                                    =^^       L''L  ^''                            |. . =       L::'|                                                         | . >|        L .>)",
    '                                             |^::T:                                | . .=       =:::|                                                         |. .>|        L::>)',
    '                                             |:::|:                                |. . 7       =:::|                                                         | . >|        L::>)',
    '                                             |:::|.                                | . .7       =:::|                                                         |. .>|        L. >7',
    "                                  .,><^^^^''^''::'^^'''^^^^<>;_                    |. . 7       =:::|                                                         | . >|        L::>)",
    "                              _.-<^:':::::._:|:::|:;_.:::::'':^-._                 | . .7       =:::|                                                         |. .>|        L::(J",
    "                         ,-^).;;:::.-^^''''  ^.::J^   ''''^v:.::.;,'^-_            |. . 7       =:::|                                                         | . :|        L::(J",
    "                         Y,^''   L:.;'        L-='         7;_./   'Y,^            | . .7     ' ''''  '''                                                     |. .(|    ._. L::(J",
    "                       /^''.      ''.'''      L:>        '' . ' '  |^:'7.          |. . J                                                                     | . (|        ''''",
    "                      'v::.>._... -         .^''v ''''' '   - -....7_:./           | . .J                                                                     |: .(|",
    "                        '''                 |_..|                    '             |.:: J                                                                     |:. (|",
    "                                           ' ^^^^''                              '''^^^^^                                                                  ._.|. .(|",
    "                                                                                                                                                               ''''",
].join('\n')

function QuickCallsPanel(): JSX.Element {
    return (
        <div className="flex h-full items-center justify-center @container">
            <pre
                role="img"
                aria-label="A bored salesperson leaning back in his chair with his feet on the desk, staring at the ceiling and waiting for 5 o'clock"
                className="m-0 font-code text-[length:0.88cqw] leading-[1.2] text-primary"
            >
                {BORED_SALESPERSON}
            </pre>
        </div>
    )
}

const panels: Record<LineKey, () => JSX.Element> = {
    rowsRead: RowsReadPanel,
    events: EventsPanel,
    logs: LogsPanel,
    flags: FlagsPanel,
    mcp: McpPanel,
    reports: ReportsPanel,
    salesCalls: QuickCallsPanel,
}

const panelEntries = Object.entries(panels) as [LineKey, () => JSX.Element][]

const firstKey = panelEntries[0][0]

function useStackedLayout(): { headingRef: React.RefObject<HTMLElement>; stacked: boolean } {
    const headingRef = useRef<HTMLElement>(null)
    const [stacked, setStacked] = useState(false)
    useEffect(() => {
        const heading = headingRef.current
        if (!heading) {
            return
        }
        const observer = new ResizeObserver(() => setStacked(heading.offsetHeight > 0))
        observer.observe(heading)
        return () => observer.disconnect()
    }, [])
    return { headingRef, stacked }
}

export default function Panels({
    shown,
    next,
    swapClass,
    onNext,
    className = '',
}: {
    shown: LineKey
    next: LineKey
    swapClass: string
    onNext: () => void
    className?: string
}): JSX.Element {
    const { totals } = useScaleData()
    const { headingRef, stacked } = useStackedLayout()
    const tabpanel = stacked ? {} : { role: 'tabpanel', 'aria-labelledby': tabId(shown), tabIndex: 0 }
    const position = panelEntries.findIndex(([key]) => key === shown) + 1
    return (
        <div
            {...tabpanel}
            id={PANEL_ID}
            className={`relative grid grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr] gap-y-4 @3xl:gap-y-0 ${className}`}
        >
            {panelEntries.map(([key, Panel]) => {
                const active = key === shown
                const swap = active ? swapClass : ''
                return (
                    <section
                        key={key}
                        data-active={active || undefined}
                        className={`row-span-2 grid grid-rows-subgrid [grid-area:1/1/3/2] ${active ? '' : 'invisible'}`}
                    >
                        <header
                            ref={key === firstKey ? headingRef : undefined}
                            className={`flex flex-col gap-1 pr-12 @3xl:hidden ${swap}`}
                        >
                            <h2 className="m-0 text-xl font-bold leading-snug">
                                We {lineByKey[key].verb}{' '}
                                <Emphasis>
                                    {formatCount(totals[key])} {lineByKey[key].noun}
                                </Emphasis>
                            </h2>
                            <p className="m-0 text-sm text-secondary">{lineByKey[key].note(totals[key])}</p>
                        </header>
                        <Card.Root appearance="solid" className="min-h-72 @3xl:pl-48">
                            <div className={`grid flex-1 grid-cols-[minmax(0,1fr)] ${swap}`}>
                                <Panel />
                            </div>
                        </Card.Root>
                    </section>
                )
            })}
            <div className="absolute right-0 top-0 @3xl:hidden">
                <IconButton
                    type="button"
                    icon={<IconArrowRight />}
                    aria-label={`Next: ${lineByKey[next].item}`}
                    onClick={onNext}
                />
            </div>
            <p className="sr-only" aria-live="polite">
                {stacked ? `${position} of ${panelEntries.length}: ${lineByKey[shown].item}` : ''}
            </p>
        </div>
    )
}
