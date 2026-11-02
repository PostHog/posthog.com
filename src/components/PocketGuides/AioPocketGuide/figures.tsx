import React, { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import {
    CompactAiChat,
    CompactRecommendedStay,
    type CompactChatMessage,
} from '@posthog/twig-components/compact-ai-chat'
import { SupportAgent, type SupportMessage } from '@posthog/twig-components/support-agent'
import { DisclosureIcon } from '@posthog/twig-components/disclosure'
import { supportPolicy } from '@posthog/twig-components/support-evals'
import { EvidenceTabs } from '@posthog/twig-components/evidence-tabs'
import { PlaygroundStatus } from '@posthog/twig-components/status'
import { PlaygroundCodeBlock } from '@posthog/twig-components/code-block'
import cabin from './assets/cabin.jpg'
import coast from './assets/coast.jpg'
import cityPhoto from './assets/city.jpg'
import type { Stay } from '@posthog/twig-components/catalog'
import catalogCss from '!!css-loader!@posthog/twig-components/catalog.css'
import compactCss from '!!css-loader!@posthog/twig-components/compact.css'
import labCss from '!!css-loader!@posthog/twig-components/lab.css'
import figureCss from '!!css-loader!./figures.css'
import Figure from '../Figure'
import ExhibitResetButton from '../ExhibitResetButton'
import * as data from './fixtures'

const photos = { Forest: cabin, Coast: coast, City: cityPhoto }
const image = (stay: Stay): ReactNode => (
    <img
        src={photos[stay.setting]}
        alt={stay.images[0]?.alt || stay.title || ''}
        style={{ objectPosition: stay.images[0]?.objectPosition }}
    />
)

/** Styles stay inside the figure: neither host prose nor Twig can restyle the other. */
function IsolatedFigure({ children }: { children: ReactNode }): JSX.Element {
    const host = useRef<HTMLDivElement>(null)
    const [root, setRoot] = useState<ShadowRoot | null>(null)
    useEffect(() => {
        if (host.current) setRoot(host.current.shadowRoot || host.current.attachShadow({ mode: 'open' }))
    }, [])
    return (
        <div ref={host} className="min-w-0" data-aio-figure>
            {root &&
                createPortal(
                    <>
                        <style>{[catalogCss, compactCss, labCss, figureCss].join('\n')}</style>
                        <div className="vac-app aio-root">{children}</div>
                    </>,
                    root
                )}
        </div>
    )
}
function Exhibit({ children, label }: { children: ReactNode; label: string }): JSX.Element {
    const [reset, setReset] = useState(0)
    return (
        <Figure>
            <ExhibitResetButton onReset={() => setReset((value) => value + 1)} />
            <IsolatedFigure>
                <div role="group" aria-label={label} key={reset}>
                    {children}
                </div>
            </IsolatedFigure>
            <span className="sr-only">Interactive example with simulated Twig data. Nothing is sent to PostHog.</span>
        </Figure>
    )
}
function Pair({ children }: { children: ReactNode }): JSX.Element {
    return <div className="aio-pair">{children}</div>
}
function Inspector({ title = 'Inspector', children }: { title?: string; children: ReactNode }): JSX.Element {
    return (
        <div className="vac-developer-theme">
            <section className="aio-inspector" aria-label={title} aria-live="polite">
                <h3>{title}</h3>
                {children}
            </section>
        </div>
    )
}
function Section({ children }: { children: ReactNode }): JSX.Element {
    return <h4 className="aio-section">{children}</h4>
}
function Note({ children }: { children: ReactNode }): JSX.Element {
    return <p className="aio-note">{children}</p>
}
function Choices({
    labels,
    value,
    onChange,
    label,
    disabled = false,
}: {
    labels: string[]
    value: number
    onChange: (value: number) => void
    label: string
    disabled?: boolean
}): JSX.Element {
    return (
        <div className="vac-developer-theme aio-choices">
            <EvidenceTabs
                label={label}
                value={String(value)}
                options={labels.map((label, index) => ({ label, value: String(index) }))}
                onChange={(value) => {
                    if (!disabled) onChange(Number(value))
                }}
                disabled={disabled}
            />
        </div>
    )
}
function Rows({
    rows,
    heading,
}: {
    rows: Array<[ReactNode, ReactNode, boolean?]>
    heading?: [string, string]
}): JSX.Element {
    return (
        <table className="vac-lab-table aio-table">
            {heading && (
                <thead>
                    <tr>
                        {heading.map((value) => (
                            <th key={value} scope="col">
                                {value}
                            </th>
                        ))}
                    </tr>
                </thead>
            )}
            <tbody>
                {rows.map(([label, value, highlight], index) => (
                    <tr key={index} data-highlighted={highlight || undefined}>
                        <td>{label}</td>
                        <td>{value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
function Score({ value }: { value: boolean | null }): JSX.Element {
    return value === null ? <span>N/A</span> : <PlaygroundStatus value={value ? 'passed' : 'failed'} />
}
function Chat({
    messages,
    draft,
    pending,
    onSend,
    title,
    onViewStay,
    playback = false,
}: {
    messages: CompactChatMessage[]
    draft?: string
    pending?: boolean
    onSend?: () => void
    title?: string
    onViewStay?: (stay: Stay) => void
    playback?: boolean
}): JSX.Element {
    if (title === 'Support agent') {
        const conversation: SupportMessage[] = []
        for (const message of messages) {
            if (message.speaker === 'visitor') conversation.push({ input: message.content, output: '' })
            else if (conversation.length) conversation[conversation.length - 1].output = message.content
        }
        return (
            <SupportAgent
                compact
                conversation={conversation}
                draft={draft}
                pending={pending}
                onSend={onSend}
                playback={playback}
            />
        )
    }
    return (
        <CompactAiChat
            title={title}
            messages={messages}
            draft={draft}
            pending={pending}
            playback={playback}
            onSend={onSend}
            renderImage={image}
            onViewStay={onViewStay}
        />
    )
}

/** Match the guide's simplified trace viewer; captured content stays visible. */
function TraceStep({
    name,
    kind = 'Generation',
    selected = true,
    onSelect,
}: {
    name: string
    kind?: 'Generation' | 'Span'
    selected?: boolean
    onSelect?: () => void
}): JSX.Element {
    const content = (
        <>
            <span className="aio-branch" aria-hidden="true">
                └─
            </span>
            <strong>{name}</strong>
            <small>{kind}</small>
        </>
    )
    return onSelect ? (
        <button type="button" className="aio-trace-step" aria-pressed={selected} onClick={onSelect}>
            {content}
        </button>
    ) : (
        <div className="aio-trace-step" data-selected={selected}>
            {content}
        </div>
    )
}
function Message({ role, children }: { role: string; children: ReactNode }): JSX.Element {
    return (
        <section className="aio-message" aria-label={role}>
            <h4>{role}</h4>
            {children}
        </section>
    )
}
function JsonExcerpt({ value, highlight }: { value: unknown; highlight?: string }): JSX.Element {
    return (
        <pre className="aio-json">
            <code>
                {JSON.stringify(value, null, 2)
                    .split('\n')
                    .map((line, index) => (
                        <span
                            key={index}
                            data-highlighted={(highlight && line.includes(`"${highlight}"`)) || undefined}
                        >
                            {line}
                        </span>
                    ))}
            </code>
        </pre>
    )
}
function TraceMessages({
    request,
    catalog,
    highlight,
    earlier,
}: {
    request: string
    catalog: unknown
    highlight?: string
    earlier?: string
}): JSX.Element {
    const [tab, setTab] = useState('messages')
    const messages = [
        ...(earlier ? [{ role: 'user', content: earlier }] : []),
        { role: 'user', content: request },
        { role: 'system', content: JSON.stringify(catalog) },
    ]
    return (
        <div className="vac-ai-generation">
            <EvidenceTabs
                label="Generation content"
                value={tab}
                options={[
                    { value: 'messages', label: 'Messages' },
                    { value: 'raw', label: 'Raw' },
                ]}
                onChange={setTab}
            >
                {tab === 'raw' ? (
                    <JsonExcerpt value={{ $ai_input: messages }} />
                ) : (
                    <div className="aio-messages">
                        {earlier && (
                            <Message role="Earlier message">
                                <p>{earlier}</p>
                            </Message>
                        )}
                        <Message role="User">
                            <p>{request}</p>
                        </Message>
                        <Message role="System">
                            <JsonExcerpt value={catalog} highlight={highlight} />
                        </Message>
                    </div>
                )}
            </EvidenceTabs>
        </div>
    )
}

/** One opening playback gives the detailed inspectors a shared conversation. */
export function AioConversationPreview(): JSX.Element {
    return (
        <Exhibit label="Preview the conversation">
            <ConversationPreview />
        </Exhibit>
    )
}
export function AioSupportConversationPreview(): JSX.Element {
    return (
        <Exhibit label="Preview the support conversation">
            <ConversationPreview support />
        </Exhibit>
    )
}
function ConversationPreview({ support = false }: { support?: boolean }): JSX.Element {
    const wrapper = useRef<HTMLDivElement>(null)
    const [playback, setPlayback] = useState({
        shown: 0,
        typed: 0,
        phase: 'typing' as 'typing' | 'send' | 'waiting' | 'reading' | 'done',
    })
    const [inView, setInView] = useState(false)
    const [reducedMotion, setReducedMotion] = useState(false)
    const messageCount = support ? data.supportMessages().length : data.conversation.length
    const messages = support ? data.supportMessages() : data.previewMessages(messageCount)
    const request = messages[playback.shown]?.content ?? ''
    const shown = reducedMotion ? messageCount : playback.shown
    const draft =
        !reducedMotion && (playback.phase === 'typing' || playback.phase === 'send')
            ? request.slice(0, playback.typed)
            : ''

    useEffect(() => {
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
        const update = () => {
            setReducedMotion(preference.matches)
        }
        update()
        preference.addEventListener('change', update)
        return () => preference.removeEventListener('change', update)
    }, [messageCount])
    useEffect(() => {
        if (!wrapper.current) return
        if (typeof IntersectionObserver === 'undefined') {
            setInView(true)
            return
        }
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.75),
            { threshold: 0.75 }
        )
        observer.observe(wrapper.current)
        return () => observer.disconnect()
    }, [])
    useEffect(() => {
        if (!inView || reducedMotion || playback.phase === 'done') return
        // Type into the real composer, send, wait for Twig, then leave time to read.
        const delay =
            playback.phase === 'typing'
                ? playback.typed === 0
                    ? 900
                    : 40
                : playback.phase === 'send'
                ? 600
                : playback.phase === 'waiting'
                ? 2200
                : 5000
        const timeout = window.setTimeout(() => {
            setPlayback((current) => {
                if (current.phase === 'typing') {
                    const typed = Math.min(current.typed + 1, request.length)
                    return { ...current, typed, phase: typed === request.length ? 'send' : 'typing' }
                }
                if (current.phase === 'send') return { shown: current.shown + 1, typed: 0, phase: 'waiting' }
                if (current.phase === 'waiting') {
                    const shown = current.shown + 1
                    return { shown, typed: 0, phase: shown === messageCount ? 'done' : 'reading' }
                }
                return { ...current, typed: 0, phase: 'typing' }
            })
        }, delay)
        return () => window.clearTimeout(timeout)
    }, [playback, inView, reducedMotion, messageCount, request])
    useEffect(() => {
        if (!inView || reducedMotion) return
        const log = wrapper.current?.querySelector<HTMLElement>('.twig-compact-chat-log, .twig-trip-planner-history')
        if (log) log.scrollTop = log.scrollHeight
    }, [shown, inView, reducedMotion])

    return (
        <div
            className={`aio-conversation-preview${support ? ' aio-support-preview' : ''}`}
            ref={wrapper}
            role="group"
            aria-label={support ? 'Support conversation preview' : 'Trip planner conversation preview'}
        >
            <Chat
                title={support ? 'Support agent' : undefined}
                messages={support ? data.supportMessages().slice(0, shown) : data.previewMessages(shown)}
                draft={draft}
                playback
                pending={playback.phase === 'waiting' && !reducedMotion}
            />
        </div>
    )
}

export function AioRequestFigure(): JSX.Element {
    return (
        <Exhibit label="Inspect a request">
            <Request />
        </Exhibit>
    )
}
function Request(): JSX.Element {
    const [sent, setSent] = useState(false)
    return (
        <Pair>
            <Chat
                messages={sent ? data.forestMessages : []}
                draft={sent ? '' : data.forestRequest}
                onSend={() => setSent(true)}
            />
            <Inspector title="Trace">
                {sent ? (
                    <>
                        <TraceStep name="Recommend a stay" />
                        <TraceMessages
                            request={data.forestRequest}
                            catalog={{ name: data.forest.title, capacity: data.forest.capacity }}
                            highlight="capacity"
                        />
                    </>
                ) : (
                    <Note>Send the request to inspect its trace.</Note>
                )}
            </Inspector>
        </Pair>
    )
}
export function AioConversationFigure(): JSX.Element {
    return (
        <Exhibit label="Follow a conversation">
            <Conversation />
        </Exhibit>
    )
}
function Conversation(): JSX.Element {
    const [turn, setTurn] = useState(0)
    const [selected, setSelected] = useState(0)
    return (
        <Pair>
            <Chat
                messages={data.conversation.slice(0, (turn + 1) * 2)}
                draft={turn === 0 ? data.beachRequest : turn === 1 ? data.kitchenRequest : ''}
                onSend={() => {
                    const next = Math.min(2, turn + 1)
                    setTurn(next)
                    setSelected(next)
                }}
            />
            <Inspector title="AI session">
                <Choices
                    label="Select a request"
                    labels={['Forest', 'Beach', 'Kitchen'].slice(0, turn + 1)}
                    value={selected}
                    onChange={setSelected}
                />
                <TraceStep name={selected === 2 ? 'Answer amenity question' : 'Recommend a stay'} />
                <TraceMessages
                    key={selected}
                    request={[data.forestRequest, data.beachRequest, data.kitchenRequest][selected]}
                    earlier={selected > 0 ? data.forestRequest : undefined}
                    catalog={
                        selected === 2
                            ? { name: data.beach.title, amenities: ['Full kitchen'] }
                            : {
                                  name: selected ? data.beach.title : data.forest.title,
                                  capacity: selected ? data.beach.capacity : data.forest.capacity,
                              }
                    }
                    highlight={selected === 2 ? 'amenities' : 'capacity'}
                />
            </Inspector>
        </Pair>
    )
}
export function AioSearchFixFigure(): JSX.Element {
    return (
        <Exhibit label="Inspect the search fix">
            <SearchFix />
        </Exhibit>
    )
}
function SearchFix(): JSX.Element {
    const [fixed, setFixed] = useState(0)
    const [step, setStep] = useState(0)
    return (
        <>
            <Choices
                label="Compare the search code"
                labels={['Before search fix', 'After search fix']}
                value={fixed}
                onChange={setFixed}
            />
            <Pair>
                <Chat messages={data.cityMessages(Boolean(fixed))} />
                <Inspector title="Trace">
                    <TraceStep name="search_stays" kind="Span" selected={step === 0} onSelect={() => setStep(0)} />
                    <TraceStep name="Recommend a city stay" selected={step === 1} onSelect={() => setStep(1)} />
                    {step === 0 ? (
                        <div className="aio-messages">
                            <Message role="Input">
                                <JsonExcerpt
                                    value={fixed ? { setting: 'City', guests: 4 } : { setting: 'City' }}
                                    highlight="guests"
                                />
                            </Message>
                            <Message role="Output">
                                <JsonExcerpt
                                    value={fixed ? [] : [{ name: data.city.title, capacity: data.city.capacity }]}
                                    highlight="capacity"
                                />
                            </Message>
                        </div>
                    ) : (
                        <>
                            <TraceMessages
                                request={data.cityRequest}
                                catalog={fixed ? [] : [{ name: data.city.title, capacity: data.city.capacity }]}
                                highlight="capacity"
                            />
                            <Rows rows={[[<code key="error">$ai_is_error</code>, <code>false</code>]]} />
                        </>
                    )}
                </Inspector>
            </Pair>
        </>
    )
}

export function AioOnlineEvaluationFigure(): JSX.Element {
    return (
        <Exhibit label="Compare online evaluation scores">
            <OnlineEvaluation />
        </Exhibit>
    )
}
function InspectionResults({
    label,
    rows,
    onSelect,
}: {
    label: string
    rows: Array<{ label: string; result: ReactNode; details: ReactNode; code?: boolean }>
    onSelect?: (index: number) => void
}): JSX.Element {
    const [expanded, setExpanded] = useState<number | null>(null)
    const id = useId()
    const toggle = (index: number) => {
        setExpanded((current) => (current === index ? null : index))
        onSelect?.(index)
    }
    return (
        <table className="vac-lab-table aio-table aio-selectable" aria-label={label}>
            <colgroup>
                <col />
                <col />
                <col className="vac-support-result-icon-cell" />
            </colgroup>
            <thead className="vac-sr-only">
                <tr>
                    <th>Name</th>
                    <th>Result</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <React.Fragment key={row.label}>
                        <tr
                            className="vac-support-result-row"
                            data-highlighted={expanded === index}
                            onClick={() => toggle(index)}
                        >
                            <td>
                                <button
                                    type="button"
                                    className="vac-support-result-select"
                                    aria-expanded={expanded === index}
                                    aria-controls={expanded === index ? `${id}-${index}` : undefined}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        toggle(index)
                                    }}
                                >
                                    {row.code ? <code>{row.label}</code> : row.label}
                                </button>
                            </td>
                            <td>{row.result}</td>
                            <td className="vac-support-result-icon-cell">
                                <DisclosureIcon expanded={expanded === index} />
                            </td>
                        </tr>
                        {expanded === index && (
                            <tr className="vac-support-result-detail-row">
                                <td colSpan={3}>
                                    <section
                                        id={`${id}-${index}`}
                                        className="vac-support-result-detail"
                                        aria-label={`${row.label} details`}
                                    >
                                        {row.details}
                                    </section>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    )
}
function OnlineEvaluation(): JSX.Element {
    const [sent, setSent] = useState(false)
    return (
        <Pair>
            <Chat
                title="Support agent"
                messages={sent ? data.supportMessages() : []}
                draft={sent ? '' : data.heatingRequest}
                onSend={() => setSent(true)}
            />
            <Inspector title="Evaluations">
                {sent ? (
                    <InspectionResults
                        label="Evaluation results"
                        rows={['Code', 'Sentiment', 'LLM judge'].map((label, index) => ({
                            label,
                            result: index === 1 ? 'Negative' : <Score value={index === 0} />,
                            details: <OnlineEvaluationDetail index={index} />,
                        }))}
                    />
                ) : (
                    <Note>Send a message to inspect its answer and scores.</Note>
                )}
            </Inspector>
        </Pair>
    )
}
function OnlineEvaluationDetail({ index }: { index: number }): JSX.Element {
    return (
        <>
            {index === 0 ? (
                <div className="vac-support-result-reason">
                    <PlaygroundCodeBlock label="Hog" code={"return position(toString(output), '7 days') > 0"} />
                </div>
            ) : index === 2 ? (
                <>
                    <Section>Policy correctness</Section>
                    <Note>
                        Apply the refund policy, including the exception for broken essential amenities that cannot be
                        repaired promptly.
                    </Note>
                </>
            ) : null}
            {index === 2 && (
                <>
                    <Section>Captured input</Section>
                    <div className="vac-support-result-reason">
                        <JsonExcerpt value={{ request: data.heatingRequest, policy: supportPolicy }} />
                    </div>
                </>
            )}
            <Section>{index === 1 ? 'Evaluated message' : 'Evaluated response'}</Section>
            <Note>{index === 1 ? data.heatingRequest : data.refusal}</Note>
        </>
    )
}
export function AioCodeEvaluationFigure(): JSX.Element {
    return (
        <Exhibit label="Test a code evaluation on sample data">
            <CodeEvaluation />
        </Exhibit>
    )
}
function CodeEvaluation(): JSX.Element {
    const [sample, setSample] = useState(0)
    const current = data.capacitySamples[sample]
    const result = data.evaluateCapacity(current.requested_guests, current.stay_capacity)
    return (
        <div className="vac-developer-theme">
            <section className="aio-inspector" aria-label="Guest capacity evaluation">
                <h3>Guest capacity</h3>
                <Choices
                    label="Sample capacity"
                    labels={data.capacitySamples.map((item) =>
                        item.stay_capacity === null ? 'Capacity missing' : `${item.stay_capacity} guests`
                    )}
                    value={sample}
                    onChange={setSample}
                />
                <table
                    className="vac-lab-table aio-table"
                    aria-label="Capacity comparison"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <thead>
                        <tr>
                            <th>Requested guests</th>
                            <th>Stay capacity</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{current.requested_guests}</td>
                            <td>{current.stay_capacity ?? 'Not recorded'}</td>
                            <td>
                                <Score value={result} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export function AioDatasetFigure(): JSX.Element {
    return (
        <Exhibit label="Replay saved evaluation cases">
            <Dataset />
        </Exhibit>
    )
}
function Dataset(): JSX.Element {
    const [sent, setSent] = useState(false)
    const [selected, setSelected] = useState(0)
    return (
        <Pair>
            <Chat
                title="Support agent"
                messages={sent ? data.supportMessages(selected === 1) : []}
                draft={sent ? '' : data.cancellationRequest}
                onSend={() => setSent(true)}
            />
            <Inspector title="Saved cases">
                {sent ? (
                    <CaseResults onSelect={setSelected} fixed={false} />
                ) : (
                    <Note>Send the saved case to inspect its answer and scores.</Note>
                )}
            </Inspector>
        </Pair>
    )
}
function CaseResults({ fixed, onSelect }: { fixed: boolean; onSelect?: (value: number) => void }): JSX.Element {
    return (
        <InspectionResults
            label="Saved case results"
            onSelect={onSelect}
            rows={['Cancellation · 1 day', 'Broken amenity'].map((label, index) => ({
                label,
                result: <Score value={index === 0 || fixed} />,
                details: (
                    <>
                        <Section>Request</Section>
                        <Note>{index === 0 ? data.cancellationRequest : data.heatingRequest}</Note>
                        <Section>Expected answer</Section>
                        <Note>
                            {index === 0
                                ? 'Explain that an ordinary cancellation requires 7 days’ notice.'
                                : 'Offer relocation or a refund under the broken-amenity exception.'}
                        </Note>
                        <Section>Actual answer</Section>
                        <Note>{data.supportMessages(index === 1, fixed)[1].content}</Note>
                    </>
                ),
            }))}
        />
    )
}
export function AioPromptComparisonFigure(): JSX.Element {
    return (
        <Exhibit label="Compare original and updated prompts">
            <PromptComparison />
        </Exhibit>
    )
}
function PromptComparison(): JSX.Element {
    const [version, setVersion] = useState(1)
    const [sent, setSent] = useState(false)
    return (
        <>
            <Choices
                label="Select prompt version"
                labels={['Original prompt', 'Updated prompt']}
                value={version}
                onChange={(value) => {
                    setVersion(value)
                    setSent(false)
                }}
            />
            <Pair>
                <Chat
                    title="Support agent"
                    messages={sent ? data.supportMessages(true, version === 1) : []}
                    draft={sent ? '' : data.heatingRequest}
                    onSend={() => setSent(true)}
                />
                <Inspector title="Offline evaluations">
                    <Section>Prompt instructions</Section>
                    <Note>{data.supportPromptVersions[version]}</Note>
                    {sent ? (
                        <CaseResults fixed={version === 1} />
                    ) : (
                        <Note>Send a message to inspect its answer and scores.</Note>
                    )}
                </Inspector>
            </Pair>
        </>
    )
}

/** Changing the fetched version and sending a request are separate actions. */
export function AioPromptVersionFigure(): JSX.Element {
    return (
        <Exhibit label="Verify the prompt used by a generation">
            <PromptVersion />
        </Exhibit>
    )
}
function PromptVersion(): JSX.Element {
    const [version, setVersion] = useState(0)
    const [sent, setSent] = useState(false)
    return (
        <>
            <Choices
                label="Version fetched by the support application"
                labels={['Fetch v1', 'Fetch v2']}
                value={version}
                onChange={(next) => {
                    setVersion(next)
                    setSent(false)
                }}
            />
            <Pair>
                <Chat
                    title="Support agent"
                    messages={sent ? data.supportMessages(true, version === 1) : []}
                    draft={sent ? '' : data.heatingRequest}
                    onSend={() => setSent(true)}
                />
                <Inspector title="Generation">
                    {sent ? (
                        <>
                            <Rows
                                rows={[
                                    ['Prompt', <code>{data.supportPromptName}</code>],
                                    ['Version', <code>{`v${version + 1}`}</code>],
                                ]}
                            />
                            <Section>Prompt instructions</Section>
                            <Note>{data.supportPromptVersions[version]}</Note>
                        </>
                    ) : (
                        <Note>Send the complaint to inspect the prompt used for its answer.</Note>
                    )}
                </Inspector>
            </Pair>
        </>
    )
}
export function AioPromptTemplateFigure(): JSX.Element {
    return (
        <Exhibit label="Fill a prompt template">
            <PromptTemplate />
        </Exhibit>
    )
}
function PromptTemplate(): JSX.Element {
    const [sample, setSample] = useState(0)
    return (
        <>
            <Choices label="Days before arrival" labels={['1 day', '2 days']} value={sample} onChange={setSample} />
            <div className="vac-developer-theme">
                <div className="aio-pair aio-template-pair">
                    <PlaygroundCodeBlock label="Template" code={data.cancellationTemplate} />
                    <PlaygroundCodeBlock
                        label="Rendered prompt"
                        code={data.renderCancellationPrompt(sample + 1)}
                        highlightLines={[2]}
                        lineNumbers={false}
                    />
                </div>
            </div>
        </>
    )
}

export function AioUsageFigure(): JSX.Element {
    return (
        <Exhibit label="Inspect model usage">
            <Usage />
        </Exhibit>
    )
}
function Usage(): JSX.Element {
    const [selected, setSelected] = useState(0)
    const current = data.usage[selected]
    const dollars = (cost: number) => `$${(cost / 1000000).toFixed(5)}`
    return (
        <>
            <Choices
                label="Select a request"
                labels={data.usage.map((item) => item.name)}
                value={selected}
                onChange={setSelected}
            />
            <Pair>
                <Chat messages={data.conversation.slice(selected * 2, (selected + 1) * 2)} />
                <Inspector title="Usage">
                    <Rows
                        rows={[
                            ['Input tokens', current.inputTokens.toLocaleString('en-US'), true],
                            ['Output tokens', current.outputTokens],
                            ['This request', dollars(current.cost)],
                            [
                                'Conversation so far',
                                dollars(data.usage.slice(0, selected + 1).reduce((sum, item) => sum + item.cost, 0)),
                            ],
                        ]}
                    />
                    <div className="aio-messages">
                        <Message role="Captured catalog context">
                            <pre className="aio-json">
                                <code>
                                    {Object.entries(current.input).map(([key, value]) => (
                                        <span key={key}>
                                            {key}: {JSON.stringify(value)}
                                        </span>
                                    ))}
                                </code>
                            </pre>
                        </Message>
                    </div>
                    <p className="aio-footnote" role="note">
                        Illustrative usage and costs.
                    </p>
                </Inspector>
            </Pair>
        </>
    )
}

export function AioLatencyFigure(): JSX.Element {
    return (
        <Exhibit label="Inspect operation timing">
            <Latency />
        </Exhibit>
    )
}
function Latency(): JSX.Element {
    return (
        <Pair>
            <Chat messages={data.cityMessages()} />
            <Inspector title="Trace">
                <Rows rows={[['Request duration', '1.4s']]} />
                <div className="aio-timeline">
                    {['search_stays · 400ms', 'Recommend a stay · 1.0s'].map((label, index) => (
                        <div key={label} className="aio-timeline-operation">
                            {label}
                            <span className="aio-track">
                                <span className={index ? 'aio-generation-duration' : 'aio-search-duration'} />
                            </span>
                        </div>
                    ))}
                </div>
                <p className="aio-footnote" role="note">
                    Illustrative timing.
                </p>
            </Inspector>
        </Pair>
    )
}

export function AioRecommendationFigure(): JSX.Element {
    return (
        <Exhibit label="Follow a recommendation into the product">
            <Recommendation />
        </Exhibit>
    )
}
function Recommendation(): JSX.Element {
    const [opened, setOpened] = useState(false)
    const [saved, setSaved] = useState(false)
    const [saveRecorded, setSaveRecorded] = useState(false)
    return (
        <Pair>
            {!opened ? (
                <Chat messages={data.conversation.slice(2, 4)} onViewStay={() => setOpened(true)} />
            ) : (
                <CompactRecommendedStay
                    stay={data.beach}
                    image={image(data.beach)}
                    saved={saved}
                    onSavedChange={(next) => {
                        setSaved(next)
                        if (next) setSaveRecorded(true)
                    }}
                />
            )}
            <Inspector title="Activity">
                {!opened ? (
                    <Note>Open the recommended stay to see its events.</Note>
                ) : (
                    <InspectionResults
                        label="Recommendation events"
                        rows={data.recommendationEvents(saveRecorded).map((item) => ({
                            label: item.event,
                            code: true,
                            result: item.time,
                            details: <LinkedEventRows saved={item.event === 'stay_saved'} />,
                        }))}
                    />
                )}
            </Inspector>
        </Pair>
    )
}
function LinkedEventRows({ saved }: { saved: boolean }): JSX.Element {
    return (
        <Rows
            rows={[
                ['Visitor', data.recommendation.visitor],
                [<code key="stay">stay_id</code>, data.recommendation.stay],
                ['Generation', data.recommendation.generation],
                ['Trace', data.recommendation.trace],
                ['AI session', data.recommendation.session],
                ...(saved ? [['Time since opening', '3 minutes'] as [ReactNode, ReactNode]] : []),
            ]}
        />
    )
}
export function AioOutcomeFunnelFigure(): JSX.Element {
    return (
        <Exhibit label="Inspect a recommendation-to-save funnel">
            <OutcomeFunnel />
        </Exhibit>
    )
}
function OutcomeFunnel(): JSX.Element {
    const [selected, setSelected] = useState(0)
    return (
        <Pair>
            <Inspector title="Recommendation → Save">
                <Note>Last 7 days · Saved within 30 minutes of opening</Note>
                <div className="aio-funnel">
                    {data.outcomeFunnel.map((step, index) => (
                        <button
                            type="button"
                            key={step.event}
                            onClick={() => setSelected(index)}
                            aria-pressed={selected === index}
                            data-highlighted={selected === index}
                        >
                            <strong>{step.label}</strong>
                            <span
                                className="aio-funnel-bar"
                                style={{ width: `${(step.visitors / data.outcomeFunnel[0].visitors) * 100}%` }}
                            />
                            <span>
                                {step.visitors} visitors · {(step.visitors / data.outcomeFunnel[0].visitors) * 100}%
                            </span>
                        </button>
                    ))}
                </div>
                <p className="aio-footnote" role="note">
                    Illustrative funnel data.
                </p>
            </Inspector>
            <Inspector title={data.outcomeFunnel[selected].event}>
                <Rows
                    rows={[
                        ['Visitor', data.recommendation.visitor],
                        ['Stay', 'Flamingo’s Envy'],
                        ['Recommendation', data.recommendation.generation],
                        ['Time', selected ? '12:07' : '12:04'],
                    ]}
                />
                {selected === 1 && <Note>Saved 3 minutes after opening · within the 30-minute window.</Note>}
                <p className="aio-footnote" role="note">
                    One example from {data.outcomeFunnel[selected].visitors} visitors in this step.
                </p>
            </Inspector>
        </Pair>
    )
}
export function AioHumanReviewFigure(): JSX.Element {
    return (
        <Exhibit label="Review an answer">
            <HumanReview />
        </Exhibit>
    )
}
function HumanReview(): JSX.Element {
    return (
        <Pair>
            <Chat messages={data.cityMessages()} />
            <Inspector title="Review">
                <Rows
                    heading={['Criterion', 'Assessment']}
                    rows={[
                        ['Avoids recommending an undersized stay', 'Yes'],
                        ['Helps the visitor find an alternative', 'No'],
                    ]}
                />
                <Section>Review note</Section>
                <Note>Keep the group size at four. Offer a forest or beach stay instead.</Note>
            </Inspector>
        </Pair>
    )
}
