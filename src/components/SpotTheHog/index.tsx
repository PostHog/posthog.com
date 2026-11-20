import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactConfetti from 'react-confetti'
import { IconShuffle } from '@posthog/icons'
import type { HedgehogActorOptions } from '@posthog/hedgehog-mode'
import OSButton from 'components/OSButton'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'
import { useToast } from '../../context/Toast'
import { BELLY, BODY, dailySeed, generateBoard } from './generator'
import type { Board, Hog, Look } from './generator'

const ASSETS_URL = '/hedgehog-mode'
const LOGO_URL = '/brand/posthog-logomark.svg'
const WRONG_GUESS_PENALTY = 3
const HINT_PENALTY = 5
// Easter egg: one innocent hog on every board wears the PostHog logo. In Endless, finding it takes this many
// seconds off the clock. Not in Daily: that result is shared, so everyone must play by the same clock.
const LOGO_BONUS = 10
const DAILY_LEVEL = 5

type HedgehogModule = typeof import('@posthog/hedgehog-mode')
type Mode = 'daily' | 'endless'

const percent = (share: number): string => `${share * 100}%`

function HogSprite({ module, look, id }: { module: HedgehogModule; look: Look; id: string }): JSX.Element {
    const { StaticHedgehog } = module
    // The generator works with plain strings that came from this package's own option lists.
    const options = { id, skin: look.skin, accessories: look.hat ? [look.hat] : [] } as HedgehogActorOptions
    return <StaticHedgehog options={options} size="100%" assetsUrl={ASSETS_URL} />
}

// Every hog has a round button over its body, so the game works with a mouse, a finger or a keyboard.
// The labels are numbers only, so a screen reader does not give the suspect away.
const Crowd = React.memo(function Crowd({
    module,
    board,
    disabled,
    onPick,
}: {
    module: HedgehogModule
    board: Board
    disabled: boolean
    onPick: (hog: Hog) => void
}) {
    return (
        <>
            {board.hogs.map((hog) => (
                <div
                    key={hog.id}
                    className="pointer-events-none absolute aspect-square -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${hog.x}%`, top: `${hog.y}%`, width: `${hog.size}%` }}
                >
                    <div className={`size-full ${hog.flip ? '-scale-x-100' : ''}`}>
                        <HogSprite module={module} look={hog.look} id={String(hog.id)} />
                    </div>
                    {/* Outside the flipped box: the brand rules say the logo is never mirrored. */}
                    {hog.id === board.logoHogId && (
                        <img
                            src={LOGO_URL}
                            alt=""
                            className="absolute !m-0 w-1/4 -translate-x-1/2 -translate-y-1/2"
                            style={{ left: percent(hog.flip ? 1 - BELLY.x : BELLY.x), top: percent(BELLY.y) }}
                        />
                    )}
                    <button
                        type="button"
                        aria-label={`Hog ${hog.id + 1}`}
                        disabled={disabled}
                        onClick={() => onPick(hog)}
                        className="pointer-events-auto absolute cursor-pointer rounded-[50%] border-0 bg-transparent p-0 disabled:cursor-default"
                        style={{
                            left: percent(BODY.x - BODY.rx),
                            top: percent(BODY.y - BODY.ry),
                            width: percent(2 * BODY.rx),
                            height: percent(2 * BODY.ry),
                        }}
                    />
                </div>
            ))}
        </>
    )
})

