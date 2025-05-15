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
import { Bang } from 'components/Icons'
import { motion } from 'framer-motion'

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
            "We're open-source, which means DeskHog is yours to hack. Build your own games and tools with AI editors (or C++ if you're a masochist).",
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
            "DeskHog is small enough to fit in your pocket. It's got a 24-hour battery life, WiFi, and a cute flashing LED so you can find it in the dark.",
        icon: <IconHandwave />,
    },
]

const pairsWithItemCount = 3
const PairsWithArray = [
    {
        icon: <IconCode />,
        product: 'Developers',
        color: 'blue',
        description: 'Make things with an AI editor, or C++ if you want to show off your l33t skills.',
        url: '#',
    },
    {
        icon: <IconPeople />,
        product: 'Bathroom breaks',
        color: 'seagreen',
        description: "Your boss will never suspect you're DeskHogging. Trust us. ",
        url: '#',
    },
    {
        icon: <IconThoughtBubble />,
        product: 'Imagination',
        color: 'black dark:text-white',
        description: 'Build new features, add extra hardware, or just tinker with it.',
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

const VideoDeskHog = () => (
    <section id="demo-video" className={`overflow-hidden h-auto max-h-[90vh] mb-8 pt-10`}>
        <div className="relative">
            <iframe
                src="https://res.cloudinary.com/dmukukwp6/video/upload/Termagotchi_084775b39f.mp4"
                className="rounded aspect-video m-0 shadow-xl"
                style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '55%',
                    margin: '0 auto',
                    display: 'block',
                    border: '1px solid var(--border-light, #e0e0e0)',
                }}
                allow="autoplay"
            />
            <div className="absolute top-[-10px] left-[200px] mt-4 ml-4">
                <span className="inline-block bg-yellow text-black px-6 py-2 rounded-full text-xl font-semibold shadow-lg transform -rotate-45 scale-90">
                    Pre-order now
                    <br />
                </span>
            </div>
        </div>
    </section>
)

// Define DeskHogCTA component
const DeskHogCTA = () => {
    const headingClasses = 'font-bold text-center text-4xl lg:text-5xl mb-3 text-red dark:text-yellow animate-pulse'
    const subheadingClasses =
        'text-center text-primary dark:text-primary-dark opacity-75 dark:opacity-100 max-w-xl mx-auto mb-6'

    return (
        <section className="px-4 relative overflow-hidden">
            {/* Text Content Wrapper with PostHog card style */}
            <div className="relative z-10 bg-white dark:bg-[#2C2C2C] p-8 rounded-lg mx-auto max-w-2xl border border-border dark:border-border-dark shadow-xl">
                <h2 className={headingClasses}>Limited stock available</h2>
                <h3 className={`${subheadingClasses} mb-0`}>
                    If nothing else has sold you on DeskHog, hopefully this classic marketing tactic will.
                </h3>
                <div className="flex justify-center my-6">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/435072519_6e5d1fe6_1887_4d66_8497_4b582eb0391a_2cb01d1ae9.png"
                        alt="DeskHog marketing accent image"
                        width={300}
                    />
                </div>
                <h6 className={subheadingClasses}>(Seriously though, we only made 250 of these)</h6>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                    <CallToAction
                        href="https://posthog.com/merch"
                        type="primary"
                        size="lg"
                        className="w-full sm:w-auto"
                    >
                        Buy it now
                    </CallToAction>
                    <CallToAction
                        href="https://github.com/PostHog/DeskHog"
                        type="secondary"
                        size="lg"
                        className="w-full sm:w-auto"
                    >
                        Make your own
                    </CallToAction>
                </div>
            </div>
        </section>
    )
}

