import React from 'react'
import InstallationPlatforms from './installation-platforms'
import { CallToAction } from 'components/CallToAction'

const badgeClasses =
    'bg-gray-accent/50 text-primary/75 dark:text-primary-dark/60 dark:bg-gray-accent-dark text-xs m-[-2px] font-medium rounded-sm px-1 py-0.5 inline-block'
const requiredBadgeClasses =
    '!bg-orange/10 !text-orange !dark:text-white !dark:bg-orange/50 text-xs m-[-2px] font-medium rounded-sm px-1 py-0.5 inline-block'

const steps = [
    {
        title: 'Capture your first exception',
        goal: 'Capture your first exception events to PostHog.',
        required: true,
        content: <InstallationPlatforms />,
    },
    {
        title: 'Get accurate stack traces',
        goal: 'automatically upload source maps for your captured stack traces.',
        required: false,
        content: (
            <CallToAction type="primary" to="#upload-source-maps">
                Upload source maps
            </CallToAction>
        ),
    },
    {
        title: 'Configure alerts and automations',
        goal: 'Receive notifications and automate your error tracking related workflows.',
        required: false,
        content: (
            <CallToAction type="primary" to="#configure-alerts">
                Configure alerts and automations
            </CallToAction>
        ),
    },
    {
        title: 'Cutting costs',
        goal: "We try to have the lowest pricing for every product. Here's how you can take advantage of our pricing.",
        required: false,
        content: (
            <CallToAction type="primary" to="#cutting-costs">
                See cost-cutting tips
            </CallToAction>
        ),
    },
]

export default function ErrorTrackingImplementationSteps() {
    return (
        <section className="max-w-2xl mx-auto">
            <ol className="ml-0">
                {steps.map((step, i) => (
                    <li key={i} className="mb-10 flex w-full">
                        <span className="flex flex-col items-center mr-6 relative">
                            <span className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-accent-light dark:bg-gray-accent-dark text-primary dark:text-primary-dark font-bold text-base z-10 border border-light dark:border-dark border-b-4 border-b-gray-accent dark:border-b-gray-accent-dark">
                                {i + 1}
                            </span>
                            {i < steps.length - 1 && (
                                <span className="absolute top-8 left-1/2 -translate-x-1/2 w-[3px] bg-gray-accent dark:bg-gray-accent-dark h-[calc(100%_-_2rem)]"></span>
                            )}
                        </span>
                        <div>
                            <div className="flex items-center gap-2 font-semibold text-base text-primary dark:text-primary-dark">
                                <h2 className="!my-0 !text-2xl">{step.title}</h2>
                                <span className={step.required ? requiredBadgeClasses : badgeClasses}>
                                    {step.required ? 'Required' : 'Optional'}
                                </span>
                            </div>
                            <div className="text-xs text-primary/60 dark:text-primary-dark/60 mt-1 mb-2">
                                Your goal in this step: {step.goal}
                            </div>
                            <div className="mt-4 mb-4">{step.content}</div>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    )
}