export default function SpotTheHog(): JSX.Element {
    const { addToast } = useToast()
    const reducedMotion = usePrefersReducedMotion()
    const boardRef = useRef<HTMLDivElement>(null)
    // Loaded on the client only: the package pulls in pixi.js, which does not render on the server.
    const [module, setModule] = useState<HedgehogModule | null>(null)
    const [loadFailed, setLoadFailed] = useState(false)
    const [mode, setMode] = useState<Mode>('daily')
    const [level, setLevel] = useState(1)
    const [seed, setSeed] = useState(() => dailySeed(new Date()))
    const [startedAt, setStartedAt] = useState(0)
    const [now, setNow] = useState(0)
    const [penalty, setPenalty] = useState(0)
    const [wrongGuesses, setWrongGuesses] = useState(0)
    const [hint, setHint] = useState(false)
    const [logoFound, setLogoFound] = useState(false)
    const [foundIn, setFoundIn] = useState<number | null>(null)

    useEffect(() => {
        import('@posthog/hedgehog-mode').then(setModule, () => setLoadFailed(true))
    }, [])

    const board = useMemo(
        () =>
            module &&
            generateBoard(seed, mode === 'daily' ? DAILY_LEVEL : level, {
                skins: module.HedgehogActorSkinOptions,
                accessories: module.HedgehogActorAccessories,
            }),
        [module, seed, mode, level]
    )

    const startRound = (nextMode: Mode, nextLevel: number, nextSeed: number) => {
        setMode(nextMode)
        setLevel(nextLevel)
        setSeed(nextSeed)
        setPenalty(0)
        setWrongGuesses(0)
        setHint(false)
        setLogoFound(false)
        setFoundIn(null)
        setStartedAt(Date.now())
        setNow(Date.now())
    }

    useEffect(() => {
        if (board && !startedAt) startRound(mode, level, seed)
    }, [board])

    useEffect(() => {
        if (foundIn !== null || !startedAt) return
        const timer = setInterval(() => setNow(Date.now()), 100)
        return () => clearInterval(timer)
    }, [foundIn, startedAt])

    const elapsed = foundIn ?? Math.max(0, (now - startedAt) / 1000 + penalty)

    const onPick = useCallback(
        (hog: Hog) => {
            if (!board) return
            if (hog.id === board.target.id) {
                setFoundIn(Math.max(0, (Date.now() - startedAt) / 1000 + penalty))
                return
            }
            // The hog in PostHog merch is noticed once. After that, a click on it does nothing.
            if (hog.id === board.logoHogId) {
                if (logoFound) return
                setLogoFound(true)
                const bonus = mode === 'endless' ? ` -${LOGO_BONUS}s` : ''
                if (bonus) setPenalty((p) => p - LOGO_BONUS)
                addToast({
                    description: `${hog.name} is wearing PostHog merch. Great taste. Still innocent.${bonus}`,
                    duration: 3000,
                })
                return
            }
            setPenalty((p) => p + WRONG_GUESS_PENALTY)
            setWrongGuesses((n) => n + 1)
            addToast({
                description: `That's ${hog.name}. ${hog.name} is innocent. +${WRONG_GUESS_PENALTY}s`,
                duration: 2500,
            })
        },
        [board, startedAt, penalty, addToast, logoFound, mode]
    )

    const takeHint = () => {
        setHint(true)
        setPenalty((p) => p + HINT_PENALTY)
    }

    const share = async () => {
        const text = `Spot the Hog ${seed}: found in ${elapsed.toFixed(1)}s${
            wrongGuesses ? ` after ${wrongGuesses} wrong arrest${wrongGuesses > 1 ? 's' : ''}` : ''
        }\nhttps://posthog.com/sparks-joy/spot-the-hog`
        try {
            await navigator.clipboard.writeText(text)
            addToast({ description: 'Copied. Go brag.' })
        } catch {
            addToast({ description: 'Your browser blocked the copy. Brag out loud.' })
        }
    }

    if (loadFailed) {
        return <div className="p-6 text-secondary">The hogs did not show up. Reload the page to try again.</div>
    }
    if (!module || !board) {
        return <div className="p-6 text-secondary">Rounding up the usual suspects...</div>
    }

    const { target } = board
    const found = foundIn !== null

    return (
        <div className="@container flex h-full min-h-0 flex-col gap-3 overflow-y-auto p-3 text-primary">
            <header className="flex flex-wrap items-center justify-between gap-2 pr-16">
                <div className="flex gap-1">
                    <OSButton
                        size="sm"
                        variant={mode === 'daily' ? 'primary' : 'default'}
                        onClick={() => startRound('daily', 1, dailySeed(new Date()))}
                    >
                        Daily hog
                    </OSButton>
                    <OSButton
                        size="sm"
                        variant={mode === 'endless' ? 'primary' : 'default'}
                        onClick={() => startRound('endless', 1, Date.now())}
                    >
                        Endless
                    </OSButton>
                    {mode === 'endless' && !found && (
                        <OSButton
                            size="sm"
                            icon={<IconShuffle />}
                            onClick={() => startRound('endless', level, Date.now())}
                        >
                            New crowd
                        </OSButton>
                    )}
                </div>
                <p className="!m-0 text-sm font-semibold tabular-nums" role="timer">
                    {mode === 'endless' && `Level ${level} · `}
                    {board.hogs.length} hogs · {elapsed.toFixed(1)}s
                </p>
            </header>

            {/* In a short window, such as a phone on its side, the game keeps this height and scrolls. */}
            <div className="flex min-h-80 flex-1 flex-col gap-3 @2xl:flex-row">
                <aside className="flex shrink-0 items-center gap-3 rounded border border-primary bg-accent p-3 @2xl:w-44 @2xl:flex-col @2xl:items-stretch">
                    <p className="!m-0 text-center text-lg font-bold tracking-widest">WANTED</p>
                    <div className="mx-auto size-20 shrink-0 @2xl:size-32">
                        <HogSprite module={module} look={target.look} id="wanted" />
                    </div>
                    <p className="!m-0 text-sm text-secondary">Last seen {board.crime}.</p>
                    <OSButton size="sm" disabled={hint || found} onClick={takeHint}>
                        Hint (+{HINT_PENALTY}s)
                    </OSButton>
                </aside>

                {/* The largest 4:3 board that fits. Hog positions are percentages, so it works at any size. */}
                <div className="flex min-h-0 flex-1 items-start justify-center [container-type:size]">
                    <div
                        ref={boardRef}
                        className="relative aspect-[4/3] w-[min(100cqw,133.33cqh)] overflow-hidden rounded border border-primary bg-primary"
                    >
                        <Crowd module={module} board={board} disabled={found} onPick={onPick} />
                        {hint &&
                            !found &&
                            [0, 1, 2, 3]
                                .filter((q) => q !== (target.x >= 50 ? 1 : 0) + (target.y >= 50 ? 2 : 0))
                                .map((q) => (
                                    <div
                                        key={q}
                                        className="pointer-events-none absolute h-1/2 w-1/2 bg-primary/80"
                                        style={{ left: q % 2 ? '50%' : 0, top: q > 1 ? '50%' : 0 }}
                                    />
                                ))}
                        {found && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-primary/90 p-4 text-center">
                                <p className="!m-0 text-2xl font-bold">Got 'em in {elapsed.toFixed(1)}s</p>
                                <p className="!m-0 text-secondary">
                                    {wrongGuesses
                                        ? `${wrongGuesses} innocent hog${
                                              wrongGuesses > 1 ? 's were' : ' was'
                                          } tickled along the way.`
                                        : 'Clean arrest. No innocent hogs were harmed.'}
                                </p>
                                {mode === 'daily' ? (
                                    <div className="flex gap-2">
                                        <OSButton variant="primary" onClick={share}>
                                            Copy result
                                        </OSButton>
                                        <OSButton onClick={() => startRound('endless', 1, Date.now())}>
                                            Play endless
                                        </OSButton>
                                    </div>
                                ) : (
                                    <OSButton
                                        variant="primary"
                                        onClick={() => startRound('endless', level + 1, Date.now())}
                                    >
                                        Next level
                                    </OSButton>
                                )}
                            </div>
                        )}
                        {/* Sized to the board, so the confetti stays inside the game's window. */}
                        {found && !reducedMotion && (
                            <ReactConfetti
                                width={boardRef.current?.clientWidth}
                                height={boardRef.current?.clientHeight}
                                recycle={false}
                                numberOfPieces={300}
                                gravity={0.2}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
