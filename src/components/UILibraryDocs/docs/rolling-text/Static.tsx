import React from 'react'
import { RollingText } from 'components/UI/RollingText'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function Static(): JSX.Element {
    return (
        <DemoRows className="text-body-lg">
            <DemoRow label="animate={false}">
                <span>
                    Give your agents{' '}
                    <RollingText words={['analytics', 'replays']} staticText="product context" animate={false} />
                </span>
            </DemoRow>
            <DemoRow label="One word">
                <span>
                    Start with <RollingText words={['session replay']} />
                </span>
            </DemoRow>
            <DemoRow label="No words">
                <span>
                    Explore <RollingText words={[]} staticText="PostHog" />
                </span>
            </DemoRow>
        </DemoRows>
    )
}
