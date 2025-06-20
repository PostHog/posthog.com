import React, { Fragment, useRef, useState } from 'react'
import SEO from 'components/seo'
import Wizard from 'components/Wizard'
import { CallToAction } from 'components/CallToAction'
import { productMenu } from '../../navs'
import * as Icons from '@posthog/icons'
import Link from 'components/Link'
import { IconBold, IconLink } from 'components/OSIcons'
import TeamMember from 'components/TeamMember'
import { useApp } from '../../context/App'
import ScrollArea from 'components/RadixUI/ScrollArea'

export default function Credits(): JSX.Element {
    const { focusedWindow, updateWindow } = useApp()

    const handleMoreInfo = () => {
        if (focusedWindow) {
            const currentWidth = focusedWindow.size.width
            const currentHeight = focusedWindow.size.height

            // Calculate new dimensions
            const newWidth = currentWidth * 2
            const newHeight = currentHeight + 200

            // Check bounds - ensure window doesn't exceed screen limits
            const maxWidth = Math.min(newWidth, window.innerWidth * 0.9)
            const maxHeight = Math.min(newHeight, window.innerHeight * 0.9)

            // Update the window size
            updateWindow(focusedWindow, {
                size: {
                    width: maxWidth,
                    height: maxHeight,
                },
            })
        }
    }

    const infoCondensed = [
        {
            legend: 'Credits',
            items: [
                {
                    label: 'Design',
                    value: <TeamMember name="Cory Watilo" />,
                },
                {
                    label: 'Graphics',
                    value: <TeamMember name="Lottie Coxon" />,
                },
                {
                    label: 'Development',
                    value: (
                        <>
                            <TeamMember name="Eli Kinsey" />
                            <TeamMember name="Cory Watilo" />
                        </>
                    ),
                },
                {
                    label: 'Inspiration',
                    value: (
                        <>
                            Apple, Inc.
                            <br /> Microsoft, Inc.
                        </>
                    ),
                },
            ],
        },
    ]

    const infoExpanded = [
        {
            legend: 'Company',
            items: [
                { label: 'Employees', value: '###' },
                { label: 'Customers', value: '150,000' },
            ],
        },

        {
            legend: 'Website',
            items: [
                { label: 'Framework', value: 'Gatsby', url: 'https://gatsbyjs.com' },
                { label: 'Hosting', value: 'Vercel', url: 'https://vercel.com' },
                { label: 'Assets', value: 'Cloudinary', url: 'https://cloudinary.com' },
                { label: 'Search', value: 'Algolia', url: 'https://algolia.com' },
                { label: 'AI', value: 'Inkeep', url: 'https://inkeep.com' },
                { label: 'CMS', value: 'Strapi', url: 'https://strapi.io' },
                { label: 'Web analytics', value: 'PostHog', url: '/web-analytics' },
                { label: 'Product analytics', value: 'PostHog', url: '/product-analytics' },
                { label: 'Feature flags', value: 'PostHog', url: '/feature-flags' },
                { label: 'Surveys', value: 'PostHog', url: '/surveys' },
            ],
        },

        {
            legend: 'Credits',
            items: [
                {
                    label: 'Design',
                    value: <TeamMember name="Cory Watilo" />,
                },
                {
                    label: 'Graphics',
                    value: <TeamMember name="Lottie Coxon" />,
                },
                {
                    label: 'Development',
                    value: (
                        <>
                            <TeamMember name="Eli Kinsey" />
                            <TeamMember name="Cory Watilo" />
                        </>
                    ),
                },
                {
                    label: 'Inspiration',
                    value: (
                        <>
                            Apple, Inc.
                            <br /> Microsoft, Inc.
                        </>
                    ),
                },
            ],
        },
    ]

    return (
        <>
            <SEO
                title="Credits"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/product-analytics.jpg`}
            />
            <Wizard>
                <ScrollArea>
                    <div className="bg-accent flex flex-col items-center p-6">
                        <div className="flex flex-col items-center w-full mb-4">
                            <figure
                                data-skin="secondary"
                                className="aspect-video bg-primary w-full border border-primary flex justify-center items-center mb-4 rounded"
                            >
                                screenshot
                            </figure>
                            <h1 className="text-lg mb-1">PostHog.com</h1>
                            <p className="text-sm text-secondary">Updated today at 3:23 PM</p>
                        </div>

                        {infoCondensed.map((fieldset, index) => (
                            <fieldset className="border-none mb-2 w-full max-w-sm" key={index}>
                                <legend className="text-center bg-transparent font-medium text-secondary">
                                    {fieldset.legend}
                                </legend>
                                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm pt-2">
                                    {fieldset.items.map((item, itemIndex) => (
                                        <Fragment key={itemIndex}>
                                            <dt>{item.label}</dt>
                                            <dd className="font-medium">{item.value}</dd>
                                        </Fragment>
                                    ))}
                                </dl>
                            </fieldset>
                        ))}

                        {infoExpanded.map((fieldset, index) => (
                            <fieldset className="border-none mb-2 w-full max-w-lg" key={index}>
                                <legend className="bg-transparent font-bold text-secondary">{fieldset.legend}</legend>
                                <dl className="grid grid-cols-2 text-sm border border-primary bg-primary rounded">
                                    {fieldset.items.map((item, itemIndex) => (
                                        <Fragment key={itemIndex}>
                                            <dt className="p-2 border-t border-primary first:border-t-0">
                                                {item.label}
                                            </dt>
                                            <dd className="p-2 border-t border-primary text-right [&:nth-child(2)]:border-t-0 font-medium">
                                                {item.url ? <Link to={item.url}>{item.value}</Link> : item.value}
                                            </dd>
                                        </Fragment>
                                    ))}
                                </dl>
                            </fieldset>
                        ))}

                        <div className="mb-4">
                            <CallToAction type="secondary" size="xs" onClick={handleMoreInfo}>
                                More info
                            </CallToAction>
                        </div>

                        <p className="text-sm text-secondary">
                            <Link
                                to="https://github.com/posthog/posthog.com"
                                state={{ newWindow: true }}
                                className="underline"
                            >
                                Source code
                            </Link>
                        </p>

                        <p className="text-xs text-secondary">&copy;2025 PostHog Incorporated</p>
                    </div>
                </ScrollArea>
            </Wizard>
        </>
    )
}
