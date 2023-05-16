import React from 'react'
import GithubSlugger from 'github-slugger'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import { IDocumentation } from './types'
import { StaticImage } from 'gatsby-plugin-image'
import { LinkGrid } from 'components/Docs/LinkGrid'

export const quickLinks = [
    {
        icon: 'Trends',
        name: 'Graphs & trends',
        to: '/docs/product-analytics/trends',
    },
    {
        icon: 'Funnels',
        name: 'Funnels',
        to: '/docs/product-analytics/funnels',
    },
    {
        icon: 'PathAnalysis',
        name: 'User paths',
        to: '/docs/product-analytics/paths',
    },
    {
        icon: 'Dashboards',
        name: 'Dashboards',
        to: '/docs/product-analytics/dashboards',
    },
    {
        icon: 'Retention',
        name: 'Retention',
        to: '/docs/product-analytics/retention',
    },
    {
        icon: 'Stickiness',
        name: 'Stickiness',
        to: '/docs/product-analytics/stickiness',
    },
    {
        icon: 'Lifecycle',
        name: 'Lifecycle',
        to: '/docs/product-analytics/lifecycle',
    },
    {
        icon: 'CorrelationAnalysis',
        name: 'Correlation analysis',
        to: '/docs/product-analytics/correlation',
    },
    {
        icon: 'GroupAnalytics',
        name: 'Groups',
        to: '/docs/product-analytics/group-analytics',
    },
    {
        icon: 'Toolbar',
        name: 'Toolbar',
        to: '/docs/product-analytics/toolbar',
    },
    {
        icon: 'Sampling',
        name: 'Sampling',
        to: '/docs/product-analytics/sampling',
    },
]
export default function Documentation({ documentation, title }: IDocumentation) {
    const slugger = new GithubSlugger()
    return (
        <div id="documentation" className="max-w-screen-2xl mx-auto">
            <div>
                <StaticImage
                    alt=""
                    placeholder="none"
                    quality={100}
                    className="w-full sm:w-[400px] sm:float-right sm:ml-8 sm:-mt-8 sm:mb-8"
                    src="../../components/Home/Slider/images/product-analytics-hog.png"
                />
                <h1 className="text-4xl mb-2 mt-6">{title}</h1>
                <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
                    Learn how to use product analytics to understand your users.
                </h3>

                <CallToAction size="sm" type="secondary" to={documentation?.indexURL}>
                    Visit docs
                </CallToAction>

                {/* Quick links */}
                <section className="my-12">
                    <h3 className="mb-3 mt-0">Chapters</h3>
                    <LinkGrid links={quickLinks} />
                </section>
            </div>
        </div>
    )
}
