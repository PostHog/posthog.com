import { TrackedCTA } from 'components/CallToAction/index.js'
import DeployOption from 'components/DeployOption'
import Sprites from 'components/Header/Sprites'
import { Slack } from 'components/Icons/Icons'
import { Plan } from 'components/Pricing/PricingTable/Plan'
import React from 'react'

export default function DeploymentOptions({ className = '' }) {
    return (
        <>
            <Sprites />
            <Plan
                title="Deploy to your infrastructure"
                subtitle="Host your own instance of PostHog anywhere in the world."
                className={className}
            >
                <ul className="list-none p-0 grid grid-cols-2 gap-1 my-7">
                    <DeployOption title="Amazon AWS" icon="aws" url="/docs/self-host/deploy/aws" />
                    <DeployOption title="Google Cloud" icon="gcs" url="/docs/self-host/deploy/gcp" />
                    <DeployOption title="Helm Chart" icon="helm chart" url="/docs/self-host/deploy/other" />
                    <DeployOption
                        title="Digital Ocean"
                        icon="digital ocean"
                        url="/docs/self-host/deploy/digital-ocean"
                    />
                    <DeployOption title="Source" icon="github" url="https://github.com/PostHog/posthog" />
                </ul>
                <div className="flex justify-between items-center bg-gray-accent-light px-[18px] py-[16px] rounded-md flex-col xl:flex-row space-y-2 xl:space-y-0 ">
                    <p className="m-0 font-bold">Deployment questions?</p>
                    <TrackedCTA
                        size="md"
                        type="outline"
                        className="bg-white flex space-x-2 items-center font-bold"
                        to="/slack"
                        event={{ name: 'deploy: clicked Join Slack' }}
                    >
                        <Slack className="w-4 h-4" />
                        <span>Join our Slack</span>
                    </TrackedCTA>
                </div>
            </Plan>
        </>
    )
}
