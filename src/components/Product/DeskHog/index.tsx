import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Link from 'components/Link'
import {
    IconLaptop,
    IconWrench,
    IconHandwave,
    IconCode2,
    IconChip,
    IconMemory,
    IconScreen,
    IconSignal,
    IconBatteryCharge,
    IconExpand45,
    IconBox,
    IconButton,
    IconRuler,
    IconInfinity,
    IconExternal,
    IconDeskHog,
} from '@posthog/icons'
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

interface AppProps {
    image?: string
    title: string
    description: string
    author: string
    authorUrl: string
    isBuildYourOwn?: boolean
}

const App = ({ image, title, description, author, authorUrl, isBuildYourOwn }: AppProps) => (
    <div className="h-[174px] relative group [perspective:1000px] text-center">
        <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            {/* Front Face */}
            <div className="absolute h-full w-full [backface-visibility:hidden] flex flex-col justify-center items-center">
                {image ? (
                    <CloudinaryImage src={image} alt={`${title} screenshot`} className="w-full max-w-[224px] mx-auto" />
                ) : (
                    <h4 className="text-xl font-bold mb-2">{title} →</h4>
                )}
            </div>
            {/* Back Face */}
            <div className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded p-6 duration-150 flex flex-col justify-center items-center">
                <div className="text-center">
                    <h4 className="text-xl font-bold mb-2">{title}</h4>
                    <p className="text-[15px] text-primary/80 dark:text-primary-dark/80 mb-2">{description}</p>
                    {!isBuildYourOwn ? (
                        <p className="text-sm">
                            <b>Built by:</b> <Link to={authorUrl}>{author}</Link>
                        </p>
                    ) : (
                        <p>
                            <Link to="https://github.com/PostHog/DeskHog" className="text-red dark:text-yellow">
                                Get started on GitHub
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    </div>
)

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
            "We're open-source, and so is DeskHog. It's yours to hack. Build your own games and tools with AI editors (or C++ if you're a masochist).",
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
            "DeskHog is small enough to fit in your pocket. It's got a 10-hour battery life, WiFi, and a cute flashing LED so you can find it in the dark.",
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
            <h1 className="text-5xl md:text-6xl text-center mb-4 md:mb-2 text-balance">
                It's a developer <span className="text-red dark:text-yellow">toy</span> that brings developers{' '}
                <span className="text-red dark:text-yellow">joy</span>
            </h1>
            <p className="text-lg font-semibold text-center text-opacity-75 mb-5">
                Full kits coming soon. DIY version available now.
            </p>
            <div className="flex justify-center gap-2 mb-12">
                <CallToAction href="https://github.com/PostHog/DeskHog" type="primary" externalNoIcon>
                    <>
                        Get the DIY version
                        <IconExternal className="size-4 inline-block ml-1" />
                    </>
                </CallToAction>
                <CallToAction href="https://posthog.com/merch" type="secondary" externalNoIcon>
                    <>Join the kit waitlist</>
                </CallToAction>
            </div>
        </section>
    )
}

// Working video section - currently using Cloudinary video embed
// const VideoDeskHog = () => (
//     <section id="demo-video" className={`overflow-hidden h-auto max-h-[90vh] mb-8 pt-10`}>
//         <div className="inline-flex mx-auto relative overflow-hidden w-full aspect-video">
//             <iframe
//                 src="https://res.cloudinary.com/dmukukwp6/video/upload/Termagotchi_084775b39f.mp4"
//                 className="rounded aspect-video m-0 shadow-xl"
//                 allow="autoplay"
//             />
//             <div className="absolute top-10 -right-10 md:top-10 md:-right-14">
//                 <a
//                     href="https://github.com/PostHog/DeskHog"
//                     className="inline-block bg-yellow text-black hover:text-black px-8 py-1 md:px-12 md:py-2 text-sm md:text-base font-semibold shadow-lg transform rotate-45"
//                 >
//                     <span className="text-black">Build it yourself</span>
//                     <IconExternal className="size-4 inline-block ml-1 relative -top-0.5" />
//                 </a>
//             </div>
//         </div>
//     </section>
// )

