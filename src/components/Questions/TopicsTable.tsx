import React from 'react'

import Link from 'components/Link'
import {
    Apps,
    Brackets,
    Cursor,
    Dashboard,
    Ellipsis,
    Flask,
    Gear,
    Graph,
    HogQL,
    People,
    Privacy,
    Pulse,
    RewindPlay,
    Receipt,
    Rocket,
    Toggle,
    Terminal,
    Toolbar,
    Upload,
    User,
    Funnels,
    Trends,
    Message,
} from '@posthog/icons'

import { Megaphone, SparksJoy } from 'components/NotProductIcons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Cohorts, PathAnalysis } from 'components/Icons'
import { API, DataManagement, DataWarehouse } from 'components/ProductIcons'
dayjs.extend(relativeTime)

export const topicIcons = {
    'a/b testing': Flask,
    api: Terminal,
    apps: Apps,
    cohorts: Cohorts,
    configuration: Gear,
    dashboards: Dashboard,
    deployment: Rocket,
    'events & actions': Cursor,
    'event pipelines': User,
    'feature flags': Toggle,
    funnels: Funnels,
    gcp: DataWarehouse,
    groups: People,
    'helm chart': DataWarehouse,
    hogql: HogQL,
    'identify users': DataManagement,
    kubernetes: DataWarehouse,
    'migrating to posthog': DataManagement,
    migration: Upload,
    more: Ellipsis,
    paths: PathAnalysis,
    'people & properties': Brackets,
    'pricing & billing': Receipt,
    monitoring: Pulse,
    'product analytics': Graph,
    security: Privacy,
    'session replay': RewindPlay,
    'sparks joy': SparksJoy,
    trends: Trends,
    toolbar: Toolbar,
    uncategorized: Ellipsis,
    sdks: API,
    'community spotlight': Megaphone,
    surveys: Message,
    survey: Message,
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
