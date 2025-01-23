import React, { useState } from 'react'
import Layout from '../components/Layout'
import Link from 'components/Link'
import HubSpotForm from 'components/HubSpotForm'
import YCsign from '../images/max-yc.png'
import { StaticImage } from 'gatsby-plugin-image'
import { Check2 } from 'components/Icons'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import SalesforceForm from 'components/SalesforceForm'

enum YCBatch {
    S25 = 'S25',
    X25 = 'X25',
    W25 = 'W25',
    F24 = 'F24',
    S24 = 'S24',
    W24 = 'W24',
    S23 = 'S23',
    W23 = 'W23',
    S22 = 'S22',
    W22 = 'W22',
    S21 = 'S21',
    W21 = 'W21',
    Earlier = 'Earlier'
}

const features = [
    '$50,000 in PostHog credit for 12 months<sup>1</sup>',
    'Exclusive PostHog merch for founders<sup>2</sup>',
    'Access to our YC founder Slack community',
    'Monthly newsletter of advice for founders',
    'Priority support (if needed)',
]

export const YCOnboarding = () => {
    const { websiteTheme } = useValues(layoutLogic)
    const darkMode = websiteTheme === 'dark'
    return (
        <Layout>
            <div className="lg:py-12 py-4 px-5">
                <section className="mb-12">
                    <div className="text-center">
                        <img
                            src={YCsign}
                            alt="A hedgehog by the YC sign"
                            className="max-w-full max-h-72 mx-auto mb-8"
                        />

                        <h1 className="text-3xl md:text-5xl mt-4 mb-2">You've found our secret Y Combinator offer!</h1>
                        <p className="m-0 text-lg">
                            We offer special benefits for teams in the current batch - things we'd have found useful
                            during <Link to="/blog/yc-2-years-on" external>our W20 batch</Link>.{' '}
                        </p>
                    </div>
                </section>
                <section className="grid md:grid-cols-2 max-w-5xl mx-auto md:gap-x-16 gap-y-12">
                    <div className="order-1 md:order-2">
                        <h3 className="mt-1 mb-4">Benefits</h3>
                        <ul className="list-none m-0 mb-8 p-0 mt-2 flex flex-col space-y-1">
                            {features.map((feature) => {
                                return (
                                    <li key={feature} className="flex space-x-2">
                                        <Check2 className="w-5 text-seagreen dark:text-white/40" />
                                        <span dangerouslySetInnerHTML={{ __html: feature }} />
                                    </li>
                                )
                            })}
                        </ul>
                        <p className="text-sm">
                            <sup>1</sup> Applicants from previous batches receive $25,000 for 6 months instead.
                            <br />
                            <sup>2</sup> Boring international customs reasons mean users outside US/Canada get a $150
                            PostHog merch voucher instead.
                        </p>
                        <div>
                            <h3>See if PostHog is right for you</h3>
                            <div className="video-container">
                                <iframe
                                    width="560"
                                    height="315"
                                    src="https://www.youtube-nocookie.com/embed/2jQco8hEvTI"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="order-2 md:order-2 mb-12">
                        <h3 className="mb-1">How to apply</h3>
                        <ol className="mb-4">
                            <li>Complete the form below</li>
                            <li>
                                <Link to="https://app.posthog.com/signup" external>
                                    Sign up for PostHog Cloud
                                </Link>
                            </li>
                            <li>
                                <Link to="/docs/getting-started/install" external>
                                    Install the snippet
                                </Link>{' '}
                                in your product
                            </li>
                        </ol>
                        <SalesforceForm
                            type="contact"
                            source="YC"
                            form={{
                                fields: [
                                    {
                                        label: 'Email',
                                        name: 'email',
                                        type: 'string',
                                        fieldType: 'email',
                                        required: true,
                                    },
                                    {
                                        label: 'First name',
                                        name: 'first_name',
                                        type: 'string',
                                        required: true,
                                    },
                                    {
                                        label: 'Last name',
                                        name: 'last_name',
                                        type: 'string',
                                        required: true,
                                    },
                                    {
                                        label: 'Company name',
                                        type: 'string',
                                        name: 'company',
                                        required: true,
                                    },
                                    {
                                        label: 'Company domain name',
                                        type: 'string',
                                        name: 'startup_domain',
                                        required: true,
                                    },
                                    {
                                        label: 'Which YC batch are you?',
                                        type: 'enumeration',
                                        name: 'yc_batch',
                                        required: true,
                                        options: [
                                            { label: 'Select your batch', value: '' },
                                            { label: 'Summer 2025 (S25)', value: YCBatch.S25 },
                                            { label: 'Spring 2025 (X25)', value: YCBatch.X25 },
                                            { label: 'Winter 2025 (W25)', value: YCBatch.W25 },
         			                        { label: 'Fall 2024 (F24)', value: YCBatch.F24 },
                                            { label: 'Summer 2024 (S24)', value: YCBatch.S24 },
                                            { label: 'Winter 2024 (W24)', value: YCBatch.W24 },
                                            { label: 'Summer 2023 (S23)', value: YCBatch.S23 },
                                            { label: 'Winter 2023 (W23)', value: YCBatch.W23 },
                                            { label: 'Summer 2022 (S22)', value: YCBatch.S22 },
                                            { label: 'Winter 2022 (W22)', value: YCBatch.W22 },
                                            { label: 'Summer 2021 (S21)', value: YCBatch.S21 },
                                            { label: 'Winter 2021 (W21)', value: YCBatch.W21 },
                                            { label: 'Earlier batches', value: YCBatch.Earlier },
                                        ]
                                    },
                                    {
                                        label: 'Are you building LLM-powered features?',
                                        name: 'is_building_with_llms',
                                        type: 'enumeration',
                                        required: true,
                                        options: [
                                            { label: 'Yes', value: 'true' },
                                            { label: 'No', value: 'false' },
                                        ],
                                    },
                                    {
                                        label: 'Anything to add?',
                                        type: 'string',
                                        name: 'yc_notes',
                                        required: true,
                                    },
                                ],
                                name: 'YC onboarding',
                                message: 'Thanks for applying! We will get back to you shortly.',
                            }}
                        />
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default YCOnboarding
