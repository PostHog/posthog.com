import React, { useEffect, useState } from 'react'
import OSButton from 'components/OSButton'
import { StickerLaptop, StickerCoffee, StickerCrown, StickerRobot, StickerMindMap } from 'components/Stickers/Stickers'

interface PersonalityType {
    slug: string
    title: string
    tagline: string
    body: string
    image: string
    fallbackSticker: React.ComponentType<any>
    accentText: string
    accentBg: string
}

const personalities: PersonalityType[] = [
    {
        slug: 'the-builder',
        title: 'The Builder',
        tagline: 'Ship first, name it later.',
        body: "You'd rather merge a branch than open a Notion doc. Adoption curves get you out of bed. The roadmap is wherever the last good idea landed.",
        image: '/images/work/personality/the-builder.png',
        fallbackSticker: StickerLaptop,
        accentText: 'text-purple',
        accentBg: 'bg-purple/10',
    },
    {
        slug: 'the-operator',
        title: 'The Operator',
        tagline: 'Funnels in your head, conversion on your tongue.',
        body: "You measure what others romanticize. If a channel can't be attributed, it doesn't exist. Your friends are a little tired of hearing about LTV.",
        image: '/images/work/personality/the-operator.png',
        fallbackSticker: StickerCoffee,
        accentText: 'text-orange',
        accentBg: 'bg-orange/10',
    },
    {
        slug: 'the-closer',
        title: 'The Closer',
        tagline: 'Pipeline is a verb.',
        body: 'You ended last quarter at 103% of plan and the first thing you did Monday morning was forecast this quarter. Sleep is a sales motion. So is brunch.',
        image: '/images/work/personality/the-closer.png',
        fallbackSticker: StickerCrown,
        accentText: 'text-blue',
        accentBg: 'bg-blue/10',
    },
    {
        slug: 'the-listener',
        title: 'The Listener',
        tagline: 'Support is product research in disguise.',
        body: 'You read every Intercom thread to the end. You remember which customer mentioned the pricing thing in March. You have, frankly, made too many spreadsheets of quotes.',
        image: '/images/work/personality/the-listener.png',
        fallbackSticker: StickerRobot,
        accentText: 'text-red',
        accentBg: 'bg-red/10',
    },
    {
        slug: 'the-generalist',
        title: 'The Generalist',
        tagline: 'Everything is your job and nothing is your specialty.',
        body: 'You context-switch faster than your laptop does. Beware: you will be asked to do all of it forever.',
        image: '/images/work/personality/the-generalist.png',
        fallbackSticker: StickerMindMap,
        accentText: 'text-green',
        accentBg: 'bg-green/10',
    },
]

function CharacterImage({ type }: { type: PersonalityType }) {
    const Fallback = type.fallbackSticker
    return (
        <div className="size-20 relative shrink-0 flex items-center justify-center">
            <img
                src={type.image}
                alt=""
                className="w-full h-full object-contain"
                onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = 'flex'
                }}
            />
            <div
                style={{ display: 'none' }}
                className={`absolute inset-0 ${type.accentBg} rounded-full items-center justify-center`}
            >
                <Fallback className="size-14" />
            </div>
        </div>
    )
}

function FeaturedCard({ type }: { type: PersonalityType }) {
    return (
        <div className="relative bg-primary border border-primary rounded-lg shadow-2xl p-5 @md:p-6 max-w-sm mx-auto text-center -rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="flex justify-center mb-3">
                <CharacterImage type={type} />
            </div>
            <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-secondary m-0 mb-1.5">
                Your skills personality
            </p>
            <h3 className="text-xl @md:text-2xl font-bold m-0 mb-2 leading-tight">{type.title}</h3>
            <p className="italic text-secondary m-0 mb-3 text-sm">{type.tagline}</p>
            <p className="text-sm text-primary leading-snug m-0 mb-4">{type.body}</p>
            <OSButton asLink to="#rsvp" variant="primary" size="md">
                Find out yours
            </OSButton>
        </div>
    )
}

export function PersonalityQuiz() {
    // SSR-safe random pick: render a deterministic default, then randomize after mount.
    const [type, setType] = useState<PersonalityType>(personalities[0])

    useEffect(() => {
        const random = personalities[Math.floor(Math.random() * personalities.length)]
        setType(random)
    }, [])

    return (
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            <div className="grid @lg:grid-cols-[1fr_auto] gap-8 @lg:gap-12 items-start max-w-5xl">
                <div>
                    <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                        <h2 className="text-2xl font-bold m-0">Find out what your skill usage says about you</h2>
                        <span className="text-[10px] uppercase tracking-widest font-bold bg-yellow text-primary rounded-sm px-1.5 py-0.5">
                            Beta
                        </span>
                    </div>
                    <p className="text-secondary mb-4 max-w-xl">
                        Personality test, but built from your actual recurring work. PostHog Work quietly watches which
                        skills you activate and assigns you to one of five types.
                    </p>
                    <p className="text-secondary mb-4 max-w-xl">
                        It is a personality quiz. It is also a productivity report. Mostly it is for sharing in your
                        team Slack channel.
                    </p>
                    <p className="text-xs text-muted italic">
                        Available in private beta. Don't take it too seriously. We don't.
                    </p>
                </div>

                <div className="w-full @lg:w-[22rem]">
                    <FeaturedCard type={type} />
                </div>
            </div>
        </section>
    )
}
