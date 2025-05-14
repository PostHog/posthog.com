import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Link from 'components/Link'
import { IconLaptop, IconWrench, IconHandwave, IconCode2 } from '@posthog/icons'
import {
    IconAsterisk,
    IconBolt,
    IconBuilding,
    IconCursorClick,
    IconEye,
    IconFlask,
    IconGraph,
    IconMessage,
    IconPeople,
    IconPerson,
    IconPlus,
    IconRevert,
    IconRewindPlay,
    IconServer,
    IconStack,
    IconToggle,
    IconShare,
    IconPlay,
    IconHandMoney,
    IconThumbsUp,
    IconHeartFilled,
    IconThoughtBubble,
    IconCode,
} from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { Hero } from 'components/Products/Hero'
import { Subfeature } from 'components/Products/Subfeature'
import CTA from 'components/Home/CTA'
import { PairsWith } from 'components/Products/PairsWith'
import { PairsWithItem } from 'components/Products/PairsWith/item'
import { FAQ } from 'components/Products/FAQ'
import Tooltip from 'components/Tooltip'
import { TextCard } from 'components/Products/TextCard'
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import { PRODUCT_COUNT } from '../../../constants'

const ProductIcon = ({
    name,
    url,
    color,
    icon,
}: {
    name: string
    url: string
    color: string
    icon: React.ReactNode
}) => {
    return (
        <Tooltip content={name}>
            <span className="relative">
                <Link to={url} className={`inline-flex bg-${color}/10 text-${color} dark:text-${color} rounded p-2`}>
                    <span
                        className={`w-6 h-6 text-${color} hover:text-${color} dark:text-${color} dark:hover:text-${color}`}
                    >
                        {icon}
                    </span>
                </Link>
            </span>
        </Tooltip>
    )
}

const product = {
    slug: 'deskhog',
    lowercase: 'deskhog',
    capitalized: 'DeskHog',
}

const subfeaturesItemCount = 3
const subfeatures = [
    {
        title: 'Open-source',
        description:
            "We're open-source, which means DeskHog is yours to hack. Build your own games, tools, with AI editors (or C++ if you're a masochist).",
        icon: <IconCode2 />,
    },
    {
        title: '3D printed',
        description:
            "Danilo prints these at home and assembles them by hand. It's a friction-fit labor of love. Or you can print your own from the files on GitHub.",
        icon: <IconWrench />,
    },
    {
        title: 'Palm-sized',
        description:
            "DeskHog is small enough to fit in your pocket. It's got a 7-day battery life, WiFi, and a cute flashing LED so you can find it in the dark.",
        icon: <IconHandwave />,
    },
]

const pairsWithItemCount = 3
const PairsWithArray = [
    {
        icon: <IconCode />,
        product: 'Developers',
        color: 'blue',
        description:
            'Make your own games and tools with an AI editor, or C++ if you really want to show off your l33t skills.',
        url: '#',
    },
    {
        icon: <IconPeople />,
        product: 'Bathroom breaks',
        color: 'seagreen',
        description: "You can take DeskHog anywhere and your boss will never suspect you're DeskHogging. Trust us. ",
        url: '#',
    },
    {
        icon: <IconThoughtBubble />,
        product: 'Imagination',
        color: 'black dark:text-white',
        description: 'Build games, tools, whatever you want. We made DeskHog for you to tear apart and build on.',
        url: '#',
    },
]

interface HeroDeskHogProps {
    icon: React.ReactNode
    color: string
    beta?: boolean
    product: string
    title: string
    description: string
}

const HeroDeskHog = ({ color, icon, beta, product, title, description }: HeroDeskHogProps): JSX.Element => {
    return (
        <section>
            <div className="flex gap-1.5 justify-center items-center mb-3">
                <span className={`w-6 h-6 text-${color}`}>{icon}</span>
                <span className="text-[15px] font-semibold text-opacity-60">{product}</span>
                {beta && (
                    <span className="text-xs font-semibold text-opacity-60 bg-yellow px-1 py-0.5 rounded-sm uppercase text-primary">
                        Beta
                    </span>
                )}
            </div>
            <h1
                className="text-5xl md:text-6xl text-center mb-4 md:mb-2 text-balance"
                dangerouslySetInnerHTML={{ __html: title }}
            />
            <p
                className="text-lg font-semibold text-center text-opacity-75 mb-5"
                dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="flex justify-center gap-2 mb-12">
                <CallToAction href="https://posthog.com/merch" type="primary">
                    Buy it now, hack it later
                </CallToAction>
            </div>
        </section>
    )
}

