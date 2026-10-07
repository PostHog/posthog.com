import React, { useState } from 'react'
import { HedgehogCampfireCowboy } from '@posthog/brand/hoggies'
import SpeechBubble from 'components/SpeechBubble'

// What the hog says on each click. After the last one, it gives up and starts talking.
const COMPLAINTS = [
    "Sorry, don't mind me",
    'Hey, stop',
    'I said stop',
    "I'm trying to roast marshmallows here",
    'This is a leaderboard, not a petting zoo',
    'Fine. You want to talk? Pull up a log.',
]

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
    'Out here, we cache our context and our beans.',
    'A tool call in the hand is worth two in the queue.',
    'Never prompt on an empty stomach.',
    "If the agent says it's done, check the diff.",
    "There's gold in them thar error logs.",
    'Every MCP server dreams of one perfect tool description.',
    'Saddle up slow. Rate limits are faster than you.',
    "I've seen agents call the same tool 400 times. Ain't pretty.",
    "The model don't know what day it is. Neither do I.",
    'Ship it on a Friday and you sleep under the stars.',
]

// Somewhere else to be, each with a line to match. Every page here exists on posthog.com.
const ESCAPES = [
    { to: '/sparks-joy/dictator-or-tech-bro', text: 'Fine. Go play "Dictator or tech bro?" instead.' },
    { to: '/sparks-joy/onlyhogs', text: 'Look at these hogs instead. They like attention.' },
    { to: '/sparks-joy/hogwars', text: 'Want a fight? Take it to Hog Wars.' },
    { to: '/sparks-joy/brickhog', text: 'Go break some bricks. Leave my fire alone.' },
    { to: '/sparks-joy/hedgehog-mode', text: 'Turn on hedgehog mode and bother them instead.' },
    { to: '/hogpedia/hire-movers', text: 'Moving? Hire movers. Now let me be.' },
    { to: '/hogpedia/mr-blobby', text: 'Read about Mr Blobby. Do not ask why.' },
    { to: '/hogpedia/max-the-hedgehog', text: 'Go bother Max. He likes it.' },
    { to: '/handbook/company/lore', text: 'Go read the lore. It is long. Very long.' },
    { to: '/merch', text: 'Buy me a hat and we are even.' },
    { to: '/trash', text: 'Take out the trash on your way out.' },
    { to: '/feet-pics', text: 'You want something weird? Fine. Click here.' },
    { to: '/spicy.mov', text: "I've got a spicy video for you. Don't tell anyone." },
    { to: '/hogwatch', text: 'Go watch something. I need my alone time.' },
    { to: '/fm', text: 'Put on some music and leave me be.' },
    { to: '/paint', text: 'Draw me a marshmallow. A big one.' },
    { to: '/coloring-book.pdf', text: 'Here, color something. Stay inside the lines.' },
    { to: '/photobooth', text: 'Take a selfie with me. Then go.' },
    { to: '/posthug', text: 'You look like you need a hug. Not from me.' },
    { to: '/vibe-check', text: "Your vibes are off, partner. Let's check 'em." },
    { to: '/deskhog', text: 'Go buy a DeskHog. Oh wait, they sold out.' },
    { to: '/side-project-insurance', text: 'Got a side project? Insure it before it burns.' },
    { to: '/cool-tech-jobs', text: 'Go find a job that lets you click less.' },
    { to: '/talk-to-a-human', text: "Talk to a human. I'm a hedgehog." },
]

// How often a click after the complaints gives a link instead of wisdom.
const ESCAPE_CHANCE = 0.65

// An easter egg at the bottom of the leaderboard: a cowboy hog at its campfire that does not want to
// be clicked. Each click shakes it and escalates the complaint. After that, most clicks give a link to
// a random page and the rest give cowboy wisdom, and it never says the same thing twice in a row.
export default function CampfireHog({ className = '' }: { className?: string }): JSX.Element {
    const [clicks, setClicks] = useState(0)
    const [shaking, setShaking] = useState(false)
    const [saying, setSaying] = useState<React.ReactNode>(COMPLAINTS[0])
    const [last, setLast] = useState('')

    // A random item that is not the one just said.
    const pickFresh = <T,>(list: T[], key: (item: T) => string): T => {
        const fresh = list.filter((item) => key(item) !== last)
        return fresh[Math.floor(Math.random() * fresh.length)]
    }

    const poke = () => {
        const next = clicks + 1
        setClicks(next)
        setShaking(true)
        if (next < COMPLAINTS.length) {
            setSaying(COMPLAINTS[next])
        } else if (Math.random() >= ESCAPE_CHANCE) {
            const line = pickFresh(WISDOM, (wisdom) => wisdom)
            setLast(line)
            setSaying(line)
        } else {
            const escape = pickFresh(ESCAPES, (item) => item.to)
            setLast(escape.to)
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
