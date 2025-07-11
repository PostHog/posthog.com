import React, { useState } from 'react'
import Layout from 'components/Layout'
import { pricingMenu } from '../../navs'

const PlaceholderComparisonTable = () => {
    // Get current day of the week as a string, e.g. 'Monday'
    const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' })

    // Array of fun/random discount names
    const extremeDiscountNames = [
        'I just talked to my manager and... discount',
        'End of quarter desperation discount',
        'Exclusive HOGS discount',
        'Paperless billing discount',
        `${dayOfWeek} discount`,
        'Quick call discount',
        'You know the founders discount',
        'Promise to pay on time discount',
        'Comped training',
        'One time setup fees waived this month only',
        'Twitter follower count discount',
        'What your last vendor will pay us to take you off their hands discount',
        'Your competitor just signed up discount',
        'Synergy optimization discount',
        'Pre-empting your rfp discount',
        'Thought leader discount',
        'We forgot we had this one',
        'Not having to call you five times this week',
        'Traitor discount',
        'AI-powered savings',
        'Sign up 5 friends discount',
        'Hedgehog hug discount',
    ]
    // The fixed discount values to use
    const discountValues = [6084, 12243, 3060, 9182, 6121, 5000, 1274]
    // Shuffle and pick a random set of discount names for each render
    const getRandomDiscounts = () => {
        const shuffled = [...extremeDiscountNames].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, discountValues.length) // Pick as many as discount values
    }
    // Use state to allow re-randomizing on button click
    const [randomDiscounts, setRandomDiscounts] = useState(getRandomDiscounts())
    const handleGenerateDiscounts = () => setRandomDiscounts(getRandomDiscounts())

    return (
        <div className="my-12 w-full max-w-7xl mx-auto">
            <div className="flex justify-end mb-2">
                <button
                    onClick={handleGenerateDiscounts}
                    className="px-4 py-2 bg-accent dark:bg-accent-dark text-primary dark:text-primary-dark rounded shadow border border-gray-200 dark:border-dark hover:bg-accent/80 dark:hover:bg-accent-dark/80 transition-colors"
                >
                    Generate Discounts
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-accent-dark rounded shadow p-6 border border-gray-200 dark:border-dark">
                    <h4 className="text-xl font-bold mb-4">PostHog Actual Annual Pricing</h4>
                    <ul className="space-y-2">
                        <li className="flex justify-between">
                            <span>20M Events w/ profiles</span>
                            <span>$23,130</span>
                        </li>
                        <li className="flex justify-between">
                            <span>100,000 Session Replays</span>
                            <span>$3,270</span>
                        </li>
                        <li className="flex justify-between">
                            <span>30M Data Warehouse rows</span>
                            <span>$4,020</span>
                        </li>
                        <li className="flex justify-between">
                            <span>20% discount</span>
                            <span>-$6,084</span>
                        </li>
                        <li className="flex justify-between font-bold border-t pt-2">
                            <span>Total</span>
                            <span>$24,336</span>
                        </li>
                    </ul>
                </div>
                <div className="bg-white dark:bg-accent-dark rounded shadow p-6 border border-gray-200 dark:border-dark">
                    <h4 className="text-xl font-bold mb-4">PostHog EXTREME DISCOUNTS</h4>
                    <ul className="space-y-2 list-none p-0">
                        <li className="flex justify-between">
                            <span>20M Events w/ profiles</span>
                            <span>$36,260</span>
                        </li>
                        <li className="flex justify-between">
                            <span>100,000 Session Replays</span>
                            <span>$4,905</span>
                        </li>
                        <li className="flex justify-between">
                            <span>30M Data Warehouse rows</span>
                            <span>$10,050</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Premium Support</span>
                            <span>$10,000</span>
                        </li>
                        <li className="font-bold pt-4">EXTREME DISCOUNTS</li>
                        {randomDiscounts.map((name, i) =>
                            discountValues[i + 1] !== undefined ? (
                                <li key={name} className="flex justify-between">
                                    <span>{name}</span>
                                    <span>-${discountValues[i + 1].toLocaleString()}</span>
                                </li>
                            ) : null
                        )}
                        <li className="border-t border-gray-300 dark:border-gray-600 my-2"></li>
                        <li className="flex justify-between font-bold pt-6">
                            <span>Total (after EXTREME discounts)</span>
                            <span>$24,336</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

const ComparisonPricingPage = () => {
    return (
        <Layout parent={pricingMenu}>
            <section className="bg-white dark:bg-accent-dark text-primary dark:text-primary-dark shadow-xl rounded pt-6 pb-2 md:py-8 px-8 md:px-12 mx-6 md:mx-auto my-12 w-[calc(100%_-_3rem)] md:w-full max-w-5xl border border-transparent dark:border-dark">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Don't Get Discount Bamboozled</h1>
                <p className="mb-8 text-lg">
                    Some of our competitors use steep discounting to win deals. At PostHog, we price our products
                    fairly, and offer discounts based on usage and deal terms, but sometimes this leaves our customers
                    feeling left out. They want huge discounts too! So, we decided to offer a little EXTREME discount
                    comparison so you can get all the joy of heavy discounting without any of the sleezy 2nd year price
                    increases and vendor lock in.
                </p>
                <PlaceholderComparisonTable />
            </section>
        </Layout>
    )
}

export default ComparisonPricingPage
