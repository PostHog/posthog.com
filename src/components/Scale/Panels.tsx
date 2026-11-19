import React from 'react'
import { IconPullRequest } from '@posthog/icons'
import Link from 'components/Link'
import { LineChart } from 'components/UI/Chart'
import { useAppSettings } from '../../context/App'
import BrandLogo from 'components/MCPLeaderboard/BrandLogo'
import { ShareBars } from 'components/MCPLeaderboard/charts'
import { clientColor, clientMaker, displayLabel } from 'components/MCPLeaderboard/data'
import {
    repositoryLabel,
    timeAgo,
    titleSummary,
    useSelfDrivingFeed,
} from 'components/Home/DataStory/SelfDrive/useSelfDrivingFeed'
import {
    STATUS_POLLED,
    captureErrorPeakPercent,
    eventLag,
    flagResponse,
    formatCount,
    lineByKey,
    mcpClients,
    WIKIPEDIA_HISTORY_BYTES,
    bytesScanned,
    logPatterns,
    queryHours,
} from './data'
import type { LineKey } from './data'
import { PANEL_ID, tabId } from './Receipt'

const PULL_REQUESTS_SHOWN = 5

function lineValue(key: LineKey): number {
    return lineByKey[key].yesterday
}

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
            <h2 className="m-0 text-lg font-bold">{title}</h2>
            {children && <p className="m-0 text-sm text-secondary">{children}</p>}
        </header>
    )
}

function RowsReadPanel(): JSX.Element {
    const copies = Math.round(bytesScanned / WIKIPEDIA_HISTORY_BYTES)
    return (
        <div className="flex h-full flex-col gap-4">
            <PanelHeader title={`${Math.round(bytesScanned / 1e15)} petabytes scanned yesterday`}>
                Each square is English Wikipedia with every revision of every article ever written, about{' '}
                {(WIKIPEDIA_HISTORY_BYTES / 1e12).toFixed(1)} TB. Our queries read {copies.toLocaleString('en-US')} of
                them.
            </PanelHeader>
            <div
                aria-hidden
                className="grid flex-1 content-start gap-[2px] [grid-template-columns:repeat(auto-fill,6px)]"
            >
                {Array.from({ length: copies }, (_, index) => (
                    <span key={index} className="size-1.5 rounded-[1px] bg-brand-blue" />
                ))}
            </div>
            <p className="m-0 text-xs text-secondary">
                {formatCount(lineValue('rowsRead'))} rows and {queryHours.toLocaleString('en-US')} hours of query time.
                Wikipedia size from{' '}
                <SourceLink to="https://en.wikipedia.org/wiki/Wikipedia:Statistics">Wikipedia:Statistics</SourceLink>.
            </p>
        </div>
    )
}

const SAMPLE_USER_IDS = ['4812', '977', '60234', '15', '8820', '3391']

