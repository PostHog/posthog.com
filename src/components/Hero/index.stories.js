import { CallToAction } from 'components/CallToAction'
import { getContext } from 'kea'
import React from 'react'
import { Provider } from 'react-redux'
import { Hero as HeroComponent } from '.'

export default {
    component: (
        <Provider store={getContext().store}>
            <HeroComponent />
        </Provider>
    ),
    title: 'Components/Hero',
    argTypes: {
        ctas: {
            table: {
                type: {
                    summary: 'A list of CTAs to render',
                    detail: 'Can be a list of any HTML elements or components',
                },
            },
        },
    },
}

export const Hero = (args) => (
    <Provider store={getContext().store}>
        <HeroComponent {...args} />
    </Provider>
)
Hero.args = {
    title: 'Self-hosted alternative to Google Analytics',
    subtitle:
        'PostHog’s self-hosted analytics platform helps teams better understand how their products are being used. Unlike Google Analytics, PostHog is open-source and can be deployed on your existing infrastructure.',
    ctas: [
        <CallToAction key={0} href="https://app.posthog.com/signup">
            Get started - free
        </CallToAction>,
        <CallToAction key={1} href="/demo" type="outline">
            Schedule a demo
        </CallToAction>,
    ],
}
