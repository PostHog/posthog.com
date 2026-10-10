import React, { useState } from 'react'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import type { Event } from '../../pages/events'
import { eventHue } from './utils'

type VhsShelfProps = {
    recordings: Event[]
    playingId?: number | null
    onPlay: (event: Event) => void
}

type TapeProps = {
    event: Event
    onPlay: (event: Event) => void
    onPeek: (event: Event | null) => void
}

const Tape = ({ event, onPlay, onPeek }: TapeProps) => {
    const hue = eventHue(event)
    return (
        <motion.button
            onClick={() => onPlay(event)}
            onHoverStart={() => onPeek(event)}
            onHoverEnd={() => onPeek(null)}
            onFocus={() => onPeek(event)}
            onBlur={() => onPeek(null)}
            initial="rest"
            animate="rest"
            whileHover="pulled"
            whileFocus="pulled"
            variants={{ rest: { y: 0 }, pulled: { y: -28 } }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="relative h-44 w-11 shrink-0 rounded-sm bg-light-12 shadow-md focus:outline-none"
            aria-label={`Play recording: ${event.name}`}
        >
            {/* Spine: colored band, then a white label with the title running top to bottom */}
            <span className="absolute inset-x-1 top-2 h-4 rounded-sm" style={{ backgroundColor: hue }} />
            <span className="absolute inset-x-1 top-7 bottom-6 overflow-hidden rounded-sm bg-light-1 px-0.5 py-1">
                <span
                    className="block h-full font-code text-[10px] font-bold leading-tight text-black line-clamp-2"
                    style={{ writingMode: 'vertical-rl' }}
                >
                    {event.name}
                </span>
            </span>
            <span className="absolute inset-x-0 bottom-1.5 text-center font-code text-[9px] font-bold text-light-1">
                VHS
            </span>
        </motion.button>
    )
}

export default function VhsShelf({ recordings, playingId, onPlay }: VhsShelfProps): JSX.Element {
    const [peeked, setPeeked] = useState<Event | null>(null)
    return (
        <section>
            <h3 className="mb-1 text-lg font-bold">Tape library</h3>
            <p className="mb-3 text-sm text-secondary">
                Missed one? Pull a tape off the shelf to watch the recording on the TV.
            </p>

            {/* Label strip: reads out whichever tape is pulled out */}
            <div className="mb-2 flex min-h-12 items-center gap-2 rounded border border-primary bg-primary px-3 py-2 text-sm">
                {peeked ? (
                    <>
                        <span className="font-semibold text-red">▶</span>
                        <span className="font-semibold">{peeked.name}</span>
                        <span className="text-secondary">· {dayjs(peeked.date).format('MMM D, YYYY')}</span>
                    </>
                ) : (
                    <span className="text-secondary">Hover a tape to read its label. Click to put it in the VCR.</span>
                )}
            </div>

            <div className="rounded-md border-x-[10px] border-t-[10px] border-brown bg-brown-dark shadow-inner">
                {recordings.length === 0 ? (
                    <div className="px-4 py-10 text-center text-sm text-black/70">
                        No recordings yet. Online events with a video will show up here.
                    </div>
                ) : (
                    // Top padding leaves room for a pulled-out tape
                    <div className="flex items-end gap-1.5 overflow-x-auto px-3 pt-10">
                        {recordings.map((event) =>
                            event.id === playingId ? (
                                <div
                                    key={event.id}
                                    className="flex h-44 w-11 shrink-0 items-center justify-center rounded-sm border-2 border-dashed border-brown"
                                    title="This tape is in the VCR"
                                >
                                    <span
                                        className="font-code text-[10px] font-bold uppercase text-brown"
                                        style={{ writingMode: 'vertical-rl' }}
                                    >
                                        In the VCR
                                    </span>
                                </div>
                            ) : (
                                <Tape key={event.id} event={event} onPlay={onPlay} onPeek={setPeeked} />
                            )
                        )}
                    </div>
                )}
                {/* The shelf board */}
                <div className="h-3 bg-brown shadow-md" />
            </div>
        </section>
    )
}
