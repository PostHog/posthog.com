import React, { useState, useEffect } from 'react'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import OSButton from 'components/OSButton'
import OSTable from 'components/OSTable'
import { IconRefresh } from '@posthog/icons'
import Link from 'components/Link'

const discountsData = {
    actualPricing: {
        title: "PostHog's REAL annual pricing",
        rows: [
            { item: '20M events w/ profiles', price: '$23,130' },
            { item: '100,000 session recordings', price: '$3,270' },
            { item: '30M data warehouse rows', price: '$4,020' },
            { item: '20% discount', price: '-$6,084' },
            { item: 'Total', price: '$24,336', bold: true },
        ],
    },
    extremeDiscounts: {
        title: 'PostHog, but with EXTREME DISCOUNTS',
        baseRows: [
            { item: '20M events w/ profiles', price: '$36,260' },
            { item: '100,000 session recordings', price: '$4,905' },
            { item: '30M data warehouse rows', price: '$10,050' },
            { item: 'Premium support', price: '$10,000' },
        ],
        total: { item: 'Total (after EXTREME discounts)', price: '$24,336', bold: true },
    },
    discountNames: [
        'I just talked to my manager and... discount',
        'End of quarter desperation discount',
        'Exclusive HOGS discount',
        'Paperless billing discount',
        'Quick call discount',
        'You know the founders discount',
        'Promise to pay on time discount',
        'Comped training',
        'One time setup fees waived this month only',
        'Twitter follower count discount',
        'What your last vendor will pay us to take you off their hands discount',
        'Your competitor just signed up discount',
        'Synergy optimization discount',
        'Preempting your RFP discount',
        'Thought leader discount',
        'We forgot we had this one',
        'Not having to call you five times this week',
        'Traitor discount',
        'AI-powered savings',
        'Sign up 5 friends discount',
        'Hedgehog hug discount',
        'Sign up for 18 enterprise plans and get the 19th for free',
    ],
    discountValues: [6084, 12243, 3060, 9182, 6121, 5000, 1274],
}

const PlaceholderComparisonTable = () => {
    // Get current day of the week as a string, e.g. 'Monday'
    const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' })

    // Add day-specific discount to the list
    const extremeDiscountNames = [...discountsData.discountNames, `${dayOfWeek} discount`]
    const discountValues = discountsData.discountValues

    // Shuffle and pick a random set of discount names for each render
    const getRandomDiscounts = () => {
        const shuffled = [...extremeDiscountNames].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, discountValues.length)
    }
    // Use state to allow re-randomizing on button click
    const [randomDiscounts, setRandomDiscounts] = useState(getRandomDiscounts())
    const handleGenerateDiscounts = () => setRandomDiscounts(getRandomDiscounts())

    return (
        <div className="mt-4">
            <div className="hidden @2xl:flex justify-end">
                <OSButton onClick={handleGenerateDiscounts} variant="secondary" size="md">
                    <IconRefresh className="size-4 inline-block relative -top-px" />
                    Generate discounts
                </OSButton>
            </div>
            <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-8">
                <div className="">
                    <h4 className="text-xl font-bold mb-0">{discountsData.actualPricing.title}</h4>
                    <p>This is our honest pricing.</p>
                    <OSTable
                        columns={[
                            { name: 'Item', align: 'left', width: 'auto' },
                            { name: 'Price', align: 'right', width: 'auto' },
                        ]}
                        rows={discountsData.actualPricing.rows.map((row, i) => ({
                            cells: [
                                { content: row.bold ? <span className="font-bold">{row.item}</span> : row.item },
                                {
                                    content: row.bold ? <span className="font-bold">{row.price}</span> : row.price,
                                    className: row.bold ? 'border-t border-primary' : undefined,
                                },
                            ],
                        }))}
                        className="!min-w-0 !w-full"
                    />
                </div>
                <div className="">
                    <h4 className="text-xl font-bold mb-0">{discountsData.extremeDiscounts.title}</h4>
                    <p>It comes out to the same price – but the discounts just make you feel better.</p>
                    <div className="mb-4 @2xl:hidden">
                        <OSButton onClick={handleGenerateDiscounts} variant="secondary" size="md">
                            <IconRefresh className="size-4 inline-block relative -top-px" />
                            Generate discounts
                        </OSButton>
                    </div>
                    <OSTable
                        columns={[
                            { name: 'Item', align: 'left', width: 'auto' },
                            { name: 'Price', align: 'right', width: 'auto' },
                        ]}
                        rows={[
                            ...discountsData.extremeDiscounts.baseRows.map((row) => ({
                                cells: [{ content: row.item }, { content: row.price }],
                            })),
                            {
                                cells: [
                                    {
                                        content: <span className="font-bold">EXTREME DISCOUNTS</span>,
                                        className: 'col-span-2',
                                    },
                                ],
                            },
                            ...(randomDiscounts
                                .map((name, i) =>
                                    discountValues[i + 1] !== undefined
                                        ? {
                                              cells: [
                                                  { content: name },
                                                  { content: `-$${discountValues[i + 1].toLocaleString()}` },
                                              ],
                                          }
                                        : null
                                )
                                .filter(Boolean) as any[]),
                            {
                                cells: [
                                    {
                                        content: (
                                            <span className="font-bold">
                                                {discountsData.extremeDiscounts.total.item}
                                            </span>
                                        ),
                                        className: 'border-t border-primary',
                                    },
                                    {
                                        content: (
                                            <span className="font-bold">
                                                {discountsData.extremeDiscounts.total.price}
                                            </span>
                                        ),
                                        className: 'border-t border-primary',
                                    },
                                ],
                            },
                        ]}
                        className="!min-w-0 !w-full"
                    />
                </div>
            </div>
            <p className="mt-8">
                If you prefer artificially inflated prices, you might actually enjoy our{' '}
                <Link to="/enterprise" state={{ newWindow: true }}>
                    enterprise
                </Link>{' '}
                page.
            </p>
            <p>
                Still not sure if PostHog is right for you?{' '}
                <Link to="/vibe-check" state={{ newWindow: true }}>
                    Find out if you'll hate PostHog.
                </Link>
            </p>
        </div>
    )
}

export default function Discounts(): JSX.Element {
    return (
        <>
            <SEO
                title="Discounts - PostHog"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Editor title="Don't get discount bamboozled.">
                <p>Some of our competitors use steep discounting to win deals.</p>
                <p>
                    We price our products fairly and offer discounts based on usage and deal terms – you can read all
                    about them{' '}
                    <Link to="/handbook/growth/sales/contract-rules#discounts" state={{ newWindow: true }}>
                        in our handbook.
                    </Link>
                </p>
                <p>But sometimes this leaves our customers feeling left out. They want huge discounts too!</p>
                <p>
                    So we decided to offer an EXTREME discount comparison page so you can get all the joy of heavy
                    discounting without any of the sleazy second-year price increases and vendor lock-in.
                </p>
                <PlaceholderComparisonTable />
            </Editor>
        </>
    )
}
