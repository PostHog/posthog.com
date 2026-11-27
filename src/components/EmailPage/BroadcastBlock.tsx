import React, { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { IconArrowRight, IconSparkles } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { blockClassName } from './Widgets'

// The app's "Audiences you could send to": PostHog suggests audiences from product events, and PostHog AI drafts the
// email for one, styled like the last broadcast. The chosen draft then goes to the calendar to pick a day.

export type BroadcastDraft = { name: string; audience: string; people: number }

const audiences: (BroadcastDraft & {
    title: string
    why: string
    rule: React.ReactNode
    subject: string
    body: string[]
    button: string
})[] = [
    {
        title: 'Signed up but never uploaded',
        audience: 'signed up but haven’t uploaded',
        people: 8320,
        why: 'A short nudge with one thing to try could get them to their first upload.',
        rule: (
            <>
                Did <code>signed up</code> in the last 30 days, but not <code>file uploaded</code>
            </>
        ),
        name: 'Your first upload',
        subject: 'Your first upload takes 10 seconds',
        body: [
            'Hi Jane, you set up Hedgebox last week but haven’t added a file yet.',
            'Drag anything into your home folder and it’s backed up and shareable straight away.',
        ],
        button: 'Upload a file',
    },
    {
        title: 'Shares folders every week',
        audience: 'shared folders 5+ times',
        people: 3560,
        why: 'A product update about file requests could speak to people who already share a lot.',
        rule: (
            <>
                Did <code>folder shared</code> 5+ times in the last 14 days
            </>
        ),
        name: 'New: file requests',
        subject: 'New: ask anyone for files',
        body: [
            'Hi Jane, you’ve shared 214 files this year. Now you can ask for them too.',
            'Send a link, and anyone can upload straight to your folder, no account needed.',
        ],
        button: 'Try file requests',
    },
    {
        title: 'Inactive for three months',
        audience: 'haven’t been back in a month',
        people: 11900,
        why: 'A win-back note could bring back people who used to upload every week.',
        rule: (
            <>
                Did <code>file uploaded</code> in the last 90 days, but not in the last 30
            </>
        ),
        name: 'We kept your files safe',
        subject: 'Your files are right where you left them',
        body: [
            'Hi Jane, it’s been a while. Your 1,204 files are still here, synced and backed up.',
            'Since you left we added file requests and faster previews. Come and have a look.',
        ],
        button: 'Open Hedgebox',
    },
]

// Types the draft out like PostHog AI streaming it.
function useStream(text: string, run: number): string {
    const [shown, setShown] = useState(0)
    const reducedMotion = useReducedMotion()
    useEffect(() => {
        if (reducedMotion || run === 0) return setShown(run === 0 ? 0 : text.length)
        setShown(0)
        const timer = setInterval(() => setShown((n) => (n >= text.length ? (clearInterval(timer), n) : n + 3)), 16)
        return () => clearInterval(timer)
    }, [text, run])
    return text.slice(0, shown)
}

export function BroadcastBlock({ onSchedule }: { onSchedule: (draft: BroadcastDraft) => void }): JSX.Element {
    const [picked, setPicked] = useState<number | null>(null)
    const [run, setRun] = useState(0)
    const audience = picked === null ? null : audiences[picked]
    const full = audience ? [audience.subject, ...audience.body].join('\n') : ''
    const streamed = useStream(full, run)
    const done = audience !== null && streamed.length === full.length
    const [subject, ...body] = streamed.split('\n')

    return (
        <div className={blockClassName}>
            <div className="mb-4 flex items-center gap-2">
                <IconSparkles className="size-5 text-lilac" />
                <strong className="text-lg">Audiences you could send to</strong>
            </div>
            <div className="grid gap-5 @3xl/reader-content:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                <div className="flex flex-col gap-3">
                    {audiences.map((a, i) => (
                        <div
                            key={a.title}
                            className={`rounded-lg border p-4 text-sm ${
                                picked === i ? 'border-lilac bg-lilac/5' : 'border-primary'
                            }`}
                        >
                            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                                <strong className="text-base">{a.title}</strong>
                                <span className="text-xs text-secondary">
                                    About {a.people.toLocaleString('en-US')} people
                                </span>
                            </div>
                            <p className="m-0 mt-1">{a.why}</p>
                            <p className="m-0 mt-1 text-xs text-secondary [&_code]:text-primary">{a.rule}</p>
                            <div className="mt-3">
                                <OSButton
                                    size="sm"
                                    variant={picked === i ? 'primary' : 'secondary'}
                                    icon={<IconSparkles />}
                                    onClick={() => {
                                        setPicked(i)
                                        setRun(run + 1)
                                    }}
                                >
                                    Draft the email
                                </OSButton>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex min-h-[22rem] flex-col rounded-lg border border-primary bg-accent/40 p-4">
                    {audience ? (
                        <>
                            <span className="mb-3 flex items-center gap-1.5 text-xs text-secondary">
                                <IconSparkles className="size-3.5 text-lilac" />
                                {done ? 'Drafted by PostHog AI' : 'PostHog AI is writing…'}, styled like your last
                                broadcast
                            </span>
                            <div className="flex-1 rounded-md border border-primary bg-white p-4 text-sm dark:bg-dark">
                                <div className="grid grid-cols-[4rem_minmax(0,1fr)] gap-y-1 border-b border-primary pb-2 text-xs">
                                    <span className="text-secondary">To</span>
                                    <span>
                                        {audience.people.toLocaleString('en-US')} people who {audience.audience}
                                    </span>
                                    <span className="text-secondary">Subject</span>
                                    <strong>{subject}</strong>
                                </div>
                                {body.map((line, i) => (
                                    <p key={i} className="m-0 mt-3">
                                        {line}
                                    </p>
                                ))}
                                {done && (
                                    <span className="mt-4 inline-block rounded bg-blue px-3 py-1.5 font-semibold text-white">
                                        {audience.button}
                                    </span>
                                )}
                            </div>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <OSButton
                                    size="sm"
                                    variant="primary"
                                    disabled={!done}
                                    icon={<IconArrowRight />}
                                    iconPosition="right"
                                    onClick={() => onSchedule(audience)}
                                >
                                    Pick a day
                                </OSButton>
                                <span className="text-xs text-secondary">You check it before anything sends.</span>
                            </div>
                        </>
                    ) : (
                        <p className="m-auto max-w-xs text-center text-sm text-secondary">
                            PostHog looks at what people do in your product and suggests who to email. Pick one and
                            PostHog AI drafts it.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