function LogsPanel(): JSX.Element {
    const records = lineValue('logs')
    const ratio = Math.round(records / logPatterns)
    return (
        <div className="flex h-full flex-col gap-5">
            <PanelHeader title={`Each log message repeats about ${ratio} times`}>
                {formatCount(records)} log lines came down to {formatCount(logPatterns)} patterns. A pattern is a
                message with its variables taken out.
            </PanelHeader>
            <div className="grid flex-1 items-center gap-4 @2xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
                <ol className="m-0 flex list-none flex-col gap-1 p-0 font-code text-13">
                    {SAMPLE_USER_IDS.map((id, index) => (
                        <li
                            key={id}
                            className="truncate rounded bg-[rgb(var(--text-primary)/0.04)] px-2 py-1"
                            style={{ opacity: 1 - index * 0.12 }}
                        >
                            User <span className="text-brand-blue">{id}</span> signed in
                        </li>
                    ))}
                    <li className="px-2 text-secondary">…and {ratio - SAMPLE_USER_IDS.length} more like it</li>
                </ol>
                <span aria-hidden className="text-center text-2xl text-secondary">
                    →
                </span>
                <div className="flex flex-col items-start gap-2">
                    <span className="rounded border border-primary px-3 py-2 font-code text-13">
                        User <span className="rounded bg-brand-blue/15 px-1">{'{id}'}</span> signed in
                    </span>
                    <span className="text-sm text-secondary">1 pattern, ×{ratio} on average</span>
                </div>
            </div>
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
    return (
        <div className="flex h-full flex-col gap-4">
            <PanelHeader title={title}>{children}</PanelHeader>
            <LineChart
                className="min-h-56 flex-1"
                labels={labels}
                series={[
                    { key: 'median', label: `Median (${unit})`, data: median },
                    { key: 'p99', label: `99th percentile (${unit})`, data: p99 },
                ]}
            />
            <p className="m-0 text-xs text-secondary">
                Source: <SourceLink to={STATUS_PAGE_URL}>PostHog status page</SourceLink>, {STATUS_POLLED}
            </p>
        </div>
    )
}

function EventsPanel(): JSX.Element {
    return (
        <LatencyPanel
            title={`Median time to query an event: about ${Math.round(average(eventLag.medianSeconds))} seconds`}
            labels={eventLag.hours}
            unit="seconds"
            median={eventLag.medianSeconds}
            p99={eventLag.p99Seconds}
        >
            The average of the hourly medians of the time from capture to queryable, over the last 24 hours on US Cloud.
            The chart also shows the hourly 99th percentile. Capture errors in the last 7 days never went above{' '}
            {captureErrorPeakPercent.toPrecision(1)}%.
        </LatencyPanel>
    )
}

function FlagsPanel(): JSX.Element {
    return (
        <LatencyPanel
            title={`Median flag response: about ${Math.round(average(flagResponse.medianMs))} ms`}
            labels={flagResponse.times}
            unit="ms"
            median={flagResponse.medianMs}
            p99={flagResponse.p99Ms}
        >
            The average of the 6-hour medians for remote evaluation over the last 7 days on US Cloud. The 99th
            percentile stayed under {Math.ceil(Math.max(...flagResponse.p99Ms))} ms in every 6-hour window.
        </LatencyPanel>
    )
}

function McpPanel(): JSX.Element {
    const { siteSettings } = useAppSettings()
    const theme = siteSettings.theme === 'dark' ? 'dark' : 'light'
    const clients = mcpClients.shares.map(([label, value]) => ({ label, value, color: clientColor(label, theme) }))
    return (
        <div className="flex h-full flex-col gap-4">
            <PanelHeader title="Which agents call our MCP server">
                Share of tool calls on the PostHog MCP server in the week of {mcpClients.week}, by the app the agent
                runs in.
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

function ReportsPanel(): JSX.Element {
    const { feed, failed, now } = useSelfDrivingFeed()
    return (
        <div className="flex flex-col gap-4">
            <PanelHeader title="What self-driving shipped for us lately">
                We run PostHog on PostHog. PostHog wrote these pull requests from reports on our own product, and an
                engineer reviewed and merged each one.
            </PanelHeader>
            {failed && <p className="m-0 text-sm text-secondary">Could not load the latest pull requests.</p>}
            {!failed && !feed && <p className="m-0 text-sm text-secondary">Loading…</p>}
            {feed && (
                <ol className="m-0 list-none divide-y divide-primary p-0">
                    {feed.pullRequests.slice(0, PULL_REQUESTS_SHOWN).map((pullRequest) => (
                        <li key={pullRequest.url} className="m-0">
                            <a
                                href={pullRequest.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col gap-0.5 py-2.5 text-primary"
                            >
                                <span className="font-semibold leading-snug group-hover:underline">
                                    {titleSummary(pullRequest.title, pullRequest.number)}
                                </span>
                                <span className="flex items-center gap-1.5 text-sm text-secondary">
                                    <IconPullRequest className="size-3.5 text-purple" />
                                    {repositoryLabel(pullRequest.repository)} #{pullRequest.number}
                                    <span aria-hidden>·</span>
                                    {timeAgo(pullRequest.mergedAt, now)}
                                </span>
                            </a>
                        </li>
                    ))}
                </ol>
            )}
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

export default function Panels({ shown, swapClass }: { shown: LineKey; swapClass: string }): JSX.Element {
    return (
        <div role="tabpanel" id={PANEL_ID} aria-labelledby={tabId(shown)} tabIndex={0} className="grid h-full">
            {panelEntries.map(([key, Panel]) => {
                const active = key === shown
                return (
                    <div
                        key={key}
                        aria-hidden={!active}
                        className={`[grid-area:1/1] ${active ? swapClass : 'invisible'}`}
                    >
                        <Panel />
                    </div>
                )
            })}
        </div>
    )
}
