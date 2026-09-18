import React from 'react'
import { IconCheck } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'

const checklist = [
    'Find which span made a request slow',
    'Follow a failure across services',
    'Catch p99 you can’t reproduce',
    'Surface async work that usually hides',
    'Turn a trace into a PR',
]

export default function TracesSlackCallout(): JSX.Element {
    return (
        <div className="h-full text-primary bg-primary overflow-auto p-4 @md:p-8 flex flex-col justify-center">
            <div className="border border-primary rounded-md bg-accent overflow-hidden">
                <div className="p-6 @2xl:p-8 grid @2xl:grid-cols-2 gap-6 @2xl:gap-10">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-secondary mb-2">
                            PostHog in Slack
                        </p>
                        <h2 className="text-4xl @2xl:text-3xl font-bold mb-2">
                            Latency? <span className="font-code font-normal">@PostHog</span>
                        </h2>
                        <p className="text-xl mb-6">
                            Mention <code>@PostHog</code> on a slow endpoint. It pulls the traces, finds the span eating
                            your time, and opens a PR right there in the thread. You review without leaving the channel.
                        </p>
                        <CallToAction to="/slack" type="primary" size="lg">
                            About the Slack app
                        </CallToAction>
                    </div>
                    <ul className="space-y-3 list-none p-0 m-0 @2xl:self-center">
                        {checklist.map((item) => (
                            <li key={item} className="relative pl-6 text-lg">
                                <IconCheck className="size-5 text-green absolute left-0 top-1" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/Group_144141_842b4283dd.png"
                    alt="PostHog in Slack, fixing a slow trace"
                    className="mx-auto block w-full max-w-4xl"
                />
            </div>
        </div>
    )
}
