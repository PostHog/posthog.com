import React from 'react'
import { useLocation } from '@reach/router'
import Explorer from 'components/Explorer'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'

import { Accordion } from 'components/RadixUI/Accordion'
import { IconCheck, IconX } from '@posthog/icons'
import OSTable from 'components/OSTable'
import YCombinatorLight from '../../images/customers/ycombinator-light.svg'
import StripeLogo from '../../images/stripe.svg'
import Logo from 'components/Logo'
import OSButton from 'components/OSButton'
import { useMenuSelectOptions } from 'components/TaskBarMenu/menuData'

// Partner configurations
const partnerConfigs = [
    {
        slug: 'stripe',
        title: (
            <>
                <IconX className="size-8 text-white inline-block relative top-1" />
                <img src={StripeLogo} alt="Stripe" className="inline-block h-9 relative top-[.2rem]" />
            </>
        ),
        value: '$50,000',
    },
    {
        slug: 'stripe-atlas',
        title: (
            <>
                <IconX className="size-8 text-white inline-block relative top-1" />
                <img src={StripeLogo} alt="Stripe" className="inline-block h-9 relative top-[.2rem]" />
                <span>Atlas</span>
            </>
        ),
        value: '$50,000',
    },
]

export default function Startups(): JSX.Element {
    const location = useLocation()
    const selectOptions = useMenuSelectOptions()

    // Extract partner slug from pathname
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const partnerSlug = pathSegments.length > 1 ? pathSegments[1] : null
    const partnerConfig = partnerSlug ? partnerConfigs.find((config) => config.slug === partnerSlug) : null

    // Use partner config if available, otherwise use defaults
    const titleContent = partnerConfig ? partnerConfig.title : <span>for startups</span>
    const creditValue = partnerConfig ? partnerConfig.value : '$50,000'

    return (
        <>
            <SEO
                title="Startups - PostHog"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Explorer
                template="generic"
                slug="startups"
                title="PostHog for startups"
                selectOptions={selectOptions}
                selectedCategory="startups"
                // options below only needed to override matching the slug
                // teamName="product-analytics"
                // roadmapCategory="product-analytics"
                // changelogCategory="product-analytics"
                leftSidebarContent={
                    <>
                        <Accordion
                            data-scheme="primary"
                            className=""
                            defaultValue="item-0"
                            items={[
                                {
                                    trigger: (
                                        <>
                                            <IconCheck className={`text-green size-5 inline-block`} />
                                            <span className="flex-1">How to apply</span>
                                        </>
                                    ),
                                    content: (
                                        <>
                                            <ol className="m-0">
                                                <li>Create a PostHog account and add a credit card</li>
                                                <li>
                                                    After onboarding,{' '}
                                                    <Link
                                                        to="https://app.posthog.com/startups"
                                                        external
                                                        className="underline font-semibold"
                                                    >
                                                        complete this form
                                                    </Link>
                                                </li>
                                                <li>If accepted, you'll be notified by email</li>
                                            </ol>
                                        </>
                                    ),
                                },
                            ]}
                        />
                        <Accordion
                            data-scheme="primary"
                            className=""
                            defaultValue="item-0"
                            items={[
                                {
                                    trigger: (
                                        <>
                                            <IconCheck className={`text-green size-5 inline-block`} />
                                            <span className="flex-1">Qualifications</span>
                                        </>
                                    ),
                                    content: (
                                        <>
                                            <ul className="m-0">
                                                <li>Startup under 2 years old</li>
                                                <li>Less than $5 million in funding</li>
                                            </ul>
                                        </>
                                    ),
                                },
                            ]}
                        />
                        <Accordion
                            data-scheme="primary"
                            className=""
                            defaultValue="item-0"
                            items={[
                                {
                                    trigger: (
                                        <>
                                            <IconCheck className={`text-green size-5 inline-block`} />
                                            <span className="flex-1">Fine print</span>
                                        </>
                                    ),
                                    content: (
                                        <>
                                            <ul className="m-0">
                                                <li>Credits expire after 12 months</li>
                                                <li>This deal is not valid with other discounts or offers</li>
                                                <li>
                                                    Companies on our startups plan are not eligible for priority support
                                                </li>
                                            </ul>
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </>
                }
                showTitle={false}
                padding={false}
            >
                <div className="@container h-full bg-[#EFF0EB] dark:bg-dark">
                    <div className="bg-[#122030] bg-[url(https://res.cloudinary.com/dmukukwp6/image/upload/startups_rocket_f750a70d99.png)] bg-cover bg-top-left aspect-[1549/638] text-white p-8 relative min-h-96 flex flex-col justify-center w-full">
                        <div className="absolute inset-0 bg-[url(https://res.cloudinary.com/dmukukwp6/image/upload/stars_24a6a0b509.png)] bg-cover" />
                        <div className="hidden dark:block h-60 bg-gradient-to-b from-[#EFF0EB] to-transparent -bottom-60 left-0 w-full absolute" />

                        <div className="relative pb-32 prose-invert prose-sm">
                            <h1 className="flex items-center gap-2.5 mb-0 text-2xl">
                                <Logo className="h-14 relative -top-px" fill="white" /> {titleContent}
                            </h1>
                            <ul className="prose prose-sm text-white mt-2 mb-4">
                                <li>{creditValue} in PostHog credits</li>
                                <li>Exclusive founder merch</li>
                                <li>Partner benefits</li>
                            </ul>

                            <OSButton asLink to="https://app.posthog.com/startups" variant="primary" size="md" external>
                                Apply now
                            </OSButton>

                            <p className="italic text-sm">You'll need a PostHog account first</p>
                        </div>
                    </div>

                    <div className="not-prose grid grid-cols-2 @2xl:grid-cols-4 gap-8 @2xl:gap-4 @3xl:gap-6 px-4 @3xl:px-8 relative -mt-12 max-w-6xl mb-8 @3xl:mb-12">
                        <div className="bg-[#FFD254] -rotate-1 p-4 text-black @2xl:p-2 @3xl:p-4">
                            <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/perk_credits_a8487ef646.png" />
                            <h3 className="text-base my-1 leading-tight">{creditValue} in PostHog credits</h3>
                            <p className="text-sm mb-0">
                                That's a lot of events, replays, API calls, and survey responses.
                            </p>
                        </div>
                        <div className="bg-[#9BBEC2] p-4 text-black @2xl:p-2 @3xl:p-4">
                            <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/perk_merch_b2106b276a.png" />
                            <h3 className="text-base my-1 leading-tight">Founder swag</h3>
                            <p className="text-sm mb-0">
                                You can never have too many laptop stickers, hats, or free t-shirts, right?
                            </p>
                        </div>
                        <div className="bg-[#E6B2F8] rotate-1 p-4 text-black @2xl:p-2 @3xl:p-4">
                            <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/perk_partners_5c43154c33.png" />
                            <h3 className="text-base my-1 leading-tight">Better docs with Mintlify</h3>
                            <p className="text-sm mb-0">
                                The best products deserve the best documentation. Get 50% off Mintlify for 6 months.
                            </p>
                        </div>
                        <div className="bg-[#C4D9FF] -rotate-2 p-4 text-black @2xl:p-2 @3xl:p-4">
                            <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/perk_partners_5c43154c33.png" />
                            <h3 className="text-base my-1 leading-tight">Better SDKs with Speakeasy</h3>
                            <p className="text-sm mb-0">
                                Building an API or SDK? Our pals at Speakeasy have you covered with 50% off for 6
                                months.
                            </p>
                        </div>
                    </div>

                    <div className="m-4 @3xl:m-8 max-w-6xl border-y border-primary py-8 grid @2xl:grid-cols-2 gap-8">
                        <div>
                            <img src={YCombinatorLight} className="h-12" />
                            <div className="pt-4">
                                <p>
                                    "Building is never just one-and-done. You always need to find ways to improve.{' '}
                                    <span className="text-red dark:text-yellow font-semibold">
                                        PostHog is central to how we do that at Y Combinator.
                                    </span>{' '}
                                    It helps us try ideas, measure results and make better products."
                                </p>
                                - <strong>Cat Li</strong>
                                <br />
                                <p className="mb-0">Product & Engineering Lead, Y Combinator</p>
                            </div>
                        </div>

                        <div className="border-t border-primary pt-4 @2xl:border-none @2xl:pt-0">
                            <img
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/concept_ventures_fa46262122.svg"
                                className="h-8 my-2"
                            />
                            <div className="pt-4">
                                <p>
                                    "Our portfolio companies rely on analytics to optimize their products.{' '}
                                    <span className="text-red dark:text-yellow font-semibold">
                                        Understanding user behavior through platforms like PostHog is mission-critical.
                                    </span>{' '}
                                    The insights it provides are invaluable for founders."
                                </p>
                                - <strong>Oliver Kicks</strong>
                                <br />
                                <p className="mb-0">Partner, Concept Ventures</p>
                            </div>
                        </div>
                    </div>

                    <div className="m-4 @3xl:m-8 max-w-6xl">
                        <h2 className="mb-2">Compare startup programs</h2>
                        <p className="mb-8">tl;dr: PostHog is the only program with a free laptop sticker...</p>

                        <div className="overflow-x-auto">
                            <OSTable
                                columns={[
                                    { name: '', width: 'minmax(200px, 1fr)', align: 'left' },
                                    { name: 'Pendo', width: 'minmax(150px, 200px)', align: 'left' },
                                    { name: 'LogRocket', width: 'minmax(150px, 200px)', align: 'left' },
                                    { name: 'Amplitude', width: 'minmax(150px, 200px)', align: 'left' },
                                    { name: 'Mixpanel', width: 'minmax(150px, 200px)', align: 'left' },
                                    {
                                        name: 'PostHog',
                                        width: 'minmax(150px, 200px)',
                                        align: 'left',
                                        className: '!bg-white dark:!bg-dark',
                                    },
                                ]}
                                rows={[
                                    {
                                        cells: [
                                            { content: 'Eligibility criteria', className: 'font-semibold' },
                                            { content: 'Free plan only' },
                                            { content: 'Free plan only' },
                                            {
                                                content: (
                                                    <ul className="pl-0 list-none ml-0">
                                                        <li>&lt;$5m in funding</li>
                                                        <li>&lt;20 staff members</li>
                                                    </ul>
                                                ),
                                            },
                                            {
                                                content: (
                                                    <ul className="pl-0 list-none ml-0">
                                                        <li>&lt;$8m in funding</li>
                                                        <li>&lt;5 years old</li>
                                                    </ul>
                                                ),
                                            },
                                            {
                                                content: (
                                                    <ul className="pl-0 list-none ml-0">
                                                        <li>&lt;$5m in funding</li>
                                                        <li>&lt;2 years old</li>
                                                    </ul>
                                                ),
                                                className: 'bg-light dark:bg-dark',
                                            },
                                        ],
                                    },
                                    {
                                        cells: [
                                            { content: 'Limitations', className: 'font-semibold' },
                                            { content: '500 monthly users' },
                                            { content: '1,000 monthly sessions' },
                                            { content: 'One year duration' },
                                            { content: 'One year duration' },
                                            { content: 'One year duration', className: 'bg-light dark:bg-dark' },
                                        ],
                                    },
                                    {
                                        cells: [
                                            { content: 'Benefits', className: 'font-semibold' },
                                            { content: 'None' },
                                            { content: 'None' },
                                            { content: '200,000 MTUs' },
                                            { content: `${creditValue} credit` },
                                            { content: `${creditValue} credit`, className: 'bg-light dark:bg-dark' },
                                        ],
                                    },
                                    {
                                        cells: [
                                            { content: 'Open source product', className: 'font-semibold' },
                                            { content: <IconX className="size-5 text-red" /> },
                                            { content: <IconX className="size-5 text-red" /> },
                                            { content: <IconX className="size-5 text-red" /> },
                                            { content: <IconX className="size-5 text-red" /> },
                                            {
                                                content: <IconCheck className="size-5 text-green" />,
                                                className: 'bg-light dark:bg-dark',
                                            },
                                        ],
                                    },
                                    {
                                        cells: [
                                            { content: 'Free gifts (OMG stickers)', className: 'font-semibold' },
                                            { content: <IconX className="size-5 text-red" /> },
                                            { content: <IconX className="size-5 text-red" /> },
                                            { content: <IconX className="size-5 text-red" /> },
                                            { content: <IconX className="size-5 text-red" /> },
                                            {
                                                content: <IconCheck className="size-5 text-green" />,
                                                className: 'bg-light dark:bg-dark',
                                            },
                                        ],
                                    },
                                    {
                                        cells: [
                                            { content: 'Partnership opportunities', className: 'font-semibold' },
                                            { content: <IconX className="size-5 text-red" /> },
                                            { content: <IconX className="size-5 text-red" /> },
                                            { content: <IconX className="size-5 text-red" /> },
                                            { content: <IconX className="size-5 text-red" /> },
                                            {
                                                content: <IconCheck className="size-5 text-green" />,
                                                className: 'bg-light dark:bg-dark',
                                            },
                                        ],
                                    },
                                ]}
                                editable={false}
                                size="sm"
                            />
                        </div>
                    </div>
                    <div className="m-4 @3xl:m-8 max-w-6xl">
                        <h2 className="mb-4">FAQs</h2>
                        <Accordion
                            data-scheme="primary"
                            className=""
                            defaultValue=""
                            items={[
                                {
                                    trigger: 'How do I apply?',
                                    content: (
                                        <p>
                                            Just sign up to a paid plan in PostHog (you're only charged for usage) and
                                            then fill in this{' '}
                                            <Link
                                                to="https://app.posthog.com/startups"
                                                external
                                                className="underline font-semibold"
                                            >
                                                form
                                            </Link>
                                            . We will apply the credit automatically if you're eligible. If you're
                                            accepted into the program, we will notify you by email.
                                        </p>
                                    ),
                                },
                                {
                                    trigger: "Who's eligible?",
                                    content: (
                                        <p>
                                            Your company needs to be less than 2 years old and have raised less than $5m
                                            funding. You need to have signed up any time from Jan 1st 2023 onwards.
                                        </p>
                                    ),
                                },
                                {
                                    trigger: 'I signed up before this deal launched, can I still get it?',
                                    content: (
                                        <p>
                                            Yes, but only if you signed up after Jan 1st 2023. If your startup meets the
                                            eligibility criteria but you signed up to PostHog before Jan 1st, we won't
                                            apply the credits but are still happy to enroll you in the rest of the
                                            program.
                                        </p>
                                    ),
                                },
                                {
                                    trigger: "Can I get this deal if I'm part of YC?",
                                    content: (
                                        <p>
                                            We have a separate deal for YC folks - check out Bookface. No, they don't
                                            stack!
                                        </p>
                                    ),
                                },
                                {
                                    trigger: 'What if I go over the $50k limit?',
                                    content: (
                                        <p>
                                            At that point you can move onto{' '}
                                            <Link
                                                to="/pricing"
                                                className="underline font-semibold"
                                                state={{ newWindow: true }}
                                            >
                                                another PostHog plan
                                            </Link>
                                            .
                                        </p>
                                    ),
                                },
                                {
                                    trigger: 'What happens at the end of the 12 months?',
                                    content: (
                                        <p>
                                            At that point you can move onto{' '}
                                            <Link to="/pricing" className="underline font-semibold">
                                                another PostHog plan
                                            </Link>
                                            . You'll continue to be considered part of the program in terms of invites
                                            to office hour events, and other perks.
                                        </p>
                                    ),
                                },
                                {
                                    trigger: 'How do I get the Mintlify/Speakeasy discount?',
                                    content: (
                                        <p>
                                            Once you're accepted into the PostHog for Startups program, we'll email you
                                            with a voucher code to get you 50% off Mintlify and Speakeasy for six
                                            months.
                                        </p>
                                    ),
                                },
                                {
                                    trigger: 'What level of customer support do I get?',
                                    content: (
                                        <p>
                                            PostHog is run by a small team and, as such, we're only able to offer
                                            support to paying customers. Organizations which are part of our startup
                                            plan are therefore not eligible for high priority customer support, and only
                                            qualify for normal priority and community support. This is still the case
                                            even if you apply your credits towards a platforms add-on.
                                        </p>
                                    ),
                                },
                            ]}
                        />
                    </div>
                </div>
            </Explorer>
        </>
    )
}
