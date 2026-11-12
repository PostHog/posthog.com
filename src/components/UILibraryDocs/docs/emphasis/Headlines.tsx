import React from 'react'
import { Emphasis } from 'components/UI/Emphasis'
export default function Headlines(): JSX.Element {
    return (
        <div className="@container space-y-6">
            <h2 className="!m-0 !text-3xl @lg:!text-5xl">
                Your product's <Emphasis>context layer</Emphasis>
            </h2>
            <h3 className="!m-0 !text-2xl">
                Your data stack, <Emphasis color="green">working together</Emphasis>
            </h3>
            <p className="!m-0 text-lg">
                Connect PostHog to your <Emphasis color="tangerine">favorite coding agent</Emphasis>.
            </p>
        </div>
    )
}
