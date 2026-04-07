import React from 'react'
import Control from '../components/Home/Control'
import Test from '../components/Home/Test'
import usePostHog from 'hooks/usePostHog'
import { RenderInClient } from 'components/RenderInClient'

export default function Home() {
    const posthog = usePostHog()
    return (
        <RenderInClient
            placeholder={<Control />}
            render={() => {
                const variant = posthog?.getFeatureFlag?.('data-positioning')
                return variant === 'test' ? <Test /> : <Control />
            }}
        />
    )
}