// Define DeskHogCTA component
const DeskHogCTA = () => {
    const headingClasses = 'font-bold text-center text-4xl lg:text-5xl mb-3 text-red dark:text-yellow'
    const subheadingClasses =
        'text-center text-primary dark:text-primary-dark opacity-75 dark:opacity-100 max-w-xl mx-auto mb-6'

    return (
        <section className="relative overflow-hidden">
            {/* Text Content Wrapper with PostHog card style */}
            <div className="relative z-10 bg-white dark:bg-accent-dark p-8 rounded-lg mx-auto max-w-xl border border-light dark:border-dark shadow-xl">
                <h2 className={headingClasses}>3D print it yourself now</h2>
                <h3 className={`${subheadingClasses} mb-0`}>
                    DeskHog kits coming soon but you can 3D print it yourself now. Just add components!
                </h3>
                <div className="flex justify-center my-6">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/deskhog_smiling_36bb2647ff.png"
                        alt="DeskHog marketing image"
                        width={350}
                    />
                </div>
                <div className="flex justify-center gap-2">
                    <CallToAction
                        href="https://github.com/PostHog/DeskHog"
                        type="primary"
                        size="lg"
                        className="w-full sm:w-auto"
                        externalNoIcon
                    >
                        <>
                            Make your own
                            <IconExternal className="size-4 inline-block ml-1" />
                        </>
                    </CallToAction>
                    <CallToAction
                        href="https://posthog.com/merch"
                        type="secondary"
                        size="lg"
                        className="w-full sm:w-auto"
                        externalNoIcon
                    >
                        <>
                            Join the kit waitlist
                            <IconExternal className="size-4 inline-block ml-1" />
                        </>
                    </CallToAction>
                </div>
            </div>
        </section>
    )
}

// Expandable Callout Component
const ExpandableCallout = () => {
    return (
        <div className="col-span-2 bg-accent dark:bg-accent-dark py-4 px-8 rounded-lg w-full max-w-lg mx-auto">
            <div className="mt-4 flex flex-col">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/deskhog_max_904ca43b3e.png"
                    alt="DeskHog Pro"
                    className="w-full max-w-[224px] mx-auto mb-4"
                />
                <h5 className="text-center">Coming soon: DeskHog Pro & Friends?</h5>
                <p>This is just the beginning of the DeskHog adventure. If you like it we'll make more, maybe.</p>
                <p>
                    DeskHog Pro will connect via the I²C port, adding more buttons, and a huge dial so you can crank up
                    the vibes. We're also thinking about making a watch strap, so you can wear DeskHog on your wrist.
                </p>
                <p>
                    Got ideas for other accessories? <a href="mailto:danilo@posthog.com">Let us know!</a>
                </p>
            </div>
        </div>
    )
}

