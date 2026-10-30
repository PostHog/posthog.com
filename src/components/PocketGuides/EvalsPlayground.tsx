import React, { useRef, useState } from 'react'
import { IconArrowRight, IconLaptop, IconLogomark, IconRefresh, IconServer, IconTerminal } from '@posthog/icons'
import { HedgehogJudge, HedgehogResearch } from '@posthog/brand/hoggies'
import OSButton from 'components/OSButton'
import { CalloutBox } from 'components/Docs/CalloutBox'
import { badgeClasses } from 'components/Docs/Steps'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'

/**
 * Offline and online evals, side by side. Each lane walks Input (0) → Output (1) → Evaluator (2) → reported (3).
 * The box at a lane's step is current, earlier boxes are done, and later ones are locked.
 */

type Lane = 'offline' | 'online'
type Scorer = 'judge' | 'code' | 'sentiment'
type ScoreKind = 'pass' | 'fail' | 'tone'

const CASES = {
    real: {
        input: '“Can I return an item I bought 45 days ago?”',
        output: '“The return window is 30 days. This purchase is outside it.”',
        expected: 'Decline the late return; explain the 30-day policy.',
    },
    synthetic: {
        input: '“Could I return something I bought 90 days ago?”',
        output: '“The return window is 30 days. This purchase is outside it.”',
        expected: 'Decline the late return; explain the 30-day policy.',
    },
    live: {
        input: '“This was a gift, I have no receipt, and it broke after 45 days. I’m frustrated. Can you replace it?”',
        output: '“The return window is 30 days, so we can’t help.”',
    },
}

const SCORERS: Record<Scorer, { label: string; criterion: string; caption: string }> = {
    judge: {
        label: 'LLM judge',
        criterion: 'Does the answer apply the right policy to this request?',
        caption: 'Validate the request and response against the policy.',
    },
    code: {
        label: 'Code',
        criterion: 'Does the answer mention “30 days”?',
        caption: 'A narrow rule: can pass even when answer is wrong.',
    },
    sentiment: {
        label: 'Sentiment',
        criterion: 'What tone does the user’s message express?',
        caption: 'Measures the user’s tone, not answer correctness.',
    },
}

// Each evaluator type reaches its own verdict on the live case.
const ONLINE_RESULTS: Record<Scorer, { label: string; kind: ScoreKind; caption: string }> = {
    judge: {
        label: 'Fail ↘',
        kind: 'fail',
        caption: 'Fail: it ignores the defect and applies the ordinary return rule.',
    },
    code: {
        label: 'Pass ✓',
        kind: 'pass',
        caption: 'Pass: the answer mentions “30 days”. A narrow rule can pass even when the answer is wrong.',
    },
    sentiment: {
        label: 'Negative ↘',
        kind: 'fail',
        caption: 'Negative: the user sounds frustrated, so the conversation gets flagged.',
    },
}

const SCORE_LABEL: Record<string, string> = {
    pass: 'Pass ✓',
    true: 'True ✓',
    neutral: 'Neutral',
}

const ACTIONS: Record<Lane, string[]> = {
    offline: ['Run your agent on this case', 'Send to your evaluator runner', 'Report scores to PostHog'],
    online: ['Let your agent respond', 'Trace it into PostHog', 'Record scores in PostHog'],
}

const TOOL_CALL = { name: 'lookup_policy()', result: 'returns: 30 days; defects: one-year warranty' }

// Result colors: green pass, red fail, gray for neutral and waiting.
const SCORE_STYLES: Record<ScoreKind | 'waiting', string> = {
    pass: 'border-green/40 bg-green/10 text-green',
    fail: 'border-red/40 bg-red/10 text-red',
    tone: 'border-primary bg-accent text-secondary dark:bg-accent-dark',
    waiting: 'border-primary bg-accent text-secondary dark:bg-accent-dark',
}

// The box used by Learn figures and callouts. Here: data boxes inside a white card.
const PANEL = 'rounded border border-primary bg-accent dark:bg-accent-dark'
// The eyebrow used by figure captions.
const EYEBROW = 'text-xs font-bold uppercase tracking-wide'

