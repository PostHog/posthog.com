import React, { useEffect, useState } from 'react'
import { pricingMenu } from '../navs'
import Layout from 'components/Layout'
import { SectionHeader } from 'components/Pricing/Test/Sections'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import { IconAdvanced, IconInfo } from '@posthog/icons'
import { CTA as PlanCTA } from 'components/Pricing/Plans'
import { StaticImage } from 'gatsby-plugin-image'

const FeatureItem = ({ icon: Icon, title, description }) => (
    <div className="flex gap-2">
        <div className="shrink-0">
            <Icon className="size-8" />
        </div>
        <div className="flex-1">
            <h4 className="text-base my-1">{title}</h4>
            <p className="text-sm text-primary/75 dark:text-primary-dark/75">{description}</p>
        </div>
    </div>
)

const features = [
    {
        icon: IconAdvanced,
        title: 'Unlimited projects',
        description: 'Create silos of data within PostHog. All data belongs to a single project and all queries are project-specific.',
    },
    {
        icon: IconAdvanced,
        title: 'Unlimited projects',
        description: 'Create silos of data within PostHog. All data belongs to a single project and all queries are project-specific.',
    },
    {
        icon: IconAdvanced,
        title: 'Unlimited projects',
        description: 'Create silos of data within PostHog. All data belongs to a single project and all queries are project-specific.',
    },
]

const Addons = (): JSX.Element => {
    return <Layout parent={pricingMenu}>
        <section className="w-11/12 mx-auto px-4 2xl:px-12 py-8">
            <h1 className="text-4xl 2xl:text-5xl mb-1">Addons</h1>
            <p className="text-lg font-semibold opacity-75">We've moved specialized functionality into add-ons so you never pay for things you don't need.</p>
            <div className="grid grid-cols-12 gap-12 pt-8">
                <div className="col-span-12 md:col-span-4">
                    <h2>Teams</h2>
                    <p className="text-[15px]">A smorgasbord of features for teams, plus security and compliance tools to keep large teams happy.</p>
                    <div className="flex items-baseline">
                        <strong className="text-xl">$450</strong>
                        <span className="text-[15px] opacity-60">/mo</span>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-8">
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                        <div className="col-span-2">
                            <h3 className="text-lg pt-1 mb-0">Features</h3>
                        </div>
                        {features.map((feature, index) => (
                            <FeatureItem key={index} {...feature} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}

export default Addons
