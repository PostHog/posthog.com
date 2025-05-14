import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Link from 'components/Link'
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
    IconLaptop,
    IconServer,
    IconStack,
    IconToggle,
    IconShare,
    IconPlay,
    IconHandMoney,
    IconThumbsUp,
    IconHeartFilled,
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

const subfeaturesItemCount = 5
const subfeatures = [
    {
        title: 'Track insights',
        description: 'Pull data from your PostHog instance to track important metrics.',
        icon: <IconGraph />,
    },
    {
        title: 'Get motivated',
        description: 'Ships with FriendCard, a friendly hedgehog who encourages you.',
        icon: <IconThumbsUp />,
    },
    {
        title: 'Play games',
        description: 'Play Pog (Pong), Flappy Hog, and One Button Dungeon (Roguelike).',
        icon: <IconPlay />,
    },
    {
        title: 'Increase revenue',
        description: "Clicker game? Wry satire? Doesn't matter, shareholders love it.",
        icon: <IconHandMoney />,
    },
    {
        title: 'Nurture hedgehogs',
        description: 'Take care of a virtual hedgehog who loves pineapples on pizza.',
        icon: <IconHeartFilled />,
    },
]

const faqs = [
    {
        question: 'What is DeskHog?',
        children: 'DeskHog is a revolutionary way to manage and optimize your desk setup!',
    },
    {
        question: 'Is there a free tier?',
        children: 'Yes, DeskHog offers a generous free tier to get you started.',
    },
]

const pairsWithItemCount = 3
const PairsWithArray = [
    {
        icon: <IconGraph />,
        product: 'Productivity Tracker',
        color: 'blue',
        description: 'Integrate DeskHog with your favorite productivity tools.',
        url: '#',
    },
    {
        icon: <IconToggle />,
        product: 'Smart Home Hub',
        color: 'seagreen',
        description: 'Control your smart desk accessories through DeskHog.',
        url: '#',
    },
    {
        icon: <IconServer />,
        product: 'Cloud Backup',
        color: 'black dark:text-white',
        description: 'Backup your DeskHog configurations to the cloud.',
        url: '#',
    },
]

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
                <Hero
                    color="orange"
                    icon={<IconLaptop />}
                    product={product.capitalized}
                    title="It's a developer toy that <br /> brings <span class='text-red dark:text-yellow'>developers joy</span>"
                    description="Open source, 3D printed, 100% hackable."
                />

                <div className="text-center mb-12">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductOS/images/product-os.png"
                        alt="DeskHog interface"
                        className="w-full max-w-[600px]"
                    />
                </div>
            </div>

            <div id="features">
                <section className="max-w-7xl mx-auto px-5 md:mb-20">
                    <div className="mb-4">
                        <h2 className="text-4xl text-center mb-8">
                            It's not <span className="text-red dark:text-yellow">just</span> a hedgehog in a box
                        </h2>
                        <ul className={`list-none p-0 grid md:grid-cols-${subfeaturesItemCount} gap-4`}>
                            {subfeatures.map((subfeature, index) => {
                                return <Subfeature {...subfeature} key={index} />
                            })}
                        </ul>
                    </div>

                    <div className="flex flex-col-reverse items-center md:flex-row gap-8 mb-20">
                        <div className="flex-1">
                            <h2 className="text-4xl">
                                100% <span className="text-red dark:text-yellow">open-source</span>
                            </h2>
                            <p>DeskHog provides a seamless experience to manage all aspects of your desk setup.</p>
                        </div>
                        <aside className="shrink-0 md:basis-[500px]">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductOS/images/sql-hog.png"
                                alt="DeskHog control panel"
                                className="w-full max-w-[562px]"
                            />
                        </aside>
                    </div>

                    <div className="mb-20">
                        <div className="flex gap-8 flex-col-reverse md:flex-row">
                            <div className="flex-1">
                                <h2 className="text-4xl">
                                    Integrates <span className="text-red dark:text-yellow">With Your Tools</span>
                                </h2>
                                <p className="max-w-2xl">
                                    DeskHog connects with {PRODUCT_COUNT}+ other PostHog products and external services
                                    to streamline your workflow.
                                </p>
                            </div>
                            <div className="shrink-0 flex flex-wrap gap-2">
                                <ProductIcon name="Productivity Suite" url="#" color="blue" icon={<IconGraph />} />
                                <ProductIcon name="Smart Lighting" url="#" color="yellow" icon={<IconRewindPlay />} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section
                id="pricing"
                className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl'} mx-auto px-5 py-20`}
            >
                <div className="flex flex-col-reverse md:flex-row md:gap-12">
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-5xl">Usage-based pricing</h2>
                        <p className="">Use {product.lowercase} with a generous free tier.</p>
                    </div>
                    <div className="md:w-96 md:text-right mb-8 md:mb-0 -mt-8">
                        <CloudinaryImage
                            alt="DeskHog Mascot"
                            placeholder="blurred"
                            quality={100}
                            className="w-full max-w-[140px]"
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/product-os/mascot.png"
                        />
                    </div>
                </div>

                <div className="lg:flex justify-between items-start gap-12 -mx-5 md:mx-0">
                    <div className="px-5 md:px-0 lg:w-96 lg:mt-4">
                        <h4 className="text-3xl">FAQs</h4>
                        {faqs.map((faq, index) => {
                            return <FAQ {...faq} key={index} />
                        })}
                    </div>
                </div>
            </section>

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