const initialState = {
    steps: { offline: 0, online: 0 } as Record<Lane, number>,
    origin: 'real' as 'real' | 'synthetic',
    store: 'code' as 'code' | 'posthog',
    scorers: { offline: 'judge', online: 'judge' } as Record<Lane, Scorer>,
}
type State = typeof initialState

function score(lane: Lane, state: State): { label: string; kind: ScoreKind } {
    const scorer = state.scorers[lane]
    if (lane === 'online') return ONLINE_RESULTS[scorer]
    if (scorer === 'sentiment') return { label: SCORE_LABEL.neutral, kind: 'tone' }
    return { label: scorer === 'code' ? SCORE_LABEL.true : SCORE_LABEL.pass, kind: 'pass' }
}

function caption(lane: Lane, state: State): string {
    const scorer = state.scorers[lane]
    const step = state.steps[lane]
    if (step < 2 && scorer === 'judge')
        return lane === 'offline'
            ? 'Scores the answer using the input, output, tool call, and reference answer.'
            : 'Scores the answer using the input, output, and tool call. Production requests have no reference answer.'
    if (lane === 'online' && step >= 2) return ONLINE_RESULTS[scorer].caption
    if (lane === 'online' && scorer === 'judge') return 'It ignores the defect and applies the ordinary return rule.'
    return SCORERS[scorer].caption
}

/** A locked box can't be focused or clicked, and fades like a disabled button. */
const lockedProps = (locked: boolean) =>
    locked ? { inert: '' as unknown as boolean, 'aria-disabled': true, className: 'opacity-50' } : {}

/** The numbered square from the docs `Steps` component. */
function StepNumber({ n, current = false }: { n: number; current?: boolean }): JSX.Element {
    return (
        <span
            className={`flex size-6 shrink-0 items-center justify-center rounded-md border border-b-4 text-sm font-bold ${
                // The current step matches its orange outline and primary button.
                current ? 'border-orange bg-orange/10' : 'border-primary'
            }`}
        >
            {n}
        </span>
    )
}

/** Where a step runs. Shown inside each step, so the steps need no wrapper box. */
const WHERE = {
    local: { icon: <IconLaptop />, label: 'Your local machine / CI' },
    runner: { icon: <IconTerminal />, label: 'Your evaluator runner' },
    app: { icon: <IconServer />, label: 'Your application' },
    posthog: { icon: <IconLogomark />, label: 'PostHog' },
}
type Where = keyof typeof WHERE

function Stage({
    lane,
    index,
    step,
    where,
    title,
    onAdvance,
    children,
}: {
    lane: Lane
    index: number
    step: number
    where: Where
    title: string
    onAdvance: () => void
    children: React.ReactNode
}): JSX.Element {
    const current = index === step
    const { className: lockedClass = '', ...locked } = lockedProps(index > step)
    return (
        <article
            data-current={current || undefined}
            className={`flex h-full min-w-0 scroll-m-6 flex-col rounded border bg-primary p-4 ${
                current ? 'border-orange' : 'border-primary'
            } ${lockedClass}`}
            {...locked}
        >
            <EnvironmentLabel {...WHERE[where]} />
            <div className="mb-3 flex items-center gap-2">
                <StepNumber n={index + 1} current={current} />
                <h3 className="m-0 text-base font-bold">{title}</h3>
            </div>
            {children}
            {current && (
                // Pinned to the bottom, so the next action sits level across the two lanes.
                <div className="mt-auto pt-4">
                    <OSButton
                        variant="primary"
                        size="md"
                        icon={<IconArrowRight />}
                        iconPosition="right"
                        onClick={onAdvance}
                        data-action={lane}
                    >
                        {ACTIONS[lane][index]}
                    </OSButton>
                </div>
            )}
        </article>
    )
}

/** Arrow between boxes: the caption, then the arrow centered under it. */
function Connector({ locked, children }: { locked: boolean; children: React.ReactNode }): JSX.Element {
    return (
        <div
            className={`flex flex-col items-center gap-1 py-3 text-center text-xs text-secondary ${
                locked ? 'opacity-50' : ''
            }`}
        >
            <span>{children}</span>
            <IconArrowRight className="size-4 shrink-0 rotate-90" />
        </div>
    )
}

