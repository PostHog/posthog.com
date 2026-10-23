import React from 'react'
import { GradientText } from 'components/UI/GradientText'
export default function Palettes(): JSX.Element {
    return (
        <div className="@container space-y-6">
            <h2 className="!m-0 !text-3xl @lg:!text-5xl">
                Build with{' '}
                <GradientText palette="brand" animate={false}>
                    product context
                </GradientText>
            </h2>
            <h3 className="!m-0 !text-3xl">
                Your data,{' '}
                <GradientText palette="spectrum" animate={false}>
                    working together
                </GradientText>
            </h3>
            <h3 className="!m-0 !text-3xl">
                Understand{' '}
                <GradientText palette="cool" animate={false}>
                    every user journey
                </GradientText>
            </h3>
        </div>
    )
}
