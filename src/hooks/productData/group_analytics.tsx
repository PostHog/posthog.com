import React from 'react'
import {
    IconCode,
    IconCursorClick,
    IconEye,
    IconInfo,
    IconList,
    IconMagic,
    IconPeople,
    IconPiggyBank,
    IconRocket,
} from '@posthog/icons'
import {
    GroupAnalyticsHowToUse,
    GroupAnalyticsInstallation,
    GroupAnalyticsPricing,
    GroupAnalyticsPricingCTA,
    GroupAnalyticsTopFeatures,
} from 'components/GroupAnalytics/Sections'
import { getTool } from '../../data/tools'

export const groupAnalytics = {
    ...getTool('group_analytics'),
    Icon: IconPeople,
    color: 'teal',
    colorSecondary: 'purple',
    seo: {
        title: 'Group Analytics – Analyze companies, teams, and projects in PostHog',
        description:
            'Analyze product behavior by company, team, project, or another group instead of individual users.',
    },
    productMenu: [
        {
            slug: 'overview',
            name: 'Overview',
            icon: <IconEye className="size-4" />,
            props: { hideProductLabel: true },
        },
        {
            slug: 'eli5',
            name: 'What does it do?',
            hideFromNav: true,
            group: 'divided',
            icon: <IconInfo className="size-4" />,
        },
        {
            slug: 'use-cases',
            name: 'Who is it for?',
            hideFromNav: true,
            group: 'divided',
            icon: <IconMagic className="size-4" />,
        },
        {
            slug: 'how-to-use',
            name: 'How do I use it?',
            group: 'divided',
            component: GroupAnalyticsHowToUse,
            icon: <IconCursorClick className="size-4" />,
        },
        {
            slug: 'top-features',
            name: 'Top features',
            group: 'divided',
            component: GroupAnalyticsTopFeatures,
            icon: <IconList className="size-4" />,
        },
        {
            slug: 'installation',
            name: 'Install',
            group: 'divided',
            component: GroupAnalyticsInstallation,
            icon: <IconCode className="size-4" />,
        },
    ],
    pricingMenu: [
        {
            slug: 'pricing',
            name: 'Pricing',
            component: GroupAnalyticsPricing,
            icon: <IconPiggyBank className="size-4" />,
        },
        {
            slug: 'getting-started',
            name: 'Get started',
            component: GroupAnalyticsPricingCTA,
            icon: <IconRocket className="size-4" />,
        },
    ],
    overview: {
        title: 'Understand users as companies, teams, and projects',
        eli5: 'Group Analytics aggregates events by entities like organizations or companies instead of individual users. This is useful when you need to track behavior at the company, team, or project level.',
        textColor: 'text-black',
    },
    useCases: {
        rows: [
            ['B2B SaaS teams', 'Measure daily active companies, company churn, onboarding, and feature adoption'],
            ['Collaborative products', 'Analyze engagement and active users at the project level'],
            ['Communication apps', 'Track activity, retention, and participation for channels or communities'],
            ['Marketplaces & social apps', 'Understand behavior around listings, posts, sellers, or other entities'],
        ],
    },
    features: [
        {
            title: 'B2B SaaS app',
            headline: 'B2B SaaS app',
            description:
                '<p>Aggregate events at an account-level. Calculate metrics like:</p><ul><li>number of daily active companies</li><li>company churn rate</li><li>how many companies have adopted a new feature</li></ul>',
        },
        {
            title: 'Collaborative, project-based services',
            headline: 'Collaborative, project-based services',
            description:
                '<p>For project-based products like Notion, Jira, or Figma, create a project group type to calculate:</p><ul><li>metrics at a project level</li><li>users per project</li><li>project engagement</li></ul>',
        },
        {
            title: 'Communication-based apps',
            headline: 'Communication-based apps',
            description:
                '<p>For a product like Slack, create a channel group type to measure:</p><ul><li>the average number of messages per channel</li><li>the number of monthly active channels</li><li>total number of channel participants</li></ul>',
        },
        {
            title: 'Social media apps',
            headline: 'Social media apps',
            description:
                '<p>For a social network-type product, create a post group type to measure:</p><ul><li>average number of replies per post</li><li>total count of unique posters per month</li></ul>',
        },
    ],
}