/** A message as it appears in an AI trace: the role, then what was said. */
function Message({ role, children }: { role: 'user' | 'assistant'; children: React.ReactNode }): JSX.Element {
    return (
        <p className="m-0 text-sm leading-relaxed">
            <span className="font-code text-secondary">{role}:</span> {children}
        </p>
    )
}

/** Commentary for the reader, not data. Comes first under a card's divider. */
function Note({ children }: { children: React.ReactNode }): JSX.Element {
    return <p className="m-0 text-sm leading-relaxed text-secondary">{children}</p>
}

/** Data the evaluator can score with, shown where it's produced. */
function Evidence({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="mt-3 rounded border border-primary bg-accent px-3 py-2 text-sm dark:bg-accent-dark">
            <div className={`mb-1 text-secondary ${EYEBROW}`}>{label}</div>
            {children}
        </div>
    )
}

/**
 * Both lanes share one set of rows (via subgrid), so Input, Output and Evaluator line up side by side.
 * Rows: 1 heading, 2 intro, 3 input, 4 arrow, 5 output, 6 arrow, 7 evaluator.
 * Literal classes, so Tailwind can see them.
 */
const ROW = {
    1: 'row-start-[1]',
    2: 'row-start-[2]',
    3: 'row-start-[3]',
    4: 'row-start-[4]',
    5: 'row-start-[5]',
    6: 'row-start-[6]',
    7: 'row-start-[7]',
}

/** One row of a lane. */
function Cell({ row, children }: { row: keyof typeof ROW; children: React.ReactNode }): JSX.Element {
    return <div className={`col-start-1 min-w-0 ${ROW[row]}`}>{children}</div>
}

function EnvironmentLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className={`mb-4 flex items-center gap-2 text-secondary opacity-60 ${EYEBROW}`}>
            <span className="size-4 shrink-0">{icon}</span>
            {label}
        </div>
    )
}

function Result({ lane, state }: { lane: Lane; state: State }): JSX.Element {
    const scored = state.steps[lane] >= 2
    const result = score(lane, state)
    return (
        <div
            className={`mt-3 flex items-center justify-between gap-2.5 rounded border px-3 py-2 text-sm ${
                SCORE_STYLES[scored ? result.kind : 'waiting']
            }`}
        >
            Score produced here
            <strong className="text-sm">{scored ? result.label : 'Not scored yet'}</strong>
        </div>
    )
}

function Choice({
    label,
    title,
    value,
    options,
    onChange,
}: {
    label?: string
    title: string
    value: string
    options: { value: string; label: string }[]
    onChange: (value: string) => void
}): JSX.Element {
    return (
        <div className="mt-3 flex flex-wrap items-start gap-2">
            {label && <span className="shrink-0 pt-1 text-sm text-secondary">{label}</span>}
            <div className="min-w-0 flex-1">
                <ToggleGroup
                    title={title}
                    hideTitle
                    size="sm"
                    className="w-fit"
                    value={value}
                    onValueChange={onChange}
                    options={options.map((option) => ({
                        value: option.value,
                        label: <span className="whitespace-nowrap px-1.5">{option.label}</span>,
                    }))}
                />
            </div>
        </div>
    )
}

const scorerOptions = (Object.keys(SCORERS) as Scorer[]).map((value) => ({ value, label: SCORERS[value].label }))

function Evaluator({
    lane,
    where,
    state,
    onScorer,
    onAdvance,
}: {
    lane: Lane
    where: Where
    state: State
    onScorer: (scorer: Scorer) => void
    onAdvance: () => void
}): JSX.Element {
    return (
        <Stage lane={lane} index={2} step={state.steps[lane]} where={where} title="Evaluator" onAdvance={onAdvance}>
            <Choice
                label="Type"
                title={`${lane} evaluator`}
                value={state.scorers[lane]}
                options={scorerOptions}
                onChange={(value) => onScorer(value as Scorer)}
            />
            <div className="mt-3 flex items-baseline gap-2 text-sm leading-relaxed">
                <span className="shrink-0 text-secondary">Check</span>
                <p className="m-0">{SCORERS[state.scorers[lane]].criterion}</p>
            </div>
            <p className="m-0 mt-3 text-sm leading-relaxed text-secondary">{caption(lane, state)}</p>
            <Result lane={lane} state={state} />
        </Stage>
    )
}

