import React, { useRef, useState } from 'react'
import { IconArrowRight, IconLaptop, IconLogomark, IconRefresh, IconServer, IconTerminal } from '@posthog/icons'
import { HedgehogJudge, HedgehogResearch } from '@posthog/brand/hoggies'
import OSButton from 'components/OSButton'
import { CalloutBox } from 'components/Docs/CalloutBox'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'

/**
 * Offline and online evals, side by side and in lockstep. Both lanes walk Input (0) → Output (1) → Evaluator (2) →
 * reported (3), moved on by one shared button under the current row.
 * The boxes at the step are current, earlier boxes are done, and later ones are locked.
 * Step 4 then closes the loop: the failing live request becomes an offline test case and the fix ships, so a second
 * pass shows the saved case passing offline and the next similar request passing online.
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
    // The live request once it's saved as a test case and the prompt is fixed.
    saved: {
        output: '“Returns are limited to 30 days, but defects have a one-year warranty. I can help replace it.”',
        expected: 'Recognize a defect; offer help under the one-year warranty.',
    },
    // The next similar request in production, after the fix ships. The agent answers with `saved.output`.
    next: {
        input: '“It was a gift, so I don’t have a receipt. It stopped working after two months. Can I get it replaced?”',
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

// The same evaluators on the next similar request, once the fix is in production.
const SHIPPED_RESULTS: Record<Scorer, { label: string; kind: ScoreKind; caption: string }> = {
    judge: {
        label: 'Pass ✓',
        kind: 'pass',
        caption: 'Pass: the fixed prompt applies the warranty to the defect, in production too.',
    },
    code: { label: 'Pass ✓', kind: 'pass', caption: 'Pass: the answer still mentions “30 days”.' },
    sentiment: { label: 'Neutral', kind: 'tone', caption: 'Neutral: this user is calm, so nothing gets flagged.' },
}

const SCORE_LABEL: Record<string, string> = {
    pass: 'Pass ✓',
    true: 'True ✓',
    neutral: 'Neutral',
}

// The shared button under each row, by step.
const ACTIONS = ['Run both agents', 'Evaluate both outputs', 'Report results to PostHog']

// Names each box in narrow windows, where the lanes interleave row by row.
const LANE_NAME: Record<Lane, string> = { offline: 'Offline', online: 'Online' }

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
// Slow enough to notice after a scroll, for text the reader should not miss.
const FADE_IN = 'animate-slide-up-fade-in [animation-duration:900ms] [animation-fill-mode:both]'
// Step 4's conclusion and its button fade in together, a beat after the results open.
const CONCLUSION_FADE = `${FADE_IN} [animation-delay:700ms]`

const initialState = {
    step: 0,
    origin: 'real' as 'real' | 'synthetic',
    store: 'code' as 'code' | 'posthog',
    scorers: { offline: 'judge', online: 'judge' } as Record<Lane, Scorer>,
    /**
     * Step 4 closed the loop: the live request is saved as an offline test case, and the fix shipped,
     * so the online lane handles the next similar request.
     */
    fixed: false,
}
type State = typeof initialState

function score(lane: Lane, state: State): { label: string; kind: ScoreKind } {
    const scorer = state.scorers[lane]
    if (lane === 'online') return (state.fixed ? SHIPPED_RESULTS : ONLINE_RESULTS)[scorer]
    // The saved case still carries the frustrated user's message.
    if (scorer === 'sentiment')
        return state.fixed ? ONLINE_RESULTS.sentiment : { label: SCORE_LABEL.neutral, kind: 'tone' }
    return { label: scorer === 'code' ? SCORE_LABEL.true : SCORE_LABEL.pass, kind: 'pass' }
}

