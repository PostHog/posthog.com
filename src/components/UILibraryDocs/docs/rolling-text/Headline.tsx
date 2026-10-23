import React from 'react'
import { RollingText } from 'components/UI/RollingText'
export default function Headline(): JSX.Element {
    return (
        <div className="@container space-y-5">
            <h2 className="!m-0 !text-3xl @lg:!text-5xl">
                Build with{' '}
                <RollingText
                    className="text-blue"
                    words={['analytics', 'replays', 'experiments']}
                    staticText="product context"
                />
            </h2>
            <p className="!m-0 text-secondary">Hover over the word or focus it with Tab to stop motion.</p>
        </div>
    )
}
