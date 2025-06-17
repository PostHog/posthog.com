import React from 'react'
import Explorer from 'components/Explorer'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import { IconDice, IconDictator } from 'components/OSIcons/Icons'
import { Accordion } from 'components/RadixUI/Accordion'
import { IconCheck } from '@posthog/icons'
import OSTable from 'components/OSTable'
import YCombinatorLight from '../../images/customers/ycombinator-light.svg'
import YCombinatorDark from '../../images/customers/ycombinator-dark.svg'

export default function Startups(): JSX.Element {
    return (
        <>
            <SEO
                title="Startups - PostHog"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/product-analytics.jpg`}
            />
            <Explorer
                template="generic"
                slug="startups"
                title="PostHog for startups"
                // options below only needed to override matching the slug
                // teamName="product-analytics"
                // roadmapCategory="product-analytics"
                // changelogCategory="product-analytics"
                sidebarContent={
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
                                            <ol className="mb-0">
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
                                            <ul className="mb-0">
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
                                            <ul className="mb-0">
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
                <div className="@container h-full bg-[#EFF0EA]">
                    <div className="bg-[#122030] bg-[url(https://res.cloudinary.com/dmukukwp6/image/upload/startups_rocket_f750a70d99.png)] bg-cover bg-top-left aspect-[1549/638] text-white p-8 relative min-h-96 flex flex-col justify-center">
                        <div className="absolute inset-0 bg-[url(https://res.cloudinary.com/dmukukwp6/image/upload/stars_24a6a0b509.png)] bg-cover" />

                        <div className="relative pb-32">
                            <h1>PostHog for startups</h1>
                            <ul className="pl-4 mb-4">
                                <li>$50,000 in PostHog credits</li>
                                <li>Exclusive founder merch</li>
                                <li>Partner benefits</li>
                            </ul>

                            <CallToAction href="https://app.posthog.com/startups" type="primary" size="md">
                                Apply now
                            </CallToAction>

                            <p className="text-sm mt-2 italic">You'll need a PostHog account first</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 @2xl:grid-cols-4 gap-8 @2xl:gap-4 @3xl:gap-6 px-4 @3xl:px-8 relative -mt-12 max-w-6xl mb-8 @3xl:mb-12">
                        <div className="bg-[#FFD254] p-4 @2xl:p-2 @3xl:p-4 -rotate-1">
                            <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/perk_credits_a8487ef646.png" />
                            <h3 className="text-base my-1 leading-tight">$50,000 in PostHog credits</h3>
                            <p className="text-sm mb-0">
                                That's a lot of events, replays, API calls, and survey responses.
                            </p>
                        </div>
                        <div className="bg-[#9BBEC2] p-4 @2xl:p-2 @3xl:p-4">
                            <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/perk_merch_b2106b276a.png" />
                            <h3 className="text-base my-1 leading-tight">Founder swag</h3>
                            <p className="text-sm mb-0">
                                You can never have too many laptop stickers, hats, or free t-shirts, right?
                            </p>
                        </div>
                        <div className="bg-[#E6B2F8] p-4 @2xl:p-2 @3xl:p-4 rotate-1">
                            <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/perk_partners_5c43154c33.png" />
                            <h3 className="text-base my-1 leading-tight">But wait, there's more...</h3>
                            <p className="text-sm mb-0">Mintlify and Speakeasy have entered the chat</p>
                        </div>
                        <div className="bg-[#C4D9FF] p-4 @2xl:p-2 @3xl:p-4 -rotate-2">
                            <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/perk_referral_89e28aa960.png" />
                            <h3 className="text-base my-1 leading-tight">Refer &amp; get more</h3>
                            <p className="text-sm mb-0">
                                Refer your accelerator to 2x your credits, or split $10,000 in credits when you refer a
                                friend.
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
                                    { name: 'Pendo', width: 'minmax(150px, 200px)', align: 'center' },
                                    { name: 'LogRocket', width: 'minmax(150px, 200px)', align: 'center' },
                                    { name: 'Amplitude', width: 'minmax(150px, 200px)', align: 'center' },
                                    { name: 'Mixpanel', width: 'minmax(150px, 200px)', align: 'center' },
                                    { name: 'PostHog', width: 'minmax(150px, 200px)', align: 'center' },
                                ]}
                                rows={[
                                    {
                                        cells: [
                                            { content: 'Eligibility criteria', className: 'font-semibold' },
                                            { content: 'Free plan only' },
                                            { content: 'Free plan only' },
                                            { content: '<$5m in funding and <20 staff members' },
                                            { content: '<$8m in funding and less than 5 years old' },
                                            { content: '<$5m in funding and less than 2 years old' },
                                        ],
                                    },
                                    {
                                        cells: [
                                            { content: 'Limitations', className: 'font-semibold' },
                                            { content: '500 monthly users' },
                                            { content: '1,000 monthly sessions' },
                                            { content: 'One year duration' },
                                            { content: 'One year duration' },
                                            { content: 'One year duration' },
                                        ],
                                    },
                                    {
                                        cells: [
                                            { content: 'Benefits', className: 'font-semibold' },
                                            { content: 'None' },
                                            { content: 'None' },
                                            { content: '200,000 MTUs' },
                                            { content: '$50,000 credit' },
                                            { content: '$50,000 credit' },
                                        ],
                                    },
                                    {
                                        cells: [
                                            { content: 'Open source product', className: 'font-semibold' },
                                            { content: '❌' },
                                            { content: '❌' },
                                            { content: '❌' },
                                            { content: '❌' },
                                            { content: '✅' },
                                        ],
                                    },
                                    {
                                        cells: [
                                            { content: 'Free gifts (omg, stickers)', className: 'font-semibold' },
                                            { content: '❌' },
                                            { content: '❌' },
                                            { content: '❌' },
                                            { content: '❌' },
                                            { content: '✅' },
                                        ],
                                    },
                                    {
                                        cells: [
                                            { content: 'Partnership opportunities', className: 'font-semibold' },
                                            { content: '❌' },
                                            { content: '❌' },
                                            { content: '❌' },
                                            { content: '❌' },
                                            { content: '✅' },
                                        ],
                                    },
                                ]}
                                editable={false}
                                size="sm"
                            />
                        </div>
                    </div>
                </div>
            </Explorer>
        </>
    )
}