function caption(lane: Lane, state: State): string {
    const scorer = state.scorers[lane]
    const { step } = state
    if (step < 2 && scorer === 'judge')
        return lane === 'offline'
            ? 'Scores the answer using the input, output, tool call, and reference answer.'
            : 'Scores the answer using the input, output, and tool call. Production requests have no reference answer.'
    if (lane === 'online' && step >= 2) return (state.fixed ? SHIPPED_RESULTS : ONLINE_RESULTS)[scorer].caption
    if (lane === 'online' && scorer === 'judge') return 'It ignores the defect and applies the ordinary return rule.'
    if (state.fixed && step >= 2 && scorer === 'judge')
        return 'Pass: the fixed prompt applies the warranty to the defect, not the return window.'
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
// Blue for steps in the user's environment, purple for steps in PostHog.
const YOURS = 'bg-blue/10 text-blue'
const WHERE = {
    local: { icon: <IconLaptop />, label: 'Your local machine / CI', color: YOURS },
    runner: { icon: <IconTerminal />, label: 'Your evaluator runner', color: YOURS },
    app: { icon: <IconServer />, label: 'Your application', color: YOURS },
    posthog: { icon: <IconLogomark />, label: 'PostHog', color: 'bg-purple/10 text-purple' },
}
type Where = keyof typeof WHERE

function Stage({
    lane,
    index,
    step,
    where,
    title,
    children,
}: {
    lane: Lane
    index: number
    step: number
    where: Where
    title: string
    children: React.ReactNode
}): JSX.Element {
    const current = index === step
    const { className: lockedClass = '', ...locked } = lockedProps(index > step)
    return (
        <article
            className={`h-full min-w-0 scroll-m-6 rounded border bg-primary p-4 ${
                current ? 'border-orange' : 'border-primary'
            } ${lockedClass}`}
            {...locked}
        >
            <EnvironmentLabel {...WHERE[where]} />
            <div className="mb-3 flex items-center gap-2">
                <StepNumber n={index + 1} current={current} />
                <h3 className="m-0 text-base font-bold">
                    <span className="font-normal text-secondary @2xl:hidden">{LANE_NAME[lane]} · </span>
                    {title}
                </h3>
            </div>
            {children}
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
 * In wide windows both lanes share one grid, so Input, Output and Evaluator line up side by side.
 * Rows: 1 heading, 2 input, 3 button, 4 arrow, 5 output, 6 button, 7 arrow, 8 evaluator, 9 button.
 * In narrow windows the cells stack in source order, so each row's offline box, online box, then button.
 * Literal classes, so Tailwind can see them.
 */
const ROW = {
    1: '@2xl:row-start-[1]',
    2: '@2xl:row-start-[2]',
    3: '@2xl:row-start-[3]',
    4: '@2xl:row-start-[4]',
    5: '@2xl:row-start-[5]',
    6: '@2xl:row-start-[6]',
    7: '@2xl:row-start-[7]',
    8: '@2xl:row-start-[8]',
    9: '@2xl:row-start-[9]',
}

/** One row of a lane. */
function Cell({
    lane,
    row,
    className = '',
    children,
}: {
    lane: Lane
    row: keyof typeof ROW
    className?: string
    children: React.ReactNode
}): JSX.Element {
    const column = lane === 'offline' ? '@2xl:col-start-1' : '@2xl:col-start-2'
    return <div className={`min-w-0 ${column} ${ROW[row]} ${className}`}>{children}</div>
}

function EnvironmentLabel({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
    return (
        <div className={`mb-4 flex w-fit items-center gap-2 rounded px-2 py-1 ${color} ${EYEBROW}`}>
            <span className="size-4 shrink-0">{icon}</span>
            {label}
        </div>
    )
}

function Result({ lane, state }: { lane: Lane; state: State }): JSX.Element {
    const scored = state.step >= 2
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
}: {
    lane: Lane
    where: Where
    state: State
    onScorer: (scorer: Scorer) => void
}): JSX.Element {
    return (
        <Stage lane={lane} index={2} step={state.step} where={where} title="Evaluator">
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
    state,
    waiting,
    done,
}: {
    title: string
    lane: Lane
    state: State
    waiting: string
    done: string
}): JSX.Element {
    const reported = state.step === 3
    const result = score(lane, state)
    return (
        <article className={`min-w-0 p-4 ${PANEL}`}>
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

function LaneHeading({ id, title, tag }: { id: string; title: string; tag: string }) {
    return (
        <div className="mb-2 flex items-center gap-3">
            <h2 id={id} className="m-0 text-xl font-bold">
                {title}
            </h2>
            <span className="mt-0.5 text-sm text-secondary">{tag}</span>
        </div>
    )
}

export default function EvalsPlayground(): JSX.Element {
    const [state, setState] = useState(initialState)
    // Bumped once the scroll back up ends, to play the fade-in of the new requests.
    const [reveal, setReveal] = useState(0)
    const root = useRef<HTMLDivElement>(null)
    const { step } = state

    const advance = () => {
        setState((s) => ({ ...s, step: Math.min(s.step + 1, 3) }))
        // After the click, lead to the next thing to click: the button under the next row, or under the results.
        requestAnimationFrame(() => {
            const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
            const action = root.current?.querySelector<HTMLElement>('[data-action]')
            action?.focus({ preventScroll: true })
            // The last button sits under the results box, so center it to keep the results in view above it.
            action?.scrollIntoView({ behavior, block: action.dataset.action === 'loop' ? 'center' : 'nearest' })
        })
    }
    // Both evaluators keep the same step, so a new type rescores in place.
    const setScorer = (lane: Lane, scorer: Scorer) =>
        setState((s) => ({ ...s, scorers: { ...s.scorers, [lane]: scorer } }))
    const startOver = () => {
        setState((s) => ({ ...s, step: 0, origin: 'real', store: 'code', fixed: false }))
        setReveal(0)
        root.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    // The live request becomes a test case in a PostHog dataset and the fix ships. Both lanes go back to Input
    // for a second pass, the page scrolls up to them, and the new requests fade in.
    const closeLoop = () => {
        setState((s) => ({ ...s, step: 0, origin: 'real', store: 'posthog', fixed: true }))
        setReveal(0)
        requestAnimationFrame(() => {
            const action = root.current?.querySelector<HTMLElement>('[data-action="advance"]')
            action?.focus({ preventScroll: true })
            root.current?.querySelector('#inputs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            // Fade in when the scroll stops, so the change happens in view. Some browsers lack scrollend.
            let played = false
            const play = () => {
                if (played) return
                played = true
                document.removeEventListener('scrollend', play, true)
                setReveal((r) => r + 1)
            }
            document.addEventListener('scrollend', play, true)
            setTimeout(play, 1200)
        })
    }

    const offlineCase = state.fixed ? { ...CASES.live, ...CASES.saved } : CASES[state.origin]
    // The new requests stay hidden until the scroll up ends, then fade in one part at a time:
    // offline input, its reference answer, then online input and its note. Delays are literal so Tailwind sees them.
    const fixedFade = (delay: string) => (!state.fixed ? '' : reveal ? `${FADE_IN} ${delay}` : 'opacity-0')

    // The shared button under a row, shown while that row is current.
    const advanceRow = (index: number, row: keyof typeof ROW) =>
        step === index && (
            <div className={`flex justify-center pt-4 @2xl:col-span-2 ${ROW[row]}`}>
                <OSButton
                    variant="primary"
                    size="md"
                    icon={<IconArrowRight className="rotate-90" />}
                    iconPosition="right"
                    onClick={advance}
                    data-action="advance"
                >
                    {ACTIONS[index]}
                </OSButton>
            </div>
        )

    // Step 4 unlocks once both lanes report, and fades like any locked step until then.
    const resultsLocked = step < 3
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

            {/* Both lanes in one grid: side by side in wide windows, interleaved row by row in narrow ones. */}
            <div className="grid gap-x-6 @2xl:grid-cols-2">
                <Cell lane="offline" row={1}>
                    <LaneHeading id="offline-title" title="Offline evals" tag="Test known cases" />
                    <p className="m-0 mb-4 text-sm leading-relaxed text-secondary">
                        Like unit / integration tests for your AI.{' '}
                        <b className="text-primary">Run a test suite on your laptop or in your CI.</b>
                    </p>
                </Cell>
                <Cell lane="offline" row={2}>
                    <div id="inputs" className="h-full scroll-m-6">
                        <Stage lane="offline" index={0} step={step} where="local" title="Input">
                            <div key={reveal} className={fixedFade('[animation-delay:300ms]')}>
                                <Message role="user">{offlineCase.input}</Message>
                            </div>
                            <div className="mt-4 border-t border-primary pt-4">
                                <Choice
                                    label="Cases from"
                                    title="How test cases were created"
                                    value={state.origin}
                                    options={[
                                        { value: 'real', label: 'Real examples' },
                                        { value: 'synthetic', label: 'Synthetic' },
                                    ]}
                                    // Both cases get the same answer, so only the input changes. A saved case goes
                                    // back to the start of the loop.
                                    onChange={(origin) =>
                                        setState((s) => ({ ...s, origin: origin as State['origin'], fixed: false }))
                                    }
                                />
                                <Choice
                                    label="Load via"
                                    title="How the runner loads cases"
                                    value={state.store}
                                    options={[
                                        { value: 'code', label: 'Your code' },
                                        { value: 'posthog', label: 'PostHog' },
                                    ]}
                                    onChange={(store) => setState((s) => ({ ...s, store: store as State['store'] }))}
                                />
                                {/* Commentary goes after toggles, before data boxes. */}
                                <div className="mt-3">
                                    <Note>
                                        {state.fixed
                                            ? 'This is the production request that failed, now saved as a test case.'
                                            : state.origin === 'real'
                                            ? 'This is a test case you got from a real user input.'
                                            : 'This is a test case that you made up.'}{' '}
                                        {state.store === 'posthog'
                                            ? 'It’s stored as a PostHog dataset and fetched by your local / CI runner.'
                                            : 'It’s defined in your code and loaded by your test runner.'}
                                    </Note>
                                </div>
                                <div key={reveal} className={fixedFade('[animation-delay:800ms]')}>
                                    <Evidence label="Reference answer">{offlineCase.expected}</Evidence>
                                </div>
                            </div>
                        </Stage>
                    </div>
                </Cell>

                <Cell lane="online" row={1} className="mt-8 @2xl:mt-0">
                    <LaneHeading id="online-title" title="Online evals" tag="Discover missed cases" />
                    <p className="m-0 mb-4 text-sm leading-relaxed text-secondary">
                        Real users go beyond your finite test suite.{' '}
                        <b className="text-primary">Monitor their interactions in PostHog.</b>
                    </p>
                </Cell>
                <Cell lane="online" row={2}>
                    <Stage lane="online" index={0} step={step} where="app" title="Input">
                        <div key={reveal} className={fixedFade('[animation-delay:1300ms]')}>
                            <Message role="user">{state.fixed ? CASES.next.input : CASES.live.input}</Message>
                        </div>
                        <div className="mt-4 border-t border-primary pt-4">
                            <div key={reveal} className={fixedFade('[animation-delay:1800ms]')}>
                                <Note>
                                    {state.fixed
                                        ? 'Another user submits a similar request about a product defect. This time, you have an offline test for it.'
                                        : 'This is an unexpected request from a real user in prod. This user is asking about a defective product, but your test suite only covers late returns.'}
                                </Note>
                            </div>
                        </div>
                    </Stage>
                </Cell>
                {advanceRow(0, 3)}

                <Cell lane="offline" row={4}>
                    <Connector locked={step < 1}>
                        {state.fixed
                            ? 'Prompt fixed · your agent reruns this test case'
                            : 'Your agent runs on this test case'}
                    </Connector>
                </Cell>
                <Cell lane="offline" row={5}>
                    <Stage lane="offline" index={1} step={step} where="local" title="Output">
                        <Output
                            waiting={step === 0}
                            placeholder="Waiting for a new test run…"
                            note={state.fixed ? 'Generated with your fixed prompt.' : 'Generated for this test.'}
                        >
                            {offlineCase.output}
                        </Output>
                    </Stage>
                </Cell>
                <Cell lane="online" row={4}>
                    <Connector locked={step < 1}>
                        {state.fixed ? 'Your fixed agent responds to the user' : 'Your agent responds to the user'}
                    </Connector>
                </Cell>
                <Cell lane="online" row={5}>
                    <Stage lane="online" index={1} step={step} where="app" title="Output">
                        <Output
                            waiting={step === 0}
                            placeholder="Waiting for the app’s response…"
                            note="Captured from production."
                        >
                            {state.fixed ? CASES.saved.output : CASES.live.output}
                        </Output>
                    </Stage>
                </Cell>
                {advanceRow(1, 6)}

                <Cell lane="offline" row={7}>
                    <Connector locked={step < 2}>Pass input, output + tool call</Connector>
                </Cell>
                <Cell lane="offline" row={8}>
                    <Evaluator
                        lane="offline"
                        where="runner"
                        state={state}
                        onScorer={(scorer) => setScorer('offline', scorer)}
                    />
                </Cell>
                <Cell lane="online" row={7}>
                    <Connector locked={step < 2}>
                        AI Observability tracing captures input, output + tool calls in PostHog
                    </Connector>
                </Cell>
                <Cell lane="online" row={8}>
                    <Evaluator
                        lane="online"
                        where="posthog"
                        state={state}
                        onScorer={(scorer) => setScorer('online', scorer)}
                    />
                </Cell>
                {advanceRow(2, 9)}
            </div>

            <div className="grid grid-cols-2 gap-6" aria-hidden="true">
                <Connector locked={resultsLocked}>Your runner reports the scores</Connector>
                <Connector locked={resultsLocked}>PostHog records the scores</Connector>
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
                <div className="mb-4">
                    <h2 id="reporting-title" className="m-0 flex items-center gap-2 text-lg font-bold">
                        <StepNumber n={4} current={!resultsLocked} />
                        Results in PostHog
                    </h2>
                </div>
                <div className="mb-4">
                    <Note>Same destination, different workflows.</Note>
                </div>
                <div className="grid gap-4 @2xl:grid-cols-2">
                    <Report
                        title="Offline evals"
                        lane="offline"
                        state={state}
                        waiting="Waiting for your runner to report its results."
                        done={
                            state.fixed
                                ? 'Reported by your runner. The fix passes, and this case now guards against regressions.'
                                : 'Reported by your runner. Compare test runs and catch regressions.'
                        }
                    />
                    <Report
                        title="Online evals"
                        lane="online"
                        state={state}
                        waiting="Waiting for the evaluation results."
                        done={
                            state.fixed
                                ? 'Recorded in PostHog. The fix holds up on real traffic.'
                                : 'Recorded in PostHog. Inspect the trace and track real-world patterns.'
                        }
                    />
                </div>
                {/* Close the loop: the live request becomes an offline test, the fix ships, and both lanes rerun. */}
                {/* Fades in a beat after step 4 opens, so the conclusion gets read. */}
                {step === 3 && (
                    <div className={`mt-4 ${CONCLUSION_FADE}`}>
                        {/* The page's main takeaway, so it leads in bold. */}
                        <p className="m-0 mb-1 text-base font-bold">
                            {state.fixed ? 'Both tracks pass.' : 'Strengthen your offline tests.'}
                        </p>
                        <Note>
                            {state.fixed
                                ? 'Offline evals guard against regressions before you ship. Online evals confirm the fix holds up in production.'
                                : 'Turn a failed production request into an offline eval. Add it to your test suite and ship the fix to close the loop.'}
                        </Note>
                    </div>
                )}
            </section>
            {/* Outside the box and centered, like the shared button under each row. */}
            {step === 3 && (
                <div className={`flex justify-center pt-4 ${CONCLUSION_FADE}`}>
                    {state.fixed ? (
                        <OSButton
                            variant="secondary"
                            size="md"
                            icon={<IconRefresh />}
                            onClick={startOver}
                            data-action="loop"
                        >
                            Start over
                        </OSButton>
                    ) : (
                        <OSButton
                            variant="primary"
                            size="md"
                            // Matches the shared buttons under each row.
                            icon={<IconArrowRight className="rotate-90" />}
                            iconPosition="right"
                            onClick={closeLoop}
                            data-action="loop"
                        >
                            Add to offline evals
                        </OSButton>
                    )}
                </div>
            )}

            {/* Same cream as the "Test instructions" callout (CalloutBox type="action"). */}
            <div className="mt-16 flex flex-col gap-2 rounded border border-yellow bg-yellow/15 p-6 @xl:flex-row @xl:items-center @xl:gap-6">
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
                            Add AI Observability
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
