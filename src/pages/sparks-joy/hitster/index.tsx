import React, { useMemo, useState } from 'react'
import Explorer from 'components/Explorer'
import OSButton from 'components/OSButton'
import ScrollArea from 'components/RadixUI/ScrollArea'
import SEO from 'components/seo'
import { DECK, CATEGORY_COLOR, HitsterCard, shuffle, insertAt, isPlacementCorrect, correctSlot } from './data'

const MIN_PLAYERS = 1
const MAX_PLAYERS = 6
const WIN_TARGETS = [4, 7, 10]

interface Player {
    name: string
    timeline: HitsterCard[]
}

type Phase = 'setup' | 'playing' | 'gameover'
type Result = 'correct' | 'wrong'

// --- Setup screen ---------------------------------------------------------

function Setup({ onStart }: { onStart: (names: string[], target: number) => void }): JSX.Element {
    const [count, setCount] = useState(2)
    const [names, setNames] = useState<string[]>([
        'Player 1',
        'Player 2',
        'Player 3',
        'Player 4',
        'Player 5',
        'Player 6',
    ])
    const [target, setTarget] = useState(7)

    const setName = (i: number, value: string) => {
        setNames((prev) => prev.map((n, idx) => (idx === i ? value : n)))
    }

    return (
        <div className="flex flex-col gap-5 p-5 @sm:p-6">
            <div className="text-center">
                <div className="text-5xl mb-1">🦔🎵</div>
                <h1 className="text-2xl font-bold m-0">Hitster</h1>
                <p className="text-sm text-secondary m-0">Tech history edition</p>
            </div>

            <p className="text-sm text-secondary text-center text-balance m-0">
                A card gets pulled from the deck. Don't peek at the year — just slot it into the right spot on your
                timeline. First to <strong>{target}</strong> cards wins.
            </p>

            <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted">Players</label>
                <div className="flex items-center gap-3 mt-1">
                    <button
                        aria-label="Fewer players"
                        onClick={() => setCount((c) => Math.max(MIN_PLAYERS, c - 1))}
                        className="size-9 rounded-full border border-primary text-lg font-bold leading-none disabled:opacity-40"
                        disabled={count <= MIN_PLAYERS}
                    >
                        −
                    </button>
                    <span className="text-xl font-bold w-6 text-center tabular-nums">{count}</span>
                    <button
                        aria-label="More players"
                        onClick={() => setCount((c) => Math.min(MAX_PLAYERS, c + 1))}
                        className="size-9 rounded-full border border-primary text-lg font-bold leading-none disabled:opacity-40"
                        disabled={count >= MAX_PLAYERS}
                    >
                        +
                    </button>
                    {count === 1 && <span className="text-xs text-muted">Solo — beat your own best run</span>}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {Array.from({ length: count }).map((_, i) => (
                    <input
                        key={i}
                        value={names[i]}
                        onChange={(e) => setName(i, e.target.value)}
                        maxLength={16}
                        className="w-full rounded border border-input bg-primary text-primary px-3 py-2 text-sm"
                        placeholder={`Player ${i + 1}`}
                    />
                ))}
            </div>

            <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted">Cards to win</label>
                <div className="flex gap-2 mt-1">
                    {WIN_TARGETS.map((t) => (
                        <button
                            key={t}
                            onClick={() => setTarget(t)}
                            className={`flex-1 rounded border px-3 py-2 text-sm font-semibold transition-colors ${
                                target === t
                                    ? 'border-red bg-red text-white'
                                    : 'border-input text-secondary hover:border-primary'
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <OSButton
                variant="primary"
                size="lg"
                width="full"
                onClick={() =>
                    onStart(
                        names.slice(0, count).map((n, i) => n.trim() || `Player ${i + 1}`),
                        target
                    )
                }
            >
                Start game
            </OSButton>
        </div>
    )
}

// --- Small card used inside a timeline ------------------------------------

function TimelineCard({ card, highlight }: { card: HitsterCard; highlight?: boolean }): JSX.Element {
    return (
        <div
            data-scheme="primary"
            className={`shrink-0 w-16 rounded-md border px-1 py-2 text-center bg-primary ${
                highlight ? 'border-2 border-green' : 'border-primary'
            }`}
        >
            <div className="text-lg leading-none">{card.emoji}</div>
            <div className="text-base font-bold tabular-nums mt-1">{card.year}</div>
            <div className="text-[9px] text-muted leading-tight mt-0.5 line-clamp-3">{card.title}</div>
        </div>
    )
}

// --- Play screen ----------------------------------------------------------

interface PlayProps {
    player: Player
    playerNumber: number
    totalPlayers: number
    target: number
    card: HitsterCard
    deckRemaining: number
    result: Result | null
    committedSlot: number | null
    onPlace: (slot: number) => void
    onNext: () => void
}

function Play({
    player,
    playerNumber,
    totalPlayers,
    target,
    card,
    deckRemaining,
    result,
    committedSlot,
    onPlace,
    onNext,
}: PlayProps): JSX.Element {
    const [selected, setSelected] = useState<number | null>(null)
    const color = CATEGORY_COLOR[card.category]
    const revealed = result !== null

    // On a correct placement the card has already been inserted into
    // `player.timeline` by the parent, so we render the timeline as-is and just
    // highlight the newly placed card at `committedSlot`. On a wrong placement
    // the card was discarded, so we mark where it *should* have gone.
    const rightSlot = revealed && result === 'wrong' ? correctSlot(player.timeline, card) : null
    const placedIndex = revealed && result === 'correct' ? committedSlot : null
    const slots = player.timeline.length + 1

    return (
        <div className="flex flex-col h-full">
            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-primary text-xs">
                <span className="font-semibold text-primary truncate">
                    {player.name}
                    {totalPlayers > 1 && <span className="text-muted"> · P{playerNumber}</span>}
                </span>
                <span className="text-muted tabular-nums">
                    {player.timeline.length}/{target} · {deckRemaining} left
                </span>
            </div>

            {/* The mystery / revealed card */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 gap-3 min-h-0">
                <div
                    className="w-full max-w-[15rem] rounded-xl text-white shadow-lg px-4 py-6 text-center"
                    style={{ backgroundColor: color }}
                >
                    <div className="text-[10px] uppercase tracking-widest opacity-80">{card.category}</div>
                    <div className="text-5xl my-3">{card.emoji}</div>
                    <div className="text-base font-semibold text-balance leading-snug">{card.title}</div>
                    <div className="mt-4 text-4xl font-black tabular-nums">{revealed ? card.year : '????'}</div>
                </div>

                {!revealed ? (
                    <p className="text-xs text-secondary text-center m-0">When did this happen? Tap a slot below.</p>
                ) : (
                    <p
                        className={`text-sm font-bold text-center m-0 ${
                            result === 'correct' ? 'text-green' : 'text-red'
                        }`}
                    >
                        {result === 'correct' ? '✅ Correct — card is yours!' : '❌ Nope, card discarded'}
                    </p>
                )}
            </div>

            {/* Timeline with insertion slots */}
            <div className="border-t border-primary bg-accent/40">
                <div className="px-3 pt-2 text-[10px] uppercase tracking-wide text-muted">
                    {player.name}'s timeline{revealed && result === 'wrong' ? ' — correct spot in green' : ''}
                </div>
                <ScrollArea className="w-full">
                    <div className="flex items-stretch gap-1 px-3 py-3 min-w-min">
                        {Array.from({ length: slots }).map((_, slotIndex) => (
                            <React.Fragment key={slotIndex}>
                                <Slot
                                    index={slotIndex}
                                    selected={selected === slotIndex}
                                    disabled={revealed}
                                    isCorrectSpot={rightSlot === slotIndex}
                                    onSelect={setSelected}
                                />
                                {slotIndex < player.timeline.length && (
                                    <TimelineCard
                                        card={player.timeline[slotIndex]}
                                        highlight={placedIndex === slotIndex}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Action bar */}
            <div className="p-3 border-t border-primary">
                {!revealed ? (
                    <OSButton
                        variant="primary"
                        size="lg"
                        width="full"
                        disabled={selected === null}
                        onClick={() => selected !== null && onPlace(selected)}
                    >
                        {selected === null ? 'Pick a slot' : 'Place card'}
                    </OSButton>
                ) : (
                    <OSButton variant="primary" size="lg" width="full" onClick={onNext}>
                        {totalPlayers > 1 ? 'Next player' : 'Next card'}
                    </OSButton>
                )}
            </div>
        </div>
    )
}

function Slot({
    index,
    selected,
    disabled,
    isCorrectSpot,
    onSelect,
}: {
    index: number
    selected: boolean
    disabled: boolean
    isCorrectSpot: boolean
    onSelect: (i: number) => void
}): JSX.Element {
    return (
        <button
            aria-label={`Place before position ${index + 1}`}
            disabled={disabled}
            onClick={() => onSelect(index)}
            className={`shrink-0 w-7 self-stretch rounded-md border-2 border-dashed flex items-center justify-center text-sm font-bold transition-colors ${
                isCorrectSpot
                    ? 'border-green text-green'
                    : selected
                    ? 'border-red bg-red text-white border-solid'
                    : disabled
                    ? 'border-transparent text-transparent'
                    : 'border-primary/40 text-muted hover:border-red hover:text-red'
            }`}
        >
            {isCorrectSpot ? '✓' : selected ? '↓' : disabled ? '' : '+'}
        </button>
    )
}

// --- Game over ------------------------------------------------------------

function GameOver({
    players,
    winnerIndex,
    onRestart,
}: {
    players: Player[]
    winnerIndex: number | null
    onRestart: () => void
}): JSX.Element {
    const standings = players.map((p, i) => ({ ...p, i })).sort((a, b) => b.timeline.length - a.timeline.length)
    const solo = players.length === 1

    return (
        <div className="flex flex-col gap-5 p-6 items-center text-center">
            <div className="text-5xl">🏆</div>
            <div>
                <h2 className="text-2xl font-bold m-0">
                    {solo
                        ? `${players[0].timeline.length} cards!`
                        : winnerIndex !== null
                        ? `${players[winnerIndex].name} wins!`
                        : 'Deck empty!'}
                </h2>
                <p className="text-sm text-secondary m-0">
                    {solo ? 'Nice run. Think you can beat it?' : 'Final standings'}
                </p>
            </div>

            {!solo && (
                <div className="w-full max-w-xs flex flex-col gap-1">
                    {standings.map((p, rank) => (
                        <div
                            key={p.i}
                            className={`flex items-center justify-between rounded border px-3 py-2 text-sm ${
                                rank === 0 ? 'border-red bg-red/10 font-semibold' : 'border-primary'
                            }`}
                        >
                            <span className="truncate">
                                {rank + 1}. {p.name}
                            </span>
                            <span className="tabular-nums text-muted">{p.timeline.length} cards</span>
                        </div>
                    ))}
                </div>
            )}

            <OSButton variant="primary" size="lg" width="full" onClick={onRestart}>
                Play again
            </OSButton>
        </div>
    )
}

// --- Root -----------------------------------------------------------------

function HitsterGame(): JSX.Element {
    const [phase, setPhase] = useState<Phase>('setup')
    const [players, setPlayers] = useState<Player[]>([])
    const [deck, setDeck] = useState<HitsterCard[]>([])
    const [current, setCurrent] = useState(0)
    const [card, setCard] = useState<HitsterCard | null>(null)
    const [result, setResult] = useState<Result | null>(null)
    const [committedSlot, setCommittedSlot] = useState<number | null>(null)
    const [target, setTarget] = useState(7)
    const [winnerIndex, setWinnerIndex] = useState<number | null>(null)

    const startGame = (names: string[], winTarget: number) => {
        const shuffled = shuffle(DECK)
        // Seed each player with one card as their timeline anchor.
        const seeded: Player[] = names.map((name, i) => ({ name, timeline: [shuffled[i]] }))
        const rest = shuffled.slice(names.length)
        setPlayers(seeded)
        setDeck(rest.slice(1))
        setCard(rest[0] ?? null)
        setCurrent(0)
        setTarget(winTarget)
        setResult(null)
        setCommittedSlot(null)
        setWinnerIndex(null)
        setPhase('playing')
    }

    const placeCard = (slot: number) => {
        if (!card) return
        const player = players[current]
        const correct = isPlacementCorrect(player.timeline, card, slot)
        setCommittedSlot(slot)
        setResult(correct ? 'correct' : 'wrong')
        if (correct) {
            setPlayers((prev) =>
                prev.map((p, i) => (i === current ? { ...p, timeline: insertAt(p.timeline, card, slot) } : p))
            )
        }
    }

    const nextTurn = () => {
        if (!card) return
        // Win check — placeCard() already inserted the card on a correct guess,
        // so players[current].timeline.length is the up-to-date count.
        if (result === 'correct' && players[current].timeline.length >= target) {
            setWinnerIndex(current)
            setPhase('gameover')
            return
        }
        // Draw next card; end the game if the deck is exhausted.
        if (deck.length === 0) {
            setWinnerIndex(null)
            setPhase('gameover')
            return
        }
        setCard(deck[0])
        setDeck((d) => d.slice(1))
        setCurrent((c) => (c + 1) % players.length)
        setResult(null)
        setCommittedSlot(null)
    }

    const restart = () => setPhase('setup')

    const body = useMemo(() => {
        if (phase === 'setup') return <Setup onStart={startGame} />
        if (phase === 'gameover') return <GameOver players={players} winnerIndex={winnerIndex} onRestart={restart} />
        if (phase === 'playing' && card)
            return (
                <Play
                    key={`${current}-${card.id}-${result ?? 'placing'}`}
                    player={players[current]}
                    playerNumber={current + 1}
                    totalPlayers={players.length}
                    target={target}
                    card={card}
                    deckRemaining={deck.length}
                    result={result}
                    committedSlot={committedSlot}
                    onPlace={placeCard}
                    onNext={nextTurn}
                />
            )
        return null
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase, players, card, result, committedSlot, current, deck.length, target, winnerIndex])

    return (
        <div className="@container h-full w-full flex justify-center bg-accent/30">
            {/* Phone-sized column so it reads as a mobile app at any window size */}
            <div className="w-full max-w-[26rem] h-full bg-primary border-x border-primary overflow-hidden flex flex-col">
                {phase === 'playing' ? body : <ScrollArea className="h-full">{body}</ScrollArea>}
            </div>
        </div>
    )
}

export default function Hitster(): JSX.Element {
    return (
        <>
            <SEO
                title="Hitster (tech history edition) - PostHog"
                description="A pass-and-play timeline guessing game. Slot moments from tech and internet history into the right chronological order before your opponents do."
                image={`/images/og/default.png`}
            />
            <Explorer template="generic" slug="hitster" showAddressBar={false} title="Hitster" fullScreen>
                <HitsterGame />
            </Explorer>
        </>
    )
}