function Output({
    waiting,
    placeholder,
    note,
    children,
}: {
    waiting: boolean
    placeholder: string
    note: string
    children: React.ReactNode
}): JSX.Element {
    return (
        <>
            {waiting ? (
                <p className="m-0 text-sm italic leading-relaxed text-secondary">{placeholder}</p>
            ) : (
                <Message role="assistant">{children}</Message>
            )}
            {!waiting && (
                <div className="mt-4 border-t border-primary pt-4">
                    <Note>{note}</Note>
                    <Evidence label="Tool call">
                        <code className="font-code font-semibold">{TOOL_CALL.name}</code> → {TOOL_CALL.result}
                    </Evidence>
                </div>
            )}
        </>
    )
}

function Report({
    title,
    lane,
    stepLocked,
    state,
    waiting,
    done,
}: {
    title: string
    lane: Lane
    /** The whole step is locked, so this result doesn't fade on its own as well. */
    stepLocked: boolean
    state: State
    waiting: string
    done: string
}): JSX.Element {
    const reported = state.steps[lane] === 3
    const result = score(lane, state)
    const { className: lockedClass = '', ...locked } = lockedProps(!reported && !stepLocked)
    return (
        <article className={`min-w-0 p-4 ${PANEL} ${lockedClass}`} {...locked}>
            <div className="flex items-center justify-between gap-2.5">
                <h3 className="m-0 text-sm font-bold">{title}</h3>
                <span
                    className={`whitespace-nowrap rounded border px-1.5 text-sm font-bold ${
                        SCORE_STYLES[reported ? result.kind : 'waiting']
                    }`}
                >
                    {reported ? result.label : 'Not yet'}
                </span>
            </div>
            <p className="m-0 mt-2 text-xs leading-relaxed text-secondary">{reported ? done : waiting}</p>
        </article>
    )
}

function LaneHeading({ id, title, tag, color }: { id: string; title: string; tag: string; color: string }) {
    return (
        <div className="mb-2 flex items-center gap-3">
            <h2 id={id} className="m-0 text-xl font-bold">
                {title}
            </h2>
            <span className={badgeClasses(color)}>{tag}</span>
        </div>
    )
}