export const ProductDeskHog = () => {
    const { fullWidthContent } = useLayoutData()
    return (
        <>
            <SEO
                title="DeskHog - PostHog"
                description="Manage your desk setup like never before with DeskHog, the ultimate desk optimization tool."
                image={`/images/og/deskhog.jpg`}
            />
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                <HeroDeskHog
                    color="orange"
                    icon={<IconLaptop />}
                    product={product.capitalized}
                    title="It's a developer toy that <br /> <span className='text-red dark:text-yellow'>brings developers joy</span>"
                    description="Yes, we make hardware now."
                />

                <div className="text-center mb-12">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/deskhoggo_7caeace8d8.png"
                        alt="DeskHog"
                        className="w-full max-w-[600px]"
                    />
                </div>
            </div>

            <div id="features">
                <section className="max-w-7xl mx-auto px-5 md:mb-32">
                    <div className="mb-4">
                        <h2 className="text-4xl text-center mb-12">
                            DeskHog is an <span className="text-red dark:text-yellow">open-source</span>,{' '}
                            <span className="text-red dark:text-yellow">3D printed</span>, and{' '}
                            <span className="text-red dark:text-yellow">palm-sized</span> slice of developer joy.
                        </h2>
                        <ul className={`list-none p-0 grid md:grid-cols-${subfeaturesItemCount} gap-4`}>
                            {subfeatures.map((subfeature, index) => {
                                return <Subfeature {...subfeature} key={index} />
                            })}
                        </ul>
                    </div>

                    <div className="flex flex-col-reverse items-center md:flex-row gap-8 pt-20 mb-20">
                        <div className="flex-1">
                            <h2 className="text-4xl">
                                What about the hardware?
                                <br />
                                <span className="text-red dark:text-yellow">It's tiny, but mighty.</span>
                            </h2>
                            <p>
                                Yes, someone from our marketing team makes these by hand at home. But it still kicks
                                ass.
                            </p>
                            <p>
                                DeskHog packs a ESP32-S3 Reverse TFT Feather in a custom-made 3D printed. It comes
                                complete with a 240x135 color TFT display, a 7-day battery life, WiFi, and a cute little
                                LED.
                            </p>
                            <p>
                                <b>Can it play Pong?</b> Yes.
                                <br /> <b>Can it play Flappy Bird?</b> Yes.
                                <br /> <b>Can it play Doom?</b> ...We're working on it.
                            </p>
                        </div>
                        <aside className="shrink-0 md:basis-[500px]">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductOS/images/sql-hog.png"
                                alt="DeskHog control panel"
                                className="w-full max-w-[562px]"
                            />
                        </aside>
                    </div>
                    <h2 className="text-5xl text-center mb-2">Of course we made some games for it</h2>
                    <h3 className="text-2xl text-center mb-12">
                        (but you can{' '}
                        <Link to="https://github.com/PostHog/DeskHog" className="text-red dark:text-yellow">
                            make your own
                        </Link>{' '}
                        too)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        <div className="text-center">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_14_at_16_31_37_5e009d0dd5.png"
                                alt="Game screenshot 1"
                                className="w-full max-w-[200px] mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold">Pog</h3>
                            <p className="text-sm">
                                It's Pong, built by{' '}
                                <Link to="https://posthog.com/community/profiles/30833">Leon Daly</Link>. <br />
                                It's perfect for playing on the toilet.
                            </p>
                        </div>
                        <div className="text-center">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_14_at_16_31_37_5e009d0dd5.png"
                                alt="Game screenshot 2"
                                className="w-full max-w-[200px] mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold">Shareholder Value Clicker</h3>
                            <p className="text-sm">
                                Wry satire? Idle clicker game? Creator <br />{' '}
                                <Link to="https://posthog.com/community/profiles/33534">Chris McNeill</Link> says it's
                                both.
                            </p>
                        </div>
                        <div className="text-center">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_14_at_16_31_37_5e009d0dd5.png"
                                alt="Game screenshot 3"
                                className="w-full max-w-[200px] mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold">One Button Dungeon</h3>
                            <p className="text-sm">
                                A roguelike throwback about an endless corridor.
                                <br /> Such is life, says{' '}
                                <Link to="https://posthog.com/community/profiles/29070">Joe Martin</Link>.
                            </p>
                        </div>
                        <div className="text-center">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_14_at_16_31_37_5e009d0dd5.png"
                                alt="Game screenshot 4"
                                className="w-full max-w-[200px] mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold">Awkwardness Avoider</h3>
                            <p className="text-sm">
                                Need some icebreakers at a party? <br />
                                <Link to="https://posthog.com/community/profiles/28619">Annika Schmid</Link>'s game has
                                you covered.
                            </p>
                        </div>
                        <div className="text-center">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_14_at_16_31_37_5e009d0dd5.png"
                                alt="Game screenshot 5"
                                className="w-full max-w-[200px] mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold">Notchagotchi</h3>
                            <p className="text-sm">
                                Creator <Link to="https://posthog.com/community/profiles/33385">Sophie Payne</Link> was
                                a little worried <br />
                                she'd be sued if she called this what it is.
                            </p>
                        </div>
                        <div className="text-center">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_14_at_16_31_37_5e009d0dd5.png"
                                alt="Game screenshot 6"
                                className="w-full max-w-[200px] mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold">Flappy Hog</h3>
                            <p className="text-sm">
                                Despite the title, creator{' '}
                                <Link to="https://posthog.com/community/profiles/29070">Joe Martin</Link> <br />
                                admits this game has no hedgehogs.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                <PairsWith items={pairsWithItemCount}>
                    {PairsWithArray.map((card, index) => {
                        return <PairsWithItem {...card} key={index} />
                    })}
                </PairsWith>
            </div>

            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'mx-auto'} relative px-5 py-10 pb-0`}>
                <section className="mb-20">
                    <CTA />
                </section>
            </div>
        </>
    )
}

export default ProductDeskHog
