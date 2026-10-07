import React, { useState } from 'react'
import { HedgehogCampfireCowboy } from '@posthog/brand/hoggies'
import SpeechBubble from 'components/SpeechBubble'

// What the hog says on each click. After the last one, it gives up and sends you somewhere else.
const COMPLAINTS = ["Sorry, don't mind me", 'Hey, stop', 'I said stop', "I'm trying to roast marshmallows here"]

// Cowboy sage wisdom, for agents and the people who run them.
const WISDOM = [
    'Tokenminning is like tokenwinning, partner.',
    "Never trust an agent that won't tell you its model.",
    "The p95 don't lie.",
    'Every agent is a cowboy until it hits a 429.',
    "Ain't no shame in a retry.",
    "You can lead an agent to the docs, but you can't make it read 'em.",
    'Big context window, small campfire.',
    'A hallucination is just a story told round the fire.',
]

// Somewhere else to be. Each click after the complaints run out picks one at random.
const ESCAPES = [
    { to: '/sparks-joy/dictator-or-tech-bro', text: 'Fine. Go play "Dictator or tech bro?" instead.' },
    { to: '/sparks-joy/onlyhogs', text: 'Look at these hogs instead. They like attention.' },
    { to: '/sparks-joy/hogwars', text: 'Want a fight? Take it to Hog Wars.' },
    { to: '/hogpedia/hire-movers', text: 'Moving? Hire movers. Now let me be.' },
    { to: '/hogpedia/mr-blobby', text: 'Read about Mr Blobby. Do not ask why.' },
    { to: '/merch', text: 'Buy me a hat and we are even.' },
    { to: '/trash', text: 'Take out the trash on your way out.' },
    { to: '/handbook/company/lore', text: 'Go read the lore. It is long. Very long.' },
]

// An easter egg at the bottom of the leaderboard: a cowboy hog at its campfire that does not want to
// be clicked. Each click shakes it and escalates the complaint. After that, clicks alternate between
// a random piece of cowboy wisdom and a link to a random page.
export default function CampfireHog({ className = '' }: { className?: string }): JSX.Element {
    const [clicks, setClicks] = useState(0)
    const [shaking, setShaking] = useState(false)
    const [saying, setSaying] = useState<React.ReactNode>(COMPLAINTS[0])

    const poke = () => {
        const next = clicks + 1
        setClicks(next)
        setShaking(true)
        const pick = <T,>(list: T[]): T => list[Math.floor(Math.random() * list.length)]
        if (next < COMPLAINTS.length) {
            setSaying(COMPLAINTS[next])
        } else if ((next - COMPLAINTS.length) % 2 === 0) {
            setSaying(pick(WISDOM))
        } else {
            const escape = pick(ESCAPES)
            setSaying(
                // A plain anchor, because `Link` renders every internal path as an in-site link, even with
                // `externalNoIcon`, so it can't open a browser tab.
                <a href={escape.to} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                    {escape.text}
                </a>
            )
        }
    }

    return (
        <div className={`flex flex-col items-center gap-2 ${className}`}>
            {/* A fixed slot for the bubble, so a longer line grows the bubble upward instead of moving
                the hog. The slot fits the longest line in four rows. */}
            <div className="flex items-end justify-center w-56 h-24">
                <SpeechBubble className="w-fit max-w-full px-3 py-2 text-center text-sm font-medium">
                    {saying}
                </SpeechBubble>
            </div>
            <button
                type="button"
                onClick={poke}
                onAnimationEnd={() => setShaking(false)}
                aria-label="Poke the campfire hog"
                className={`cursor-pointer ${shaking ? 'motion-safe:animate-wiggle' : ''}`}
            >
                {/* Mirrored, so the hog faces the page from the bottom-right corner. */}
                <HedgehogCampfireCowboy
                    title="A cowboy hog roasting marshmallows at a campfire"
                    className="w-56 @2xl/reader-content:w-64 @4xl/reader-content:w-72 -scale-x-100"
                />
            </button>
        </div>
    )
}
