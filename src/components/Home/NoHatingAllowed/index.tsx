import { IconChevronDown } from '@posthog/icons'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useRef } from 'react'
import Link from 'components/Link'

const cards = [
    {
        top: 'You enjoy "jumping on a quick call" with sales',
        bottom: (
            <>
                Sorry, we don't have a sales team. But you can{' '}
                <Link to="/book-a-demo" className="!text-red">
                    watch a recorded demo
                </Link>{' '}
                (at your own pace) or{' '}
                <Link to="/contact-sales" className="!text-red">
                    request a personalized demo
                </Link>{' '}
                if you like.
            </>
        ),
        color: '#FFD89E',
        Image: <StaticImage quality={100} placeholder="none" src="./images/i-love-telemarketing.png" />,
        ImageSize: 'w-[calc(100%_+_5rem)] -mt-4',
    },
    {
        top: 'You love needlessly wasting company money',
        bottom: (
            <>
                We only have usage-based pricing that{' '}
                <Link to="/pricing" className="!text-red">
                    decreases exponentially
                </Link>{' '}
                with scale.
            </>
        ),
        color: '#DCE7D0',
        Image: <StaticImage quality={100} placeholder="none" src="./images/wasting-money.png" />,
        ImageSize: 'w-full mt-8',
    },
    {
        top: (
            <>
                You'd rather <span className="text-red">buy</span> before you <span className="text-red">try</span>
            </>
        ),
        bottom: (
            <>
                We offer a free tier so large that only a fraction of our customers pay us anything. Even worse, we
                continually try to{' '}
                <Link to="/blog/multi-product-pricing" className="!text-red">
                    reduce our pricing
                </Link>
                .
            </>
        ),
        color: '#D9E1FC',
        Image: <StaticImage quality={100} placeholder="none" src="./images/try-buy.png" />,
        ImageSize: 'w-[240px] -mt-4',
    },
    {
        top: 'You think your email is a good trade for that free whitepaper',
        bottom: <>Please press Ctrl + W now, or ask your network administrator to close your window.</>,
        color: '#FDBAF2',
        Image: <StaticImage quality={100} placeholder="none" src="./images/bad-trade.png" />,
        ImageSize: 'w-full mt-4',
    },
    {
        top: 'You give out your credit card details to strangers',
        bottom: <>You'd rather buy a product you've never used instead of a generous free trial?</>,
        color: '#FFD89E',
        Image: <StaticImage quality={100} placeholder="none" src="./images/stranger-danger.png" />,
        ImageSize: 'w-[230px] mt-6',
    },
    {
        top: "You're desperate for commitment",
        bottom: (
            <>
                Sadly, we don't offer annual contracts (unless you{' '}
                <Link to="/contact-sales" className="!text-red">
                    ask for one
                </Link>
                ).
            </>
        ),
        color: '#DCE7D0',
        Image: <StaticImage quality={100} placeholder="none" src="./images/commitment-issues.png" />,
        ImageSize: 'w-full mt-4',
    },
    {
        top: 'You loathe new features, and bug fixes',
        bottom: (
            <>
                Unfortunately we release{' '}
                <Link to="/changelog" className="!text-red">
                    new updates weekly
                </Link>
                .
            </>
        ),
        color: '#D9E1FC',
        Image: <StaticImage quality={100} placeholder="none" src="./images/i-hate-change.png" />,
        ImageSize: 'w-full',
    },
    {
        top: "You'd rather buy disparate tools and mangle them together",
        bottom: <>Apologies. Our focus is for you to engineer your product, not your data.</>,
        color: '#FDBAF2',
        Image: <StaticImage quality={100} placeholder="none" src="./images/mangle.png" />,
        ImageSize: 'w-[230px] mt-6',
    },
    {
        top: 'You like buying a whole product suite to get access to one tool',
        bottom: <>Alas we don't force people to buy stuff they don't use. We suit people who want to pay by product.</>,
        color: '#FFD89E',
        Image: <StaticImage quality={100} placeholder="none" src="./images/creative-suite-sucks.png" />,
        ImageSize: 'w-[230px] mt-4',
    },
    {
        top: 'You think CSMs are your friends',
        bottom: <>Honey, those emails are automated.</>,
        color: '#D9E1FC',
        Image: <StaticImage quality={100} placeholder="none" src="./images/csms.png" />,
        ImageSize: 'w-[230px] mt-8',
    },
    {
        top: 'You enjoy sitting through hours of training more than using the product',
        bottom: (
            <>
                No training is required to use PostHog, though we have plenty of{' '}
                <Link to="/docs" className="!text-red">
                    docs
                </Link>{' '}
                and{' '}
                <Link to="/guides" className="!text-red">
                    guides
                </Link>{' '}
                if you need some guidance.
            </>
        ),
        color: '#FFD89E',
        Image: <StaticImage quality={100} placeholder="none" src="./images/training.png" />,
        ImageSize: 'w-[250px] mt-8',
    },
    {
        top: "Data privacy isn't a big deal to you. (GDP-what now?)",
        bottom: <>Get cookie-less tracking, regional hosting, and raw database access.</>,
        color: '#FDBAF2',
        Image: <StaticImage quality={100} placeholder="none" src="./images/gdpwut.png" />,
        ImageSize: 'w-[250px] mt-8',
    },
    {
        top: 'Networking events are your things',
        bottom: <>We put on an event once. It was a disaster. Never again.</>,
        color: '#FFD89E',
        Image: <StaticImage quality={100} placeholder="none" src="./images/ru-bizdev.png" />,
        ImageSize: 'w-[250px]',
    },
    {
        top: 'You love being out of the loop',
        bottom: (
            <>
                We publish our{' '}
                <Link to="/roadmap" className="!text-red">
                    roadmap
                </Link>
                ,{' '}
                <Link to="/handbook/company/strategy" className="!text-red">
                    strategy
                </Link>
                , and{' '}
                <Link to="/handbook" className="!text-red">
                    company handbook
                </Link>
                .
            </>
        ),
        color: '#DCE7D0',
        Image: <StaticImage quality={100} placeholder="none" src="./images/loop-hole.png" />,
        ImageSize: 'w-full',
    },
    {
        top: 'Your CRM is a Rolodex',
        bottom: <>We don't even use phones, though we do have a fax number for legal and compliance reasons.</>,
        color: '#D9E1FC',
        Image: <StaticImage quality={100} placeholder="none" src="./images/rolodex.png" />,
        ImageSize: 'w-[230px] -mt-4',
    },
]