export const ProductDeskHog = () => {
    const { fullWidthContent } = useLayoutData()
    return (
        <>
            <SEO
                title="DeskHog - PostHog"
                description="It's a developer toy that brings developers joy. Open-source. 3D-printed. Palm-sized."
                image={`/images/og/deskhog.jpg`}
            />
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 pt-10 pb-10`}>
                <HeroDeskHog
                    color="blue"
                    icon={<IconDeskHog />}
                    product={product.capitalized}
                    title="It's a developer toy that <br /> <span className='text-red dark:text-yellow'>brings developers joy</span>"
                    description="Pre-built kits coming soon. DIY version available now."
                />
                {/* <VideoDeskHog /> */}
                <section id="demo-image" className="mb-0 pt-0">
                    <div className="flex justify-center">
                        <div className="w-full max-w-[400px]">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/deskhog_smiling_36bb2647ff.png"
                                alt="DeskHog in action"
                                className="w-full"
                            />
                        </div>
                    </div>
                </section>
            </div>

            <div id="features">
                <section className="max-w-7xl mx-auto px-5 pb-6">
                    <div className="mb-4">
                        <h2 className="text-4xl lg:text-5xl text-center text-balance mb-12">
                            DeskHog is an <span className="text-red dark:text-yellow">open-source,</span>{' '}
                            <span className="text-red dark:text-yellow">3D printed,</span>{' '}
                            <span className="text-red dark:text-yellow">palm-sized</span> slice of developer joy
                        </h2>
                        <ul className={`list-none p-0 grid md:grid-cols-${subfeaturesItemCount} gap-4`}>
                            {subfeatures.map((subfeature, index) => {
                                return <Subfeature {...subfeature} key={index} />
                            })}
                        </ul>
                    </div>

                    <div className="flex flex-col-reverse items-center md:flex-row gap-8 pt-20 mb-20">
                        <div className="flex-1">
                            <h2 className="text-4xl lg:text-5xl">
                                But what is DeskHog really?
                                <br />
                                <span className="text-red dark:text-yellow">It's a teeny, tiny, beast.</span>
                            </h2>
                            <p>
                                DeskHog packs a ESP32-S3 Reverse TFT Feather in a custom-made 3D printed case. It comes
                                complete with a 240x135 color TFT display, a 10-hour battery life, WiFi, and a cute
                                little LED.
                            </p>
                            <p>
                                It's a hand-made micro games console. It's a desktop terminal for PostHog data. It's a
                                friend.
                            </p>
                            <div className="inline-grid grid-cols-2 [&>*]:p-2 divide-y divide-border dark:divide-border-dark border border-light dark:border-dark text-sm mb-6">
                                <strong className="border-r border-light dark:border-dark">Can it play Pong?</strong>
                                <span className="!border-t-0">Yes.</span>
                                <strong className="border-r border-light dark:border-dark">
                                    Can it play Flappy Bird?
                                </strong>
                                <span>Yes.</span>
                                <strong className="border-r border-light dark:border-dark">Can it play Doom?</strong>
                                <span>...We're working on it.</span>
                            </div>
                            <p className="text-sm mb-4 border-l-4 border-light dark:border-dark pl-2 py-1">
                                <strong>
                                    Want <i>more</i> hardware?
                                </strong>{' '}
                                We included an I²C expansion port, just for people like you.
                            </p>
                        </div>
                        <aside className="shrink-0 md:basis-[500px]">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/hogzilla_73b822a689.png"
                                alt="DeskHog is a beast"
                                className="w-full max-w-[470px]"
                            />
                        </aside>
                    </div>
                    <h2 className="text-5xl text-center mb-2">Of course, we're making some games for it too</h2>
                    <h3 className="text-xl text-center font-medium mb-12">
                        We're still nailing down the launch lineup, but you can{' '}
                        <Link
                            to="https://github.com/PostHog/DeskHog"
                            externalNoIcon
                            className="text-red dark:text-yellow"
                        >
                            build your own
                        </Link>{' '}
                        while you wait
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <App
                            image="https://res.cloudinary.com/dmukukwp6/image/upload/edcbc25d_262b_4590_936a_552c445a2ccb_1812ec3330.png"
                            title="Pog"
                            description="It's Pong, but with a different name. It's perfect for playing on the toilet. Apparently."
                            author="Leon Daly"
                            authorUrl="https://posthog.com/community/profiles/30833"
                        />
                        <App
                            image="https://res.cloudinary.com/dmukukwp6/image/upload/a3e7c64e_2bfa_424e_aad2_f79bf1b86c63_7028720d2a.png"
                            title="IdleHog"
                            description="It's a wry satire. It's an idle clicker game. It's delivering shareholder value."
                            author="Chris McNeill"
                            authorUrl="https://posthog.com/community/profiles/33534"
                        />
                        <App
                            image="https://res.cloudinary.com/dmukukwp6/image/upload/e90c7a39_484a_40a0_94b1_693962bbd13e_52085d0806.png"
                            title="One Button Dungeon"
                            description="It's a roguelike throwback about an endless corridor. Such is life."
                            author="Joe Martin"
                            authorUrl="https://posthog.com/community/profiles/29070"
                        />
                        <App
                            image="https://res.cloudinary.com/dmukukwp6/image/upload/52974df0_4084_41c0_a1e1_3e628c143c2c_dca92f8f5c.png"
                            title="Dictator or Techbro: Mobile Edition"
                            description="A good idea is worth stealing. Even if it's Charles'."
                            author="Chris McNeill"
                            authorUrl="https://posthog.com/community/profiles/33534"
                        />
                        <App
                            image="https://res.cloudinary.com/dmukukwp6/image/upload/b46b4cb6_d18e_4ae2_9913_7a8966a778ed_3e9927cf98.png"
                            title="Notchagotchi"
                            description="We were a little worried we'd be sued if we called this what it really is."
                            author="Sophie Payne"
                            authorUrl="https://posthog.com/community/profiles/33385"
                        />
                        <App
                            image="https://res.cloudinary.com/dmukukwp6/image/upload/0e9ed66b_2907_4e08_b105_99f15bfee041_3bca3468a4.png"
                            title="Flappy Hog"
                            description="Despite the title, this game has neither hedgehogs nor flapping."
                            author="Joe Martin"
                            authorUrl="https://posthog.com/community/profiles/29070"
                        />
                        <App
                            image="https://res.cloudinary.com/dmukukwp6/image/upload/54ac3129_4dd2_446d_afa2_e6c25668f52b_0e92dbcf4c.png"
                            title="Hogspeed"
                            description="Test your reflexes with this high-speed, minimal reaction game with ASCII art."
                            author="Chris McNeill"
                            authorUrl="https://posthog.com/community/profiles/33534"
                        />
                        <App
                            image="https://res.cloudinary.com/dmukukwp6/image/upload/a06eea35_ff91_4b86_945b_3f25fc5fd259_c3307a2350.png"
                            title="Pineapple Reflex"
                            description="Does pineapple belong on pizza? Sophie thinks so."
                            author="Sophie Payne"
                            authorUrl="https://posthog.com/community/profiles/33385"
                        />
                        <App
                            title="Build your own"
                            description="Start your game development journey with DeskHog. Vibe coding encouraged!"
                            author=""
                            authorUrl=""
                            isBuildYourOwn={true}
                        />
                    </div>
                </section>
            </div>

            <section className="py-10">
                <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5`}>
                    <h2 className="text-4xl lg:text-5xl text-center mb-2">
                        It will also have important business tools
                    </h2>
                    <h3 className="text-2xl text-center mb-12">(A great excuse to expense your DeskHog purchase)</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <App
                            image="https://res.cloudinary.com/dmukukwp6/image/upload/5598bc45_d969_45c3_bce9_3cc4c5cf0ad5_ef111c5357.png"
                            title="Awkwardness Avoider"
                            description="Hate smalltalk? These icebreakers will help."
                            author="Annika Schmid"
                            authorUrl="https://posthog.com/community/profiles/28619"
                        />
                        <App
                            image="https://res.cloudinary.com/dmukukwp6/image/upload/d507387e_798f_4fe8_9a4a_c0d13e7525a3_f842494c9e.png"
                            title="Pomodoro Timer"
                            description="Gives you time to ponder 20 tomatoes."
                            author="Annika Schmid"
                            authorUrl="https://posthog.com/community/profiles/28619"
                        />
                        <App
                            image="https://res.cloudinary.com/dmukukwp6/image/upload/3c4149d1_f52b_4861_96f5_ee5123b0dd39_9441f50703.png"
                            title="Insight Keeper-upper"
                            description="Grab graphs from PostHog and squint at them."
                            author="Danilo Campos"
                            authorUrl="https://posthog.com/community/profiles/31731"
                        />
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-5">
                <div className="flex flex-col-reverse items-center md:flex-row gap-8 mb-8">
                    <div className="flex-1">
                        <h2 className="text-4xl lg:text-5xl text-center md:text-left">
                            Your phone and data are{' '}
                            <span className="text-red dark:text-yellow">DeskHog's best friends</span>
                        </h2>
                        <p>
                            DeskHog can get online via a captive portal and pull insights from your PostHog projects.
                            Scan the QR code with your phone to connect and link data to the Insight Keeper-upper.
                        </p>
                        <p>
                            The DIY version of DeskHog already supports simple insights, like big numbers and trends
                            (squinting required), but we're working on more. And we're open source, so you can help!
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
                        <div className="grid md:inline-grid grid-cols-2 gap-x-8 md:gap-x-16 gap-y-10">
                            {[
                                {
                                    label: 'Processor',
                                    icon: <IconChip />,
                                    details: 'ESP32-S3 Dual Core\n240MHz Tensilica',
                                },
                                {
                                    label: 'Memory',
                                    icon: <IconMemory />,
                                    details: '4MB Flash, 2MB PSRAM\n512KB SRAM',
                                },
                                {
                                    label: 'Display',
                                    icon: <IconScreen />,
                                    details: '1.14" Color IPS TFT\n240x135 pixels (ST7789)\n',
                                },
                                {
                                    label: 'Connectivity',
                                    icon: <IconSignal />,
                                    details: '2.4GHz Wi-Fi (802.11b/g/n)\nBluetooth LE (BLE)',
                                },
                                {
                                    label: 'Power & Battery',
                                    icon: <IconBatteryCharge />,
                                    details:
                                        'USB Type-C / LiPo Battery\nBuilt-in Charging, MAX17048 Monitor\nLow Power Sleep (40-50µA)',
                                },
                                {
                                    label: 'Expansion',
                                    icon: <IconExpand45 />,
                                    details: 'STEMMA QT (I²C)\nFeatherWing Compatible\nSerial Debug Pin',
                                },
                                {
                                    label: 'Enclosure',
                                    icon: <IconBox />,
                                    details: 'Custom 3D Printed (PETG)\nOpen source files available',
                                },
                                {
                                    label: 'Inputs',
                                    icon: <IconButton />,
                                    details: '3x User Tactile Buttons\nReset & DFU Buttons',
                                },
                                {
                                    label: 'Dimensions',
                                    icon: <IconRuler />,
                                    details: '~70mm x 40mm x 15mm\nPalm-Perfectly-Sized',
                                },
                                {
                                    label: 'Also included',
                                    icon: <IconInfinity />,
                                    details: 'Unlimited potential\n(Hardware permitting)',
                                },
                            ].map((spec, index) => (
                                <div
                                    key={index}
                                    className="grid-cols-2 md:grid-cols-1 flex flex-col md:flex-row items-start gap-4"
                                >
                                    <span className="text-primary/50 size-8 -mt-1 shrink-0">{spec.icon}</span>
                                    <div>
                                        <h3 className="text-base font-bold text-primary/80 dark:text-primary-dark/80 mb-1">
                                            {spec.label}
                                        </h3>
                                        <p
                                            className="text-sm text-primary dark:text-primary-dark whitespace-pre-line"
                                            dangerouslySetInnerHTML={{ __html: spec.details }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* New expandable callout */}
                    <div className="text-base italic font-semibold text-center w-full pb-6 mt-12">
                        And this is just for starters...
                    </div>
                    <ExpandableCallout />
                </div>
            </section>

            {/* <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10`}>
                <PairsWith items={pairsWithItemCount}>
                    {PairsWithArray.map((card, index) => {
                        return <PairsWithItem {...card} key={index} />
                    })}
                </PairsWith>
            </div> */}

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
