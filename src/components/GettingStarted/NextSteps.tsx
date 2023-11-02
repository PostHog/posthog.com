import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { quickLinks as productAnalyticsLinks } from '../../pages/docs/product-analytics'
import { quickLinks as featureFlagsLinks } from '../../pages/docs/feature-flags'
import { quickLinks as experimentsLinks } from '../../pages/docs/experiments'
import { quickLinks as sessionRecordingLinks } from '../../pages/docs/session-replay'
import { CallToAction } from 'components/CallToAction'

type NextStepProps = {
    title: string
    url?: string
    links: {
        name: string
        to: string
    }[]
    children: React.ReactNode
}

export const NextStep: React.FC<NextStepProps> = ({ title, url, links, children }) => {
    return (
        <div className="space-y-6 pb-8">
            <div className="flex items-end justify-between">
                <div>
                    <h3>{title}</h3>
                    <CallToAction href={url} type="secondary" size="sm">
                        Visit section
                    </CallToAction>
                </div>
                <div className="w-72">{children}</div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 list-none p-0 m-0 py-4 ">
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
        <NextStep title="Product Analytics" url="/docs/product-analytics" links={productAnalyticsLinks}>
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

export const SessionRecording = () => {
    return (
        <NextStep title="Session recording" url="/docs/session-replay" links={sessionRecordingLinks}>
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

export const FeatureFlags = () => {
    return (
        <NextStep title="Feature flags" url="/docs/feature-flags" links={featureFlagsLinks}>
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
        <NextStep title="A/B testing" url="/docs/experiments" links={experimentsLinks}>
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

export const Apps = () => {
    return (
        <NextStep
            title="Apps"
            url="/docs/apps"
            links={[
                { name: 'Browse apps', to: '/apps' },
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
