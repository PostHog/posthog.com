import React from 'react'

import Link from 'components/Link'
import {
    IconApps,
    IconBrackets,
    IconCursor,
    IconDashboard,
    IconEllipsis,
    IconFlask,
    IconGear,
    IconGraph,
    IconHogQL,
    IconPeople,
    IconPieChart,
    IconPrivacy,
    IconPulse,
    IconRewindPlay,
    IconReceipt,
    IconRocket,
    IconToggle,
    IconTerminal,
    IconToolbar,
    IconUpload,
    IconUser,
    IconFunnels,
    IconTrends,
    IconMessage,
} from '@posthog/icons'

import { Megaphone, SparksJoy } from 'components/NotProductIcons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Cohorts, PathAnalysis } from 'components/Icons'
import { API, DataManagement, DataWarehouse } from 'components/ProductIcons'
dayjs.extend(relativeTime)

export const topicIcons = {
    'a/b testing': IconFlask,
    api: IconTerminal,
    apps: IconApps,
    cohorts: Cohorts, // to be replaced or removed
    configuration: IconGear,
    dashboards: IconDashboard,
    deployment: IconRocket,
    'events & actions': IconCursor,
    'event pipelines': IconUser,
    'feature flags': IconToggle,
    funnels: IconFunnels,
    gcp: DataWarehouse, // to be replaced or removed
    groups: IconPeople,
    'helm chart': DataWarehouse, // to be replaced or removed
    hogql: IconHogQL,
    'identify users': DataManagement, // to be replaced or removed
    kubernetes: DataWarehouse, // to be replaced or removed
    'migrating to posthog': DataManagement, // to be replaced or removed
    migration: IconUpload,
    more: IconEllipsis,
    paths: PathAnalysis, // to be replaced or removed
    'people & properties': IconBrackets,
    'pricing & billing': IconReceipt,
    monitoring: IconPulse,
    'product analytics': IconGraph,
    security: IconPrivacy,
    'session replay': IconRewindPlay,
    'sparks joy': SparksJoy, // to be replaced or removed
    trends: IconTrends,
    toolbar: IconToolbar,
    uncategorized: IconEllipsis,
    sdks: API, // to be replaced or removed
    'community spotlight': Megaphone, // to be replaced or removed
    surveys: IconMessage,
    survey: IconMessage,
    'web analytics': IconPieChart,
}

export const TopicsTable = ({ topics, topicGroup, className = '' }) => {
    return (
        <ul className="m-0 p-0 list-none">
            <li className="grid grid-cols-12 pb-1 items-center text-primary/75 dark:text-primary-dark/75 text-sm">
                <div className="col-span-8 md:col-span-10">{topicGroup}</div>
                <div className="col-span-4 md:col-span-2">Last active</div>
            </li>
            <li className="list-none px-[2px] divide-y divide-light dark:divide-dark">
                {topics?.data?.length > 0 &&
                    topics.data.filter(Boolean).map((topic) => {
                        const {
                            id,
                            attributes: { label, slug, questions },
                        } = topic

                        const Icon = topicIcons[label.toLowerCase()]

                        const [latestQuestion] = questions?.data || []

                        return (
                            <div key={id} className="py-2.5">
                                <Link
                                    to={`/questions/topic/${slug}`}
                                    className={`${className} group flex items-center relative px-2 py-2.5 -mt-2.5 mx-[-2px] -mb-3 rounded active:bg-light dark:active:bg-dark border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all active:before:h-[2px] active:before:bg-light dark:active:before:bg-dark active:before:absolute active:before:content-[''] active:before:top-[-3px] active:before:left-0 active:before:right-0`}
                                >
                                    <div className="grid grid-cols-12 items-center w-full">
                                        <div className="col-span-8 md:col-span-10 flex items-center space-x-3">
                                            {Icon && <Icon className="w-5 opacity-60 text-black dark:text-white" />}
                                            <span className="text-red dark:text-yellow line-clamp-1">{label}</span>
                                        </div>
                                        <div className="col-span-4 md:col-span-2 text-sm font-normal text-primary/60 dark:text-primary-dark/60">
                                            {latestQuestion?.attributes?.activeAt &&
                                                dayjs(latestQuestion.attributes.activeAt).fromNow()}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
            </li>
        </ul>
    )
}

export default TopicsTable