// Expandable Callout Component
const ExpandableCallout = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <div className="col-span-2 bg-[#E5E7E0] dark:bg-slate-700 dark:text-slate-200 p-4 rounded-md shadow-md mt-10 w-full max-w-lg mx-auto">
            <button onClick={() => setIsOpen(!isOpen)} className="text-lg font-semibold text-center w-full">
                ⬇ And this is just for starters ⬇
            </button>
            {isOpen && (
                <div className="mt-4 flex flex-col items-center">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/deskhog_max_904ca43b3e.png"
                        alt="DeskHog Pro"
                        className="w-1/2 mx-auto mb-4"
                    />
                    <h5>Coming soon: DeskHog Pro & Friends</h5>
                    <p>This is just the beginning of the DeskHog adventure. If you like it we'll make more, maybe.</p>
                    <p>
                        DeskHog Pro will connect via the I²C port, adding more buttons, a speaker, and a huge dial so
                        you can crank up the vibes. We're also thinking about making a watch strap, so you can wear
                        DeskHog on your wrist. Got ideas for other accessories?{' '}
                        <a href="mailto:danilo@posthog.com">Let us know!</a>
                    </p>
                </div>
            )}
        </div>
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
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 pt-10 pb-10`}>
                <HeroDeskHog
                    color="orange"
                    icon={<IconLaptop />}
                    product={product.capitalized}
                    title="It's a developer toy that <br /> <span className='text-red dark:text-yellow'>brings developers joy</span>"
                    description="Yes, we make hardware now."
                />
                <VideoDeskHog />
            </div>

            <div id="features">
                <section className="max-w-7xl mx-auto px-5 py-10">
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
                                But what is DeskHog really?
                                <br />
                                <span className="text-red dark:text-yellow">It's a teeny, tiny, beast.</span>
                            </h2>
                            <p>
                                DeskHog packs a ESP32-S3 Reverse TFT Feather in a custom-made 3D printed case. It comes
                                complete with a 240x135 color TFT display, a 24-hour battery life, WiFi, and a cute
                                little LED.
                            </p>
                            <p>
                                It's a hand-made micro games console. It's a desktop terminal for PostHog data. It's a
                                friend.
                            </p>
                            <p>
                                <b>Can it play Pong?</b> Yes.
                                <br /> <b>Can it play Flappy Bird?</b> Yes.
                                <br /> <b>Can it play Doom?</b> ...We're working on it.
                            </p>
                            <div>
                                <p className="text-center text-lg mb-4 bg-[#E5E7E0] dark:bg-slate-700 dark:text-slate-200 p-4 rounded-md shadow-md w-full">
                                    <strong>
                                        Want <i>more</i> hardware?
                                    </strong>{' '}
                                    We included an I²C expansion port, just for people like you.
                                </p>
                            </div>
                        </div>
                        <aside className="shrink-0 md:basis-[500px]">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/hogzilla_73b822a689.png"
                                alt="DeskHog is a beast"
                                className="w-full max-w-[470px]"
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {/* Game 1: Pog */}
                        <div className="h-[174px] relative group [perspective:1000px] text-center">
                            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                {/* Front Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] bg-accent dark:bg-accent-dark rounded-lg p-4 flex flex-col justify-center items-center">
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/edcbc25d_262b_4590_936a_552c445a2ccb_1812ec3330.png"
                                        alt="Pog game screenshot"
                                        className="w-full h-full max-h-[135px] object-cover"
                                    />
                                </div>
                                {/* Back Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-lg p-6 flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <h4 className="text-xl font-bold mb-2">Pog</h4>
                                        <p className="text-sm text-primary/80 dark:text-primary-dark/80">
                                            It's Pong, but with a different name. It's perfect for playing on the
                                            toilet. Apparently.
                                        </p>
                                        <p>
                                            <b>Built by:</b>{' '}
                                            <Link to="https://posthog.com/community/profiles/30833">Leon Daly</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Game 2: Shareholder Value Clicker */}
                        <div className="h-[174px] relative group [perspective:1000px] text-center">
                            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                {/* Front Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-lg p-4 flex flex-col justify-center items-center">
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/a3e7c64e_2bfa_424e_aad2_f79bf1b86c63_7028720d2a.png"
                                        alt="Shareholder Value Clicker screenshot"
                                        className="w-full h-full max-h-[135px] object-cover"
                                    />
                                </div>
                                {/* Back Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-lg p-6 flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <h4 className="text-xl font-bold mb-2">IdleHog</h4>
                                        <p className="text-sm text-primary/80 dark:text-primary-dark/80">
                                            It's a wry satire. It's an idle clicker game. It's delivering shareholder
                                            value.
                                        </p>
                                        <p>
                                            <b>Built by:</b>{' '}
                                            <Link to="https://posthog.com/community/profiles/33534">Chris McNeill</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Game 3: One Button Dungeon */}
                        <div className="h-[174px] relative group [perspective:1000px] text-center">
                            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                {/* Front Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-lg p-4 flex flex-col justify-center items-center">
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/e9f1d2df_e53a_4af0_ac7b_fbf564444cd0_ff08ab6c7f.png"
                                        alt="One Button Dungeon screenshot"
                                        className="w-full h-full max-h-[135px] object-cover"
                                    />
                                </div>
                                {/* Back Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-lg p-6 flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <h4 className="text-xl font-bold mb-2">One Button Dungeon</h4>
                                        <p className="text-sm text-primary/80 dark:text-primary-dark/80">
                                            It's a roguelike throwback about an endless corridor. Such is life.
                                        </p>
                                        <p>
                                            <b>Built by:</b>{' '}
                                            <Link to="https://posthog.com/community/profiles/29070">Joe Martin</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Game 4: Dictator or Techbro Mobile */}
                        <div className="h-[174px] relative group [perspective:1000px] text-center">
                            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                {/* Front Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-lg p-4 flex flex-col justify-center items-center">
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_14_at_16_31_37_5e009d0dd5.png"
                                        alt="Awkwardness Avoider screenshot"
                                        className="w-full max-w-[146px] mx-auto"
                                    />
                                </div>
                                {/* Back Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-lg p-6 flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <h4 className="text-xl font-bold mb-2">Dictator or Techbro: Mobile Edition</h4>
                                        <p className="text-sm text-primary/80 dark:text-primary-dark/80">
                                            A good is worth stealing. Even if it's{' '}
                                            <Link to="https://posthog.com/community/profiles/28625">Charles'</Link>.
                                        </p>
                                        <p>
                                            <b>Built by:</b>{' '}
                                            <Link to="https://posthog.com/community/profiles/33534">Chris McNeill</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Game 5: Notchagotchi */}
                        <div className="h-[174px] relative group [perspective:1000px] text-center">
                            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                {/* Front Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-lg p-4 flex flex-col justify-center items-center">
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_14_at_16_31_37_5e009d0dd5.png"
                                        alt="Notchagotchi screenshot"
                                        className="w-full max-w-[146px] mx-auto"
                                    />
                                </div>
                                {/* Back Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-lg p-6 flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <h4 className="text-xl font-bold mb-2">Notchagotchi</h4>
                                        <p className="text-sm text-primary/80 dark:text-primary-dark/80">
                                            We were a little worried we'd be sued if we called this what it really is.
                                        </p>{' '}
                                        <p>
                                            <b>Built by:</b>{' '}
                                            <Link to="https://posthog.com/community/profiles/33385">Sophie Payne</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Game 6: Flappy Hog */}
                        <div className="h-[174px] relative group [perspective:1000px] text-center">
                            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                {/* Front Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-lg p-4 flex flex-col justify-center items-center">
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_14_at_16_31_37_5e009d0dd5.png"
                                        alt="Flappy Hog screenshot"
                                        className="w-full max-w-[146px] mx-auto"
                                    />
                                </div>
                                {/* Back Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-lg p-6 flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <h4 className="text-xl font-bold mb-2">Flappy Hog</h4>
                                        <p className="text-sm text-primary/80 dark:text-primary-dark/80">
                                            Despite the title, this game has neither hedgehogs nor flapping.
                                        </p>
                                        <p>
                                            <b>Built by:</b>{' '}
                                            <Link to="https://posthog.com/community/profiles/29070">Joe Martin</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-lg mb-4 bg-[#E5E7E0] dark:bg-slate-700 dark:text-slate-200 p-4 rounded-md shadow-md w-full">
                        <strong>Hang on. I can make my own games for it?</strong> Yep, just head to{' '}
                        <Link to="https://github.com/PostHog/DeskHog" className="text-red dark:text-yellow">
                            GitHub to get started
                        </Link>
                        .
                    </p>
                </section>
            </div>

            <section className="py-10">
                <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5`}>
                    <h2 className="text-4xl text-center mb-2">It also has important business tools</h2>
                    <h4 className="text-2xl text-center mb-12">(A great excuse to expense your DeskHog purchase)</h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {/* Game 4: Awkwardness Avoider */}
                        <div className="h-[174px] relative group [perspective:1000px] text-center">
                            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                {/* Front Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-lg p-4 flex flex-col justify-center items-center">
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_14_at_16_31_37_5e009d0dd5.png"
                                        alt="Awkwardness Avoider screenshot"
                                        className="w-full max-w-[146px] mx-auto"
                                    />
                                </div>
                                {/* Back Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-lg p-6 flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <h4 className="text-xl font-bold mb-2">Awkwardness Avoider</h4>
                                        <p className="text-sm text-primary/80 dark:text-primary-dark/80">
                                            Hate smalltalk? These icebreakers will help.
                                        </p>
                                        <p>
                                            <b>Built by:</b>{' '}
                                            <Link to="https://posthog.com/community/profiles/28619">Annika Schmid</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Item 2: Pomodoro Timer */}
                        <div className="h-[174px] relative group [perspective:1000px]">
                            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                {/* Front Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-lg p-4 text-center flex flex-col justify-center items-center">
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_14_at_16_31_37_5e009d0dd5.png"
                                        alt="Pomodoro Timer tool"
                                        className="w-full max-w-[146px] mx-auto"
                                    />
                                </div>
                                {/* Back Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-lg p-6 flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <h4 className="text-xl font-bold mb-2">Pomodoro Timer</h4>
                                        <p className="text-sm text-primary/80 dark:text-primary-dark/80">
                                            Gives you time to ponder 20 tomatoes.
                                        </p>
                                        <p>
                                            <b>Built by:</b>{' '}
                                            <Link to="https://posthog.com/community/profiles/28619">Annika Schmid</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Item 3: Insight Keeper-upper */}
                        <div className="h-[174px] relative group [perspective:1000px]">
                            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                {/* Front Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-lg p-4 text-center flex flex-col justify-center items-center">
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_14_at_16_31_37_5e009d0dd5.png"
                                        alt="Insight Keeper-upper tool"
                                        className="w-full max-w-[146px] mx-auto"
                                    />
                                </div>
                                {/* Back Face */}
                                <div className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-lg p-6 flex flex-col justify-center items-center">
                                    <div className="text-center">
                                        <h4 className="text-xl font-bold mb-2">Insight Keeper-upper</h4>
                                        <p className="text-sm text-primary/80 dark:text-primary-dark/80">
                                            Grab graphs from PostHog and squint at them.
                                        </p>
                                        <p>
                                            <b>Built by:</b>{' '}
                                            <Link to="https://posthog.com/community/profiles/31731">Danilo Campos</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-5">
                <div className="flex flex-col-reverse items-center md:flex-row gap-8 mb-20">
                    <div className="flex-1">
                        <h2 className="text-4xl">
                            Your phone is <span className="text-red dark:text-yellow">DeskHog's best friend</span>
                        </h2>
                        <p>
                            Scan the QR code with your phone to access a portal where you can configure your DeskHog,
                            connect to WiFi, and link data from your PostHog instance to the Insight Keeper-upper.
                        </p>
                        <p>
                            You can also use the mobile app to add new cards to your DeskHog. Cards are the building
                            block of the DeskHog UI, and they include all the standard tools and games. Rearrange them
                            as you like, or build new ones, to make DeskHog your own.
                        </p>
                    </div>
                    <aside className="shrink-0 md:basis-[500px] flex justify-center">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/hell_yeah_app_c750f3c058.png"
                            alt="DeskHog is a beast"
                            className="w-1/2 max-w-[470px] mx-auto"
                        />
                    </aside>
                </div>
            </section>

            {/* DeskHog Specs Section */}
            <section className="py-10">
                <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5`}>
                    <h2
                        className="text-5xl font-bold text-center mb-16 text-primary dark:text-primary-dark"
                        dangerouslySetInnerHTML={{
                            __html: 'The <s>devil</s> <span class="text-red dark:text-yellow">power</span> is in the details<br />',
                        }}
                    />
                    <div className="flex justify-center">
                        <div className="inline-grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                            {[
                                {
                                    label: 'Processor',
                                    icon: <IconBolt />,
                                    details: 'ESP32-S3 Dual Core\n240MHz Tensilica',
                                },
                                {
                                    label: 'Memory',
                                    icon: <IconStack />,
                                    details: '4MB Flash, 2MB PSRAM\n512KB SRAM',
                                },
                                {
                                    label: 'Display',
                                    icon: <IconEye />,
                                    details: '1.14" Color IPS TFT\n240x135 pixels (ST7789)\n',
                                },
                                {
                                    label: 'Connectivity',
                                    icon: <IconShare />,
                                    details: '2.4GHz Wi-Fi (802.11b/g/n)\nBluetooth LE (BLE)',
                                },
                                {
                                    label: 'Power & Battery',
                                    icon: <IconRewindPlay />,
                                    details:
                                        'USB Type-C / LiPo Battery\nBuilt-in Charging, MAX17048 Monitor\nLow Power Sleep (40-50µA)',
                                },
                                {
                                    label: 'Expansion',
                                    icon: <IconPlus />,
                                    details: 'STEMMA QT (I²C)\nFeatherWing Compatible\nSerial Debug Pin',
                                },
                                {
                                    label: 'Enclosure',
                                    icon: <IconWrench />,
                                    details: 'Custom 3D Printed (PETG)\nOpen source files available',
                                },
                                {
                                    label: 'Inputs',
                                    icon: <IconCursorClick />,
                                    details: '3x User Tactile Buttons\nReset & DFU Buttons',
                                },
                                {
                                    label: 'Dimensions',
                                    icon: <IconBuilding />,
                                    details: '~70mm x 40mm x 15mm\nPalm-Perfectly-Sized',
                                },
                                {
                                    label: 'Also included',
                                    icon: <IconToggle />,
                                    details: 'Unlimited potential\n(Hardware permitting)',
                                },
                            ].map((spec, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <span className="text-orange w-8 h-8 mt-1 shrink-0">{spec.icon}</span>
                                    <div>
                                        <h3 className="text-xl font-semibold text-primary/80 dark:text-primary-dark/80 mb-1.5">
                                            {spec.label}
                                        </h3>
                                        <p
                                            className="text-md text-primary dark:text-primary-dark whitespace-pre-line"
                                            dangerouslySetInnerHTML={{ __html: spec.details }}
                                        />
                                    </div>
                                </div>
                            ))}
                            {/* New expandable callout */}
                            <ExpandableCallout />
                        </div>
                    </div>
                </div>
            </section>

            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10`}>
                <PairsWith items={pairsWithItemCount}>
                    {PairsWithArray.map((card, index) => {
                        return <PairsWithItem {...card} key={index} />
                    })}
                </PairsWith>
            </div>

            {/* DeskHogCTA Section Wrapper */}
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'mx-auto'} relative px-5 pb-10`}>
                <section className="mb-0">
                    <DeskHogCTA />
                </section>
            </div>
        </>
    )
}

export default ProductDeskHog
