import React, { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { IconCheck, IconRewindPlay, IconX } from '@posthog/icons'

// A faked session replay: a scripted cursor over a small Hedgebox screen, with the events PostHog captured on a
// scrubber below. Each scene is a list of frames; the screen shows the state of the last frame that has played.

type SceneState = { url: string; value: string; bad?: string; done?: string; page?: 'form' | 'files'; drag?: boolean }
type Frame = { at: number; cursor: [number, number]; click?: boolean; event?: string } & Partial<SceneState>

// Where things sit on the screen, in percent, so the cursor can point at them.
const FIELD: [number, number] = [50, 47]
const BUTTON: [number, number] = [37, 66]
const typed = (start: number, text: string, prefix = '', step = 120): Frame[] =>
    [...text].map((_, i) => ({ at: start + i * step, cursor: FIELD, value: prefix + text.slice(0, i + 1) }))

export const scenes: Record<
    string,
    { title: string; label: string; button: string; person: string; initial: SceneState; frames: Frame[] }
> = {
    payment: {
        title: 'Billing',
        label: 'Card',
        button: 'Save card',
        person: 'jane@example.com · iOS Safari',
        initial: { url: 'hedgebox.net/billing', value: '•••• 4242', bad: 'Declined' },
        frames: [
            { at: 0, cursor: [85, 85], event: '$pageview /billing' },
            { at: 900, cursor: FIELD, click: true, value: '', bad: undefined },
            ...typed(1300, '4000 0000 0000 1881', '', 60),
            { at: 2700, cursor: BUTTON, click: true },
            { at: 3000, cursor: BUTTON, done: 'Payment of $49 succeeded', event: 'payment_succeeded' },
            { at: 4800, cursor: BUTTON },
        ],
    },
    reset: {
        title: 'Choose a new password',
        label: 'New password',
        button: 'Reset password',
        person: 'jane@example.com · Chrome',
        initial: { url: 'hedgebox.net/reset', value: '' },
        frames: [
            { at: 0, cursor: [85, 85], event: '$pageview /reset' },
            { at: 700, cursor: FIELD, click: true },
            ...typed(1000, '•••••••'),
            { at: 2000, cursor: BUTTON, click: true },
            { at: 2200, cursor: BUTTON, bad: 'Use at least 12 characters', event: 'password_rejected' },
            { at: 3000, cursor: FIELD, click: true, value: '' },
            ...typed(3200, '••••••••••••••', '', 80),
            { at: 4500, cursor: BUTTON, click: true, bad: undefined },
            { at: 4800, cursor: BUTTON, done: 'Welcome back, Jane', event: 'logged_in' },
            { at: 6200, cursor: BUTTON },
        ],
    },
    invite: {
        title: 'Jane invited you to Hedgebox',
        label: 'Work email',
        button: 'Continue with Google',
        person: 'sam@example.com · Chrome',
        initial: { url: 'hedgebox.net/join', value: 'sam@example.com', page: 'form' },
        frames: [
            { at: 0, cursor: [85, 85], event: '$pageview /join' },
            { at: 1000, cursor: BUTTON, click: true },
            { at: 1300, cursor: BUTTON, page: 'files', url: 'hedgebox.net/files', event: 'signed_up' },
            { at: 2300, cursor: [78, 82], drag: true },
            { at: 3600, cursor: FIELD, drag: true },
            { at: 3900, cursor: FIELD, drag: false, done: 'Q4 plan.pdf uploaded', event: 'file_uploaded' },
            { at: 5400, cursor: FIELD },
        ],
    },
}

function useClock(length: number, run: number): number {
    const [t, setT] = useState(0)
    const reducedMotion = useReducedMotion()
    useEffect(() => {
        if (reducedMotion) return setT(length)
        const start = performance.now()
        let frame = 0
        const tick = (now: number) => {
            setT(Math.min(length, now - start))
            if (now - start < length) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [length, run])
    return t
}

export function ReplayPlayer({ scene: key, onClose }: { scene: string; onClose: () => void }): JSX.Element {
    const scene = scenes[key]
    const [run, setRun] = useState(0)
    const length = scene.frames[scene.frames.length - 1].at
    const t = useClock(length, run)
    const played = scene.frames.filter((f) => f.at <= t)
    const keys = ['url', 'value', 'bad', 'done', 'page', 'drag'] as const
    const state = played.reduce(
        (acc, f) => Object.assign(acc, Object.fromEntries(keys.filter((k) => k in f).map((k) => [k, f[k]]))),
        { ...scene.initial } as SceneState
    )
    const last = played[played.length - 1] ?? scene.frames[0]
    const next = scene.frames[played.length]
    const clicked = played.filter((f) => f.click).length
    const marks = scene.frames.filter((f) => f.event)

    return (
        <div className="flex h-full flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
                <IconRewindPlay className="size-4 text-red" />
                <strong className="whitespace-nowrap">Session replay</strong>
                <span className="truncate text-xs text-secondary">{scene.person}</span>
                <button type="button" onClick={onClose} aria-label="Close replay" className="ml-auto text-secondary">
                    <IconX className="size-4" />
                </button>
            </div>
            <div className="relative min-h-[12rem] w-full flex-1 select-none overflow-hidden rounded-md border border-primary bg-white text-primary dark:bg-dark">
                <div className="flex items-center gap-1.5 border-b border-primary bg-accent px-2 py-1">
                    {['bg-red', 'bg-yellow', 'bg-green'].map((c) => (
                        <span key={c} className={`size-1.5 rounded-full ${c}`} />
                    ))}
                    <span className="ml-1 flex-1 truncate rounded bg-white px-2 font-code text-[10px] text-secondary dark:bg-accent">
                        {state.url}
                    </span>
                </div>
                {state.page === 'files' ? (
                    <div className="absolute inset-x-0 bottom-0 top-6 p-[5%]">
                        <p className="m-0 text-[clamp(10px,2.4cqw,15px)] font-bold">Files</p>
                        <div
                            className={`absolute left-[25%] top-[30%] flex h-[34%] w-1/2 items-center justify-center rounded-md border-2 border-dashed text-[11px] ${
                                state.done ? 'border-green bg-green/10 text-green' : 'border-primary text-secondary'
                            }`}
                        >
                            {state.done ? 'Q4 plan.pdf' : 'Drop files here'}
                        </div>
                    </div>
                ) : (
                    <div className="absolute inset-x-0 bottom-0 top-6">
                        <p className="absolute left-[25%] top-[12%] m-0 text-[clamp(10px,2.4cqw,15px)] font-bold">
                            {scene.title}
                        </p>
                        <span className="absolute left-[25%] top-[28%] text-[10px] text-secondary">{scene.label}</span>
                        <div
                            className={`absolute left-[25%] top-[35%] flex h-7 w-1/2 items-center rounded border px-2 font-code text-[11px] ${
                                state.bad ? 'border-red' : 'border-primary'
                            }`}
                        >
                            {state.value}
                            {last.cursor === FIELD && !state.done && <span className="ml-px h-3 w-px bg-primary" />}
                        </div>
                        {state.bad && (
                            <span className="absolute left-[25%] top-[49%] text-[10px] font-semibold text-red">
                                {state.bad}
                            </span>
                        )}
                        <span className="absolute left-[25%] top-[60%] rounded bg-blue px-3 py-1 text-[11px] font-semibold text-white">
                            {scene.button}
                        </span>
                    </div>
                )}
                {state.done && (
                    <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-[6%] right-[4%] flex items-center gap-1 rounded bg-green px-2 py-1 text-[11px] font-semibold text-white"
                    >
                        <IconCheck className="size-3" /> {state.done}
                    </motion.span>
                )}
                <motion.div
                    className="pointer-events-none absolute z-10"
                    initial={false}
                    animate={{ left: `${last.cursor[0]}%`, top: `${last.cursor[1]}%` }}
                    transition={{ duration: next ? Math.min(0.6, (next.at - last.at) / 1000) : 0.3, ease: 'easeInOut' }}
                >
                    {state.drag && (
                        <span className="absolute right-1 top-4 whitespace-nowrap rounded bg-white px-1.5 py-0.5 text-[10px] shadow dark:bg-accent">
                            Q4 plan.pdf
                        </span>
                    )}
                    {clicked > 0 && (
                        <motion.span
                            key={clicked}
                            initial={{ scale: 0, opacity: 0.6 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute -left-2 -top-2 size-4 rounded-full bg-red"
                        />
                    )}
                    <svg width="14" height="18" viewBox="0 0 14 18" className="drop-shadow">
                        <path d="M1 1l11 8.5-5 .5 3 6-2 1-3-6-4 3z" fill="black" stroke="white" strokeWidth="1" />
                    </svg>
                </motion.div>
            </div>
            <div className="relative mt-1 h-1.5 rounded-full bg-accent">
                <div className="h-full rounded-full bg-red" style={{ width: `${(t / length) * 100}%` }} />
                {marks.map((m) => (
                    <span
                        key={m.event}
                        title={m.event}
                        className={`absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white ${
                            m.at <= t ? 'bg-red' : 'bg-border'
                        }`}
                        style={{ left: `${(m.at / length) * 100}%` }}
                    />
                ))}
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {marks.map((m) => (
                    <span
                        key={m.event}
                        className={`rounded px-1.5 py-0.5 font-code ${
                            m.at <= t ? 'bg-blue/10 text-primary' : 'bg-accent text-muted'
                        }`}
                    >
                        {m.event}
                    </span>
                ))}
                {t >= length && (
                    <button type="button" onClick={() => setRun(run + 1)} className="ml-auto font-semibold text-red">
                        Watch again
                    </button>
                )}
            </div>
        </div>
    )
}
