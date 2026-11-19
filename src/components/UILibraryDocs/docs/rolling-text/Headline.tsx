import React from 'react'
import { RollingText } from 'components/UI/RollingText'

export default function Headline(): JSX.Element {
    return (
        <p className="!m-0 text-3xl font-bold @lg:text-4xl">
            Build with{' '}
            <RollingText color="cobalt" words={['analytics', 'replays', 'experiments']} staticText="product context" />
        </p>
    )
}
