import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { quickLinks as productAnalyticsLinks } from '../../pages/docs/product-analytics'
import { quickLinks as featureFlagsLinks } from '../../pages/docs/feature-flags'
import { quickLinks as experimentsLinks } from '../../pages/docs/experiments'
import { quickLinks as sessionRecordingLinks } from '../../pages/docs/session-recording'
import { quickLinks as dataLinks } from '../../pages/docs/data'

type NextStepProps = {
    title: string
    links: {
        name: string
        to: string
    }[]
    children: React.ReactNode
}

export const NextStep: React.FC<NextStepProps> = ({ title, links, children }) => {
    return (
        <div className="space-y-6 pb-8">
            <div className="flex items-end justify-between border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark">
                <h3>{title}</h3>
                <div className="w-36">{children}</div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 list-none p-0 m-0">
                {links.map((link) => (
                    <li key={link.name} className="relative w-full py-2 flex items-center">
                        <Link className="leading-none" to={link.to}>
                            <span className="jumpTo pl-6">{link.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const ProductAnalytics = () => {
    return (
        <NextStep title="Product Analytics" links={productAnalyticsLinks}>
            <StaticImage
                alt=""
                placeholder="none"
                quality={100}
                className="w-full"
                src="../Home/Slider/images/product-analytics-hog.png"
            />
        </NextStep>
    )
}

export const FeatureFlags = () => {
    return (
        <NextStep title="Feature flags" links={featureFlagsLinks}>
            <StaticImage
                alt=""
                placeholder="none"
                quality={100}
                className="w-full"
                src="../Home/Slider/images/feature-flags-hog.png"
            />
        </NextStep>
    )
}

export const Experiments = () => {
    return (
        <NextStep title="Experiments" links={experimentsLinks}>
            <StaticImage
                alt=""
                placeholder="none"
                quality={100}
                className="w-full"
                src="../Home/Slider/images/ab-testing-hog.png"
            />
        </NextStep>
    )
}

export const SessionRecording = () => {
    return (
        <NextStep title="Session recording" links={sessionRecordingLinks}>
            <StaticImage
                alt=""
                placeholder="none"
                quality={100}
                className="w-full"
                src="../Home/Slider/images/session-recording-hog.png"
            />
        </NextStep>
    )
}

export const Data = () => {
    return (
        <NextStep title="Data" links={dataLinks}>
            <StaticImage
                alt=""
                placeholder="none"
                quality={100}
                className="w-full"
                src="../Product/images/hogs/data-warehouse.png"
            />
        </NextStep>
    )
}

export const Apps = () => {
    return (
        <NextStep
            title="Apps"
            links={[
                { name: 'Browse apps', to: '/apps' },
                { name: 'Import Stripe data into PostHog', to: '/tutorials/stripe-payment-data' },
                { name: 'Filter out unwanted events', to: '/tutorials/fewer-unwanted-events' },
                { name: 'Build your own app', to: '/docs/apps/build' },
            ]}
        >
            <StaticImage
                alt=""
                placeholder="none"
                quality={100}
                className="w-full"
                src="../Home/Slider/images/event-pipelines-hog.png"
            />
        </NextStep>
    )
}