const Card = ({ top, bottom, Image, ImageSize, color }) => {
    return (
        <li
            style={{ backgroundColor: color || 'white' }}
            className="h-[400px] w-[300px] flex flex-col justify-between p-5 rounded-md relative even:rotate-3 odd:-rotate-3 flex-shrink-0 snap-center overflow-hidden md:first:ml-12"
        >
            <div className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-8 ${ImageSize}`}>
                {Image}
            </div>
            <h5 className="m-0 text-2xl text-black relative leading-7">{top}</h5>
            <p className="text-sm text-black m-0 relative">{bottom}</p>
        </li>
    )
}

export default function NoHatingAllowed() {
    const listRef = useRef<HTMLUListElement>(null)

    return (
        <div className="relative pt-8 mb-12 overflow-hidden">
            <h2 className="text-4xl lg:text-6xl text-center mb-5">
                <span className="text-red uppercase block md:inline">Warning:</span> You'll hate PostHog if...
            </h2>
            <div className="absolute z-10 -left-10 top-64 bottom-32 w-48 bg-gradient-radial from-light/30 via-light/0 to-light/0 dark:from-dark/30 dark:via-dark/0 dark:to-dark/0" />
            <div className="absolute z-20 top-1/2 left-0 -translate-y-1/2 mt-16">
                <button
                    onClick={() => listRef?.current?.scrollBy({ left: -300, behavior: 'smooth' })}
                    className="relative hover:scale-[1.01] hover:top-[-1px] active:top-[.5px] active:scale-[.99] md:z-30 p-8"
                >
                    <IconChevronDown className="w-12 h-12 rounded-sm text-primary/60 hover:text-primary/100 dark:text-primary-dark/60 dark:hover:text-primary-dark/100 rotate-90 hover:bg-accent/25 dark:hover:bg-accent-dark/25 hover:backdrop-blur-sm active:backdrop-blur-sm border-transparent hover:border hover:border-light dark:hover:border-dark" />
                </button>
            </div>
            <ul
                ref={listRef}
                className="list-none m-0 p-0 flex space-x-12 w-full px-5 snap-x overflow-x-auto overflow-y-hidden py-6 lg:py-12"
            >
                {cards.map((card, index) => {
                    return <Card {...card} key={index} />
                })}
            </ul>
            <div className="absolute -right-10 top-64 bottom-32 w-48 bg-gradient-radial from-light/30 via-light/0 to-light/0 dark:from-dark/30 dark:via-dark/0 dark:to-dark/0" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 mt-16">
                <button
                    onClick={() => listRef?.current?.scrollBy({ left: 300, behavior: 'smooth' })}
                    className="relative hover:scale-[1.01] hover:top-[-1px] active:top-[.5px] active:scale-[.99] md:z-30 p-8"
                >
                    <IconChevronDown className="w-12 h-12 rounded-sm text-primary/60 hover:text-primary/100 dark:text-primary-dark/60 dark:hover:text-primary-dark/100 -rotate-90 hover:bg-accent/25 dark:hover:bg-accent-dark/25 hover:backdrop-blur-sm active:backdrop-blur-sm border-transparent hover:border hover:border-light dark:hover:border-dark" />
                </button>
            </div>
        </div>
    )
}
