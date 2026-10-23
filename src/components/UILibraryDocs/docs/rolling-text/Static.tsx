import React from 'react'
import { RollingText } from 'components/UI/RollingText'
export default function Static(): JSX.Element {
    return (
        <div className="space-y-4 text-xl">
            <p className="!m-0">
                Give your agents{' '}
                <RollingText words={['analytics', 'replays']} staticText="product context" animate={false} />.
            </p>
            <p className="!m-0">
                Start with <RollingText words={['session replay']} />.
            </p>
            <p className="!m-0">
                Explore <RollingText words={[]} staticText="PostHog" />.
            </p>
        </div>
    )
}