export default function EvalsPlayground(): JSX.Element {
    const [state, setState] = useState(initialState)
    const root = useRef<HTMLDivElement>(null)
    const { steps } = state

    const advance = (lane: Lane) => {
        setState((s) => ({ ...s, steps: { ...s.steps, [lane]: Math.min(s.steps[lane] + 1, 3) } }))
        // After the click, lead to the next thing to click.
        requestAnimationFrame(() => {
            const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
            const action = root.current?.querySelector<HTMLElement>(`[data-current] [data-action="${lane}"]`)
            action?.focus({ preventScroll: true })
            const view = action?.closest('article') ?? root.current?.querySelector('#reporting')
            view?.scrollIntoView({ behavior, block: 'nearest' })
        })
    }
    const resetOffline = (patch: Partial<State>) =>
        setState((s) => ({ ...s, ...patch, steps: { ...s.steps, offline: 0 } }))
    const setScorer = (lane: Lane, scorer: Scorer) =>
        setState((s) => ({
            ...s,
            scorers: { ...s.scorers, [lane]: scorer },
            steps: { ...s.steps, [lane]: Math.min(s.steps[lane], 2) },
        }))
    const startOver = () => {
        setState((s) => ({ ...s, steps: initialState.steps, origin: 'real', store: 'code' }))
        root.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const offlineCase = CASES[state.origin]
    // Step 4 unlocks once either lane reports, and fades like any locked step until then.
    const resultsLocked = steps.offline < 3 && steps.online < 3
    const { className: resultsLockedClass = '', ...resultsLockedAttrs } = lockedProps(resultsLocked)

    return (
        <div ref={root} className="not-prose @container min-w-0 scroll-m-6">
            <h1 className="m-0 mb-2 text-2xl font-bold">AI evaluations, explained side by side.</h1>

            <CalloutBox type="action" icon="IconCursorClick" title="Before you ship, or after?">
                <div className="flex items-start gap-4 pt-3">
                    <p className="m-0 flex-1">
                        Offline evals test your changes on saved cases before they go live. Online evals grade the real
                        thing as it happens." Pick a path below and see what each one catches.
                    </p>
                    <HedgehogJudge size={112} className="hidden h-auto shrink-0 -mt-10 @md:block" />
                </div>
            </CalloutBox>

            {/* Two lanes on shared rows; stacked in narrow windows. */}
            <div className="grid gap-x-6 @2xl:grid-cols-2">
                <section className="row-span-7 grid min-w-0 grid-rows-subgrid" aria-labelledby="offline-title">
                    <Cell row={1}>
                        <LaneHeading id="offline-title" title="Offline evals" tag="Test known cases" color="green" />
                    </Cell>
                    <Cell row={2}>
                        <p className="m-0 mb-4 text-sm leading-relaxed text-secondary">
                            Like unit / integration tests for your AI.{' '}
                            <b className="text-primary">Run a test suite on your laptop or in your CI.</b>
                        </p>
                    </Cell>
                    <Cell row={3}>
                        <Stage
                            lane="offline"
                            index={0}
                            step={steps.offline}
                            where="local"
                            title="Input"
                            onAdvance={() => advance('offline')}
                        >
                            <Message role="user">{offlineCase.input}</Message>
                            <div className="mt-4 border-t border-primary pt-4">
                                <Choice
                                    label="Cases from"
                                    title="How test cases were created"
                                    value={state.origin}
                                    options={[
                                        { value: 'real', label: 'Real examples' },
                                        { value: 'synthetic', label: 'Synthetic' },
                                    ]}
                                    onChange={(origin) => resetOffline({ origin: origin as State['origin'] })}
                                />
                                <Choice
                                    label="Load via"
                                    title="How the runner loads cases"
                                    value={state.store}
                                    options={[
                                        { value: 'code', label: 'Your code' },
                                        { value: 'posthog', label: 'PostHog' },
                                    ]}
                                    onChange={(store) => resetOffline({ store: store as State['store'] })}
                                />
                                {/* Commentary goes after toggles, before data boxes. */}
                                <div className="mt-3">
                                    <Note>
                                        {state.origin === 'real'
                                            ? 'This is a test case you got from a real user input.'
                                            : 'This is a test case that you made up.'}{' '}
                                        {state.store === 'posthog'
                                            ? 'It’s stored as a PostHog dataset and fetched by your local / CI runner.'
                                            : 'It’s defined in your code and loaded by your test runner.'}
                                    </Note>
                                </div>
                                <Evidence label="Reference answer">{offlineCase.expected}</Evidence>
                            </div>
                        </Stage>
                    </Cell>
                    <Cell row={4}>
                        <Connector locked={steps.offline < 1}>Your agent runs on this test case</Connector>
                    </Cell>
                    <Cell row={5}>
                        <Stage
                            lane="offline"
                            index={1}
                            step={steps.offline}
                            where="local"
                            title="Output"
                            onAdvance={() => advance('offline')}
                        >
                            <Output
                                waiting={steps.offline === 0}
                                placeholder="Waiting for a new test run…"
                                note="Generated for this test."
                            >
                                {offlineCase.output}
                            </Output>
                        </Stage>
                    </Cell>
                    <Cell row={6}>
                        <Connector locked={steps.offline < 2}>Pass input, output + tool call</Connector>
                    </Cell>
                    <Cell row={7}>
                        <Evaluator
                            lane="offline"
                            where="runner"
                            state={state}
                            onScorer={(scorer) => setScorer('offline', scorer)}
                            onAdvance={() => advance('offline')}
                        />
                    </Cell>
                </section>

                <section
                    className="row-span-7 mt-8 grid min-w-0 grid-rows-subgrid @2xl:mt-0"
                    aria-labelledby="online-title"
                >
                    <Cell row={1}>
                        <LaneHeading
                            id="online-title"
                            title="Online evals"
                            tag="Discover missed cases"
                            color="purple"
                        />
                    </Cell>
                    <Cell row={2}>
                        <p className="m-0 mb-4 text-sm leading-relaxed text-secondary">
                            Real users go beyond your finite test suite.{' '}
                            <b className="text-primary">Monitor their interactions in PostHog.</b>
                        </p>
                    </Cell>
                    <Cell row={3}>
                        <Stage
                            lane="online"
                            index={0}
                            step={steps.online}
                            where="app"
                            title="Input"
                            onAdvance={() => advance('online')}
                        >
                            <Message role="user">{CASES.live.input}</Message>
                            <div className="mt-4 border-t border-primary pt-4">
                                <Note>
                                    This is an unexpected request from a real user in prod. This user is asking about a
                                    defective product, but your test suite only covers late returns.
                                </Note>
                            </div>
                        </Stage>
                    </Cell>
                    <Cell row={4}>
                        <Connector locked={steps.online < 1}>Your agent responds to the user</Connector>
                    </Cell>
                    <Cell row={5}>
                        <Stage
                            lane="online"
                            index={1}
                            step={steps.online}
                            where="app"
                            title="Output"
                            onAdvance={() => advance('online')}
                        >
                            <Output
                                waiting={steps.online === 0}
                                placeholder="Waiting for the app’s response…"
                                note="Captured from production."
                            >
                                {CASES.live.output}
                            </Output>
                        </Stage>
                    </Cell>
                    <Cell row={6}>
                        <Connector locked={steps.online < 2}>
                            AI Observability tracing captures input, output + tool calls in PostHog
                        </Connector>
                    </Cell>
                    <Cell row={7}>
                        <Evaluator
                            lane="online"
                            where="posthog"
                            state={state}
                            onScorer={(scorer) => setScorer('online', scorer)}
                            onAdvance={() => advance('online')}
                        />
                    </Cell>
                </section>
            </div>

            <div className="grid grid-cols-2 gap-6" aria-hidden="true">
                <Connector locked={steps.offline < 3}>Your runner reports the scores</Connector>
                <Connector locked={steps.online < 3}>PostHog records the scores</Connector>
            </div>
            <section
                id="reporting"
                aria-labelledby="reporting-title"
                className={`scroll-m-6 rounded border bg-primary p-4 ${
                    resultsLocked ? 'border-primary' : 'border-orange'
                } ${resultsLockedClass}`}
                {...resultsLockedAttrs}
            >
                <EnvironmentLabel {...WHERE.posthog} />
                <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <h2 id="reporting-title" className="m-0 flex items-center gap-2 text-lg font-bold">
                        <StepNumber n={4} current={!resultsLocked} />
                        Results in PostHog
                    </h2>
                    <div className="flex items-center gap-3">
                        {!resultsLocked && (
                            <OSButton variant="secondary" size="xs" icon={<IconRefresh />} onClick={startOver}>
                                Start over
                            </OSButton>
                        )}
                    </div>
                </div>
                <div className="mb-4">
                    <Note>Same destination, different workflows.</Note>
                </div>
                <div className="grid gap-4 @2xl:grid-cols-2">
                    <Report
                        title="Offline evals"
                        lane="offline"
                        stepLocked={resultsLocked}
                        state={state}
                        waiting="Waiting for your runner to report its results."
                        done="Reported by your runner. Compare test runs and catch regressions."
                    />
                    <Report
                        title="Online evals"
                        lane="online"
                        stepLocked={resultsLocked}
                        state={state}
                        waiting="Waiting for the evaluation results."
                        done="Recorded in PostHog. Inspect the trace and track real-world patterns."
                    />
                </div>
            </section>

            {/* Same cream as the "Test instructions" callout (CalloutBox type="action"). */}
            <div className="mt-6 flex flex-col gap-2 rounded border border-yellow bg-yellow/15 p-6 @xl:flex-row @xl:items-center @xl:gap-6">
                <HedgehogResearch size={128} className="h-auto w-20 shrink-0 @xl:order-last @xl:w-32" />
                <div className="min-w-0 flex-1">
                    <h2 className="m-0 mb-1.5 text-xl font-bold">
                        'It works on my computer' doesn’t apply to your agent
                    </h2>
                    <p className="m-0 text-base text-secondary">
                        Don’t let your agent run wild without running evals first.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <OSButton asLink to="/docs/ai-observability" variant="primary" size="md">
                            Add AI observability
                        </OSButton>
                        <OSButton asLink to="/docs/ai-evals" variant="secondary" size="md">
                            Read about evals
                        </OSButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
