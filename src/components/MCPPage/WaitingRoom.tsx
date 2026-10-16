import React, { useEffect, useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@posthog/icons'
import { SectionHeading } from 'components/Products/ReaderViewProduct/helpers'
import CloudinaryImage from 'components/CloudinaryImage'
import Modal from 'components/RadixUI/Modal'
import OSButton from 'components/OSButton'

interface Magazine {
    title: string
    src: `https://res.cloudinary.com/${string}`
}

const magazines: Magazine[] = [
    { title: 'Hogue', src: 'https://res.cloudinary.com/dmukukwp6/image/upload/hogue_701c84c736.png' },
    { title: 'AQ', src: 'https://res.cloudinary.com/dmukukwp6/image/upload/aq_9af49d76fc.png' },
    {
        title: 'National Hographic',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/national_hographic_7d97b3de60.png',
    },
    { title: 'AI Gamer', src: 'https://res.cloudinary.com/dmukukwp6/image/upload/ai_gamer_ea2be63169.png' },
    { title: 'Playhog', src: 'https://res.cloudinary.com/dmukukwp6/image/upload/playhog_4b59e297a6.png' },
    { title: 'Hogmopolitan', src: 'https://res.cloudinary.com/dmukukwp6/image/upload/hogmopolitan_23568c9a3c.png' },
    {
        title: 'Popular Mechagents',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/popular_mechagents_cb12cbbe9b.png',
    },
    { title: 'TOOL', src: 'https://res.cloudinary.com/dmukukwp6/image/upload/tool_4dbaa920ae.png' },
]

// A messy coffee table: each cover sits at its own angle, then straightens when picked up.
const tilts = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', 'rotate-1', '-rotate-2', 'rotate-2', '-rotate-3']

const TICKET_INTERVAL = 3500

/** "Now serving" counter. Calls real tool names, so the joke stays true as the tool list grows. */
function NowServing({ toolNames }: { toolNames: string[] }): JSX.Element | null {
    const [ticket, setTicket] = useState(42)

    useEffect(() => {
        if (!toolNames.length) return
        const timer = setInterval(() => setTicket((current) => current + 1), TICKET_INTERVAL)
        return () => clearInterval(timer)
    }, [toolNames.length])

    if (!toolNames.length) return null
    const tool = toolNames[(ticket * 7) % toolNames.length]

    return (
        <div
            className="inline-flex items-center gap-3 bg-primary border border-primary rounded px-3 py-2 shadow-md"
            aria-live="polite"
        >
            <span className="text-[10px] uppercase tracking-wider font-semibold text-secondary">Now serving</span>
            <span className="font-mono font-bold text-lg text-red dark:text-yellow tabular-nums">
                #{String(ticket).padStart(3, '0')}
            </span>
            <code className="text-sm truncate max-w-[12rem] @md:max-w-xs">{tool}</code>
        </div>
    )
}

export default function WaitingRoom({ toolNames }: { toolNames: string[] }): JSX.Element {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const open = openIndex !== null ? magazines[openIndex] : null

    const step = (direction: 1 | -1) =>
        setOpenIndex((current) =>
            current === null ? current : (current + direction + magazines.length) % magazines.length
        )

    return (
        <section id="waiting-room" className="scroll-mt-20 not-prose mb-20">
            <SectionHeading lede="For agents waiting to be tool-called into the next room. Help yourself to something to read.">
                The waiting room
            </SectionHeading>
            <NowServing toolNames={toolNames} />

            <div className="mt-6 bg-accent border border-primary rounded-md p-6 @md:p-8">
                <ul className="list-none m-0 p-0 grid grid-cols-2 @md:grid-cols-4 gap-6 @md:gap-8">
                    {magazines.map((magazine, index) => (
                        <li key={magazine.title}>
                            <button
                                type="button"
                                onClick={() => setOpenIndex(index)}
                                aria-label={`Read ${magazine.title}`}
                                className={`group block w-full cursor-pointer rounded-sm border-0 p-0 bg-transparent shadow-[0_2px_4px_rgba(0,0,0,0.12),0_8px_16px_rgba(0,0,0,0.12)] transition-all duration-200 ease-out ${tilts[index]} motion-safe:hover:-translate-y-2 hover:rotate-0 motion-safe:hover:scale-105 hover:shadow-[0_6px_12px_rgba(0,0,0,0.16),0_24px_40px_rgba(0,0,0,0.22)] focus-visible:rotate-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 relative hover:z-10 focus-visible:z-10`}
                            >
                                <CloudinaryImage
                                    src={magazine.src}
                                    width={500}
                                    alt={`${magazine.title} magazine cover`}
                                    className="block w-full"
                                    imgClassName="block w-full aspect-[17/22] object-cover rounded-sm"
                                    loading="lazy"
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <Modal
                open={open !== null}
                onOpenChange={(isOpen) => !isOpen && setOpenIndex(null)}
                title={open ? `${open.title} – ${(openIndex ?? 0) + 1} of ${magazines.length}` : undefined}
                maxWidth={560}
            >
                {open && (
                    <div
                        className="flex items-center gap-2 p-3 bg-accent"
                        onKeyDown={(event) => {
                            if (event.key === 'ArrowRight') step(1)
                            if (event.key === 'ArrowLeft') step(-1)
                        }}
                    >
                        <OSButton icon={<IconChevronLeft />} size="md" aria-label="Previous" onClick={() => step(-1)} />
                        <CloudinaryImage
                            src={open.src}
                            width={1000}
                            alt={`${open.title} magazine cover`}
                            className="flex-1 min-w-0"
                            imgClassName="block w-full max-h-[75vh] object-contain rounded-sm shadow-2xl"
                        />
                        <OSButton icon={<IconChevronRight />} size="md" aria-label="Next" onClick={() => step(1)} />
                    </div>
                )}
            </Modal>
        </section>
    )
}
